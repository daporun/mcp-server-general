// examplePlugin.integration.test.ts

import { describe, it, expect, vi } from "vitest";
import { examplePlugin } from "../../examples/example-plugin/examplePlugin.js";

import { loadPlugins } from "../../src/mcp/plugins/loadPlugins.js";
import { MCPRuntime } from "../../src/mcp/MCPRuntime.js";
import { listRegistry } from "../../src/mcp/ListRegistry.js";
import { getMethod } from "../../src/mcp/MCPRouter.js";
import { registerMethod } from "../../src/mcp/MCPRouter.js";

import type { MCPPluginContext } from "../../src/mcp/plugins/types.js";

describe("Example Plugin – integration", () => {
  const ctx: MCPPluginContext = {
    logger: {
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
    },
    registerMethod,
    registerList: (list) => {
        listRegistry.register(list);
    },
  };

  it("registers method, list and runs full lifecycle", async () => {
    const plugins = await loadPlugins(
      [examplePlugin],
      {
        "example-plugin": { greeting: "Hello MCP" },
      },
      ctx
    );

    expect(plugins).toHaveLength(1);

    const runtime = new MCPRuntime(plugins, ctx);

    // onReady
    await runtime.onReady();

    // method registration
    const method = getMethod("example.greet");
    expect(method).toBeDefined();

    const result = await method?.({});
    expect(result).toEqual({
      message: "Hello from example plugin!",
    });

    // list registration
    const list = listRegistry.get("example-items");
    expect(list).toBeDefined();
    expect(list?.items).toHaveLength(2);

    // shutdown
    await runtime.shutdown("SIGTERM");
  });
});
