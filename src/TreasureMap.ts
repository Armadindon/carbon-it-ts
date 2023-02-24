import { Adventurer } from "./Adventurer";
import { InstructionTypes, Mountain, Treasure } from "./types";

/**
 * Classe contenant toutes les informations liées à la carte de la simulation
 */
export class TreasureMap {
  /** Largeur de la carte */
  private width: number;
  /** Hauteur de la carte */
  private height: number;
  /** Liste des montagnes présentes sur la carte */
  private mountains: Mountain[] = [];
  /** Liste des trésors présent sur la carte */
  private treasures: Treasure[] = [];
  /** Liste des aventuriers présent sur la carte */
  private adventurers: Adventurer[] = [];

  /** Constructeur de la carte, prend en paramètre la description de la carte */
  constructor(
    /** Description de la carte */
    description: string
  ) {
    // On commence par netoyer l'input
    const instructions: string[] = description
      .split("\n")
      .filter((val) => val !== "");

    // La première ligne est la taille de la carte
    [this.width, this.height] = instructions[0]
      .split(" - ")
      .slice(1)
      .map((val) => parseInt(val));

    // On parse les lignes suivante
    for (const instruction of instructions.splice(1)) {
      const [action, ...parameters] = <[InstructionTypes, ...Array<string>]>(
        instruction.split(" - ").map((val) => String(val).trim())
      );

      if (action == "A") {
        this.adventurers.push(new Adventurer(instruction));
        continue;
      }

      // Si ce n'est pas un aventurier, alors les paramètres est une liste de int
      const parsedParameters = parameters.map((val) => parseInt(val));
      switch (action) {
        case "M":
          this.mountains.push({
            x: parsedParameters[0],
            y: parsedParameters[1],
          });
          break;

        case "T":
          this.treasures.push({
            x: parsedParameters[0],
            y: parsedParameters[1],
            nb: parsedParameters[2],
          });
          break;
      }
    }
  }

  /** Retourne la carte sous une forme matricielle composée de chaînes de caractères */
  public getMatrix() {
    const matrix: string[][] = [];

    // On construit la matrice
    for (let i = 0; i < this.height; i++) {
      const line = [];
      for (let j = 0; j < this.width; j++) line.push(".");
      matrix.push(line);
    }

    // On y ajoute le contenu
    for (const { x, y } of this.mountains) matrix[y][x] = "M";
    for (const { x, y, nb } of this.treasures) matrix[y][x] = `T(${nb})`;
    for (const { x, y, heading } of this.adventurers)
      matrix[y][x] = `A(${heading})`;

    return matrix;
  }

  /** Retourne la description de la carte */
  public getDescription() {
    return (
      `C - ${this.width} - ${this.height}\n` +
      this.mountains
        .map((mountain) => `M - ${mountain.x} - ${mountain.y}`)
        .join("\n") +
      // Si il n'y a pas de trésors, on ajoute rien (pas de "\n" non plus)
      (this.treasures.length !== 0
        ? "\n" +
          this.treasures
            .map(
              (treasure) => `T - ${treasure.x} - ${treasure.y} - ${treasure.nb}`
            )
            .join("\n")
        : "") +
      // On fait la même chose avec les aventuriers
      (this.adventurers.length !== 0
        ? "\n" +
          this.adventurers
            .map((adventurer) => adventurer.description)
            .join("\n")
        : "")
    );
  }

  /** Réalise un tour de plateau */
  public do_turn(verbose = false) {
    const remainingAdventurers = this.adventurers.filter(
      (adv) => !adv.finished
    );
    for (const adv of remainingAdventurers) {
      // On recalcule la position des obstacles a chaque tour
      // C'est par ce que l'on a des aventuriers qui bougent au fur et à mesure
      const obstacles = this.mountains.concat(
        this.adventurers.map(({ x, y }) => ({ x, y }))
      );
      adv.doMove(obstacles, this.treasures, {
        height: this.height,
        width: this.width,
      });
    }

    if (verbose) console.log(this.toString());

    return !this.adventurers.every(({ finished }) => finished);
  }

  /** Retourne la représentation en chaine de caractères de la carte (sous forme matricielle) */
  public toString(): string {
    const matrix = this.getMatrix();
    return matrix.map((line) => line.join("\t")).join("\n");
  }
}
