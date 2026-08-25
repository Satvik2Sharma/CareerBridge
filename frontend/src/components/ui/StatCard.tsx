import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  changeType = 'positive',
  icon
}) => {
  return (
    <Card hoverEffect className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <h4 className="text-2xl font-bold text-slate-100 mt-1 tracking-tight">{value}</h4>
        </div>
        {icon && (
          <div className="p-2.5 bg-slate-800/80 border border-slate-700/60 rounded-lg text-blue-400">
            {icon}
          </div>
        )}
      </div>

      {(subtitle || change) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {change && (
            <Badge
              variant={changeType === 'positive' ? 'success' : changeType === 'negative' ? 'danger' : 'default'}
              size="sm"
            >
              {change}
            </Badge>
          )}
          {subtitle && <span className="text-slate-400">{subtitle}</span>}
        </div>
      )}
    </Card>
  );
};
