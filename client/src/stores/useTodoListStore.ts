import { defineStore } from 'pinia';

export const useTodoListStore = defineStore({
  id: 'todoList',
  state: () => [
    { id: 0, name: 'Lavar a louça', completed: true },
    { id: 1, name: 'Guardar as roupas', completed: false },
    { id: 2, name: 'Criar uma nova tarefa', completed: true },
    { id: 3, name: 'Desenvolver o aplicativo', completed: false },
    { id: 4, name: 'Estudar para a prova', completed: false },
  ],
});
