import json
import os
from typing import Dict, List, Optional
from app.config import settings

class SkillNormalizer:
    def __init__(self, data_path: Optional[str] = None):
        if data_path is None:
            data_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "skills.json")
        
        self.alias_map: Dict[str, str] = {}
        self.canonical_skills: Dict[str, dict] = {}
        self.load_skills(data_path)

    def load_skills(self, data_path: str):
        if not os.path.exists(data_path):
            data_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data", "skills.json"))

        if os.path.exists(data_path):
            try:
                with open(data_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    for item in data.get("skills", []):
                        canonical = item["name"]
                        self.canonical_skills[canonical] = item
                        self.alias_map[canonical.lower()] = canonical
                        for alias in item.get("aliases", []):
                            self.alias_map[alias.lower().strip()] = canonical
            except Exception as e:
                print(f"Error loading skills dataset: {e}")

    def get_all_skills(self) -> List[dict]:
        return list(self.canonical_skills.values())

    def normalize(self, raw_skill: str) -> str:
        clean = raw_skill.strip().lower()
        if clean in self.alias_map:
            return self.alias_map[clean]
        
        for alias, canonical in self.alias_map.items():
            if len(alias) > 3 and alias in clean:
                return canonical
        
        return raw_skill.strip().title()

    def normalize_list(self, raw_skills: List[str]) -> List[str]:
        seen = set()
        result = []
        for s in raw_skills:
            norm = self.normalize(s)
            if norm not in seen:
                seen.add(norm)
                result.append(norm)
        return result

# Global instance
skill_normalizer = SkillNormalizer()
