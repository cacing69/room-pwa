import { createApp } from 'vue'
import { router } from './router';

import app from './app.vue'
import "./style.css";

// vant components
import { Button, CellGroup, Col, Field, Form, Row, Space } from "vant";

import { VueQueryPlugin } from "vue-query";

const vApp = createApp(app);

vApp.use(Button);
vApp.use(CellGroup);
vApp.use(Col);
vApp.use(Field);
vApp.use(Form);
vApp.use(Row);
vApp.use(Space);

vApp.use(router);

vApp.use(VueQueryPlugin);

vApp.mount('#app')
