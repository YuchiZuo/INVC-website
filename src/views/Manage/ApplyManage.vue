<template xmlns:>

  <div>

    <el-card>
      <div style="display: flex;align-items: center">
        <el-input v-model="name" style="width: 200px" placeholder="查询姓名"></el-input>
        <el-input  v-model="applyType" style="width: 200px;margin:0 5px" placeholder="查询类型"></el-input>
        <el-input v-model="applyState" style="width: 200px;margin:0 5px" placeholder="查询状态"></el-input>
        <el-button style="margin:10px 0"  @click="load(1)">查询</el-button>
        <el-button @click="reset">重置</el-button>
        <div style="margin:10px 0;display: flex">
          <el-button  style="margin-left: 20px" plain type="primary" @click="deleteBatch">批量删除</el-button>
        </div>
      </div>


      <div style="display: flex;align-items: center;justify-content: center;margin: 20px 0;width: 100%">

        <el-table :data="ApplyTable" :header-cell-style="{backgroundColor:'aliceblue'}"
                  @selection-change="handleSelectionChange">

          <el-table-column type="selection" width="55" align="center"></el-table-column>

          <el-table-column label="申请人" prop="name"></el-table-column>
          <el-table-column label="申请类型" prop="applytype" align="center"></el-table-column>
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
              <div style="display: flex">

                <el-button v-if="scope.row.applytype==='工位申请'" plain @click="seatSelectOpenEdit(scope.row)" type="success">工位选择</el-button>
                <el-button v-else plain @click="agreeApply(scope.row)" type="success">同意</el-button>
                <el-button plain @click="refuseApply(scope.row)" type="info">拒绝</el-button>
                <el-button plain @click="deleteApply(scope.row.id)" type="danger">删除</el-button>
              </div>

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

      <el-dialog title="申请内容"  :visible.sync="seeReasonDialogVis" width="30%">
        <el-form :model="editForm" label-width="80px"  ref="updateFormRef">

          <el-form-item label-width="80px" label="姓名" prop="reason">
            <el-input  v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label-width="80px" label="申请理由" prop="reason">
            <el-input type="textarea" rows="10" v-model="editForm.reason"></el-input>
          </el-form-item>

        </el-form>

        <div style="display:flex;justify-content: center">
          <el-button @click="editCancel">关闭</el-button>
        </div>

      </el-dialog>
      <el-dialog title="工位选择"  :visible.sync="seatSelectDialogVis" width="80%">
        <div v-for="item1 in 6" style="margin:20px 0">
          <div v-for="item2 in 2" >
            <div style="display: flex">
              <div v-for="item3 in 3" >
                <!--              算出每个位置的id，id=(item1-1)*6+(item2-1)*3+item3-1-->
                <!--              有人做的话显示蓝色和姓名，否则显示绿色-->
                <div v-if="seatList[(item1-1)*6+(item2-1)*3+item3-1]?.name" @click="seatSelectSave((item1-1)*6+(item2-1)*3+item3)"
                     style="width: 120px;height: 36px;background-color: #5ca7ff;border-radius: 5px;border:1px solid #ffffff">
                  <!--                显示座位号和名字-->
                  <div style="font-size: 12px">{{seatList[(item1-1)*6+(item2-1)*3+item3-1].seatnum}}</div>
                  <div style="font-size: 15px;display: flex;align-items: center;justify-content: center">
                    {{seatList[(item1-1)*6+(item2-1)*3+item3-1]?.name}}
                  </div>


                </div>
                <div v-else @click="seatSelectSave((item1-1)*6+(item2-1)*3+item3)"  style="width: 120px;height: 36px;
                background-color: #79de64;border-radius: 5px;border:1px solid #ffffff">
                  <!--                显示座位号和名字-->
                  <div style="font-size: 12px" >{{seatList[(item1-1)*6+(item2-1)*3+item3-1]?.seatnum}}</div>
                  <div style="font-size: 15px;display: flex;align-items: center;justify-content: center">
                    {{seatList[(item1-1)*6+(item2-1)*3+item3-1]?.name}}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      seatSelected:{},
      seatList:[],
      applyNow:{},
      ids:[],
      name:'',
      applyState:'',
      applyType:'',
      editForm:{},
      stateTag:{
        '待审核':'info',
        '已通过':'success',
        '未通过':'danger'
      },
      seeReasonDialogVis:false,
      seatSelectDialogVis:false,
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
      }
    }
  },
  mounted() {

  },
  created() {
    this.load(1)
    this.getAllSeat()
  },
  methods: {
    // 触发弹窗的方法
    seatSelectOpenEdit(apply){
      console.log(apply)
      this.applyNow=apply
      this.seatSelectDialogVis=true
    },
    seatSelectSave(id){
      console.log(id)
      this.seatSelected=this.seatList.find(option => option.id ===id)//通过id在工位表中找到工位
      console.log(this.seatSelected)
      // 判断这个工位号存不存在
      if( this.seatSelected){
        console.log(this.seatSelected.name)
        if(this.seatSelected.name===null){//判断是否有人做了
          this.seatSelected.name=this.applyNow.name
          //更新工位数据，还有同意apply
          request.put('/seat/update', this.seatSelected).then(res=>{
            if (res.code=='200'){
              this.agreeApply(this.applyNow)
              this.$message.success('工位设置成功')
              this.getAllSeat()
              this.seatSelectDialogVis=false

            }
            else this.$message.error(res.code)
          })
        }
        else {
          this.$confirm('该工位已有人，是否取人更换?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.seatSelected.name=this.applyNow.name
            //更新工位数据，还有同意apply
            request.put('/seat/update', this.seatSelected).then(res=>{
              if (res.code=='200'){
                this.agreeApply(this.applyNow)
                this.$message.success('工位设置成功')
                this.getAllSeat()
                this.seatSelectDialogVis=false

              }
              else this.$message.error(res.code)
            })
          }).catch(()=>{

          })

          }
      }
    },
    agreeApply(apply){

      // 判断是不是工位申请，是的话弹出弹窗分配工位，点击工位后再保存为同意，
      // 弹窗选工位的实现： 每一个div都绑定一个id，点击后传入id，通过id找到工位表对象，
      // 如果这个工位表对象由人名，提示是否换掉，是的话把绑定的名字改了，然后申请改为未通过。
      // 是空座位的话，直接绑定名字。然后确定，
        apply.state='已通过'
        request.put('/apply/update',apply).then(res=>{
          if (res.code=='200'){
            this.load(1)
            this.$message.success('设置成功')
          }
          else this.$message.error(res.code)
        })
    },
    refuseApply(apply){
        apply.state='未通过'
        request.put('/apply/update',apply).then(res=>{
          if (res.code=='200'){
            this.load(1)
            this.$message.success('取消成功')
          }
          else this.$message.error(res.code)
        })
    },
    deleteApply(id){
      console.log(id)
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
    editCancel(){
      this.load(1)
      this.seeReasonDialogVis=false
    },
    seeReason(row){
      this.editForm=row
      this.seeReasonDialogVis=true;
      console.log(this.editForm)
    },
    deleteBatch(){
      console.log(this.ids)
      if(!this.ids.length){
        this.$message.warning('请选择删除的用户')
        return
      }
      request.delete('apply/delete/batch',{data:this.ids}).then(res=>{
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

    reset(){
      this.name=''
      this.applyState=''
      this.applyType=''
      this.load(1)
    },
    load(pageNum){
      if(pageNum) this.pageNum=pageNum

      request.get('/apply/manageSelectByPage',{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          name:this.name,
          applyType:this.applyType,
          applyState:this.applyState
        }
      }).then(res=>{
        if(res.code='200'){
          this.ApplyTable=res.data?.records
          this.total=res.data?.total
        }
        else this.$message.error(res.msg)

      })
    },
    handleCurrentChange(pageNum){
      this.load(pageNum)
    },
    getAllSeat(){
      request.get('/seat/selectAll').then(res=>{
        if(res.code=='200'){
          this.seatList=res.data
        }
        else this.$message.error(res.code)
      })

    },

  }
}
</script>

<style scoped>

</style>