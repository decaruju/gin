import Vue from 'vue';

import App from './App';

Vue.config.productionTip = false;

Vue.prototype.log = (arg) => {
  console.log(arg); //eslint-disable-line no-console
  return arg;
};

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>',
}).$mount('#app');
