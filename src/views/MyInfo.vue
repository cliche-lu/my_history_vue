<template>
  <div id="userAdd">
    <div>
      <el-row>
      <el-col :span="20" :offset="1">
        <el-form ref="form" :model="form" label-width="100%">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" disabled></el-input>
          </el-form-item>
          <button v-show="isUserPass" @click="changeIsUserPass">修改密码</button>
          <el-form-item label="密码"  v-show="!isUserPass">
            <el-input type="password" v-model="form.password" placeholder="请输入密码" :disabled=isUserPass></el-input> 
          </el-form-item>
          <el-form-item label="再输入一次密码" v-show="!isUserPass" :label-width="formLabelWidth">
            <el-input type="password" v-model="form.repassword" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="电话号" :label-width="formLabelWidth">
            <el-input v-model="form.phone" placeholder="请输入电话号"></el-input>
          </el-form-item>
          <el-form-item label="别名"  :label-width="formLabelWidth" >
            <el-input v-model="form.realName" placeholder="请输入别名"></el-input>
          </el-form-item>
          <el-form-item label="等级" :label-width="formLabelWidth" disabled>
            <el-select v-model="form.levels" placeholder="请选择等级">
              <el-option
                  v-for="item in levelsList"
                  :key="item.code"
                  :label="item.msg"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item :label-width="formLabelWidth">
            <el-button type="primary" @click="changeInfo">修改</el-button>
            <el-button @click="test">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    
    </el-row>
    </div>
    
  </div>
</template>

<script>

import {getNowLoginUser} from '../api/home';
import {getLevelsList} from '../api/home';
import {updateUser} from '../api/home';

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        repassword: '',
        phone: '',
        realName: '',
        levels: ''
      },
      isUserPass: true,
      levelsList :[],
      formLabelWidth: '120px',
    }
  },
  name: 'MyLogin',
  components: {
    // HelloWorld,
    // elInput,
  },

  created() {
    getNowLoginUser().then(res => {
      this.form = res.data;
    });
    getLevelsList().then(res => {
      res.data.forEach(item => {
        this.levelsList.push(item);
      });
    })
  // 设置默认值为 levelsList 中的第一个选项
      if (this.levelsList.length > 0 && this.form.levels === '') {
      this.form.levels = this.levelsList[0].code;
    }
  },
  methods: {
    test() {
      this.$router.push({name: 'MainComponent'});
    },
    changeIsUserPass(){
      this.isUserPass = !this.isUserPass;
      this.form.password = '';
    },

    async changeInfo() {
      if (!this.checkData()) {
        return;
      }
      try {
        const response = await updateUser(this.form);
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
            message: '注册失败！'+response.msg,
            type: 'error'
          });
        }
      } catch (error) {
        window.localStorage.removeItem("token");
        console.error("Error fetching list:", error);
      }
    },
    checkData() {
      if (this.form.username === '') {
        this.$message({
          showClose: true,
          message: '用户名不能为空',
          type: 'error'
        });
        return false;
      }
      if (this.form.password === '') {
        this.$message({
          showClose: true,
          message: '密码不能为空',
          type: 'error'
        });
        return false;
      }
      if (!this.isUserPass && this.form.repassword === '') {
        this.$message({
          showClose: true,
          message: '请再次输入密码',
          type: 'error'
        });
        return false;
      }
      if (!this.isUserPass &&  this.form.password !== this.form.repassword) {
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
  