<template>
  <footer class="footer">
    <nav class="nav">
      <q-btn flat round title="Adicione uma nova tarefa" class="button">
        <IconBase :name="add_todo" :size="24" @click="handleAddTodoField" />
      </q-btn>
      <form
        class="form"
        v-if="toggleStore.addTodoField"
        @submit="handleAddTodo"
      >
        <q-input v-model="fieldData.addTodo" id="addTodoField" dark />
      </form>
    </nav>
  </footer>
</template>

<script setup lang="ts">
import IconBase from 'components/IconBase.vue';
import { add_todo } from '../data/icons.json';
import { todoListStore } from 'src/stores/todoListStore';
import { toggleElementStore } from 'src/stores/toggleElementStore';
import { fieldDataStore } from 'src/stores/fieldDataStore';
import { useQuasar } from 'quasar';

const toggleStore = toggleElementStore();
const todoList = todoListStore();
const fieldData = fieldDataStore();
const $q = useQuasar();

const handleAddTodoField = (): void => {
  setTimeout(() => {
    const addTodoField = document.querySelector(
      'input[type=text]'
    ) as HTMLInputElement;

    addTodoField?.focus();
  }, 100);

  toggleStore.toggle('addTodoField');
};

const handleAddTodo = (): void => {
  const todoName = fieldData.addTodo;

  if (todoName.trim().length === 0) {
    $q.notify({
      type: 'negative',
      message: 'Por favor, digite uma tarefa primeiro!',
      position: 'top-right',
    });
  } else {
    todoList.$state.map((todo) => {
      if (todo.name === todoName) {
        $q.notify({
          type: 'negative',
          message:
            'Já existe uma tarefa com este nome! Por favor, utilize outro.',
          position: 'top-right',
        });
      }
    });

    todoList.add(fieldData.addTodo);

    fieldData.addTodo = '';
    toggleStore.addTodoField = false;
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
