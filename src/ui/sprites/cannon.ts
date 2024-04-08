import { BaseSprite } from "./base-sprite";
import { BaseUIElement } from "../../app/types";

class Cannon extends BaseSprite {
  label = "cannon";
  init(screen: BaseUIElement): void {
    this.x = screen.width - this.width;
    // position relative to the background
    this.y = (screen.height * 50) / 100;
  }
}

export const createCannonSprite = () => {
  return new Cannon("cannon");
};
