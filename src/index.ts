import { TreasureMap } from "./TreasureMap";
import { writeFileSync } from "fs";
import { parseArgs } from "node:util";

/** Utility function to sleep a number of ms */
const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

/**
 * Main Function
 */
const main = async () => {
  const {
    values: { outputFile, delayString },
  } = parseArgs({
    options: {
      outputFile: {
        type: "string",
        short: "o",
        default: "output.txt",
      },
      delayString: {
        type: "string",
        short: "d",
        default: "1000",
      },
    },
  });

  const delay = parseInt(delayString || "1000");
  if (Number.isNaN(delay)) {
    console.error("Delay should be a duration in ms");
    process.exit(1);
  }

  const tr = new TreasureMap(`C - 3 - 4
  M - 1 - 0
  M - 2 - 1
  T - 0 - 3 - 2
  T - 1 - 3 - 3
  A - Lara - 1 - 1 - S - AADADAGGA`);

  let i = 1;
  console.log(`Initial State : `);
  console.log(tr.toString(), "\n");

  console.log(`1er tour`);
  while (tr.do_turn(true)) {
    await sleep(delay);
    i++;
    console.log(`\n${i}e tour`);
  }

  console.log(`\nWriting to ${outputFile}`);
  writeFileSync(outputFile as string, tr.getDescription());
};

main();
