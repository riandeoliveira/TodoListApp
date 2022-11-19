<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="todo-container">
    <div class="check-container">
      <q-checkbox
        v-model="props.completed"
        :dark="true"
        @click="todoList.complete(props.id)"
      />
      <span class="todo-name">{{ props.name }}</span>
    </div>
    <IconBase
      :name="trash_can"
      :size="28"
      class="trash-can"
      @click="todoList.delete(props.id)"
    />
  </div>
</template>

<script setup lang="ts">
import IconBase from './IconBase.vue';
import { trash_can } from '../data/icons.json';
import { todoListStore } from 'src/stores/todoListStore';

export interface TodoProps {
  id: string;
  name: string;
  completed: boolean;
}

const props = defineProps<TodoProps>();

const todoList = todoListStore();
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
