<template>
  <div class="open-source-forum">
    <el-container style="height: calc(100vh - 70px - 5px)">
      <el-aside style="width: 200px">
        <el-menu router style="height: calc(100vh - 70px - 5px)">
          <el-menu-item v-for="(category, index) in categories" :key="index" :index="'/forum/' + category.slug">
            <i :class="category.icon"></i>
            <span slot="title">{{ category.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <h1>Open Source Forum</h1>
        <el-input v-model="searchQuery" placeholder="Search posts" prefix-icon="el-icon-search"></el-input>
        <el-divider></el-divider>
        <div class="post-list">
          <Post v-for="post in filteredPosts" 
      :key="post.id" 
      :id="post.id"
      :title="post.title"
      :content="post.excerpt"
      :author="post.author"
      :date="post.date"
      :category="post.category"
      :comments="post.comments || []"
/>

        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import User from '@/views/Forum/Users';
import Post from '@/views/Forum/Post';
import Post from '@/views/Forum/Post.vue';

export default {
  name: "OpenSource",
  data() {
    return {
      categories: [
        // ... (keep your existing categories)
      ],
      posts: [
        new Post(1, 'How to Contribute to Open Source Projects', 'Learn the best practices for contributing to open source projects and make your first pull request.', new User(1, 'OpenSourceEnthusiast', 'opensource@example.com', 'avatar1.jpg'), '2023-05-20', 'projects'),
        new Post(2, 'Python vs JavaScript: Which is Better for Beginners?', 'A comprehensive comparison of Python and JavaScript for those just starting their coding journey.', new User(2, 'CodeNewbie', 'newbie@example.com', 'avatar2.jpg'), '2023-05-19', 'languages'),
        new Post(3, 'Top 10 VS Code Extensions for Web Developers', 'Boost your productivity with these must-have Visual Studio Code extensions for web development.', new User(3, 'WebDevPro', 'webdev@example.com', 'avatar3.jpg'), '2023-05-18', 'tools')
      ],
      searchQuery: ''
    }
  },
  // ... (keep your existing computed properties and methods)
}
</script>


<script>
export default {
  name: "OpenSource",
  data() {
    return {
      categories: [
        { name: 'All Posts', slug: 'all', icon: 'el-icon-document' },
        { name: 'Project Discussions', slug: 'projects', icon: 'el-icon-folder-opened' },
        { name: 'Programming Languages', slug: 'languages', icon: 'el-icon-notebook-2' },
        { name: 'Development Tools', slug: 'tools', icon: 'el-icon-suitcase' },
        { name: 'Tech Q&A', slug: 'qa', icon: 'el-icon-question' },
        { name: 'Community', slug: 'community', icon: 'el-icon-user' }
      ],
      posts: [
        { id: 1, title: 'How to Contribute to Open Source Projects', author: 'OpenSourceEnthusiast', date: '2023-05-20', comments: 15, excerpt: 'Learn the best practices for contributing to open source projects and make your first pull request.' },
        { id: 2, title: 'Python vs JavaScript: Which is Better for Beginners?', author: 'CodeNewbie', date: '2023-05-19', comments: 32, excerpt: 'A comprehensive comparison of Python and JavaScript for those just starting their coding journey.' },
        { id: 3, title: 'Top 10 VS Code Extensions for Web Developers', author: 'WebDevPro', date: '2023-05-18', comments: 24, excerpt: 'Boost your productivity with these must-have Visual Studio Code extensions for web development.' }
      ],
      searchQuery: ''
    }
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(post => 
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  }
}
</script>

<style scoped>
.open-source-forum {
  height: 100%;
}

.el-main {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.post-list {
  margin-top: 20px;
}

.post-card {
  margin-bottom: 20px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-content p {
  margin-bottom: 10px;
}

.post-meta {
  font-size: 0.9em;
  color: #909399;
}

.post-meta span {
  margin-right: 15px;
}

.post-meta i {
  margin-right: 5px;
}
</style>
