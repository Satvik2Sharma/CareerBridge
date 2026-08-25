from abc import ABC, abstractmethod
from typing import List, Dict, Any

class BaseOpportunitySource(ABC):
    """Abstract Base Class for Data Source Adapters"""

    @property
    @abstractmethod
    def source_name(self) -> str:
        """Name of the data source (e.g. NCS, Adzuna, UPSC)"""
        pass

    @abstractmethod
    async def fetch_opportunities(self, limit: int = 20) -> List[Dict[str, Any]]:
        """Fetch standardized job/opportunity dictionaries from source"""
        pass
