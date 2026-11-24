// Fortune in a Pot — one kind, funny fortune for a houseplant.
// Writes a single line (<=120 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const FORTUNE =
  "This week a sunbeam will pick your favourite leaf, and you will grow a little taller just to say thank you.";

const MAX_CHARS = 120;
const OUTPUT_PATH = "/output/entry.txt";

if (FORTUNE.length < 1 || FORTUNE.length > MAX_CHARS) {
  throw new Error(
    `fortune must be 1-${MAX_CHARS} characters, got ${FORTUNE.length}`,
  );
}
if (FORTUNE.includes("\n") || FORTUNE.trim() !== FORTUNE) {
  throw new Error("fortune must be a single non-blank line");
}
// Keep the line pure ASCII so its byte length equals its char length
// (the leaderboard tie-break counts bytes).
if (!/^[\x20-\x7e]*$/.test(FORTUNE)) {
  throw new Error("fortune must be plain ASCII text");
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, FORTUNE, "utf8");
console.log(`wrote ${FORTUNE.length} chars to ${OUTPUT_PATH}`);
