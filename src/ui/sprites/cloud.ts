import { Rectangle } from "pixi.js";
import { AnimatableSprite } from "./base-sprite";
import {
  getRandomValue,
  getRandomNumberInBetween,
} from "../../app/utils/random";
import { DIRECTION_LEFT, DIRECTION_RIGHT } from "../../app/utils/direction";
import { percentage } from "../../app/utils/number";
import { createLinealAnimationWithDefaults } from "../../app/animations/linear";

const minPercentage = 0;
const maxPercentage = 40;

const VALID_DIRECTIONS = [DIRECTION_LEFT, DIRECTION_RIGHT] as const;

class Cloud extends AnimatableSprite {
  init(screen: Rectangle): void {
    // select a random direction to start with
    const randomStarterDirection = getRandomValue(VALID_DIRECTIONS);

    // random percentage of the screen height
    // this will give the sensation of new every time
    const y = percentage(
      screen.height,
      getRandomNumberInBetween(maxPercentage, minPercentage)
    );

    const initialXMap = {
      [DIRECTION_RIGHT]: 0,
      [DIRECTION_LEFT]: screen.width - this.width,
    };

    this.position = {
      x: initialXMap[randomStarterDirection],
      y,
    };

    this.animation = createLinealAnimationWithDefaults(this, screen, {
      direction: {
        x: randomStarterDirection,
      },
    });
  }
}

export const createCloudSprite = (src: string) => {
  return new Cloud(src);
};
