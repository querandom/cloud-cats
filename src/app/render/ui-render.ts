import { ActionTextButton } from "../../ui/action-button/action-text-button";
import { ApplicationEngine } from "../types";
import { getBottomLeftCoords } from "../utils/position";
import { DEFAULT_BUTTONS_MARGIN } from "./constants";
import { App } from "../app";
import { createBackgroundSprite } from "../../ui/sprites/background";
import { createCannonSprite } from "../../ui/sprites/cannon";
import { CloudWrapper, createCloudSprite } from "../../ui/sprites/cloud";
import { CAT_ASSETS_CONFIG, CLOUD_ASSETS } from "../constants";
import { CatSprite, createCatSprite } from "../../ui/sprites/cat";
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

// Test For Hit
// A basic AABB check between two different squares
function testForAABB(object1: any, object2: any) {
  const bounds1 = object1.getBounds();
  const bounds2 = object2.getBounds();

  return (
    bounds1.x < bounds2.x + bounds2.width &&
    bounds1.x + bounds1.width > bounds2.x &&
    bounds1.y < bounds2.y + bounds2.height &&
    bounds1.y + bounds1.height > bounds2.y
  );
}

// Contains the logic to position all the elements in its corresponding place.
class UIRender {
  constructor(private app: ApplicationEngine) {}

  createComponents() {
    const screen = this.app.screen;
    const componentList = [
      createBackgroundSprite(),
      createCannonSprite(),
      ...createCloudFromAssets(),
      ...createCatsFromAssets(),
    ];

    componentList.forEach((cmp) => cmp.init(screen));

    return componentList;
  }

  render() {
    const state = this.app.stage;

    const components = this.createComponents();

    state.addChild(...components);

    const btns = this.createButtonGroup();
    state.addChild(...btns);

    const clouds = this.app.stage.getChildrenByLabel(
      "cloud-wrapper"
    ) as CloudWrapper[];
    const cats = this.app.stage.getChildrenByLabel("cat") as CatSprite[];
    const animatableElements = [...clouds, ...cats];

    this.app.ticker.add(() => {
      // Bullet collision check
      const bullets = this.app.stage.getChildrenByLabel(
        "bullet"
      ) as BulletAsset[];

      [...animatableElements, ...bullets].forEach((a) => a.animate());

      if (!bullets.length) return;

      bullets.map((bullet) => {
        clouds.forEach((cloud) => {
          const touched = testForAABB(cloud, bullet);

          if (touched) {
            bullet.animation?.stopAnimation();
            cloud.addChild(bullet);
            bullet.position = { x: 10, y: 10 };
          }
        });
      });
    });
  }

  /**
   * The param 'reference' is a design limitation,
   * it is bc I need a reference to place the buttons :(.
   */
  createButtonGroup(): ActionTextButton[] {
    const shootBtn = new ActionTextButton("Shoot");
    // const aboutBtn = new ActionTextButton("About");
    const resetBtn = new ActionTextButton("Reset");

    const resetCallback = () => {
      const bullets = this.app.stage.getChildrenByLabel("bullet", true);

      bullets.forEach((entry) => {
        entry.destroy();
        this.app.stage.removeChild(entry);
      });
    };
    resetBtn.on("pointerdown", resetCallback);

    const shootBulletCallback = () => {
      const bullet = createBulletSprite();
      bullet.init(this.app.screen);

      this.app.stage.addChild(bullet);
    };
    shootBtn.on("pointerdown", shootBulletCallback);

    // get cannon from screen
    const cannon = this.app.stage.getChildByLabel("cannon");

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

      // const aboutBtnCoords = getBottomLeftCoords(shootBtn);
      // aboutBtn.position = {
      //   x: aboutBtnCoords.x,
      //   y: aboutBtnCoords.y + DEFAULT_BUTTONS_MARGIN,
      // };
    }

    // return [aboutBtn, shootBtn, resetBtn];
    return [shootBtn, resetBtn];
  }
}

export const renderApp = (app: App) => {
  const uiRender = new UIRender(app);

  uiRender.render();
};
