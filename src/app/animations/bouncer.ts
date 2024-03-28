// REMOVE THIS?
import type { Rectangle } from "pixi.js";

import {
  LinearAnimation,
  LinearAnimationConfig,
  defaultLinearConfig,
} from "./linear";
import { BaseUIElement } from "../types";

export class BouncerAnimation extends LinearAnimation {
  protected _moveLeft() {
    return {
      x: this.element.x + this.config.speed,
      y: this.element.y - this.config.speed,
    };
  }

  protected _moveRight() {
    return {
      x: this.element.x + this.config.speed,
      y: this.element.y - this.config.speed,
    };
  }

  protected _moveUp() {
    return {
      x: this.element.x - this.config.speed,
      y: this.element.y - this.config.speed,
    };
  }

  protected _moveDown() {
    return {
      x: this.element.x - this.config.speed,
      y: this.element.y + this.config.speed,
    };
  }
  protected hasReachedLimit() {
    // if no parent, it will move to a direction for ever
    console.log(super.hasReachedLimit());
    return super.hasReachedLimit();
  }
}

export const createBounceAnimationWithDefaults = (
  element: BaseUIElement,
  rectangle: Rectangle,
  opts: Partial<LinearAnimationConfig> = {}
) => {
  return new BouncerAnimation(element, {
    layout: rectangle,
    ...defaultLinearConfig,
    ...opts,
  });
};
