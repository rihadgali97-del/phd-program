import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import {
  Kebele,
  Incident,
  ClimateProjection,
  InterventionActivity,
  StakeholderCategory,
  ToastNotification,
  IncidentStatus,
  DumpType,
  RiskLevel,
  IncidentPriority,
  UserRole,
} from '../types';
import { initialKebeles } from '../data/kebeles';
import { initialIncidents } from '../data/incidents';
import { initialClimateProjections, environmentalRisks, EnvironmentalRiskItem } from '../data/climateData';
import { interventionActivities, trialComparisonMetrics, jimmaWasteComposition, TrialComparisonMetric, WasteStreamComposition } from '../data/indicators';
import { initialStakeholders } from '../data/stakeholders';

export interface NewIncidentPayload {
  kebeleId: string;
  dumpType: DumpType;
  estimatedWeightKg: number;
  reporterName: string;
  reporterContact?: string;
  landmark?: string;
  description: string;
  riskLevel?: RiskLevel;
  priority?: IncidentPriority;
}

interface AppContextType {
  // State
  kebeles: Kebele[];
  incidents: Incident[];
  climateProjections: ClimateProjection[];
  environmentalRisks: EnvironmentalRiskItem[];
  environmentalIndicators: EnvironmentalRiskItem[];
  activities: InterventionActivity[];
  trialMetrics: TrialComparisonMetric[];
  wasteComposition: WasteStreamComposition[];
  stakeholders: StakeholderCategory[];
  toasts: ToastNotification[];
  selectedKebeleId: string | null;
  selectedIncidentId: string | null;
  isReportModalOpen: boolean;
  activeNavTab: string;
  currentRole: UserRole;

  // Setters & UI Handlers
  setSelectedKebeleId: (id: string | null) => void;
  setSelectedIncidentId: (id: string | null) => void;
  setIsReportModalOpen: (open: boolean) => void;
  setActiveNavTab: (tab: string) => void;
  setCurrentRole: (role: UserRole) => void;
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Actions
  addIncident: (payload: NewIncidentPayload) => { success: boolean; incident: Incident };
  updateIncidentStatus: (incidentId: string, newStatus: IncidentStatus, resolvedNote?: string) => void;
  updateKebele: (kebeleId: string, updates: Partial<Kebele>) => void;
  resetToInitialMockData: () => void;
  resetStateToDefault: () => void;

