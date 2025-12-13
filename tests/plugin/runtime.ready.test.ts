import { describe, it, expect, vi } from "vitest";
import { MCPRuntime } from "../../src/mcp/MCPRuntime.js";
import type { MCPPlugin, MCPPluginContext } from "../../src/mcp/plugins/types.js";

describe("MCPRuntime onReady lifecycle", () => {
  const ctx: MCPPluginContext = {
    logger: {
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    },
    registerMethod: vi.fn(),
    registerList: vi.fn(),
  };

  it("calls onReady on all plugins with ctx", async () => {
    const pluginA: MCPPlugin = {
      name: "pluginA",
      onReady: vi.fn(),
    };

    const pluginB: MCPPlugin = {
      name: "pluginB",
      onReady: vi.fn(),
    };

    const runtime = new MCPRuntime([pluginA, pluginB], ctx);

    await runtime.onReady();

    expect(pluginA.onReady).toHaveBeenCalledOnce();
    expect(pluginB.onReady).toHaveBeenCalledOnce();

    expect(pluginA.onReady).toHaveBeenCalledWith(ctx);
    expect(pluginB.onReady).toHaveBeenCalledWith(ctx);
  });

  it("throws if any plugin onReady throws (fail-fast)", async () => {
    const pluginA: MCPPlugin = {
      name: "pluginA",
      onReady: vi.fn(() => {
        throw new Error("boom");
      }),
    };

    const pluginB: MCPPlugin = {
      name: "pluginB",
      onReady: vi.fn(),
    };

    const runtime = new MCPRuntime([pluginA, pluginB], ctx);

    await expect(runtime.onReady()).rejects.toThrow("boom");

    // fail-fast: second plugin should NOT be called
    expect(pluginA.onReady).toHaveBeenCalledOnce();
    expect(pluginB.onReady).not.toHaveBeenCalled();
  });

  it("is idempotent (onReady runs only once)", async () => {
    const plugin: MCPPlugin = {
      name: "pluginA",
      onReady: vi.fn(),
    };

    const runtime = new MCPRuntime([plugin], ctx);

    await runtime.onReady();
    await runtime.onReady();

    expect(plugin.onReady).toHaveBeenCalledOnce();
  });
});
