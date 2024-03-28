import { ActionTextButton } from "../../ui/action-button/action-text-button";
import { ApplicationEngine } from "../types";
import { getBottomLeftCoords } from "../utils/position";
import { DEFAULT_BUTTONS_MARGIN } from "./constants";
import { App } from "../app";
import { createBackgroundSprite } from "../../ui/sprites/background";
import { createCannonSprite } from "../../ui/sprites/cannon";
import { createCloudSprite } from "../../ui/sprites/cloud";
import { CAT_ASSETS_CONFIG, CLOUD_ASSETS } from "../constants";
import { UIAnimatable } from "../animations/animation";
import { createCatSprite } from "../../ui/sprites/cat";
import { BulletAsset, createBulletSprite } from "../../ui/sprites/bullet";

export const createCloudFromAssets = () => {
  return CLOUD_ASSETS.map(({ alias }) => {
    return createCloudSprite(alias);
  });
};

export const createCatsFromAssets = () => {
  return CAT_ASSETS_CONFIG.map(({ alias, startFrom }) => {
    const catSprite = createCatSprite(alias);
    catSprite.startFrom = startFrom;
    return catSprite;
  });
};

// Contains the logic to position all the elements in its corresponding place.
class UIRender {
  private componentsMap;

  constructor(private app: ApplicationEngine) {
    this.componentsMap = {
      bg: createBackgroundSprite(),
      cannon: createCannonSprite(),
      clouds: createCloudFromAssets(),
      cats: createCatsFromAssets(),
      bullets: Array.from<BulletAsset>([]),
    };

    this.init();
  }

  init() {
    const screen = this.app.screen;
    const componentList = Object.values(this.componentsMap).flat();
    componentList.forEach((cmp) => cmp.init(screen));
  }

  private get animatableElements(): UIAnimatable[] {
    const { cats, clouds, bullets } = this.componentsMap;
    const animatableElement = [...cats, ...clouds, ...bullets];
    return animatableElement;
  }

  render() {
    const state = this.app.stage;
    const btns = this.createButtonGroup();

    const elements = [...Object.values(this.componentsMap), ...btns].flat();

    elements.forEach((cmp) => state.addChild(cmp));

    this.app.ticker.add(() => {
      this.animatableElements.forEach((a) => a.animate());
    });
  }

  renderBullet() {
    const bullet = createBulletSprite();
    bullet.init(this.app.screen);
    this.componentsMap.bullets.push(bullet);
    // this._bullets = [...this._bullets, bullet]
    this.app.stage.addChild(bullet);
  }

  /**
   * The param 'reference' is a design limitation,
   * it is bc I need a reference to place the buttons :(.
   */
  createButtonGroup(): ActionTextButton[] {
    const shootBtn = new ActionTextButton("Shoot");
    const aboutBtn = new ActionTextButton("About");
    const resetBtn = new ActionTextButton("Reset");

    resetBtn.on("pointerdown", () => {
      this.componentsMap.bullets.forEach((entry) => {
        entry.destroy();
        this.app.stage.removeChild(entry);
      });

      this.componentsMap.bullets = [];
    });
    shootBtn.on("pointerdown", () => {
      this.renderBullet();
      console.log("pointer shoot");
    });

    const cannon = this.componentsMap.cannon;
    if (cannon) {
      /**
       * position to render:
       * btn1 btn2
       * btn3
       */
      const resetCoords = getBottomLeftCoords(cannon);
      resetBtn.position = {
        x: resetCoords.x + DEFAULT_BUTTONS_MARGIN,
        y: resetCoords.y + DEFAULT_BUTTONS_MARGIN,
      };

      // left position from the reset button
      shootBtn.position = {
        x: resetBtn.x - shootBtn.width - DEFAULT_BUTTONS_MARGIN,
        y: resetBtn.y,
      };

      const aboutBtnCoords = getBottomLeftCoords(shootBtn);
      aboutBtn.position = {
        x: aboutBtnCoords.x,
        y: aboutBtnCoords.y + DEFAULT_BUTTONS_MARGIN,
      };
    }

    return [aboutBtn, shootBtn, resetBtn];
  }
}

export const renderApp = (app: App) => {
  const uiRender = new UIRender(app);

  uiRender.render();
};
