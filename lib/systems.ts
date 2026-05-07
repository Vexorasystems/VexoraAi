export type SystemStatus = 'op' | 'heat' | 'idle';

export interface VexSystem {
  code: string;          // VEX/HSP/CONCORD
  slug: string;          // concord (URL slug)
  status: SystemStatus;
  name: string;          // 'Concord'
  industry: string;      // 'Hospitality'
  category: string;      // 'Concierge'
  description: string;
  features: string[];
  metricLabel: string;
  metricValue: string;
}

const raw: [string, SystemStatus, string, string, string, string, string[], string, string][] = [
  // ===== Legal =====
  ['VEX/LGL/AURELIS',  'op',   'Aurelis',     'Legal',       'Intake & Triage',         'Continuous matter intake with conflict-check and AI triage; routes to the right partner instantly.', ['Cognitive intake', 'Conflict-checking', 'Auto-routing'], 'matters · 24h', '184k'],
  ['VEX/LGL/CLAUSE',   'op',   'Clause',      'Legal',       'Contract Cortex',         'Drafting, redlining and clause compliance across the firm; every contract observable.', ['Drafting', 'Redline', 'Clause library'], 'contracts · mo', '12.4k'],
  ['VEX/LGL/MERIDIAN', 'op',   'Meridian',    'Legal',       'Litigation',              'Matter intelligence with discovery support and precedent retrieval at firm scale.', ['Discovery', 'Precedent', 'Matter view'], 'partners on', '420'],
  ['VEX/LGL/CITADEL',  'op',   'Citadel',     'Legal',       'Compliance Grid',         'Regulatory posture monitoring with audit-grade reporting and obligation tracking.', ['Posture', 'Audit', 'Obligations'], 'firms · live', '94'],
  // ===== Healthcare =====
  ['VEX/HLT/CIRRUS',   'op',   'Cirrus',      'Healthcare',  'Clinical Layer',          'Clinical intake, triage and ambient documentation across every visit and channel.', ['Triage', 'Ambient notes', 'PMS sync'], 'visits · d', '38k'],
  ['VEX/HLT/SOLACE',   'op',   'Solace',      'Healthcare',  'Patient Engagement',      'Multi-language patient engagement, follow-up loops, and care navigation.', ['Follow-up', 'Multi-lang', 'Navigation'], 'languages', '18'],
  ['VEX/HLT/PRISM',    'op',   'Prism',       'Healthcare',  'Prior-Auth',              'Pre-certification and prior-auth orchestration with payer-specific handling.', ['Pre-cert', 'Prior-auth', 'Payer logic'], 'auths · d', '14k'],
  ['VEX/HLT/ATLAS',    'op',   'Atlas',       'Healthcare',  'Population Analytics',    'Population health analytics with risk stratification and predictive cohorting.', ['Risk strat', 'Cohorts', 'Predictive'], 'lives covered', '4.2M'],
  // ===== Hospitality =====
  ['VEX/HSP/CONCORD',  'op',   'Concord',     'Hospitality', 'Concierge',               'Continuous guest concierge with predictive routing, multi-language coverage and PMS sync.', ['Concierge', 'PMS sync', 'Pre-arrival'], 'guests · d', '128k'],
  ['VEX/HSP/HORIZON',  'op',   'Horizon',     'Hospitality', 'Revenue Optimisation',    'Yield and rate intelligence across rooms, packages and direct channels.', ['Yield', 'Rate', 'Direct'], 'props · live', '420'],
  ['VEX/HSP/HALCYON',  'op',   'Halcyon',     'Hospitality', 'Recovery & Loyalty',      'Service recovery, loyalty cadences and post-stay loops at hotel-group scale.', ['Recovery', 'Loyalty', 'Cadence'], 'recoveries · m', '2.4k'],
  ['VEX/HSP/SAVOY',    'heat', 'Savoy',       'Luxury',      'VIP Itinerary',           'Private itinerary and concierge intelligence for ultra-private clientele.', ['Private', 'Itinerary', 'Discretion'], 'profiles', '1.2k'],
  // ===== Restaurants =====
  ['VEX/RST/EMBER',    'op',   'Ember',       'Restaurants', 'Reservations',            'Restaurant reservation and waitlist intelligence with no-show prediction.', ['Reservations', 'Waitlist', 'No-show'], 'covers · d', '94k'],
  ['VEX/RST/HEARTH',   'op',   'Hearth',      'Restaurants', 'Kitchen Cadence',         'Kitchen pace, ticket flow and station load balancing during service.', ['Cadence', 'Tickets', 'Stations'], 'venues live', '320'],
  ['VEX/RST/CARTE',    'op',   'Carte',       'Restaurants', 'Menu Engineering',        'Menu engineering, dynamic pricing and inventory cadence — across the group.', ['Engineering', 'Pricing', 'Inventory'], 'SKUs tuned', '14k'],
  // ===== Real Estate =====
  ['VEX/RES/HARBOUR',  'op',   'Harbour',     'Real Estate', 'Property Inquiry',        'Property inquiry routing with comp-set retrieval and showing scheduling.', ['Inquiry', 'Comps', 'Showings'], 'inquiries · w', '24k'],
  ['VEX/RES/PARAGON',  'op',   'Paragon',     'Real Estate', 'Investment Briefs',       'Institutional comp briefs with market signal aggregation and tour packaging.', ['Briefs', 'Signals', 'Tours'], 'tours · m', '1.8k'],
  ['VEX/RES/STRATA',   'idle', 'Strata',      'Real Estate', 'Portfolio Operations',    'Multi-property operations console with maintenance, renewals and risk.', ['Maint.', 'Renewals', 'Risk'], 'units', '47k'],
  // ===== Finance =====
  ['VEX/FIN/NORTHSTAR','op',   'Northstar',   'Finance',     'Compliance Grid',         'Continuous AML, KYC and reconciliation across the financial perimeter.', ['AML', 'KYC', 'Recon'], 'institutions', '38'],
  ['VEX/FIN/BEACON',   'op',   'Beacon',      'Finance',     'Treasury Operations',     'Treasury observability, cash forecasting and intercompany reconciliation.', ['Treasury', 'Forecast', 'Recon'], 'entities', '720'],
  ['VEX/FIN/HALO',     'op',   'Halo',        'Finance',     'Wealth Engagement',       'Private-client engagement with portfolio context and proactive cadences.', ['Private', 'Portfolio', 'Cadence'], 'AUM tracked', '£42B'],
  ['VEX/FIN/IRONCLAD', 'heat', 'Ironclad',    'Insurance',   'Claims',                  'Claims triage, fraud signal evaluation and subrogation queuing.', ['Triage', 'Fraud', 'Subro'], 'claims · m', '94k'],
  // ===== Government =====
  ['VEX/GOV/CIVIC',    'op',   'Civic',       'Government',  'Constituent',             'Constituent case management with eligibility checks and FOI triage.', ['Cases', 'Eligibility', 'FOI'], 'councils', '94'],
  ['VEX/GOV/SUMMIT',   'op',   'Summit',      'Government',  'Permits & Licensing',     'Permit and licensing fast-tracking with inspection scheduling.', ['Permits', 'Licensing', 'Inspections'], 'permits · w', '14k'],
  ['VEX/GOV/SENTINEL', 'op',   'Sentinel',    'Defence',     'Operations Intelligence', 'Defence-grade operations intelligence with reporting and chain-of-custody.', ['Intel', 'Reporting', 'Custody'], 'environments', '18'],
  // ===== Political =====
  ['VEX/POL/SUFFRAGE', 'op',   'Suffrage',    'Political',   'Voter Intelligence',      'Voter intelligence, sentiment ingestion and canvassing route updates.', ['Voter', 'Sentiment', 'Canvassing'], 'campaigns', '24'],
  ['VEX/POL/AGORA',    'op',   'Agora',       'Political',   'Donor Outreach',          'Donor lifecycle, outreach scheduling and event coordination at scale.', ['Donor', 'Outreach', 'Events'], 'donors · live', '184k'],
  ['VEX/POL/HERALD',   'op',   'Herald',      'Political',   'Press Cadence',           'Press release cadence and media list intelligence with rapid response.', ['Press', 'Media', 'Rapid'], 'releases · m', '420'],
  ['VEX/POL/QUORUM',   'op',   'Quorum',      'Political',   'Constituency Layer',      'Constituency portfolio with letter triage and case follow-up.', ['Triage', 'Letters', 'Follow-up'], 'offices', '320'],
  // ===== Recruitment =====
  ['VEX/REC/PROSPER',  'op',   'Prosper',     'Recruitment', 'Talent Stack',            'Candidate sourcing, panel calibration and interview drafting at firm scale.', ['Sourcing', 'Calibration', 'Interview'], 'placements · q', '4.2k'],
  ['VEX/REC/CADRE',    'op',   'Cadre',       'Recruitment', 'Hiring Operations',       'End-to-end hiring operations with offer composition and reference loops.', ['Operations', 'Offers', 'References'], 'roles · live', '14k'],
  ['VEX/REC/LATTICE',  'idle', 'Lattice',     'Recruitment', 'People Analytics',        'People analytics, retention modelling and skills-graph intelligence.', ['Analytics', 'Retention', 'Skills'], 'orgs', '420'],
  // ===== Ecommerce =====
  ['VEX/ECM/EMBER',    'op',   'Ember',       'Ecommerce',   'Cart Recovery',           'Cart recovery, recommendation serving and review triage.', ['Recovery', 'Recs', 'Reviews'], 'carts · d', '94k'],
  ['VEX/ECM/PRISMA',   'op',   'Prisma',      'Ecommerce',   'Personalization',         'Personalization, recommendation engine and inventory rebalancing.', ['Personal', 'Recs', 'Inventory'], 'sessions · d', '14M'],
  ['VEX/ECM/KILN',     'op',   'Kiln',        'Ecommerce',   'Brand Monitoring',        'Brand monitoring, sentiment scoring and review cadence.', ['Monitor', 'Sentiment', 'Cadence'], 'mentions · d', '184k'],
  ['VEX/ECM/RIPPLE',   'heat', 'Ripple',      'Ecommerce',   'Returns Logistics',       'Returns triage, restocking cadence and refund logic at scale.', ['Returns', 'Restock', 'Refund'], 'returns · m', '24k'],
  // ===== Media / Creator =====
  ['VEX/MED/BROADCAST','op',   'Broadcast',   'Media',       'Editorial Network',       'Newsroom cadence with rapid editorial drafting and beat coverage.', ['Cadence', 'Drafting', 'Beats'], 'newsrooms', '94'],
  ['VEX/MED/AURIO',    'op',   'Aurio',       'Creator',     'Content Pipeline',        'Asset variant generation, scheduling and engagement scoring.', ['Variants', 'Schedule', 'Engagement'], 'creators', '4.2k'],
  ['VEX/MED/HALOS',    'op',   'Halos',       'Creator',     'Audience Engagement',     'Community engagement, comment cadence and superfan identification.', ['Comments', 'Cadence', 'Superfans'], 'audience', '184M'],
  ['VEX/MED/COMPASS',  'idle', 'Compass',     'Media',       'Pitch Engine',            'Pitch composition, prospect routing and editorial inbox triage.', ['Pitch', 'Routing', 'Triage'], 'pitches · m', '14k'],
  // ===== Education =====
  ['VEX/EDU/SCHOLAR',  'op',   'Scholar',     'Education',   'Admissions',              'Admissions review, cohort matching and progress evaluation at scale.', ['Admissions', 'Cohorts', 'Progress'], 'institutions', '320'],
  ['VEX/EDU/MENTOR',   'op',   'Mentor',      'Education',   'Tutor Matching',          'Adaptive tutor matching with learning-path orchestration.', ['Matching', 'Paths', 'Adaptive'], 'students', '420k'],
  ['VEX/EDU/ARCHIVE',  'op',   'Archive',     'Education',   'Curriculum Layer',        'Curriculum library with assessment generation and evaluation logic.', ['Library', 'Assessment', 'Eval'], 'modules', '14k'],
  // ===== Logistics =====
  ['VEX/LOG/COMPASS',  'op',   'Compass',     'Logistics',   'Routing Matrix',          'Route optimisation, fleet rebalancing and ETA recomputation in flight.', ['Routes', 'Fleet', 'ETA'], 'routes · d', '184k'],
  ['VEX/LOG/PORTAL',   'op',   'Portal',      'Logistics',   'Last-Mile',               'Last-mile coordination with driver matching and exception handling.', ['Last-mile', 'Drivers', 'Exceptions'], 'drivers', '24k'],
  ['VEX/LOG/PILOT',    'heat', 'Pilot',       'Logistics',   'Fleet Network',           'Fleet observability, maintenance scheduling and asset utilisation.', ['Observe', 'Maint.', 'Util.'], 'vehicles', '94k'],
  // ===== Construction =====
  ['VEX/CON/FORGE',    'op',   'Forge',       'Construction','Project Layer',           'Drawing review, change-order tracking and site report generation.', ['Drawings', 'Change-orders', 'Reports'], 'projects', '4.2k'],
  ['VEX/CON/BLUEPRINT','op',   'Blueprint',   'Construction','Bid & Estimate',          'Bid composition, estimate intelligence and supplier coordination.', ['Bids', 'Estimates', 'Suppliers'], 'bids · m', '1.4k'],
  ['VEX/CON/CRAFT',    'idle', 'Craft',       'Construction','Trades Coordination',     'Subcontractor coordination, scheduling and quality-check loops.', ['Subs', 'Schedule', 'Quality'], 'subs', '24k'],
  // ===== Insurance =====
  ['VEX/INS/COVER',    'op',   'Cover',       'Insurance',   'Underwriting',            'Continuous underwriting with risk modelling and policy composition.', ['Underwrite', 'Risk', 'Policy'], 'quotes · d', '184k'],
  ['VEX/INS/SHELTER',  'op',   'Shelter',     'Insurance',   'Customer Operations',     'Customer operations with renewal cadence and coverage optimisation.', ['Renewals', 'Coverage', 'Cadence'], 'policies', '1.4M'],
  ['VEX/INS/IRONCLAD', 'op',   'Ironclad',    'Insurance',   'Fraud Detection',         'Fraud signal aggregation, claim triage and SIU coordination.', ['Fraud', 'Triage', 'SIU'], 'signals · d', '24k'],
  // ===== Aviation =====
  ['VEX/AVI/AVIATOR',  'op',   'Aviator',     'Aviation',    'Operations',              'Turnaround coordination, crew scheduling and ground-delay re-routing.', ['Turnaround', 'Crew', 'Re-route'], 'flights · d', '14k'],
  ['VEX/AVI/SKYLINE',  'op',   'Skyline',     'Aviation',    'Maintenance',             'Predictive maintenance, fleet checks and engineering coordination.', ['Predictive', 'Checks', 'Engineering'], 'aircraft', '4.2k'],
  // ===== Cyber =====
  ['VEX/CYB/AEGIS',    'op',   'Aegis',       'Cyber',       'Sentinel Grid',           'Threat detection, anomaly auto-resolution and response orchestration.', ['Detection', 'Anomaly', 'Response'], 'orgs · live', '420'],
  ['VEX/CYB/VIGIL',    'op',   'Vigil',       'Cyber',       'Identity & Access',       'Identity intelligence with access pattern verification and posture monitoring.', ['Identity', 'Access', 'Posture'], 'identities', '4.2M'],
  ['VEX/CYB/HARDWALL', 'op',   'Hardwall',    'Cyber',       'Breach Response',         'Breach response orchestration with chain-of-custody and post-mortem.', ['Response', 'Custody', 'Post-mortem'], 'incidents · y', '1.4k'],
  // ===== Law Enforcement =====
  ['VEX/LEO/BEACON',   'op',   'Beacon',      'Law Enforcement','Intelligence Cortex',  'Intelligence cross-referencing, case-folder linking and patrol routing.', ['Cross-ref', 'Folders', 'Patrol'], 'agencies', '94'],
  ['VEX/LEO/EVIDENCE', 'op',   'Evidence',    'Law Enforcement','Evidence Layer',       'Evidence indexing with chain-of-custody and digital forensic intake.', ['Indexing', 'Custody', 'Forensic'], 'cases', '184k'],
  // ===== Events =====
  ['VEX/EVT/STAGE',    'op',   'Stage',       'Events',      'Production Network',      'Production cueing, capacity rebalancing and broadcast cue coordination.', ['Cues', 'Capacity', 'Broadcast'], 'events · m', '320'],
  ['VEX/EVT/TICKET',   'op',   'Ticket',      'Events',      'Demand Engine',           'Ticket scaling, capacity matching and sponsor reach quantification.', ['Scaling', 'Capacity', 'Sponsors'], 'tickets · y', '14M'],
  // ===== Luxury =====
  ['VEX/LUX/DOMAIN',   'op',   'Domain',      'Luxury',      'Concierge Layer',         'Private booking confirmation, concierge briefing and preference caching.', ['Booking', 'Briefing', 'Preferences'], 'estates', '420'],
  ['VEX/LUX/ALCOVE',   'idle', 'Alcove',      'Luxury',      'Atelier Operations',      'Atelier client management, custom commissions and lifecycle cadence.', ['Clients', 'Commissions', 'Cadence'], 'maisons', '94'],
  // ===== Automotive =====
  ['VEX/AUT/MARQUE',   'op',   'Marque',      'Automotive',  'Commerce Fabric',         'Lead scoring, service appointments and inventory matching at dealership scale.', ['Leads', 'Service', 'Inventory'], 'dealerships', '4.2k'],
  ['VEX/AUT/PISTON',   'op',   'Piston',      'Automotive',  'After-Sales',             'Service coordination, parts logistics and trade-in valuation.', ['Service', 'Parts', 'Trade-in'], 'services · d', '24k'],
  // ===== Manufacturing =====
  ['VEX/IND/FORGE',    'op',   'Forge',       'Manufacturing','OEE Cortex',             'Preventive ticketing, sensor anomaly resolution and OEE recomputation.', ['Tickets', 'Anomaly', 'OEE'], 'plants', '420'],
  ['VEX/IND/ANVIL',    'op',   'Anvil',       'Manufacturing','Work Order Engine',      'Work order issuance with parts coordination and scheduling.', ['Work orders', 'Parts', 'Schedule'], 'orders · d', '24k'],
  // ===== NGO =====
  ['VEX/NGO/RELIEF',   'op',   'Relief',      'NGO',         'Coordination Network',    'Humanitarian coordination, donor matching and aid request triage.', ['Coordination', 'Donor', 'Triage'], 'orgs', '1.4k'],
  ['VEX/NGO/LATTICE',  'op',   'Lattice',     'NGO',         'Volunteer Layer',         'Volunteer routing, impact tracking and engagement cadence.', ['Routing', 'Impact', 'Cadence'], 'volunteers', '184k'],
  // ===== Religious =====
  ['VEX/REL/SANCTUM',  'op',   'Sanctum',     'Religious',   'Community Layer',         'Pastoral request triage, service planning and community outreach.', ['Pastoral', 'Service', 'Outreach'], 'communities', '4.2k'],
  // ===== Sports =====
  ['VEX/SPT/STADIUM',  'op',   'Stadium',     'Sports',      'Venue Network',           'Stadium operations with concessions, broadcast and security cadence.', ['Concessions', 'Broadcast', 'Security'], 'venues', '420'],
  ['VEX/SPT/ATHLETE',  'op',   'Athlete',     'Sports',      'Performance Cortex',      'Athlete performance modelling with workload and recovery intelligence.', ['Performance', 'Workload', 'Recovery'], 'athletes', '14k'],
  ['VEX/SPT/FAN',      'idle', 'Fan',         'Sports',      'Fan Cortex',              'Fan engagement queuing, roster patterning and broadcast cueing.', ['Engagement', 'Roster', 'Broadcast'], 'clubs', '320'],
];

