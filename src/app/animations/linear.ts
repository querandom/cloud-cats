import { DEFAULT_SPEED } from "./constants";
import type { AnimationConfig } from "./types";
import type { BaseUIElement } from "../types";
import { PointData, Rectangle } from "pixi.js";
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  Direction,
  getOppositeDirection,
} from "../utils/direction";
import { Coordinates } from "../utils/position";
import { UIAnimation } from "./animation";

export interface LinearAnimationConfig extends AnimationConfig {
  onReachedLimit?: (animation: LinearAnimation) => void;
  starterDirection: Direction;
  // this property only makes sense if there is a rectangle to check
  canDisappear: boolean;
  layout?: Rectangle;
}

export const defaultLinearConfig: LinearAnimationConfig = {
  // By default the animation is infinite
  infinite: true,
  speed: DEFAULT_SPEED,
  starterDirection: DIRECTION_RIGHT,
  canDisappear: false,
};

export class LinearAnimation<
  C extends LinearAnimationConfig = LinearAnimationConfig
> extends UIAnimation<C> {
  _currentDirection: Direction;

  constructor(element: BaseUIElement, config: C) {
    super(element, config);

    this._currentDirection = this.config.starterDirection;
  }

  protected hasReachedLimit() {
    // if no parent, it will move to a direction for ever
    if (!this.config.layout) {
      return false;
    }

    const canDisappear = this.config.canDisappear;

    const { width, height } = this.element.getSize();
    const { x, y } = this.element.position;

    const hasTouchedCornerFn = {
      [DIRECTION_LEFT]: x <= (canDisappear ? -width : 0),
      [DIRECTION_RIGHT]:
        x >= this.config.layout.width - (canDisappear ? 0 : width),
      [DIRECTION_UP]: y <= (canDisappear ? 0 : -height),
      [DIRECTION_DOWN]:
        y >= this.config.layout.height - (canDisappear ? height : 0),
    };

    return hasTouchedCornerFn[this._currentDirection];
  }

  protected onReachLimit() {
    this.config.onReachedLimit
      ? this.config.onReachedLimit(this)
      : this._onReachLimit();
  }

  private _onReachLimit() {
    this._currentDirection = getOppositeDirection(this._currentDirection);
  }

  protected _moveLeft() {
    return {
      x: this.element.x - this.config.speed,
      y: this.element.y,
    };
  }

  protected _moveRight() {
    return {
      x: this.element.x + this.config.speed,
      y: this.element.y,
    };
  }
  protected _moveUp() {
    return {
      x: this.element.x,
      y: this.element.y - this.config.speed,
    };
  }

  protected _moveDown() {
    return {
      x: this.element.x,
      y: this.element.y + this.config.speed,
    };
  }

  protected _getNextPosition(): Coordinates {
    const nextDirectionMap = {
      [DIRECTION_LEFT]: this._moveLeft(),
      [DIRECTION_RIGHT]: this._moveRight(),

      [DIRECTION_UP]: this._moveUp(),
      [DIRECTION_DOWN]: this._moveDown(),
    };

    return nextDirectionMap[this._currentDirection];
  }

  getNextPosition(): PointData {
    const nextPosition = this._getNextPosition();

    if (this.hasReachedLimit()) {
      this.onReachLimit();
    }

    return nextPosition;
  }
}

export const createLinealAnimationWithDefaults = (
  element: BaseUIElement,
  layout: Rectangle,
  opts: Partial<LinearAnimationConfig> = {}
) => {
  return new LinearAnimation(element, {
    layout,
    ...defaultLinearConfig,
    ...opts,
  });
};
