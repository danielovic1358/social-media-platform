<script setup lang="ts">
import axios from 'axios'
import { onBeforeMount, ref } from 'vue';
import router from './router'

let keyword = "";

const getPost = ref(<any>{})
const getAccountInformation = ref(<any>{})

async function loadPost() {
  const postsFromServer = await axios.get("http://localhost:3000")
  getPost.value = postsFromServer.data.posts
  getAccountInformation.value = postsFromServer.data.accounts
}

onBeforeMount(async() => {
  await loadPost()
})

function search(keyword : string) {
  router.push('/search/' + keyword.valueOf())
}

</script>

<template>
  <ul class="topnav">
    <a href="http://localhost:5173/home">
      <img class="icons" src="./assets/home.png" alt="Homebutton">
    </a>
    <a href="http://localhost:5173/friends">
      <img class="icons" src="./assets/friends.png" alt="Friendlist">
    </a>
    <input class="app" v-model="keyword" type="text">
    <img class="icons" src="./assets/searchicon.png" alt="Searchbutton" type="submit" v-on:click="search(keyword)" style="padding-left: 10px;">
  </ul>
<RouterView />
</template>

<style scoped></style>