/**
 * Line Generation
 *
 * Implements traditional I-Ching line generation methods
 * using a seeded PRNG for deterministic results.
 */

import { SeededRandom } from "../prng";
import { LineValue, Line, LineType } from "./types";

/**
 * Traditional yarrow stalk probabilities
 *
 * The yarrow stalk method produces unequal probabilities:
 * - 6 (Old Yin):   1/16 (6.25%)
 * - 7 (Young Yang): 5/16 (31.25%)
 * - 8 (Young Yin):  7/16 (43.75%)
 * - 9 (Old Yang):   3/16 (18.75%)
 *
 * This creates a slight bias toward Yin, reflecting the
 * traditional cosmological understanding.
 */
const YARROW_PROBABILITIES = {
  6: 1 / 16, // Old Yin
  7: 5 / 16, // Young Yang
  8: 7 / 16, // Young Yin
  9: 3 / 16, // Old Yang
} as const;

/**
 * Three-coin method probabilities (equal)
 *
 * The coin method produces equal probabilities:
 * - 6 (Old Yin):   1/8 (12.5%)
 * - 7 (Young Yang): 3/8 (37.5%)
 * - 8 (Young Yin):  3/8 (37.5%)
 * - 9 (Old Yang):   1/8 (12.5%)
 */
const COIN_PROBABILITIES = {
  6: 1 / 8, // Old Yin
  7: 3 / 8, // Young Yang
  8: 3 / 8, // Young Yin
  9: 1 / 8, // Old Yang
} as const;

/**
 * Generate a single line using the yarrow stalk method
 *
 * @param rng - Seeded random number generator
 * @param variationPercent - Optional adjustment to probabilities (0-100)
 * @returns A LineValue (6, 7, 8, or 9)
 */
export function traditionalYarrowStalkLine(
  rng: SeededRandom,
  variationPercent = 0
): LineValue {
  const roll = rng.next();
  const variation = variationPercent / 100;

  // Apply variation to probabilities if specified
  // This allows for subtle adjustments while maintaining the spirit of the method
  const p6 = YARROW_PROBABILITIES[6] * (1 + variation * (rng.next() - 0.5));
  const p7 = YARROW_PROBABILITIES[7] * (1 + variation * (rng.next() - 0.5));
  const p8 = YARROW_PROBABILITIES[8] * (1 + variation * (rng.next() - 0.5));
  // p9 is the remainder

  // Normalize and select
  const total = p6 + p7 + p8 + YARROW_PROBABILITIES[9];
  const normalized = roll * total;

  if (normalized < p6) return 6;
  if (normalized < p6 + p7) return 7;
  if (normalized < p6 + p7 + p8) return 8;
  return 9;
}

/**
 * Generate a single line using the three-coin method
 *
 * @param rng - Seeded random number generator
 * @returns A LineValue (6, 7, 8, or 9)
 */
export function coinMethodLine(rng: SeededRandom): LineValue {
  // Simulate three coin tosses
  // Heads = 3, Tails = 2
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    sum += rng.nextBool() ? 3 : 2;
  }

  // Sum determines line value:
  // 6 = 2+2+2, 7 = 2+2+3, 8 = 2+3+3, 9 = 3+3+3
  return sum as LineValue;
}

/**
 * Convert a line value to its basic type
 *
 * @param value - The line value (6, 7, 8, or 9)
 * @returns The line type (yin or yang)
 */
export function lineValueToType(value: LineValue): LineType {
  // 7 and 9 are Yang, 6 and 8 are Yin
  return value % 2 === 1 ? "yang" : "yin";
}

/**
 * Determine if a line is changing
 *
 * @param value - The line value
 * @returns true if the line is changing (old yin or old yang)
 */
export function isChangingLine(value: LineValue): boolean {
  return value === 6 || value === 9;
}

/**
 * Get the transformed value of a changing line
 *
 * @param value - The original line value
 * @returns The transformed value
 */
export function transformLine(value: LineValue): LineValue {
  if (value === 6) return 7; // Old Yin -> Young Yang
  if (value === 9) return 8; // Old Yang -> Young Yin
  return value; // Young lines don't change
}

/**
 * Create a Line object from a value and position
 *
 * @param value - The line value
 * @param position - Position in hexagram (1-6, bottom to top)
 * @returns Complete Line object
 */
export function createLine(value: LineValue, position: number): Line {
  return {
    value,
    type: lineValueToType(value),
    changing: isChangingLine(value),
    position,
  };
}

/**
 * Generate six lines for a complete hexagram
 *
 * @param rng - Seeded random number generator
 * @param method - Generation method ("yarrow" or "coin")
 * @param variationPercent - Optional variation for yarrow method
 * @returns Array of six Line objects
 */
export function generateSixLines(
  rng: SeededRandom,
  method: "yarrow" | "coin" = "yarrow",
  variationPercent = 0
): Line[] {
  const lines: Line[] = [];

  for (let position = 1; position <= 6; position++) {
    const value =
      method === "yarrow"
        ? traditionalYarrowStalkLine(rng, variationPercent)
        : coinMethodLine(rng);

    lines.push(createLine(value, position));
  }

  return lines;
}
