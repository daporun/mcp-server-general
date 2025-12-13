// tests/plugins/__mocks__/validPlugin.ts

import type { MCPPlugin } from "../../../src/mcp/plugins/types.js";

export const validPlugin: MCPPlugin = {
  name: "test-plugin",
  async onInit(ctx) {
    ctx.logger.info("init");
  },
  async onReady(ctx) {
    ctx.logger.info("ready");
  },
  async onShutdown() {
    // noop
  },
};
