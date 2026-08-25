import json
import os
from typing import Dict, Any, List

class SeedDataLoader:
    def __init__(self):
        base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", "data"))
        
        self.skills_data = self._load_json(os.path.join(base_dir, "skills.json")).get("skills", [])
        self.careers_data = self._load_json(os.path.join(base_dir, "careers.json")).get("careers", [])
        self.jobs_data = self._load_json(os.path.join(base_dir, "jobs.json")).get("jobs", [])
        self.resources_data = self._load_json(os.path.join(base_dir, "learning_resources.json")).get("resources", [])
        self.assessments_data = self._load_json(os.path.join(base_dir, "assessments.json")).get("assessments", [])
        
        msme_json = self._load_json(os.path.join(base_dir, "business_recommendations.json"))
        self.msme_presets = msme_json.get("msme_presets", [])
        self.msme_recommendations = msme_json.get("recommendations_catalog", [])

    def _load_json(self, path: str) -> Dict[str, Any]:
        if os.path.exists(path):
            try:
                with open(path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception as e:
                print(f"Error reading seed file {path}: {e}")
        return {}

    def load_jobs(self) -> List[Dict[str, Any]]:
        return self.jobs_data

    def load_skills(self) -> List[Dict[str, Any]]:
        return self.skills_data

    def load_careers(self) -> List[Dict[str, Any]]:
        return self.careers_data

    def load_learning_resources(self) -> List[Dict[str, Any]]:
        return self.resources_data

    def load_assessments(self) -> List[Dict[str, Any]]:
        return self.assessments_data

    def load_business_recommendations(self) -> Dict[str, Any]:
        return {
            "msme_presets": self.msme_presets,
            "recommendations_catalog": self.msme_recommendations
        }

seed_loader = SeedDataLoader()
