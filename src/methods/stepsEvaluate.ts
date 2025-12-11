// src/methods/stepsEvaluate.ts

import type { MCPMetadataProvider, MCPMetadataStep } from "../types/metadataTypes.js";

interface StepsEvaluateParams {
  stepId: string;
}

interface StepsEvaluateResult {
  stepId: string;
  selectedProvider: string;
  model: string;
  score: number;
  explanation: string;
}

/**
 * Simple reasoning provider selection engine (MVP version).
 * Matches step traits with provider capabilities and preferred lists.
 */
export function stepsEvaluate(
  params: StepsEvaluateParams,
  steps: MCPMetadataStep[],
  providers: MCPMetadataProvider[]
): StepsEvaluateResult {
  const step = steps.find(s => s.id === params.stepId);
  if (!step) {
    throw new Error(`Unknown step: ${params.stepId}`);
  }

  let bestScore = -Infinity;
  let bestProvider: MCPMetadataProvider | null = null;

  for (const provider of providers) {
    let score = 0;

    // 1. Preferred provider direct hit
    const providerId = `${provider.provider}.${provider.model}`;
    if (step.preferredProviders.includes(providerId)) {
      score += 0.5;
    }

    // 2. Cognitive match
    if (provider.cognitiveTier === "high") {
      score += 0.3;
    } else if (provider.cognitiveTier === "medium") {
      score += 0.15;
    }

    // 3. Latency / cost bonuses (simple heuristic)
    if (provider.latencyTier === "low") score += 0.1;
    if (provider.costTier === "low") score += 0.1;

    if (score > bestScore) {
      bestScore = score;
      bestProvider = provider;
    }
  }

  if (!bestProvider) {
    throw new Error("No suitable provider found.");
  }

  const explanation =
    `Selected ${bestProvider.provider}.${bestProvider.model} ` +
    `because it best matches the required step traits and preferred providers list.`;

  return {
    stepId: params.stepId,
    selectedProvider: bestProvider.provider,
    model: bestProvider.model,
    score: Number(bestScore.toFixed(3)),
    explanation
  };
}
