import { defineStore } from 'pinia';
import { createBoard } from './boards/actions/createBoard';
import { getBoardDetail } from './boards/actions/getBoardDetail';
import { getBoardList } from './boards/actions/getBoardList';
import { patchCard } from './boards/actions/patchCard';
import { uploadFile } from './actions/uploadFile';
import { deleteCard } from './boards/actions/deleteCard';
import { deleteList } from './boards/actions/deleteList';
import { patchList } from './boards/actions/patchList';
import { createCard } from './boards/actions/createCard';
import { createList } from './boards/actions/createList';
import { updateListsOrder } from './boards/actions/sortLists';
import { deleteBoard } from './boards/actions/deleteBoard';
import { signup } from './user/actions/signup';
import { login } from './user/actions/login';
import { user } from './user/actions/user';
import { reset } from './user/actions/reset';
import { showNotification } from './notifications/showNotification';
import { showCardModule } from './boards/actions/showCardModule';
import { resetBoards } from './boards/actions/resetBoards';
import { resetLists } from './boards/actions/resetLists';
import { resetCards } from './boards/actions/resetCards';
import { resetUsers } from './user/actions/resetUsers';
import { patchBoard } from './boards/actions/patchBoard';
import { toggleTools } from './tools/toggleTools';
import { toggleSearch } from './boards/actions/toggleSearch';
import { searchCard } from './boards/actions/searchCard';
import { oauthLogin } from './user/actions/oauthLogin';
import { oauthSignup } from './user/actions/oauthSignup';
import { getLocation } from './pricing/actions/getLocation';
import Board from '@/typings/board';

export const useStore = defineStore({
  id: 'store',
  state() {
    return {
      board: {},
      redirectBoardId: 0,
      lists: [],
      loading: true,
      loadingListCards: {},
      loadingError: {
        show: false,
        status: -1,
        message: '',
        tooLong: false,
      },
      createListInput: true,
      cardModule: false,
      activeCard: {},
      notification: {
        error: false,
        show: false,
        message: '',
      },
      boardList: {
        all: [],
      },
      activeUser: {
        accessToken: '',
        email: '',
        id: 0,
        loggedIn: false,
      },
      signupForm: {
        email: '',
        password: '',
        welcomeEmail: false,
      },
      loginForm: {
        email: '',
        password: '',
      },
      pricing: {
        activePlan: 2,
        location: 'us',
        currency: 'USD',
        discountEligible: false,
        discountAmount: 0,
      },
      showTools: false,
      showSearch: false,
      searchResults: [],
    };
  },
  actions: {
    // board actions
    createBoard,
    getBoardDetail,
    getBoardList,
    patchBoard,
    deleteBoard,

    // list actions
    createList,
    deleteList,
    patchList,
    updateListsOrder,

    // card actions
    createCard,
    patchCard,
    deleteCard,
    uploadFile,

    // user actions
    signup,
    login,
    oauthLogin,
    oauthSignup,
    user,

    // other actions
    showNotification,
    showCardModule,
    getLocation,

    // api tools
    toggleTools,

    // search functionality
    toggleSearch,
    searchCard,

    // reset actions
    reset,
    resetBoards,
    resetLists,
    resetCards,
    resetUsers,
  },
  getters: {
    starred: (state): Board[] => {
      return state.boardList.all?.filter((board: Board) => board.starred === true);
    },
    allBoards: (state): Board[] => {
      return state.boardList.all?.filter((board: Board) => board.starred === false);
    },
  },
});

/* istanbul ignore if */
if (window.Cypress) {
  window.store = useStore;
}
