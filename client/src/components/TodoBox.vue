<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="todo-container">
    <div class="check-container">
      <q-checkbox
        v-model="completed"
        :dark="true"
        @click="handleCompleteTodo"
      />
      <span class="todo-name">{{ name }}</span>
    </div>
    <IconBase
      :name="trash_can"
      :size="28"
      class="trash-can"
      @click="handleDeleteTodo"
    />
  </div>
</template>

<script setup lang="ts">
import IconBase from './IconBase.vue';
import { trash_can } from '../data/icons.json';
import { useTodoListStore } from 'src/stores/useTodoListStore';

const props = defineProps<{
  id: string;
  name: string;
  completed: boolean;
}>();

const todoList = useTodoListStore();

const handleCompleteTodo = (): void => {
  todoList.completeTodo(props.id);
};

const handleDeleteTodo = (): void => {
  todoList.deleteTodo(props.id);
};
</script>

<style scoped lang="scss">
.todo-container {
  padding: 6px;
  background-color: #303030;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.check-container {
  display: flex;
  gap: 6px;
  align-items: center;
}

.trash-can {
  width: 24px;
  height: 24px;
  margin-right: 6px;
}
</style>
