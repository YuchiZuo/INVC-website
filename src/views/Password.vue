<template>

<div style="margin-top: 20px;margin-left: 20px">

  <el-card style="width: 50%">
    <el-form :model="user" :rules="rules" ref="passwordRef">
      <el-form-item prop="oldPassword">
        <el-input show-password placeholder="请输入密码" v-model="user.oldPassword"></el-input>
      </el-form-item>

      <el-form-item prop="newPassword">
        <el-input show-password placeholder="请输入新密码" v-model="user.newPassword"></el-input>
      </el-form-item>

      <el-form-item prop="confirmPassword">
        <el-input show-password placeholder="请确认密码" v-model="user.confirmPassword"></el-input>
      </el-form-item>

      <div style="text-align: center">
        <el-button type="primary" @click="update" style="margin-bottom: 20px">保存</el-button>
      </div>


    </el-form>
  </el-card>


</div>
</template>

<script>

import request from "@/Utils/request";

export default {
  name: "Password",
  data(){
    const confirmPasswordPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      }
      else if(value !==this.user.newPassword){
        callback(new Error("确认密码错误"))
      }
      else {
        callback()
      }
    };
    return{
      user:JSON.parse(localStorage.getItem('INVC-user')||'{}'),
      rules:{
        oldPassword : [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        confirmPassword: [
          { validator: confirmPasswordPass, trigger: 'blur' }
        ]
      }

    }
  },

  methods:{
    update(){

      this.$refs["passwordRef"].validate((valid) => {
        if (valid) {

        if(this.user.password!==this.user.oldPassword){

          console.log(this.user.password,this.user.oldPassword)
           alert("密码错误")
          }
        else {
          this.user.password=this.user.newPassword
          request.put('/user/update',this.user).then(res=>{
            if(res.code==='200'){
              this.$message.success('修改成功')
              this.$router.push('/login')
            }
            else {
              this.$message.error(res.msg)
            }

          })
        }

        }
      })
    }


  }
}
</script>

<style scoped>

</style>