function makeSlug(s: [string, SystemStatus, string, string, string, string, string[], string, string]): string {
  // Use the suffix after the second slash as the slug, lowercased, with industry prefix for uniqueness
  const code = s[0]; // e.g. VEX/HSP/CONCORD
  const parts = code.split('/');
  return (parts[1] + '-' + parts[2]).toLowerCase();
}

export const systems: VexSystem[] = raw.map(s => ({
  code: s[0],
  slug: makeSlug(s),
  status: s[1],
  name: s[2],
  industry: s[3],
  category: s[4],
  description: s[5],
  features: s[6],
  metricLabel: s[7],
  metricValue: s[8],
}));

export function getSystemBySlug(slug: string): VexSystem | undefined {
  return systems.find(s => s.slug === slug);
}

export function getRelatedSystems(slug: string, limit = 4): VexSystem[] {
  const target = getSystemBySlug(slug);
  if (!target) return [];
  return systems
    .filter(s => s.slug !== slug && s.industry === target.industry)
    .slice(0, limit);
}

// Map category text to enterprise stack-type label for proprietary positioning
export function deriveStackType(cat: string): string {
  const c = cat.toLowerCase();
  if (c.includes('intake') || c.includes('reception') || c.includes('triage')) return 'Cognitive Layer';
  if (c.includes('compliance') || c.includes('audit') || c.includes('risk')) return 'Compliance Grid';
  if (c.includes('intelligence') || c.includes('analysis') || c.includes('analytics')) return 'Intelligence Stack';
  if (c.includes('workflow') || c.includes('coordination') || c.includes('automation')) return 'Workflow Engine';
  if (c.includes('detection') || c.includes('monitoring') || c.includes('safety') || c.includes('threat') || c.includes('sentinel')) return 'Sentinel Grid';
  if (c.includes('reporting')) return 'Reporting Suite';
  if (c.includes('pipeline') || c.includes('content')) return 'Pipeline Fabric';
  if (c.includes('command')) return 'Command Matrix';
  if (c.includes('engine') || c.includes('recommendation') || c.includes('personalization')) return 'Inference Engine';
  if (c.includes('routing') || c.includes('dispatch') || c.includes('route')) return 'Routing Matrix';
  if (c.includes('claims') || c.includes('policy') || c.includes('document')) return 'Operations Stack';
  if (c.includes('onboarding')) return 'Onboarding Layer';
  if (c.includes('booking') || c.includes('reservation') || c.includes('scheduling') || c.includes('appointment')) return 'Orchestration Layer';
  if (c.includes('signal') || c.includes('sentiment')) return 'Signal Cortex';
  if (c.includes('predictive') || c.includes('maintenance')) return 'Predictive Engine';
  if (c.includes('lifecycle')) return 'Lifecycle Network';
  if (c.includes('engagement') || c.includes('support') || c.includes('community')) return 'Engagement Cortex';
  if (c.includes('lead') || c.includes('hiring') || c.includes('candidate') || c.includes('interview')) return 'Talent Stack';
  if (c.includes('publishing') || c.includes('newsroom')) return 'Editorial Network';
  if (c.includes('vip') || c.includes('investor')) return 'Concierge Layer';
  if (c.includes('admissions') || c.includes('learning') || c.includes('student')) return 'Education Fabric';
  if (c.includes('production') || c.includes('project')) return 'Production Engine';
  if (c.includes('hospital') || c.includes('clinical')) return 'Clinical Fabric';
  if (c.includes('hotel') || c.includes('concierge') || c.includes('guest')) return 'Hospitality Layer';
  if (c.includes('contract')) return 'Contract Cortex';
  if (c.includes('litigation')) return 'Matter Engine';
  if (c.includes('fan')) return 'Fan Cortex';
  if (c.includes('stadium') || c.includes('venue')) return 'Venue Network';
  if (c.includes('citizen') || c.includes('constituent')) return 'Civic Layer';
  if (c.includes('fleet')) return 'Fleet Network';
  return 'Operations Core';
}

// Industry list (unique, sorted)
export const industries: string[] = Array.from(new Set(systems.map(s => s.industry))).sort();

// Mock metrics generators for system pages — deterministic per system
export function generateMetrics(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  const pct = (90 + (h % 10)).toFixed(1);
  const lat = (90 + (h * 1.7) % 80).toFixed(0);
  const ops = (120 + (h % 380));
  return {
    accuracy: pct + '%',
    latency: lat + 'ms',
    ops: ops + 'k/d',
    uptime: '99.998%',
  };
}
