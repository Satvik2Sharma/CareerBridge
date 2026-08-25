from app.config import settings
from app.services.ai.base import AIProvider
from app.services.ai.mock_provider import MockAIProvider
from app.services.ai.openai_provider import OpenAICompatibleProvider

def get_ai_provider() -> AIProvider:
    if settings.AI_PROVIDER.lower() == "openai" and settings.AI_API_KEY:
        return OpenAICompatibleProvider()
    return MockAIProvider()
