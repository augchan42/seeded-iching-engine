/**
 * I-Ching Hexagram Types
 *
 * Core type definitions for hexagram representation and divination.
 */

/**
 * Line values in traditional I-Ching
 *
 * Each line can be one of four types based on the yarrow stalk method:
 * - 6: Old Yin (changing to Yang) ⚋
 * - 7: Young Yang (stable) ⚊
 * - 8: Young Yin (stable) ⚋
 * - 9: Old Yang (changing to Yin) ⚊
 */
export type LineValue = 6 | 7 | 8 | 9;

/**
 * Simplified line type (Yin or Yang)
 */
export type LineType = "yin" | "yang";

/**
 * A single line with its value and derived properties
 */
export interface Line {
  /** The raw value (6, 7, 8, or 9) */
  value: LineValue;

  /** The line type (yin or yang) */
  type: LineType;

  /** Whether this line is changing (6 or 9) */
  changing: boolean;

  /** Position in the hexagram (1-6, bottom to top) */
  position: number;
}

/**
 * A complete hexagram with six lines
 */
export interface Hexagram {
  /** Hexagram number (1-64) */
  number: number;

  /** Traditional name */
  name: string;

  /** Chinese character */
  character: string;

  /** The six lines, ordered bottom to top */
  lines: Line[];

  /** Binary representation (e.g., "111000" for hex 12) */
  binary: string;
}

/**
 * Result of a complete divination
 */
export interface DivinationResult {
  /** The primary hexagram */
  currentHexagram: Hexagram;

  /** The transformed hexagram (if any lines are changing) */
  transformedHexagram: Hexagram | null;

  /** Which line positions are changing (1-indexed) */
  changingLines: number[];

  /** The raw line values generated */
  rawLines: LineValue[];
}

/**
 * Seed metadata for reproducible divination
 */
export interface DivinationSeed {
  /** Hex-encoded entropy */
  seed: string;

  /** Algorithm identifier */
  algorithm: string;

  /** Algorithm version */
  version: string;

  /** Optional algorithm parameters */
  params?: {
    /** Variation percentage for line probability adjustment */
    variationPercent?: number;
  };

  /** ISO timestamp of seed creation */
  createdAt: string;
}

/**
 * Supported divination algorithms
 */
export type DivinationAlgorithm = "yarrow-v1" | "coin-v1";
