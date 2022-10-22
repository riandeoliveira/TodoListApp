<template>
  <header class="header">
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
      <q-input
        v-model="todoName"
        dark
        ref="inputTodoName"
        v-if="readyToSearchTodo"
        v-on:change="handleSearchTodo"
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

const filterModal = useFilterModalStore();

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
  console.log('jhsd');
};
</script>

<style scoped lang="scss">
.header {
  background-color: #1976d2;
  top: 0;
  position: fixed;
  right: 0;
  left: 0;
  height: 40px;
}

.nav {
  width: inherit;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.button {
  min-height: 2.5em;
  min-width: 2.5em;
}

.link {
  display: flex;
  outline: 0;
}
</style>
