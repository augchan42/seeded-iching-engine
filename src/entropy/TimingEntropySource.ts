import { EntropySource } from "./EntropySource";

/**
 * TimingEntropySource
 *
 * Collects entropy from timing jitter in the system.
 * Uses high-resolution timestamps to capture micro-variations
 * in execution timing that are hard to predict.
 *
 * Note: This is a supplementary entropy source and should
 * be combined with cryptographic entropy for production use.
 */
export class TimingEntropySource implements EntropySource {
  readonly name = "timing";

  isAvailable(): boolean {
    // Available in most environments
    return true;
  }

  async collect(bytes: number): Promise<Uint8Array> {
    const result = new Uint8Array(bytes);

    for (let i = 0; i < bytes; i++) {
      // Collect timing jitter
      let entropy = 0;

      for (let bit = 0; bit < 8; bit++) {
        const start = this.getHighResTime();

        // Perform some work to introduce timing variation
        let work = 0;
        for (let j = 0; j < 100; j++) {
          work = (work + Math.random() * 1000) % 256;
        }

        const end = this.getHighResTime();
        const delta = end - start;

        // Use the least significant bit of the timing delta
        // This captures the most unpredictable part of the timing
        entropy = (entropy << 1) | (Math.floor(delta * 1000000) & 1);
      }

      result[i] = entropy;

      // Small delay to allow system state to change
      await this.microDelay();
    }

    return result;
  }

  private getHighResTime(): number {
    if (typeof performance !== "undefined" && performance.now) {
      return performance.now();
    }
    // Fallback to Date.now() with less precision
    return Date.now();
  }

  private microDelay(): Promise<void> {
    return new Promise((resolve) => {
      // Use setImmediate in Node.js, setTimeout elsewhere
      if (typeof setImmediate !== "undefined") {
        setImmediate(resolve);
      } else {
        setTimeout(resolve, 0);
      }
    });
  }
}
