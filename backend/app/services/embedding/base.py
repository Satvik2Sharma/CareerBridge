from abc import ABC, abstractmethod
from typing import List

class EmbeddingProvider(ABC):
    """Abstract Base Class for Vector Embeddings"""

    @abstractmethod
    async def get_embedding(self, text: str) -> List[float]:
        """Generate a single text embedding vector"""
        pass

    @abstractmethod
    async def get_embeddings(self, texts: List[str]) -> List[List[float]]:
        """Generate batch text embeddings"""
        pass
