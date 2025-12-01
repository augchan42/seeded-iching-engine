# Seeded I-Ching Engine

A deterministic, replayable hexagram generator based on a seeded PRNG architecture.

This library provides a reproducible implementation of traditional I-Ching line and hexagram generation using a **seeded PRNG**. Given the same seed and parameters, it will always produce the same hexagram, transformed hexagram, and line values.

---

## Features

- **Deterministic replay** from a single stored seed
- **Seed metadata** with versioning and parameters
- **Plug-and-play entropy collection** (Web Crypto, timing jitter)
- **Seeded PRNG (Mulberry32)** for reproducible randomness
- **Deterministic line and hexagram logic** (traditional yarrow method)
- Fully TypeScript
- Zero dependencies

---

## Install

```bash
npm install i-ching-seeded-engine
```

## Basic Usage

```typescript
import { generateSeed, castHexagramWithSeed } from "i-ching-seeded-engine";

// Generate a new seed with collected entropy
const seedData = await generateSeed();

// Cast a hexagram
const result = castHexagramWithSeed(seedData);

console.log(result.currentHexagram.name);
// => "Qian (The Creative)"

console.log(result.transformedHexagram?.name);
// => "Kun (The Receptive)" (if changing lines exist)
```

## Replay Any Reading

```typescript
import { replayHexagram } from "i-ching-seeded-engine";

// Load seed from storage (file, database, etc.)
const pastSeed = loadFromStorage();

// Replay produces the exact same result
const replay = replayHexagram(pastSeed);

console.log(replay.currentHexagram.name);
// Always matches the original reading
```

## File-Based Persistence

For simple use cases, save and load seeds from JSON files:

```typescript
import { writeFileSync, readFileSync } from "node:fs";
import { generateSeed, castHexagramWithSeed, replayHexagram } from "i-ching-seeded-engine";

// Generate and save
const seedData = await generateSeed();
writeFileSync("seed.json", JSON.stringify(seedData, null, 2));

// Later: load and replay
const loaded = JSON.parse(readFileSync("seed.json", "utf-8"));
const result = replayHexagram(loaded);
```

## Seed Format

```typescript
interface DivinationSeed {
  seed: string;      // hex-encoded entropy
  algorithm: string; // e.g. "yarrow-v1"
  version: string;   // algorithm version
  params?: {
    variationPercent?: number;
  };
  createdAt: string; // ISO timestamp
}
```

Example seed file:

```json
{
  "seed": "3fa23c8eab0d9b44223d...",
  "algorithm": "yarrow-v1",
  "version": "1.0.0",
  "createdAt": "2025-12-01T12:34:56.789Z"
}
```

## Running Examples

```bash
# Install dependencies
npm install

# Generate a new hexagram and save seed
npm run generate

# Replay the saved hexagram
npm run replay
```

## API Reference

### Main Functions

#### `generateSeed(options?): Promise<DivinationSeed>`

Generate a new seed with collected entropy.

```typescript
const seed = await generateSeed({
  algorithm: "yarrow-v1",  // or "coin-v1"
  entropyBytes: 32,        // bytes of entropy to collect
  variationPercent: 0,     // probability adjustment (0-100)
});
```

#### `castHexagramWithSeed(seedData): DivinationResult`

Cast a hexagram using the provided seed. Deterministic.

#### `replayHexagram(seedData): DivinationResult`

Alias for `castHexagramWithSeed` - makes replay intent explicit.

### Types

#### `DivinationResult`

```typescript
interface DivinationResult {
  currentHexagram: Hexagram;
  transformedHexagram: Hexagram | null;
  changingLines: number[];  // positions 1-6
  rawLines: LineValue[];    // [6|7|8|9, ...]
}
```

#### `Hexagram`

```typescript
interface Hexagram {
  number: number;      // 1-64
  name: string;        // e.g. "Qian (The Creative)"
  character: string;   // e.g. "乾"
  lines: Line[];       // 6 lines, bottom to top
  binary: string;      // e.g. "111111"
}
```

### Entropy Sources

The library includes pluggable entropy sources:

- `CryptoEntropySource` - Cryptographically secure (Node.js crypto / Web Crypto)
- `TimingEntropySource` - Timing jitter entropy
- `MouseEntropySource` - Mouse/touch movement (browser only)

```typescript
import { EntropyCollector, CryptoEntropySource } from "i-ching-seeded-engine";

const collector = new EntropyCollector();
collector.addSource(new CryptoEntropySource());

const entropy = await collector.collect(32);
```

### PRNG Utilities

```typescript
import { createSeededRandom } from "i-ching-seeded-engine";

const rng = createSeededRandom("my-seed-string");

rng.next();           // => 0.0 to 1.0
rng.nextInt(1, 10);   // => 1 to 10 inclusive
rng.nextBool();       // => true or false
rng.pick([1, 2, 3]);  // => random element
rng.shuffle([1,2,3]); // => shuffled copy
```

## Why Seeded?

Deterministic, replayable randomness is useful for:

- **Transparent divination** - verify any reading
- **Reproducible research** - share exact experiments
- **Simulation and agent systems** - replay scenarios
- **Decentralized AI** - verifiable compute
- **On-chain verification** - future work

## Traditional Yarrow Stalk Probabilities

The yarrow stalk method produces unequal probabilities:

| Value | Type | Probability |
|-------|------|-------------|
| 6 | Old Yin (changing) | 1/16 (6.25%) |
| 7 | Young Yang (stable) | 5/16 (31.25%) |
| 8 | Young Yin (stable) | 7/16 (43.75%) |
| 9 | Old Yang (changing) | 3/16 (18.75%) |

This creates a slight bias toward Yin, reflecting traditional cosmological understanding.

## License

MIT
