<template>
  <div class="container">
    <HeaderArea />
    <main class="main">
      <div class="todo-list">
        <TodoBox
          v-for="todo in todoList.$state"
          :key="todo.id"
          :name="todo.name"
          :completed="todo.completed"
        />
      </div>
      <FilterModal v-if="filterModal.$state.isOpen" />
    </main>
    <FooterArea />
  </div>
</template>

<script setup lang="ts">
import HeaderArea from 'components/HeaderArea.vue';
import FooterArea from 'components/FooterArea.vue';
import FilterModal from 'components/FilterModal.vue';
import { useFilterModalStore } from 'stores/useFilterModalStore';
import { useTodoListStore } from 'stores/useTodoListStore';
import TodoBox from 'src/components/TodoBox.vue';

const filterModal = useFilterModalStore();
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
</style>
