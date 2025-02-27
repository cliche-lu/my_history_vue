<template>
  <div id="userAdd">

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="再输入一次密码">
        <el-input v-model="form.repassword" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item label="电话号">
        <el-input v-model="form.phone" placeholder="请输入电话号"></el-input>
      </el-form-item>
      <el-form-item label="别名">
        <el-input v-model="form.realName" placeholder="请输入别名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="signIn">注册</el-button>
        <el-button @click="test">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
// import axios from 'axios'
// import elInput from 'element-ui/lib/input'
// import MainComponent from './views/MainComponent.vue'
import {signIn} from '../api/home';

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        repassword: '',
        phone: '',
        realName: '',
      }
    }
  },
  name: 'MyLogin',
  components: {
    // HelloWorld,
    // elInput,
  },
  methods: {
    test() {
      this.$router.push({name: 'MyLogin'});
    },

    async signIn() {
      if (!this.checkData()) {
        return;
      }
      try {

        const response = await signIn(this.form);
        console.log(response); // 打印响应数据
        if (response.isSuccess) {
          // 登录成功，跳转到主页或其他页面
          // this.$router.push('/MainComponent');
          console.log(this.$router);
          this.$message({
            showClose: true,
            message: '注册成功，请登录！',
            type: 'success'
          });
          this.$router.push({name: 'MyLogin'});
        } else {
          // 登录失败，显示错误信息
          this.$message({
            showClose: true,
            message: '注册失败！',
            type: 'error'
          });
        }
      } catch (error) {
        window.localStorage.removeItem("token");
        console.error("Error fetching list:", error);
      }
    },
    checkData() {
      if (this.form.password !== this.form.repassword) {
        this.$message({
          showClose: true,
          message: '两次密码输入不一致',
          type: 'error'
        });
        return false;
      }
      return true;
    }
  }
}
</script>

<style>
#userAdd {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
  