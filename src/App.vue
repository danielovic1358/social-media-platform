<script setup lang="ts">
import axios from 'axios'
import "./assets/main.css";
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router'
import App from './App.vue'
import Friends from "./Friends.vue";
import Messages from "./Message.vue";
import Search from './Search.vue';
let keyword = "";
const routes = {
  "/": App,
  "/friends": Friends,
  "/messages": Messages,
  "/search/:keyword": Search
}
const getPost = ref(<any>{})
const getAccountInformation = ref(<any>{})

async function loadPost() {
  const postsFromServer = await axios.get("http://localhost:3000")
  getPost.value = postsFromServer.data.posts[0]
  getAccountInformation.value = postsFromServer.data.accounts[0]
}

onBeforeMount(async() => {
  await loadPost()
})

const router = useRouter()

function search(keyword : string) {
  router.push('/search/' + keyword.valueOf())
}

</script>

<template>
  
  <ul class="topnav">
    <a href="http://localhost:5173/">
      <img class="icons" src="./assets/home.png" alt="Homebutton">
    </a>
    <a href="http://localhost:5173/friends">
      <img class="icons" src="./assets/friends.png" alt="Friendlist">
    </a>
    <a href="http://localhost:5173/messages">
      <img class="icons" src="./assets/messages.png" alt="Messages">
    </a>
    <input v-model="keyword" type="text">
    <img class="icons" src="./assets/searchicon.png" alt="Searchbutton" type="submit"
      v-on:click="search(keyword)" style="padding-left: 10px;"> 
  </ul>

  <div class="flex-container">
    <div class="friendlist">
      <h1>Freundesliste</h1>
      <img class="profiles" :src="getAccountInformation.accountURL" alt="Profile">
      <h3>{{ getAccountInformation.accountname }}</h3>
    </div>
    <div>
      <span class="forpost">
       <img class="posts" :src="getPost.imageURL" alt="Beitrag">
       <div class="rectangle">
        <p>{{ getPost.postcaption }}</p>
       </div>
      </span>
    </div>
    <div>
      <span class="arrowkeys">
        <button onclick="alert('Letzter Beitrag.')"><img class="arrowkeys" src="./assets/arrowup.png"></button>
        <button onclick="alert('Nächster Beitrag.')"><img class="arrowkeys" src="./assets/arrowdown.png"></button>
      </span>
    </div>
  </div>
</template>

<style scoped></style>