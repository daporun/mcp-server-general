import type { DapoStepProfile } from "./types.js";

// v1 step registry for the DAPO MCP Server.
// Defines the vertical reasoning axis (semantic pipeline steps).
// This is metadata only — no runtime execution.

export const steps: readonly DapoStepProfile[] = [
  {
    id: "planning",
    requiredTraits: [
      "multi-step reasoning",
      "global context awareness",
      "branching capability"
    ],
    preferredProviders: ["anthropic.claude-3-opus", "openai.gpt-4o-mini"]
  },
  {
    id: "context-enrichment",
    requiredTraits: [
      "retrieval-friendly reasoning",
      "summarization capability",
      "fast iteration"
    ],
    preferredProviders: ["openai.gpt-4o-mini", "anthropic.claude-3-haiku"]
  },
  {
    id: "transformation",
    requiredTraits: [
      "structured rewriting",
      "syntax adaptation",
      "format-preserving output"
    ],
    preferredProviders: ["openai.gpt-4o-mini"]
  },
  {
    id: "validation",
    requiredTraits: [
      "deterministic reasoning",
      "fact-checking capability",
      "error spotting"
    ],
    preferredProviders: ["bedrock.amazon-nova-micro", "openai.gpt-4o-mini"]
  },
  {
    id: "reduction",
    requiredTraits: [
      "signal extraction",
      "noise filtering",
      "compact summarization"
    ],
    preferredProviders: ["anthropic.claude-3-haiku", "openai.gpt-4o-mini"]
  }
];
