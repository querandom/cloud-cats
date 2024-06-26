import { AnimatableSprite } from "./base-sprite";
import { DIRECTION_DOWN, DIRECTION_LEFT } from "../../app/utils/direction";
import { createLinealAnimationWithDefaults } from "../../app/animations/linear";
import { BaseUIElement } from "../../app/types";

export class BulletAsset extends AnimatableSprite {
  label = "bullet";

  init(screen: BaseUIElement): void {
    this.x = screen.width - this.width;
    // position relative to the background
    this.y = (screen.height * 50) / 100;

    this.animation = createLinealAnimationWithDefaults(this, screen, {
      direction: {
        x: DIRECTION_LEFT,
        y: DIRECTION_DOWN,
      },
      speed: 5,
      canDisappear: false,
    });
  }
}

export const createBulletSprite = () => {
  return new BulletAsset("bullet");
};
