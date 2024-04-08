import { Container, Sprite, Texture } from "pixi.js";
import { UIAnimation, UIAnimatable } from "../../app/animations/animation";
import { BaseUIElement } from "../../app/types";

export abstract class BaseSprite extends Sprite {
  constructor(public src: string, skipCache = false) {
    super(Texture.from(src, skipCache));
  }
  // method to set position and size
  abstract init(screen: BaseUIElement): void;
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
export abstract class AnimatableContainer
  extends Container
  implements UIAnimatable
{
  animation: UIAnimation | undefined;

  animate(): void {
    this.animation?.animate();
  }
}
