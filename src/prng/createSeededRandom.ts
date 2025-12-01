import { mulberry32 } from "./mulberry32";
import { hashSeed } from "./hashSeed";

/**
 * A seeded random number generator interface
 */
export interface SeededRandom {
  /** Get the next random number in [0, 1) */
  next(): number;

  /** Get a random integer in [min, max] inclusive */
  nextInt(min: number, max: number): number;

  /** Get a random boolean with optional probability */
  nextBool(probability?: number): boolean;

  /** Pick a random element from an array */
  pick<T>(array: T[]): T;

  /** Shuffle an array (returns a new array) */
  shuffle<T>(array: T[]): T[];
}

/**
 * Create a seeded random number generator
 *
 * This provides a convenient wrapper around the raw PRNG with
 * additional utility methods for common random operations.
 *
 * @param seed - A string seed (typically hex-encoded entropy)
 * @returns A SeededRandom object with various random methods
 */
export function createSeededRandom(seed: string): SeededRandom {
  const numericSeed = hashSeed(seed);
  const rng = mulberry32(numericSeed);

  return {
    next(): number {
      return rng();
    },

    nextInt(min: number, max: number): number {
      const range = max - min + 1;
      return Math.floor(rng() * range) + min;
    },

    nextBool(probability = 0.5): boolean {
      return rng() < probability;
    },

    pick<T>(array: T[]): T {
      if (array.length === 0) {
        throw new Error("Cannot pick from empty array");
      }
      const index = Math.floor(rng() * array.length);
      return array[index];
    },

    shuffle<T>(array: T[]): T[] {
      const result = [...array];
      // Fisher-Yates shuffle
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
    },
  };
}
