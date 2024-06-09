import { defineStore } from 'pinia';
import { showNotification } from './showNotification';

export const useStore = defineStore({
  id: 'store',
  state() {
    return {
      notification: {
        error: false,
        show: false,
        message: '',
      },
    };
  },
  actions: {
    showNotification,
  },
});

