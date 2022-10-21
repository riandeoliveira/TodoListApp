<template>
  <footer class="footer">
    <nav class="nav">
      <q-btn flat round title="Adicione uma nova tarefa" class="button">
        <IconBase :name="add_todo" :size="24" @click="handleAddTodoField" />
      </q-btn>
      <q-input
        v-model="todoName"
        dark
        class="input"
        v-if="readyToAddTodo"
        ref="inputTodoName"
      />
    </nav>
  </footer>
</template>

<script setup lang="ts">
import IconBase from 'components/IconBase.vue';
import { add_todo } from '../data/icons.json';
import { Ref, ref } from 'vue';

const readyToAddTodo: Ref<boolean> = ref(false);
const todoName: Ref<string> = ref('');
const inputTodoName: Ref<HTMLInputElement | null> = ref(null);

const handleAddTodoField = (): void => {
  readyToAddTodo.value = !readyToAddTodo.value;

  setTimeout(() => {
    inputTodoName.value?.focus();
  }, 0);
};
</script>

<style scoped lang="scss">
.footer {
  background-color: #1976d2;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 40px;
  display: flex;
  justify-content: center;
  right: 0;
}

.nav {
  width: inherit;
  height: inherit;
  display: flex;
  width: 316px;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.button {
  min-height: 2.5em;
  min-width: 2.5em;
}

.input {
  width: 100%;
}
</style>
