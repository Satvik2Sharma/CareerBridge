import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    APP_NAME: str = "CareerBridge API"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    
    # AI Configuration
    AI_PROVIDER: str = os.getenv("AI_PROVIDER", "mock")
    AI_MODEL: str = os.getenv("AI_MODEL", "gpt-4o-mini")
    AI_API_KEY: str = os.getenv("AI_API_KEY", "")
    AI_BASE_URL: str = os.getenv("AI_BASE_URL", "https://api.openai.com/v1")
    
    # CORS
    CORS_ORIGINS: list[str] = ["*"]
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./careerbridge.db")
    
    # Data path
    DATA_DIR: str = os.getenv("DATA_DIR", "../data")
    
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
