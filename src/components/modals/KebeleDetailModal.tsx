import React from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import {
  X,
  MapPin,
  Users,
  Home,
  Trash2,
  Recycle,
  AlertTriangle,
  Flame,
  Droplets,
  TrendingUp,
  Activity,
  PlusCircle,
  FileText,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const KebeleDetailModal: React.FC = () => {
  const {
    selectedKebeleId,
    setSelectedKebeleId,
    kebeles,
    incidents,
    setSelectedIncidentId,
    setIsReportModalOpen,
  } = useApp();

  if (!selectedKebeleId) return null;

  const kebele = kebeles.find((k) => k.id === selectedKebeleId);
  if (!kebele) return null;

  // Filter incidents belonging to this kebele
  const kebeleIncidents = incidents.filter((inc) => inc.kebeleId === kebele.id);
  const activeIncidents = kebeleIncidents.filter((inc) => inc.status !== 'Resolved');
  const resolvedIncidents = kebeleIncidents.filter((inc) => inc.status === 'Resolved');

  // Kebele Waste Breakdown
  const wasteBreakdownData = [
    { name: 'Organic Waste', value: kebele.organicWasteKg, color: '#10b981' },
    { name: 'Plastic Waste', value: kebele.plasticWasteKg, color: '#3b82f6' },
    { name: 'Residual / Other', value: Math.max(0, kebele.wasteGenerationKgPerDay - (kebele.organicWasteKg + kebele.plasticWasteKg)), color: '#94a3b8' },
  ];

  // Baseline vs Current Data
  const baselineComparisonData = [
    {
      metric: 'Segregation Rate',
      Baseline: kebele.baselineSegregationRate,
      Current: kebele.segregationRate,
      unit: '%',
    },
    {
      metric: 'Collection Coverage',
      Baseline: kebele.baselineCollectionCoverage,
      Current: kebele.collectionCoverage,
      unit: '%',
    },
    {
      metric: 'Community Engagement',
      Baseline: Math.round(kebele.communityParticipationRate * 0.35),
      Current: kebele.communityParticipationRate,
      unit: '%',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 shrink-0 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-700 text-white shadow-md">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-xl font-bold font-display text-white">
                  {kebele.name}
                </h3>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-bold border border-slate-700">
                  {kebele.code}
                </span>
                <Badge variant="type" value={kebele.type} />
                <Badge variant="group" value={kebele.group} />
                <Badge variant="risk" value={kebele.riskLevel} />
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {kebele.zone} • {kebele.description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedKebeleId(null)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors shrink-0"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1">
                <Users className="w-3.5 h-3.5" />
                <span>Population</span>
              </div>
              <p className="text-lg font-bold text-slate-900">{kebele.population.toLocaleString()}</p>
              <p className="text-[10px] text-slate-400">{kebele.households.toLocaleString()} Households</p>
            </div>

            <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold mb-1">
                <Recycle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Segregation Rate</span>
              </div>
              <p className="text-lg font-bold text-emerald-900">{kebele.segregationRate}%</p>
              <p className="text-[10px] text-emerald-700">Baseline was {kebele.baselineSegregationRate}%</p>
            </div>

            <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 text-blue-800 text-xs font-semibold mb-1">
                <Trash2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Collection Coverage</span>
              </div>
              <p className="text-lg font-bold text-blue-900">{kebele.collectionCoverage}%</p>
              <p className="text-[10px] text-blue-700">Baseline was {kebele.baselineCollectionCoverage}%</p>
            </div>

            <div className={`p-3.5 rounded-xl border ${
              kebele.uncollectedWasteKg > 3000
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="flex items-center gap-2 text-xs font-semibold mb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Uncollected Backlog</span>
              </div>
              <p className="text-lg font-bold">{kebele.uncollectedWasteKg.toLocaleString()} kg</p>
              <p className="text-[10px] opacity-80">{kebele.activeDumpingReports} active dump incidents</p>
            </div>
          </div>

          {/* Section 1: Detailed Waste & Environmental Risk Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <Trash2 className="w-3.5 h-3.5 text-emerald-600" />
                Daily Waste Streams Composition
              </h4>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={wasteBreakdownData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {wasteBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: number | undefined) => [
                        `${(val || 0).toLocaleString()} kg/day`,
                        'Generation',
                      ]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 grid grid-cols-3 text-center text-xs pt-2 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px]">Total Daily</span>
                  <span className="font-bold text-slate-800">{kebele.wasteGenerationKgPerDay.toLocaleString()} kg</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Organic</span>
                  <span className="font-bold text-emerald-600">{kebele.organicWasteKg.toLocaleString()} kg</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Plastics</span>
                  <span className="font-bold text-blue-600">{kebele.plasticWasteKg.toLocaleString()} kg</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                Baseline vs Current Progress
              </h4>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={baselineComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="metric" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="Baseline" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Current" fill="#059669" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 p-2 bg-slate-50 rounded-lg text-xs text-slate-600 flex items-center justify-between">
                <span>Community Participation:</span>
                <span className="font-bold text-emerald-700">{kebele.communityParticipationRate}% Active</span>
              </div>
            </div>
          </div>

          {/* Section 2: Environmental & Climate Risk Assessment */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              Environmental Vulnerabilities & Public Health Flags
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-500">Liquid Waste Risk:</span>
                  <Badge variant="risk" value={kebele.liquidWasteRisk} size="sm" />
                </div>
                <p className="text-[11px] text-slate-600">
                  {kebele.liquidWasteRisk === 'High'
                    ? 'Frequent greywater overflow into open gutters.'
                    : 'Managed soakaways and drainage connections.'}
                </p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-500">Open Burning Risk:</span>
                  <Badge variant="risk" value={kebele.burningRisk} size="sm" />
                </div>
                <p className="text-[11px] text-slate-600">
                  {kebele.burningRisk === 'High'
                    ? 'Informal roadside burning observed during dry spells.'
                    : 'Strict community bylaw compliance against burning.'}
                </p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-500">Overall Status:</span>
                  <Badge variant="risk" value={kebele.riskLevel} size="sm" />
                </div>
                <p className="text-[11px] text-slate-600">
                  {kebele.group === 'Intervention'
                    ? 'Receiving CS-IMSLWM interventions & decentralized composting.'
                    : 'Conventional municipal collection routine only.'}
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Dumping Incidents Queue for this Kebele */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                Dumping Incidents in {kebele.name} ({kebeleIncidents.length})
              </h4>
              <button
                type="button"
                onClick={() => {
                  setSelectedKebeleId(null);
                  setIsReportModalOpen(true);
                }}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Log New Incident</span>
              </button>
            </div>

            {kebeleIncidents.length === 0 ? (
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-800">No dumping incidents logged for {kebele.name}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">All collection points currently clear.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {kebeleIncidents.map((inc) => (
                  <div
                    key={inc.id}
                    onClick={() => {
                      setSelectedIncidentId(inc.id);
                    }}
                    className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-mono font-bold text-slate-900">{inc.id}</span>
                        <Badge variant="status" value={inc.status} size="sm" />
                        <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[10px]">
                          {inc.dumpType}
                        </span>
                        <span className="text-slate-400 text-[10px]">• {inc.date}</span>
                      </div>
                      <p className="text-slate-600 line-clamp-1">{inc.description}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Landmark: {inc.landmark} • Reporter: {inc.reporterName}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="font-bold text-slate-900 block">{inc.estimatedWeightKg} kg</span>
                        <span className="text-[10px] text-slate-400">Est. Weight</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <p className="text-[11px] text-slate-500">
            CS-IMSLWM Cluster Monitoring • Jimma City Demonstration Model
          </p>
          <button
            type="button"
            onClick={() => setSelectedKebeleId(null)}
            className="px-4 py-2 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
