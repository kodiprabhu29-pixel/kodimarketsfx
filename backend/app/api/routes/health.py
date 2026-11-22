"""Application health route."""

from datetime import UTC, datetime

from fastapi import APIRouter

from app.core.config import get_settings
from app.models.health import HealthData
from app.models.responses import ApiResponse, DataStatus

router = APIRouter(tags=["health"])


@router.get("/health", response_model=ApiResponse[HealthData], summary="Check API health")
async def health_check() -> ApiResponse[HealthData]:
    """Return application process health without contacting data providers."""

    settings = get_settings()
    return ApiResponse[HealthData](
        status=DataStatus.OK,
        as_of=datetime.now(UTC),
        data=HealthData(
            service=settings.app_name,
            version=settings.app_version,
            environment=settings.environment,
        ),
    )
