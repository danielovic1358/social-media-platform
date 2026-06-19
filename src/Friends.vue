<script setup lang="ts">
import router from './router'
import Home from "./Home.vue"
import Friends from "./Friends.vue";
import Messages from "./Message.vue";
import Search from "./Search.vue";
let keyword = "";
const routes = {
  "/home": Home,
  "/friends": Friends,
  "/messages": Messages,
  "/search/:keyword": Search
}

function search(keyword : string) {
  router.push('/search/' + keyword.valueOf())
}

</script>

<template>

</template>

<style scoped></style>