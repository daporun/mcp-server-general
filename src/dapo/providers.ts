import type { DapoProviderProfile } from "./types.js";

// v1 provider registry for the DAPO MCP Server.
// Static metadata only — no runtime model calls.
// This defines the horizontal axis of the DAPO matrix.

export const providers: readonly DapoProviderProfile[] = [
  {
    provider: "openai",
    model: "gpt-4o-mini",
    strengths: [
      "great general-purpose reasoning",
      "balanced cost-performance ratio",
      "fast response times"
    ],
    weaknesses: [
      "not the cheapest option",
      "moderate cognitive depth compared to frontier models"
    ],
    costTier: "medium",
    latencyTier: "low",
    cognitiveTier: "medium"
  },
  {
    provider: "anthropic",
    model: "claude-3-haiku",
    strengths: [
      "exceptional speed",
      "very low latency",
      "high efficiency for quick reasoning tasks"
    ],
    weaknesses: [
      "less capable on complex planning tasks",
      "sometimes under-performs in long-chain reasoning"
    ],
    costTier: "low",
    latencyTier: "low",
    cognitiveTier: "medium"
  },
  {
    provider: "anthropic",
    model: "claude-3-opus",
    strengths: [
      "very strong cognitive depth",
      "excellent for multi-step reasoning",
      "high planning capabilities"
    ],
    weaknesses: [
      "high cost tier",
      "slower latency for smaller tasks"
    ],
    costTier: "high",
    latencyTier: "medium",
    cognitiveTier: "high"
  },
  {
    provider: "bedrock",
    model: "amazon-nova-micro",
    strengths: [
      "extremely low cost",
      "good for deterministic automation tasks",
      "ideal for low-budget pipelines"
    ],
    weaknesses: [
      "limited deep reasoning capabilities",
      "not optimal for multi-step cognitive tasks"
    ],
    costTier: "low",
    latencyTier: "medium",
    cognitiveTier: "low"
  },
  {
    provider: "dapo-baseline",
    model: "baseline-v1",
    strengths: [
      "stable reference point for comparison",
      "ensures reproducible baselines",
      "not optimized — standard-only"
    ],
    weaknesses: [
      "not intended for production reasoning",
      "artificial profile for scoring only"
    ],
    costTier: "medium",
    latencyTier: "medium",
    cognitiveTier: "medium"
  }
];
