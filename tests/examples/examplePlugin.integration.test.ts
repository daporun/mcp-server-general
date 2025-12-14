// examplePlugin.integration.test.ts

import { describe, it, expect, vi, beforeEach } from "vitest";
import { examplePlugin } from "../../examples/example-plugin/examplePlugin.js";

import { loadPlugins } from "../../src/mcp/plugins/loadPlugins.js";
import { MCPRuntime } from "../../src/mcp/MCPRuntime.js";
import { listRegistry } from "../../src/mcp/ListRegistry.js";
import { router } from "../../src/mcp/router.js";

import type { MCPPluginContext } from "../../src/mcp/plugins/types.js";

describe("Example Plugin – integration", () => {
  let ctx: MCPPluginContext;

  beforeEach(() => {
    // clean registry state between tests
    listRegistry.clear?.();
    router.clear?.();

    ctx = {
      logger: {
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
      },

      registerMethod(name, handler) {
        router.register(name, handler);
      },

      registerList(list) {
        listRegistry.register(list);
      },
    };
  });

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

    // 🔹 registration phase
    await runtime.onInit();

    // method registration
    const method = router.get("example.greet");
    expect(method).toBeDefined();

    const result = await method?.({ name: "Tony" });
    expect(result).toEqual({
      message: "Hello Tony",
    });

    // list registration
    const list = listRegistry.get("example-items");
    expect(list).toBeDefined();
    expect(list?.items).toHaveLength(2);

    // 🔹 runtime ready
    await runtime.onReady();

    // 🔹 shutdown
    await runtime.shutdown("SIGTERM");
  });
});
