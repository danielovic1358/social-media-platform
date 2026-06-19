<script setup lang="ts">
import './assets/main.css'
import axios from 'axios'
import { onBeforeMount, ref } from 'vue';
import router from './router'
import Home from './Home.vue'
import Friends from "./Friends.vue";
import Messages from "./Message.vue";
import Search from './Search.vue';
let keyword = "";
const routes = {
  "/home": Home,
  "/friends": Friends,
  "/messages": Messages,
  "/search/:keyword": Search
}
const getPost = ref(<any>{})
const getAccountInformation = ref(<any>{})
const currentPost = ref(0)

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

function nextPost() {
  if (getPost.value[currentPost.value + 1] !== undefined) {
    currentPost.value++
  } else {
    alert("Dies ist der letzte geladene Post.")
    currentPost.value = 0
  }
}

function previousPost() {
  if (currentPost.value > 0) {
    currentPost.value--
  } else if (currentPost.value == 0) {
    alert("Dies ist der erste Post.")
  }
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
    <a href="http://localhost:5173/messages">
      <img class="icons" src="./assets/messages.png" alt="Messages">
    </a>
    <input v-model="keyword" type="text">
    <img class="icons" src="./assets/searchicon.png" alt="Searchbutton" type="submit" v-on:click="search(keyword)" style="padding-left: 10px;">
  </ul>
<RouterView />
</template>

<style scoped></style>