<template>
  <div style="display:flex;height:100vh;overflow:hidden;align-items:center;justify-content:center;background-color:#eff1f5">

  <div style="display: flex;background-color: white;border-radius: 5px;overflow: hidden;width: 60%">
    <div style="flex: 1">
       <img src="@/assets/login.png" alt="" style="width: 100%;overflow: hidden" />
    </div>

    <div style="flex: 1;display: flex;align-items: center;justify-content: center">

        <el-form :model="user" style="width: 80%" :rules="rules" ref="loginRef">
          <div style="display: flex;justify-content: right;font-size: 20px" @click="$router.push('/')"><i class="el-icon-close"></i></div>
          <div style="font-size: 20px;font-weight: bold;text-align: center;margin-bottom: 20px">登录</div>

          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user"  placeholder="请输入学号/工号" v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock"  show-password placeholder="请输入密码"
                      v-model="user.password"></el-input>
          </el-form-item>

          <el-form-item prop="validCode">
            <div style="display: flex">
              <el-input @keyup.enter.native="login" prefix-icon="el-icon-circle-check"  style="flex: 3;" placeholder="请输入验证码"
                        v-model="user.validCode"></el-input>
              <div style="flex: 1">
                <valid-code style="height: 36px" @input="getValidCode"  />
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary " style="width: 100%" @click="login">登录</el-button>
          </el-form-item>
          <div style="display: flex">
            <div style="flex: 1">还没有账号？请<span style= "color: #0f9876;cursor:pointer" @click="$router.push('/register')">注册</span></div>

            <div @click="handleForgetPass" style="flex: 1;text-align: right;color: #0f9876;cursor: pointer" >忘记密码</div>
          </div>
        </el-form>

      </div>

  </div>

    <el-dialog title="忘记密码" :visible.sync="forgetPassDialogVis" width="30%">
      <el-form :model="forgetUserForm" label-width="80px" :rules="rules" ref="forgetRef">

        <el-form-item label="邮箱" style="padding-right: 20px" prop="email">
          <el-input v-model="forgetUserForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="code">
          <div style="display: flex">
            <el-input prefix-icon="el-icon-circle-check"  style="flex: 2;" placeholder="请输入验证码"
                      v-model="forgetUserForm.code"></el-input>
            <div style="flex: 1">
              <el-button  style="margin-left: 5px" type="primary" @click="getCode">获取验证码</el-button>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="新密码" style="padding-right: 20px" prop="password">
          <el-input v-model="forgetUserForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" style="padding-right: 20px"  prop="confirmPassword">
          <el-input v-model="forgetUserForm.confirmPassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="forgetPassDialogVis = false">取 消</el-button>
        <el-button type="primary" @click="resetPassword">确 定</el-button>
      </div>
    </el-dialog>

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
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      }
      else if(value !== this.validCode){
        if(value === this.validCode.toLowerCase()){
          callback()
        }
        else {
          callback(new Error("验证码错误"))
        }
      }
      else {
        callback()
      }
    };
    const confirmPass = (rule, confirmPassword, callback) => {
      if (confirmPassword === '') {
        callback(new Error('请确认密码'))
      }
      else if(confirmPassword !== this.forgetUserForm.password){
        callback(new Error("两次输入的密码不一致"))
      }
      else {
        callback()
      }
    };
    return{
      user:{
        username:'',
        password:'',
        validCode:'',
        code:''
      },
      validCode:'',
      code:'',
      forgetUserForm:{},//忘记密码表单数据
      forgetPassDialogVis:false,
      rules:{
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入矿大邮箱', trigger: 'blur' },
          { min: 12, max: 20, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: confirmPass, trigger: 'blur' }

        ],
        code:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入四位验证码', trigger: 'blur' }
        ],
        validCode: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    resetPassword(){
      if(/^\d{1,8}@cumt\.edu\.cn$/.test(this.forgetUserForm.email)||/^\d{1,8}@cumt\.cn$/.test(this.forgetUserForm.email)){
        this.$refs["forgetRef"].validate((valid) => {
          if (valid) {
            this.forgetUserForm.username=this.forgetUserForm.email.split('@')[0]
            this.forgetUserForm.codetype=2
            request.put("/password",this.forgetUserForm).then(res=> {
              console.log(res)
              if(res.code=="200"){
                this.forgetPassDialogVis = false
                this.$message.success("修改成功")
              }
              else{
                this.$message.error(res.msg)
              }
            })
          }
        })
      }
    },
    handleForgetPass(){
      this.forgetUserForm={}
      this.forgetPassDialogVis=true
    },
    getCode(){
      if(/^\d{1,8}@cumt\.edu\.cn$/.test(this.forgetUserForm.email)||/^\d{1,8}@cumt\.cn$/.test(this.forgetUserForm.email)){
        this.forgetUserForm.codetype=2
        this.forgetUserForm.username=this.forgetUserForm.email.split('@')[0]

        request.post("/sendCode",this.forgetUserForm).then(res=>{
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
    getValidCode(code){
      this.validCode=code
    },
    login(){
      this.$refs["loginRef"].validate((valid) => {
        if (valid) {
          request.post("/login",this.user).then(res=>{
            if(res.code=="200"){
              console.log(res)
              this.$router.push('/')
              this.$message.success("登录成功")
              localStorage.setItem("INVC-user",JSON.stringify(res.data))//存储用户信息
            }
            else this.$message.error(res.msg)
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>