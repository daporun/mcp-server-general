// src/types/metadataTypes.ts

export interface MCPMetadataProvider {
  provider: string;
  model: string;
  strengths: string[];
  weaknesses: string[];
  costTier: string;
  latencyTier: string;
  cognitiveTier: string;
}
