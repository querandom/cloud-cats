import { Application, Container, Rectangle } from "pixi.js";

export type ApplicationEngine = Application;
// UIElement is the most basic type.
export type UIElement = Container & Rectangle;
export interface BaseUIElement extends Container {}
// export type BasicUIElement = Pick<
//   Container,
//   "x" | "y" | "width" | "height" | "position"
// >;
