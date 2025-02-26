<template>
    <div id="uploadTest" >

      <el-upload
      class="upload-demo"
      action="http://localhost:9999/file/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="9"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :on-success="handleSuccess">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      <el-input v-model="form.imag" disabled></el-input>
    </el-upload>

    </div>
  </template>
  
  <script>
  // import axios from 'axios'
  // import elInput from 'element-ui/lib/input'
  // import MainComponent from './views/MainComponent.vue' fileUpload
  // import { addBusinessList } from '../api/home';
  // import { fileUpload } from '../api/home';
  import { getUserList } from '../api/home';
  
  export default {
    data() {
      return {
        form: {
          id: '', // id
remark: 'Some remark', // 描述
imag: 'image.jpg', // 图片
address: 'Some address', // 地址
users: 'User1,', // 同行人
others: 'Some other', // 其他
shareList: 'Share to' ,// 分享范围
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
          fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
          // fileList: [],
      }
    },
    name: 'addHistory',
    components: {
      // HelloWorld,
      // elInput,
    },
    created () {
      getUserList().then(res => {
        res.data.forEach(item => {
          this.userList.push(item);
        });
      
        console.log("this.userList",this.userList);
      })
  },
    methods: {
      test() {
        console.log("this.form",this.form);
        console.log("this.fileList",this.fileList);
      },
    
      returnMain(){ 
        this.$router.push({name:'MainComponent'});
      },


      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        console.log(file, fileList);
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleSuccess(response, file, fileList) {
      console.log(response,file,fileList); // 后端返回的数据
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
  