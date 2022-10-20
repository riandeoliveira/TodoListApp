import { defineStore } from 'pinia';

export interface IFilter {
  id: number;
  name: string;
  selected: boolean;
}

export const useFilterStore = defineStore({
  id: 'filter',
  state: () => [
    { id: 0, name: 'Mais antigas', selected: true },
    { id: 1, name: 'Mais recentes', selected: false },
    { id: 2, name: 'Ordem alfabética', selected: false },
    { id: 3, name: 'Concluídas', selected: false },
    { id: 4, name: 'Pendentes', selected: false },
  ],
  actions: {
    select(filter: IFilter) {
      this.$state.map((state) => (state.selected = false));
      this.$state[filter.id].selected = true;
    },
  },
});
