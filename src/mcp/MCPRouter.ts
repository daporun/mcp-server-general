// src/mcp/MCPRouter.ts

import type { MethodHandler } from "./types.js";

const registry: Record<string, MethodHandler> = {};

/**
 * Register a new MCP method handler.
 */
export function registerMethod(name: string, handler: MethodHandler): void {
  registry[name] = handler;
}

/**
 * Look up a method handler by name.
 */
export function getMethod(name: string): MethodHandler | undefined {
  return registry[name];
}
