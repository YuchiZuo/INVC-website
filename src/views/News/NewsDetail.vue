<template>
    <div>
      <!-- <h1 v-if="newsItem">{{ newsItem.title }}</h1> -->
      <div v-if="markdownContent" v-html="markdownContent"></div>
      <p v-else>新闻未找到</p>
    </div>
  </template>
  
  <script>
  import newsData from '@/views/News/newDate.json';
  import { marked } from 'marked'; // 导入 marked 库
  
  export default {
    name: "NewsDetail",
    data() {
      return {
        markdownContent: ''
      };
    },
    computed: {
      newsItem() {
        const id = Number(this.$route.params.id);
        return newsData[id] || null; // 直接返回新闻项
      }
    },
    created() {
      const id = Number(this.$route.params.id);
  
      if (this.newsItem) {
        fetch(this.newsItem.contentFile)
          .then(response => {
            if (!response.ok) {
              throw new Error('网络响应不正确');
            }
            return response.text();
          })
          .then(content => {
            this.markdownContent = marked(content); // 解析 Markdown 内容
          })
          .catch(err => {
            console.error("加载Markdown文件失败:", err);
          });
      } else {
        console.error("新闻未找到");
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  