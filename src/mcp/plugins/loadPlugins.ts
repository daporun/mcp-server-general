import path from "node:path";
import { pathToFileURL } from "node:url";
import type { MCPPlugin, MCPPluginContext } from "./types.js";

export interface PluginConfigEntry {
  name: string;
  config?: Record<string, unknown>;
}

export async function loadPlugins(
  plugins: PluginConfigEntry[] | undefined,
  ctx: MCPPluginContext
): Promise<void> {
  if (!plugins || plugins.length === 0) return;

  for (const entry of plugins) {
    const pluginPath = path.resolve(
      process.cwd(),
      "plugins",
      entry.name,
      "index.js"
    );

    const mod = await import(pathToFileURL(pluginPath).href);
    const plugin: MCPPlugin = mod.plugin;

    if (!plugin || plugin.name !== entry.name) {
      throw new Error(`Invalid plugin module: ${entry.name}`);
    }

    let validatedConfig = entry.config;

    if (plugin.schema) {
      const result = plugin.schema.safeParse(entry.config);
      if (!result.success) {
        throw new Error(
          `Invalid config for plugin "${plugin.name}":\n` +
            JSON.stringify(result.error.format(), null, 2)
        );
      }
      validatedConfig = result.data as Record<string, unknown>;
    }

    plugin.setup?.(ctx, validatedConfig);
    await plugin.onInit?.(ctx);
  }
}
