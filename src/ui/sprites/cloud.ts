import { AnimatableContainer } from "./base-sprite";
import {
  getRandomValue,
  getRandomNumberInBetween,
} from "../../app/utils/random";
import { DIRECTION_LEFT, DIRECTION_RIGHT } from "../../app/utils/direction";
import { percentage } from "../../app/utils/number";
import { createLinealAnimationWithDefaults } from "../../app/animations/linear";
import { BaseUIElement } from "../../app/types";
import { Sprite } from "pixi.js";

const minPercentage = 0;
const maxPercentage = 40;

const VALID_DIRECTIONS = [DIRECTION_LEFT, DIRECTION_RIGHT] as const;

export class CloudWrapper extends AnimatableContainer {
  label = "cloud-wrapper";

  init(screen: BaseUIElement): void {
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
  const wrapper = new CloudWrapper();
  const cloud = Sprite.from(src);
  cloud.label = "cloud";

  wrapper.addChild(cloud);

  return wrapper;
};
