import React from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import {
  Recycle,
  Trash2,
  Droplets,
  Truck,
  Building2,
  Leaf,
  Scale,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

export const WasteManagementPage: React.FC = () => {
  const { wasteComposition, dashboardMetrics } = useApp();

  const recoveryFacilities = [
    {
      name: 'Kochi Decentralized Composting Site',
      type: 'Organic Composting',
      capacityTonsDay: 12.5,
      currentUtilizationPercent: 84,
      servedKebeles: 'Mendera Kochi, Bacho Bore',
      status: 'Operational',
    },
    {
      name: 'Jiren High-Altitude Bio-Compost Plot',
      type: 'Vermicomposting',
      capacityTonsDay: 8.0,
      currentUtilizationPercent: 72,
      servedKebeles: 'Jiren, Ginjo',
      status: 'Operational',
    },
    {
      name: 'Ifa Bula Peri-Urban Agricultural Composting Station',
      type: 'Farm Upcycling',
      capacityTonsDay: 15.0,
      currentUtilizationPercent: 68,
      servedKebeles: 'Ifa Bula, Mantina',
      status: 'Operational',
    },
    {
      name: 'Central Jimma Plastic Recovery & Baler Hub',
      type: 'Polymer Aggregation',
      capacityTonsDay: 6.5,
      currentUtilizationPercent: 90,
      servedKebeles: 'City-Wide Buy-Back',
      status: 'Operational',
    },
    {
      name: 'Awetu River Liquid Waste Settling Wetland (Pilot)',
      type: 'Liquid Effluent Filter',
      capacityTonsDay: 20.0,
      currentUtilizationPercent: 55,
      servedKebeles: 'Awetu Mendera, Hermata Mentina',
      status: 'Commissioning',
    },
  ];

  const collectionFleet = [
    { type: 'Hand Pushcarts (Micro-Enterprises)', count: 142, coverage: 'Door-to-door secondary collection', status: 'Active' },
    { type: 'Motorized Three-Wheelers (Tricycles)', count: 28, coverage: 'Narrow street transfer to secondary pads', status: 'Active' },
    { type: 'Municipal Compactor Trucks (12m³)', count: 6, coverage: 'Main arterial transport to final site', status: '4 Active • 2 Maintenance' },
    { type: 'Vacuum Sludge Tankers (Liquid Waste)', count: 3, coverage: 'Septic de-sludging & commercial units', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Integrated Solid & Liquid Waste Management (IMSLWM)
          </h2>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            Resource Recovery
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Municipal waste characterization, decentralized composting units, collection logistics, and liquid waste stream controls in Jimma City.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Daily Waste Generation"
          value={Math.round(dashboardMetrics.totalWasteGeneratedDailyKg / 1000)}
          unit="Tons/day"
          description={`Across ${dashboardMetrics.totalHouseholds.toLocaleString()} households`}
          icon={Scale}
          highlight="default"
        />

        <StatCard
          title="Organic Waste Fraction"
          value="61"
          unit="%"
          description="~62.8 Tons/day compostable biomass"
          icon={Leaf}
          highlight="emerald"
        />

        <StatCard
          title="Recyclable Polymers"
          value="17"
          unit="%"
          description="~17.5 Tons/day high-value plastics"
          icon={Recycle}
          highlight="emerald"
        />

        <StatCard
          title="Active Collection Fleet"
          value="179"
          unit="Vehicles"
          description="142 pushcarts, 28 tricycles, 9 heavy trucks"
          icon={Truck}
          highlight="default"
        />
      </div>

      {/* Charts Section: Waste Stream Breakdown + Daily Tonnages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stream Composition */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Jimma Municipal Waste Characterization
              </h3>
              <p className="text-xs text-slate-500">Baseline waste composition by mass percentage</p>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Characterization Study</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteComposition}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="percentage"
                >
                  {wasteComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: number | undefined) => [`${val || 0}%`, 'Composition']} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <strong>Key Insight:</strong> Over 61% of Jimma's waste is organic biodegradable matter (food, coffee husks, agricultural residue). Diverting this to decentralized composting is the primary driver for avoiding methane GHG emissions.
          </p>
        </div>

        {/* Daily Generation by Fraction (Tons) */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Daily Estimated Generation by Waste Stream (Tons/Day)
              </h3>
              <p className="text-xs text-slate-500">City-wide tonnage based on ~283,233 population</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wasteComposition} layout="vertical" margin={{ top: 5, right: 30, left: 70, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11 }} unit=" t" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={80} />
                <Tooltip formatter={(val: number | undefined) => [`${val || 0} Tons/day`, 'Estimated Generation']} />
                <Bar dataKey="dailyTons" fill="#059669" radius={[0, 4, 4, 0]}>
                  {wasteComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-900 font-medium">
              Compostable Total: <strong>71.0 Tons/day</strong>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-900 font-medium">
              Recyclable Total: <strong>30.8 Tons/day</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Decentralized Recovery Infrastructure */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-display">
            Decentralized Waste Recovery & Composting Facilities
          </h3>
          <p className="text-xs text-slate-500">
            Pilot resource-recovery units established across intervention clusters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recoveryFacilities.map((fac, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-bold text-slate-900 text-xs font-display">{fac.name}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
                    {fac.status}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 block">{fac.type}</span>
                <p className="text-[11px] text-slate-500 mt-1">Served: {fac.servedKebeles}</p>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Capacity: {fac.capacityTonsDay} t/day</span>
                  <span className="font-bold text-slate-900">{fac.currentUtilizationPercent}% Utilized</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5">
                  <div
                    className="bg-emerald-600 h-1.5 rounded-full"
                    style={{ width: `${fac.currentUtilizationPercent}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collection Logistics & Fleet Status */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
        <h3 className="text-sm font-bold text-slate-900 font-display mb-1">
          Municipal Collection Logistics & Micro-Enterprise Fleet
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Two-tier collection framework connecting primary door-to-door handlers with secondary transport
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {collectionFleet.map((fleet, i) => (
            <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-base">{fleet.count} Units</span>
                <span className="text-[10px] font-semibold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                  {fleet.status}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-800">{fleet.type}</p>
              <p className="text-[11px] text-slate-500">{fleet.coverage}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
