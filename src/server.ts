import { buildHandshake } from "./mcp/handshake"

// Entry point placeholder for the DAPO MCP Server.
// In a full MCP implementation, this will become
// the JSON-RPC server that responds to MCP client requests.

console.log(JSON.stringify(buildHandshake(), null, 2));
