import { useKeypress } from 'vue3-keypress';
import { useStore } from '@/stores/store';

export const shortcutSetupMiddleware = () => {
  const state = useStore();
  const toggleSearch = state.toggleSearch;

  useKeypress({
    keyEvent: 'keydown',
    keyBinds: [
      {
        keyCode: 113, // f2
        success() {
          state.showTools = !state.showTools;
        },
      },
      {
        keyCode: 75, // k
        success() {
          state.showTools = !state.showTools;
        },
        modifiers: ['metaKey'],
      },
      {
        keyCode: 27, // esc
        success() {
          toggleSearch(false);
          state.showTools = false;
        },
      },
    ],
  });
};
