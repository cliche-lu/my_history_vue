<template>
  <div id="userAdd">
    <el-row>
      <el-col :span="6" :offset="8">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="再输入一次密码">
            <el-input type="password" v-model="form.repassword" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="电话号">
            <el-input v-model="form.phone" placeholder="请输入电话号"></el-input>
          </el-form-item>
          <el-form-item label="别名"  v-show="!levelsAble">
            <el-input v-model="form.realName" placeholder="请输入别名"></el-input>
          </el-form-item>
          <el-form-item label="野狐名称" v-show="levelsAble">
            <el-input v-model="form.realName" placeholder="请输入野狐名称"></el-input>
          </el-form-item>
          <el-form-item label="等级" :label-width="formLabelWidth" v-show="levelsAble">
            <el-select v-model="form.levels" placeholder="请选择等级">
              <el-option
                  v-for="item in levelsList"
                  :key="item.code"
                  :label="item.msg"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="用户类型" :label-width="formLabelWidth">
            <el-select v-model="form.tenantId" placeholder="请选择租户类型" @change="change">
              <el-option
                  v-for="item in tenantList"
                  :key="item.id"
                  :label="item.tenantName"
                  :value="item.tenantId">
              </el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="signIn">注册</el-button>
            <el-button @click="test">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import axios from 'axios'
// import elInput from 'element-ui/lib/input'
// import MainComponent from './views/MainComponent.vue'
import {signIn} from '../api/home';
import {getLevelsList} from '../api/home';
import {getTenantType} from '../api/home';


export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        repassword: '',
        phone: '',
        realName: '',
        tenantId: '',
        levels: '7'
      },
      levelsAble: false,
      levelsList :[],
      tenantList :[],
      formLabelWidth: '120px',
    }
  },
  name: 'MyLogin',
  components: {
    // HelloWorld,
    // elInput,
  },

  created() {
    // this.queryList();
    getLevelsList().then(res => {
      res.data.forEach(item => {
        this.levelsList.push(item);
      });

    })
    getTenantType().then(res => {
      res.data.forEach(item => {
        this.tenantList.push(item);
      });

    })
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
      if (this.form.repassword === '') {
        this.$message({
          showClose: true,
          message: '请再次输入密码',
          type: 'error'
        });
        return false;
      }
      if (this.form.password !== this.form.repassword) {
        this.$message({
          showClose: true,
          message: '两次密码输入不一致',
          type: 'error'
        });
        return false;
      }
      if (this.form.tenantId === '') {
        this.$message({
          showClose: true,
          message: '租户不能为空',
          type: 'error'
        });
        return false;
      }
    
      return true;
    },

    change(value) {
      this.levelsAble = value === 3;
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
  