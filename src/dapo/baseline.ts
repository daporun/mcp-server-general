import type { DapoBaselineProfile } from "./types.js";

// v1 baseline profile for the DAPO MCP Server.
// A neutral, non-optimized reference pipeline profile.
// All scoring and comparison in DAPO is defined *relative* to this baseline.

export const baselineProfile: DapoBaselineProfile = {
  provider: "dapo-baseline",
  model: "baseline-v1",
  description:
    "Neutral reference pipeline for DAPO. Provides a stable, reproducible comparison point for cost, latency, and cognitive metrics."
};
