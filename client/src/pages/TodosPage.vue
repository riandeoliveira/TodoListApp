<template>
  <div class="container" v-if="user.authenticated">
    <HeaderArea />
    <main class="main">
      <FilterModal v-if="toggleOption.filterModal" />
      <div class="todo-list" :class="toggleOption.filterModal ? 'opac' : ''">
        <TodoBox
          v-for="todo in todoFilter.getSelectedFilter()"
          :key="todo.id"
          :id="todo.id"
          :name="todo.name"
          :completed="todo.completed"
        />
        <span
          class="not-found"
          v-if="todoList.search(fieldData.searchTodo).length === 0"
          >Nenhuma tarefa encontrada</span
        >
      </div>
    </main>
    <FooterArea />
  </div>
</template>

<script setup lang="ts">
import HeaderArea from 'components/HeaderArea.vue';
import FooterArea from 'components/FooterArea.vue';
import FilterModal from 'components/FilterModal.vue';
import { todoListStore } from 'src/stores/todoListStore';
import TodoBox from 'src/components/TodoBox.vue';
import { toggleElementStore } from 'src/stores/toggleElementStore';
import { fieldDataStore } from 'src/stores/fieldDataStore';
import { todoFilterStore } from 'src/stores/todoFilterStore';
import { userStore } from 'src/stores/userStore';
import { onMounted } from 'vue';

const toggleOption = toggleElementStore();
const todoFilter = todoFilterStore();
const todoList = todoListStore();
const fieldData = fieldDataStore();
const user = userStore();

// Verifica se o usuário está autenticado. Se sim, continua na página, caso contrário, o redireciona.
async function handleUserAuth() {
  await user.verify();

  if (!user.authenticated) location.hash = '/signup';
}

onMounted(() => handleUserAuth());
</script>

<style lang="scss">
.main {
  padding: 56px 16px;
  color: white;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.opac {
  opacity: 20%;
}

.not-found {
  color: #d9d9d9;
  text-align: center;
}
</style>
