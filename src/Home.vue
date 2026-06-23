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
  const postsFromServer = await axios.get("http://localhost:3000/post")
  const accountsFromServer = await axios.get("http://localhost:3000/account")
  getPost.value = postsFromServer.data
  getAccountInformation.value = accountsFromServer.data
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
  <div class="flex-container" v-if="getAccountInformation && getPost">
      <div class="friendlist">
          <h1>Freundesliste</h1>
          <img class="profiles" :src="getAccountInformation[16].profileURL" alt="Profile">
          <h3>{{ getAccountInformation[16].accountname }}</h3>
          <img class="profiles" :src="getAccountInformation[1].profileURL" alt="Profile">
          <h3>{{ getAccountInformation[1].accountname }}</h3>
          <img class="profiles" :src="getAccountInformation[2].profileURL" alt="Profile">
          <h3>{{ getAccountInformation[2].accountname }}</h3>
          <a href="http://localhost:5173/friends">
              <button class="navigation">Alle Freunde anzeigen</button>
          </a>
      </div>

      <div v-if="getPost">
          <span class="forpost">
              <img class="posts" :src="getPost[currentPost.valueOf()].postURL" alt="Beitrag">
              <div class="rectangle">
                  <p>{{ getPost[currentPost.valueOf()].postcaption }}</p>
              </div>
          </span>
      </div>

      <div>
          <span class="arrowkeys">
              <button class="arrowkeys" @click="previousPost()"><img class="arrowkeys" src="./assets/arrowup.png"></button>
              <button class="arrowkeys" @click="nextPost()"><img class="arrowkeys" src="./assets/arrowdown.png"></button>
          </span>
      </div>
  </div>
</template>

<style scoped>

</style>