  // Derived Dashboard Metrics
  dashboardMetrics: {
    totalKebeles: number;
    interventionKebelesCount: number;
    comparisonKebelesCount: number;
    urbanKebelesCount: number;
    periUrbanKebelesCount: number;
    totalHouseholds: number;
    totalPopulation: number;
    averageCollectionCoverage: number;
    averageSegregationRate: number;
    totalUncollectedWasteKg: number;
    activeIncidentsCount: number;
    totalResolvedIncidentsCount: number;
    totalWasteGeneratedDailyKg: number;
    estimatedGHGEmissionsCurrent: number; // Metric tons CO2e/month
    estimatedGHGReductionAnnual: number; // Metric tons CO2e/yr
    interventionAvgSorting: number;
    comparisonAvgSorting: number;
    interventionAvgCoverage: number;
    comparisonAvgCoverage: number;
    interventionAvgUncollectedKg: number;
    comparisonAvgUncollectedKg: number;
    highRiskKebelesCount: number;
    mediumRiskKebelesCount: number;
    lowRiskKebelesCount: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [kebeles, setKebeles] = useState<Kebele[]>(initialKebeles);
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [climateProjections] = useState<ClimateProjection[]>(initialClimateProjections);
  const [environmentalRisksList] = useState<EnvironmentalRiskItem[]>(environmentalRisks);
  const [activities] = useState<InterventionActivity[]>(interventionActivities);
  const [trialMetricsList] = useState<TrialComparisonMetric[]>(trialComparisonMetrics);
  const [wasteCompositionList] = useState<WasteStreamComposition[]>(jimmaWasteComposition);
  const [stakeholdersList] = useState<StakeholderCategory[]>(initialStakeholders);

  // UI state
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [selectedKebeleId, setSelectedKebeleId] = useState<string | null>(null);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [activeNavTab, setActiveNavTab] = useState<string>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('Municipal Administrator');

  const addToast = useCallback((title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastNotification = {
      id,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setToasts((prev) => [newToast, ...prev].slice(0, 5));

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const showToast = addToast;

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Add Incident & Reactive Update across state
  const addIncident = useCallback((payload: NewIncidentPayload) => {
    const targetKebele = kebeles.find((k) => k.id === payload.kebeleId) || kebeles[0];
    const generatedId = `INC-2026-${String(incidents.length + 90).padStart(3, '0')}`;
    const todayStr = new Date().toISOString().split('T')[0];

    const newIncident: Incident = {
      id: generatedId,
      date: todayStr,
      kebeleId: targetKebele.id,
      kebeleName: targetKebele.name,
      dumpType: payload.dumpType,
      estimatedWeightKg: Number(payload.estimatedWeightKg),
      reporterName: payload.reporterName,
      reporterContact: payload.reporterContact || 'Not provided',
      landmark: payload.landmark || 'Nearby municipal roadside',
      description: payload.description,
      status: 'New',
      riskLevel: payload.riskLevel || (payload.estimatedWeightKg > 500 ? 'High' : payload.estimatedWeightKg > 250 ? 'Medium' : 'Low'),
      priority: payload.priority || (payload.estimatedWeightKg > 500 ? 'Urgent' : 'Normal'),
    };

    // 1. Prepend to incidents list
    setIncidents((prev) => [newIncident, ...prev]);

    // 2. Reactively update the affected kebele
    setKebeles((prev) =>
      prev.map((k) => {
        if (k.id === targetKebele.id) {
          const updatedUncollected = k.uncollectedWasteKg + Number(payload.estimatedWeightKg);
          const updatedActiveReports = k.activeDumpingReports + 1;
          const updatedRisk: RiskLevel = updatedActiveReports >= 5 || updatedUncollected > 3500 ? 'High' : updatedActiveReports >= 3 || updatedUncollected > 2000 ? 'Medium' : 'Low';
          return {
            ...k,
            uncollectedWasteKg: updatedUncollected,
            activeDumpingReports: updatedActiveReports,
            riskLevel: updatedRisk,
          };
        }
        return k;
      })
    );

    // 3. Show reactive toast notifications
    addToast(
      'Illegal dumping report submitted successfully.',
      `Incident #${generatedId} in ${targetKebele.name} (${payload.estimatedWeightKg} kg) added to active monitoring queue.`,
      'success'
    );

    return { success: true, incident: newIncident };
  }, [kebeles, incidents.length, addToast]);

  // Update Incident Status
  const updateIncidentStatus = useCallback((incidentId: string, newStatus: IncidentStatus, resolvedNote?: string) => {
    let affectedKebeleId: string | null = null;
    let incidentWeight = 0;
    let wasResolvedBefore = false;
    const isNowResolved = newStatus === 'Resolved';

    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          affectedKebeleId = inc.kebeleId;
          incidentWeight = inc.estimatedWeightKg;
          wasResolvedBefore = inc.status === 'Resolved';
          return {
            ...inc,
            status: newStatus,
            resolvedAt: isNowResolved ? new Date().toISOString().split('T')[0] : undefined,
            resolvedNote: resolvedNote || inc.resolvedNote || (isNowResolved ? 'Cleared and verified by sanitation team' : undefined),
          };
        }
        return inc;
      })
    );

    // If changing from active to resolved, decrement kebele active reports and subtract waste
    if (affectedKebeleId && isNowResolved && !wasResolvedBefore) {
      setKebeles((prev) =>
        prev.map((k) => {
          if (k.id === affectedKebeleId) {
            const updatedReports = Math.max(0, k.activeDumpingReports - 1);
            const updatedWaste = Math.max(0, k.uncollectedWasteKg - incidentWeight);
            const updatedRisk: RiskLevel = updatedReports >= 5 || updatedWaste > 3500 ? 'High' : updatedReports >= 3 || updatedWaste > 2000 ? 'Medium' : 'Low';
            return {
              ...k,
              activeDumpingReports: updatedReports,
              uncollectedWasteKg: updatedWaste,
              riskLevel: updatedRisk,
            };
          }
          return k;
        })
      );
      addToast(
        'Incident Resolved',
        `Incident #${incidentId} marked as Resolved. Kebele waste backlog updated.`,
        'success'
      );
    } else {
      addToast(
        'Incident Status Updated',
        `Incident #${incidentId} status changed to "${newStatus}".`,
        'info'
      );
    }
  }, [addToast]);

  // Update Kebele attributes directly if needed
  const updateKebele = useCallback((kebeleId: string, updates: Partial<Kebele>) => {
    setKebeles((prev) =>
      prev.map((k) => (k.id === kebeleId ? { ...k, ...updates } : k))
    );
    addToast('Kebele Updated', 'Kebele indicators updated successfully.', 'info');
  }, [addToast]);

  // Reset to default seed data
  const resetToInitialMockData = useCallback(() => {
    setKebeles(initialKebeles);
    setIncidents(initialIncidents);
    addToast('Data Reset', 'All indicators and reports reset to default baseline mock state.', 'info');
  }, [addToast]);

  const resetStateToDefault = resetToInitialMockData;

