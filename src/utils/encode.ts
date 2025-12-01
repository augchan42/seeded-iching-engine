/**
 * Encoding utilities for seed and entropy handling
 */

/**
 * Convert a Uint8Array to a hexadecimal string
 *
 * @param bytes - The bytes to encode
 * @returns Hex-encoded string
 */
export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Convert a hexadecimal string to a Uint8Array
 *
 * @param hex - The hex string to decode
 * @returns Decoded bytes
 */
export function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error("Hex string must have even length");
  }

  const bytes = new Uint8Array(hex.length / 2);

  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }

  return bytes;
}

/**
 * Convert a Uint8Array to a base64 string
 *
 * @param bytes - The bytes to encode
 * @returns Base64-encoded string
 */
export function bytesToBase64(bytes: Uint8Array): string {
  // Node.js environment
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }

  // Browser environment
  const binary = String.fromCharCode(...bytes);
  return btoa(binary);
}

/**
 * Convert a base64 string to a Uint8Array
 *
 * @param base64 - The base64 string to decode
 * @returns Decoded bytes
 */
export function base64ToBytes(base64: string): Uint8Array {
  // Node.js environment
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(base64, "base64"));
  }

  // Browser environment
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
