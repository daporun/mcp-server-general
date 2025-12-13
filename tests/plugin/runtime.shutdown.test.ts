import { describe, it, expect, vi } from "vitest";
import { MCPRuntime } from "../../src/mcp/MCPRuntime.js";
import type { MCPPlugin, MCPPluginContext } from "../../src/mcp/plugins/types.js";

describe("MCPRuntime shutdown lifecycle", () => {
  const ctx: MCPPluginContext = {
    logger: {
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    },
    registerMethod: vi.fn(),
    registerList: vi.fn(),
  };

  it("calls onShutdown on all plugins", async () => {
    const pluginA: MCPPlugin = {
      name: "pluginA",
      onShutdown: vi.fn(),
    };

    const pluginB: MCPPlugin = {
      name: "pluginB",
      onShutdown: vi.fn(),
    };

    const runtime = new MCPRuntime([pluginA, pluginB], ctx);

    await runtime.shutdown("SIGTERM");

    expect(pluginA.onShutdown).toHaveBeenCalledOnce();
    expect(pluginB.onShutdown).toHaveBeenCalledOnce();
  });

  it("continues shutdown even if one plugin throws", async () => {
    const pluginA: MCPPlugin = {
      name: "pluginA",
      onShutdown: vi.fn(() => {
        throw new Error("boom");
      }),
    };

    const pluginB: MCPPlugin = {
      name: "pluginB",
      onShutdown: vi.fn(),
    };

    const runtime = new MCPRuntime([pluginA, pluginB], ctx);

    await runtime.shutdown("SIGINT");

    expect(pluginA.onShutdown).toHaveBeenCalledOnce();
    expect(pluginB.onShutdown).toHaveBeenCalledOnce();
  });

  it("is idempotent (shutdown runs only once)", async () => {
    const plugin: MCPPlugin = {
      name: "pluginA",
      onShutdown: vi.fn(),
    };

    const runtime = new MCPRuntime([plugin], ctx);

    await runtime.shutdown("SIGTERM");
    await runtime.shutdown("SIGTERM");

    expect(plugin.onShutdown).toHaveBeenCalledOnce();
  });
});
