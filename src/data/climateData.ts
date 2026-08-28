import { ClimateProjection } from '../types';

/**
 * 12-Month Illustrative Climate & GHG Emissions Projections for Jimma City.
 * Based on 2006 IPCC Guidelines for National Greenhouse Gas Inventories
 * and 2019 Refinement (Volume 5: Waste - Landfilling, Composting & Open Burning).
 * 
 * Note: Clearly labeled as Demonstration / Illustrative Simulation Data.
 */
export const initialClimateProjections: ClimateProjection[] = [
  {
    month: 'Month 1',
    monthNum: 1,
    baselineEmissions: 1250,
    projectedEmissions: 1245,
    reductionCO2e: 5,
    organicDivertedTons: 18,
    compostProducedTons: 6,
    openBurningAvoidedPercent: 4,
  },
  {
    month: 'Month 2',
    monthNum: 2,
    baselineEmissions: 1250,
    projectedEmissions: 1215,
    reductionCO2e: 35,
    organicDivertedTons: 42,
    compostProducedTons: 15,
    openBurningAvoidedPercent: 12,
  },
  {
    month: 'Month 3',
    monthNum: 3,
    baselineEmissions: 1250,
    projectedEmissions: 1160,
    reductionCO2e: 90,
    organicDivertedTons: 85,
    compostProducedTons: 32,
    openBurningAvoidedPercent: 22,
  },
  {
    month: 'Month 4',
    monthNum: 4,
    baselineEmissions: 1250,
    projectedEmissions: 1090,
    reductionCO2e: 160,
    organicDivertedTons: 135,
    compostProducedTons: 52,
    openBurningAvoidedPercent: 34,
  },
  {
    month: 'Month 5',
    monthNum: 5,
    baselineEmissions: 1250,
    projectedEmissions: 1010,
    reductionCO2e: 240,
    organicDivertedTons: 195,
    compostProducedTons: 78,
    openBurningAvoidedPercent: 46,
  },
  {
    month: 'Month 6',
    monthNum: 6,
    baselineEmissions: 1250,
    projectedEmissions: 935,
    reductionCO2e: 315,
    organicDivertedTons: 260,
    compostProducedTons: 108,
    openBurningAvoidedPercent: 57,
  },
  {
    month: 'Month 7',
    monthNum: 7,
    baselineEmissions: 1250,
    projectedEmissions: 870,
    reductionCO2e: 380,
    organicDivertedTons: 325,
    compostProducedTons: 136,
    openBurningAvoidedPercent: 66,
  },
  {
    month: 'Month 8',
    monthNum: 8,
    baselineEmissions: 1250,
    projectedEmissions: 810,
    reductionCO2e: 440,
    organicDivertedTons: 390,
    compostProducedTons: 165,
    openBurningAvoidedPercent: 73,
  },
  {
    month: 'Month 9',
    monthNum: 9,
    baselineEmissions: 1250,
    projectedEmissions: 760,
    reductionCO2e: 490,
    organicDivertedTons: 450,
    compostProducedTons: 192,
    openBurningAvoidedPercent: 79,
  },
  {
    month: 'Month 10',
    monthNum: 10,
    baselineEmissions: 1250,
    projectedEmissions: 715,
    reductionCO2e: 535,
    organicDivertedTons: 505,
    compostProducedTons: 218,
    openBurningAvoidedPercent: 84,
  },
  {
    month: 'Month 11',
    monthNum: 11,
    baselineEmissions: 1250,
    projectedEmissions: 675,
    reductionCO2e: 575,
    organicDivertedTons: 555,
    compostProducedTons: 242,
    openBurningAvoidedPercent: 88,
  },
  {
    month: 'Month 12',
    monthNum: 12,
    baselineEmissions: 1250,
    projectedEmissions: 640,
    reductionCO2e: 610,
    organicDivertedTons: 600,
    compostProducedTons: 265,
    openBurningAvoidedPercent: 91,
  },
];

export interface EnvironmentalRiskItem {
  id: string;
  category: string;
  indicator: string;
  status: 'Low' | 'Medium' | 'High';
  severity: string;
  affectedZones: string;
  mitigationAction: string;
  trend: 'improving' | 'stable' | 'worsening';
}

export const environmentalRisks: EnvironmentalRiskItem[] = [
  {
    id: 'env-01',
    category: 'Water Basin',
    indicator: 'Surface Water & Awetu River Contamination',
    status: 'High',
    severity: 'High risk in comparison kebeles along river corridor',
    affectedZones: 'Awetu Mendera, Hirmata Merkato',
    mitigationAction: 'Buffer zone containment barriers and weekly community riverbank cleanups.',
    trend: 'improving',
  },
  {
    id: 'env-02',
    category: 'Drainage',
    indicator: 'Storm Drain Blockage by Plastic & Solid Waste',
    status: 'Medium',
    severity: 'Moderate seasonal blockage during monsoon showers',
    affectedZones: 'Ginjo Guduru, Bosa Kito, Seto Semero',
    mitigationAction: 'Drain mesh screens and micro-enterprise daily gutter clearance rota.',
    trend: 'improving',
  },
  {
    id: 'env-03',
    category: 'Air Quality',
    indicator: 'Open Waste & Plastic Burning Particulate Matter',
    status: 'High',
    severity: 'Elevated localized PM2.5/black carbon emissions in peri-urban fringes',
    affectedZones: 'Seka Chekorsa Border, Doyo Bikila',
    mitigationAction: 'Zero-burning kebele bylaws, door-to-door organic waste collection enforcement.',
    trend: 'improving',
  },
  {
    id: 'env-04',
    category: 'Soil & Agriculture',
    indicator: 'Leachate Soil Infiltration & Farmland Contamination',
    status: 'Medium',
    severity: 'Leachate migration near informal roadside dump points',
    affectedZones: 'Ifa Bula, Mantina peri-urban plots',
    mitigationAction: 'Covered concrete transfer pads and bio-retention composting basins.',
    trend: 'improving',
  },
  {
    id: 'env-05',
    category: 'Liquid Waste',
    indicator: 'Commercial & Coffee Washing Effluent Overflow',
    status: 'Medium',
    severity: 'Seasonal organic BOD loads in peri-urban wash sites',
    affectedZones: 'Bore, Mantina',
    mitigationAction: 'Constructed wetland filters and decentralized settling tanks.',
    trend: 'stable',
  },
  {
    id: 'env-06',
    category: 'Vector Breeding',
    indicator: 'Fly, Rodent & Mosquito Vector Density at Dump Sites',
    status: 'Medium',
    severity: 'Moderate public health exposure risk within 100m of uncollected heaps',
    affectedZones: 'Hirmata Merkato, Seto Semero',
    mitigationAction: 'Rapid response turnaround < 24h for reported organic dump piles.',
    trend: 'improving',
  },
];
