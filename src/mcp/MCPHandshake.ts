// src/mcp/MCPHandshake.ts

/**
 * Builds the initial MCP handshake response.
 * This is sent once, immediately when the server starts.
 */
import { listRegistry } from "./ListRegistry.js";

export function buildHandshake() {
  return {
    name: "General MCP Server",
    version: "0.1.0",

    capabilities: {
      lists: true,
      plugins: false
    },

    lists: listRegistry.list().map(list => ({
      id: list.id,
      title: list.title,
      count: list.items.length
    }))
  };
}