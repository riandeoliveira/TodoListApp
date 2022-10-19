<template>
  <footer class="footer">
    <nav class="nav">
      <q-btn flat round title="Adicione uma nova tarefa" class="button">
        <IconBase :name="add_todo" />
      </q-btn>
    </nav>
  </footer>
</template>

<script setup lang="ts">
import IconBase from 'components/IconBase.vue';
import { add_todo } from '../data/icons.json';
</script>

<style scoped lang="scss">
.footer {
  background-color: #1976d2;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 40px;
  right: 0;
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
</style>
