<template>
  <header class="header" :class="toggleOption.searchTodoField && 'active'">
    <nav class="nav">
      <q-btn
        flat
        round
        title="Pesquise uma tarefa"
        class="button"
        @click="handleSearchField"
      >
        <IconBase :name="search" :size="24" />
      </q-btn>
      <input
        v-model="fieldData.searchTodo"
        dark
        class="input"
        v-if="toggleOption.searchTodoField"
        @input="handleSearchTodo"
      />
      <q-btn
        flat
        round
        title="Visualize suas tarefas"
        class="button"
        v-if="!toggleOption.searchTodoField"
      >
        <a href="/#/todos" class="link">
          <IconBase :name="check_list" :size="24" />
        </a>
      </q-btn>
      <q-btn
        flat
        round
        title="Entre na sua conta"
        class="button"
        v-if="!toggleOption.searchTodoField"
      >
        <a href="/#/account" class="link">
          <IconBase :name="account" :size="24" />
        </a>
      </q-btn>
      <q-btn
        flat
        round
        title="Filtre suas tarefas"
        class="button"
        v-if="!toggleOption.searchTodoField"
      >
        <IconBase :name="filter" :size="24" @click="handleFilterModalClick" />
      </q-btn>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { search, check_list, filter, account } from '../data/icons.json';
import IconBase from 'components/IconBase.vue';
import { todoListStore } from 'src/stores/todoListStore';
import { toggleElementStore } from 'src/stores/toggleElementStore';
import { fieldDataStore } from 'src/stores/fieldDataStore';

const todoList = todoListStore();
const toggleOption = toggleElementStore();
const fieldData = fieldDataStore();

const handleFilterModalClick = (): void => {
  if (location.hash !== '#/todos') location.hash = '/todos';

  toggleOption.toggle('filterModal');
};

const handleSearchField = (): void => {
  toggleOption.toggle('searchTodoField');
};

const handleSearchTodo = (): void => {
  todoList.search(fieldData.searchTodo);
};
</script>

<style scoped lang="scss">
.header {
  background-color: #1976d2;
  top: 0;
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  left: 0;
  height: 40px;
}

.nav {
  width: inherit;
  height: inherit;
  display: flex;
  width: 316px;
  align-items: center;
  justify-content: space-between;
}

.button {
  min-height: 2.5em;
  min-width: 2.5em;
}

.input {
  width: 100%;
  background-color: transparent;
  outline: 0;
  color: #ffffff;
}

.link {
  display: flex;
  outline: 0;
}

.active {
  .nav {
    justify-content: start;
    gap: 8px;
  }
}
</style>
