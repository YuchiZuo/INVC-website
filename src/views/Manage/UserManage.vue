<template xmlns:>

  <div>

    <el-card>

      <div style="display: flex;align-items: center">
        <el-input v-model="username" style="width: 200px" placeholder="查询学号"></el-input>
        <el-input  v-model="name" style="width: 200px;margin:0 5px" placeholder="查询姓名"></el-input>
        <el-input v-model="member" style="width: 200px;margin:0 5px" placeholder="成员类型"></el-input>
        <el-button style="margin:10px 0"  @click="load(1)">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </div>

      <div style="margin:10px 0;display: flex;align-items: center">
        <el-button  plain type="primary" @click="changeData({})">新增</el-button>
        <el-button  plain type="primary" @click="deleteBatch">批量删除</el-button>
        <el-button  plain type="primary" @click="exportBatch">批量导出</el-button>

        <el-upload
            class="avatar-uploader"
            accept=".xlsx"
            :show-file-list="false"
            :action="$baseUrl+'/user/import'"
            :headers="{token: user.token}"
            :on-success="handleImport"
        >
          <el-button style="margin:0 10px" type="primary" plain >批量导入</el-button>

        </el-upload>

      </div>

      <el-table :data="tableData" stripe :header-cell-style="{backgroundColor:'aliceblue'}"
                @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column label="姓名" align="center" prop="name"></el-table-column>
        <el-table-column label="学号" align="center" prop="username"></el-table-column>
        <el-table-column label="成员类型" align="center" prop="member"></el-table-column>
        <el-table-column label="年级" align="center" prop="grad"></el-table-column>
        <el-table-column label="学院" align="center" prop="college"></el-table-column>
        <el-table-column label="专业" align="center" prop="major"></el-table-column>
        <el-table-column label="角色" align="center" prop="role"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="头像" align="center">
          <template v-slot="scope">
            <el-image v-if="scope.row.avatar" style="width: 50px;height: 50px;border-radius: 50%"
                      :src="scope.row.avatar" :preview-src-list="[scope.row.avatar]"></el-image>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" >
          <template v-slot="scope" >
            <div style="display: flex">
              <el-button type="primary" plain size="mini" @click="changeData(scope.row)">编辑</el-button>
              <el-button type="danger" plain size="mini" @click="deleteData(scope.row.id)">删除</el-button>
            </div>

          </template>

        </el-table-column>

      </el-table>

      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[100,200,300,400]"
          :page-size="pageSize"
          background
          layout="prev, pager, next"
          :total="total">
      </el-pagination>

      <el-dialog title="修改信息" :visible.sync="changeDialogVis" width="60%">
        <el-form :model="changeForm"  :rules="rules" label-width="80px">

          <div style="display: flex;align-items: center">
            <el-form-item label="姓名"  prop="name" style="flex: 1">
              <el-input  v-model="changeForm.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="学号"  prop="username" style="flex: 1">
              <el-input v-model="changeForm.username"  autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="成员类型"  prop="member" style="flex: 1">
              <el-select v-model="changeForm.member" placeholder="请选择">
                <el-option
                    v-for="item in memberOptions"
                    :label="item.label"
                    :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="display: flex;align-items: center">
            <el-form-item label="年级"  prop="grad" style="flex: 1">
            <el-input v-model="changeForm.grad"  autocomplete="off"></el-input>
          </el-form-item>
            <el-form-item label="学院"  prop="college" style="flex: 1">
              <el-input v-model="changeForm.college"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="专业"prop="major" style="flex: 1">
              <el-input v-model="changeForm.major"  autocomplete="off"></el-input>
            </el-form-item>
          </div>

          <div style="display: flex;align-items: center">


            <el-form-item label="电话"  prop="phone" style="flex: 1">
              <el-input v-model="changeForm.phone" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="邮箱"  prop="email" style="flex: 1">
              <el-input v-model="changeForm.email" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="角色"   style="flex: 1">
              <el-select v-model="changeForm.role" placeholder="请选择">
                <el-option
                    v-for="item in roleOptions"
                    :label="item.label"
                    :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>

          </div>

          <div style="display: flex">
            <el-form-item label="密码"  prop="password" style="flex: 1">
              <el-input  show-password v-model="changeForm.password" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="头像" style="flex: 1" >

              <el-upload
                  class="avatar-uploader"
                  accept=".jpg,.jpeg"
                  :action="$baseUrl+'/file/upload'"
                  :headers="{token: user.token}"
                  list-type="picture"
                  :on-success="handleAvatarUpload"
              >
                <el-button type="primary" plain >上传头像</el-button>

              </el-upload>
            </el-form-item>

            <div style="flex: 1"></div>

          </div>


        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="changeDialogVis = false">取 消</el-button>
          <el-button type="primary" @click="saveData">确 定</el-button>
        </div>
      </el-dialog>

    </el-card>


  </div>
