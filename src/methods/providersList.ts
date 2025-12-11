// src/methods/providersList.ts

import type { MCPMetadataProvider } from "../types/metadataTypes.ts";

/**
 * Returns the list of providers from the MCP metadata.
 */
export function providersList(
  metadataProviders: readonly MCPMetadataProvider[]
): readonly MCPMetadataProvider[] {
  return metadataProviders;
}
