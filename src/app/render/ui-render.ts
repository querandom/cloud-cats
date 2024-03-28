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
    };

    this.init();
  }

  init() {
    const screen = this.app.screen;
    const componentList = Object.values(this.componentsMap).flat();
    componentList.forEach((cmp) => cmp.init(screen));
  }

  render() {
    const state = this.app.stage;
    const btns = this.createButtonGroup();

    const elements = [...Object.values(this.componentsMap), ...btns].flat();

    // get animated components
    const { cats, clouds } = this.componentsMap;
    this.setUpAnimations([...clouds, ...cats]);

    elements.forEach((cmp) => state.addChild(cmp));
  }

  private setUpAnimations(animatableElements: UIAnimatable[]) {
    this.app.ticker.add(() => {
      animatableElements.forEach((a) => a.animate());
    });
  }

  /**
   * The param 'reference' is a design limitation,
   * it is bc I need a reference to place the buttons :(.
   */
  createButtonGroup(): ActionTextButton[] {
    const shootBtn = new ActionTextButton("Shoot");
    const aboutBtn = new ActionTextButton("About");
    const resetBtn = new ActionTextButton("Reset");

    const cannon = this.componentsMap["cannon"];
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

    /**
     * new Btn('', onClick: () => {
     *
     * const bullet = new Bullet();
     * const position = this.cannon.getPosition()
     * bullet.setPosition(position)
     * bullet.initPosition(position)
     * app.stage.addChild(bullet);
     * app.ticker.add(() => bullet.animate() )
     * })
     *
     * const position = this.cannon.getPosition()
     * btn.setPosition(position)
     *
     */

    return [aboutBtn, shootBtn, resetBtn];
  }

  // initCats(cats: { image: Sprite; direction: Direction }[]) {
  //   // const cat = new AnimatedCat(src, direction)
  //   // cat.initPosition(this.app.screen)
  //   // cat.animate()
  //   const animatedCats = cats.map(({ image, direction }) => {
  //     return new SineAnimation(image, this.app.screen, {
  //       direction,
  //       speed: getRandomNumberInBetween(MAX_CAT_SPEED, MIN_CAT_SPEED),
  //       angleDelta: getRandomNumberInBetween(MAX_CAT_ANGLE, MIN_CAT_ANGLE),
  //       // remove this feature
  //       rangePosition: {
  //         min: getRandomNumberInBetween(85, 75),
  //         max: getRandomNumberInBetween(85, 75),
  //       },
  //     });
  //   });

  //   console.log(this.app.ticker);
  //   this.app.ticker.add(() => {
  //     // TODO: add delay feature
  //     // if (entry.hasTouchedCorner()) {
  //     //   change position to random place in a range
  //     //   switch to opposite direction
  //     // }
  //     // animate()
  //     animatedCats.forEach((entry) => entry.animate());
  //   });

  //   return this;
  // }
}

export const renderApp = (app: App) => {
  const uiRender = new UIRender(app);

  uiRender.render();
};
