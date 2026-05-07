export interface Division {
  vex: string;
  name: string;
  description: string;
  metric: string;
  metricLabel: string;
  tags: string[];
}

export const divisions: Division[] = [
  {
    vex: 'VEX/I',
    name: 'Cognitive Infrastructure',
    description: 'The neural foundation layer. Continuous AI intake, conflict-checking, and routing across every operational surface.',
    metric: '12',
    metricLabel: 'systems',
    tags: ['Intake', 'Triage', 'Reception', 'Cognitive'],
  },
  {
    vex: 'VEX/II',
    name: 'Operational Intelligence',
    description: 'Continuous read of the operating environment — every signal, dashboard, anomaly, and silence rendered legible.',
    metric: '14',
    metricLabel: 'systems',
    tags: ['Analytics', 'Reading', 'Sentinel', 'Predictive'],
  },
  {
    vex: 'VEX/III',
    name: 'Enterprise Automation',
    description: 'Workflow execution at planetary scale. Regulated, observable, reversible — the machinery underneath the modern enterprise.',
    metric: '14.2k',
    metricLabel: 'workflows · 24h',
    tags: ['Workflow', 'Coordination', 'Pipeline', 'Engine'],
  },
  {
    vex: 'VEX/IV',
    name: 'Autonomous Workflows',
    description: 'Self-managing operational loops. Helix learns, Compass recomputes, Lifecycle adapts — workflows that improve their own posture.',
    metric: '4.2k',
    metricLabel: 'loops active',
    tags: ['Loops', 'Lifecycle', 'Recovery', 'Orchestration'],
  },
  {
    vex: 'VEX/V',
    name: 'AI Command Layer',
    description: 'Override, escalate, intervene — at any layer of the stack. Where senior operators take the wheel: governance, audit, response.',
    metric: '8.4k',
    metricLabel: 'operators',
    tags: ['Command', 'Concierge', 'Matter', 'Audit'],
  },
  {
    vex: 'VEX/VI',
    name: 'Neural Operations Grid',
    description: 'Distributed coordination across geographies, systems, and time-zones. Six continents, one truth.',
    metric: '6',
    metricLabel: 'continents',
    tags: ['Mesh', 'Routing', 'Compliance', 'Sentinel'],
  },
];
