<template>
  <div style="height: 100vh">
    <el-container style="height: 100vh;width: 100%" >
        <el-header style="height: 70px;">
                <div class="head">
                  <div style="flex: 1;display: flex;align-items: center" @click="$router.push('/home')">
                    <div ><img src="@/assets/logo.png" alt="" height="50" style="cursor: pointer;margin-left: 60px" ></div>
                    <div style="cursor: pointer;font-weight: bolder;font-size: 15px;letter-spacing:3px;">伊诺维克</div>
                  </div>

                  <div   style="flex: 2;display: flex;font-size:15px;justify-content: center">
                    <div style="display: flex">
                      <div class="headText"  @click="$router.push('/home')">网站首页
                        <div class="headUnderLineContainer"><div class="headUnderLine" ></div></div>  </div>
                      <div  class="headText"  @click="$router.push('/about')">关于实验室
                        <div class="headUnderLineContainer"><div class="headUnderLine" ></div></div></div>
                      <div  class="headText"  @click="$router.push('/openSource')">开源学习
                        <div class="headUnderLineContainer"><div class="headUnderLine" ></div></div></div>
                      <div  class="headText"  @click="$router.push('/roboCompetition')">机器人对抗赛
                        <div class="headUnderLineContainer"><div class="headUnderLine" ></div></div></div>
                      <div  class="headText" @click="$router.push('/memberCenter')">成员中心
                        <div class="headUnderLineContainer"><div class="headUnderLine" ></div></div></div>
                      <div  class="headText" @click="$router.push('/joinUs')">加入我们
                        <div class="headUnderLineContainer"><div class="headUnderLine" ></div></div></div>
                    </div>

                  </div>
                  <div  style="flex: 1; width: 0;display: flex;align-items: center;justify-content:flex-end">
                    <div v-if="!user.username" style="display:flex;justify-content: right;align-items: center">
                      <i class="el-icon-user" style="margin-right: 5px"></i>
                      <div  style="font-size: 15px;margin-right: 60px" @click="login">登录</div>
                    </div>

                    <div v-else style="margin-right: 80px">
                      <div >

                        <el-dropdown  placement="bottom" style="margin-right:10px">
                          <div style="display: flex;align-items: center;cursor:pointer;">
                            <img v-if="user.avatar" :src="user.avatar" style="cursor: pointer;height: 40px;width: 40px;border-radius: 50%">
                            <img v-else src="@/assets/defaultAvatar.jpg" style="height: 40px;width: 40px;border-radius: 50%">

                          </div>

                          <el-dropdown-menu slot="dropdown" style="width: 200px">

                            <el-dropdown-item style="text-align: center" @click.native="$router.push('/person')">个人中心</el-dropdown-item>
                            <el-dropdown-item style="text-align: center" @click.native="$router.push('/password')">修改密码</el-dropdown-item>
                            <el-dropdown-item style="text-align: center" @click.native="logout">退出登录</el-dropdown-item>

                          </el-dropdown-menu>

                        </el-dropdown>

                      </div>
                    </div>
                  </div>
                </div>
        </el-header>

      <!-- 中间的内容-->
        <el-container style="margin-top: 5px">
          <el-main class="scroll-container">
              <div>
                <router-view  @update:user="updateUser"/>
              </div>

            <div style="height: 30px;margin: 20px 0">
              <hr/>
              <div style="display: flex;align-items: center;justify-content: center">
                <a style="  text-decoration:none;color: #666666" href="https://beian.miit.gov.cn/" target="_blank">ICP备案号:黔ICP备2024022717号</a>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>

<script>

import Carousel from "@/components/Carousel";

export default {
  name:'mainView',
  components: {
    Carousel
  },
  data(){
    return{
      user:JSON.parse(localStorage.getItem("INVC-user")||'{}'),
    }
  },
  methods: {
    login(){
      this.$router.push("/login")
    },
    logout(){
      localStorage.removeItem("INVC-user")//清楚用户数据
      this.$router.push("/login")
    },
    updateUser(user){
      this.user=JSON.parse(JSON.stringify(user))  //深拷贝
    }
  },
}

</script>

<style>
.head {
  cursor:auto;

  width: 100%;
  display: flex;
  align-items: center;
  height: 70px;
  background-color: white;
  box-shadow: 5px 1px 3px rgba(0,21,41,35);
}
.headText{
  cursor: pointer!important;
  margin:0 20px
}

.headUnderLine{
  transition: .3s;
  margin-top: 5px;
  background-color: #ffffff;
  height: 5px;
  width: 0%;
}
.headUnderLineContainer{
  display: flex;
  align-items: center;
  justify-content: center;
}

.headText:hover .headUnderLine{
  transition: .3s;
  margin-top: 5px;
  background-color: #00317f;
  height: 5px;
  width: 80%;
  border-radius: 5px;
}



.el-header,.el-main{
  padding: 0!important;
  overflow: auto; /* 显示滚动条，根据内容决定是否显示 */
  /* 隐藏默认的滚动条样式 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.el-header::-webkit-scrollbar,.el-main::-webkit-scrollbar{
  display: none; /* Chrome, Safari, and Opera */
}
</style>


