import { DEFAULT_SPEED } from "./constants";
import type { AnimationConfig } from "./types";
import type { BaseUIElement } from "../types";
import { PointData, Rectangle } from "pixi.js";
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  DirectionX,
  DirectionY,
  getOppositeDirection,
} from "../utils/direction";
import { Coordinates } from "../utils/position";
import { UIAnimation } from "./animation";

type LinearDirection =
  | {
      y?: DirectionY;
      x: DirectionX;
    }
  | {
      y: DirectionY;
      x?: DirectionX;
    };

interface BordersTouched {
  xBorderTouched: boolean;
  yBorderTouched: boolean;
}

export interface LinearAnimationConfig extends AnimationConfig {
  onReachLimit?: (
    animation: LinearAnimation,
    bordersTouched: BordersTouched
  ) => void;
  direction: LinearDirection;
  // this property only makes sense if there is a rectangle to check
  canDisappear: boolean;
  // bounce: boolean
  layout?: Rectangle;
}

export const defaultLinearConfig: LinearAnimationConfig = {
  // By default the animation is not infinite
  infinite: false,
  // bounce:
  speed: DEFAULT_SPEED,
  //
  direction: {
    x: DIRECTION_RIGHT,
  },
  canDisappear: false,
};

export class LinearAnimation<
  C extends LinearAnimationConfig = LinearAnimationConfig
> extends UIAnimation<C> {
  protected _currentDirections: LinearDirection;

  constructor(element: BaseUIElement, config: C) {
    super(element, config);

    this._currentDirections = this.config.direction;
  }

  protected hasReachedLimit(): {
    xBorderTouched: boolean;
    yBorderTouched: boolean;
  } {
    let xBorderTouched = false;
    let yBorderTouched = false;

    // if no parent, it will move to a direction for ever
    if (!this.config.layout) {
      return { xBorderTouched, yBorderTouched };
    }

    const canDisappear = this.config.canDisappear;

    const { width, height } = this.element.getSize();
    const { x, y } = this.element.position;

    const hasTouchedXCornerFn = {
      [DIRECTION_LEFT]: x <= (canDisappear ? -width : 0),
      [DIRECTION_RIGHT]:
        x >= this.config.layout.width - (canDisappear ? 0 : width),
    };

    const hasTouchedYCornerFn = {
      [DIRECTION_UP]: y <= (canDisappear ? -height : 0),
      [DIRECTION_DOWN]:
        y >= this.config.layout.height - (canDisappear ? 0 : height),
    };

    if (this._currentDirections.x) {
      xBorderTouched = hasTouchedXCornerFn[this._currentDirections.x];
    }

    if (this._currentDirections.y) {
      yBorderTouched = hasTouchedYCornerFn[this._currentDirections.y];
    }

    return { xBorderTouched, yBorderTouched };
  }

  protected onReachLimit(bordersTouched: BordersTouched) {
    this.config.onReachLimit
      ? this.config.onReachLimit(this, bordersTouched)
      : this._onReachLimit(bordersTouched);
  }

  switchDirection() {
    if (this._currentDirections.x) {
      this._currentDirections.x = getOppositeDirection(
        this._currentDirections.x
      );
    }
    if (this._currentDirections.y) {
      this._currentDirections.y = getOppositeDirection(
        this._currentDirections.y
      );
    }
  }

  // on reach limit switches the direction, this could be overridden
  // by the config `onReachLimit`
  private _onReachLimit({ xBorderTouched, yBorderTouched }: BordersTouched) {
    // switch directions
    const switchDirection = () => {
      if (xBorderTouched && this._currentDirections.x) {
        this._currentDirections.x = getOppositeDirection(
          this._currentDirections.x
        );
      }
      if (yBorderTouched && this._currentDirections.y) {
        this._currentDirections.y = getOppositeDirection(
          this._currentDirections.y
        );
      }
    };

    switchDirection();
  }

  protected _moveLeft({ x, y }: Coordinates): Coordinates {
    return {
      x: x - this.config.speed,
      y,
    };
  }

  protected _moveRight({ x, y }: Coordinates): Coordinates {
    return {
      x: x + this.config.speed,
      y,
    };
  }
  protected _moveUp({ x, y }: Coordinates): Coordinates {
    return {
      x,
      y: y - this.config.speed,
    };
  }

  protected _moveDown({ x, y }: Coordinates): Coordinates {
    return {
      x,
      y: y + this.config.speed,
    };
  }

  protected _getNextPosition(): Coordinates {
    type DirectionMap<T extends string> = {
      [k in T]: (d: Coordinates) => Coordinates;
    };

    const nextXDirectionMap: DirectionMap<DirectionX> = {
      [DIRECTION_LEFT]: (d: Coordinates) => this._moveLeft(d),
      [DIRECTION_RIGHT]: (d: Coordinates) => this._moveRight(d),
    };

    const nextYDirectionMap: DirectionMap<DirectionY> = {
      [DIRECTION_UP]: (d: Coordinates) => this._moveUp(d),
      [DIRECTION_DOWN]: (d: Coordinates) => this._moveDown(d),
    };

    let position: Coordinates = this.element.position;
    if (this._currentDirections.x) {
      position = nextXDirectionMap[this._currentDirections.x](position);
    }

    if (this._currentDirections.y) {
      position = nextYDirectionMap[this._currentDirections.y](position);
    }

    return position;
  }

  getNextPosition(): PointData {
    const nextPosition = this._getNextPosition();

    const { xBorderTouched, yBorderTouched } = this.hasReachedLimit();
    if (xBorderTouched || yBorderTouched) {
      this.onReachLimit({ xBorderTouched, yBorderTouched });
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
