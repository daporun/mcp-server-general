// src/mcp/handshake.ts

import { providers } from "../dapo/providers.js";
import { steps } from "../dapo/steps.js";
import { scoringDimensions } from "../dapo/scoring.js";
import { baselineProfile } from "../dapo/baseline.js";

/**
 * Builds the initial MCP handshake response.
 * This is sent once, immediately when the server starts.
 */
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
    },
    metadata: {
      providers,
      steps,
      scoring: scoringDimensions,
      baseline: baselineProfile
    }
  };
}
