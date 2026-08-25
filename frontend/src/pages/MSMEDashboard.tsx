import React, { useState, useEffect } from 'react';
import { BusinessProfile, MSMEAnalysis } from '../types';
import { api, defaultDemoBusiness } from '../services/api';
import { MSMEDigitalMaturityCard } from '../components/MSMEDigitalMaturityCard';
import { MSMERecommendationsView } from '../components/MSMERecommendationsView';
import { MSMEGrowthRoadmap } from '../components/MSMEGrowthRoadmap';
import { Building2, Store, Utensils, ShoppingBag, Plus, RefreshCw, Layers } from 'lucide-react';

interface MSMEDashboardProps {
  businessProfile: BusinessProfile;
  setBusinessProfile: React.Dispatch<React.SetStateAction<BusinessProfile>>;
}

export const MSMEDashboard: React.FC<MSMEDashboardProps> = ({ businessProfile, setBusinessProfile }) => {
  const [analysis, setAnalysis] = useState<MSMEAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    runAnalysis();
  }, [businessProfile]);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const data = await api.analyzeMSME(businessProfile);
      setAnalysis(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (preset: BusinessProfile) => {
    setBusinessProfile(preset);
  };

  return (
    <div className="space-y-8">
      {/* Preset Selector Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              MSME Intelligence Engine
            </span>
            <h1 className="text-2xl font-bold font-heading text-white mt-1">
              Select or Customize Business Profile
            </h1>
            <p className="text-xs text-slate-400">
              Analyze digital maturity, identify technology gaps, and receive a 90-day growth roadmap.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() =>
                handleSelectPreset({
                  name: "Local Clothing Store",
                  business_type: "Clothing Store",
                  owner_name: "Rajesh Kumar",
                  location: "Roorkee, Uttarakhand",
                  employees_count: 3,
                  monthly_orders: 250,
                  current_tech: ["WhatsApp", "Excel"],
                  challenges: ["Inventory tracking", "Customer retention", "Marketing"]
                })
              }
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 transition"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" /> Clothing Store Demo
            </button>

            <button
              onClick={() =>
                handleSelectPreset({
                  name: "Spice Route Eatery",
                  business_type: "Restaurant / Cafe",
                  owner_name: "Priya Sharma",
                  location: "Dehradun, Uttarakhand",
                  employees_count: 6,
                  monthly_orders: 800,
                  current_tech: ["Cash", "Paper Bills"],
                  challenges: ["Table ordering speed", "Food waste tracking", "Online food delivery"]
                })
              }
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-blue-300 border border-blue-500/30 flex items-center gap-1.5 transition"
            >
              <Utensils className="w-4 h-4 text-blue-400" /> Restaurant Demo
            </button>

            <button
              onClick={() =>
                handleSelectPreset({
                  name: "Fresh Mart Kirana",
                  business_type: "Grocery Store",
                  owner_name: "Amit Gupta",
                  location: "Roorkee, Uttarakhand",
                  employees_count: 2,
                  monthly_orders: 600,
                  current_tech: ["UPI QR", "Notebook Ledger"],
                  challenges: ["Supplier stock tracking", "Home delivery orders"]
                })
              }
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 transition"
            >
              <Store className="w-4 h-4 text-amber-400" /> Kirana Store Demo
            </button>
          </div>
        </div>

        {/* Current Active Business Parameters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Business Name</span>
            <span className="font-bold text-white">{businessProfile.name}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Location & Team</span>
            <span className="font-bold text-white">
              {businessProfile.location} ({businessProfile.employees_count} Employees)
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Current Technology</span>
            <span className="font-bold text-emerald-400">{businessProfile.current_tech.join(', ')}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Monthly Order Volume</span>
            <span className="font-bold text-white">~{businessProfile.monthly_orders} orders / month</span>
          </div>
        </div>
      </div>

      {loading || !analysis ? (
        <div className="text-center py-12 text-slate-400 text-xs">Evaluating business digital maturity...</div>
      ) : (
        <div className="space-y-8">
          {/* Digital Maturity Card */}
          <MSMEDigitalMaturityCard
            score={analysis.digital_maturity_score}
            categoryScores={analysis.category_scores}
            businessName={analysis.business_name}
            businessType={analysis.business_type}
          />

          {/* Recommendations View */}
          <MSMERecommendationsView recommendations={analysis.recommendations} />

          {/* 90-Day Digital Growth Roadmap */}
          <MSMEGrowthRoadmap phases={analysis.roadmap_90_day} />
        </div>
      )}
    </div>
  );
};
