import { Kebele, Incident, ClimateProjection, InterventionActivity, StakeholderCategory } from '../types';
import { initialKebeles } from '../data/kebeles';
import { initialIncidents } from '../data/incidents';
import { initialClimateProjections, environmentalRisks } from '../data/climateData';
import { interventionActivities, trialComparisonMetrics, jimmaWasteComposition } from '../data/indicators';
import { initialStakeholders } from '../data/stakeholders';

/**
 * Service layer abstraction for CS-IMSLWM Monitoring Portal.
 * Currently uses local mock state; designed for drop-in replacement with
 * Node.js/Express REST endpoints (`/api/kebeles`, `/api/incidents`, etc.).
 */

// Simulating network delay helper if needed for realistic feeling
const delay = (ms: number = 50) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  async getKebeles(): Promise<Kebele[]> {
    await delay(30);
    return JSON.parse(JSON.stringify(initialKebeles));
  },

  async getIncidents(): Promise<Incident[]> {
    await delay(30);
    return JSON.parse(JSON.stringify(initialIncidents));
  },

  async getClimateProjections(): Promise<ClimateProjection[]> {
    await delay(30);
    return JSON.parse(JSON.stringify(initialClimateProjections));
  },

  async getEnvironmentalRisks() {
    await delay(30);
    return JSON.parse(JSON.stringify(environmentalRisks));
  },

  async getInterventionActivities(): Promise<InterventionActivity[]> {
    await delay(30);
    return JSON.parse(JSON.stringify(interventionActivities));
  },

  async getTrialMetrics() {
    await delay(30);
    return JSON.parse(JSON.stringify(trialComparisonMetrics));
  },

  async getWasteComposition() {
    await delay(30);
    return JSON.parse(JSON.stringify(jimmaWasteComposition));
  },

  async getStakeholders(): Promise<StakeholderCategory[]> {
    await delay(30);
    return JSON.parse(JSON.stringify(initialStakeholders));
  },
};
