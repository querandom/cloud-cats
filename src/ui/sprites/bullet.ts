import { Rectangle } from "pixi.js";
import { BaseSprite } from "./base-sprite";

class Bullet extends BaseSprite {
  init(screen: Rectangle): void {
    this.x = screen.width - this.width;
    // position relative to the background
    this.y = (screen.height * 50) / 100;
  }
}

export const createBulletSprite = () => {
  return new Bullet("bullet");
};
