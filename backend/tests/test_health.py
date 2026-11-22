from datetime import UTC, datetime

from fastapi.testclient import TestClient
from pydantic import ValidationError
import pytest

from app.main import app
from app.models.responses import ApiResponse, DataStatus, Observation

client = TestClient(app)


def test_health_endpoint_returns_health_and_version() -> None:
    response = client.get("/api/health")

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ok"
    assert payload["data"]["status"] == "healthy"
    assert payload["data"]["service"] == "KODI MARKETS FX Macro API"
    assert payload["data"]["version"] == "0.1.0"
    assert payload["sources"] == []
    assert payload["errors"] == []
    assert datetime.fromisoformat(payload["as_of"].replace("Z", "+00:00")).tzinfo


def test_health_endpoint_applies_configured_cors_origins() -> None:
    response = client.get(
        "/api/health", headers={"Origin": "https://kodiprabhu29-pixel.github.io"}
    )

    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == (
        "https://kodiprabhu29-pixel.github.io"
    )


def test_observation_response_keeps_values_and_status_separate() -> None:
    retrieved_at = datetime(2026, 1, 15, 12, 0, tzinfo=UTC)
    observation = Observation(
        indicator="Example CPI",
        value=3.1,
        unit="percent",
        observation_date="2025-12",
        previous_value=3.0,
        actual=3.1,
        forecast=None,
        retrieved_at=retrieved_at,
        status=DataStatus.OK,
    )
    envelope = ApiResponse[list[Observation]](
        status=DataStatus.OK,
        as_of=retrieved_at,
        data=[observation],
    )

    result = envelope.model_dump(mode="json")
    item = result["data"][0]
    assert item["actual"] == 3.1
    assert item["previous_value"] == 3.0
    assert item["forecast"] is None
    assert result["errors"] == []


def test_observation_rejects_unmodeled_fields() -> None:
    with pytest.raises(ValidationError):
        Observation(
            indicator="Example",
            retrieved_at=datetime.now(UTC),
            status=DataStatus.UNAVAILABLE,
            invented_signal="bullish",
        )
