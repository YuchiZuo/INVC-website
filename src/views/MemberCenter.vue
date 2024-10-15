<template>

  <div style="height: calc(100vh - 70px - 10px) ">

      <el-container v-if="user.name" style="height: 100%">

        <el-aside  :width=asideWidth style="height: 100%;background-color:#001529">

          <!--        <div style="margin-top: 20px;color: white;display: flex;-->
          <!--                  align-items: center;justify-content: center">-->
          <!--          <div class="sideUp" @click="handleCollapse">-->
          <!--            <i :class="collapseIcon" style="font-size: 25px"></i>-->
          <!--          </div>-->
          <!--        </div>-->

          <el-menu :collapse="isCollapse" :collapse-transition="false"  router background-color="#001529"
                   text-color="white"
                   active-text-color="#fff" style="  margin-top: 30px; border: none" :default-active="$route.path">

            <el-menu-item index="/memberCenter/centerHome">
              <i class="el-icon-house"></i>
              <span slot="title">系统首页</span>
            </el-menu-item>

            <el-menu-item index="/memberCenter/apply">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">报名申请</span>
            </el-menu-item>

            <el-menu-item index="/memberCenter/materials">
              <i class="el-icon-s-cooperation"></i>
              <span slot="title">物资系统</span>
            </el-menu-item>

            <el-menu-item index="/memberCenter/home">
              <i class="el-icon-chat-line-square"></i>
              <span slot="title">新闻通知</span>
            </el-menu-item>

            <el-menu-item v-if="user.role==='实验室负责人'" index="/manage">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">管理</span>
            </el-menu-item>

          </el-menu>

        </el-aside>

        <el-container>

          <el-main>
            <div>
              <router-view />
            </div>
          </el-main>
        </el-container>

      </el-container>
      <div v-else style="height: calc(100vh - 70px);display: flex;align-items: center;justify-content: center">
      <div style="display: flex;font-size: 20px">
        请完善个人信息·······
        <span>
     <router-link to="/person">点击跳转</router-link>
    </span>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  name: "MemberCenter",
  data(){
    return{
      mainContainerMargin:"150",
      isCollapse:false,
      asideWidth:'150px',
      collapseIcon:'el-icon-s-fold',
      users: [],
      user:JSON.parse(localStorage.getItem("INVC-user")||'{}'),
      url:'',
      urls:[]

    }
  },
  methods:{

    handleCollapse(){
      this.isCollapse=! this.isCollapse
      this.asideWidth=this.isCollapse ? '64px':'150px'
      this.collapseIcon=this.isCollapse ?'el-icon-s-fold':'el-icon-s-unfold'
      this.mainContainerMargin=this.isCollapse ? '64px':'150px'

    },
    handleFull(){
      document.documentElement.requestFullscreen()
    },
    updateUser(user){
      this.user=JSON.parse(JSON.stringify(user))
    }

  }
}
</script>

<style scoped>
/*.sideUp{*/
/*  display: flex;*/
/*  align-items: center;*/
/*  justify-content: center;*/
/*  height: 50px;*/
/*  width: 5px;*/
/*  background-color: red;*/
/*}*/


.el-menu--inline .el-menu-item {
  background-color: #000c17 !important;
}
.el-menu-item:hover,.el-submenu__title:hover {
  color: #fff !important;
}
.el-submenu__title:hover i{
  color: #fff !important;
}
.el-menu-item.is-active {
  background-color: #1890ff !important;
  border-radius: 5px;
}

.el-menu-item{
  height: 40px !important;
  line-height: 40px  !important;
}
.el-submenu__title{
  height: 40px !important;
  line-height: 40px  !important;
}

.el-aside{
  transition:width .3s;
  box-shadow: 2px 0 6px rgba(0,21,41,35);
}

.logo-title{
  font-size: 20px;
  transition: all .3s !important;
}
.el-header{
  display: flex;
  align-items: center;
  box-shadow: 2px 0 6px rgba(0,21,41,35) !important;
}

</style>