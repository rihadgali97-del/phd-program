import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  MapPin,
  Recycle,
  AlertTriangle,
  GitCompare,
  Leaf,
  Users,
  BarChart3,
  SlidersHorizontal,
  Info,
  Layers,
  X,
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen = false, onCloseMobile = () => {} }) => {
  const { activeNavTab, setActiveNavTab, incidents } = useApp();

  const activeIncidentsCount = incidents.filter((i) => i.status !== 'Resolved').length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'kebeles',
      label: 'Kebeles',
      icon: MapPin,
      badge: '17',
    },
    {
      id: 'waste',
      label: 'Waste Management',
      icon: Recycle,
      badge: null,
    },
    {
      id: 'dumping',
      label: 'Illegal Dumping',
      icon: AlertTriangle,
      badge: activeIncidentsCount > 0 ? `${activeIncidentsCount}` : null,
      badgeColor: 'bg-rose-500 text-white font-bold',
      isWarning: true,
    },
    {
      id: 'intervention',
      label: 'Intervention Tracking',
      icon: GitCompare,
      badge: 'Trial',
    },
    {
      id: 'climate',
      label: 'Climate & Env',
      icon: Leaf,
      badge: null,
    },
    {
      id: 'stakeholders',
      label: 'Stakeholders',
      icon: Users,
      badge: null,
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
      badge: null,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: SlidersHorizontal,
      badge: null,
    },
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveNavTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-20 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0 transition-transform duration-200 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand / Logo Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-md flex items-center justify-center text-slate-900 font-bold text-sm shadow-xs">
              CS
            </div>
            <div>
              <h1 className="text-base font-bold text-white leading-tight tracking-tight">
                CS-IMSLWM
              </h1>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Jimma City Monitoring
              </p>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3.5 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNavTab === item.id;

            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                type="button"
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-all group text-left cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                    : item.isWarning && activeIncidentsCount > 0
                    ? 'text-amber-400 hover:bg-slate-800 hover:text-amber-300'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive
                        ? 'text-white'
                        : item.isWarning && activeIncidentsCount > 0
                        ? 'text-amber-400'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                      item.badgeColor || (isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-800 text-slate-300 border border-slate-700')
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Prototype Card Footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 p-3 rounded-lg text-[11px] text-slate-400 border border-slate-700/60">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="font-bold text-slate-200 uppercase tracking-wider text-[10px]">
                PROTOTYPE MODE
              </p>
            </div>
            <p className="leading-relaxed">
              Using simulated research data for Jimma City municipal evaluation (17 Kebeles).
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
