import "./main.css";

import { App } from "./app/app";
import { renderApp } from "./app/render/ui-render";

(async () => {
  // Create Application.
  const app = new App();

  await app.setup();
  await app.preload();

  renderApp(app);
})();
