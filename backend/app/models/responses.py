"""Standard API response schemas for health and future macro endpoints."""

from datetime import datetime
from enum import StrEnum
from typing import Generic, TypeVar

from pydantic import BaseModel, ConfigDict, Field


class DataStatus(StrEnum):
    """Availability status for an API response or observation."""

    OK = "ok"
    PARTIAL = "partial"
    UNAVAILABLE = "unavailable"
    ERROR = "error"


class SourceAttribution(BaseModel):
    """Public attribution and retrieval metadata for a data source."""

    name: str
    url: str | None = None
    retrieved_at: datetime | None = None


class ProviderError(BaseModel):
    """Safe provider error metadata; must not contain credentials or secrets."""

    provider: str
    code: str
    message: str


class Observation(BaseModel):
    """A sourced observation; actual, forecast, and previous remain distinct."""

    model_config = ConfigDict(extra="forbid")

    indicator: str
    value: float | str | None = None
    unit: str | None = None
    observation_date: str | None = None
    release_date: datetime | None = None
    previous_value: float | str | None = None
    actual: float | str | None = None
    forecast: float | str | None = None
    source: SourceAttribution | None = None
    retrieved_at: datetime
    status: DataStatus


T = TypeVar("T")


class ApiResponse(BaseModel, Generic[T]):
    """Consistent envelope used for API payloads."""

    status: DataStatus
    as_of: datetime = Field(description="UTC time at which this response was assembled")
    data: T | None = None
    sources: list[SourceAttribution] = Field(default_factory=list)
    errors: list[ProviderError] = Field(default_factory=list)
