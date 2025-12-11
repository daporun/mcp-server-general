// src/methods/providersList.ts

import type { MCPMetadataProvider } from "../types/metadataTypes.ts";

/**
 * Returns the list of providers from the MCP metadata.
 */
export function providersList(metadataProviders: MCPMetadataProvider[]): MCPMetadataProvider[] {
  // This function is intentionally simple: 
  // it just returns the provider metadata stored in the manifest.
  return metadataProviders;
}
