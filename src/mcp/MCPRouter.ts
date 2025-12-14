// src/mcp/MCPRouter.ts
import type { MethodHandler } from "./types.js";

export class MCPRouter {
  private readonly registry: Record<string, MethodHandler> = {};

  register(name: string, handler: MethodHandler): void {
    if (this.registry[name]) {
      throw new Error(`Method already registered: ${name}`);
    }
    this.registry[name] = handler;
  }

  get(name: string): MethodHandler | undefined {
    return this.registry[name];
  }

  list(): string[] {
    return Object.keys(this.registry);
  }

  clear(): void {
    for (const key of Object.keys(this.registry)) {
      delete this.registry[key];
    }
  }
}
