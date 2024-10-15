<template>
  <div>
    <!-- 轮播图-->
    <div>
      <Carousel :items="items" :interval="interval" />
    </div>
    <!--第二排-->
    <div style="display: flex">
      <!--新闻-->
      <div style="flex: 1;display: flex;justify-content: center">
        <el-card style="width: 95%;height: 250px" >
          <div style="text-align: center;text-decoration: underline;
  text-decoration-style: solid;
  text-decoration-color:#22d2fb;
  text-decoration-thickness: 2px;
  text-underline-offset: 10px;
  /* text-decoration-width: 2px; */
" >
            新闻
          </div>

          <div style="flex: 1; display: flex; justify-content: center">
        <NewsList />
      </div>

        </el-card >

      </div>
      <div style="flex: 1;display: flex;justify-content: center">
        <!--日常-->
        <el-card style="width: 95%;height: 250px" >
          <div style="text-align: center">
            通知
          </div>
        </el-card>
      </div>

      <div style="flex: 1;display: flex;justify-content: center">
        <!--日常-->
        <el-card style="width: 95%;height: 250px" >
          <div style="text-align: center">
            日常
          </div>
        </el-card>
      </div>

    </div>
  </div>

</template>

<script>
import Carousel from "@/components/Carousel";
import NewsList from "@/views/News/NewsList.vue";
export default {
  name: "home",
  components: {
    Carousel,
    NewsList 
  },
  data(){
    return{
      items: [
        {
          image: "homePicture1.jpg",
          title: '标题一',
          description: '描述一'
        },
        {
          image:"homePicture2.jpg",
          title: '标题二',
          description: '描述二'
        },
        {
          image:"homePicture3.jpeg",
          title: '标题三',
          description: '描述三'
        }
      ],
      interval: 2500
    }
  },
  methods: {


  },

}
</script>

<style scoped>

</style>