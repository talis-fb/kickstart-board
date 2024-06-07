import Board from '../views/Board.vue';
import BoardList from '@/components/boardList/BoardList.vue';
import NotFound from '@/components/NotFound.vue';

export const routes = [
  {
    component: BoardList,
    name: 'BoardList',
    path: '/',
  },
  {
    component: Board,
    name: 'Board',
    path: '/board/:board',
  },
  {
    component: NotFound,
    path: '/:pathMatch(.*)*',
    name: 'Page not found',
  },
];
