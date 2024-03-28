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

export const DIRECTION_Y = [DIRECTION_UP, DIRECTION_DOWN] as const;
export type DirectionY = (typeof DIRECTION_Y)[number];

export const DIRECTION_X = [DIRECTION_LEFT, DIRECTION_RIGHT] as const;
export type DirectionX = (typeof DIRECTION_X)[number];

const oppositeDirectionMap: { [k in Direction]: Direction } = {
  [DIRECTION_LEFT]: DIRECTION_RIGHT,
  [DIRECTION_RIGHT]: DIRECTION_LEFT,
  [DIRECTION_UP]: DIRECTION_DOWN,
  [DIRECTION_DOWN]: DIRECTION_UP,
};

export function getOppositeDirection<T extends DirectionY | DirectionX>(
  d: T
): T {
  return oppositeDirectionMap[d] as T;
}
