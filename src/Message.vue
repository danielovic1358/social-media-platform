<script setup lang="ts">
import router from './router'

function search(keyword : string) {
  router.push('/search/' + keyword.valueOf())
}

</script>

<template>

</template>

<style scoped></style>