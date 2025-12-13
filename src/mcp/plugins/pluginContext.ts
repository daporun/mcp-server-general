import { registerMethod } from "../MCPRouter.js";
import { listRegistry } from "../ListRegistry.js";
import { logger } from "../logger.js";

export const pluginContext = {
  logger,

  registerMethod,

  registerList: (list: {
    id: string;
    title?: string;
    items: Array<{ name: string; [key: string]: unknown }>;
  }) => {
    listRegistry.register(list);
  },
};
