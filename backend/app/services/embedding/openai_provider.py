import httpx
from typing import List
from app.config import settings
from app.services.embedding.base import EmbeddingProvider
from app.services.embedding.mock_provider import MockEmbeddingProvider

class OpenAIEmbeddingProvider(EmbeddingProvider):
    """OpenAI-Compatible REST API Embedding Provider"""

    def __init__(self):
        self.api_key = settings.AI_API_KEY
        self.base_url = settings.AI_BASE_URL.rstrip('/')
        self.model = settings.EMBEDDING_MODEL
        self.fallback = MockEmbeddingProvider()

    async def get_embedding(self, text: str) -> List[float]:
        if not self.api_key:
            return await self.fallback.get_embedding(text)

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(
                    f"{self.base_url}/embeddings",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "input": text,
                        "model": self.model
                    }
                )
                if res.status_code == 200:
                    data = res.json()
                    return data["data"][0]["embedding"]
        except Exception:
            pass

        return await self.fallback.get_embedding(text)

    async def get_embeddings(self, texts: List[str]) -> List[List[float]]:
        if not self.api_key:
            return await self.fallback.get_embeddings(texts)

        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                res = await client.post(
                    f"{self.base_url}/embeddings",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "input": texts,
                        "model": self.model
                    }
                )
                if res.status_code == 200:
                    data = res.json()
                    return [item["embedding"] for item in data["data"]]
        except Exception:
            pass

        return await self.fallback.get_embeddings(texts)
