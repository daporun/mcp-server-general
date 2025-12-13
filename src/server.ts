import { buildHandshake } from "./mcp/MCPHandshake.js";
import { startMCPServer } from "./mcp/MCPRuntime.js";
import { registerMethod } from "./mcp/MCPRouter.js";
import { listRegistry } from "./mcp/ListRegistry.js";
import { loadConfig } from "./mcp/loadConfig.js";
import { loadPlugins } from "./mcp/plugins/loadPlugins.js";
import { pluginContext } from "./mcp/plugins/pluginContext.js";

// 1. Load config
const config = loadConfig();
// after loadConfig()
await loadPlugins(config.plugins, pluginContext);


// 2. Register lists from config
for (const list of config.lists ?? []) {
  listRegistry.register({
    id: list.id,
    title: list.title,
    items: list.items
  });
}

// 3. Handshake (NOW registry is populated)
console.log(JSON.stringify(buildHandshake(), null, 2));

// 4. Core MCP methods
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

// 5. Start MCP loop
startMCPServer();
