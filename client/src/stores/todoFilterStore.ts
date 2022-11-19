import { defineStore } from 'pinia';
import { TodoState, todoListStore } from './todoListStore';
import { toggleElementStore } from './toggleElementStore';

export interface TodoStateFilter {
  id: number;
  name: string;
  selected: boolean;
  option: () => TodoState[];
}

const todoList = todoListStore();
const toggleElement = toggleElementStore();

export const todoFilterStore = defineStore({
  id: 'todoFilters',
  state: (): TodoStateFilter[] => [
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
    getSelectedFilter(): TodoState[] | undefined {
      return this.$state.find((item) => item.selected)?.option();
    },

    select(todoFilter: TodoStateFilter): void {
      this.$state.map((state) => (state.selected = false));
      this.$state[todoFilter.id].selected = true;

      setTimeout(() => {
        toggleElement.toggle('filterModal');
      }, 100);
    },
  },
});
