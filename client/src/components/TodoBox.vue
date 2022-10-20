<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="todo-container">
    <div class="check-container">
      <q-checkbox v-model="completed" :dark="true" />
      <span class="todo-name">{{ name }}</span>
    </div>
    <IconBase :name="trash_can" :size="28" class="trash-can" />
  </div>
</template>

<script setup lang="ts">
import IconBase from './IconBase.vue';
import { trash_can } from '../data/icons.json';

defineProps<{
  name: string;
  completed: boolean;
}>();
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
