import React, { useState } from 'react';
import { Building2, Save, MapPin, Users, ShoppingBag, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockDemoBusiness } from '../services/api/mockData';
import { BusinessProfile } from '../types';

export const BusinessProfilePage: React.FC = () => {
  const [business, setBusiness] = useState<BusinessProfile>(mockDemoBusiness);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">MSME Business Profile</h1>
        <p className="text-xs text-slate-400">Manage your enterprise background details and technology adoption status.</p>
      </div>

      {isSaved && (
        <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 px-4 py-3 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Business profile saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        <Card className="p-6 space-y-4">
          <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-400" /> Enterprise Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Business / Store Name"
              value={business.name}
              onChange={(e) => setBusiness({ ...business, name: e.target.value })}
            />
            <Input
              label="Industry / Category"
              value={business.business_type}
              onChange={(e) => setBusiness({ ...business, business_type: e.target.value })}
            />
            <Input
              label="Owner / Managing Director Name"
              value={business.owner_name}
              onChange={(e) => setBusiness({ ...business, owner_name: e.target.value })}
            />
            <Input
              label="Location"
              value={business.location}
              onChange={(e) => setBusiness({ ...business, location: e.target.value })}
            />
            <Input
              label="Employee Count"
              type="number"
              value={business.employees_count}
              onChange={(e) => setBusiness({ ...business, employees_count: parseInt(e.target.value) || 1 })}
            />
            <Input
              label="Estimated Monthly Orders"
              type="number"
              value={business.monthly_orders}
              onChange={(e) => setBusiness({ ...business, monthly_orders: parseInt(e.target.value) || 0 })}
            />
          </div>

          <Button type="submit" variant="primary" leftIcon={<Save className="w-4 h-4" />}>
            Save Enterprise Profile
          </Button>
        </Card>
      </form>
    </div>
  );
};
