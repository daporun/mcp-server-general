import type { MCPPluginContext, MCPPlugin } from "./types.js";
import { logger } from "../logger.js";

export async function loadPlugins(
  plugins: MCPPlugin[],
  rawConfig: Record<string, unknown>,
  ctx: MCPPluginContext
): Promise<MCPPlugin[]> {
  const loaded: MCPPlugin[] = [];

  for (const plugin of plugins) {
    logger.info(`Loading plugin: ${plugin.name}`);

    let validatedConfig: unknown = undefined;

    // Validate config (if schema provided)
    if (plugin.schema) {
      try {
        validatedConfig = plugin.schema.parse(rawConfig[plugin.name]);
      } catch (err) {
        logger.error(
          `Plugin config validation failed: ${plugin.name} – ${
            err instanceof Error ? err.message : String(err)
          }`
        );
        throw new Error(`Invalid config for plugin "${plugin.name}"`);
      }
    }

    // setup
    if (plugin.setup) {
      try {
        logger.info(`Running plugin setup: ${plugin.name}`);
        await plugin.setup(ctx, validatedConfig);
      } catch (err) {
        logger.error(
          `Plugin setup failed: ${plugin.name} – ${
            err instanceof Error ? err.message : String(err)
          }`
        );
        throw new Error(`Setup failed for plugin "${plugin.name}"`);
      }
    }

    loaded.push(plugin);
  }

  return loaded;
}
