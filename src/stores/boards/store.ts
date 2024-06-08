import { defineStore } from 'pinia';
import { createBoard } from './actions/createBoard';
import { getBoardDetail } from './actions/getBoardDetail';
import { getBoardList } from './actions/getBoardList';
import { patchCard } from './actions/patchCard';
import { deleteCard } from './actions/deleteCard';
import { deleteList } from './actions/deleteList';
import { patchList } from './actions/patchList';
import { createCard } from './actions/createCard';
import { createList } from './actions/createList';
import { updateListsOrder } from './actions/sortLists';
import { deleteBoard } from './actions/deleteBoard';
import { showCardModule } from './actions/showCardModule';
import { resetBoards } from './actions/resetBoards';
import { resetLists } from './actions/resetLists';
import { resetCards } from './actions/resetCards';
import { patchBoard } from './actions/patchBoard';
import { toggleSearch } from './actions/toggleSearch';
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
    showCardModule,

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