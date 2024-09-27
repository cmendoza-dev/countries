import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { createRouter, createWebHistory } from 'vue-router';
import App from "./App.vue";
import apolloClient from "./apollo";
import "./index.css";

import Home from './views/Home.vue';
import Vista1 from "./views/Vista1.vue";
import Vista2 from "./views/Vista2.vue";

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/vista1', name: 'Vista1', component: Vista1 },
  { path: '/vista2', name: 'Vista2', component: Vista2 },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});
// createApp(App).use(router).mount('#app');
app.use(router).mount("#app");
