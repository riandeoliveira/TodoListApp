<template>
  <div class="container">
    <HeaderArea />
    <main class="main">
      <FilterModal v-if="toggleOption.$state.filterModal" />
      <div
        class="todo-list"
        :class="toggleOption.$state.filterModal ? 'opac' : ''"
      >
        <TodoBox
          v-for="todo in todoList.searchTodo(fieldData.$state.searchTodoField)"
          :key="todo.id"
          :id="todo.id"
          :name="todo.name"
          :completed="todo.completed"
        />
        <span
          class="not-found"
          v-if="
            todoList.searchTodo(fieldData.$state.searchTodoField).length === 0
          "
          >Nenhuma tarefa correspondente</span
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
import { useTodoListStore } from 'stores/useTodoListStore';
import TodoBox from 'src/components/TodoBox.vue';
import { useToggleStore } from 'src/stores/useToggleStore';
import { useFieldData } from 'src/stores/useFieldData';

const toggleOption = useToggleStore();
const todoList = useTodoListStore();
const fieldData = useFieldData();
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
