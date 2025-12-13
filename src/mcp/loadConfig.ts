import fs from "node:fs";
import path from "node:path";
import { MCPConfigSchema, type MCPConfig } from "./configSchema.js";

export function loadConfig(configPath = "mcp.json"): MCPConfig {
  const fullPath = path.resolve(process.cwd(), configPath);

  if (!fs.existsSync(fullPath)) return {};

  let raw: unknown;
  try {
    raw = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  } catch (err) {
    throw new Error(`Failed to parse ${configPath}: ${(err as Error).message}`);
  }

  const parsed = MCPConfigSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(
      `Invalid ${configPath}:\n` + JSON.stringify(parsed.error.format(), null, 2)
    );
  }

  return parsed.data;
}
