<template>
  <HeaderArea />
  <main class="main">
    <UserCard />
  </main>
  <FooterArea />
</template>

<script setup lang="ts">
import HeaderArea from 'components/HeaderArea.vue';
import FooterArea from 'components/FooterArea.vue';
import UserCard from 'components/UserCard.vue';
</script>

<style lang="scss">
body {
  background-color: #101010;
}

.main {
  padding: 56px 16px;
  color: white;
}
</style>
