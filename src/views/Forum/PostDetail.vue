<template>
    <div class="post-detail">
      <h1>{{ post.title }}</h1>
      <div class="post-meta">
        <span><i class="el-icon-user"></i> {{ post.author.username }}</span>
        <span><i class="el-icon-date"></i> {{ post.date }}</span>
        <span><i class="el-icon-folder"></i> {{ post.category }}</span>
      </div>
      <div class="post-content">
        {{ post.content }}
      </div>
      <div class="comments-section">
        <h2>Comments</h2>
        <div v-for="comment in post.comments" :key="comment.id" class="comment">
          <p>{{ comment.content }}</p>
          <span>By {{ comment.author.username }} on {{ comment.date }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Post from '@/models/Post';
  
  export default {
    name: 'PostDetail',
    props: {
      postId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        post: null
      }
    },
    created() {
      // Fetch post data from API or Vuex store
      // For now, we'll use a dummy post
      this.post = new Post(this.postId, 'Sample Post', 'This is a sample post content.', { username: 'JohnDoe' }, '2023-05-21', 'general');
    }
  }
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  