import type { MCPPluginContext } from "./types.js";
import { router } from "../router.js";
import { listRegistry } from "../ListRegistry.js";
import { logger } from "../logger.js";
import type { MethodHandler } from "../types.js";

export const pluginContext: MCPPluginContext = {
  logger,

  registerMethod(name: string, handler: MethodHandler): void {
    router.register(name, handler);
  },

  registerList(list): void {
    listRegistry.register(list);
  }
};
