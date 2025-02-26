// src/router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '@/components/HelloWorld.vue'; // 确保这个路径是正确的
// import MainComponent from '@/views/MainComponent.vue'; // 确保这个路径是正确的
 
Vue.use(VueRouter);
 export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ()=> import('@/App.vue') // 确保这个路径是正确的
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: ()=> import('@/components/HelloWorld.vue') // 确保这个路径是正确的
    },
    {
      path: '/MyLogin',
      name: 'MyLogin',
      component: ()=> import('@/views/MyLogin.vue') // 确保这个路径是正确的
    },
    {
      path: '/MainComponent',
      name: 'MainComponent',
      component: ()=> import('@/views/MainComponent.vue') // 确保这个路径是正确的
    },
    {
      path: '/UserAdd',
      name: 'UserAdd',
      component: ()=> import('@/views/UserAdd.vue') // 确保这个路径是正确的
    }
    ,
    {
      path: '/AddHistory',
      name: 'AddHistory',
      component: ()=> import('@/views/AddHistory.vue') // 确保这个路径是正确的
    }
    ,
    {
      path: '/UploadTest',
      name: 'UploadTest',
      component: ()=> import('@/views/UploadTest.vue') // 确保这个路径是正确的
    }
  ]
 }
);



