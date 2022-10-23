<template>
  <div class="container">
    <div class="avatar-container">
      <img
        src="../assets/avatar.png"
        alt="Avatar do usuário"
        width="48"
        height="48"
      />
      <h1 class="title">John Doe</h1>
    </div>
    <ul class="data-list">
      <li>
        <strong class="strong">E-mail: </strong>
        <span>johndoe2000@email.com</span>
      </li>
      <li>
        <strong class="strong">Total de tarefas: </strong>
        <span>{{ todoList.getTodosLength() }}</span>
      </li>
      <li>
        <strong class="strong">Tarefas concluídas: </strong>
        <span>{{ todoList.getCompletedTodosLength() }}</span>
      </li>
      <li>
        <strong class="strong">Tarefas pendentes: </strong>
        <span>{{ todoList.getPendingTodosLength() }}</span>
      </li>
    </ul>
    <div class="button-container">
      <q-btn color="primary" label="Sair" class="button" />
      <q-btn color="negative" label="Excluir conta" class="button" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodoListStore } from 'src/stores/useTodoListStore';

const todoList = useTodoListStore();
</script>

<style scoped lang="scss">
.container {
  background-color: #303030;
  padding: 16px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.title {
  font-size: 16px;
  line-height: normal;
  font-weight: bold;
}

.data-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.strong {
  font-weight: 500;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.button {
  height: 32px;
  width: 140px;
}
</style>
