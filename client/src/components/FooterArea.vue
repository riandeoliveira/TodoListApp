<template>
  <footer class="footer">
    <nav class="nav">
      <q-btn flat round title="Adicione uma nova tarefa" class="button">
        <IconBase :name="add_todo" :size="24" @click="handleAddTodoField" />
      </q-btn>
      <form class="form" v-if="readyToAddTodo" @submit="handleAddTodo">
        <q-input v-model="todoName" dark ref="inputTodoName" />
      </form>
    </nav>
  </footer>
</template>

<script setup lang="ts">
import IconBase from 'components/IconBase.vue';
import { add_todo } from '../data/icons.json';
import { Ref, ref } from 'vue';
import { useTodoListStore } from 'src/stores/useTodoListStore';

const readyToAddTodo: Ref<boolean> = ref(false);
const todoName: Ref<string> = ref('');
const inputTodoName: Ref<HTMLInputElement | null> = ref(null);

const todoList = useTodoListStore();

const handleAddTodoField = (): void => {
  readyToAddTodo.value = !readyToAddTodo.value;

  setTimeout(() => {
    inputTodoName.value?.focus();
  }, 0);
};

const handleAddTodo = (): void => {
  if (todoName.value.trim().length === 0) {
    alert('Digite uma tarefa primeiro');
  } else {
    todoList.addTodo(todoName.value);

    todoName.value = '';
    readyToAddTodo.value = false;
  }
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

.form {
  width: 100%;
}
</style>
