import { BaseSprite } from "./base-sprite";
import { BaseUIElement } from "../../app/types";

class Background extends BaseSprite {
  // set size and position
  init(screen: BaseUIElement): void {
    if (screen.width > screen.height) {
      console.log("landscape screen");

      this.width = screen.width;
      this.scale.y = this.scale.x;
    } else {
      console.log("portrait screen");
    }

    // Position the background sprite at the right of the stage.
    this.x = screen.width - this.width;
    this.y = screen.height - this.height;
  }
}

export const createBackgroundSprite = () => {
  return new Background("background");
};
