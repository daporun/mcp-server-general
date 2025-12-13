import { describe, it, expect } from "vitest";
import { z } from "zod";

describe("Plugin schema validation", () => {
  const schema = z.object({
    enabled: z.boolean()
  });

  it("accepts valid plugin config", () => {
    const res = schema.safeParse({ enabled: true });
    expect(res.success).toBe(true);
  });

  it("rejects invalid plugin config", () => {
    const res = schema.safeParse({ enabled: "yes" });
    expect(res.success).toBe(false);
  });
});
