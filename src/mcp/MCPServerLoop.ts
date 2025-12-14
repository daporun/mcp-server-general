// src/mcp/MCPServerLoop.ts

import process from "node:process";
import type { JSONRPCRequest, JSONRPCResponse } from "./types.js";
import { router } from "./router.js";

/**
 * Writes a JSON-RPC response to STDOUT.
 */
function sendResponse(response: JSONRPCResponse): void {
  process.stdout.write(JSON.stringify(response) + "\n");
}

/**
 * Starts the JSON-RPC listening loop on STDIN.
 * This is the core of MCP: JSON-RPC messages come in line-by-line.
 */
export function startMCPServer(): void {
  process.stdin.setEncoding("utf8");

  process.stdin.on("data", async (chunk: string) => {
    const lines = chunk
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0);

    for (const line of lines) {
      let request: JSONRPCRequest;

      // 1. Parse JSON
      try {
        request = JSON.parse(line) as JSONRPCRequest;
      } catch (err) {
        sendResponse({
          jsonrpc: "2.0",
          id: null,
          error: {
            code: -32700,
            message: "Invalid JSON received",
            data: (err as Error).message
          }
        });
        continue;
      }

      // 2. Lookup handler
      const handler = router.get(request.method);

      if (!handler) {
        sendResponse({
          jsonrpc: "2.0",
          id: request.id ?? null,
          error: {
            code: -32601,
            message: `Method not found: ${request.method}`
          }
        });
        continue;
      }

      // 3. Execute handler
      try {
        const result = await handler(request.params);

        sendResponse({
          jsonrpc: "2.0",
          id: request.id ?? null,
          result
        });
      } catch (err) {
        sendResponse({
          jsonrpc: "2.0",
          id: request.id ?? null,
          error: {
            code: -32603,
            message: "Internal MCP Server error",
            data: (err as Error).message
          }
        });
      }
    }
  });
}
