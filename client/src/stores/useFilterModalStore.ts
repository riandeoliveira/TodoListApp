import { defineStore } from 'pinia';

export const useFilterModalStore = defineStore({
  id: 'filterModal',
  state: () => ({
    isOpen: false,
  }),
  actions: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
});
