import React from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import {
  GitCompare,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Users,
  Recycle,
  Trash2,
  Leaf,
  BarChart2,
  Calendar,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

export const InterventionPage: React.FC = () => {
  const { activities, trialMetrics, dashboardMetrics } = useApp();

  const lifecycleStages = [
    { title: 'Baseline', desc: '1,200 Household Characterization Survey', status: 'Completed', date: 'Q1 2026' },
    { title: 'Stakeholder Co-Design', desc: 'Participatory Iddir & MSE Workshops', status: 'Completed', date: 'Q2 2026' },
    { title: 'Intervention Rollout', desc: '2-Stream Sorting & Composting Sites', status: 'In Progress', date: 'Q3 2026' },
    { title: 'Monitoring & Evaluation', desc: 'CS-IMSLWM Digital Portal & GPS Audits', status: 'In Progress', date: 'Q3-Q4 2026' },
    { title: 'Endline Survey', desc: 'Repeat Cross-Sectional Sampling', status: 'Upcoming', date: 'Q1 2027' },
    { title: 'Evaluation & Impact', desc: 'IPCC Emissions & Epidemiological Analysis', status: 'Upcoming', date: 'Q2 2027' },
    { title: 'Policy & Scale-up', desc: 'Municipal Bylaws & Regional Roadmap', status: 'Planned', date: 'Q3 2027' },
  ];

  // Side by Side comparison data for charts
  const comparativeChartData = [
    {
      indicator: 'Segregation Rate',
      Intervention: dashboardMetrics.interventionAvgSorting,
      Comparison: dashboardMetrics.comparisonAvgSorting,
      unit: '%',
    },
    {
      indicator: 'Collection Coverage',
      Intervention: dashboardMetrics.interventionAvgCoverage,
      Comparison: dashboardMetrics.comparisonAvgCoverage,
      unit: '%',
    },
    {
      indicator: 'Community Participation',
      Intervention: 74,
      Comparison: 21,
      unit: '%',
    },
    {
      indicator: 'Organic Recovery Rate',
      Intervention: 58,
      Comparison: 6,
      unit: '%',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Intervention Implementation & Trial Monitoring
          </h2>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            Cluster-Randomized Design
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Comparative empirical evaluation between 9 Intervention Kebeles and 8 Comparison Control Kebeles in Jimma City.
        </p>
      </div>

      {/* Research Lifecycle Progression (Section 26 Alignment) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              Research Project Lifecycle Progression
            </h3>
            <p className="text-xs text-slate-500">
              Co-creation, implementation, monitoring, evaluation, and policy scale-up roadmap
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Current Phase: Intervention & Monitoring
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {lifecycleStages.map((stage, idx) => {
            const isCompleted = stage.status === 'Completed';
            const isInProgress = stage.status === 'In Progress';

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-xs flex flex-col justify-between space-y-2 relative ${
                  isInProgress
                    ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-600/20'
                    : isCompleted
                    ? 'bg-slate-50 border-slate-200 text-slate-700'
                    : 'bg-white border-slate-200 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-mono text-[10px] text-slate-400 font-bold">0{idx + 1}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isInProgress
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {stage.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs leading-snug">{stage.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-tight">{stage.desc}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-200/60 block">
                  {stage.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Trial Arm Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Intervention Arm Card */}
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-xl p-6 shadow-md border border-emerald-700 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-700/60">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                Experimental Arm
              </span>
              <h3 className="text-xl font-bold font-display text-white">
                Intervention Group (9 Kebeles)
              </h3>
            </div>
            <span className="px-3 py-1 bg-emerald-700 text-emerald-100 text-xs font-bold rounded-full border border-emerald-500">
              CS-IMSLWM Active
            </span>
          </div>

          <p className="text-xs text-emerald-100 leading-relaxed">
            Mendera Kochi, Ginjo, Bacho Bore, Bosa Addis, Hermata Mentina, Jiren, Becho Gore, Ifa Bula, Mantina.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-emerald-950/50 p-3 rounded-lg border border-emerald-700/50">
              <span className="text-[11px] text-emerald-300 block">Avg Segregation Rate</span>
              <span className="text-2xl font-bold text-white">{dashboardMetrics.interventionAvgSorting}%</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">+36.4% vs Baseline</span>
            </div>

            <div className="bg-emerald-950/50 p-3 rounded-lg border border-emerald-700/50">
              <span className="text-[11px] text-emerald-300 block">Collection Coverage</span>
              <span className="text-2xl font-bold text-white">{dashboardMetrics.interventionAvgCoverage}%</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">Bi-weekly sorted rota</span>
            </div>

            <div className="bg-emerald-950/50 p-3 rounded-lg border border-emerald-700/50">
              <span className="text-[11px] text-emerald-300 block">Community Participation</span>
              <span className="text-2xl font-bold text-white">74.9%</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">Iddir co-design active</span>
            </div>

            <div className="bg-emerald-950/50 p-3 rounded-lg border border-emerald-700/50">
              <span className="text-[11px] text-emerald-300 block">Avg Backlog per Kebele</span>
              <span className="text-2xl font-bold text-emerald-300">{dashboardMetrics.interventionAvgUncollectedKg} kg</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">-64% reduction</span>
            </div>
          </div>
        </div>

        {/* Comparison Arm Card */}
        <div className="bg-white rounded-xl p-6 shadow-xs border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Control Arm
              </span>
              <h3 className="text-xl font-bold font-display text-slate-900">
                Comparison Group (8 Kebeles)
              </h3>
            </div>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full border border-slate-200">
              Standard Service
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Hirmata Merkato, Seto Semero, Awetu Mendera, Ginjo Guduru, Bosa Kito, Seka Chekorsa Border, Doyo Bikila, Bore.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Avg Segregation Rate</span>
              <span className="text-2xl font-bold text-slate-800">{dashboardMetrics.comparisonAvgSorting}%</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Conventional mixed</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Collection Coverage</span>
              <span className="text-2xl font-bold text-slate-800">{dashboardMetrics.comparisonAvgCoverage}%</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Sporadic municipal sweep</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Community Participation</span>
              <span className="text-2xl font-bold text-slate-800">20.8%</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Limited outreach</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Avg Backlog per Kebele</span>
              <span className="text-2xl font-bold text-rose-700">{dashboardMetrics.comparisonAvgUncollectedKg} kg</span>
              <span className="text-[10px] text-rose-600 block mt-0.5">Elevated dumping risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Visualization Chart */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Comparative Midline Evaluation: Key Indicators (%)
            </h3>
            <p className="text-xs text-slate-500">
              Side-by-side performance contrast between Intervention and Comparison clusters
            </p>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Statistical Contrast</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparativeChartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="indicator" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} unit="%" />
              <Tooltip formatter={(val: number | undefined) => [`${val || 0}%`, 'Rate']} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Bar dataKey="Intervention" fill="#059669" name="Intervention Arm (CS-IMSLWM)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Comparison" fill="#94a3b8" name="Comparison Control Arm" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Section: Intervention Implementation Progress Activities */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Intervention Implementation Progress
            </h3>
            <p className="text-xs text-slate-500">
              Work packages, community co-design activities, and resource recovery deployments
            </p>
          </div>
          <span className="text-xs text-slate-400">{activities.length} Work Packages</span>
        </div>

        <div className="space-y-3">
          {activities.map((act) => (
            <div
              key={act.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-all space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-slate-500">{act.id}</span>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{act.title}</h4>
                  <Badge variant="activity" value={act.status} size="sm" />
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span>{act.startDate} → {act.targetDate}</span>
                  <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {act.progressPercentage}%
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {act.description}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    act.status === 'Completed'
                      ? 'bg-emerald-600'
                      : 'bg-emerald-700'
                  }`}
                  style={{ width: `${act.progressPercentage}%` }}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-1">
                <span><strong>Phase:</strong> {act.phase}</span>
                <span><strong>Target:</strong> {act.targetGroup} ({act.targetKebelesCount} Kebeles)</span>
                <span><strong>Lead:</strong> {act.leadActor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
