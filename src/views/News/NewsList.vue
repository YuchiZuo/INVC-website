<template>
    <div>
      <div style="padding: 10px;">
        <ul style="list-style-type: none; padding: 0;">
          <li v-for="(newsItem, index) in news" :key="index" style="margin: 5px 0;">
            <a @click="openNewsDetail($event, index)" class="news-link">
              {{ newsItem.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import newsData from '@/views/News/newDate.json'; 
  
    export default {
        name: "NewsList",
        data() {
            return {
                news: newsData,
                selectedNews: null // 当前选中的新闻
            }
        },
        
        methods: {
            openNewsDetail(event, index) {
                event.preventDefault();
                const newsDetailUrl = `/news/${index}`; // 你希望打开的链接
                window.open(newsDetailUrl, '_blank'); // 新标签页打开
            }
        }
    }
  
  </script>
  
  <style scoped>
  .news-link {
    text-decoration: none; /* 去掉下划线 */
    color: #3f8de0; /* 链接颜色 */
    transition: color 0.3s; /* 平滑过渡 */
  }
  
  .news-link:hover {
    color: #084b92; /* 悬停时颜色 */
    text-decoration: underline; /* 悬停时下划线 */
  }
  </style>
  