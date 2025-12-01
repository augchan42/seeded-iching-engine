/**
 * Hash a string seed into a 32-bit integer
 *
 * Uses a simple but effective hashing algorithm (djb2 variant)
 * to convert arbitrary string seeds into numeric values suitable
 * for seeding the PRNG.
 *
 * @param seed - A string seed (typically hex-encoded entropy)
 * @returns A 32-bit unsigned integer
 */
export function hashSeed(seed: string): number {
  let hash = 5381;

  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    // hash * 33 + char (djb2 algorithm)
    hash = ((hash << 5) + hash + char) >>> 0;
  }

  return hash >>> 0;
}

/**
 * Hash a string seed with an additional index for generating
 * multiple independent streams from the same seed.
 *
 * @param seed - A string seed
 * @param index - An index to create a unique stream
 * @returns A 32-bit unsigned integer
 */
export function hashSeedWithIndex(seed: string, index: number): number {
  return hashSeed(`${seed}:${index}`);
}
