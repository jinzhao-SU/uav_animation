<template>
  <div>
    <h1>Lastest Posts</h1>
    <div>
      <label for="create-post">Say Something....</label>
      <input type="text" id="create-post" v-model="text" placeholder="create a post">
      <button v-on:click="createPost">Post!</button>
    </div>
    <hr>
    <p v-if="error">{{error}}</p>
    <div>
      <div
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post.text"
        v-on:dblclick="deletePost(post.text)"
      >
      {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}
      <p>{{post.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService'

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: '',
    }
  },
  async created () {
    try {
      this.posts = await PostService.getPosts();
      console.log(this.posts)
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
