import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  PlusCircle,
  Menu,
  X,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';

interface HeaderProps {
  onToggleMobileSidebar?: () => void;
  isMobileSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileSidebar,
  isMobileSidebarOpen = false,
}) => {
  const { incidents, setIsReportModalOpen, setSelectedIncidentId, setActiveNavTab, activeNavTab } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  const activeNewIncidents = incidents.filter((i) => i.status === 'New' || i.status === 'Under Review');

  const getPageInfo = () => {
    switch (activeNavTab) {
      case 'dashboard':
        return { title: 'City-Wide Dashboard', subtitle: 'Waste Management & Climate Mitigation Overview' };
      case 'kebeles':
        return { title: 'Municipal Kebeles (17)', subtitle: 'Granular Cluster Profiles, Coverage & Risk Levels' };
      case 'waste':
        return { title: 'Waste Management & Resource Recovery', subtitle: 'Stream Fractions, Decentralized Composting & Logistics' };
      case 'dumping':
        return { title: 'Illegal Dumping Incident Dispatch', subtitle: 'Citizen Reports, Triage Pipeline & Rapid Resolution' };
      case 'intervention':
        return { title: 'Intervention Tracking & Research Trial', subtitle: 'Cluster-Randomized Controlled Evaluation Progress' };
      case 'climate':
        return { title: 'Climate & Environmental Health', subtitle: 'IPCC First-Order Decay GHG Trajectory & Vector Alerts' };
      case 'stakeholders':
        return { title: 'Stakeholder Engagement & Governance', subtitle: 'Iddir Traditional Networks, Micro-Enterprises & Municipal Roles' };
      case 'reports':
        return { title: 'Reports & Policy Simulation', subtitle: 'Dynamic Target Sliders & CSV/JSON Data Exports' };
      case 'settings':
        return { title: 'System Settings & Architecture', subtitle: 'Role Personas, Mock State & Node.js API Blueprint' };
      default:
        return { title: 'CS-IMSLWM Monitoring Portal', subtitle: 'Jimma City Municipal Waste Decision Support' };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shrink-0">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        {onToggleMobileSidebar && (
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}

        <div className="min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight truncate leading-tight">
            {pageInfo.title}
          </h2>
          <p className="text-xs text-slate-500 hidden sm:block truncate leading-tight">
            {pageInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Status Pill, Report Button, Alerts, Avatar */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
        {/* System Online Status Pill */}
        <div className="hidden md:flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 shadow-2xs">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-700">System Online</span>
        </div>

        {/* Action Button: Log Incident */}
        <button
          id="header-report-dumping-btn"
          type="button"
          onClick={() => setIsReportModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">+ Report Incident</span>
          <span className="sm:hidden">Report</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            id="header-notifications-btn"
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            {activeNewIncidents.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {activeNewIncidents.length}
              </span>
            )}
          </button>

          {/* Notifications Popover */}
          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Active Dumping Alerts ({activeNewIncidents.length})
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Live Feed</span>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                  {activeNewIncidents.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-4">
                      No pending dumping alerts. All reported incidents are assigned or resolved.
                    </p>
                  ) : (
                    activeNewIncidents.slice(0, 5).map((inc) => (
                      <div
                        key={inc.id}
                        onClick={() => {
                          setSelectedIncidentId(inc.id);
                          setShowNotifications(false);
                        }}
                        className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer text-left"
                      >
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-semibold text-slate-900">{inc.kebeleName}</span>
                          <span className="font-mono text-[10px] text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded font-bold">
                            {inc.dumpType}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-1">{inc.description}</p>
                        <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                          <span>{inc.estimatedWeightKg} kg • {inc.reporterName}</span>
                          <span>{inc.date}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveNavTab('dumping');
                      setShowNotifications(false);
                    }}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Incidents Queue</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 font-bold text-xs shadow-2xs">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};
