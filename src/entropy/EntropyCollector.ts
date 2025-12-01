import { EntropySource } from "./EntropySource";
import { bytesToHex } from "../utils/encode";

/**
 * EntropyCollector
 *
 * Collects entropy from multiple sources and combines them
 * into a single seed value suitable for PRNG initialization.
 */
export class EntropyCollector {
  private sources: EntropySource[] = [];

  /**
   * Add an entropy source to the collector
   *
   * @param source - An EntropySource implementation
   * @returns this for chaining
   */
  addSource(source: EntropySource): this {
    if (source.isAvailable()) {
      this.sources.push(source);
    }
    return this;
  }

  /**
   * Get the list of available sources
   */
  getAvailableSources(): string[] {
    return this.sources.map((s) => s.name);
  }

  /**
   * Collect entropy from all registered sources
   *
   * @param bytesPerSource - Number of bytes to collect from each source
   * @returns Promise resolving to hex-encoded combined entropy
   */
  async collect(bytesPerSource = 16): Promise<string> {
    if (this.sources.length === 0) {
      throw new Error("No entropy sources available");
    }

    const entropyArrays = await Promise.all(
      this.sources.map((source) => source.collect(bytesPerSource))
    );

    // Combine all entropy arrays
    const combined = this.combineEntropy(entropyArrays);

    return bytesToHex(combined);
  }

  /**
   * Combine multiple entropy arrays using XOR
   *
   * This ensures that even if one source is compromised,
   * the combined entropy is still as strong as the strongest source.
   */
  private combineEntropy(arrays: Uint8Array[]): Uint8Array {
    if (arrays.length === 0) {
      throw new Error("No entropy arrays to combine");
    }

    // Find the maximum length
    const maxLength = Math.max(...arrays.map((a) => a.length));
    const result = new Uint8Array(maxLength);

    // XOR all arrays together
    for (const array of arrays) {
      for (let i = 0; i < array.length; i++) {
        result[i] ^= array[i];
      }
    }

    return result;
  }
}
