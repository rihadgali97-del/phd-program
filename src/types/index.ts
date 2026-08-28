export type KebeleType = 'Urban' | 'Peri-Urban';
export type StudyGroup = 'Intervention' | 'Comparison';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type DumpType = 'Organic Waste' | 'Plastic Waste' | 'Liquid Waste' | 'Mixed Waste';
export type IncidentStatus = 'New' | 'Under Review' | 'Assigned' | 'In Progress' | 'Resolved';
export type IncidentPriority = 'Normal' | 'Urgent' | 'Critical';
export type ActivityStatus = 'Not Started' | 'In Progress' | 'Completed';
export type EngagementLevel = 'Low' | 'Medium' | 'High';

export type UserRole =
  | 'Municipal Administrator'
  | 'Sanitation Officer'
  | 'Kebele Monitor'
  | 'Academic Researcher'
  | 'Citizen / Community Leader';

export interface Kebele {
  id: string;
  name: string;
  code: string;
  type: KebeleType;
  group: StudyGroup;
  population: number;
  households: number;
  collectionCoverage: number; // percentage 0-100
  segregationRate: number; // percentage 0-100
  uncollectedWasteKg: number;
  activeDumpingReports: number;
  riskLevel: RiskLevel;
  wasteGenerationKgPerDay: number;
  organicWasteKg: number;
  plasticWasteKg: number;
  liquidWasteRisk: RiskLevel;
  burningRisk: RiskLevel;
  baselineSegregationRate: number;
  baselineCollectionCoverage: number;
  communityParticipationRate: number;
  zone: string;
  coordinates: { x: number; y: number; lat: number; lng: number };
  description: string;
}

export interface Incident {
  id: string;
  date: string;
  kebeleId: string;
  kebeleName: string;
  dumpType: DumpType;
  estimatedWeightKg: number;
  reporterName: string;
  reporterContact?: string;
  landmark?: string;
  description: string;
  status: IncidentStatus;
  riskLevel: RiskLevel;
  priority: IncidentPriority;
  assignedTo?: string;
  resolvedAt?: string;
  resolvedNote?: string;
}

export interface ClimateProjection {
  month: string;
  monthNum: number;
  baselineEmissions: number; // Metric Tons CO2e
  projectedEmissions: number; // Metric Tons CO2e
  reductionCO2e: number; // Metric Tons CO2e
  organicDivertedTons: number;
  compostProducedTons: number;
  openBurningAvoidedPercent: number;
}

export interface InterventionActivity {
  id: string;
  title: string;
  phase: 'Baseline' | 'Stakeholder Co-Design' | 'Intervention' | 'Monitoring & Evaluation' | 'Policy & Scale-up';
  status: ActivityStatus;
  progressPercentage: number;
  targetGroup: 'Intervention Kebeles' | 'City-Wide' | 'Peri-Urban' | 'Comparison Kebeles';
  leadActor: string;
  description: string;
  targetKebelesCount: number;
  startDate: string;
  targetDate: string;
}

export interface StakeholderCategory {
  id: string;
  category: string;
  participantCount: number;
  engagementLevel: EngagementLevel;
  keyActivities: string[];
  roleDescription: string;
  targetOutcomes: string;
  representedOrganizations: string[];
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: string;
}

export interface FilterState {
  search: string;
  group: 'All' | StudyGroup;
  type: 'All' | KebeleType;
  risk: 'All' | RiskLevel;
  dumpType: 'All' | DumpType;
  status: 'All' | IncidentStatus;
  sortBy: 'name' | 'collectionCoverage' | 'segregationRate' | 'uncollectedWasteKg' | 'activeDumpingReports' | 'population';
  sortOrder: 'asc' | 'desc';
}
