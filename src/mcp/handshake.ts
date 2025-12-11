// Placeholder for handshake metadata builder
export function buildHandshake() {
  return {
    name: "DAPO MCP Server",
    version: "0.1.0",
    capabilities: {
      providers: true,
      steps: true,
      scoring: true,
      baseline: true,
      qhsm: false,
      execution: false
    }
  };
}
