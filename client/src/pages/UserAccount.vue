<template>
  <div v-if="user.authenticated">
    <HeaderArea />
    <main class="main">
      <UserCard />
    </main>
    <FooterArea />
  </div>
</template>

<script setup lang="ts">
import HeaderArea from 'components/HeaderArea.vue';
import FooterArea from 'components/FooterArea.vue';
import UserCard from 'components/UserCard.vue';
import { userStore } from 'src/stores/userStore';
import { onMounted } from 'vue';

const user = userStore();

// Verifica se o usuário está autenticado. Se sim, continua na página, caso contrário, o redireciona.
async function handleUserAuth() {
  await user.verify();

  if (!user.authenticated) location.hash = '/signup';
}

onMounted(() => handleUserAuth());
</script>

<style setup lang="scss">
.main {
  padding: 56px 16px;
  color: white;
}
</style>
