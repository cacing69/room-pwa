import { createApp } from "vue";
import { router } from "./router";

import app from "./app.vue";
import vuex from "./stores/vuex";
import "./style.css";
import "vant/lib/index.css";
import "vant/es/notify/style";
import "vant/es/toast/style";
import "vant/es/dialog/style";
import "vant/es/image-preview/style";

// vant components
import {
  ActionBar,
  ActionBarButton,
  ActionBarIcon,
  ActionSheet,
  Button,
  CellGroup,
  Col,
  Collapse,
  CollapseItem,
  DropdownMenu,
  DropdownItem,
  Field,
  Form,
  Grid,
  GridItem,
  Icon,
  Image as VanImage,
  ImagePreview,
  Lazyload,
  Picker,
  Popup,
  PullRefresh,
  Row,
  Search,
  Space,
  Sticky,
  SubmitBar,
  Swipe,
  SwipeItem,
  Tag,
  Toast,
} from "vant";

import { VueQueryPlugin } from "@tanstack/vue-query";
import { Locale } from "vant";
import enUS from "vant/es/locale/lang/en-US";

// import { registerSW } from "virtual:pwa-register";

// const updateSW = registerSW({
//   onNeedRefresh() {},
//   onOfflineReady() {},
// });

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faFileExcel,
  faPrint,
  faPuzzlePiece,
} from "@fortawesome/free-solid-svg-icons";

library.add(faInstagram, faPuzzlePiece, faFileExcel, faPrint);

Locale.use("en-US", enUS);

const vApp = createApp(app);

vApp.use(ActionBar);
vApp.use(ActionBarButton);
vApp.use(ActionBarIcon);
vApp.use(ActionSheet);
vApp.use(Button);
vApp.use(CellGroup);
vApp.use(Col);
vApp.use(Collapse);
vApp.use(CollapseItem);
vApp.use(DropdownItem);
vApp.use(DropdownMenu);
vApp.use(Field);
vApp.use(Form);
vApp.use(Grid);
vApp.use(GridItem);
vApp.use(Icon);
vApp.use(ImagePreview);
vApp.use(Lazyload);
vApp.use(Picker);
vApp.use(Popup);
vApp.use(PullRefresh);
vApp.use(Row);
vApp.use(Search);
vApp.use(Space);
vApp.use(Sticky);
vApp.use(SubmitBar);
vApp.use(Swipe);
vApp.use(SwipeItem);
vApp.use(Tag);
vApp.use(Toast);
vApp.use(VanImage);

vApp.use(router);

vApp.use(VueQueryPlugin);
vApp.use(vuex);

vApp.component("font-awesome-icon", FontAwesomeIcon);

vApp.mount("#app");
