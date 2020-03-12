import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css';
import '@/styles/index.scss';


import './permission';
import store from './store';
import router from './router';

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
