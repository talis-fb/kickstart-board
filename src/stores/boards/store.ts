import { defineStore } from 'pinia';
import { createBoard } from './actions/createBoard';
import { getBoardData } from './actions/getBoardData';
import { getBoardList } from './actions/getBoardList';
import { patchCard } from './actions/patchCard';
import { deleteCard } from './actions/deleteCard';
import { deleteList } from './actions/deleteList';
import { patchList } from './actions/patchList';
import { createCard } from './actions/createCard';
import { createList } from './actions/createList';
import { updateListsOrder } from './actions/sortLists';
import { deleteBoard } from './actions/deleteBoard';
import { resetBoards } from './actions/resetBoards';
import { resetLists } from './actions/resetLists';
import { resetCards } from './actions/resetCards';
import { patchBoard } from './actions/patchBoard';
import { toggleSearch } from '../flags/toggleSearch';
import { searchCard } from './actions/searchCard';
import Board from '@/typings/board';
import List from '@/typings/list';

export const useBoardStore = defineStore('boards', {
  state() {
    return {
      board: {},
      lists: [] as List[],
      redirectBoardId: 0,
      loading: true,
      loadingListCards: {},
      loadingError: {
        show: false,
        status: -1,
        message: '',
        tooLong: false,
      },
      createListInput: true,
      activeCard: {},
      notification: {
        error: false,
        show: false,
        message: '',
      },
      boardList: {
        all: [],
      },
      modalEditCard: {
        show: false,
      },
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

    // search functionality
    toggleSearch,
    searchCard,
    resetBoards,
    resetLists,
    resetCards,
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
