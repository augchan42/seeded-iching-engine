/**
 * EntropySource interface
 *
 * Represents a source of entropy that can be collected
 * for seed generation. Different implementations provide
 * entropy from various sources (crypto, timing, user input, etc.)
 */
export interface EntropySource {
  /** Unique identifier for this entropy source */
  readonly name: string;

  /**
   * Collect entropy bytes from this source
   *
   * @param bytes - Number of bytes to collect
   * @returns Promise resolving to a Uint8Array of entropy bytes
   */
  collect(bytes: number): Promise<Uint8Array>;

  /**
   * Check if this entropy source is available in the current environment
   *
   * @returns true if the source can be used
   */
  isAvailable(): boolean;
}

/**
 * Entropy quality levels for different sources
 */
export enum EntropyQuality {
  /** Cryptographically secure entropy (e.g., crypto.getRandomValues) */
  Cryptographic = "cryptographic",

  /** High-quality entropy from environmental sources */
  High = "high",

  /** Medium-quality entropy from timing or user input */
  Medium = "medium",

  /** Low-quality entropy (fallback sources) */
  Low = "low",
}
