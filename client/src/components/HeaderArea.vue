<template>
  <header class="header" :class="readyToSearchTodo && 'active'">
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
        v-model="todoName"
        dark
        ref="inputTodoName"
        class="input"
        v-if="readyToSearchTodo"
        @input="handleSearchTodo"
      />
      <q-btn
        flat
        round
        title="Visualize suas tarefas"
        class="button"
        v-if="!readyToSearchTodo"
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
        v-if="!readyToSearchTodo"
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
        v-if="!readyToSearchTodo"
      >
        <IconBase :name="filter" :size="24" @click="handleFilterModalClick" />
      </q-btn>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { search, check_list, filter, account } from '../data/icons.json';
import IconBase from 'components/IconBase.vue';
import { useFilterModalStore } from 'stores/useFilterModalStore';
import { ref, Ref } from 'vue';
import { useTodoListStore } from 'src/stores/useTodoListStore';

const filterModal = useFilterModalStore();
const todoList = useTodoListStore();

const handleFilterModalClick = (): void => {
  if (location.hash !== '#/todos') location.hash = '/todos';

  filterModal.toggle();
};

const readyToSearchTodo: Ref<boolean> = ref(false);
const todoName: Ref<string> = ref('');
const inputTodoName: Ref<HTMLInputElement | null> = ref(null);

const handleSearchField = (): void => {
  readyToSearchTodo.value = !readyToSearchTodo.value;

  setTimeout(() => {
    inputTodoName.value?.focus();
  }, 0);
};

const handleSearchTodo = (): void => {
  todoList.searchTodo(todoName.value);
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
