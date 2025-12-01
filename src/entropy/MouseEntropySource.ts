import { EntropySource } from "./EntropySource";

/**
 * MouseEntropySource
 *
 * Collects entropy from mouse/touch movements in browser environments.
 * This is primarily useful for web applications and is not available
 * in Node.js environments.
 *
 * Note: This source requires user interaction and is designed for
 * browser environments only.
 */
export class MouseEntropySource implements EntropySource {
  readonly name = "mouse";

  private collectedEntropy: number[] = [];
  private isCollecting = false;
  private resolveCollection: ((value: Uint8Array) => void) | null = null;
  private targetBytes = 0;

  isAvailable(): boolean {
    // Only available in browser environments with DOM
    return (
      typeof document !== "undefined" && typeof document.addEventListener === "function"
    );
  }

  async collect(bytes: number): Promise<Uint8Array> {
    if (!this.isAvailable()) {
      throw new Error("MouseEntropySource is only available in browser environments");
    }

    this.targetBytes = bytes;
    this.collectedEntropy = [];
    this.isCollecting = true;

    return new Promise((resolve) => {
      this.resolveCollection = resolve;
      this.startListening();
    });
  }

  private startListening(): void {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (!this.isCollecting) return;

      let x: number, y: number;

      if ("touches" in event && event.touches.length > 0) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
      } else if ("clientX" in event) {
        x = event.clientX;
        y = event.clientY;
      } else {
        return;
      }

      // Extract entropy from mouse position and timing
      const time = performance.now();
      const entropy =
        (Math.floor(x) ^ Math.floor(y) ^ Math.floor(time * 1000)) & 0xff;
      this.collectedEntropy.push(entropy);

      // Check if we have enough entropy
      if (this.collectedEntropy.length >= this.targetBytes) {
        this.stopListening(handler);
        this.isCollecting = false;

        if (this.resolveCollection) {
          this.resolveCollection(new Uint8Array(this.collectedEntropy.slice(0, this.targetBytes)));
          this.resolveCollection = null;
        }
      }
    };

    document.addEventListener("mousemove", handler);
    document.addEventListener("touchmove", handler);
  }

  private stopListening(
    handler: (event: MouseEvent | TouchEvent) => void
  ): void {
    document.removeEventListener("mousemove", handler);
    document.removeEventListener("touchmove", handler);
  }
}
