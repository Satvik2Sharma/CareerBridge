from app.config import settings
from app.services.embedding.base import EmbeddingProvider
from app.services.embedding.mock_provider import MockEmbeddingProvider
from app.services.embedding.openai_provider import OpenAIEmbeddingProvider

class EmbeddingFactory:
    @staticmethod
    def get_provider() -> EmbeddingProvider:
        provider = settings.EMBEDDING_PROVIDER.lower()
        if provider == "openai" or provider == "openai_compatible":
            return OpenAIEmbeddingProvider()
        return MockEmbeddingProvider()

embedding_factory = EmbeddingFactory()
