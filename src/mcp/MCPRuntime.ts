import type { MCPPlugin, MCPPluginContext } from "./plugins/types.js";
import { logger } from "./logger.js";

export class MCPRuntime {
  private ready = false;
  private shuttingDown = false;

constructor(
    private readonly plugins: MCPPlugin[],
    private readonly ctx: MCPPluginContext
  ) {}

  async onReady(): Promise<void> {
    if (this.ready) return;
    this.ready = true;

    logger.info("Runtime entering READY state");

    for (const plugin of this.plugins) {
      if (!plugin.onReady) continue;

      try {
        logger.info(`Running plugin onReady: ${plugin.name}`);
        await plugin.onReady(this.ctx);
      } catch (err) {
        logger.error(
          `Plugin onReady failed: ${plugin.name} – ${
            err instanceof Error ? err.message : String(err)
          }`
        );
        throw err; // startup should fail here
      }
    }
  }

  async shutdown(signal: string): Promise<void> {
    if (this.shuttingDown) return;
    this.shuttingDown = true;

    logger.warn(`Shutdown initiated (${signal})`);

    for (const plugin of this.plugins) {
      if (!plugin.onShutdown) continue;

      try {
        logger.info(`Shutting down plugin: ${plugin.name}`);
        await plugin.onShutdown();
      } catch (err) {
        logger.error(
          `Plugin shutdown failed: ${plugin.name} – ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      }
    }

    logger.info("Shutdown completed");
  }
}
