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
  "New Relic’s": corrections.newRelic,
  'new relic': corrections.newRelic,
  'New relic': corrections.newRelic,
  'NR': corrections.newRelic,
  "New Relic One's": corrections.newRelicOne,
  "New Relic One’s": corrections.newRelicOne,
  "New Relic one": corrections.newRelicOne,
  "NR1": corrections.newRelicOne,
  "Future Stack": corrections.futureStack,
  "Futurestack": corrections.futureStack,
  "Future stack": corrections.futureStack,
  "Nerd Graph": 'NerdGraph',
  "Nerdgraph": 'NerdGraph',
  "nerdgraph": 'NerdGraph',
  "Nerd Graph": 'NerdGraph',
  "nerd graph": 'NerdGraph',
  "nerdlet": 'Nerdlet',
  "NerdLet": 'Nerdlet',
  "nerdpack": 'Nerdpack',
  "NerdPack": 'Nerdpack',
  "Nerd Pack": 'Nerdpack',
  "nerd pack": 'Nerdpack',
  "Nerdstorage": 'NerdStorage',
  "nerdstorage": 'NerdStorage',
  "Nerd Storage": 'NerdStorage',
  "Nerd storage": 'NerdStorage',
  "nerd storage": 'NerdStorage',
  "New Relic CodeStream's": corrections.codeStream,
  "New Relic CodeStream’s": corrections.codeStream,
  "New Relic Code Stream": corrections.codeStream,
  "Code Stream": corrections.codeStream,
  "code stream": corrections.codeStream,
  "codestream": corrections.codeStream,
  "Codestream": corrections.codeStream,
  "New Relic Explorer's": corrections.explorer,
  "New Relic Explorer’s": corrections.explorer,
  "explorer": corrections.explorer,
  "Infinite tracing": 'Infinite Tracing',
  "infinite tracing": 'Infinite Tracing',
  "New Relic instant observability": corrections.instantObservability,
  "NRIO": corrections.instantObservability,
  "IO": corrections.instantObservability,
  "I/O": corrections.instantObservability,
  "New Relic Lookout's": corrections.lookout,
  "New Relic Lookout’s": corrections.lookout,
  "lookout": corrections.lookout,
  "New Relic Navigator's": corrections.navigator,
  "New Relic Navigator’s": corrections.navigator,
  "navigator": corrections.navigator,

  // What not to capitalize
  "Alerts": 'alerts',
  "Anomaly Detection": 'anomaly detection',
  "Anomaly detection": 'anomaly detection',
  "Application Performance Management": corrections.apm,
  "Application Performance Management": corrections.apm,
  "Application Performance Monitoring": corrections.apm,
  "Application Monitoring": corrections.apm,
  "Applied Intelligence": 'applied intelligence',
  "Applied intelligence": 'applied intelligence',
  "AI": 'applied intelligence',
  "AIOps": 'applied intelligence',
  "auto map": 'automap',
  "Auto Map": 'automap',
  "Auto map": 'automap',
  "Pixie's": corrections.pixie,
  "Pixie’s": corrections.pixie,
  "Auto-telemetry with Pixie": corrections.pixie,
  "Browser Monitoring": 'browser monitoring',
  "Browser monitoring": 'browser monitoring',
  "Containers": 'containers',
  "Dashboards": 'dashboards',
  "Data Explorer": 'data explorer',
  "Data explorer": 'data explorer',
  "Data Ingest": 'data ingest',
  "Data ingest": 'data ingest',
  "Digital Experience Monitoring": corrections.digitalExperienceMonitoring,
  "Digital experience monitoring": corrections.digitalExperienceMonitoring,
  "digital monitoring": corrections.digitalExperienceMonitoring,
  "Distributed Tracing": 'distributed tracing',
  "Distributed tracing": 'distributed tracing',
  "Errors inbox": 'errors inbox',
  "Event Correlation": 'event correlation',
  "Event correlation": 'event correlation',
  "Incident Intelligence": 'incident intelligence',
  "Incident intelligence": 'incident intelligence',
  "Infrastructure Monitoring": corrections.infrastructureMonitoring,
  "Infrastructure monitoring": corrections.infrastructureMonitoring,
  "Kubernetes Cluster Explorer": 'Kubernetes cluster explorer',
  "kubernetes cluster explorer": 'Kubernetes cluster explorer',
  "Kubernetes Monitoring": 'Kubernetes monitoring',
  "kubernetes monitoring": 'Kubernetes monitoring',
  "micro services": 'microservices',
  "Micro Services": 'microservices',
  "Microservices": 'microservices',
  "Integrations": 'integrations',
  "Log Management": corrections.logManagement,
  "Log management": corrections.logManagement,
  "Logs": corrections.logManagement,
  "Metrics, Events, Logs, and Traces": corrections.melt,
  "Mobile Monitoring": 'mobile monitoring',
  "Mobile monitoring": 'mobile monitoring',
  "Model Performance Monitoring": 'model performance monitoring',
  "Model performance monitoring": 'model performance monitoring',
  "ML model monitoring": 'model performance monitoring',
  "ML model performance monitoring": 'model performance monitoring',
  "MPM": 'model performance monitoring',
  "Network Performance Monitoring": corrections.networkPerformanceMonitoring,
  "Network performance monitoring": corrections.networkPerformanceMonitoring,
  "Network Monitoring": corrections.networkPerformanceMonitoring,
  "Network monitoring": corrections.networkPerformanceMonitoring,
  "Observability": corrections.observability,
  "O11y": corrections.observability,
  "Full-Stack Observability": corrections.observability,
  "Query": corrections.query,
  "Queries": corrections.query,
  "Querying": corrections.query,
  "Query Builder": 'query builder',
  "Query builder": 'query builder',
  "quick starts": 'quickstarts',
  "quick starts": 'quickstarts',
  "Quick Starts": 'quickstarts',
  "QuickStarts": 'quickstarts',
  "Quickstarts": 'quickstarts',
  "Serverless Monitoring": 'serverless monitoring',
  "Serverless monitoring": 'serverless monitoring',
  "synthetics monitoring": corrections.syntheticMonitoring,
  "Synthetic Monitoring": corrections.syntheticMonitoring,
  "Synthetic monitoring": corrections.syntheticMonitoring,

  // What to avoid
  "Full-stack Observability": 'full-stack observability',
  "Full Stack Observability": 'full-stack observability',
  "full stack observability": 'full-stack observability',
  "FSO": 'full-stack observability',
  "FSO": 'full-stack observability',
  "Telemetry Data Platform": 'telemetry data platform',
  "Telemetry data platform": 'telemetry data platform',
  "TDP": 'telemetry data platform',
}
































