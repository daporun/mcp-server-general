export const logger = {
  info(message: string): void {
    console.log(`[MCP] ${message}`);
  },

  warn(message: string): void {
    console.warn(`[MCP][WARN] ${message}`);
  },

  error(message: string): void {
    console.error(`[MCP][ERROR] ${message}`);
  },
};
