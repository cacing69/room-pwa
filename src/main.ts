import { createApp } from 'vue'
import { router } from './router';

import App from './App.vue'
import "./style.css";

// vant components
import { Button, CellGroup, Col, Field, Form, Row, Space } from "vant";


const app = createApp(App);

app.use(Button);
app.use(CellGroup);
app.use(Col);
app.use(Field);
app.use(Form);
app.use(Row);
app.use(Space);

app.use(router);

app.mount('#app')
