<template>

  <div style="display:flex;height:100vh;overflow:hidden;align-items:center;justify-content:center;background-color:#eff1f5">

    <div style="display: flex;background-color: white;border-radius: 5px;overflow: hidden;width: 60%">
      <div style="flex: 1">
        <img src="@/assets/register.png" alt="" style="width: 100%;overflow: hidden" />
      </div>

      <div style="flex: 1;display: flex;align-items: center;justify-content: center">

        <el-form :model="user" style="width: 80%" :rules="rules" ref="registerRef">
          <div style="font-size: 20px;font-weight: bold;text-align: center;margin-bottom: 20px">注册</div>

          <el-form-item prop="email">
            <el-input prefix-icon="el-icon-user"  placeholder="请输入矿大邮箱" v-model="user.email"></el-input>
          </el-form-item>

          <el-form-item prop="code">
            <div style="display: flex">
              <el-input prefix-icon="el-icon-circle-check"  style="flex: 3;" placeholder="请输入验证码"
                        v-model="user.code"></el-input>
              <div style="flex: 1">
                <el-button  style="margin-left: 5px" type="primary" @click="getCode">获取验证码</el-button>
              </div>
            </div>
          </el-form-item>

          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock"  show-password placeholder="请输入密码"
                      v-model="user.password"></el-input>
          </el-form-item>

          <el-form-item prop="confirmPassword">
            <el-input prefix-icon="el-icon-lock"  show-password placeholder="请确认密码"
                      v-model="user.confirmPassword"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="danger " style="width: 100%" @click="register">注册</el-button>
          </el-form-item>
          <div style="display: flex">
            <div style="flex: 1">已有账号？请<span style= "color: #0f9876;cursor:pointer" @click="$router.push('/login')">登录</span></div>
          </div>

        </el-form>

      </div>

    </div>

  </div>
</template>

<script>
import ValidCode from "@/components/ValidCode";
import request from "@/Utils/request";

export default {
  name: "Login",
  components:{
    ValidCode
  },

  data(){
    return{
      user:{
        username:'',
        password:'',
        confirmPassword:'',
        code:'',
        codetype:1,
        email:''
      },
      code:'',
      rules:{
        email: [
          { required: true, message: '请输入矿大邮箱', trigger: 'blur' },
          { min: 12, max: 20, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入四位验证码', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{

    getCode(){
      if(/^\d{1,8}@cumt\.edu\.cn$/.test(this.user.email)||/^\d{1,8}@cumt\.cn$/.test(this.user.email)){
        this.user.codetype=1
        this.user.username=this.user.email.split('@')[0]

        request.post("/sendCode",this.user).then(res=>{
          if(res.code=='200'){
            this.$message.success("发送成功")
          }
          else {
            this.$message.error(res.msg)
          }
        })
      }
      else{
        this.$message.error("请输入矿大邮箱")
      }
    },
    register(){
      if(/^\d{1,8}@cumt\.edu\.cn$/.test(this.user.email)||/^\d{1,8}@cumt\.cn$/.test(this.user.email)){
        console.log('校验成功')

        this.$refs["registerRef"].validate((valid) => {
          console.log('发送成功')

          if (valid) {
            this.user.username=this.user.email.split('@')[0]
            request.post("/register",this.user).then(res=> {
              console.log(res)
              if(res.code=="200"){
                this.$router.push('/login')
                this.$message.success("注册成功")
              }
              else{
                this.$message.error(res.msg)
              }
            })
          }
        })
      }

    }
  }
}
</script>

<style scoped>

</style>