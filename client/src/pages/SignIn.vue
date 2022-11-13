<template>
  <div class="container">
    <div class="card">
      <h1 class="title">Entre na sua conta</h1>
      <form class="form">
        <q-input
          v-model="fieldData.signIn.email"
          type="email"
          label="E-mail"
          dark
        />
        <q-input
          v-model="fieldData.signIn.password"
          type="password"
          label="Senha"
          dark
        />
      </form>
      <q-btn
        :loading="loading.isLoading"
        color="primary"
        @click="user.signIn()"
        label="Entrar"
        type="submit"
      />
      <footer class="footer">
        <span class="text">Ainda não possui uma conta?</span>
        <a href="/#/signup" class="link">Entre aqui!</a>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fieldDataStore } from 'src/stores/fieldDataStore';
import { loadingStore } from 'src/stores/loadingStore';
import { userStore } from 'src/stores/userStore';

const fieldData = fieldDataStore();
const loading = loadingStore();
const user = userStore();
</script>

<style scoped lang="scss">
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
