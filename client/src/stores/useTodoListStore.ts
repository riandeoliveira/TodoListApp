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
    { id: '873mb', name: 'Desenvolver o aplicativo', completed: false },
    { id: '7bas6', name: 'Estudar para a prova', completed: false },
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
    /**
     * Remove todas as tarefas existentes. Esta ação NÃO pode ser desfeita!
     */
    deleteAllTodos(): void {
      this.$state.splice(0, this.$state.length);
    },
    /**
     * Pesquisa uma tarefa pelo seu nome e as retorna caso sejam encontradas.
     * @param name texto inserido na barra de pesquisa
     * @returns somente as tarefas cujos nomes condizem com a pesquisa realizada
     */
    searchTodo(name: string): ITodo[] {
      return this.$state.filter((todo) =>
        todo.name.toLowerCase().includes(name.toLowerCase())
      );
    },
    /**
     * Filtra as tarefas por ordem alfabética.
     *
     * @returns todas as tarefas (A-Z)
     */
    sortByAlphabeticalOrder(): ITodo[] {
      return this.$state.sort((a, b) => a.name.localeCompare(b.name));
    },
    /**
     * Filtra as tarefas e exibe apenas as que estão concluídas.
     *
     * @returns apenas as tarefas concluídas
     */
    sortByCompletedTodos(): ITodo[] {
      return this.$state.filter((todo) => todo.completed);
    },
    /**
     * Filtra as tarefas e exibe as mais recentes primeiro.
     *
     * @returns as tarefas mais recentes primeiro
     */
    sortByMostRecentTodos(): ITodo[] {
      return this.$state.slice().reverse();
    },
    /**
     * Filtra as tarefas e exibe as mais antigas primeiro. Esta é a opção padrão.
     *
     * @returns as tarefas mais antigas primeiro
     */
    sortByOldestTodos(): ITodo[] {
      return this.$state;
    },
    /**
     * Filtra as tarefas e exibe apenas as que estão pendentes.
     *
     * @returns apenas as tarefas pendentes
     */
    sortByPendingTodos(): ITodo[] {
      return this.$state.filter((todo) => todo.completed === false);
    },
  },
});
