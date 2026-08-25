import hashlib
import math
from typing import List
from app.config import settings
from app.services.embedding.base import EmbeddingProvider

class MockEmbeddingProvider(EmbeddingProvider):
    """Deterministic Mock Embedding Provider for 100% Offline Hackathon Stability"""

    def __init__(self, dimensions: int = settings.EMBEDDING_DIMENSIONS):
        self.dimensions = dimensions

    def _generate_vector(self, text: str) -> List[float]:
        # Hash words to generate deterministic pseudo-random float vector
        cleaned_text = text.lower().strip()
        vector = [0.0] * self.dimensions
        
        words = cleaned_text.split()
        if not words:
            words = ["empty"]

        for word in words:
            h = hashlib.sha256(word.encode('utf-8')).hexdigest()
            for i in range(min(16, len(h))):
                idx = (int(h[i], 16) * (i + 1) * 97) % self.dimensions
                vector[idx] += (int(h[i], 16) - 7.5) / 10.0

        # L2 Normalize vector so cosine distance works properly
        norm = math.sqrt(sum(x * x for x in vector))
        if norm > 0:
            vector = [x / norm for x in vector]
        else:
            vector[0] = 1.0

        return vector

    async def get_embedding(self, text: str) -> List[float]:
        return self._generate_vector(text)

    async def get_embeddings(self, texts: List[str]) -> List[List[float]]:
        return [self._generate_vector(t) for t in texts]
