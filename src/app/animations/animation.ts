import type { BaseUIElement } from "../types";
import { Coordinates } from "../utils/position";
import type { AnimationConfig } from "./types";

export abstract class UIAnimation<
  TConfig extends AnimationConfig = AnimationConfig
> {
  protected _stoppedAnimation: boolean = false;
  constructor(protected element: BaseUIElement, protected config: TConfig) {}

  public stopAnimation() {
    this._stoppedAnimation = true;
  }
  public resumeAnimation() {
    this._stoppedAnimation = false;
  }

  abstract getNextPosition(): Coordinates;
  public animate() {
    if (!this._stoppedAnimation) {
      this.element.position = this.getNextPosition();
    }
  }
}

export abstract class UIAnimatable {
  abstract animate(): void;
}
