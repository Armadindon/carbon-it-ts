import { Treasure } from "./../src/TreasureMap";
import { Adventurer } from "./../src/Adventurer";
import { describe, expect, test } from "@jest/globals";

describe("Test de la classe TreasureMap", () => {
  test("Test description", () => {
    const adventurer = new Adventurer("A - Lara - 1 - 1 - S - AADADAGGA");
    expect(adventurer.description.trim()).toBe("A - Lara - 1 - 1 - S - 0");
  });

  test("Test Move", () => {
    const adventurer = new Adventurer("A - Lara - 0 - 0 - S - AGADDA");
    while (adventurer.doMove([{ x: 1, y: 1 }], [], { height: 2, width: 2 }));
    expect(adventurer.description).toBe("A - Lara - 0 - 1 - W - 0");
  });

  test("Test Treasure", () => {
    const treasures: Treasure[] = [{ x: 0, y: 1, nb: 1 }];
    const adventurer = new Adventurer("A - Lara - 0 - 0 - S - A");
    adventurer.doMove([], treasures, { height: 2, width: 1 });
    expect(treasures.length).toBe(0);
    expect(adventurer.description).toBe("A - Lara - 0 - 1 - S - 1");
  });

  test("Test Treasure Multiples", () => {
    const treasures: Treasure[] = [{ x: 0, y: 1, nb: 2 }];
    const adventurer = new Adventurer("A - Lara - 0 - 0 - S - A");
    adventurer.doMove([], treasures, { height: 2, width: 1 });
    expect(treasures.length).toBe(1);
    expect(treasures[0].nb).toBe(1);
    expect(adventurer.description).toBe("A - Lara - 0 - 1 - S - 1");
  });

  test("Test Pick Treasure N times", () => {
    const treasures: Treasure[] = [{ x: 0, y: 1, nb: 2 }];
    const adventurer = new Adventurer("A - Lara - 0 - 0 - S - AGGAGGA");
    while (adventurer.doMove([], treasures, { height: 2, width: 1 }));
    expect(treasures.length).toBe(0);
    expect(adventurer.description).toBe("A - Lara - 0 - 1 - S - 2");
  });
});
