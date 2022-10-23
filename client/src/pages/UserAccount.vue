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

<style setup lang="scss">
.main {
  padding: 56px 16px;
  color: white;
}
</style>
