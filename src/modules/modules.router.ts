import { resiManualRouter } from "./resi.manual/resi.manual.router";
import { captionRouter } from "./caption/caption.router";
import { settingRouter } from "./setting/setting.router";
import { orderRouter } from "./order/order.router";
import { instagramRouter } from "./instagram/instagram.router";
import { excelEngineRouter } from "./excel.engine/excel.engine.router";
import { checkPriceRouter } from "./check.price/check.price.router";
import { priceTagRouter } from "./price.tag/price.tag.router";
import { salesRecordRouter } from "./sales.record/sales.record.router";
import { resiBatchRouter } from './resi.batch/resi.batch.router';

export const modulesRouter = [
  ...captionRouter,
  ...settingRouter,
  ...orderRouter,
  ...instagramRouter,
  ...excelEngineRouter,
  ...resiManualRouter,
  ...checkPriceRouter,
  ...priceTagRouter,
  ...salesRecordRouter,
  ...resiBatchRouter
];
