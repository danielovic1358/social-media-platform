<script setup lang="ts">
import axios from 'axios'
import "./assets/main.css";
import { onBeforeMount, ref } from 'vue';
import Friends from "./Friends.vue";
import App from './App.vue'
import Messages from "./Message.vue";
import Search from "./Search.vue"
let keyword = "";
const routes = {
  "/": App,
  "/friends": Friends,
  "/messages": Messages,
  "/search/:keyword": Search
}
const getPost = ref(<any>{})

async function loadPost() {
  const postFromServer = await axios.get("http://localhost:3000/posts")
  getPost.value = postFromServer.data[0]
}

onBeforeMount(async() => {
  await loadPost()
})
</script>