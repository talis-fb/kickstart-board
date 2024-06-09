import { defineStore } from 'pinia';

export const useStore = defineStore('flags', {
  state() {
    return {
      showTools: false,
      showSearch: false,
    };
  },
});

