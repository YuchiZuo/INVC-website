<template>
<div style="display: flex;justify-content: center;background-color: #f5f6f7 ">
  <div style="width: 55%;margin-top: 15px">

    <div style="background-color: white;height: 200px;display: flex;align-items: center">
      <div style="margin:0 20px">
        <el-upload
            class="avatar-uploader"
            accept=".jpg,.jpeg"
            :show-file-list="false"
            :action="$baseUrl+'/file/upload?path=avatar&fileName='+this.user.username+'-avatar'+'&isDel=true'"
            :headers="{token: user.token}"
            list-type="picture"
            :on-success="handleAvatarUpload"
        >
          <el-image v-if="user.avatar"
                    :src="user.avatar" class="avatar"></el-image>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div style="height: 60%;display: flex;flex-direction: column">
        <div style="flex: 1;display: flex;align-items: center">
          <div>
            昵称:
          </div>
          <div style="margin-left: 10px">
            {{ user.nickname }}
          </div>
        </div>
        <div style="flex: 1;display: flex;align-items: center">
           等级:
            <div style="margin-left: 10px">
             {{ this.user.member }}
           </div>
        </div>
      </div>
    </div>

    <div style="margin-top: 10px;background-color: white;height: 200px;display: flex;align-items: center;justify-content: center">
      <div style="width: 90%;display: flex;">
        <el-descriptions title="账号信息">
          <el-descriptions-item label="昵称">{{ this.user.nickname }}</el-descriptions-item>
          <el-descriptions-item label="账号">{{ this.user.username }}</el-descriptions-item>
        </el-descriptions>
      </div>
      </div>

    <div style="margin-top: 10px;background-color: white;height: 250px">

      <div style="display: flex;justify-content: center">
        <div style="width: 90%;margin-top: 40px">
          <el-descriptions title="个人信息">
            <el-descriptions-item label="姓名">{{ this.user.name }}</el-descriptions-item>
            <el-descriptions-item label="学号">{{ this.user.username }}</el-descriptions-item>
            <el-descriptions-item label="年级">{{ this.user.grad }}</el-descriptions-item>
            <el-descriptions-item label="专业">{{ this.user.major }}级</el-descriptions-item>
            <el-descriptions-item label="电话">{{ this.user.phone }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>

      <div style="display: flex;justify-content: center;margin-top: 30px">
        <div style="display: flex;width: 90%;">

          <div style="flex: 1"></div>
          <div style="flex: 2">
            <el-button type="primary" @click="writeInfoHandle">完善信息</el-button>
          </div>
        </div>
      </div>

    </div>

    <div style="margin-top: 10px;background-color: white;height: 150px;display: flex;align-items: center;justify-content: center">
      <div style="width: 90%;display: flex;align-items: center">

        <div style="font-weight: bolder;flex: 1">
          门禁照片
        </div>
        <div style="flex: 2">
          <div v-if="user.name">
            <div v-if="user.face" style="display: flex;">
              <el-upload
                  accept=".png"
                  :show-file-list="false"
                  :action="$baseUrl+'/file/upload?path=face&fileName='+this.user.name+'&isDel=true'"
                  :headers="{token: this.user.token}"
                  list-type="picture"
                  :on-success="handleFaceUpload"
              >
                <el-button type="primary" >重新上传</el-button>
              </el-upload>

              <el-button @click="facePreview"  style="margin-left: 10px">下载照片</el-button>
            </div>

            <el-upload
                v-else
                accept=".png"
                :show-file-list="false"
                :action="$baseUrl+'/file/upload?path=face&fileName='+this.user.name+'&isDel=true'"
                :headers="{token: user.token}"
                list-type="picture"
                :on-success="handleFaceUpload"
            >

              <el-button type="primary">点击上传</el-button>

            </el-upload>

          </div>
          <div v-else>
            <el-button type="primary" disabled="true" >请完善信息后上传门禁照片</el-button>
          </div>


        </div>
      </div>
    </div>

    <div style="margin-top: 10px;background-color: white;height: 150px;display: flex;align-items: center;justify-content: center">
      <div style="width: 90%;display: flex;align-items: center">

        <div style="font-weight: bolder;flex: 1">
          安全准入证书
        </div>
        <div style="flex: 2">
          <div v-if="user.name">
            <div v-if="user.accessfile" style="display: flex;">
              <el-upload
                  accept=".jpg,.jpeg,.png"
                  :show-file-list="false"
                  :action="$baseUrl+'/file/upload?path=accessCertificate/&fileName='+this.user.name+'&isDel=true'"
                  :headers="{token: user.token}"
                  list-type="picture"
                  :on-success="handleAccessFileUpload"
              >
                <el-button type="primary" >重新上传</el-button>
              </el-upload>

              <el-button @click="AccessFilePreview"  style="margin-left: 10px">下载证书</el-button>
            </div>

            <el-upload
                v-else
                accept=".jpg,.jpeg,.png"
                :show-file-list="false"
                :action="$baseUrl+'/file/upload?path=accessCertificate&fileName='+this.user.name+'&isDel=true'"
                :headers="{token: user.token}"
                list-type="picture"
                :on-success="handleAccessFileUpload"
            >

              <el-button type="primary">点击上传</el-button>

            </el-upload>

          </div>
          <div v-else>
            <el-button type="primary" disabled="true" >请完善信息后上传准入证书</el-button>
          </div>


        </div>
      </div>

    </div>

  </div>

  <el-dialog title="完善信息" :visible.sync="writeInfoDialogVis" width="30%">

    <el-form :model="user" label-width="80px;"  :rules="rules" ref="writeInfoRef">
      <el-form-item label="用户名" style="padding-right: 20px" prop="username" >
        <el-input v-model="user.username" disabled="true" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" style="padding-right: 20px" prop="email">
        <el-input v-model="user.email" disabled="true" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="账号昵称" style="padding-right: 20px" prop="nickname">
        <el-input v-model="user.nickname" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="姓名" style="padding-right: 20px" prop="name">
        <el-input v-model="user.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="年级" style="padding-right: 20px" prop="grad">
        <el-input v-model="user.grad" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学院" style="padding-right: 20px" prop="college">
        <el-input v-model="user.college" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="专业" style="padding-right: 20px" prop="major">
        <el-input v-model="user.major" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="电话" style="padding-right: 20px"  prop="phone">
        <el-input v-model="user.phone" autocomplete="off"></el-input>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="writeInfoDialogVis = false">取 消</el-button>
      <el-button type="primary" @click="update">确 定</el-button>
    </div>


  </el-dialog>


</div>
</template>

<script>

import request from "@/Utils/request";

export default {
  name: "Person",
  data(){
    return{
      writeInfoDialogVis:false,
      user:JSON.parse(localStorage.getItem('INVC-user')||'{}'),
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
          { min: 4, max: 4, message: '请输入年级,如 ‘2021’', trigger: 'blur' }
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
      }
    }
  },
  methods:{
    writeInfoHandle(){
      this.writeInfoDialogVis=true
    },
    facePreview() {
      window.open(this.user.face)
    },
    AccessFilePreview() {
      window.open(this.user.accessfile)
    },
    handleAvatarUpload(response,file,fileList){
      this.user.avatar=response.data
      this.saveData()
    },
    handleFaceUpload(response,file,fileList){
      this.user.face=response.data
      this.saveData()
    },
    handleAccessFileUpload(response,file,fileList){
      this.user.accessfile=response.data
      this.saveData()
    },
    saveData(){
      request.put('/user/update',this.user).then(res=>{
        if(res.code==='200'){
          this.writeInfoDialogVis=false
          this.$message.success('保存成功')
          localStorage.setItem('INVC-user',JSON.stringify(this.user))
          this.$emit('update:user',this.user)
        }
        else {
          this.$message.error(res.msg)
        }
      })
    },
    update(){
      this.$refs["writeInfoRef"].validate((valid) => {
        if (valid) {
          this.saveData()
        }
        else {
          this.$message.error("数据输入不合法")
        }
      })

    }
  }
}
</script>

<style scoped>
:deep(.el-form-item__label) {
  font-weight: bold;
}
::v-deep.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 50%;

}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;

}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 50%;
}
</style>

