// examples/example-plugin/examplePlugin.ts

import { z } from "zod";
import type { MCPPlugin } from "../../src/mcp/plugins/types.js";

/**
 * Example plugin demonstrating the full MCP plugin lifecycle.
 */
const examplePluginSchema = z.object({
  greeting: z.string(),
});

export const examplePlugin: MCPPlugin<{ greeting: string }> = {
  name: "example-plugin",

  schema: examplePluginSchema,

  setup(ctx, config) {
    ctx.logger.info(
      `[example-plugin] setup called with greeting="${config?.greeting}"`
    );
  },

  onInit(ctx) {
    ctx.logger.info("[example-plugin] onInit");

    ctx.registerMethod("example.greet", async () => {
      return {
        message: "Hello from example plugin!",
      };
    });

    ctx.registerList({
      id: "example-items",
      title: "Example Items",
      items: [
        { name: "Item A", value: 1 },
        { name: "Item B", value: 2 },
      ],
    });
  },

  onReady(ctx) {
    ctx.logger.info("[example-plugin] onReady - MCP server is ready");
  },

  async onShutdown() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    console.log("[example-plugin] shutdown completed");
  },
};
