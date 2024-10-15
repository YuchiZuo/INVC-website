<template>
  <div style="display: flex;justify-content: center;">
    <div style="width: 95%">
      <el-card>
        <div style="display: flex;align-items: center;justify-content: center;
        margin: 20px 0;width: 100%;font-weight: bolder">
          <div>申请报名</div>
        </div>
        <el-form :model="applyForm" label-width="80px;"  :rules="rules" ref="applyFormRef">
          <el-form-item label-width="80px" label="申请类型" prop="applytype">
            <el-select v-model="applyForm.applytype" placeholder="请选择">
              <el-option
                  v-for="item in options"
                  :label="item.label"
                  :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label-width="80px" label="申请理由" prop="reason">
            <el-input type="textarea" rows="3"  style="width: 600px" v-model="applyForm.reason"></el-input>
          </el-form-item>


        </el-form>
        <div style="display: flex;width: 100%;align-items: center;justify-content: center">
          <el-button type="primary" @click="submit">提交</el-button>

            <el-upload
                v-if="this.options.find(option => option.label === this.applyForm.applytype)?.file"
                :show-file-list="false"
                :action="$baseUrl+'/file/upload?path=apply/files&fileName='+this.applyForm.applytype+this.user.username+'-'+this.user.name+'&isDel=false'"
                :headers="{token: user.token}"
                list-type="picture"
                :on-success="handleFileUpload"
            >
              <el-button style="margin-left: 20px" type="primary">上传附件</el-button>
            </el-upload>

        </div>
      </el-card>

      <el-card style="margin-top: 20px">
        <div style="display: flex;align-items: center;justify-content: center;
        margin: 20px 0;width: 100%;font-weight: bolder">
          <div>申请记录</div>
        </div>

        <div style="display: flex;align-items: center;justify-content: center;margin: 20px 0;width: 100%">
          <el-table :data="ApplyTable" :header-cell-style="{backgroundColor:'aliceblue'}">

            <el-table-column label="申请类型" prop="applytype"></el-table-column>
            <el-table-column label="申请日期" align="center" prop="date"></el-table-column>
            <el-table-column label="申请内容" align="center" >
              <template v-slot="scope">
                <el-button  @click="seeReason(scope.row)" >查看</el-button>
              </template>
            </el-table-column>

            <el-table-column label="状态" align="center">
              <template v-slot="scope">
                <el-tag effect="dark" :type="stateTag[scope.row.state]">
                  {{scope.row.state}}
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center">
              <template v-slot="scope">
                <el-button plain @click="applyCancel(scope.row.id)" type="danger">取消</el-button>
              </template>
            </el-table-column>

          </el-table>

        </div>
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[100,200,300,400]"
            :page-size="pageSize"
            background
            layout="prev, pager, next"
            :total="total">
        </el-pagination>
      </el-card>

      <el-dialog title="申请内容"  :visible.sync="seeReasonDialogVis" width="30%">
        <el-form :model="editForm" label-width="80px;"  :rules="rules" ref="updateFormRef">

          <el-form-item label-width="80px" label="申请理由" prop="reason">
            <el-input type="textarea" v-model="editForm.reason"></el-input>
          </el-form-item>

        </el-form>

        <div style="display:flex;justify-content: center">
          <el-button  type="primary" @click="applyUpdate">确认修改</el-button>
          <el-button @click="editCancel">取消</el-button>
        </div>

      </el-dialog>

    </div>

  </div>
</template>

<script>
import request from "@/Utils/request";

export default {
  name: "Apply",
  data(){
    return{
      editForm:{},
      stateTag:{
        '待审核':'info',
        '已通过':'success',
        '未通过':'danger'
      },
      seeReasonDialogVis:false,
      user:JSON.parse(localStorage.getItem('INVC-user')||'{}'),
      ApplyTable:[],
      pageNum:1,//挡墙的页码
      pageSize:5,//每页显示的页面
      total:20,
      applyForm:{
        username:'',
        name:'',
        applytype:'',
        date:'',
        reason:'',
        file:''

      },
      rules:{
        applytype: [
          { required: true, message: '请输入申请类型', trigger: 'blur' },
        ] ,
        reason: [
          { required: true, message: '请输入申请理由', trigger: 'blur' },
          { min: 10, max: 3000, message: '长度在 10 到 3000 个字符', trigger: 'blur' }

        ]
      },
        options: [{
          value: '选项1',
          label: '工位申请',
          file:''
        },
        {
          value: '选项2',
          label: '预备成员月度考察',
          file: ''
        }, {
          value: '选项3',
          label: '个人柜申请',
            file: ''
        },
        {
          value: '选项4',
          label: '项目柜申请',
          file: ''
        },
        {
          value: '选项5',
          label: '竞赛审核',
          file: 'need'
        },   {
          value: '选项6',
          label: '预备成员申请',
            file: 'need'
        },        {
          value: '选项7',
          label: '正式成员申请',
            file: 'need'
        },
         {
          value: '选项8',
          label: '荣誉成员申请',
           file:'need'
         },
          {
          value: '选项9',
          label: '管理人员报名',
            file: 'need'
        },
        ]

    }
  },
  created() {
    this.load()
  },
  methods:{
    editCancel(){
      this.load(1)
      this.seeReasonDialogVis=false
    },
    applyUpdate(){
      console.log("update")
      this.$refs["updateFormRef"].validate((validate)=>{
        if (validate){
          request.put('/apply/update',this.editForm).then(res=>{
            if (res.code=='200'){
              this.seeReasonDialogVis=false;
              this.$message.success("修改成功")
            }
          })
        }
        else this.$message.error('失败')
      })

    },
    applyCancel(id){
      this.$confirm('是否确认取消?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.delete('/apply/delete/'+id).then(res=>{
          if (res.code=='200'){
            this.load(1)
            this.$message.success('取消成功')
          }
          else this.$message.error(res.code)
        })
      }).catch(() => {
        this.load(1)
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    handleFileUpload(response,file,fileList){
      this.applyForm.file=response.data
    },
    seeReason(row){
      this.editForm=row
      this.seeReasonDialogVis=true;
      console.log(this.editForm)
    },
    handleCurrentChange(pageNum){
      this.load(pageNum)
    },
    load(pageNum){
      if(pageNum) this.pageNum=pageNum

      request.get('/apply/userSelectByPage',{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          username:this.user.username
        }
      }).then(res=>{
        if (res.code=='200'){
          this.ApplyTable=res.data?.records
          this.total=res.data.total
        }
        else {
          this.$message.error(res.msg)
        }
      })
    },
    submit(){
      this.$refs["applyFormRef"].validate((valid) => {
      if (valid) {
        this.$confirm('是否确认提交', '取认为', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.applyForm.username=this.user.username
          this.applyForm.name=this.user.name

          let date=new Date()
          let year = date.getFullYear();
          let month = `0${date.getMonth() + 1}`.slice(-2);
          let day = `0${date.getDate()}`.slice(-2);

          let hour = date.getHours().toString().padStart(2, '0');
          let minute = date.getMinutes().toString().padStart(2, '0');
          let second = date.getSeconds().toString().padStart(2, '0');

          this.applyForm.date=`${year}-${month}-${day} ${hour}:${minute}:${second}`
          this.applyForm.state='待审核'
          this.applyForm.pubsherName='INVC'
          this.applyForm.pubsherUsername='00000000'

          request.post('/apply/add',this.applyForm).then(res=>{
            if(res.code==='200'){
              this.load(1);
              this.$message.success('保存成功')
            }
            else {
              this.$message.error(res.msg)
            }
          })
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      }}
    )




    }
  }
}
</script>

<style scoped>

</style>