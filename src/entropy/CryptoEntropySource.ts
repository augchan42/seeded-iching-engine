import { EntropySource } from "./EntropySource";
import * as nodeCrypto from "crypto";

/**
 * CryptoEntropySource
 *
 * Provides cryptographically secure random entropy using
 * the Node.js crypto module or Web Crypto API.
 */
export class CryptoEntropySource implements EntropySource {
  readonly name = "crypto";

  isAvailable(): boolean {
    // Check for Node.js crypto module
    if (typeof nodeCrypto.randomBytes === "function") {
      return true;
    }
    // Check for Web Crypto API
    if (
      typeof globalThis !== "undefined" &&
      typeof globalThis.crypto?.getRandomValues === "function"
    ) {
      return true;
    }
    return false;
  }

  async collect(bytes: number): Promise<Uint8Array> {
    // Node.js environment
    if (typeof nodeCrypto.randomBytes === "function") {
      return new Uint8Array(nodeCrypto.randomBytes(bytes));
    }

    // Web Crypto API
    if (
      typeof globalThis !== "undefined" &&
      typeof globalThis.crypto?.getRandomValues === "function"
    ) {
      const buffer = new Uint8Array(bytes);
      globalThis.crypto.getRandomValues(buffer);
      return buffer;
    }

    throw new Error("No cryptographic random source available");
  }
}
