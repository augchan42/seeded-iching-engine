/**
 * Generate Seed
 *
 * Utilities for creating new divination seeds with collected entropy.
 */

import { EntropyCollector, CryptoEntropySource, TimingEntropySource } from "../entropy";
import { DivinationSeed, DivinationAlgorithm } from "./types";

/**
 * Options for seed generation
 */
export interface GenerateSeedOptions {
  /** Algorithm to use (default: "yarrow-v1") */
  algorithm?: DivinationAlgorithm;

  /** Bytes of entropy to collect from each source (default: 16) */
  entropyBytes?: number;

  /** Variation percentage for probability adjustment (default: 0) */
  variationPercent?: number;
}

/**
 * Generate a new divination seed
 *
 * Collects entropy from available sources and creates a
 * complete seed metadata object ready for use or storage.
 *
 * @param options - Optional configuration
 * @returns Promise resolving to a DivinationSeed
 */
export async function generateSeed(
  options: GenerateSeedOptions = {}
): Promise<DivinationSeed> {
  const {
    algorithm = "yarrow-v1",
    entropyBytes = 16,
    variationPercent = 0,
  } = options;

  // Set up entropy collector with available sources
  const collector = new EntropyCollector();
  collector.addSource(new CryptoEntropySource());
  collector.addSource(new TimingEntropySource());

  // Collect entropy
  const seed = await collector.collect(entropyBytes);

  // Build seed metadata
  const seedData: DivinationSeed = {
    seed,
    algorithm,
    version: "1.0.0",
    createdAt: new Date().toISOString(),
  };

  // Add params only if non-default
  if (variationPercent !== 0) {
    seedData.params = { variationPercent };
  }

  return seedData;
}

/**
 * Create a seed from a known entropy string
 *
 * Useful for testing or when you already have entropy
 * from another source.
 *
 * @param entropy - Hex-encoded entropy string
 * @param options - Optional configuration
 * @returns DivinationSeed object
 */
export function createSeedFromEntropy(
  entropy: string,
  options: Omit<GenerateSeedOptions, "entropyBytes"> = {}
): DivinationSeed {
  const { algorithm = "yarrow-v1", variationPercent = 0 } = options;

  const seedData: DivinationSeed = {
    seed: entropy,
    algorithm,
    version: "1.0.0",
    createdAt: new Date().toISOString(),
  };

  if (variationPercent !== 0) {
    seedData.params = { variationPercent };
  }

  return seedData;
}
