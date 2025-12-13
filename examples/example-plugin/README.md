# Example Plugin

This example demonstrates how to write a plugin for **mcp-server-general**.

It showcases:
- the full plugin lifecycle
- configuration validation using Zod
- MCP method registration
- list registration
- graceful shutdown handling

---

## Plugin Overview

**Name:** `example-plugin`

This plugin is intentionally simple and educational.  
It is designed to demonstrate best practices for MCP plugin authors.

---

## Lifecycle Hooks Used

The plugin implements the following lifecycle hooks:

- `schema` – validates plugin configuration
- `setup` – initializes configuration-dependent state
- `onInit` – registers MCP methods and lists
- `onReady` – runs after the MCP server is fully initialized
- `onShutdown` – performs graceful cleanup

---

## Registered MCP Features

### MCP Method

```text
example.greet
```

Returns a simple greeting message from the plugin.

### MCP List

```text
example-items
```

Exposes a static list with two example items.

---

## Usage

To use this plugin, import it into your server bootstrap code
and include it in the plugin list passed to `loadPlugins()`.

```ts
import { examplePlugin } from "./examples/example-plugin/examplePlugin.js";

const pluginModules = [
  examplePlugin,
];
```

If the plugin requires configuration, provide it via `mcp.json`.

---

## Example Log Output

When the MCP server starts, you should see logs similar to:

```text
[example-plugin] onInit
[example-plugin] onReady: MCP server is ready
```

During shutdown:

```text
[example-plugin] shutdown completed
```

---

## Purpose

This plugin serves as:

- a starting point for new plugins
- a reference implementation for the MCP lifecycle
- a template for real-world MCP extensions

Feel free to copy, modify, and extend it.
