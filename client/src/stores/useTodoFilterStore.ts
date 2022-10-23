import { defineStore } from 'pinia';
import { ITodo, useTodoListStore } from './useTodoListStore';

export interface ITodoFilter {
  id: number;
  name: string;
  selected: boolean;
  option: () => ITodo[];
}

const todoList = useTodoListStore();

export const useTodoFilterStore = defineStore({
  id: 'todoFilters',
  state: (): ITodoFilter[] => [
    {
      id: 0,
      name: 'Mais antigas',
      selected: true,
      option: todoList.sortByOldestTodos,
    },
    {
      id: 1,
      name: 'Mais recentes',
      selected: false,
      option: todoList.sortByMostRecentTodos,
    },
    {
      id: 2,
      name: 'Ordem alfabética',
      selected: false,
      option: todoList.sortByAlphabeticalOrder,
    },
    {
      id: 3,
      name: 'Concluídas',
      selected: false,
      option: todoList.sortByCompletedTodos,
    },
    {
      id: 4,
      name: 'Pendentes',
      selected: false,
      option: todoList.sortByPendingTodos,
    },
  ],
  actions: {
    /**
     * Encontra e ativa o filtro selecionado no momento.
     *
     * @returns a lista de tarefas filtrada
     */
    getSelectedFilter(): ITodo[] | undefined {
      return this.$state.find((item) => item.selected)?.option();
    },
    /**
     * Ativa a opção de filtro que foi selecionada e desativa as demais.
     *
     * @param todoFilter - filtro selecionado
     */
    select(todoFilter: ITodoFilter) {
      this.$state.map((state) => (state.selected = false));
      this.$state[todoFilter.id].selected = true;
    },
  },
});
