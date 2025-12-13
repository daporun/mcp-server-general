import { buildHandshake } from "./mcp/MCPHandshake.js";
import { startMCPServer } from "./mcp/MCPServerLoop.js";
import { registerMethod } from "./mcp/MCPRouter.js";
import { listRegistry } from "./mcp/ListRegistry.js";
import { loadConfig } from "./mcp/loadConfig.js";
import { loadPlugins } from "./mcp/plugins/loadPlugins.js";
import { pluginContext } from "./mcp/plugins/pluginContext.js";
import { MCPRuntime } from "./mcp/MCPRuntime.js";
import { discoverPlugins } from "./mcp/plugins/discoverPlugins.js";

// 0. Load plugins
const pluginModules = await discoverPlugins();

// 1. Load config
const config = loadConfig();

// 2. Build plugin config map (ADAPTER)
const pluginConfigMap: Record<string, unknown> = {};

for (const plugin of config.plugins ?? []) {
  if (plugin.name) {
    pluginConfigMap[plugin.name] = plugin.config ?? {};
  }
}

// 3. Load plugins
const plugins = await loadPlugins(
  pluginModules,
  pluginConfigMap,
  pluginContext
);

// 4. Register lists from config
for (const list of config.lists ?? []) {
  listRegistry.register({
    id: list.id,
    title: list.title,
    items: list.items
  });
}

// Init runtime
const runtime = new MCPRuntime(plugins, pluginContext);

// 5. Handshake (NOW registry is populated)
console.log(JSON.stringify(buildHandshake(), null, 2));

// 6. Core MCP methods
registerMethod("lists.list", async () => {
  return listRegistry.list().map(l => ({
    id: l.id,
    title: l.title,
    count: l.items.length
  }));
});

registerMethod("lists.get", async (params) => {
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

// Call onReady
await runtime.onReady();

// 7. Start MCP loop
startMCPServer();

const shutdown = async (signal: string) => {
  try {
    await runtime.shutdown(signal);
  } finally {
    process.exit(0);
  }
};

// 8. Listen for termination signals and shut down gracefully
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
