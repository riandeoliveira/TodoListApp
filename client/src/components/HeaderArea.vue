<template>
  <header class="header">
    <nav class="nav">
      <q-btn flat round title="Pesquise uma tarefa" class="button">
        <IconBase :name="search" />
      </q-btn>
      <q-btn flat round title="Visualize suas tarefas" class="button">
        <a href="/#/todos" class="link">
          <IconBase :name="check_list" />
        </a>
      </q-btn>
      <q-btn flat round title="Entre na sua conta" class="button">
        <a href="/#/account" class="link">
          <IconBase :name="account" />
        </a>
      </q-btn>
      <q-btn flat round title="Filtre suas tarefas" class="button">
        <IconBase :name="filter" @click="handleFilterClick" />
      </q-btn>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { search, check_list, filter, account } from '../data/icons.json';
import IconBase from 'components/IconBase.vue';
import { useFilterModalStore } from 'stores/useFilterModalStore';

const filterModal = useFilterModalStore();

const handleFilterClick = (): void => {
  if (location.hash !== '#/todos') location.hash = '/todos';

  filterModal.toggle();
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
