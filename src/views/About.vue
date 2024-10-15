<template>
<div>
  <el-container style="height: calc(100vh - 70px - 5px)">
    <el-aside style="width: 200px">
      <el-menu  router style="height: calc(100vh - 70px - 5px)">

        <el-menu-item index="/about/brief" >
          <i class="el-icon-reading"></i>
          <span slot="title">实验室简介</span>
        </el-menu-item>

        <el-menu-item index="/about/history">
          <i class="el-icon-data-line"></i>
          <span slot="title">发展历程</span>
        </el-menu-item>

        <el-menu-item  index="/about/culture">
          <i class="el-icon-notebook-2"></i>
          <span slot="title">实验室文化</span>
        </el-menu-item>

        <el-menu-item  index="/about/honor">
          <i class="el-icon-medal"></i>
          <span slot="title">实验室荣誉</span>
        </el-menu-item>

        <el-menu-item  index="/about/team">
          <i class="el-icon-magic-stick"></i>
          <span slot="title">团队成员</span>
        </el-menu-item>

        <el-menu-item  index="/about/resp">
          <i class="el-icon-discover"></i>
          <span slot="title">历任负责人</span>
        </el-menu-item>



      </el-menu>
    </el-aside>


    <el-container style="margin-left: 5px">

      <el-header style="background-color: white;display: flex;align-items: center">
        <div style="margin-left: 20px">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/about' }">关于</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.name }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-header>
      <el-container>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>


  </el-container>
</div>
</template>

<script>
export default {
  name: "About"
}
</script>
<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f3f4f6;
  color: #333;
  margin: 0;
  padding: 0;
}
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.jumbotron {
  background-color: #007bff;
  color: #fff;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 40px;
}
.timeline h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}
.timeline li {
  margin-bottom: 20px;
}
.core-values h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}
</style>