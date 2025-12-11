// Shared DAPO metadata types

export interface DapoProviderProfile {
  provider: string;
  model: string;
  strengths: readonly string[];
  weaknesses: readonly string[];

  costTier: "low" | "medium" | "high";
  latencyTier: "low" | "medium" | "high";
  cognitiveTier: "low" | "medium" | "high";
}

export interface DapoStepProfile {
  id: string;
  requiredTraits: readonly string[];
  preferredProviders: readonly string[];
}

export type DapoScoringDimension =
  | "latency"
  | "cost"
  | "cognitive";

export interface DapoBaselineProfile {
  provider: string;
  model: string;
  description: string;
}
