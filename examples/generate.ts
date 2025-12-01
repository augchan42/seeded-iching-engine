/**
 * Generate Example
 *
 * Demonstrates generating a new hexagram with collected entropy
 * and saving the seed to a file for later replay.
 */

import { writeFileSync } from "node:fs";
import { generateSeed, castHexagramWithSeed } from "../src";

async function main() {
  console.log("Generating new divination seed...\n");

  // Generate a new seed with collected entropy
  const seedData = await generateSeed({
    algorithm: "yarrow-v1",
    entropyBytes: 32,
  });

  console.log("Seed generated:");
  console.log(`  Algorithm: ${seedData.algorithm}`);
  console.log(`  Version: ${seedData.version}`);
  console.log(`  Entropy: ${seedData.seed.substring(0, 32)}...`);
  console.log(`  Created: ${seedData.createdAt}\n`);

  // Cast the hexagram
  const result = castHexagramWithSeed(seedData);

  console.log("Current Hexagram:");
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

  // Save seed to file for replay
  const seedFile = "seed.json";
  writeFileSync(seedFile, JSON.stringify(seedData, null, 2));
  console.log(`Seed saved to ${seedFile}`);
  console.log("Run 'npm run replay' to replay this reading.");
}

main().catch(console.error);
