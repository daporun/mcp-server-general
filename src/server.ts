// src/mcp/server.ts

import { buildHandshake } from "./mcp/MCPHandshake.js";
import { startMCPServer } from "./mcp/MCPServerLoop.js";
import { router } from "./mcp/router.js";
import { listRegistry } from "./mcp/ListRegistry.js";
import { loadConfig } from "./mcp/loadConfig.js";
import { loadPlugins } from "./mcp/plugins/loadPlugins.js";
import { pluginContext } from "./mcp/plugins/pluginContext.js";
import { MCPRuntime } from "./mcp/MCPRuntime.js";
import { discoverPlugins } from "./mcp/plugins/discoverPlugins.js";

// 1. Discover plugins
const pluginModules = await discoverPlugins();

// 2. Load config
const config = loadConfig();

// 3. Register lists from config (static data)
for (const list of config.lists ?? []) {
  listRegistry.register({
    id: list.id,
    title: list.title,
    items: list.items
  });
}

// 4. Register core MCP methods
router.register("lists.list", async () => {
  return listRegistry.list().map(l => ({
    id: l.id,
    title: l.title,
    count: l.items.length
  }));
});

router.register("lists.get", async (params: unknown) => {
  if (
    typeof params !== "object" ||
    params === null ||
    !("id" in params) ||
    typeof (params as { id: unknown }).id !== "string"
  ) {
    throw new Error("Invalid params: expected { id: string }");
  }

  const { id } = params as { id: string };
  const list = listRegistry.get(id);

  if (!list) {
    throw new Error(`List not found: ${id}`);
  }

  return list;
});

// 5. Build plugin config map
const pluginConfigMap: Record<string, unknown> = {};
for (const plugin of config.plugins ?? []) {
  if (plugin.name) {
    pluginConfigMap[plugin.name] = plugin.config ?? {};
  }
}

// 6. Load plugins
const plugins = await loadPlugins(
  pluginModules,
  pluginConfigMap,
  pluginContext
);

// 7. Init runtime
const runtime = new MCPRuntime(plugins, pluginContext);

// 8. Plugin registration phase
await runtime.onInit();

// 9. Handshake (NOW everything is registered)
console.log(JSON.stringify(buildHandshake(), null, 2));

// 10. Runtime ready
await runtime.onReady();

// 11. Start MCP loop
startMCPServer();

// 12. Graceful shutdown
const shutdown = async (signal: string) => {
  try {
    await runtime.shutdown(signal);
  } finally {
    process.exit(0);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
