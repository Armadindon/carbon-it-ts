import { Coordinates, Heading, Size, Treasure } from "./types";

/** Fait correspondre les headings à une direction */
export const HEADING_TO_MOVEMENT: {
  [heading in Heading]: Coordinates;
} = {
  N: { x: 0, y: -1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: 1 },
  W: { x: -1, y: 0 },
};

/** Fait correspondre les headings à leur gauche / droite */
export const HEADING_TO_LEFT_RIGHT: {
  [heading in Heading]: { left: Heading; right: Heading };
} = {
  N: { left: "W", right: "E" },
  E: { left: "N", right: "S" },
  S: { left: "E", right: "W" },
  W: { left: "S", right: "N" },
};

/** Représente les types de mouvements que peut faire un aventurier */
type MovementTypes = "A" | "G" | "D";

/** Classe représentant un aventurier, gère la logique de déplacement */
export class Adventurer {
  private currentMovement = 0;
  private treasureNb = 0;
  private name: string;
  private _x: number;
  private _y: number;
  private _heading: Heading;
  private movements: MovementTypes[] = [];

  /** Construction de l'objet en prenant en paramètre la description de l'aventurier */
  public constructor(
    /** Descripion de l'aventurier */
    description: string
  ) {
    const [, name, x, y, heading, unparsed_movements] = <
      [string, string, string, string, Heading, string]
    >description.trim().split(" - ");

    this.name = name;
    this._x = parseInt(x);
    this._y = parseInt(y);
    this._heading = heading;
    this.movements = unparsed_movements.split("") as MovementTypes[];
  }

  /** Joue un tour de l'aventurier */
  public doMove(
    /** Obstacles bloquant le passage de l'aventurier */
    obstacles: Coordinates[],
    /** Trésors récupérables par l'aventurier */
    treasures: Treasure[],
    /** Taille de la carte */
    size: Size
  ) {
    if (this.finished) return false;
    const move = this.movements[this.currentMovement];

    switch (move) {
      case "A":
        this.goForward(obstacles, treasures, size);
        break;

      case "D":
        this._heading = HEADING_TO_LEFT_RIGHT[this.heading].right;
        break;

      case "G":
        this._heading = HEADING_TO_LEFT_RIGHT[this.heading].left;
        break;
    }

    this.currentMovement += 1;
    return !this.finished;
  }

  /** Fonction pour que l'aventurier avance et fasse toutes les vérification nécéssaires avant d'avancer */
  private goForward(
    /** Obstacles bloquant le passage de l'aventurier */
    obstacles: Coordinates[],
    /** Trésors récupérables par l'aventurier */
    treasures: Treasure[],
    /** Taille de la carte */
    size: Size
  ) {
    const new_x = this.x + HEADING_TO_MOVEMENT[this.heading].x;
    const new_y = this.y + HEADING_TO_MOVEMENT[this.heading].y;

    // On vérifie que la nouvelle position n'est pas hors map
    if (new_x < 0 || new_x >= size.width || new_y < 0 || new_y >= size.height)
      return;
    // On vérifie qu'il n'y a pas d'obstacle là ou on va
    if (
      obstacles.filter((obstacle) => obstacle.x == new_x && obstacle.y == new_y)
        .length !== 0
    )
      return;

    this.x = new_x;
    this.y = new_y;

    // On regarde s'il y a des trésors à la position
    const foundTreasure = treasures.findIndex(
      (treasure) => treasure.x == this.x && treasure.y == this.y
    );
    // Il ne peut y avoir qu'un seul trésor par case
    if (foundTreasure !== -1) {
      const treasure = treasures[foundTreasure];
      treasure.nb -= 1;
      this.treasureNb++;
      // Si il n'y a plus de trésor, on l'enlève de la liste
      if (treasure.nb === 0) treasures.splice(foundTreasure, 1);
    }
  }

  /** Description de l'aventurier */
  public get description() {
    return ["A", this.name, this.x, this.y, this.heading, this.treasureNb].join(
      " - "
    );
  }

  /** Position x de l'aventurier */
  public get x() {
    return this._x;
  }

  private set x(value: number) {
    if (value < 0) throw new RangeError("x must be positive");
    this._x = value;
  }

  /** Position y de l'aventurier */
  public get y() {
    return this._y;
  }

  private set y(value: number) {
    if (value < 0) throw new RangeError("y must be positive");
    this._y = value;
  }

  /** Direction regardée de l'aventurier */
  public get heading() {
    return this._heading;
  }

  /** Si l'aventurier a fini de réaliser tout ses mouvements */
  public get finished() {
    return this.currentMovement === this.movements.length;
  }
}
