<template>
  <div id="login">
    <el-col
        :span="8"
        :offset="8"
    >
      <div style="margin-top: 50%;">
        <el-row :span="24">
          <el-input v-model="username" placeholder="请输入用户名"></el-input>
          <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
          <button @click="login">登录</button>

          <router-link :to="{name:'UserAdd'}">注册</router-link>
        </el-row>
      </div>


    </el-col>


  </div>
</template>

<script>
// import axios from 'axios'
// import elInput from 'element-ui/lib/input'
// import MainComponent from './views/MainComponent.vue'
import {login} from '../api/home';

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  name: 'MyLogin',
  components: {
    // HelloWorld,
    // elInput,
  },
  methods: {


    async login() {
      try {
        const params = {"username": this.username, "password": this.password}; // 示例参数
        const response = await login(params);
        console.log(response); // 打印响应数据
        if (response.isSuccess) {
          // 登录成功，跳转到主页或其他页面
          // this.$router.push('/MainComponent');
          console.log(this.$router);
          this.$message({
            showClose: true,
            message: '登录成功！',
            type: 'success'
          });
          const now = new Date().getTime();
          const tokenExpiry = now + 2*60*60 * 1000; // 计算token过期时间
          window.localStorage.setItem("token", response.data);
          window.localStorage.setItem("tokenExpiry", tokenExpiry);

          this.$router.push({path: '/MainComponent'});
          // this.$router.replace({ path: '/' });
          // window.open('/MainComponent');
        } else {
          // 登录失败，显示错误信息
          this.$message({
            showClose: true,
            message: '用户名或密码错误'+response.msg,
            type: 'error'
          });
        }
      } catch (error) {
        window.localStorage.removeItem("token");
        console.error("Error fetching list:", error);
      }
    },
  }
}
</script>

<style>
#login {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
  