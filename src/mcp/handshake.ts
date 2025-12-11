import { providers } from "../dapo/providers";
import { steps } from "../dapo/steps";
import { scoringDimensions } from "../dapo/scoring";
import { baselineProfile } from "../dapo/baseline";

// Builds the MCP handshake response for DAPO.
// This response is the first machine-readable entry point
// that any MCP client receives during connection.
// It exposes the server identity and all discoverable DAPO metadata.

export function buildHandshake() {
  return {
    name: "DAPO MCP Server",
    version: "0.1.0",

    // Core MCP capabilities
    capabilities: {
      providers: true,
      steps: true,
      scoring: true,
      baseline: true,
      qhsm: false,      // intentionally false for v1
      execution: false  // DAPO MCP Server is metadata-only
    },

    // Exposed metadata snapshot (read-only)
    metadata: {
      providers,
      steps,
      scoring: scoringDimensions,
      baseline: baselineProfile
    }
  };
}
