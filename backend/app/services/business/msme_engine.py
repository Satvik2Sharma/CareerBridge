from typing import Dict, Any, List

class MSMEEngine:
    def __init__(self, catalog: List[Dict[str, Any]] = None):
        self.catalog = catalog or []

    def evaluate_business(self, business_data: Dict[str, Any]) -> Dict[str, Any]:
        tech_list = [t.lower().strip() for t in business_data.get("current_tech", [])]
        challenges = [c.lower().strip() for c in business_data.get("challenges", [])]

        # Scoring digital maturity per category (0-100)
        payments_score = 80 if any(k in t for t in tech_list for k in ["upi", "qr", "pos", "digital payment"]) else 30
        inventory_score = 80 if any(k in t for t in tech_list for k in ["vyapar", "khatabook", "zoho", "inventory app", "software"]) else 20
        online_score = 75 if any(k in t for t in tech_list for k in ["website", "online store", "whatsapp store", "instagram catalog"]) else 25
        analytics_score = 70 if any(k in t for t in tech_list for k in ["excel", "crm", "analytics", "bi"]) else 15
        marketing_score = 75 if any(k in t for t in tech_list for k in ["facebook ads", "google business", "social media", "marketing"]) else 35
        cybersecurity_score = 60 if any(k in t for t in tech_list for k in ["antivirus", "cloud backup", "2fa"]) else 30

        category_scores = {
            "Payments": payments_score,
            "Inventory": inventory_score,
            "Online Presence": online_score,
            "Analytics": analytics_score,
            "Marketing": marketing_score,
            "Cybersecurity": cybersecurity_score
        }

        overall_maturity = round(sum(category_scores.values()) / len(category_scores))

        # Recommendations generation
        recommendations = []
        
        if inventory_score < 50:
            recommendations.append({
                "id": "msme-rec-1",
                "title": "Digital Inventory Management",
                "category": "Inventory",
                "problem": "Manual stock tracking causes inaccuracies, stockouts, and capital tied up in slow items.",
                "solution": "Adopt cloud inventory app (e.g. Vyapar or Khatabook) with phone barcode scanner.",
                "expected_benefit": "Reduces inventory stockouts by 45% and automates low-stock purchase alerts.",
                "effort": "MEDIUM",
                "impact": "HIGH",
                "priority": 1,
                "cost_category": "Low Monthly Fee"
            })

        if payments_score < 50:
            recommendations.append({
                "id": "msme-rec-2",
                "title": "Integrated Digital Payments & Billing",
                "category": "Payments",
                "problem": "Cash-only or delayed billing increases queue times and transaction accounting errors.",
                "solution": "Deploy soundbox QR payment terminal and digital invoice WhatsApp receipts.",
                "expected_benefit": "Speeds up counter billing by 60% and provides clear daily ledger audit trails.",
                "effort": "LOW",
                "impact": "HIGH",
                "priority": 2,
                "cost_category": "Free / Very Low"
            })

        if online_score < 50:
            recommendations.append({
                "id": "msme-rec-3",
                "title": "WhatsApp Catalog Store & Google Business Profile",
                "category": "Online Presence",
                "problem": "Lack of digital visibility limits store sales strictly to physical foot traffic.",
                "solution": "Build a WhatsApp Business catalog with direct ordering links and verify Google Maps listing.",
                "expected_benefit": "Generates 25-35% additional local order volume from phone customers.",
                "effort": "MEDIUM",
                "impact": "HIGH",
                "priority": 3,
                "cost_category": "Free"
            })

        if marketing_score < 60:
            recommendations.append({
                "id": "msme-rec-4",
                "title": "Local Social Media & Festival Promotion",
                "category": "Marketing",
                "problem": "Limited awareness among prospective buyers in nearby neighborhoods.",
                "solution": "Post weekly product videos on Instagram/Facebook and run hyper-local targeted promo ads.",
                "expected_benefit": "Drives 50+ new store walk-ins every month during festival peaks.",
                "effort": "MEDIUM",
                "impact": "MEDIUM",
                "priority": 4,
                "cost_category": "Low Ads Budget"
            })

        if analytics_score < 50:
            recommendations.append({
                "id": "msme-rec-5",
                "title": "Customer Loyalty & Purchase Analytics",
                "category": "Analytics",
                "problem": "No systematically tracked data on top repeat buyers or high-margin product trends.",
                "solution": "Log customer phone numbers at checkout to send automated discount coupons on birthdays/festivals.",
                "expected_benefit": "Boosts repeat customer retention rate by up to 30%.",
                "effort": "MEDIUM",
                "impact": "MEDIUM",
                "priority": 5,
                "cost_category": "Low"
            })

        # 90-Day Digital Growth Roadmap
        roadmap = [
            {
                "month": 1,
                "phase": "Digital Foundation (Days 1-30)",
                "focus": "Payments & Inventory Control",
                "action_items": [
                    "Setup UPI QR soundbox & instant payment verification",
                    "Digitize current physical stock into cloud inventory app",
                    "Train counter staff on digital stock entry"
                ]
            },
            {
                "month": 2,
                "phase": "Online Presence & Delivery (Days 31-60)",
                "focus": "WhatsApp Commerce & Search Visibility",
                "action_items": [
                    "Upload top 50 bestselling items to WhatsApp Business Catalog",
                    "Verify Google Maps business listing with photos and contact info",
                    "Promote catalog link to top 100 regular customers"
                ]
            },
            {
                "month": 3,
                "phase": "Customer Growth & Analytics (Days 61-90)",
                "focus": "Marketing & Repeat Retention",
                "action_items": [
                    "Launch inaugural Instagram product showcase campaign",
                    "Run festival discount campaign for repeat buyers",
                    "Review 90-day sales dashboard to identify top profit margins"
                ]
            }
        ]

        return {
            "business_name": business_data.get("name", "Local Business"),
            "business_type": business_data.get("business_type", "Retail"),
            "digital_maturity_score": overall_maturity,
            "category_scores": category_scores,
            "recommendations": recommendations,
            "roadmap_90_day": roadmap
        }
