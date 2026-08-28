import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { JimmaSchematicMap } from '../components/map/JimmaSchematicMap';
import {
  MapPin,
  Users,
  Recycle,
  Trash2,
  AlertTriangle,
  Flame,
  GitCompare,
  TrendingDown,
  ArrowRight,
  PlusCircle,
  ChevronRight,
  Leaf,
  Activity,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const {
    dashboardMetrics,
    kebeles,
    incidents,
    climateProjections,
    setSelectedKebeleId,
    setSelectedIncidentId,
    setIsReportModalOpen,
    setActiveNavTab,
  } = useApp();

  const [tableFilter, setTableFilter] = useState<'All' | 'HighRisk' | 'Intervention' | 'Comparison'>('All');

  // Sorting Trial Comparison chart data
  const sortingTrialData = [
    {
      group: 'Intervention (9 Kebeles)',
      Baseline: 14.8,
      Current: dashboardMetrics.interventionAvgSorting,
    },
    {
      group: 'Comparison (8 Kebeles)',
      Baseline: 12.5,
      Current: dashboardMetrics.comparisonAvgSorting,
    },
  ];

  // Filtered kebeles for summary table
  const filteredKebeles = kebeles.filter((k) => {
    if (tableFilter === 'HighRisk') return k.riskLevel === 'High';
    if (tableFilter === 'Intervention') return k.group === 'Intervention';
    if (tableFilter === 'Comparison') return k.group === 'Comparison';
    return true;
  });

  const recentIncidents = incidents.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Mission Statement / Sleek Hero Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 shadow-md border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 text-xs font-semibold border border-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Jimma City CS-IMSLWM Monitoring Framework
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Climate-Smart Municipal Waste Decision Support
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Cluster-randomized monitoring system tracking waste segregation, decentralized composting, illegal dumping hotspots, and GHG mitigation across all 17 municipal kebeles.
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 text-slate-400 flex-wrap">
            <span><strong className="text-slate-200">Study Design:</strong> Cluster-Randomized Trial</span>
            <span>•</span>
            <span><strong className="text-slate-200">Coverage Target:</strong> 56,607 Households</span>
            <span>•</span>
            <span><strong className="text-slate-200">Baseline Year:</strong> 2026</span>
          </div>

          <button
            type="button"
            onClick={() => setIsReportModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log Illegal Dumping Incident</span>
          </button>
        </div>
      </div>

      {/* 8 High-Level Municipal KPIs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            City-Wide Key Performance Indicators
          </h3>
          <span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-medium">
            Simulated Research Data
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            id="kpi-kebeles"
            title="Total Municipal Kebeles"
            value={dashboardMetrics.totalKebeles}
            unit="Kebeles"
            description="12 Urban & 5 Peri-Urban clusters"
            icon={MapPin}
            highlight="default"
            progressPercent={100}
            onClick={() => setActiveNavTab('kebeles')}
          />

          <StatCard
            id="kpi-trial-arms"
            title="Trial Allocation Arms"
            value={`${dashboardMetrics.interventionKebelesCount} / ${dashboardMetrics.comparisonKebelesCount}`}
            unit="Int / Comp"
            description="9 Intervention vs 8 Control kebeles"
            icon={GitCompare}
            highlight="emerald"
            progressPercent={53}
            onClick={() => setActiveNavTab('intervention')}
          />

          <StatCard
            id="kpi-households"
            title="Estimated Households"
            value={dashboardMetrics.totalHouseholds}
            unit="HHs"
            description={`Total population ~${dashboardMetrics.totalPopulation.toLocaleString()}`}
            icon={Users}
            highlight="default"
            progressPercent={82}
          />

          <StatCard
            id="kpi-collection-coverage"
            title="Waste Collection Coverage"
            value={dashboardMetrics.averageCollectionCoverage}
            unit="%"
            description={`Intervention: ${dashboardMetrics.interventionAvgCoverage}% • Control: ${dashboardMetrics.comparisonAvgCoverage}%`}
            icon={Trash2}
            trend={{ value: '+18% vs Baseline', direction: 'up', isPositive: true }}
            highlight="emerald"
            progressPercent={dashboardMetrics.averageCollectionCoverage}
          />

          <StatCard
            id="kpi-segregation-rate"
            title="Waste Segregation Rate"
            value={dashboardMetrics.averageSegregationRate}
            unit="%"
            description={`Intervention: ${dashboardMetrics.interventionAvgSorting}% vs Control: ${dashboardMetrics.comparisonAvgSorting}%`}
            icon={Recycle}
            trend={{ value: '+21% vs Baseline', direction: 'up', isPositive: true }}
            highlight="emerald"
            progressPercent={dashboardMetrics.averageSegregationRate}
          />

          <StatCard
            id="kpi-active-dumping"
            title="Active Dumping Reports"
            value={dashboardMetrics.activeIncidentsCount}
            unit="incidents"
            description={`${dashboardMetrics.totalResolvedIncidentsCount} resolved incidents to date`}
            icon={AlertTriangle}
            trend={{
              value: dashboardMetrics.activeIncidentsCount > 5 ? 'High Priority' : 'Normal',
              direction: 'neutral',
              isPositive: dashboardMetrics.activeIncidentsCount < 6,
            }}
            highlight={dashboardMetrics.activeIncidentsCount > 5 ? 'red' : 'amber'}
            progressPercent={Math.min(dashboardMetrics.activeIncidentsCount * 12, 100)}
            onClick={() => setActiveNavTab('dumping')}
          />

          <StatCard
            id="kpi-uncollected-waste"
            title="Total Uncollected Waste"
            value={dashboardMetrics.totalUncollectedWasteKg}
            unit="kg"
            description={`Avg ${dashboardMetrics.interventionAvgUncollectedKg}kg (Int) vs ${dashboardMetrics.comparisonAvgUncollectedKg}kg (Comp)`}
            icon={Flame}
            trend={{ value: 'Reactive state', direction: 'neutral', isPositive: true }}
            highlight={dashboardMetrics.totalUncollectedWasteKg > 35000 ? 'amber' : 'default'}
            progressPercent={62}
          />

          <StatCard
            id="kpi-ghg-emissions"
            title="Estimated GHG Emissions"
            value={dashboardMetrics.estimatedGHGEmissionsCurrent}
            unit="t CO₂e/mo"
            description={`Targeting ~${dashboardMetrics.estimatedGHGReductionAnnual} tCO₂e annual avoidance`}
            icon={TrendingDown}
            trend={{ value: '-38% projected', direction: 'down', isPositive: true }}
            highlight="emerald"
            progressPercent={42}
            onClick={() => setActiveNavTab('climate')}
          />
        </div>
      </div>

      {/* Main Grid: Schematic GIS Map + Recent Incidents Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Schematic GIS Map */}
        <div className="lg:col-span-2">
          <JimmaSchematicMap />
        </div>

        {/* Right 1 Col: Recent Dumping Incidents Queue */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Active Incident Queue
                </h3>
                <p className="text-xs text-slate-500">Citizen & field monitor reports</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveNavTab('dumping')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-0.5 cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {recentIncidents.map((inc) => (
                <div
                  key={inc.id}
                  onClick={() => setSelectedIncidentId(inc.id)}
                  className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{inc.kebeleName}</span>
                    <Badge variant="status" value={inc.status} size="sm" />
                  </div>
                  <p className="text-slate-600 line-clamp-1">{inc.description}</p>
                  <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-700">{inc.dumpType} • {inc.estimatedWeightKg} kg</span>
                    <span>{inc.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsReportModalOpen(true)}
              className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg text-xs border border-emerald-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit New Illegal Dumping Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Section: 2 Core Charts (1 Clean Light Card + 1 Sleek Dark Accent Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Waste Sorting Comparison */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-start justify-between pb-3 mb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Average Household Waste Sorting Rate (%)
              </h3>
              <p className="text-xs text-slate-500">
                Intervention Arm vs Comparison Control Arm (Baseline vs Current)
              </p>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Trial Comparison</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortingTrialData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="group" tick={{ fontSize: 11, fontWeight: 500 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 80]} unit="%" />
                <Tooltip
                  formatter={(val: number | undefined) => [`${val || 0}%`, 'Sorting Rate']}
                  contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                <Bar dataKey="Baseline" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Current" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center justify-between">
            <span className="font-medium">Intervention Effect:</span>
            <span className="font-bold">
              +{dashboardMetrics.interventionAvgSorting - dashboardMetrics.comparisonAvgSorting}% Higher Segregation in Intervention Arm
            </span>
          </div>
        </div>

        {/* Chart 2: Sleek Dark GHG Emissions Projection Card */}
        <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 shadow-md text-white">
          <div className="flex items-start justify-between pb-3 mb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">
                  Projected GHG Emissions Trajectory (12 Months)
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Metric Tons CO₂-equivalent per Month (First-Order Decay Model)
              </p>
            </div>
            <span className="text-[10px] text-emerald-400 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded font-mono">
              IPCC 2006 Tier 1
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={climateProjections} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="darkEmissionsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[500, 1400]} />
                <Tooltip
                  formatter={(val: number | undefined) => [`${val || 0} t CO₂e`, 'Emissions']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8, color: '#cbd5e1' }} />
                <Area
                  type="monotone"
                  dataKey="baselineEmissions"
                  name="Baseline Trajectory"
                  stroke="#64748b"
                  strokeDasharray="4 4"
                  fill="transparent"
                />
                <Area
                  type="monotone"
                  dataKey="projectedEmissions"
                  name="With CS-IMSLWM Adoption"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fill="url(#darkEmissionsGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-2 text-[11px] text-slate-400 leading-relaxed italic">
            Simulated trajectory demonstrating emissions avoidance as organic composting, zero-burning, and plastic recovery scale up across trial kebeles.
          </p>
        </div>
      </div>

      {/* Kebele Summary Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              All 17 Kebeles — Municipal Monitoring Status
            </h3>
            <p className="text-xs text-slate-500">
              Click any kebele row to inspect its full cluster profile and intervention progress
            </p>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setTableFilter('All')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                tableFilter === 'All' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All (17)
            </button>
            <button
              type="button"
              onClick={() => setTableFilter('Intervention')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                tableFilter === 'Intervention' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Intervention (9)
            </button>
            <button
              type="button"
              onClick={() => setTableFilter('Comparison')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                tableFilter === 'Comparison' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Comparison (8)
            </button>
            <button
              type="button"
              onClick={() => setTableFilter('HighRisk')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                tableFilter === 'HighRisk' ? 'bg-rose-600 text-white shadow-xs' : 'text-rose-700 hover:bg-rose-100/60'
              }`}
            >
              High Risk ({dashboardMetrics.highRiskKebelesCount})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px] bg-slate-50/50">
                <th className="py-2.5 px-3">Kebele Name</th>
                <th className="py-2.5 px-3">Code / Zone</th>
                <th className="py-2.5 px-3">Trial Arm</th>
                <th className="py-2.5 px-3">Collection Coverage</th>
                <th className="py-2.5 px-3">Segregation Rate</th>
                <th className="py-2.5 px-3">Uncollected Waste</th>
                <th className="py-2.5 px-3">Active Dumps</th>
                <th className="py-2.5 px-3">Risk Level</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredKebeles.map((k) => (
                <tr
                  key={k.id}
                  onClick={() => setSelectedKebeleId(k.id)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-3 font-bold text-slate-900 group-hover:text-emerald-700">
                    {k.name}
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    <span className="font-mono font-semibold text-slate-700">{k.code}</span> • {k.type}
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant="group" value={k.group} size="sm" />
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-600 h-1.5 rounded-full"
                          style={{ width: `${k.collectionCoverage}%` }}
                        />
                      </div>
                      <span className="font-semibold text-slate-700">{k.collectionCoverage}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${k.segregationRate}%` }}
                        />
                      </div>
                      <span className="font-semibold text-slate-700">{k.segregationRate}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono font-semibold text-slate-800">
                    {k.uncollectedWasteKg.toLocaleString()} kg
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold ${
                        k.activeDumpingReports > 3
                          ? 'bg-rose-100 text-rose-800'
                          : k.activeDumpingReports > 0
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {k.activeDumpingReports}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant="risk" value={k.riskLevel} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="text-emerald-700 font-semibold group-hover:underline inline-flex items-center gap-1">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
