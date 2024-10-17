<template>
    <div class="post">
      <h2 class="post-title">{{ title }}</h2>
      <div class="post-meta">
        <User :id="author.id" :username="author.username" :email="author.email" :avatar="author.avatar" />
        <span class="post-date">{{ formattedDate }}</span>
        <span class="post-category">{{ category }}</span>
      </div>
      <div class="post-content">
        {{ content }}
      </div>
      <div class="post-comments">
        <h3>Comments ({{ comments.length }})</h3>
        <ul>
          <li v-for="comment in comments" :key="comment.id">
            {{ comment.content }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import User from './Users.vue'
  
  export default {
    name: 'Post',
    components: {
      User
    },
    props: {
      id: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      author: {
        type: Object,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      comments: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      formattedDate() {
        return new Date(this.date).toLocaleDateString()
      }
    },
    methods: {
      addComment(comment) {
        this.comments.push(comment)
      }
    }
  }
  </script>
  
  <style scoped>
  .post {
    border: 1px solid #ddd;
    padding: 20px;
    margin-bottom: 20px;
  }
  .post-title {
    margin-top: 0;
  }
  .post-meta {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .post-date, .post-category {
    margin-left: 10px;
    font-size: 0.9em;
    color: #666;
  }
  .post-content {
    margin-bottom: 20px;
  }
  .post-comments ul {
    padding-left: 20px;
  }
  </style>
  