import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n);
}

// Industry-specific verb sets for the live activity feed
export const INDUSTRY_VERBS: Record<string, string[]> = {
  Legal:           ['matter intake reconciled', 'conflict-check passed', 'precedent retrieved', 'redline applied'],
  Healthcare:      ['triage routed', 'note generated', 'auth approved', 'prior-auth submitted'],
  Finance:         ['reconciliation closed', 'AML check passed', 'KYC verified', 'transaction signed off'],
  Hospitality:     ['guest request fulfilled', 'concierge ticket closed', 'PMS sync complete', 'recovery offer dispatched'],
  Restaurants:     ['shift balanced', 'reservation routed', 'inventory reorder triggered', 'kitchen pace tuned'],
  'Real Estate':   ['lead qualified', 'comp pulled', 'showing scheduled', 'tour brief delivered'],
  Government:      ['constituent case opened', 'FOI request triaged', 'eligibility check complete', 'permit fast-tracked'],
  Defence:         ['report compiled', 'environment scanned', 'asset accounted', 'chain-of-custody locked'],
  Political:       ['canvassing route updated', 'sentiment ingested', 'donor outreach queued', 'voter file refreshed'],
  Recruitment:     ['candidate sourced', 'interview drafted', 'panel calibrated', 'offer composed'],
  Ecommerce:       ['cart recovered', 'recommendation served', 'review triaged', 'inventory rebalanced'],
  Media:           ['post scheduled', 'asset variant generated', 'engagement scored', 'pitch composed'],
  Creator:         ['post scheduled', 'asset variant generated', 'comment cadence', 'superfan identified'],
  Education:       ['admissions reviewed', 'cohort matched', 'tutor matched', 'progress evaluated'],
  Logistics:       ['route optimised', 'fleet rebalanced', 'eta recomputed', 'driver matched'],
  Construction:    ['drawing reviewed', 'change-order tracked', 'site report generated', 'inspection scheduled'],
  Insurance:       ['claim triaged', 'coverage validated', 'fraud signal evaluated', 'subrogation queued'],
  Aviation:        ['turnaround coordinated', 'crew schedule patched', 'ground delay re-routed', 'fleet check passed'],
  Cyber:           ['anomaly auto-resolved', 'access pattern verified', 'threat score updated', 'response orchestrated'],
  'Law Enforcement': ['intel cross-referenced', 'case folder linked', 'evidence indexed', 'patrol routed'],
  Events:          ['ticket scaled', 'capacity rebalanced', 'sponsor reach quantified', 'production cued'],
  Luxury:          ['VIP itinerary refined', 'private booking confirmed', 'concierge briefed', 'preference cached'],
  Automotive:      ['lead scored', 'service appointment booked', 'inventory matched', 'trade-in valued'],
  Manufacturing:   ['preventive ticket opened', 'sensor anomaly resolved', 'OEE recomputed', 'work order issued'],
  NGO:             ['donor matched', 'aid request triaged', 'impact tracked', 'volunteer routed'],
  Religious:       ['service planned', 'pastoral request triaged', 'community outreach scheduled', 'engagement tracked'],
  Sports:          ['fan engagement queued', 'roster pattern resolved', 'broadcast cue confirmed', 'concession rebalanced'],
};

export const REGIONS = ['EMEA', 'NA', 'APAC', 'LATAM', 'MEA'];

export function pickVerbs(industry: string): string[] {
  return INDUSTRY_VERBS[industry] || ['signal reconciled', 'workflow executed', 'anomaly auto-resolved', 'route optimised'];
}
