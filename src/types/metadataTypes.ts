// src/types/metadataTypes.ts

export interface MCPMetadataProvider {
  provider: string;
  model: string;
  strengths: readonly string[];
  weaknesses: readonly string[];
  costTier: string;
  latencyTier: string;
  cognitiveTier: string;
}

export interface MCPMetadataStep {
  id: string;
  requiredTraits: readonly string[];
  preferredProviders: readonly string[];
}
