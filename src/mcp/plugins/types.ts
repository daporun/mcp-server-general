import type { ZodSchema } from "zod";

export interface MCPPluginContext {
  logger: {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
  };

  registerMethod: (
    name: string,
    handler: (params: unknown) => Promise<unknown>
  ) => void;

  registerList: (list: {
    id: string;
    title?: string;
    items: Array<{ name: string; [key: string]: unknown }>;
  }) => void;
}

export interface MCPPlugin<TConfig = unknown> {
  /** Unique plugin name */
  name: string;

  /** Optional config schema */
  schema?: ZodSchema<TConfig>;

  /** Called once after config validation */
  setup?: (ctx: MCPPluginContext, config: TConfig | undefined) => void;

  /** Lifecycle hooks (optional) */
  onInit?: (ctx: MCPPluginContext) => Promise<void> | void;
  onReady?: (ctx: MCPPluginContext) => Promise<void> | void;
  onShutdown?: () => Promise<void> | void;
}
