import { Application, Container, Rectangle } from "pixi.js";

export type ApplicationEngine = Application;
// UIElement is the most basic type.
export type UIElement = Container & Rectangle;
export type BaseUIElement = Container | Rectangle;
