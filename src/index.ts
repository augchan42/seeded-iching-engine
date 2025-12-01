/**
 * Seeded I-Ching Engine
 *
 * A deterministic, replayable hexagram generator based on a seeded PRNG architecture.
 *
 * @example
 * ```typescript
 * import { generateSeed, castHexagramWithSeed, replayHexagram } from "i-ching-seeded-engine";
 *
 * // Generate a new seed
 * const seedData = await generateSeed();
 *
 * // Cast a hexagram
 * const result = castHexagramWithSeed(seedData);
 * console.log(result.currentHexagram.name);
 *
 * // Save seedData to replay later...
 *
 * // Replay the exact same reading
 * const replay = replayHexagram(seedData);
 * ```
 */

// Main API
export { castHexagramWithSeed, replayHexagram } from "./hexagram";
export { generateSeed, createSeedFromEntropy } from "./hexagram";

// Types
export type {
  DivinationSeed,
  DivinationResult,
  DivinationAlgorithm,
  Hexagram,
  Line,
  LineValue,
  LineType,
  GenerateSeedOptions,
} from "./hexagram";

// PRNG utilities
export { createSeededRandom, mulberry32, hashSeed } from "./prng";
export type { SeededRandom } from "./prng";

// Entropy collection
export {
  EntropyCollector,
  CryptoEntropySource,
  TimingEntropySource,
  MouseEntropySource,
} from "./entropy";
export type { EntropySource, EntropyQuality } from "./entropy";

// Line generation utilities
export {
  traditionalYarrowStalkLine,
  coinMethodLine,
  generateSixLines,
  lineValueToType,
  isChangingLine,
  transformLine,
} from "./hexagram";

// Hexagram data
export { HEXAGRAM_DATA, getHexagramByBinary, getHexagramByNumber } from "./hexagram";

// Encoding utilities
export { bytesToHex, hexToBytes, bytesToBase64, base64ToBytes } from "./utils";
