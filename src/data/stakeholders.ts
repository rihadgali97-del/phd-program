import { StakeholderCategory } from '../types';

/**
 * Multi-stakeholder ecosystem for the Climate-Smart Integrated Municipal
 * Solid and Liquid Waste Management (CS-IMSLWM) initiative in Jimma City.
 */
export const initialStakeholders: StakeholderCategory[] = [
  {
    id: 'stk-01',
    category: 'Municipal Administration & Environmental Agency',
    participantCount: 42,
    engagementLevel: 'High',
    keyActivities: [
      'Regulatory oversight and waste bylaw enforcement',
      'Resource allocation for secondary collection trucks and transfer stations',
      'Integration of portal insights into monthly municipal executive reviews',
      'Inter-departmental sanitation coordination',
    ],
    roleDescription: 'City government leadership steering policy alignment, infrastructure investments, and municipal scale-up.',
    targetOutcomes: 'Adopt evidence-based solid waste regulations and institutionalize CS-IMSLWM monitoring.',
    representedOrganizations: [
      'Jimma City Municipality Sanitation Desk',
      'Jimma Environmental Protection Authority',
      'Mayor Office Urban Infrastructure Directorate',
    ],
  },
  {
    id: 'stk-02',
    category: 'University Research & Evaluation Team',
    participantCount: 28,
    engagementLevel: 'High',
    keyActivities: [
      'Cluster-randomized trial design and midline/endline surveys',
      'IPCC-aligned GHG emissions accounting and life cycle analysis',
      'Continuous data quality assurance and stakeholder facilitation',
      'Policy briefs and academic publication preparation',
    ],
    roleDescription: 'Academic and scientific core responsible for trial rigor, indicators validation, and research methodology.',
    targetOutcomes: 'Rigorous empirical evaluation of climate mitigation impact and public health benefits.',
    representedOrganizations: [
      'Jimma University Institute of Health',
      'Faculty of Civil & Environmental Engineering',
      'Ethiopian Public Health Institute (EPHI) Partners',
    ],
  },
  {
    id: 'stk-03',
    category: 'Primary Waste Collection Micro-Enterprises (MSEs)',
    participantCount: 184,
    engagementLevel: 'High',
    keyActivities: [
      'Door-to-door segregated waste collection (wet vs dry rota)',
      'Pushcart and motorized tricycle neighborhood route management',
      'Notification of unmanaged dumping hotspots via the portal',
      'Fee collection and household sorting verification',
    ],
    roleDescription: 'Frontline collectors directly interacting with 56,607 households twice weekly.',
    targetOutcomes: '100% adherence to segregated collection and improved occupational safety gear.',
    representedOrganizations: [
      'Jimma Youth Sanitation Cooperatives Union (14 Kebeles)',
      'Green City Waste Collector Associations',
      'Peri-Urban Transport Micro-Enterprises',
    ],
  },
  {
    id: 'stk-04',
    category: 'Informal Waste Pickers & Scavengers',
    participantCount: 96,
    engagementLevel: 'Medium',
    keyActivities: [
      'Direct recovery of high-value polymers, cardboard, and aluminum',
      'Transition workshops into formal recycling cooperatives',
      'Health checkups and vaccination drives (Tetanus, Hepatitis)',
      'Fair-trade price guarantee agreements with buyers',
    ],
    roleDescription: 'Informal recyclers working at transfer stations and municipal disposal sites.',
    targetOutcomes: 'Formalization into registered micro-enterprises with fair pricing and protective equipment.',
    representedOrganizations: [
      'Jimma Landfill Informal Workers Self-Help Group',
      'Central Market Scavengers Network',
    ],
  },
  {
    id: 'stk-05',
    category: 'Composting & Organic Waste Upcycling Enterprises',
    participantCount: 65,
    engagementLevel: 'High',
    keyActivities: [
      'Operation of 6 kebele decentralized composting units',
      'Vermicomposting and organic bio-fertilizer production',
      'Quality testing of compost for heavy metals and pathogen safety',
      'Supply partnerships with local urban agriculture farmers',
    ],
    roleDescription: 'Value-addition entrepreneurs converting organic waste streams into climate-smart soil conditioners.',
    targetOutcomes: 'Diversion of 600+ tons/month organic waste from methane-producing open dumps.',
    representedOrganizations: [
      'Kochi Bio-Fertilizer Producers Association',
      'Jimma Urban Agro-Ecology Cooperative',
      'Women Vermicompost Initiative',
    ],
  },
  {
    id: 'stk-06',
    category: 'Plastic & Material Recovery Enterprises',
    participantCount: 52,
    engagementLevel: 'Medium',
    keyActivities: [
      'Operation of buy-back aggregation stations',
      'Plastic shredding, washing, and flake baling',
      'Supply chain linkages with polymer recycling manufacturers in Addis Ababa',
    ],
    roleDescription: 'Commercial aggregators processing rigid and flexible plastics for circular value chains.',
    targetOutcomes: 'Zero plastic waste leaking into Awetu river corridor.',
    representedOrganizations: [
      'Oromia Recyclers Federation — Jimma Branch',
      'Green Polymer Processing Hub',
    ],
  },
  {
    id: 'stk-07',
    category: 'Community Iddirs & Kebele Leadership',
    participantCount: 145,
    engagementLevel: 'High',
    keyActivities: [
      'Community dialogue facilitation and local bylaw enforcement',
      'Mobilizing monthly clean-up campaigns (Shengo)',
      'Review of kebele performance cards during general assemblies',
      'Conflict resolution between residents and collection MSEs',
    ],
    roleDescription: 'Traditional and civic leaders holding deep social capital and trust across all 17 kebeles.',
    targetOutcomes: 'High community ownership and peer accountability for clean neighborhoods.',
    representedOrganizations: [
      'Jimma United Iddir Council',
      '17 Kebele Development Committees',
      'Elder Advisory Councils (Jaarsummaa)',
    ],
  },
  {
    id: 'stk-08',
    category: 'Health Extension Workers (HEWs) & Clinics',
    participantCount: 88,
    engagementLevel: 'High',
    keyActivities: [
      'House-to-house hygiene and waste-handling education',
      'Tracking of vector-borne illnesses (diarrhea, malaria, skin infections)',
      'Water point safety monitoring and chlorination checks',
    ],
    roleDescription: 'Primary health cadre connecting environmental sanitation with maternal and child health outcomes.',
    targetOutcomes: 'Reduction in household diarrheal incidence linked to uncollected waste.',
    representedOrganizations: [
      'Jimma City Health Center Network',
      'Urban Health Extension Program',
    ],
  },
  {
    id: 'stk-09',
    category: 'Resident Households & Commercial Tenants',
    participantCount: 56607,
    engagementLevel: 'Medium',
    keyActivities: [
      'Daily waste segregation into organic and recyclable streams',
      'Reporting illegal dumping and collection delays via citizen portal',
      'Participation in neighborhood composting plots and clean-ups',
    ],
    roleDescription: 'The 56,607 resident households across Jimma producing daily waste streams.',
    targetOutcomes: '70%+ household waste segregation compliance in intervention kebeles.',
    representedOrganizations: [
      'Jimma City Residents Federation',
      'Commercial Shopkeepers Association',
      'Hotel & Restaurant Owners Syndicate',
    ],
  },
];
