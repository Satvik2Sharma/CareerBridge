import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Save, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { mockDemoUser } from '../services/api/mockData';
import { UserProfile } from '../types';

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(mockDemoUser);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Candidate Profile</h1>
          <p className="text-xs text-slate-400">Manage your skills, experience, and career goal preferences.</p>
        </div>
        <Badge variant="success" size="md" className="self-start sm:self-auto">
          Profile Completeness: 82%
        </Badge>
      </div>

      {isSaved && (
        <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 px-4 py-3 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Profile changes successfully updated!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-base font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" /> Personal & Contact Info
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
              <Input
                label="Email Address"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
              <Input
                label="Phone Number"
                value={profile.phone || ''}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
              <Input
                label="Current Location"
                value={profile.location || ''}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              />
            </div>
          </Card>

          <Card>
            <h2 className="text-base font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-400" /> Career Preferences
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Target Career Goal"
                value={profile.career_goal}
                onChange={(e) => setProfile({ ...profile, career_goal: e.target.value })}
              />
              <Input
                label="Experience (Years)"
                type="number"
                step="0.5"
                value={profile.experience_years}
                onChange={(e) => setProfile({ ...profile, experience_years: parseFloat(e.target.value) || 0 })}
              />
              <Input
                label="Education Degree"
                value={profile.education}
                onChange={(e) => setProfile({ ...profile, education: e.target.value })}
              />
              <Input
                label="Work Preference"
                value={profile.work_preference}
                onChange={(e) => setProfile({ ...profile, work_preference: e.target.value })}
              />
            </div>
          </Card>
        </div>

        {/* Skills & Certifications Sidebar */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-base font-semibold text-slate-100 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-400" /> Verified Skills
            </h2>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {profile.skills.map((s) => (
                <Badge key={s} variant="primary" size="md">
                  {s}
                </Badge>
              ))}
            </div>
            <p className="text-[11px] text-slate-400">Skills are automatically verified during resume analysis and assessment quizzes.</p>
          </Card>

          <Card>
            <h2 className="text-base font-semibold text-slate-100 mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-400" /> Certifications
            </h2>
            <div className="space-y-2">
              {profile.certifications.map((c) => (
                <div key={c} className="p-2 bg-slate-800/60 rounded border border-slate-700/60 text-xs text-slate-200">
                  {c}
                </div>
              ))}
            </div>
          </Card>

          <Button type="submit" variant="primary" className="w-full" leftIcon={<Save className="w-4 h-4" />}>
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
