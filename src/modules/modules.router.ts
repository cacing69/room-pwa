import { captionRouter } from "./caption/caption.router";
import { settingRouter } from "./setting/setting.router";
import { orderRouter } from "./order/order.router";
import { instagramRouter } from "./instagram/instagram.router";

export const modulesRouter = [
  ...captionRouter,
  ...settingRouter,
  ...orderRouter,
  ...instagramRouter,
];
