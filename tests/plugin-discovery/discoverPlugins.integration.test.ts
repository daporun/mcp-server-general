import { describe, it, expect, afterEach, afterAll, beforeEach } from "vitest";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";

import { discoverPlugins } from "../../src/mcp/plugins/discoverPlugins.js";

// Temporary plugin directory used only for these tests
let TEST_DIR: string;

beforeEach(async () => {
  TEST_DIR = `tests/.tmp-plugins-${Date.now()}`;
  await mkdir(TEST_DIR, { recursive: true });
});

afterEach(async () => {
  await rm(TEST_DIR, { recursive: true, force: true });
});

afterAll(async () => {
  await rm(TEST_DIR, { recursive: true, force: true });
});

describe("discoverPlugins – integration", () => {
  it("returns empty array when plugin directory is empty", async () => {
    const plugins = await discoverPlugins(TEST_DIR);
    expect(plugins).toEqual([]);
  });

  it("loads plugins in alphabetical order", async () => {
    await writeFile(
      join(TEST_DIR, "b.js"),
      `export default { name: "plugin-b" };`
    );

    await writeFile(
      join(TEST_DIR, "a.js"),
      `export default { name: "plugin-a" };`
    );

    const plugins = await discoverPlugins(TEST_DIR);

    expect(plugins.map(p => p.name)).toEqual([
      "plugin-a",
      "plugin-b",
    ]);
  });

  it("fails if a plugin has no default export", async () => {
    await writeFile(
      join(TEST_DIR, "bad.js"),
      `export const foo = {};`
    );

    await expect(discoverPlugins(TEST_DIR)).rejects.toThrow(
      "Invalid plugin export in file"
    );
  });

    it("fails if default export is missing required MCPPlugin fields", async () => {
    await writeFile(
        join(TEST_DIR, "bad.js"),
        `export default { foo: 123 };`
    );

    await expect(discoverPlugins(TEST_DIR)).rejects.toThrow(
        "Invalid MCPPlugin structure"
    );
    });

    it("fails on duplicate plugin names with clear error", async () => {
    await writeFile(
        join(TEST_DIR, "a.js"),
        `export default { name: "dup" };`
    );

    await writeFile(
        join(TEST_DIR, "b.js"),
        `export default { name: "dup" };`
    );

    await expect(discoverPlugins(TEST_DIR)).rejects.toThrow(
        "Failed to load plugin due to identical name: dup"
    );
    });
});
