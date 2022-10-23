<template>
  <div class="container">
    <div class="card">
      <h1 class="title">Crie sua conta</h1>
      <form class="form">
        <q-input v-model="auth.$state.signUpRef.name" label="Nome" dark />
        <q-input v-model="auth.$state.signUpRef.email" label="E-mail" dark />
        <q-input v-model="auth.$state.signUpRef.password" label="Senha" dark />
      </form>
      <q-btn
        :loading="loading.$state.isLoading"
        color="primary"
        @click="auth.createUser"
        label="Cadastrar"
        type="submit"
      />
      <footer class="footer">
        <span class="text">Já possui uma conta?</span>
        <a href="/#/signin" class="link">Entre aqui!</a>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/useAuthStore';
import { useLoadingStore } from 'src/stores/useLoadingStore';

const auth = useAuthStore();
const loading = useLoadingStore();
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
