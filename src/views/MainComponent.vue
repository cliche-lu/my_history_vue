<template>

<div>
  <div style="width: 100%; height: 100%;">
    <el-row>
  <el-col :span="24">
    <div class="grid-content bg-purple-dark">
      <el-header>your history </el-header>
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
        <span style="margin-left: 10%">{{ scope.row.imag }}</span>
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
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page=formInline.pageNo
      :page-sizes= pageForm.pageSizes
      :page-size=formInline.pageSize
      layout="total, sizes, prev, pager, next, jumper"
      :total= pageForm.total>
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

Powered by  <a href="https://github.com/cliche-lu/new-test.git">cliche-lu</a>

</div>
</el-footer>
    </el-main>
  </el-container>


  <el-dialog title="表单内容" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="form.remark" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="图片" :label-width="formLabelWidth">
      <el-input v-model="form.imag" autocomplete="off"></el-input>
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

  import { getList } from '../api/home';
  import { deleteBusinessList } from '../api/home';
  import { editBusiness } from '../api/home';
  import { getUserList } from '../api/home';




export default {
  data() {
    return {
      tableData: [],
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
shareList: 'Share to' ,// 分享范围
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
    }
  },
  name: 'MainComponent',
  components: {
      // HelloWorld,
      // elTable,
    },
    created () {
      getList().then(res => {
        console.log(res);
        this.tableData = res.data.records;
        this.pageForm.total = res.data.total;
      });
      getUserList().then(res => {
        res.data.forEach(item => {
          this.userList.push(item);
        });
      
        console.log("this.userList",this.userList);
      })
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = true
        console.log(index, row);
        this.form = row;
        this.form.shareList = this.form.share.split(',');
        // console.log(this.form);
      
      },
      handleDelete(index, row) {
        console.log(index, row);
        deleteBusinessList(row.id).then(res => {
          console.log(res);
          this.queryList ();
          // this.tableData = res.data;
        });
      },
      queryList() {
        console.log('submit!');
        getList(this.formInline).then(res => {
        console.log(res);
        this.tableData = res.data.records;
        this.pageForm.total = res.data.total;
      });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.formInline.pageSize = val;
        this.queryList ();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.formInline.pageNo = val;
        this.queryList ();
      },
      edit() {
        console.log('edit!', this.form);
        console.log('edit! data', this.form);
        console.log(this.form);
        this.form.share = this.form.shareList.join(',');
        this.dialogFormVisible = false;
        editBusiness(this.form).then(res => {
          console.log(res);
          this.queryList ();
          // this.tableData = res.data;
        });
      },
      addHistory(){
        this.$router.push({name: 'AddHistory'});
      }
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