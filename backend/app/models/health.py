"""Health endpoint payload schema."""

from pydantic import BaseModel


class HealthData(BaseModel):
    service: str
    version: str
    environment: str
    status: str = "healthy"
