import { type TextStyle, Text } from "pixi.js";
import { DEFAULT_TEXT_STYLE } from "./constants";

export class ActionTextButton extends Text {
  constructor(text: string, options?: Partial<TextStyle>) {
    super({
      text,
      style: {
        ...DEFAULT_TEXT_STYLE,
        ...options,
      },
    });

    // defaults
    this.eventMode = "static";
    this.cursor = "pointer";

    // default event handlers
    // this.on("pointerdown", () => this.onClickHandler());
    this.on("pointerenter", () => this.onPointerEnter());
    this.on("pointerleave", () => this.onPointerLeave());
  }

  onPointerEnter() {
    this.scale.set(1.2);
  }
  onPointerLeave() {
    this.scale.set(1);
  }
}
