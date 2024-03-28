import { Rectangle, Sprite, Texture } from "pixi.js";
import { UIAnimation, UIAnimatable } from "../../app/animations/animation";

export abstract class BaseSprite extends Sprite {
  constructor(public src: string, skipCache = false) {
    super(Texture.from(src, skipCache));
  }
  // method to set position and size
  abstract init(screen: Rectangle): void;
}

export abstract class AnimatableSprite
  extends BaseSprite
  implements UIAnimatable
{
  animation: UIAnimation | undefined;

  animate(): void {
    this.animation?.animate();
  }
}
