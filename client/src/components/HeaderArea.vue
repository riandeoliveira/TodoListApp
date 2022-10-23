<template>
  <header
    class="header"
    :class="toggleOption.$state.searchTodoField && 'active'"
  >
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
        v-model="fieldData.$state.searchTodoField"
        dark
        class="input"
        v-if="toggleOption.$state.searchTodoField"
        @input="handleSearchTodo"
      />
      <q-btn
        flat
        round
        title="Visualize suas tarefas"
        class="button"
        v-if="!toggleOption.$state.searchTodoField"
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
        v-if="!toggleOption.$state.searchTodoField"
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
        v-if="!toggleOption.$state.searchTodoField"
      >
        <IconBase :name="filter" :size="24" @click="handleFilterModalClick" />
      </q-btn>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { search, check_list, filter, account } from '../data/icons.json';
import IconBase from 'components/IconBase.vue';
import { useTodoListStore } from 'src/stores/useTodoListStore';
import { useToggleStore } from 'src/stores/useToggleStore';
import { useFieldData } from 'src/stores/useFieldData';

const todoList = useTodoListStore();
const toggleOption = useToggleStore();
const fieldData = useFieldData();

const handleFilterModalClick = (): void => {
  if (location.hash !== '#/todos') location.hash = '/todos';

  toggleOption.toggle('filterModal');
};

const handleSearchField = (): void => {
  toggleOption.toggle('searchTodoField');
};

const handleSearchTodo = (): void => {
  todoList.searchTodo(fieldData.$state.searchTodoField);
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
