import { createPinia as _createPinia } from 'pinia';

export const createPinia = () => {
  return _createPinia();
};

export * from './boards/store';
export * from './store';
