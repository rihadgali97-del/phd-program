import React from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import {
  TrendingDown,
  Flame,
  Droplets,
  Wind,
  ShieldAlert,
  Leaf,
  Info,
  Waves,
  HeartPulse,
  Scale,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

export const ClimateEnvironmentPage: React.FC = () => {
  const { climateProjections, environmentalRisks, dashboardMetrics } = useApp();

  const publicHealthVulnerabilities = [
    {
      title: 'Vector-Borne Disease Propagation (Malaria & Dengue)',
      level: 'High Alert along Awetu Corridors',
      riskColor: 'rose',
      description: 'Stagnant wastewater pooling around uncollected plastic bottles and unlined open dumps creates ideal breeding habitats for Anopheles mosquitoes in Awetu Mendera and Hermata Mentina.',
      mitigation: 'Weekly drainage desludging and bio-larvicide spraying by kebele health extension workers.',
    },
    {
      title: 'Respiratory Disease from Waste Burning Particulates (PM2.5 / Dioxins)',
      level: 'Moderate in Peri-Urban Clusters',
      riskColor: 'amber',
      description: 'Low-temperature open burning of mixed agricultural and plastic waste in peri-urban fringes generates toxic polycyclic hydrocarbons and respiratory irritation among children.',
      mitigation: 'Community Iddir anti-burning covenants and centralized agricultural residue compost bins.',
    },
    {
      title: 'Water Source Leachate & Coffee Effluent Contamination',
      level: 'Seasonal Surge (Harvest Months)',
      riskColor: 'rose',
      description: 'Acidic, high-COD wastewater from seasonal coffee washing processing points draining into the Awetu River system without adequate pH stabilization.',
      mitigation: 'Constructed vetiver grass buffer wetlands and bio-filtration lagoons in Ifa Bula.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Climate Impact & Environmental Risk Monitoring
          </h2>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            GHG & Public Health
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          IPCC-aligned methane emissions abatement modeling, Awetu River environmental health, and disease vector indicators.
        </p>
      </div>

      {/* Key Climate Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Current Monthly Emissions"
          value={dashboardMetrics.estimatedGHGEmissionsCurrent}
          unit="t CO₂e"
          description="Baseline was ~1,240 t CO₂e/month"
          icon={TrendingDown}
          highlight="emerald"
        />

        <StatCard
          title="Projected Annual Abatement"
          value={dashboardMetrics.estimatedGHGReductionAnnual}
          unit="t CO₂e/yr"
          description="Target reduction through organic diversion"
          icon={Leaf}
          highlight="emerald"
        />

        <StatCard
          title="Organic Diversion Rate"
          value="48.5"
          unit="%"
          description="Diverted away from anaerobic dumpsites"
          icon={Scale}
          highlight="emerald"
        />

        <StatCard
          title="Open Burning Reduction"
          value="-72"
          unit="%"
          description="Enforced via kebele community bylaws"
          icon={Flame}
          highlight="emerald"
        />
      </div>

      {/* GHG Emissions 12-Month Trajectory Chart */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              12-Month City-Wide GHG Emissions Forecast (Metric Tons CO₂e)
            </h3>
            <p className="text-xs text-slate-500">
              Comparing business-as-usual unmanaged dumps vs progressive CS-IMSLWM composting & recycling
            </p>
          </div>
          <div className="inline-flex items-center gap-1 text-[11px] text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
            <Info className="w-3.5 h-3.5" />
            <span>Illustrative IPCC Tier 1 First-Order Decay Model</span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={climateProjections} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="avoidedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[400, 1400]} unit=" t" />
              <Tooltip formatter={(val: number | undefined) => [`${val || 0} t CO₂e`, 'Emissions']} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
              <Area
                type="monotone"
                dataKey="baselineEmissions"
                name="Baseline Business-As-Usual (Unmanaged Open Dump Methane)"
                stroke="#64748b"
                strokeDasharray="4 4"
                strokeWidth={2}
                fill="transparent"
              />
              <Area
                type="monotone"
                dataKey="projectedEmissions"
                name="Projected Emissions with CS-IMSLWM Interventions"
                stroke="#059669"
                strokeWidth={2.5}
                fill="url(#avoidedGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Scientific Disclaimer as specified in prompt */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed">
          <strong>Methodological Note:</strong> Projections represent a stylized simulation of methane generation kinetics from Jimma City municipal solid waste based on IPCC First Order Decay (FOD) defaults for moist tropical conditions (DOC = 0.18, DOCf = 0.5, k = 0.08 yr⁻¹). Emissions decrease as organic fractions are aerobically stabilized into compost instead of decaying anaerobically under open dump conditions.
        </div>
      </div>

      {/* Environmental & Risk Indicators Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-display">
            Environmental Vulnerability Matrix & Threshold Indicators
          </h3>
          <p className="text-xs text-slate-500">
            Monitoring pollution risks across land, water corridors, and urban atmosphere
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {environmentalRisks.map((ind) => (
            <div
              key={ind.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-2.5"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-bold text-slate-900 text-xs font-display">{ind.indicator}</h4>
                  <Badge variant="risk" value={ind.status} size="sm" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{ind.severity}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 text-xs space-y-1">
                <div className="flex justify-between text-slate-700 font-medium">
                  <span>Category:</span>
                  <span className="font-bold text-slate-950">{ind.category}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Trend:</span>
                  <span className="font-semibold text-emerald-800 capitalize">{ind.trend}</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1"><strong>Affected:</strong> {ind.affectedZones}</p>
                <p className="text-[10px] text-emerald-800 mt-0.5"><strong>Mitigation:</strong> {ind.mitigationAction}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Public Health Vulnerabilities & Vector Control */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-rose-600" />
            Public Health Nexus & Vector Control Actions
          </h3>
          <p className="text-xs text-slate-500">
            Assessing the public health dividends of regularized waste removal and liquid effluent containment
          </p>
        </div>

        <div className="space-y-3">
          {publicHealthVulnerabilities.map((vuln, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{vuln.title}</h4>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-900 self-start sm:self-auto">
                  {vuln.level}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">{vuln.description}</p>
              <div className="p-2.5 bg-emerald-50/80 border border-emerald-200 rounded-lg text-emerald-950">
                <strong>Mitigation Strategy:</strong> {vuln.mitigation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
