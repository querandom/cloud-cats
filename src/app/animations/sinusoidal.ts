import { DEFAULT_ANGLE_DELTA } from "./constants";

import {
  LinearAnimation,
  LinearAnimationConfig,
  defaultLinearConfig,
} from "./linear";
import { UIElement } from "../types";

interface SineAnimationConfig extends LinearAnimationConfig {
  angleDelta: number;
}

const defaultConfig: SineAnimationConfig = {
  // It controls the angle how fast the ascendant and descendant will be
  // higher number will make the angle shorter so the object will bounce more
  // smaller numbers will make the angle
  ...defaultLinearConfig,
  angleDelta: DEFAULT_ANGLE_DELTA,
};

export class SineAnimation extends LinearAnimation<SineAnimationConfig> {
  private _angle: number = 0;

  get angle() {
    return Math.sin(this._angle) / 2;
  }

  protected _moveLeft() {
    return {
      x: this.element.x - this.config.speed,
      y: this.element.y - this.angle,
    };
  }

  protected _moveRight() {
    return {
      x: this.element.x + this.config.speed,
      y: this.element.y - this.angle,
    };
  }

  protected _moveUp() {
    return {
      x: this.element.y - this.angle,
      y: this.element.y - this.config.speed,
    };
  }

  protected _moveDown() {
    return {
      x: this.element.y - this.angle,
      y: this.element.y + this.config.speed,
    };
  }

  animate() {
    super.animate();
    this._angle += this.config.angleDelta;
  }
}

export const createSineAnimationWithDefaults = (
  element: UIElement,
  rectangle: UIElement,
  opts: Partial<SineAnimationConfig> = {}
) => {
  return new SineAnimation(element, {
    layout: rectangle,
    ...defaultConfig,
    ...opts,
  });
};
