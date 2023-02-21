export type Mountain = {
  x: number;
  y: number;
};

export type Treasure = {
  x: number;
  y: number;
  nb: number;
};

export type InstructionTypes = "A" | "M" | "T";

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

  /** Constructeur de la carte, prend en paramètre la description de la carte */
  constructor(
    /** Description de la carte */
    description: string
  ) {
    // On commence par netoyer l'input
    let instructions: string[] = description
      .split("\n")
      .filter((val) => val !== "");

    // La première ligne est la taille de la carte
    [this.width, this.height] = instructions[0]
      .split(" - ")
      .slice(1)
      .map((val) => parseInt(val));

    // On parse les lignes suivante
    for (let instruction of instructions.splice(1)) {
      let action: InstructionTypes, parameters: string[];
      [action, ...parameters] = <[InstructionTypes, string]>(
        instruction.split(" - ").map((val) => String(val).trim())
      );

      if (action == "A") {
        console.log("Aventurier a traiter");
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
    console.log(this.treasures, this.mountains);
  }

  /** Retourne la carte sous une forme matricielle composée de chaînes de caractères */
  public getMatrix() {
    let matrix: string[][] = [];

    // On construit la matrice
    for (let i = 0; i < this.height; i++) {
      let line = [];
      for (let j = 0; j < this.width; j++) line.push(".");
      matrix.push(line);
    }

    // On y ajoute le contenu
    for (let { x, y } of this.mountains) matrix[y][x] = "M";
    for (let { x, y, nb } of this.treasures) matrix[y][x] = `T(${nb})`;

    return matrix;
  }

  /** Retourne la description de la carte */
  public getDescription() {
    return (
      "" +
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
        : "")
    );
  }

  /** Retourne la représentation en chaine de caractères de la carte (sous forme matricielle) */
  public toString(): string {
    const matrix = this.getMatrix();
    return matrix.map((line) => line.join("\t")).join("\n");
  }
}
