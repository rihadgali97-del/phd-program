import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ToastContainer } from './components/common/ToastContainer';
import { ReportDumpingModal } from './components/modals/ReportDumpingModal';
import { KebeleDetailModal } from './components/modals/KebeleDetailModal';
import { IncidentDetailModal } from './components/modals/IncidentDetailModal';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { KebelesPage } from './pages/KebelesPage';
import { WasteManagementPage } from './pages/WasteManagementPage';
import { IllegalDumpingPage } from './pages/IllegalDumpingPage';
import { InterventionPage } from './pages/InterventionPage';
import { ClimateEnvironmentPage } from './pages/ClimateEnvironmentPage';
import { StakeholdersPage } from './pages/StakeholdersPage';
import { ReportsAnalyticsPage } from './pages/ReportsAnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { activeNavTab, dashboardMetrics } = useApp();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderActivePage = () => {
    switch (activeNavTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'kebeles':
        return <KebelesPage />;
      case 'waste':
        return <WasteManagementPage />;
      case 'dumping':
        return <IllegalDumpingPage />;
      case 'intervention':
        return <InterventionPage />;
      case 'climate':
        return <ClimateEnvironmentPage />;
      case 'stakeholders':
        return <StakeholdersPage />;
      case 'reports':
        return <ReportsAnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Sleek Dark Left Sidebar */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Column: Sleek Top Header + Page Content + Footer */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 min-h-screen">
        {/* Top Municipal Navigation Header */}
        <Header
          isMobileSidebarOpen={isMobileSidebarOpen}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {renderActivePage()}

          {/* Sleek Indicator Strip Footer */}
          <footer className="mt-8 bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-700">
                CS-IMSLWM Jimma City Monitoring
              </span>
              <span className="hidden md:inline text-slate-400">•</span>
              <span className="hidden md:inline">
                {dashboardMetrics.totalKebeles} Kebeles (Intervention: {dashboardMetrics.interventionKebelesCount} | Comparison: {dashboardMetrics.comparisonKebelesCount})
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Low Risk ({dashboardMetrics.lowRiskKebelesCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Medium ({dashboardMetrics.mediumRiskKebelesCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>High Risk ({dashboardMetrics.highRiskKebelesCount})</span>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Global Modals */}
      <ReportDumpingModal />
      <KebeleDetailModal />
      <IncidentDetailModal />

      {/* Notification Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
