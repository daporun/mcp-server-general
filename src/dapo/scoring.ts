import type { DapoScoringDimension } from "./types.js";

// v1 scoring dimensions for the DAPO MCP Server.
// Defines the measurable axes of reasoning optimization.
// These are conceptual categories — not numeric values.

export const scoringDimensions: readonly DapoScoringDimension[] = [
  "latency",
  "cost",
  "cognitive"
];
