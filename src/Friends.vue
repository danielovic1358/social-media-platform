<script setup lang="ts">
import './assets/friends.css'
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'

const selectedUser = ref(null)
const getPost = ref(<any>{})
const getAccountInformation = ref(<any>{})

function openChat(user : null) {
  selectedUser.value = user
}

async function loadPost() {
  const postsFromServer = await axios.get("http://localhost:3000")
  getPost.value = postsFromServer.data.posts
  getAccountInformation.value = postsFromServer.data.accounts
}

onBeforeMount(async() => {
  await loadPost()
})

</script>

<template>
  <div class="flexbox">
    <div class="friendlist">
      <h1>Freundesliste</h1>

      <a @click="openChat(getAccountInformation[0].accountname)">
        <div>
          <img class="profiles" :src="getAccountInformation[0].profileURL" alt="Profile">
          <h3>{{ getAccountInformation[0].accountname }}</h3>
        </div>
      </a>

      <a @click="openChat(getAccountInformation[1].accountname)">
        <div>
          <img class="profiles" :src="getAccountInformation[1].profileURL" alt="Profile">
          <h3>{{ getAccountInformation[1].accountname }}</h3>
        </div>
      </a>

      <a @click="openChat(getAccountInformation[2].accountname)">
        <div>
          <img class="profiles" :src="getAccountInformation[2].profileURL" alt="Profile">
          <h3>{{ getAccountInformation[2].accountname }}</h3>
        </div>
      </a>

    </div>
    <div class="chatbox" v-if="selectedUser">
      <h2>Chat - {{ selectedUser }}</h2>
      <div class="rectangle-friendmessage">
        <p>Also, ich komme in zwei Wochen aus dem Urlaub, nur damit du Bescheid weißt.</p>
      </div>
      <div class="rectangle-message">
        <p>Ja, weil ich würde dann, wenn du wiederkommst, in den Urlaub gehen, damit wir nicht unterbesetzt sind.</p>
      </div>
      <input class="chat">
      <img class="icon" src="./assets/messages.png" alt="Submit" type="submit" v-on:click="console.log('Nachricht abgesendet.')" style="padding-left: 10px;">
    </div>
  </div>  
</template>

<style scoped></style>