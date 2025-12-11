// src/server.ts

import { buildHandshake } from "./mcp/handshake.js";
import { startMCPServer } from "./mcp/serverRuntime.js";
import { registerMethod } from "./mcp/router.js";

// DAPO metadata sources (readonly arrays — perfectly fine)
import { providers } from "./dapo/providers.js";
import { steps } from "./dapo/steps.js";

// MCP method implementations
import { providersList } from "./methods/providersList.js";
import { stepsList } from "./methods/stepsList.js";

/**
 * Entry point for the DAPO MCP Server.
 * Prints handshake on startup, then starts the JSON-RPC loop.
 */

// 1. MCP handshake output (required by MCP protocol)
console.log(JSON.stringify(buildHandshake(), null, 2));


// 2. Register MCP methods

registerMethod("providers.list", async () => {
  // providers is readonly → MCP accepts readonly just fine → return as-is
  return {
    providers: providersList(providers)
  };
});

registerMethod("steps.list", async () => {
  // steps is readonly → MCP accepts readonly → no mutation
  return {
    steps: stepsList(steps)
  };
});


// 3. Start JSON-RPC request loop (listens on STDIN)
startMCPServer();
