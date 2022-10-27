import { defineStore } from 'pinia';

export interface TodoState {
  id: string;
  name: string;
  completed: boolean;
}

export const todoListStore = defineStore({
  id: 'todoList',
  state: (): TodoState[] => [
    { id: 'kjashfsdasdk', name: 'Lavar a louça', completed: false },
    { id: 'kjashfsdassdasdsadk', name: 'Lavar a louça', completed: false },
    { id: 'kjashfsdkasdasd', name: 'Lavar a louça', completed: true },
    { id: 'kjashfsdkd', name: 'Lavar a louça', completed: false },
    { id: 'kjashfsdkasd', name: 'Lavar a louça', completed: true },
  ],
  actions: {
    add(name: string): void {
      const todo: TodoState = {
        id: 'lorem',
        name,
        completed: false,
      };

      this.$state.push(todo);
    },

    complete(id: string): void {
      this.$state.filter((todo) => {
        if (todo.id === id) todo.completed = !todo.completed;
      });
    },

    delete(id: string): void {
      this.$state.filter((todo) => {
        if (todo.id === id) {
          const todoIndex: number = this.$state.indexOf(todo);

          this.$state.splice(todoIndex, 1);
        }
      });
    },

    deleteAll(): void {
      this.$state.splice(0, this.length);
    },

    search(name: string): TodoState[] {
      return this.$state.filter((todo) =>
        todo.name.toLowerCase().includes(name.toLowerCase())
      );
    },

    sortByAlphabeticalOrder(): TodoState[] {
      return this.$state.sort((a, b) => a.name.localeCompare(b.name));
    },

    sortByCompletedTodos(): TodoState[] {
      return this.$state.filter((todo) => todo.completed);
    },

    sortByMostRecentTodos(): TodoState[] {
      return this.$state.slice().reverse();
    },

    sortByOldestTodos(): TodoState[] {
      return this.$state;
    },

    sortByPendingTodos(): TodoState[] {
      return this.$state.filter((todo) => todo.completed === false);
    },
  },
});