</template>

<script>

import request from "@/Utils/request";

export default {
  name: "UserManage",
  data(){
    return{
      user:JSON.parse(localStorage.getItem('INVC-user')||'{}'),
      tableData:[],//所有的数据
      pageNum:1,//挡墙的页码
      pageSize:5,//每页显示的页面
      username: '',
      name:'',
      member:'',
      total:20,
      changeDialogVis:false,
      changeForm:{},
      ids:[],
      rules:{
        nickname: [
          { required: true, message: '昵称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        grad: [
          { required: true, message: '请输入年级', trigger: 'blur' },
        ],
        college: [
          { required: true, message: '请输入学院', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
        ],
        major: [
          { required: true, message: '请输入专业', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { min: 11, max: 11, message: '长度 11 个字符', trigger: 'blur' }
        ],
      },
      memberOptions:[
          {label:'访客'},
          {label:'考核成员'},
          {label:'预备成员'},
          {label:'正式成员'},
          {label:'荣誉成员'}
      ] ,
      roleOptions:[
          {label:'成员'},
          {label:'物资管理'},
          {label:'运营宣传'},
          {label:'实验室负责人'},
      ]
    }
  },
  mounted() {

  },
  created() {
    this.load(1)
  },
  methods: {
    handleImport(res,file,fileList){
      if(res.code=='200'){
        this.$message.success('导入成功')
        this.load(1)

      }
      else {
        this.$message.error(res.msg)
      }
    },
    exportBatch(){
      if(!this.ids.length){
        window.open('http://localhost:9092'+'/user/export?token='+this.user.token+'&username='+this.username+'&name='+this.name)
      }
      else {
        let idStr=this.ids.join(',')
        window.open('http://localhost:9093'+'/user/export?token='+this.user.token+"&ids="+idStr)

      }

    },
    deleteBatch(){
      console.log(this.ids)
      if(!this.ids.length){
        this.$message.warning('请选择删除的用户')
        return
      }
      request.delete('user/delete/batch',{data:this.ids}).then(res=>{
        if(res.code=='200'){
          this.$message.success('删除成功')
          this.load(1)
        }
        else {
          this.$message.error(res.msg)
        }
      })
    },
    handleSelectionChange(rows){
      this.ids=rows.map(v=>v.id)
    },
    handleAvatarUpload(response,file,fileList){
      this.changeForm.avatar=response.data
    },
    saveData(){
      request({
        url:this.changeForm.id ? '/user/update' :'/user/add',
        method: this.changeForm.id ? 'PUT' :'POST',
        data:this.changeForm
      }).then(res=>{
        if(res.code=='200'){
          this.changeDialogVis=false
          this.$message.success("修改成功")
          this.load(1)
        }
        else {
          this.$message.error(res.code)
        }
      })
    },
    changeData(row){
      console.log(row)
      this.changeForm={}
      if(row)
      {
        this.changeForm=row
      }
      this.changeDialogVis=true
    },

    deleteData(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        request.delete('/user/delete/'+String(id)).then(res=>{
          if(res.code=='200'){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.load(1)
          }
          else this.$message.error(res.msg)
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    reset(){
      this.username=''
      this.name=''
      this.member=''
      this.load(1)
    },
    load(pageNum){
      if(pageNum) this.pageNum=pageNum

      request.get('/user/selectByPage',{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          username:this.username,
          name:this.name,
          member:this.member
        }
      }).then(res=>{
        if(res.code='200'){
          this.tableData=res.data?.records
          this.total=res.data?.total
        }
        else this.$message.error(res.msg)

      })
    },
    handleCurrentChange(pageNum){
      this.load(pageNum)
    }

  }
}
</script>

<style scoped>

</style>