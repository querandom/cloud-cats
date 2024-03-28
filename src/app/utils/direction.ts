export type Direction = "left" | "right" | "up" | "down";
export const DIRECTION_LEFT = "left";
export const DIRECTION_RIGHT = "right" as const;
export const DIRECTION_UP = "up";
export const DIRECTION_DOWN = "down";
export const DIRECTIONS: Direction[] = [
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  DIRECTION_DOWN,
];

const oppositeDirectionMap: { [k in Direction]: Direction } = {
  [DIRECTION_LEFT]: DIRECTION_RIGHT,
  [DIRECTION_RIGHT]: DIRECTION_LEFT,
  [DIRECTION_UP]: DIRECTION_DOWN,
  [DIRECTION_DOWN]: DIRECTION_UP,
};

export const getOppositeDirection = (d: Direction): Direction =>
  oppositeDirectionMap[d];
