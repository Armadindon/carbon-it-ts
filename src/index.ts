import { TreasureMap } from "./TreasureMap";

/**
 * Main Function
 */
const main = () => {
  console.log("Carbon IT");
  const tr = new TreasureMap(`C - 3 - 4
  M - 1 - 0
  M - 2 - 1
  T - 0 - 3 - 2
  T - 1 - 3 - 3
  A - Lara - 1 - 1 - S - AADADAGGA`);

  console.log(tr.getMatrix());
  console.log(String(tr));
  console.log(tr.getDescription());
};

main();
