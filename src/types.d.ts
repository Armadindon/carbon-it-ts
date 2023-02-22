/** Objet représentant des coordonées dans un plan a 2 dimensions */
export type Coordinates = { x: number; y: number };
/** Objet représentant une taille 2D */
export type Size = { width: number; height: number };

/** Les instrictions possibles dans une description */
export type InstructionTypes = "A" | "M" | "T";

/** Différente directions dans lesquelles un aventurier peut regarder */
export type Heading = "N" | "E" | "S" | "W";

export type Mountain = Coordinates;

export type Treasure = Coordinates & { nb: number };
