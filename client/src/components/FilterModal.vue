<template>
  <div class="container">
    <span class="text">Filtrar tarefas por:</span>
    <ul class="list">
      <li
        class="item"
        :class="filter.selected ? 'selected' : ''"
        v-for="filter in todoFilters.$state"
        :key="filter.id"
        @click="todoFilters.select(filter)"
      >
        {{ filter.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTodoFilterStore } from 'src/stores/useTodoFilterStore';

const todoFilters = useTodoFilterStore();
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  background-color: #303030;
  border-radius: 10px;
  position: fixed;
  right: 16px;
  z-index: 2;
  width: 60%;
  border: 1px solid #1976d2;
}

.text {
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  padding: 10px;
}

.list {
  padding-bottom: 10px;
}

.item {
  cursor: pointer;
  padding: 10px;
}

.selected {
  background-color: #1976d2;
}
</style>
