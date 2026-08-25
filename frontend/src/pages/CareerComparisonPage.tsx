import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Check, Minus, X } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const CareerComparisonPage: React.FC = () => {
  const comparisonData = [
    { skill: 'Python', fullstack: 'Matched', backend: 'Matched', dataAnalyst: 'Matched' },
    { skill: 'SQL & Relational DBs', fullstack: 'Matched', backend: 'Matched', dataAnalyst: 'Matched' },
    { skill: 'REST APIs & Web Frameworks', fullstack: 'Matched', backend: 'Matched', dataAnalyst: 'Missing' },
    { skill: 'React & Frontend UI', fullstack: 'Matched', backend: 'Not Required', dataAnalyst: 'Not Required' },
    { skill: 'FastAPI & Async', fullstack: 'Partial', backend: 'Partial', dataAnalyst: 'Not Required' },
    { skill: 'Docker Containerization', fullstack: 'Missing', backend: 'Missing', dataAnalyst: 'Not Required' },
    { skill: 'Data Visualization & BI', fullstack: 'Not Required', backend: 'Not Required', dataAnalyst: 'Matched' }
  ];

  return (
    <div className="space-y-6">
      <NavLink to="/career/careers" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Career Explorer
      </NavLink>

      <div>
        <h1 className="text-2xl font-bold text-slate-100">Career Fit Comparison Matrix</h1>
        <p className="text-xs text-slate-400">Side-by-side technical skill alignment comparison across target engineering careers.</p>
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full text-left text-xs border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-800 text-slate-300">
              <th className="p-4 font-semibold">Technical Skill</th>
              <th className="p-4 font-semibold text-center">Full Stack Engineer (91%)</th>
              <th className="p-4 font-semibold text-center text-blue-400">Backend Developer (88%)</th>
              <th className="p-4 font-semibold text-center">Data Analyst (76%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-200">
            {comparisonData.map((row) => (
              <tr key={row.skill} className="hover:bg-slate-900/40">
                <td className="p-4 font-medium">{row.skill}</td>
                <td className="p-4 text-center">{renderStatus(row.fullstack)}</td>
                <td className="p-4 text-center bg-blue-950/20">{renderStatus(row.backend)}</td>
                <td className="p-4 text-center">{renderStatus(row.dataAnalyst)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

function renderStatus(status: string) {
  if (status === 'Matched') return <Badge variant="success">✓ Matched</Badge>;
  if (status === 'Partial') return <Badge variant="warning">◐ Partial</Badge>;
  if (status === 'Missing') return <Badge variant="danger">○ Missing</Badge>;
  return <span className="text-slate-500">—</span>;
}
