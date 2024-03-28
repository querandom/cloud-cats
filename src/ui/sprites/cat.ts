import { Rectangle } from "pixi.js";
import { AnimatableSprite } from "./base-sprite";
import { percentage } from "../../app/utils/number";
import {
  getRandomNumberInBetween,
  getRandomValue,
} from "../../app/utils/random";
import { DIRECTION_LEFT, DIRECTION_RIGHT } from "../../app/utils/direction";
import { createSineAnimationWithDefaults } from "../../app/animations/sinusoidal";

const maxPercentage = 85;
const minPercentage = 75;

enum SPEED {
  SLOW,
  FAST,
  MID,
}
const VALID_SPEEDS = [SPEED.SLOW, SPEED.FAST, SPEED.MID] as const;

const ANIMATION_MOVE: {
  [k in (typeof VALID_SPEEDS)[number]]: { angle: number; speed: number };
} = {
  [SPEED.SLOW]: {
    angle: 0.08,
    speed: 0.5,
  },
  [SPEED.FAST]: {
    angle: 0.03,
    speed: 1,
  },
  [SPEED.MID]: {
    angle: 0.05,
    speed: 0.7,
  },
};

const VALID_DIRECTIONS = [DIRECTION_LEFT, DIRECTION_RIGHT] as const;
type ValidDirection = (typeof VALID_DIRECTIONS)[number];
const isValidDirection = (value: any): value is ValidDirection =>
  VALID_DIRECTIONS.includes(value);

class Cat extends AnimatableSprite {
  private _startFrom: ValidDirection = DIRECTION_RIGHT;

  get startFrom() {
    return this._startFrom;
  }

  set startFrom(value: string) {
    this._startFrom = isValidDirection(value) ? value : this._startFrom;
  }

  init(screen: Rectangle) {
    const startedSide = this._startFrom;
    // random percentage of the screen height
    // this will give the sensation of new every time
    const y = percentage(
      screen.height,
      getRandomNumberInBetween(maxPercentage, minPercentage)
    );

    const initialXMap = {
      [DIRECTION_RIGHT]: -this.width,
      [DIRECTION_LEFT]: screen.width + this.width,
    };

    this.position = {
      x: initialXMap[startedSide],
      y,
    };

    const speed = getRandomValue(VALID_SPEEDS);
    const mood = ANIMATION_MOVE[speed];

    this.animation = createSineAnimationWithDefaults(this, screen, {
      starterDirection: startedSide,
      canDisappear: true,
      infinite: false,
      angleDelta: mood.angle,
      speed: mood.speed,
      onReachedLimit: (animation) => {
        animation.stopAnimation();

        setTimeout(() => {
          this.init(screen);
        }, getRandomNumberInBetween(800, 1000));
      },
    });
  }
}

export const createCatSprite = (src: string) => {
  return new Cat(src);
};
