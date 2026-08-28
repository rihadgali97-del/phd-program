import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  Settings,
  UserCheck,
  Shield,
  Database,
  RotateCcw,
  BookOpen,
  Server,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { currentRole, setCurrentRole, resetStateToDefault, showToast } = useApp();

  const roles: { role: UserRole; title: string; desc: string; permissions: string }[] = [
    {
      role: 'Municipal Administrator',
      title: 'Municipal Administrator',
      desc: 'Full administrative access across all 17 kebeles, resource allocations, and executive scorecards.',
      permissions: 'All controls, approval workflows, trial configuration & dataset exports.',
    },
    {
      role: 'Sanitation Officer',
      title: 'Sanitation Rapid Response Officer',
      desc: 'Dispatches collection teams, resolves open dumping incidents, and oversees transfer stations.',
      permissions: 'Incident triage, workflow updates, collection rota updates.',
    },
    {
      role: 'Kebele Monitor',
      title: 'Kebele Health Extension & Field Monitor',
      desc: 'Local cluster monitor logging frontline dumping incidents and household sorting adherence.',
      permissions: 'Incident logging, kebele data view, community event tracking.',
    },
    {
      role: 'Academic Researcher',
      title: 'Jimma University Research Lead',
      desc: 'Accesses cluster-randomized trial statistics, econometric comparisons, and GHG modeling data.',
      permissions: 'Trial analytics, raw dataset exports, methodology parameters.',
    },
    {
      role: 'Citizen / Community Leader',
      title: 'Citizen & Iddir Community Representative',
      desc: 'Community interface for submitting dumping reports, viewing kebele score, and local events.',
      permissions: 'Public incident reporting, local awareness guidelines.',
    },
  ];

  const futureAPIEndpoints = [
    { method: 'GET', endpoint: '/api/v1/kebeles', desc: 'Returns all 17 kebeles with real-time aggregated metrics.' },
    { method: 'GET', endpoint: '/api/v1/kebeles/:id', desc: 'Returns detailed time-series & stream composition for a specific kebele.' },
    { method: 'POST', endpoint: '/api/v1/incidents', desc: 'Submits new illegal dumping report with geo-coordinates and photos.' },
    { method: 'PATCH', endpoint: '/api/v1/incidents/:id/status', desc: 'Updates dispatch and resolution workflow state.' },
    { method: 'GET', endpoint: '/api/v1/analytics/trial-comparison', desc: 'Computes statistical difference between trial arms.' },
    { method: 'GET', endpoint: '/api/v1/climate/ghg-projections', desc: 'Calculates IPCC First Order Decay landfill methane avoidance.' },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            System Settings & Research Architecture
          </h2>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
            System Config
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Role simulation, mock data state management, and Node.js API backend transition specs.
        </p>
      </div>

      {/* Role Switcher */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            Active Role Persona Simulation
          </h3>
          <p className="text-xs text-slate-500">
            Switch user role to simulate permissions and tailored interfaces across municipal workflows
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {roles.map((r) => (
            <div
              key={r.role}
              onClick={() => setCurrentRole(r.role)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                currentRole === r.role
                  ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm font-display">
                    {r.title}
                  </h4>
                  {currentRole === r.role && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-700 text-white">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{r.desc}</p>
              </div>
              <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                <strong>Permissions:</strong> {r.permissions}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* State & Reset Engine */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-600" />
              Client State & Mock Persistence Management
            </h3>
            <p className="text-xs text-slate-500">
              The application runs on reactive in-memory and local state simulating backend CRUD behavior.
            </p>
          </div>

          <button
            type="button"
            onClick={resetStateToDefault}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo State to Initial Baseline</span>
          </button>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
          <p className="font-semibold text-slate-900">
            System Notice: Demonstration & Prototype Architecture
          </p>
          <p className="leading-relaxed text-slate-600">
            All data operations (creating dumping incidents, updating statuses, calculating derived KPIs) are executed via standard TypeScript service interfaces located in the service layer (<code className="bg-slate-200 px-1 py-0.5 rounded">apiMockService.ts</code>). This ensures a clean separation of concerns for replacing mock data with real Express/PostgreSQL endpoints.
          </p>
        </div>
      </div>

      {/* API Backend Readiness Blueprint */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-600" />
            Backend REST API Specification (Node.js / Express Ready)
          </h3>
          <p className="text-xs text-slate-500">
            The frontend contracts are mapped 1:1 for immediate drop-in integration with the future production API
          </p>
        </div>

        <div className="space-y-2">
          {futureAPIEndpoints.map((ep, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] ${
                    ep.method === 'GET'
                      ? 'bg-blue-100 text-blue-800'
                      : ep.method === 'POST'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {ep.method}
                </span>
                <code className="font-mono font-semibold text-slate-900">{ep.endpoint}</code>
              </div>
              <span className="text-slate-600 text-[11px]">{ep.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Research Citation & Project Background */}
      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-md border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-emerald-400">
          <BookOpen className="w-5 h-5" />
          <h3 className="text-base font-bold font-display">
            Research Project Metadata & Citations
          </h3>
        </div>

        <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
          <p>
            <strong>Project Title:</strong> “Climate-Smart Municipal Waste Management for Climate Change Mitigation, Environmental and Public Health Protection in Jimma City, Ethiopia.”
          </p>
          <p>
            <strong>Study Setting:</strong> Jimma City Administration, Southwestern Ethiopia (Elevation: 1,780m, Wet Tropical Plateau, 17 Kebeles).
          </p>
          <p>
            <strong>Academic Partners:</strong> Jimma University College of Public Health & Medical Sciences, Jimma Institute of Technology (JiT), Jimma City Municipality Sanitation & Beautification Agency.
          </p>
          <p>
            <strong>Framework Version:</strong> CS-IMSLWM Monitoring Portal v1.0 (Prototype Build).
          </p>
        </div>
      </div>
    </div>
  );
};
