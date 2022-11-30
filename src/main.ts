import { createApp } from 'vue'
import { router } from './router';

import app from './app.vue'
import "./style.css";

// vant components
import { Button, CellGroup, Col, Field, Form, Picker, Popup, Row, Space } from "vant";

import { VueQueryPlugin } from "vue-query";
import { Locale } from "vant";
import enUS from "vant/es/locale/lang/en-US";

import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

Locale.use("en-US", enUS);

const vApp = createApp(app);

vApp.use(Button);
vApp.use(CellGroup);
vApp.use(Col);
vApp.use(Col);
vApp.use(Field);
vApp.use(Form);
vApp.use(Picker);
vApp.use(Popup);
vApp.use(Row);
vApp.use(Space);

vApp.use(router);

vApp.use(VueQueryPlugin);

vApp.mount('#app')
