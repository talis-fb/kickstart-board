import { defineStore } from 'pinia';
import { createBoard } from './boards/actions/createBoard';
import { getBoardData } from './boards/actions/getBoardData';
import { getBoardList } from './boards/actions/getBoardList';
import { patchCard } from './boards/actions/patchCard';
import { uploadFile } from './boards/actions/uploadFile';
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
import { showModalCardEdit } from './boards/actions/showModalCardEdit';
import { closeModalCardEdit } from './boards/actions/closeModalCardEdit';
import { resetBoards } from './boards/actions/resetBoards';
import { resetLists } from './boards/actions/resetLists';
import { resetCards } from './boards/actions/resetCards';
import { resetUsers } from './user/actions/resetUsers';
import { patchBoard } from './boards/actions/patchBoard';
import { toggleSearch } from './flags/toggleSearch';
import { searchCard } from './boards/actions/searchCard';
import { oauthLogin } from './user/actions/oauthLogin';
import { oauthSignup } from './user/actions/oauthSignup';
import Board from '@/typings/board';
import FilterCard from '@/typings/filter-card';
import List from '@/typings/list';
import Card from '@/typings/card';

export const useStore = defineStore({
  id: 'store',
  state() {
    return {
      board: {},
      redirectBoardId: 0,
      lists: [] as List[],
      filtersCards: [] as FilterCard[],
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
      modalEditCard: {
        show: false,
      },
      showTools: false,
      showSearch: false,
      searchResults: [],
    };
  },
  actions: {
    // board actions
    createBoard,
    getBoardData,
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
    showModalCardEdit,
    closeModalCardEdit,

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
    getFilteredLists: (state): List[] => {
      const boardLists = state.lists as List[];
      const filtersCards = state.filtersCards as FilterCard[];

      if (boardLists.length === 0 || filtersCards.length === 0) {
        return state.lists;
      }

      return boardLists.map((boardList) => ({
        ...boardList,
        cards: boardList.cards.filter((card) => {
          return filtersCards.every(({ fieldFilter, value }) => {
            const cardFieldToCheck = String(card[fieldFilter]);
            return cardFieldToCheck.includes(value);
          });
        }),
      }));
    },
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
