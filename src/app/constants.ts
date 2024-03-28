import background from "/assets/background.png";
import cannon from "/assets/cannon.png";
import cat1 from "/assets/cat-1.png";
import cat2 from "/assets/cat-2.png";
import cat3 from "/assets/cat-3.png";
import cat4 from "/assets/cat-4.png";
import cloud1 from "/assets/cloud-1.png";
import cloud2 from "/assets/cloud-2.png";
import cloud3 from "/assets/cloud-3.png";
import cloud4 from "/assets/cloud-4.png";
import questionMark from "/assets/question-mark.png";

export const CLOUD_ASSETS = [
  {
    alias: "cloud1",
    src: cloud1,
  },
  {
    alias: "cloud2",
    src: cloud2,
  },
  {
    alias: "cloud3",
    src: cloud3,
  },
  {
    alias: "cloud4",
    src: cloud4,
  },
];

export const CAT_ASSETS_CONFIG = [
  {
    alias: "cat1",
    startFrom: "left",
  },
  {
    alias: "cat2",
    startFrom: "left",
  },
  {
    alias: "cat3",
    startFrom: "right",
  },
  {
    alias: "cat4",
    startFrom: "right",
  },
];

export const CAT_ASSETS = [
  {
    alias: "cat1",
    src: cat1,
  },
  {
    alias: "cat2",
    src: cat2,
  },
  {
    alias: "cat3",
    src: cat3,
  },
  {
    alias: "cat4",
    src: cat4,
  },
];

export const ASSETS_CONFIG = [
  {
    alias: "background",
    src: background,
  },
  {
    alias: "cannon",
    src: cannon,
  },
  {
    alias: "bullet",
    src: questionMark,
  },
  ...CAT_ASSETS,
  ...CLOUD_ASSETS,
];

export const DEFAULT_BACKGROUND = "#82D6FD";
