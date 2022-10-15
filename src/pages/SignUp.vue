<template>
  <div class="container">
    <div class="card">
      <h1 class="title">Crie sua conta</h1>
      <form class="form">
        <q-input v-model="userData.name" label="Nome" dark />
        <q-input v-model="userData.email" label="E-mail" dark />
        <q-input v-model="userData.password" label="Senha" dark />
      </form>
      <q-btn
        :loading="loading[0]"
        color="primary"
        @click="simulateProgress(0)"
        label="Cadastrar"
      />
      <footer class="footer">
        <span class="text">Já possui uma conta?</span>
        <a href="" class="link">Entre aqui!</a>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const userData = ref({ name: '', email: '', password: '' });

const loading = ref([false]);

function simulateProgress(number: number) {
  loading.value[number] = true;

  setTimeout(() => {
    loading.value[number] = false;
  }, 3000);
}
</script>

<style scoped>
.container {
  background-color: #101010;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d9d9d9;
}

.card {
  background-color: #181818;
  width: 256px;
  border-radius: 10px;
  display: flex;
  padding: 16px;
  flex-direction: column;
}

.title {
  font-size: 20px;
  line-height: normal;
  text-align: center;
  font-weight: 500;
}

.form {
  display: flex;
  flex-direction: column;
  padding-bottom: 32px;
}

.footer {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  padding-top: 16px;
}

.link {
  color: #1976d2;
}
</style>
