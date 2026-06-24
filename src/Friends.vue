<script setup lang="ts">
import './assets/friends.css'
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'

type msg = {
    recieverid: number;
    senderid: number;
    message: string;
}

const selectedUser = ref()
const getAccountInformation = ref(<any>{})
const loadedChats = ref(<any>{})
const messages = ref(<msg[]>[])
const input = ref(<string>{})

function openChat(user : number) {
  selectedUser.value = user
  getChatMsg(user)
}

async function loadAccountandChat() {
  const accountsFromServer = await axios.get("http://localhost:3000/account")
  const chatsFromServer = await axios.get("http://localhost:3000/chat")
  loadedChats.value = chatsFromServer.data
  getAccountInformation.value = accountsFromServer.data
}

function getChatMsg(id: number) {
  messages.value = loadedChats.value.filter((msg: msg ) => msg.senderid == id);
}

onBeforeMount(async() => {
  await loadAccountandChat()
})

function sendMessage(input : string) {
  const field = document.getElementById('chat')
  const chatDiv = document.createElement('div')
  chatDiv.classList.add('rectangle-message')
  const message = document.createElement('p')
  message.textContent = input
  chatDiv.appendChild(message)
  field?.appendChild(chatDiv)
}

</script>

<template>
  <div class="flexbox">
    <div class="friendlist">
      <h1>Freundesliste</h1>

      <a @click="openChat(getAccountInformation[0].accountid)">
        <div>
          <img class="profiles" :src="getAccountInformation[0].profileURL" alt="Profile">
          <h3>{{ getAccountInformation[0].accountname }}</h3>
        </div>
      </a>

      <a @click="openChat(getAccountInformation[1].accountid)">
        <div>
          <img class="profiles" :src="getAccountInformation[1].profileURL" alt="Profile">
          <h3>{{ getAccountInformation[1].accountname }}</h3>
        </div>
      </a>

      <a @click="openChat(getAccountInformation[3].accountid)">
        <div>
          <img class="profiles" :src="getAccountInformation[3].profileURL" alt="Profile">
          <h3>{{ getAccountInformation[3].accountname }}</h3>
        </div>
      </a>

    </div>
    <div id="chat" class="chatbox" v-if="selectedUser">
      <h2>Chat - {{ selectedUser }}</h2>
      <div v-for="message in messages" class="rectangle-friendmessage">
          <p>{{message.message}}</p>
      </div>
      <input class="chat" v-model="input" type="text">
      <img class="icon" src="./assets/messages.png" alt="Submit" type="submit" v-on:click="sendMessage(input)" style="padding-left: 10px;">
    </div>
  </div>  
</template>

<style scoped></style>