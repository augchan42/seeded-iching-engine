/**
 * Cast Hexagram with Seed
 *
 * The main entry point for deterministic hexagram generation.
 * Given a seed, always produces the same hexagram.
 */

import { createSeededRandom } from "../prng";
import {
  DivinationSeed,
  DivinationResult,
  Hexagram,
  Line,
  LineValue,
} from "./types";
import {
  generateSixLines,
  transformLine,
  createLine,
  lineValueToType,
} from "./lineGeneration";
import { getHexagramByBinary } from "./hexagramData";

/**
 * Convert lines to binary representation
 *
 * @param lines - Array of Line objects
 * @returns Binary string (bottom line first, 1=yang, 0=yin)
 */
function linesToBinary(lines: Line[]): string {
  return lines.map((line) => (line.type === "yang" ? "1" : "0")).join("");
}

/**
 * Build a complete Hexagram object from lines
 *
 * @param lines - Array of six Line objects
 * @returns Complete Hexagram object
 */
function buildHexagram(lines: Line[]): Hexagram {
  const binary = linesToBinary(lines);
  const info = getHexagramByBinary(binary);

  if (!info) {
    throw new Error(`Unknown hexagram binary: ${binary}`);
  }

  return {
    number: info.number,
    name: info.name,
    character: info.character,
    lines,
    binary,
  };
}

/**
 * Get the transformed hexagram by flipping changing lines
 *
 * @param lines - Original lines
 * @returns Transformed lines or null if no changes
 */
function getTransformedLines(lines: Line[]): Line[] | null {
  const hasChangingLines = lines.some((line) => line.changing);

  if (!hasChangingLines) {
    return null;
  }

  return lines.map((line) => {
    if (line.changing) {
      const newValue = transformLine(line.value);
      return createLine(newValue, line.position);
    }
    return line;
  });
}

/**
 * Cast a hexagram using a provided seed
 *
 * This is the main function for deterministic divination.
 * Given the same seed and parameters, it will always produce
 * the same result.
 *
 * @param seedData - The divination seed with entropy and parameters
 * @returns Complete divination result with hexagram(s)
 */
export function castHexagramWithSeed(seedData: DivinationSeed): DivinationResult {
  const { seed, algorithm, params } = seedData;

  // Create seeded RNG
  const rng = createSeededRandom(seed);

  // Determine method based on algorithm
  const method = algorithm.startsWith("coin") ? "coin" : "yarrow";
  const variationPercent = params?.variationPercent ?? 0;

  // Generate six lines
  const lines = generateSixLines(rng, method, variationPercent);

  // Extract raw values
  const rawLines = lines.map((line) => line.value);

  // Build current hexagram
  const currentHexagram = buildHexagram(lines);

  // Build transformed hexagram if applicable
  const transformedLines = getTransformedLines(lines);
  const transformedHexagram = transformedLines
    ? buildHexagram(transformedLines)
    : null;

  // Find changing line positions
  const changingLines = lines
    .filter((line) => line.changing)
    .map((line) => line.position);

  return {
    currentHexagram,
    transformedHexagram,
    changingLines,
    rawLines,
  };
}

/**
 * Replay a hexagram from stored seed data
 *
 * This is a convenience alias for castHexagramWithSeed
 * that makes the replay intention explicit.
 *
 * @param seedData - Previously stored seed data
 * @returns The exact same divination result as the original
 */
export function replayHexagram(seedData: DivinationSeed): DivinationResult {
  return castHexagramWithSeed(seedData);
}
