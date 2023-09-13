import "./axios";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/** Custom CSS */
import "./assets/css/main.css";

import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import rules from "@vee-validate/rules";
import "./custom-message";

/* Load Vee Validate rules */
Object.keys(rules).forEach((rule) => {
    defineRule(rule, rules[rule]);
});

const app = createApp(App);
const pinia = createPinia();

app.use(IonicVue);
app.use(router);
app.use(pinia);

app.component("Form", Form);
app.component("Field", Field);
app.component("ErrorMessage", ErrorMessage);

router.isReady().then(() => {
    app.mount("#app");
});
