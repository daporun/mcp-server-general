import { describe, it, expect } from "vitest";
import { MCPConfigSchema } from "../configSchema.js";

describe("MCPConfigSchema", () => {
  it("accepts minimal valid config", () => {
    const cfg = {
      lists: [
        {
          id: "tools",
          items: [{ name: "ping" }]
        }
      ]
    };

    const result = MCPConfigSchema.safeParse(cfg);
    expect(result.success).toBe(true);
  });

  it("rejects list item without name", () => {
    const cfg = {
      lists: [
        {
          id: "broken",
          items: [{}]
        }
      ]
    };

    const result = MCPConfigSchema.safeParse(cfg);
    expect(result.success).toBe(false);
  });

  it("allows arbitrary extra fields", () => {
    const cfg = {
      lists: [],
      experimental: {
        foo: "bar"
      }
    };

    const result = MCPConfigSchema.safeParse(cfg);
    expect(result.success).toBe(true);
  });
});
