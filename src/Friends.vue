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
  const accountsFromServer = await axios.get("http://localhost:3000/account")
  getAccountInformation.value = accountsFromServer.data
}

onBeforeMount(async() => {
  await loadPost()
})

</script>

<template>
  <div class="flexbox">
    <div class="friendlist">
      <h1>Freundesliste</h1>

      <a @click="openChat(getAccountInformation[16].accountname)">
        <div>
          <img class="profiles" :src="getAccountInformation[16].profileURL" alt="Profile">
          <h3>{{ getAccountInformation[16].accountname }}</h3>
        </div>
      </a>

      <a @click="openChat(getAccountInformation[16].accountname)">
        <div>
          <img class="profiles" :src="getAccountInformation[16].profileURL" alt="Profile">
          <h3>{{ getAccountInformation[16].accountname }}</h3>
        </div>
      </a>

      <a @click="openChat(getAccountInformation[16].accountname)">
        <div>
          <img class="profiles" :src="getAccountInformation[16].profileURL" alt="Profile">
          <h3>{{ getAccountInformation[16].accountname }}</h3>
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