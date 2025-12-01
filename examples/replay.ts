/**
 * Replay Example
 *
 * Demonstrates loading a seed from file and replaying
 * the exact same hexagram reading.
 */

import { readFileSync, existsSync } from "node:fs";
import { replayHexagram, DivinationSeed } from "../src";

function main() {
  const seedFile = "seed.json";

  // Check if seed file exists
  if (!existsSync(seedFile)) {
    console.error(`Error: ${seedFile} not found.`);
    console.error("Run 'npm run generate' first to create a seed.");
    process.exit(1);
  }

  // Load seed from file
  console.log(`Loading seed from ${seedFile}...\n`);
  const seedData: DivinationSeed = JSON.parse(readFileSync(seedFile, "utf-8"));

  console.log("Seed loaded:");
  console.log(`  Algorithm: ${seedData.algorithm}`);
  console.log(`  Version: ${seedData.version}`);
  console.log(`  Created: ${seedData.createdAt}\n`);

  // Replay the hexagram
  console.log("Replaying divination...\n");
  const result = replayHexagram(seedData);

  console.log("Replayed Hexagram:");
  console.log(`  #${result.currentHexagram.number}: ${result.currentHexagram.name}`);
  console.log(`  Character: ${result.currentHexagram.character}`);
  console.log(`  Binary: ${result.currentHexagram.binary}`);
  console.log(`  Raw lines: [${result.rawLines.join(", ")}]\n`);

  if (result.transformedHexagram) {
    console.log("Transformed Hexagram:");
    console.log(`  #${result.transformedHexagram.number}: ${result.transformedHexagram.name}`);
    console.log(`  Character: ${result.transformedHexagram.character}`);
    console.log(`  Changing lines: ${result.changingLines.join(", ")}\n`);
  } else {
    console.log("No changing lines - no transformation.\n");
  }

  console.log("This reading is identical to the original.");
  console.log("Run it again - you'll get the same result every time!");
}

main();