  // Derived calculations for city-wide dashboard metrics
  const dashboardMetrics = useMemo(() => {
    const totalKebeles = kebeles.length;
    const interventionKebeles = kebeles.filter((k) => k.group === 'Intervention');
    const comparisonKebeles = kebeles.filter((k) => k.group === 'Comparison');
    const urbanKebeles = kebeles.filter((k) => k.type === 'Urban');
    const periUrbanKebeles = kebeles.filter((k) => k.type === 'Peri-Urban');

    const totalHouseholds = kebeles.reduce((sum, k) => sum + k.households, 0);
    const totalPopulation = kebeles.reduce((sum, k) => sum + k.population, 0);
    const totalWasteGeneratedDailyKg = kebeles.reduce((sum, k) => sum + k.wasteGenerationKgPerDay, 0);
    const totalUncollectedWasteKg = kebeles.reduce((sum, k) => sum + k.uncollectedWasteKg, 0);

    const activeIncidentsCount = incidents.filter((i) => i.status !== 'Resolved').length;
    const totalResolvedIncidentsCount = incidents.filter((i) => i.status === 'Resolved').length;

    // Weighted averages based on households
    const totalHh = totalHouseholds || 1;
    const averageCollectionCoverage = Math.round(
      kebeles.reduce((sum, k) => sum + k.collectionCoverage * k.households, 0) / totalHh
    );
    const averageSegregationRate = Math.round(
      kebeles.reduce((sum, k) => sum + k.segregationRate * k.households, 0) / totalHh
    );

    const intHh = interventionKebeles.reduce((sum, k) => sum + k.households, 0) || 1;
    const compHh = comparisonKebeles.reduce((sum, k) => sum + k.households, 0) || 1;

    const interventionAvgSorting = Math.round(
      interventionKebeles.reduce((sum, k) => sum + k.segregationRate * k.households, 0) / intHh
    );
    const comparisonAvgSorting = Math.round(
      comparisonKebeles.reduce((sum, k) => sum + k.segregationRate * k.households, 0) / compHh
    );

    const interventionAvgCoverage = Math.round(
      interventionKebeles.reduce((sum, k) => sum + k.collectionCoverage * k.households, 0) / intHh
    );
    const comparisonAvgCoverage = Math.round(
      comparisonKebeles.reduce((sum, k) => sum + k.collectionCoverage * k.households, 0) / compHh
    );

    const interventionAvgUncollectedKg = Math.round(
      interventionKebeles.reduce((sum, k) => sum + k.uncollectedWasteKg, 0) / (interventionKebeles.length || 1)
    );
    const comparisonAvgUncollectedKg = Math.round(
      comparisonKebeles.reduce((sum, k) => sum + k.uncollectedWasteKg, 0) / (comparisonKebeles.length || 1)
    );

    const highRiskKebelesCount = kebeles.filter((k) => k.riskLevel === 'High').length;
    const mediumRiskKebelesCount = kebeles.filter((k) => k.riskLevel === 'Medium').length;
    const lowRiskKebelesCount = kebeles.filter((k) => k.riskLevel === 'Low').length;

    // Estimated current GHG emissions: base factor + impact of uncollected / rotting waste
    const baseMonthlyEmissions = 850;
    const uncollectedPenalty = (totalUncollectedWasteKg / 1000) * 8.2;
    const estimatedGHGEmissionsCurrent = Math.round(baseMonthlyEmissions + uncollectedPenalty);
    const estimatedGHGReductionAnnual = Math.round(3450 + (averageSegregationRate * 45));

    return {
      totalKebeles,
      interventionKebelesCount: interventionKebeles.length,
      comparisonKebelesCount: comparisonKebeles.length,
      urbanKebelesCount: urbanKebeles.length,
      periUrbanKebelesCount: periUrbanKebeles.length,
      totalHouseholds,
      totalPopulation,
      averageCollectionCoverage,
      averageSegregationRate,
      totalUncollectedWasteKg,
      activeIncidentsCount,
      totalResolvedIncidentsCount,
      totalWasteGeneratedDailyKg,
      estimatedGHGEmissionsCurrent,
      estimatedGHGReductionAnnual,
      interventionAvgSorting,
      comparisonAvgSorting,
      interventionAvgCoverage,
      comparisonAvgCoverage,
      interventionAvgUncollectedKg,
      comparisonAvgUncollectedKg,
      highRiskKebelesCount,
      mediumRiskKebelesCount,
      lowRiskKebelesCount,
    };
  }, [kebeles, incidents]);

  return (
    <AppContext.Provider
      value={{
        kebeles,
        incidents,
        climateProjections,
        environmentalRisks: environmentalRisksList,
        environmentalIndicators: environmentalRisksList,
        activities,
        trialMetrics: trialMetricsList,
        wasteComposition: wasteCompositionList,
        stakeholders: stakeholdersList,
        toasts,
        selectedKebeleId,
        selectedIncidentId,
        isReportModalOpen,
        activeNavTab,
        currentRole,
        setSelectedKebeleId,
        setSelectedIncidentId,
        setIsReportModalOpen,
        setActiveNavTab,
        setCurrentRole,
        addToast,
        showToast,
        removeToast,
        addIncident,
        updateIncidentStatus,
        updateKebele,
        resetToInitialMockData,
        resetStateToDefault,
        dashboardMetrics,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
