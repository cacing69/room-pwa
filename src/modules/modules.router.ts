import { resiManualRouter } from "./resi.manual/resi.manual.router";
import { captionRouter } from "./caption/caption.router";
import { settingRouter } from "./setting/setting.router";
import { orderRouter } from "./order/order.router";
import { instagramRouter } from "./instagram/instagram.router";
import { excelEngineRouter } from "./excel.engine/excel.engine.router";
import { checkPercentagesRouter } from "./check.percentages/check.percentages.router";

export const modulesRouter = [
  ...captionRouter,
  ...settingRouter,
  ...orderRouter,
  ...instagramRouter,
  ...excelEngineRouter,
  ...resiManualRouter,
  ...checkPercentagesRouter,
];
