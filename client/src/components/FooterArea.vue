<template>
  <footer class="footer">
    <nav class="nav">
      <q-btn flat round title="Adicione uma nova tarefa" class="button">
        <IconBase :name="add_todo" :size="24" @click="handleAddTodoField" />
      </q-btn>
      <form
        class="form"
        v-if="toggleStore.$state.addTodoField"
        @submit="handleAddTodo"
      >
        <q-input
          v-model="fieldData.$state.addTodoField"
          dark
          ref="inputTodoName"
        />
      </form>
    </nav>
  </footer>
</template>

<script setup lang="ts">
import IconBase from 'components/IconBase.vue';
import { add_todo } from '../data/icons.json';
import { useTodoListStore } from 'src/stores/useTodoListStore';
import { useToggleStore } from 'src/stores/useToggleStore';
import { useFieldData } from 'src/stores/useFieldData';

const toggleStore = useToggleStore();
const todoList = useTodoListStore();
const fieldData = useFieldData();

const handleAddTodoField = (): void => {
  toggleStore.toggle('addTodoField');
};

const handleAddTodo = (): void => {
  if (fieldData.$state.addTodoField.trim().length === 0) {
    alert('Digite uma tarefa primeiro');
  } else {
    todoList.addTodo(fieldData.$state.addTodoField);

    fieldData.$state.addTodoField = '';
    toggleStore.$state.addTodoField = false;
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
