import "./app.css";
import { Application, Assets } from "pixi.js";

import { ASSETS_CONFIG, DEFAULT_BACKGROUND } from "./constants";

export class App extends Application {
  async setup() {
    await this.init({ background: DEFAULT_BACKGROUND, resizeTo: window });

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(this.canvas);
  }

  async preload() {
    // Load the assets defined in assets.ts.
    await Assets.load(ASSETS_CONFIG);
  }

  // _render() {
  //   //
  //   // this.render.render()
  //   const app = this;
  //   const bg = Sprite.from("background");

  //   // Buttons
  //   // const stBtn = new ShootButton("Shoot");
  //   // const aboutBtn = new AboutButton("About");
  //   // const resetBtn = new ResetButton("Reset");

  //   // Sprites
  //   const cannon = Sprite.from("cannon");

  //   // Cats
  //   const cat1 = Sprite.from("cat1");
  //   const cat2 = Sprite.from("cat2");
  //   const cat3 = Sprite.from("cat3");
  //   const cat4 = Sprite.from("cat4");
  //   // clouds
  //   const cloud1 = Sprite.from("cloud1");
  //   const cloud2 = Sprite.from("cloud2");
  //   const cloud3 = Sprite.from("cloud3");
  //   const cloud4 = Sprite.from("cloud4");

  //   const catList = [cat1, cat2, cat3, cat4];

  //   const onClick = () => {
  //     const bullet = Sprite.from("bullet");
  //     bullet.x = cannon.x;
  //     bullet.y = cannon.y;

  //     app.stage.addChild(bullet);
  //   };
  //   // stBtn.on("pointerdown", onClick);

  //   createRenderUI(this)
  //     .initBackground(bg)
  //     .initCannon(cannon)
  //     // .initButtons(
  //     //   {
  //     //     stBtn,
  //     //     aboutBtn,
  //     //     resetBtn,
  //     //   },
  //     //   cannon
  //     // )
  //     .initCats([
  //       { image: cat1, direction: "left" },
  //       { image: cat2, direction: "left" },
  //       { image: cat3, direction: "right" },
  //       { image: cat4, direction: "right" },
  //     ])
  //     .initClouds(cloud1, cloud2, cloud3, cloud4);

  //   [
  //     bg,
  //     cannon,
  //     // clouds
  //     cloud1,
  //     cloud2,
  //     cloud3,
  //     cloud4,
  //     // Buttons
  //     // stBtn,
  //     // aboutBtn,
  //     // resetBtn,
  //     ...catList,
  //   ].forEach((entry) => this.stage.addChild(entry));
  // }
}
