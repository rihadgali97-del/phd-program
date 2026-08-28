import { InterventionActivity } from '../types';

export interface WasteStreamComposition {
  name: string;
  percentage: number;
  dailyTons: number;
  color: string;
  isRecyclable: boolean;
  compostable: boolean;
}

export const jimmaWasteComposition: WasteStreamComposition[] = [
  { name: 'Organic / Biodegradable', percentage: 61, dailyTons: 62.8, color: '#10b981', isRecyclable: false, compostable: true },
  { name: 'Plastics & Polymers', percentage: 17, dailyTons: 17.5, color: '#3b82f6', isRecyclable: true, compostable: false },
  { name: 'Paper & Cardboard', percentage: 8, dailyTons: 8.2, color: '#f59e0b', isRecyclable: true, compostable: true },
  { name: 'Glass & Metals', percentage: 5, dailyTons: 5.1, color: '#6366f1', isRecyclable: true, compostable: false },
  { name: 'Textiles & Leather', percentage: 4, dailyTons: 4.1, color: '#ec4899', isRecyclable: false, compostable: false },
  { name: 'Inert / Residual Ash / Others', percentage: 5, dailyTons: 5.2, color: '#64748b', isRecyclable: false, compostable: false },
];

export const interventionActivities: InterventionActivity[] = [
  {
    id: 'act-01',
    title: 'Baseline Household Waste Characterization & Survey',
    phase: 'Baseline',
    status: 'Completed',
    progressPercentage: 100,
    targetGroup: 'City-Wide',
    leadActor: 'Jimma University Research Team & Municipal Sanitation Bureau',
    description: 'Comprehensive 1,200 household baseline sampling across all 17 kebeles assessing per-capita generation, sorting habits, and willingness to pay.',
    targetKebelesCount: 17,
    startDate: 'Jan 2026',
    targetDate: 'Mar 2026',
  },
  {
    id: 'act-02',
    title: 'Multi-Stakeholder Co-Design & Participatory Workshops',
    phase: 'Stakeholder Co-Design',
    status: 'Completed',
    progressPercentage: 100,
    targetGroup: 'Intervention Kebeles',
    leadActor: 'Community Iddir Councils & Waste Collector MSEs',
    description: 'Co-designing color-coded sorting sacks, bi-weekly collection schedules, and neighborhood transfer points with local women associations.',
    targetKebelesCount: 9,
    startDate: 'Apr 2026',
    targetDate: 'May 2026',
  },
  {
    id: 'act-03',
    title: 'Source Segregation (Dry/Wet) Rollout & Bin Distribution',
    phase: 'Intervention',
    status: 'In Progress',
    progressPercentage: 78,
    targetGroup: 'Intervention Kebeles',
    leadActor: 'Jimma Municipal Solid Waste Department',
    description: 'Distribution of 2-stream household sorting bins and subsidized biodegradable bags across 9 intervention kebeles.',
    targetKebelesCount: 9,
    startDate: 'Jun 2026',
    targetDate: 'Oct 2026',
  },
  {
    id: 'act-04',
    title: 'Decentralized Kebele Composting Units & Vermicomposting',
    phase: 'Intervention',
    status: 'In Progress',
    progressPercentage: 65,
    targetGroup: 'Intervention Kebeles',
    leadActor: 'Youth Green Enterprises & Agriculture Office',
    description: 'Construction and operationalization of 6 neighborhood organic composting sites converting organic fractions to soil amendment for urban agriculture.',
    targetKebelesCount: 9,
    startDate: 'Jul 2026',
    targetDate: 'Nov 2026',
  },
  {
    id: 'act-05',
    title: 'Plastic Recovery, Aggregation & Baler Integration',
    phase: 'Intervention',
    status: 'In Progress',
    progressPercentage: 54,
    targetGroup: 'Intervention Kebeles',
    leadActor: 'Jimma Recyclers Cooperative Federation',
    description: 'Establishment of 4 plastic buy-back stations with calibrated digital scales and formal contracts with regional polymer recyclers.',
    targetKebelesCount: 9,
    startDate: 'Aug 2026',
    targetDate: 'Dec 2026',
  },
  {
    id: 'act-06',
    title: 'Digital Citizen Reporting & GPS Hotspot Monitoring (CS-IMSLWM)',
    phase: 'Monitoring & Evaluation',
    status: 'In Progress',
    progressPercentage: 85,
    targetGroup: 'City-Wide',
    leadActor: 'Jimma City Innovation & Research Unit',
    description: 'Deployment of the digital monitoring portal for real-time dumping incident dispatch, kebele metrics tracking, and trial cluster evaluation.',
    targetKebelesCount: 17,
    startDate: 'Aug 2026',
    targetDate: 'Dec 2026',
  },
  {
    id: 'act-07',
    title: 'Midline Cluster-Randomized Comparative Assessment',
    phase: 'Monitoring & Evaluation',
    status: 'In Progress',
    progressPercentage: 40,
    targetGroup: 'City-Wide',
    leadActor: 'Independent Evaluation Panel & Research Fellows',
    description: 'Systematic cross-sectional measurement of waste sorting fidelity, uncollected waste reduction, and emissions mitigation between trial arms.',
    targetKebelesCount: 17,
    startDate: 'Sep 2026',
    targetDate: 'Jan 2027',
  },
  {
    id: 'act-08',
    title: 'Municipal Policy Integration & Scale-Up Framework',
    phase: 'Policy & Scale-up',
    status: 'Not Started',
    progressPercentage: 15,
    targetGroup: 'City-Wide',
    leadActor: 'Jimma City Mayor Office & Council Standing Committee',
    description: 'Translating research evidence into binding municipal bylaws, performance-based waste collection contracts, and regional scale-up roadmap.',
    targetKebelesCount: 17,
    startDate: 'Nov 2026',
    targetDate: 'Mar 2027',
  },
];

