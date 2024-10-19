<template>
  <div style="margin-left: 2px">

    <div style="display: flex;justify-content: center;margin-top: 0px">
      <el-card style="flex: 1;min-height:400px;margin: 0 1px">
        <div style="display: flex;justify-content: center;margin-bottom: 20px;
               font-size: 15px;font-weight: bolder">
          队员招募信息
        </div>

        <el-table :data="recruitPageTable.tableData">
          <el-table-column label="发布人" width="80" prop="name"></el-table-column>
          <el-table-column label="类型" width="80" prop="type"></el-table-column>
          <el-table-column label="项目名称" prop="prjName"></el-table-column>
          <el-table-column label="详情" width="80" align="center">
            <template v-slot="scope">
              <el-button class="el-button--mini" @click="detail(scope.row)">查看</el-button>
            </template>
          </el-table-column>

          <el-table-column label="日期" width="100px" prop="date" align="center"></el-table-column>
          <el-table-column label="状态" align="center">
            <template v-slot="scope">
              <el-tag effect="dark" :type="recruitStateTag[scope.row.state]">
                {{ scope.row.state }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="人数" prop="num" width="50"></el-table-column>
          <el-table-column label="操作" align="center">

            <template v-slot="scope">

              <el-button v-if="scope.row.state === '已结束'" disabled="" type="primary" plain
                @click="joinDialogOpen(scope.row)" class="el-button--mini">报名</el-button>
              <el-button v-else type="primary" plain @click="joinDialogOpen(scope.row)"
                class="el-button--mini">报名</el-button>
            </template>

          </el-table-column>
        </el-table>

        <el-pagination style="margin-top: 30px" @current-change="pagNum => handleCurrentChange(pagNum, recruitPageTable)"
          :current-page="this.recruitPageTable.pageNum" :page-sizes="[100, 200, 300, 400]"
          :page-size="this.recruitPageTable.pageSize" background layout="prev, pager, next"
          :total="this.recruitPageTable.total">
        </el-pagination>

        <div style="display: flex;align-items: center;justify-content: center;margin-top: 30px">

          <el-button type="primary" plain @click="dialogOpen(myRecruitDialog)">我的招募</el-button>
          <el-button type="primary" plain @click="dialogOpen(myJoinDialog)">我的报名</el-button>

          <el-button type="primary" plain @click="dialogOpen(recruitDialog)"
            style="margin-left: 40px">发布招募信息</el-button>

        </div>
      </el-card>

      <el-card style="flex: 1;margin: 0 1px">
        <div style="display: flex;justify-content: center;margin-bottom: 20px;
               font-size: 15px;font-weight: bolder">
          简历信息
        </div>

        <el-table :data="briefPageTable.tableData">
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="学号" prop="date" align="center"></el-table-column>
          <el-table-column label="日期" prop="date" align="center"></el-table-column>
          <el-table-column label="简历" align="center">
            <template v-slot="scope">
              <el-button class="el-button--mini" @click="briefDetail(scope.row)">查看</el-button>
            </template>
          </el-table-column>

        </el-table>

        <el-pagination style="margin-top: 30px" @current-change="pagNum => handleCurrentChange(pagNum, briefPageTable)"
          :current-page="this.briefPageTable.pageNum" :page-sizes="[100, 200, 300, 400]"
          :page-size="this.briefPageTable.pageSize" background layout="prev, pager, next"
          :total="this.briefPageTable.total">
        </el-pagination>

        <div style="display: flex;align-items: center;justify-content: center;margin-top: 30px">

          <el-button type="primary" plain @click="dialogOpen(personBriefDialog)"
            style="margin-left: 40px">发布简历信息</el-button>

        </div>

      </el-card>

    </div>
    <div style="display: flex;justify-content: center;margin-top: 2px">
      <el-card style="flex: 1;min-height:600px;margin: 0 1px">
        <div>
          <div style="display: flex;justify-content: center;margin-bottom: 20px;
               font-size: 15px;font-weight: bolder">
            工位申请通过名单
          </div>
          <el-table :data="this.seatPageTable.tableData">
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="工位号" prop="seatnum"></el-table-column>
          </el-table>
          <el-pagination style="margin-top: 30px" @current-change="pagNum => handleCurrentChange(pagNum, seatPageTable)"
            :current-page="this.seatPageTable.pageNum" :page-sizes="[100, 200, 300, 400]"
            :page-size="this.seatPageTable.pageSize" background layout="prev, pager, next"
            :total="this.seatPageTable.total">
          </el-pagination>
        </div>

      </el-card>

      <el-card style="flex: 1;min-height: 600px;margin: 0 1px;display: flex;justify-content: center">
        <div>
          <div>
            <div style="font-weight: bolder;display: flex;justify-content: center">工位分布</div>
          </div>
          <!--        工位分布图-->
          <div v-for="item1 in 6" style="margin:20px 0">
            <div v-for="item2 in 2">
              <div style="display: flex">
                <div v-for="item3 in 3">
                  <!--              算出每个位置的id，id=(item1-1)*6+(item2-1)*3+item3-1-->
                  <!--              有人做的话显示蓝色和姓名，否则显示绿色-->
                  <div v-if="seat[(item1 - 1) * 6 + (item2 - 1) * 3 + item3 - 1].name"
                    style="width: 120px;height: 36px;background-color: #5ca7ff;border-radius: 5px;border:1px solid #ffffff">
                    <!--                显示座位号和名字-->
                    <div style="font-size: 12px">{{ seat[(item1 - 1) * 6 + (item2 - 1) * 3 + item3 - 1].seatnum }}</div>
                    <div style="font-size: 15px;display: flex;align-items: center;justify-content: center">
                      {{ seat[(item1 - 1) * 6 + (item2 - 1) * 3 + item3 - 1].name }}
                    </div>


                  </div>
                  <div v-else
                    style="width: 120px;height: 36px;background-color: #79de64;border-radius: 5px;border:1px solid #ffffff">
                    <!--                显示座位号和名字-->
                    <div style="font-size: 12px">{{ seat[(item1 - 1) * 6 + (item2 - 1) * 3 + item3 - 1].seatnum }}</div>
                    <div style="font-size: 15px;display: flex;align-items: center;justify-content: center">
                      {{ seat[(item1 - 1) * 6 + (item2 - 1) * 3 + item3 - 1].name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>



    <el-dialog title="发布招募信息" :visible="recruitDialog.dialogInfoDialogVis"
      @update:visible="value => recruitDialog.dialogInfoDialogVis = value" width="60%">

      <el-form :model="recruitDialog.form" label-width="80px;" :rules="rules" ref="recruitInfoRef">

        <div style="display: flex;align-items: center">

          <el-form-item label="类型" style="padding-right: 20px" prop="type">
            <el-select v-model="recruitDialog.form.type" placeholder="类型">
              <el-option v-for="item in typeOptions" :label="item.label" :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="项目名称" style="padding-right: 20px" prop="prjName">
            <el-input v-model="recruitDialog.form.prjName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="招募人数" style="padding-right: 20px" prop="num">
            <el-input v-model="recruitDialog.form.num" autocomplete="off"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="关于项目" style="padding-right: 20px" prop="about">
          <el-input type="textarea" v-model="recruitDialog.form.about" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="要求" style="padding-right: 20px" prop="recruitRequire">
          <el-input type="textarea" v-model="recruitDialog.form.recruitRequire" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>

      <div>
        <el-button @click="dialogClose(recruitDialog)">取 消</el-button>
        <el-button type="primary" @click="recruitAdd()">确 定</el-button>
      </div>


    </el-dialog>
    <el-dialog title="发布简历信息" :visible="personBriefDialog.dialogInfoDialogVis"
      @update:visible="value => personBriefDialog.dialogInfoDialogVis = value" width="60%">

      <el-form :model="personBrief" label-width="80px;" :rules="rules" ref="briefInfoRef">

        <el-form-item label="目前掌握的知识、经历" style="padding-right: 20px" prop="reason">
          <el-input type="textarea" v-model="personBrief.reason" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div>
        <el-button type="primary" @click="personBriefAdd()">发布</el-button>
        <el-button @click="dialogClose(personBriefDialog)">关闭</el-button>
        <el-button v-if="personBrief?.id" type="danger" @click="deleteBrief(personBriefDialog)">删除简历</el-button>
      </div>


    </el-dialog>
    <el-dialog title="编辑招募信息" :visible="recruitEditDialog.dialogInfoDialogVis"
      @update:visible="value => recruitEditDialog.dialogInfoDialogVis = value" width="60%">

      <el-form :model="recruitEditDialog.form" label-width="80px;" :rules="rules" ref="recruitInfoRef">

        <div style="display: flex;align-items: center">

          <el-form-item label="类型" style="padding-right: 20px" prop="type">
            <el-select v-model="recruitEditDialog.form.type" placeholder="类型">
              <el-option v-for="item in typeOptions" :label="item.label" :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="项目名称" style="padding-right: 20px" prop="prjName">
            <el-input disabled v-model="recruitEditDialog.form.prjName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="招募人数" style="padding-right: 20px" prop="num">
            <el-input v-model="recruitEditDialog.form.num" autocomplete="off"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="关于项目" style="padding-right: 20px" prop="about">
          <el-input type="textarea" v-model="recruitEditDialog.form.about" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="要求" style="padding-right: 20px" prop="recruitRequire">
          <el-input type="textarea" v-model="recruitEditDialog.form.recruitRequire" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>

      <div>
        <el-button @click="dialogClose(recruitEditDialog)">取 消</el-button>
        <el-button type="primary" @click="recruitUpdate()">确 定</el-button>
      </div>


    </el-dialog>

    <el-dialog title="报名" :visible="joinDialog.dialogInfoDialogVis"
      @update:visible="value => joinDialog.dialogInfoDialogVis = value" width="60%">

      <el-form :model="joinDialog.form" label-width="80px;" :rules="rules" ref="joinInfoRef">

        <el-form-item label="报名原因及、个人介绍" style="padding-right: 20px" prop="reason">
          <el-input type="textarea" v-model="joinDialog.form.reason" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>

      <div>
        <el-button @click="dialogClose(joinDialog)">取 消</el-button>
        <el-button type="primary" @click="join(joinDialog.form)">确 定</el-button>
      </div>


    </el-dialog>

    <el-dialog title="我的报名" :visible="myJoinDialog.dialogInfoDialogVis"
      @update:visible="value => myJoinDialog.dialogInfoDialogVis = value" width="60%">

      <el-table :data="myJoinPage.tableData" :header-cell-style="{ backgroundColor: 'aliceblue' }">

        <el-table-column label="发布人" prop="publisherName"></el-table-column>
        <el-table-column label="申请类型" prop="applytype"></el-table-column>
        <el-table-column label="申请名称" prop="applyName"></el-table-column>
        <el-table-column label="申请日期" align="center" prop="date"></el-table-column>
        <el-table-column label="申请内容" align="center">
          <template v-slot="scope">
            <el-button @click="seeReason(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template v-slot="scope">
            <el-tag effect="dark" :type="stateTag[scope.row.state]">
              {{ scope.row.state }}
            </el-tag>
          </template>

        </el-table-column>


        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button plain @click="applyCancel(scope.row.id)" type="danger">取消</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination style="margin-top: 30px"
        @current-change="pagNum => handleCurrentChange(pagNum, myJoinPage, { username: this.user.username, applyType: '招募报名' })"
        :current-page="this.myJoinPage.pageNum" :page-sizes="[100, 200, 300, 400]" :page-size="this.myJoinPage.pageSize"
        background layout="prev, pager, next" :total="this.myJoinPage.total">
      </el-pagination>

      <div style="margin-top: 20px">
        <el-button @click="dialogClose(myJoinDialog)"> 关闭</el-button>
      </div>

    </el-dialog>
    <el-dialog title="我的招募" :visible="myRecruitDialog.dialogInfoDialogVis"
      @update:visible="value => myRecruitDialog.dialogInfoDialogVis = value" width="60%">

      <el-table :data="myRecruitPage.tableData">
        <el-table-column label="类型" prop="type"></el-table-column>
        <el-table-column label="项目名称" prop="prjName"></el-table-column>

        <el-table-column label="报名情况" align="center">
          <template v-slot="scope">
            <el-button @click="recruitConditionDialogOpen(scope.row)">查看</el-button>
          </template>
        </el-table-column>

        <el-table-column label="状态" align="center">
          <template v-slot="scope">
            <el-tag effect="dark" :type="recruitStateTag[scope.row.state]">
              {{ scope.row.state }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">

          <template v-slot="scope">
            <el-button type="primary" plain @click="recruitEditDialogOpen(scope.row)">编辑</el-button>
            <el-button type="danger" plain @click="recruitOver(scope.row)">结束</el-button>
          </template>

        </el-table-column>

      </el-table>
      <el-pagination style="margin-top: 30px"
        @current-change="pagNum => handleCurrentChange(pagNum, myRecruitPage, { username: this.user.username })"
        :current-page="this.myRecruitPage.pageNum" :page-sizes="[100, 200, 300, 400]"
        :page-size="this.myRecruitPage.pageSize" background layout="prev, pager, next"
        :total="this.myRecruitPage.total">
      </el-pagination>

      <div style="margin-top: 20px">
        <el-button @click="dialogClose(myJoinDialog)"> 关闭</el-button>
      </div>

    </el-dialog>

    <el-dialog title="报名详情" :visible.sync="reasonDialog.dialogInfoDialogVis"
      @update:visible="value => reasonDialog.dialogInfoDialogVis = value" width="30%">
      <el-form :model="reasonDialog.form" label-width="80px;" :rules="rules" ref="updateFormRef">

        <el-form-item label-width="80px" label="申请理由" prop="reason">
          <el-input type="textarea" v-model="reasonDialog.form.reason"></el-input>
        </el-form-item>

      </el-form>

      <div style="display:flex;justify-content: center">
        <el-button type="primary" @click="join()">确认修改</el-button>
        <el-button @click="dialogClose(reasonDialog)">取消</el-button>
      </div>

    </el-dialog>
    <el-dialog title="报名情况" :visible.sync="applyConditionDialog.dialogInfoDialogVis"
      @update:visible="value => applyConditionDialog.dialogInfoDialogVis = value" width="60%">

      <el-table :data="applyConditionPage.tableData" :header-cell-style="{ backgroundColor: 'aliceblue' }">

        <el-table-column label="姓名" align="center" prop="name"></el-table-column>
        <el-table-column label="学号" align="center" prop="username"></el-table-column>
        <el-table-column label="申请原因" align="center">
          <template v-slot="scope">
            <el-button @click="seeReason(scope.row)">查看</el-button>
          </template>
        </el-table-column>

        <el-table-column label="状态" align="center">
          <template v-slot="scope">
            <el-tag effect="dark" :type="stateTag[scope.row.state]">
              {{ scope.row.state }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button plain @click="agreeApply(scope.row)" type="success">同意</el-button>
            <el-button plain @click="refuseApply(scope.row)" type="info">拒绝</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination style="margin-top: 30px"
        @current-change="pagNum => handleCurrentChange(pagNum, applyConditionPage,
          { publisherUsername: this.user.username, applyName: this.recruitDataNow.prjName })"
        :current-page="this.applyConditionPage.pageNum" :page-sizes="[100, 200, 300, 400]"
        :page-size="this.applyConditionPage.pageSize" background layout="prev, pager, next"
        :total="this.applyConditionPage.total">
      </el-pagination>

      <div style="margin-top: 20px">
        <el-button @click="dialogClose(myJoinDialog)"> 关闭</el-button>
      </div>

    </el-dialog>

    <el-dialog title="招募详情" :visible="DetailDialog.dialogInfoDialogVis"
      @update:visible="value => DetailDialog.dialogInfoDialogVis = value" width="30%">

      <div style="min-height: 200px">
        <div>
          <div style="font-weight: bolder;margin:10px 0">介绍</div>
          <div style="margin-left: 10px"> {{ recruitDataNow.about }} </div>
        </div>

        <div style="margin-top: 30px">
          <div style="font-weight: bolder;margin:10px 0">要求</div>
          <div style="margin-left: 10px"> {{ recruitDataNow.recruitRequire }} </div>
        </div>

        <div style="margin-top:30px">
          <div style="font-weight: bolder;margin:10px 0">人数</div>
          <div style="margin-left: 10px"> {{ recruitDataNow.num }} </div>
        </div>

      </div>
      <div style=" margin-top: 30px">
        <el-button @click="dialogClose(DetailDialog)">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="简介详情" :visible="briefDetailDialog.dialogInfoDialogVis"
      @update:visible="value => briefDetailDialog.dialogInfoDialogVis = value" width="30%">

      <div style="min-height: 200px">

        <div>
          <div style="font-weight: bolder;margin:10px 0">简历</div>
          <div style="margin-left: 10px"> {{ briefNow.reason }} </div>
        </div>

      </div>
      <div style=" margin-top: 30px">
        <el-button @click="dialogClose(briefDetailDialog)">关闭</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
import request from "@/Utils/request";

class pageTable {
  tableData;
  total;
  constructor(url, pageSize) {
    this.url = url;
    this.pageNum = 1;
    this.pageSize = pageSize;
  }

  load(...args) {

    let pageNum = args[0]

    if (args.length === 1) {
      if (pageNum) this.pageNum = pageNum


      return new Promise((resolve, reject) => {
        request.get(this.url, {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          }
        }).then(res => {
          if (res.code == '200') {
            this.tableData = res.data?.records
            this.total = res.data.total
          }
          else {
            this.$message.error(res.msg)
          }
          resolve(res);
        }).catch(res => {
          reject(error);
        })
      });


    }
    else {
      if (pageNum) this.pageNum = pageNum

      let baseParams = { pageNum: this.pageNum, pageSize: this.pageSize, };

      return new Promise((resolve, reject) => {
        request.get(this.url, {
          params: Object.assign({}, baseParams, args[1])
        }).then(res => {
          if (res.code == '200') {
            this.tableData = res.data?.records
            this.total = res.data.total
          }
          else {
            this.$message.error(res.msg)
          }
          resolve(res);
        }).catch(res => {
          reject(error);
        })
      });


    }

  }
}
class DataControl {

  constructor(url) {
    this.data = {};
    this.rootURL = url;
  }
  add(obj) {
    // 返回一个Promise
    return new Promise((resolve, reject) => {
      request.post(this.rootURL + '/add', obj).then(res => {
        // 当请求成功时，使用resolve返回结果
        resolve(res);
      }).catch(error => {
        // 当请求失败时，使用reject返回错误
        reject(error);
      });
    });
  }

  update(obj) {
    return new Promise((resolve, reject) => {
      request.put(this.rootURL + '/update', obj).then(res => {
        // 当请求成功时，使用resolve返回结果
        resolve(res);
      }).catch(error => {
        // 当请求失败时，使用reject返回错误
        reject(error);
      });
    });
  }
  select() {

  }
}

class DialogForm {
  constructor() {
    this.form = {};
    this.dialogInfoDialogVis = false;
  }
  open() {
    this.form = {};
    this.dialogInfoDialogVis = true;
  }
  close() {
    this.dialogInfoDialogVis = false;
  }

}
export default {

  name: "CenterHome",
  data() {

    const numPass = (rule, value, callback) => {

      const isNumeric = /^\d+(\.\d+)?$/.test(value);
      if (value === '') {
        callback(new Error('请输入数字'))
      }
      else if (!isNumeric) {
        callback(new Error("请输入正确数字，如 5"))
      }
      else {
        callback()
      }
    };

    return {

      stateTag: {
        '待审核': 'info',
        '已通过': 'success',
        '未通过': 'danger'
      },

      recruitStateTag: {
        '已结束': 'info',
        '进行中': '',
      },
      briefPageTable: new pageTable('/personBrief/selectByPage', 5),
      personBrief: {},
      briefDetailDialog: new DialogForm(),
      briefNow: {},
      myBriefPage: new pageTable('/personBrief/selectByPage', 5),
      personBriefControl: new DataControl('/personBrief'),
      personBriefPageTable: new pageTable('/personBrief/selectByPage', 5),
      personBriefDialog: new DialogForm(),
      applyRowNow: {},
      applyConditionPage: new pageTable('/apply/userSelectByPage', 5),
      applyConditionDialog: new DialogForm(),
      reasonDialog: new DialogForm(),
      recruitEditDialog: new DialogForm(),
      myRecruitDialog: new DialogForm(),
      myRecruitPage: new pageTable('/recruit/selectByPage', 5),
      myJoinPage: new pageTable('/apply/userSelectByPage', 5),

      joinApply: new DataControl('/apply'),
      joinDialog: new DialogForm(),
      myJoinDialog: new DialogForm(),
      recruitDataNow: {},
      DetailDialog: new DialogForm(),
      user: JSON.parse(localStorage.getItem('INVC-user') || '{}'),
      recruitDialogInfoDialogVis: false,
      recruitInfoDialogVis: false,
      seatPageTable: new pageTable('/seat/SelectByPage', 5),

      recruitDialog: new DialogForm(),
      recruitPageTable: new pageTable('/recruit/selectByPage', 5),
      recruitControl: new DataControl('/recruit'),
      typeOptions: [
        {
          label: '项目'
        },
        {
          label: '竞赛'
        }
      ],
      rules: {
        reason: [
          { required: true, message: '请输入申请原因', trigger: 'blur' },
          { min: 10, max: 3000, message: '长度在 10 到 3000 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入人数', trigger: 'blur' },
        ],
        num: [
          { validator: numPass, trigger: 'blur' },
          { required: true, message: '请输入人数', trigger: 'blur' },
        ],
        about: [
          { required: true, message: '请介绍项目', trigger: 'blur' },
          { min: 2, max: 3000, message: '长度在 2 到 3000 个字符', trigger: 'blur' }
        ],
        recruitRequire: [
          { required: true, message: '请输入成员要求', trigger: 'blur' },
          { min: 2, max: 3000, message: '长度在 2 到 3000 个字符', trigger: 'blur' }
        ],
        prjName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    briefDetail(row) {
      this.briefNow = row
      this.briefDetailDialog.open()
    },
    getPersonBrief() {
      this.personBriefPageTable.load(1, { username: this.user.username }).then(res => {
        if (this.personBriefPageTable.tableData?.length > 0) {
          this.personBrief = this.personBriefPageTable.tableData[0]
          console.log('数组大于0')
        }
        else this.personBrief = {}

        console.log(this.personBrief)
      })
    },
    personBriefAdd() {
      if (this.personBrief.id) {
        this.personBrief.date = this.dateToStr(new Date())
        this.personBriefControl.update(this.personBrief).then(res => {
          if (res.code == '200') {
            this.$message.success('发布成功')
            this.personBriefDialog.close()
          }
          else {
            this.$message.error(res.code)
          }
        })
      }
      else {
        this.personBrief.name = this.user.name
        this.personBrief.username = this.user.username
        this.personBrief.date = this.dateToStr(new Date())
        this.personBriefControl.add(this.personBrief).then(res => {
          if (res.code == '200') {
            this.getPersonBrief()
            this.briefPageTable.load(1)

            this.$message.success('发布成功')
            this.personBriefDialog.close()
          }
          else {
            this.$message.error(res.code)
          }
        })
      }

    },
    agreeApply(apply) {
      apply.state = '已通过'
      this.joinApply.update(apply).then(res => {
        if (res.code == '200') {
          this.pageLoad()
          this.$message.success('设置成功')
        }
        else this.$message.error(res.code)
      })
    },
    refuseApply(apply) {
      apply.state = '未通过'
      this.joinApply.update(apply).then(res => {
        if (res.code == '200') {
          this.pageLoad()
          this.$message.success('取消成功')
        }
        else this.$message.error(res.code)
      })
    },
    deleteBrief() {
      const id = this.personBrief.id
      this.$confirm('是否确认取消?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.delete('/personBrief/delete/' + id).then(res => {
          if (res.code == '200') {
            this.personBrief = {}
            this.briefPageTable.load(1)
            this.personBriefDialog.close()
            this.$message.success('取消成功')
          }
          else this.$message.error(res.code)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    applyCancel(id) {
      this.$confirm('是否确认取消?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.delete('/apply/delete/' + id).then(res => {
          if (res.code == '200') {
            this.pageLoad()
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

    dateToStr(date) {

      let year = date.getFullYear();
      let month = `0${date.getMonth() + 1}`.slice(-2);
      let day = `0${date.getDate()}`.slice(-2);

      let hour = date.getHours().toString().padStart(2, '0');
      let minute = date.getMinutes().toString().padStart(2, '0');
      let second = date.getSeconds().toString().padStart(2, '0');
      let dateStr = `${year}-${month}-${day} ${hour}:${minute}:${second}`
      return dateStr
    },
    join(form) {
      this.$refs["joinInfoRef"].validate((valid) => {
        if (valid) {
          form.username = this.user.username
          form.name = this.user.name
          form.applytype = '招募报名'
          form.date = this.dateToStr(new Date())
          form.state = '待审核'
          form.publisherName = this.recruitDataNow.name
          form.publisherUsername = this.recruitDataNow.username
          form.applyName = this.recruitDataNow.prjName

          this.joinApply.add(form).then(res => {
            if (res.code == '200') {
              this.pageLoad()
              this.joinDialog.close()
              this.$message.success('报名成功')
            }
            else this.$message.error(res.code)
          })
        }
        else this.$message.error('数据输入不合法')

      })

    },
    seeReason(row) {
      this.reasonDialog.form = row
      this.reasonDialog.dialogInfoDialogVis = true;
    },

    joinDialogOpen(row) {
      this.recruitDataNow = row
      this.joinDialog.open()
    },
    detail(row) {
      this.recruitDataNow = row
      this.DetailDialog.open()
    },

    recruitEditDialogOpen(row) {
      this.recruitEditDialog.form = row
      console.log(row)
      this.recruitEditDialog.dialogInfoDialogVis = true
    },
    recruitOver(row) {
      row.state = '已结束'
      this.recruitControl.update(row).then(res => {
        if (res.code == '200') {
          this.$message.success('设置成功')

          this.pageLoad()
        }
        else {
          this.$message.error(res.code)
        }
      })
      this.myRecruitPage.load(1, { username: this.user.username })
    },
    recruitConditionDialogOpen(row) {
      this.recruitDataNow = row
      this.applyConditionDialog.open()
      this.applyConditionPage.load(1, { publisherUsername: this.user.username, applyName: row.prjName })
    },
    dialogOpen(dialog) {
      dialog.open()
    },
    dialogClose(dialog) {
      dialog.close()
    },
    recruitAdd() {
      this.$refs["recruitInfoRef"].validate((valid) => {
        if (valid) {
          this.recruitDialog.form.username = this.user.username
          this.recruitDialog.form.name = this.user.name
          this.recruitDialog.form.state = '进行中'
          this.recruitDialog.form.date = this.dateToStr(new Date())
          this.recruitControl.add(this.recruitDialog.form).then(res => {
            if (res.code == '200') {
              this.pageLoad()
              this.recruitDialog.close()
              this.$message.success('发布成功')
            }
            else this.$message.error(res.code)
          })
        }
        else this.$message.error('请输入正确信息')

      })
    },
    recruitUpdate() {
      this.$refs["recruitInfoRef"].validate((valid) => {
        if (valid) {
          this.recruitEditDialog.form.state = '进行中'
          this.recruitEditDialog.form.date = this.dateToStr(new Date())
          console.log(this.recruitEditDialog.form)
          this.recruitControl.update(this.recruitEditDialog.form).then(res => {
            if (res.code == '200') {
              this.recruitPageTable.load(1)
              this.recruitEditDialog.close()
              this.$message.success('发布成功')
            }
            else this.$message.error(res.code)
          })
        }
        else this.$message.error('请输入正确信息')

      })
    },
    handleCurrentChange(pageNum, pageTable, params = {}) {
      console.log(pageNum)
      if (Object.keys(params).length === 0) {  // 检查对象是否为空
        pageTable.load(pageNum)
      } else {
        pageTable.load(pageNum, params)
      }
    },
    getAllSeat() {
      request.get('/seat/selectAll').then(res => {
        if (res.code == '200') {
          this.seat = res.data
          console.log(this.seat)
        }
        else this.$message.error(res.code)
      })
    },
    pageLoad() {
      this.briefPageTable.load(1)
      this.myRecruitPage.load(1, { username: this.user.username })
      this.myJoinPage.load(1, { username: this.user.username, applyType: '招募报名' })
      this.seatPageTable.load(1)
      this.recruitPageTable.load(1)
      this.myBriefPage.load(1, { username: this.user.username })
    }
  },
  created() {
    this.getPersonBrief()
    this.getAllSeat()
    this.pageLoad()
  }
}
</script>

<style scoped></style>