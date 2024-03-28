import { PointData } from "pixi.js";
import { BaseUIElement } from "../types";

export type Coordinates = PointData;

// returns the below/left positions of the given element.
export function getBottomLeftCoords(element: BaseUIElement): Coordinates {
  const y = element.y + element.height;
  return { x: element.x, y };
}
