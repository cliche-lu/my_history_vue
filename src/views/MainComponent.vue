<template>

  <div>
    <div style="width: 100%; height: 100%;">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-header>your history</el-header>
          </div>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="同行人">
                <el-input v-model="formInline.users" placeholder="同行人"></el-input>
              </el-form-item>
              <el-form-item label="其他">
                <el-input v-model="formInline.others" placeholder="其他"></el-input>
              </el-form-item>
              <el-form-item label="地点">
                <el-input v-model="formInline.address" placeholder="地点"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="formInline.remark" placeholder="描述"></el-input>
              </el-form-item>
              <!-- <el-form-item label="活动区域">
                <el-select v-model="formInline.region" placeholder="活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item>
                <el-button type="primary" @click="queryList">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addHistory">新建</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>

      </el-row>
      <el-row>
        <!-- <el-col :span="1"><div class="grid-content bg-purple-light"></div></el-col> -->
        <el-col
            :span="24"
            :offset="3"
        >
          <div class="grid-content bg-purple-light">
            <el-table
                :data="tableData"
                style="width: 80%">

              <!-- <el-table-column
                label="创建人"
                width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.createBy }}</span>
                </template>
              </el-table-column> -->
              <el-table-column
                  label="id"
                  width="100">
                <template slot-scope="scope">
                  <i class="el-icon-ship"></i>
                  <span style="margin-left: 10%">{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="开始时间"
                  width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10%">{{ scope.row.joinDateStart }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="结束时间"
                  width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10%">{{ scope.row.joinDateEnd }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="同行者"
                  width="100">
                <template slot-scope="scope">
                  <i class="el-icon-user"></i>
                  <span style="margin-left: 10%">{{ scope.row.users }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="图片"
                  width="100">
                <template slot-scope="scope">
                  <i class="el-icon-picture-outline"></i>
                  <!-- <span style="margin-left: 10%">{{ scope.row.imag }}</span> -->
                  <el-image
                      style="width: 100px; height: 100px"
                      :src="scope.row.imag"
                      :preview-src-list="scope.row.srcList">
                  </el-image>

                </template>
              </el-table-column>
              <el-table-column
                  label="地址"
                  width="180">
                <template slot-scope="scope">
                  <i class="el-icon-map-location"></i>
                  <span style="margin-left: 10%">{{ scope.row.address }}</span>
                </template>
              </el-table-column>

              <el-table-column
                  label="其他"
                  width="200">
                <template slot-scope="scope">
                  <i class="el-icon-edit"></i>
                  <span style="margin-left: 10%">{{ scope.row.others }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="分享范围"
                  width="180">
                <template slot-scope="scope">
                  <i class="el-icon-share"></i>
                  <span style="margin-left: 10%">{{ scope.row.share }}</span>
                </template>
              </el-table-column>

              <el-table-column
                  label="创建时间"
                  width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10%">{{ scope.row.createTime }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="修改人"
                  width="100">
                <template slot-scope="scope">
                  <i class="el-icon-user"></i>
                  <span style="margin-left: 10%">{{ scope.row.updateBy }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="备注"
                  width="200">
                <template slot-scope="scope">
                  <i class="el-icon-postcard"></i>
                  <span style="margin-left: 10%">{{ scope.row.remark }}</span>
                </template>
              </el-table-column>

              <!--
                  {
                      "id": 13,
                      "createBy": "test",
                      "createTime": "2025-02-18T07:10:42.000+00:00",
                      "updateBy": "12",
                      "updateTime": "2025-02-18T07:10:47.000+00:00",
                      "delFlag": null,
                      "reversion": 1,
                      "tenantId": "1",
                      "remark": "1213",
                      "imag": "12",
                      "address": "12",
                      "users": "12",
                      "others": "12",
                      "share": "all"
                  }


              -->
              <!-- <el-table-column
                label="创建人"
                width="180">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>姓名: {{ scope.row.name }}</p>
                    <p>住址: {{ scope.row.address }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.name }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column> -->
              <el-table-column
                  label="操作"
                  width="180"
                  fixed="right"
              >
                <template slot-scope="scope">
                  <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑
                  </el-button>
                  <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page=formInline.pageNo
                :page-sizes=pageForm.pageSizes
                :page-size=formInline.pageSize
                layout="total, sizes, prev, pager, next, jumper"
                :total=pageForm.total>
            </el-pagination>
          </div>
        </el-col>
        <!-- <el-col :span="1"><div class="grid-content bg-purple"></div></el-col> -->
      </el-row>
    </div>


    <el-container>
      <div>
        <!-- <el-popover
        placement="top"
        width="160"
        v-model="visible">
      <p>这是一段内容这是一段内容确定删除吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
      </div>
      <el-button slot="reference">删除</el-button>
    </el-popover> -->
      </div>

      <el-main>

        <el-footer>

          <div>

            Powered by <a href="https://github.com/cliche-lu/new-test.git">cliche-lu</a>

          </div>
        </el-footer>
      </el-main>
    </el-container>


    <el-dialog title="表单内容" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="图片" :label-width="formLabelWidth">
          <el-input v-model="form.imag" autocomplete="off">
          </el-input>

        </el-form-item> -->


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
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="同行人" :label-width="formLabelWidth">
          <el-input v-model="form.users" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="其他" :label-width="formLabelWidth">
          <el-input v-model="form.others" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="谁可以看到" :label-width="formLabelWidth">
          <el-select v-model="form.share" placeholder="请选择谁可以看到" >
          <el-option v-for="item in userList" :key="item.id" :label="item.realName" :value="item.username"></el-option>

        </el-select>

        </el-form-item> -->
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
        <el-form-item label="分享范围" :label-width="formLabelWidth">
          <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
  </div>


</template>

<script>

import {getList} from '../api/home';
import {deleteBusinessList} from '../api/home';
import {editBusiness} from '../api/home';
import {getUserList} from '../api/home';


export default {
  data() {
    return {
      tableData: [],
      url: 'http://localhost:9999/file/view/67bfc026613ee97ca7511275',

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
      formInline: {
        id: '',
        pageSize: 10,
        pageNo: 1,
        users: '',
        others: '',
        address: '',
        remark: '',
        // joinDateStart: '',
        // joinDateEnd: '',
        visible: false,
        // region: ''

      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        id: '', // id
        remark: 'Some remark', // 描述
        imag: 'image.jpg', // 图片
        address: 'Some address', // 地址
        users: 'User1,', // 同行人
        others: 'Some other', // 其他
        shareList: 'Share to',// 分享范围
        share: 'all', // 分享范围
        joinDateStart: '',
        joinDateEnd: '',
      },
      formLabelWidth: '120px',

      pageForm: {
        pageSizes: [10, 20, 50, 100],
        total: 0,
      },
      value1: '',
      fileList: [],
      // upLoadURL: upLoadURL,
    }
  },
  name: 'MainComponent',
  components: {
    // HelloWorld,
    // elTable,
  },
  created() {
    this.queryList();
    getUserList().then(res => {
      res.data.forEach(item => {
        this.userList.push(item);
      });

    })
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = true
      this.form = row;
      this.form.shareList = this.form.share.split(',');
      if (row.imag != null && row.imag != '') {
        for (let i = 0; i < row.imag.split(',').length; i++) {
          console.log(i, 999999999999999, row.imag.split(',').length);
          this.fileList.push({name: i, url: row.imag.split(',')[i]});
        }
      }
      // console.log(this.form);

    },
    handleDelete(index, row) {
      // console.log(index, row);
      deleteBusinessList(row.id).then(res => {
        // console.log(res);
        if (res.isSuccess) {
          this.queryList();
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          });
        }
        this.queryList();
        // this.tableData = res.data;
      });
    },
    queryList() {
      // console.log('submit!');
      getList(this.formInline).then(res => {
        // console.log("ffffffffffffffffffffffffff");
        this.tableData = res.data.records;
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].imag != null) {
            this.tableData[i].srcList = this.tableData[i].imag.split(',');
            this.tableData[i].imag = this.tableData[i].srcList[0];
          }

        }
        // console.log("this.tableData",this.tableData);
        this.pageForm.total = res.data.total;
      });
    },
    handleSizeChange(val) {
      this.formInline.pageSize = val;
      this.queryList();
    },
    handleCurrentChange(val) {
      this.formInline.pageNo = val;
      this.queryList();
    },
    edit() {
      this.form.share = this.form.shareList.join(',');
      let s = [];
      this.fileList.forEach(item => {
        // console.log(item);
        s.push(item.url);
      });
      this.form.imag = s.join(',');
      this.dialogFormVisible = false;
      editBusiness(this.form).then(res => {
        if (res.isSuccess) {
          this.queryList();
          this.fileList = [];
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          });
        }
      });
    },
    addHistory() {
      this.$router.push({name: 'AddHistory'});
    },
    handleRemove(file, fileList) {
      console.log(file, fileList, "remove 1111");
      this.fileList = fileList;
      let s = [];
      console.log(s, "remove 33333");
      for (let i = 0; i < fileList.length; i++) {
        s.push(fileList[i].url);
      }
      this.form.imag = s.join(',');
      console.log(this.form.imag, "remove 22222");
    },
    handlePreview(file) {
      console.log(file);
      // this.fileList.push(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      console.log(file, fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSuccess(response, file, fileList) {
      let obj = {name: file.name, url: response.data};
      fileList.push(obj);
      this.fileList.push(obj);
    },
    /*
      上传失败的钩子未被触发
    */
    handleError(err, file, fileList) {
      console.log(err, file, fileList);
      this.$message({
        showClose: true,
        message: '上传失败' + err,
        type: 'error'
      });
    },


  }
}
</script>

<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>