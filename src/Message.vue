<script setup lang="ts">
import "./assets/main.css";
import Friends from "./Friends.vue";
import Messages from "./Message.vue";
let keyword = "";
const routes = {
    "/friends": Friends,
    "/messages": Messages,
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
    <a href="http://localhost:5173/">
      <img class="icons" src="./assets/messages.png" alt="Messages">
    </a>
    <input v-model="keyword" type="text">
    <img class="icons" src="./assets/searchicon.png" alt="Searchbutton" type="submit"
      v-on:click="console.log('Suche wird ausgeführt. Es wird nach ' + keyword + ' gesucht.')" style="padding-left: 10px;"> 
  </ul>

  <div class="flex-container">
    <div class="friendlist">
      <h1>Freundesliste</h1>
      <img class="profiles" src="./assets/account1.png">
    </div>
    <div>
      <img class="posts" src="./assets/test1.jpg">
      <span class="arrowkeys">
        <button onclick="alert('Letzter Beitrag.')"><img class="arrowkeys" src="./assets/arrowup.png"></button>
        <button onclick="alert('Nächster Beitrag.')"><img class="arrowkeys" src="./assets/arrowdown.png"></button>
      </span>
    </div>

  </div>
</template>

<style scoped></style>