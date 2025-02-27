import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 引入样式
// import VueViewer from 'v-viewer';
// import 'viewerjs/dist/viewer.css';
// import VueRouter from 'vue-router'
Vue.config.productionTip = false

Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

// App.use(VueViewer, {
//   url: 'data-src', // 指定 data-* 属性，用于存储原始图片 URL
//   options: {
//     // 这里可以配置 viewerjs 的选项
//     inline: true, // 以 inline 的方式显示图片
//     button: true, // 显示缩放按钮
//     // ...其他选项
//   },
// });