export interface TrialComparisonMetric {
  indicator: string;
  unit: string;
  baselineAll: number;
  interventionCurrent: number;
  comparisonCurrent: number;
  pDifference: string;
  targetEndline: number;
  status: 'Significant Improvement' | 'Moderate Gain' | 'Control Maintained';
}

export const trialComparisonMetrics: TrialComparisonMetric[] = [
  {
    indicator: 'Household Waste Segregation Rate',
    unit: '%',
    baselineAll: 13.8,
    interventionCurrent: 51.2,
    comparisonCurrent: 12.9,
    pDifference: '+38.3% (p < 0.001)',
    targetEndline: 70.0,
    status: 'Significant Improvement',
  },
  {
    indicator: 'Municipal Collection Coverage',
    unit: '%',
    baselineAll: 46.2,
    interventionCurrent: 76.8,
    comparisonCurrent: 44.5,
    pDifference: '+32.3% (p < 0.001)',
    targetEndline: 85.0,
    status: 'Significant Improvement',
  },
  {
    indicator: 'Average Uncollected Waste per Kebele',
    unit: 'kg/day',
    baselineAll: 3850,
    interventionCurrent: 1420,
    comparisonCurrent: 3950,
    pDifference: '-64.1% reduction',
    targetEndline: 800,
    status: 'Significant Improvement',
  },
  {
    indicator: 'Active Open Dumping Hotspots',
    unit: 'incidents',
    baselineAll: 7.2,
    interventionCurrent: 1.6,
    comparisonCurrent: 5.4,
    pDifference: '-70.4% fewer dumps',
    targetEndline: 0.5,
    status: 'Significant Improvement',
  },
  {
    indicator: 'Community Meeting & Action Participation',
    unit: '%',
    baselineAll: 24.1,
    interventionCurrent: 74.9,
    comparisonCurrent: 20.8,
    pDifference: '+54.1% engagement',
    targetEndline: 80.0,
    status: 'Significant Improvement',
  },
  {
    indicator: 'Organic Waste Diverted to Composting',
    unit: 'Tons/month',
    baselineAll: 8.5,
    interventionCurrent: 142.0,
    comparisonCurrent: 14.2,
    pDifference: '10x increase',
    targetEndline: 250.0,
    status: 'Significant Improvement',
  },
];
