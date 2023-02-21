import { describe, expect, test } from "@jest/globals";
import { TreasureMap } from "../src/TreasureMap";

describe("Test de la classe TreasureMap", () => {
  test("Test definition", () => {
    const mapDescription = `C - 3 - 4
M - 1 - 0
M - 2 - 1
T - 0 - 3 - 2
T - 1 - 3 - 3`;
    const tmap = new TreasureMap(mapDescription);
    expect(tmap.getDescription().trim()).toBe(mapDescription);
  });

  test("Test Matrix", () => {
    const mapDescription = `C - 3 - 4
M - 1 - 0
M - 2 - 1
T - 0 - 3 - 2
T - 1 - 3 - 3`;
    const tmap = new TreasureMap(mapDescription);
    expect(tmap.getMatrix()).toStrictEqual([
      [".", "M", "."],
      [".", ".", "M"],
      [".", ".", "."],
      ["T(2)", "T(3)", "."],
    ]);
    expect(String(tmap).trim()).toBe(
      ".\tM\t.\n.\t.\tM\n.\t.\t.\nT(2)\tT(3)\t."
    );
  });
});
