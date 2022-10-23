import { defineStore } from 'pinia';

export interface ITodoFilter {
  id: number;
  name: string;
  selected: boolean;
}

export const useTodoFilterStore = defineStore({
  id: 'todoFilters',
  state: (): ITodoFilter[] => [
    { id: 0, name: 'Mais antigas', selected: true },
    { id: 1, name: 'Mais recentes', selected: false },
    { id: 2, name: 'Ordem alfabética', selected: false },
    { id: 3, name: 'Concluídas', selected: false },
    { id: 4, name: 'Pendentes', selected: false },
  ],
  actions: {
    /**
     * Ativa a opção de filtro selecionada e desativa as demais.
     *
     * @param todoFilter - filtro selecionado
     */
    select(todoFilter: ITodoFilter) {
      this.$state.map((state) => (state.selected = false));
      this.$state[todoFilter.id].selected = true;
    },
  },
});
