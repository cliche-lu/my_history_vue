<template>
  <div id="addHistory">

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="描述">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.dataType" placeholder="请选择类型" @change="change">
        <el-option
        v-for="item in options"
          :key="item.value"
         :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
            class="upload-demo"
            action="http://localhost:9999/file/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            :on-error="handleError"
            multiple
            :limit="9"
            :on-exceed="handleExceed"
            :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          <el-input v-model="form.imag" disabled></el-input>
        </el-upload>

      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item label="同行人"  v-show="!useAble">
        <el-input v-model="form.users" placeholder="请输同行人"></el-input>
      </el-form-item>

      <el-form-item label="对手" v-show="useAble" >
        <el-select v-model="form.users" placeholder="请选择对手类型">
              <el-option
                  v-for="item in userList"
                  :key="item.id"
                  :label="item.realName"
                  :value="item.username">
              </el-option>
            </el-select>
      </el-form-item>
      <el-form-item label="其他">
        <el-input v-model="form.others" placeholder="请输入其他"></el-input>
      </el-form-item>
      <el-form-item label="谁可以看到" :label-width="formLabelWidth">
        <el-select v-model="form.shareList" multiple placeholder="请选择谁可以看到">
          <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.realName"
              :value="item.username">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <!-- <el-input v-model="form.joinDateStart" placeholder="请输入别名"></el-input> -->
        <!-- <span class="demonstration">默认</span> -->
    <el-date-picker
      v-model="form.joinDateStart"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>

      </el-form-item>
      <el-form-item label="结束时间">
        <!-- <el-input v-model="form.joinDateEnd" placeholder="请输入别名"></el-input> -->
        <el-date-picker
      v-model="form.joinDateEnd"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addBusinessListClick">新增</el-button>
        <!-- <el-button type="primary" @click="test">测试</el-button> -->
        <el-button @click="returnMain">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
// import axios from 'axios'
// import elInput from 'element-ui/lib/input'
// import MainComponent from './views/MainComponent.vue' fileUpload
import {addBusinessList} from '../api/home';
// import { fileUpload } from '../api/home';
import {getUserList} from '../api/home';
import {upLoadURL} from '../utils/api/request';

export default {
  data() {
    return {
      form: {
        id: '', // id
        remark: '', // 描述
        imag: '', // 图片
        address: '', // 地址
        users: '', // 同行人
        others: '', // 其他
        shareList: '',// 分享范围
        share: 'all', // 分享范围
        joinDateStart: '',
        joinDateEnd: '',
      },
      formLabelWidth: '120px',
      userList:
          [
            {
              id: '0',
              realName: '全部',
              address: '',
              remark: '',
              username: 'all',
            }
          ],
      // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      fileList: [],
      upLoadURL: upLoadURL,
      options: [{
          value: '1',
          label: '棋谱'
        }, {
          value: '2',
          label: '其他'
        }
      ],
      useAble: false,
    }
  },
  name: 'addHistory',
  components: {
    // HelloWorld,
    // elInput,
  },
  created() {
    getUserList().then(res => {
      res.data.forEach(item => {
        this.userList.push(item);
      });

      console.log("this.userList", this.userList);
    })
  },
  methods: {
    test() {
      console.log("this.form", this.form);
      console.log("this.fileList", this.fileList);
    },

    returnMain() {
      this.$router.push({name: 'MainComponent'});
    },

    async addBusinessListClick() {
      if (!this.checkData()) {
        return;
      }
      try {
        const s = [];
        this.fileList.forEach(item => {
          console.log(item);
          s.push(item.url);
        });
        this.form.imag = s.join(',');
        this.form.share = this.form.shareList.join(',');
        console.log("this.form", this.form);
        const response = await addBusinessList(this.form);
        console.log(response); // 打印响应数据
        if (response.isSuccess) {
          // 登录成功，跳转到主页或其他页面
          // this.$router.push('/MainComponent');
          console.log(this.$router);
          this.$message({
            showClose: true,
            message: '新增成功！',
            type: 'success'
          });
          this.$router.push({name: 'MainComponent'});
        } else {
          // 登录失败，显示错误信息
          this.$message({
            showClose: true,
            message: '新增失败！',
            type: 'error'
          });
        }
      } catch (error) {

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
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
      this.fileList.push(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      console.log(file, fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSuccess(response, file, fileList) {
      // console.log(response);
      if (response.isSuccess) {
        let obj = {name: file.name, url: response.data};
        fileList.push(obj);
        this.fileList.push(obj);
      }else {
        this.$message({
        showClose: true,
        message: '上传失败' + response.msg,
        type: 'error'
      });
      }
    },
    change(value) {
      console.log(value); // 打印当前选中的值
      this.useAble = value === '1';
      if(value === '1') {
        this.userList = this.userList.filter(item => item.username !== 'all');
        this.form.users = '';
      } else {
        this.userList.push({id: '0',username: 'all', nickname: '全部'});
      }
    },

    /*
      上传失败的钩子未被触发
    */
    handleError(err, file, fileList) {
      console.log(err, file, fileList,6666666666);
      // this.$message({
      //   showClose: true,
      //   message: '上传失败' + err,
      //   type: 'error'
      // });
    },

  }
}
</script>

<style>
#addHistory {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
  