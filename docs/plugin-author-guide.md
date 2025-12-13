# Plugin Author Guide

This guide explains how to write plugins for **mcp-server-general**.

Plugins are the primary extension mechanism of the MCP server.  
They can register MCP methods, expose lists, and participate in the server lifecycle.

---

## What is a Plugin?

A plugin is a plain JavaScript / TypeScript object implementing the `MCPPlugin` interface.

Plugins:
- do **not** interact with STDIN / STDOUT
- do **not** implement JSON-RPC handling
- interact only through the provided `MCPPluginContext`

---

## Basic Plugin Structure

```ts
import type { MCPPlugin } from "mcp-server-general";

export const examplePlugin: MCPPlugin = {
  name: "example",

  onInit(ctx) {
    ctx.registerMethod("example.hello", async () => {
      return { message: "Hello from plugin!" };
    });
  },
};
```

---

## Plugin Interface

```ts
export interface MCPPlugin<TConfig = unknown> {
  name: string;

  schema?: ZodSchema<TConfig>;

  setup?: (ctx: MCPPluginContext, config: TConfig | undefined) => Promise<void> | void;

  onInit?: (ctx: MCPPluginContext) => Promise<void> | void;

  onReady?: (ctx: MCPPluginContext) => Promise<void> | void;

  onShutdown?: () => Promise<void> | void;
}
```

All lifecycle hooks are **optional**.

---

## Lifecycle Overview

Plugins follow a strict lifecycle order:

```
schema → setup → onInit → onReady → (runtime) → onShutdown
```

---

## Configuration with Schema

Plugins may define a Zod schema to validate their configuration.

```ts
import { z } from "zod";

const configSchema = z.object({
  greeting: z.string(),
});

export const configPlugin: MCPPlugin<{ greeting: string }> = {
  name: "configPlugin",
  schema: configSchema,

  setup(ctx, config) {
    ctx.logger.info(`Greeting is: ${config?.greeting}`);
  },
};
```

Configuration is validated **before** `setup()` is called.

---

## `setup(ctx, config)`

Use `setup` for **configuration-dependent initialization**.

### Allowed
- Parsing configuration
- Preparing internal state
- Lightweight I/O

### Not Allowed
- Registering MCP methods
- Registering lists

---

## `onInit(ctx)`

Use `onInit` to **register runtime features**.

Typical use cases:
- Register MCP methods
- Register lists
- Connect plugin logic to registries

```ts
onInit(ctx) {
  ctx.registerMethod("example.echo", async (params) => params);
}
```

---

## `onReady(ctx)`

Called when the server is fully initialized and ready to accept requests.

Typical use cases:
- Warm-up logic
- Background jobs
- Health checks

### Fail-fast behavior

If any plugin throws in `onReady`, server startup is aborted.

---

## `onShutdown()`

Called during graceful shutdown (`SIGINT`, `SIGTERM`).

Typical use cases:
- Close connections
- Stop background work
- Flush buffers

### Best-effort behavior

Errors are logged but **do not block other plugins**.

---

## Context Object (`MCPPluginContext`)

Plugins interact with the server through the context object.

```ts
interface MCPPluginContext {
  logger: {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
  };

  registerMethod(name: string, handler: MethodHandler): void;

  registerList(list: {
    id: string;
    title?: string;
    items: Array<{ name: string; [key: string]: unknown }>;
  }): void;
}
```

---

## Best Practices

- Keep plugins **small and focused**
- Avoid heavy work in `onInit`
- Prefer `onReady` for background tasks
- Always handle errors defensively
- Treat plugins as long-lived components

---

## Summary

Plugins are:
- simple to write
- lifecycle-driven
- isolated from protocol handling
- safe to compose

If you understand the lifecycle, you can write powerful MCP extensions.
