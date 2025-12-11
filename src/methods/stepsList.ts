// src/methods/stepsList.ts

import type { MCPMetadataStep } from "../types/metadataTypes.js";

/**
 * Returns the list of reasoning steps defined in the MCP metadata.
 */
export function stepsList(
  metadataSteps: readonly MCPMetadataStep[]
): readonly MCPMetadataStep[] {
  return metadataSteps;
}