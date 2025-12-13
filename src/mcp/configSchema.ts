import { z } from "zod";

/**
 * A single list item.
 * Only `name` is required; everything else is user-defined metadata.
 */
export const MCPListItemSchema = z
  .object({ name: z.string().min(1) })
  .catchall(z.unknown());

export const MCPListSchema = z.object({
  id: z.string().min(1),
  title: z.string().optional(),
  items: z.array(MCPListItemSchema),
});

export const MCPPluginConfigSchema = z.object({
  name: z.string().min(1),
  config: z.record(z.string(), z.unknown()).optional(),
});

export const MCPConfigSchema = z
  .object({
    lists: z.array(MCPListSchema).optional(),
    plugins: z.array(MCPPluginConfigSchema).optional(),
  })
  .catchall(z.unknown());

export type MCPConfig = z.infer<typeof MCPConfigSchema>;
