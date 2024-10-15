<template>
<div>
 <el-container>
   <el-header style="margin-top: 2px; height: 50px;">
     <div style="display: flex;justify-content: center;align-items: center;
      height: 100%;background-color: white">

       <div style="flex: 1" ></div>
       <div style="flex: 1;display: flex;justify-content: center;font-size: 15px" >
         <div style="margin:0 20px;cursor: pointer" @click="$router.push('/manage/userManage')" >用户管理</div>
         <div style="margin:0 20px;cursor: pointer" @click="$router.push('/manage/applyManage')">申请管理</div>
       </div>
       <div  style="flex: 1"></div>

     </div>
   </el-header>
   <el-container>
     <el-main>
       <div>
        <router-view/>
       </div>

     </el-main>
   </el-container>
 </el-container>

</div>
</template>

<script>
export default {
  name: "Manage",
  data(){
    return{
      userTable:[],

    }
  }
}
</script>

<style scoped>

</style>