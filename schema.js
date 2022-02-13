const corrections = {
  // What to capitalize
  newRelic: [
    'New Relic', 
    'we', 
  ],
  newRelicOne: [
    'New Relic One', 
    'New Relic One platform', 
  ],
  futureStack: [
    'FutureStack', 
    '{Future}Stack', 
  ],
  codeStream: [
    'CodeStream', 
    'New Relic CodeStream', 
  ],
  explorer: [
    'Explorer', 
    'New Relic Explorer', 
  ],
  instantObservability: [
    'Instant Observability', 
    'New Relic I/O', 
    'New Relic Instant Observability', 
    'New Relic Instant Observability (I/O)', 
  ],
  lookout: [
    'New Relic Lookout', 
    'Lookout', 
  ],
  lookout: [
    'New Relic Navigator', 
    'Navigator', 
  ],

  // What not to capitalize
  apm: [
    'application performance monitoring', 
    'application monitoring', 
    'APM', 
  ],
  pixie: [
    'auto-telemetry with Pixie', 
    'the Pixie integration with New Relic One', 
    'our Pixie integration', 
    'the integration with Pixie', 
    'Pixie', 
  ],
  digitalExperienceMonitoring: [
    'digital experience monitoring (DEM)', 
    'digital experience monitoring', 
    'DEM', 
  ],
  infrastructureMonitoring: [
    'infrastructure monitoring', 
    'infra monitoring', 
    'infra', 
  ],
  logManagement: [
    'log management', 
    'logs', 
  ],
  melt: [
    'metrics, events, logs, and traces (MELT)', 
    'metrics, events, logs, and traces', 
    'MELT', 
  ],
  networkPerformanceMonitoring: [
    'network performance monitoring (NPM)', 
    'network performance monitoring', 
    'NPM', 
    'network monitoring', 
  ],
  observability: [
    'observability (o11y)', 
    'observability', 
    'full-stack observability', 
    'end-to-end observability', 
  ],
  query: [
    'query', 
    'queries', 
    'querying', 
  ],
  syntheticMonitoring: [
    'synthetic monitoring', 
    'synthetics', 
    'synthetic monitors', 
  ],
}

export const schema = {
  // What to capitalize
  "New Relic's": corrections.newRelic,
  'new relic': corrections.newRelic,
  'NR': corrections.newRelic,
  "New Relic One's": corrections.newRelicOne,
  "New Relic one": corrections.newRelicOne,
  "NR1": corrections.newRelicOne,
  "Future Stack": corrections.futureStack,
  "Futurestack": corrections.futureStack,
  "Nerd Graph": 'NerdGraph',
  "Nerdgraph": 'NerdGraph',
  "Nerd Graph": 'NerdGraph',
  "nerdlet": 'Nerdlet',
  "nerdpack": 'Nerdpack',
  "Nerd Pack": 'Nerdpack',
  "Nerdstorage": 'NerdStorage',
  "Nerd Storage": 'NerdStorage',
  "New Relic CodeStream's": corrections.codeStream,
  "New Relic Code Stream": corrections.codeStream,
  "Code Stream": corrections.codeStream,
  "codestream": corrections.codeStream,
  "New Relic Explorer's": corrections.explorer,
  "explorer": corrections.explorer,
  "Infinite tracing": 'Infinite Tracing',
  "New Relic instant observability": corrections.instantObservability,
  "instant Observability": corrections.instantObservability,
  "NRIO": corrections.instantObservability,
  "IO": corrections.instantObservability,
  "I/O": corrections.instantObservability,
  "New Relic Lookout's": corrections.lookout,
  "lookout": corrections.lookout,
  "New Relic Navigator's": corrections.navigator,
  "navigator": corrections.navigator,

  // What not to capitalize
  "Alerts": 'alerts',
  "Anomaly Detection": 'anomaly detection',
  "Application Performance Management": corrections.apm,
  "Application Performance Monitoring": corrections.apm,
  "Application Monitoring": corrections.apm,
  "Applied Intelligence": 'applied intelligence',
  "AI": 'applied intelligence',
  "AIOps": 'applied intelligence',
  "Auto map": 'automap',
  "Pixie's": corrections.pixie,
  "pixie": corrections.pixie,
  "Auto-telemetry with Pixie": corrections.pixie,
  "Browser Monitoring": 'browser monitoring',
  "Containers": 'containers',
  "Dashboard": 'dashboard',
  "Dashboards": 'dashboards',
  "Data Explorer": 'data explorer',
  "Data ingest": 'data ingest',
  "Digital Experience Monitoring": corrections.digitalExperienceMonitoring,
  "digital monitoring": corrections.digitalExperienceMonitoring,
  "Distributed Tracing": 'distributed tracing',
  "Errors inbox": 'errors inbox',
  "Event Correlation": 'event correlation',
  "Incident Intelligence": 'incident intelligence',
  "Infrastructure Monitoring": corrections.infrastructureMonitoring,
  "Kubernetes Cluster Explorer": 'Kubernetes cluster explorer',
  "Kubernetes Monitoring": 'Kubernetes monitoring',
  "micro services": 'microservices',
  "Microservices": 'microservices',
  "Integrations": 'integrations',
  "Log Management": corrections.logManagement,
  "Logs": corrections.logManagement,
  "Metrics, Events, Logs, and Traces": corrections.melt,
  "Mobile Monitoring": 'mobile monitoring',
  "Model Performance Monitoring": 'model performance monitoring',
  "ML model monitoring": 'model performance monitoring',
  "ML model performance monitoring": 'model performance monitoring',
  "MPM": 'model performance monitoring',
  "Network Performance Monitoring": corrections.networkPerformanceMonitoring,
  "Network Monitoring": corrections.networkPerformanceMonitoring,
  "Observability": corrections.observability,
  "O11y": corrections.observability,
  "Full-Stack Observability": corrections.observability,
  "Query": corrections.query,
  "Queries": corrections.query,
  "Querying": corrections.query,
  "Query Builder": 'query builder',
  "quick starts": 'quickstarts',
  "QuickStarts": 'quickstarts',
  "Serverless monitoring": 'serverless monitoring',
  "synthetics monitoring": corrections.syntheticMonitoring,
  "Synthetic monitoring": corrections.syntheticMonitoring,
  "Synthetics": corrections.syntheticMonitoring,

  // What to avoid
  "Full-stack Observability": 'full-stack observability',
  "full stack observability": 'full-stack observability',
  "FSO": 'full-stack observability',
  "Telemetry data platform": 'telemetry data platform',
  "TDP": 'telemetry data platform',
}
































