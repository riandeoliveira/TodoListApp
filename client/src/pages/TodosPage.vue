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
          v-for="todo in todoList.$state"
          :key="todo.id"
          :id="todo.id"
          :name="todo.name"
          :completed="todo.completed"
        />
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

const toggleOption = useToggleStore();
const todoList = useTodoListStore();
</script>

<style lang="scss">
body {
  background-color: #101010;
}

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
</style>
