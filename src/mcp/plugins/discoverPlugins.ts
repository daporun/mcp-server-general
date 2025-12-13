// discoverPlugins.ts

import { readdir } from "node:fs/promises";
import { join, extname } from "node:path";
import { pathToFileURL } from "node:url";

import type { MCPPlugin } from "./types.js";

/**
 * Discover MCP plugins from the given directory.
 *
 * Rules:
 * - Files are loaded in alphabetical order
 * - Each file must default-export an MCPPlugin
 * - plugin.name must be unique
 * - Fail-fast on any error
 */
export async function discoverPlugins(
  pluginsDir = "plugins"
): Promise<MCPPlugin[]> {
  let entries: string[];

  try {
    entries = await readdir(pluginsDir);
  } catch (err) {
    throw new Error(
      `Failed to read plugins directory: ${pluginsDir}\n` +
        `Reason: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  const pluginFiles = entries
    .filter(f => {
      const ext = extname(f);
      return ext === ".js" || ext === ".ts";
    })
    .sort();

  const plugins: MCPPlugin[] = [];
  const seenNames = new Map<string, string>(); // name -> file

  for (const file of pluginFiles) {
    const fullPath = join(pluginsDir, file);

    let mod: unknown;

    try {
      mod = await import(pathToFileURL(fullPath).href);
    } catch (err) {
      throw new Error(
        `Failed to load plugin file: ${fullPath}\n` +
          `Reason: ${err instanceof Error ? err.message : String(err)}`
      );
    }

    const plugin = (mod as { default?: unknown }).default;

    if (!plugin || typeof plugin !== "object") {
      throw new Error(
        `Invalid plugin export in file: ${fullPath}\n` +
          `Expected a default export implementing MCPPlugin.`
      );
    }

    if (!("name" in plugin) || typeof (plugin as MCPPlugin).name !== "string") {
      throw new Error(
        `Invalid MCPPlugin structure in file: ${fullPath}\n` +
          `Missing required field: name`
      );
    }

    const name = (plugin as MCPPlugin).name;

    if (seenNames.has(name)) {
      const firstFile = seenNames.get(name);
      throw new Error(
        `Failed to load plugin due to identical name: ${name}\n` +
          `Detected in files:\n` +
          `- ${firstFile}\n` +
          `- ${fullPath}`
      );
    }

    seenNames.set(name, fullPath);
    plugins.push(plugin as MCPPlugin);
  }

  return plugins;
}
