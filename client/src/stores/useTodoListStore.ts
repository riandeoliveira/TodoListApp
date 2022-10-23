import { defineStore } from 'pinia';

export interface ITodo {
  id: string;
  name: string;
  completed: boolean;
}

export const useTodoListStore = defineStore({
  id: 'todoList',
  state: (): ITodo[] => [
    { id: 'jaksh', name: 'Lavar a louça', completed: true },
    { id: 'a6f5a', name: 'Guardar as roupas', completed: false },
    { id: 'mb83g', name: 'Criar uma nova tarefa', completed: true },
    { id: '7bas6', name: 'Estudar para a prova', completed: false },
    { id: '873mb', name: 'Desenvolver o aplicativo', completed: false },
  ],
  actions: {
    addTodo(name: string) {
      const todo: ITodo = {
        id: 'lorem',
        name,
        completed: false,
      };

      this.$state.push(todo);
    },
    completeTodo(id: string) {
      this.$state.filter((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
      });
    },
    deleteTodo(id: string) {
      this.$state.filter((todo) => {
        if (todo.id === id) {
          const todoIndex: number = this.$state.indexOf(todo);

          this.$state.splice(todoIndex, 1);
        }
      });
    },
    searchTodo(name: string) {
      console.log(name);
    },
  },
});
