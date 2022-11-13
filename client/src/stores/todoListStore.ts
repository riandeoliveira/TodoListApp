import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import axios from 'axios';

export interface TodoState {
  id: string;
  name: string;
  completed: boolean;
}

export const todoListStore = defineStore({
  id: 'todoList',
  state: (): TodoState[] => [],
  actions: {
    async add(name: string): Promise<void> {
      try {
        const accessToken: string =
          localStorage.getItem('access_token') || '[]';

        await api.post(
          '/todo/',
          { name },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const todo: TodoState = {
          id: '',
          name,
          completed: false,
        };

        this.$state.push(todo);
      } catch (error: unknown) {
        alert('Não foi possível adicionar uma nova tarefa.');

        console.log(error);
      }
    },

    async complete(id: string): Promise<void> {
      try {
        const accessToken: string =
          localStorage.getItem('access_token') || '[]';

        await api.put(
          `/todo/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } catch (error: unknown) {
        console.log(error);
      }
    },

    async delete(id: string): Promise<void> {
      try {
        this.$state.filter((todo) => {
          if (todo.id === id) {
            const todoIndex: number = this.$state.indexOf(todo);

            this.$state.splice(todoIndex, 1);
          }
        });

        const accessToken: string =
          localStorage.getItem('access_token') || '[]';

        await api.delete(`/todo/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (error: unknown) {
        console.log(error);
      }
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
