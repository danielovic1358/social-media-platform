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
  <div class="flex-container" v-if="getAccountInformation[0].profileURL && getAccountInformation[0].accountname">
      <div class="friendlist">
          <h1>Freundesliste</h1>
          <img class="profiles" :src="getAccountInformation[0].profileURL" alt="Profile">
          <h3>{{ getAccountInformation[0].accountname }}</h3>
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
              <img class="posts" :src="getPost[currentPost.valueOf()].imageURL" alt="Beitrag">
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
@font-face {
  font-family: 'Postfont';
  src: url('fonts/QurovaDEMO-Regular.otf')
  format('truetype')
}

h1 {
  font-family: Arial;
  font-size: 28px;
}

h3 {
  font-family: Arial;
  font-size: 18px;
}

p {
  font-family: Postfont;
  font-size: 18px;
}

header {
  background-color: lavender;
}

body {
  background-color: lavender;
}

ul.topnav {
  border-radius: 20px;
  display: flex;
  list-style-type: none;
  background-color: gray;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 50px;
}

ul.topnav>a {
  padding-right: 30px
}

div.flex-container {
  display: flex;
  flex-direction: row;
  padding-left: 30px;
  padding-right: 30px;
}

div.flex-container>div {
  margin-right: auto;
}

div.friendlist {
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  background-color: gray;
}

img.icons {
  width: 50px;
  height: 50px;
}

img.profiles {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

img.posts {
  width: 600px;
  height: 600px;
}

img.arrowkeys {
  width: 75px;
  height: 75px;
  padding-top: 10px;
}

button.navigation {
  font-family: Arial;
  font-size: 20px;
  width: 175px;
  height: 100px;
  border-radius: 20px;
  margin-top: 20px;
  background-color: bisque;
}

button.arrowkeys {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: bisque;
}

span.forpost {
  display: block;
}

.rectangle {
  height: 100px;
  width: 600px;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
}

span.arrowkeys {
  display: block;
  width: 100px;
  height: 100px;
}

input {
  margin-left: auto;
  border-radius: 30px;
  padding: 10px;
  font-size: 16px;
}
</style>