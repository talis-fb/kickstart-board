import BoardView from '@/views/BoardView.vue';
import BoardList from '@/views/BoardList.vue';
import NotFound from '@/views/NotFound.vue';

export const routes = [
  {
    component: BoardList,
    name: 'BoardList',
    path: '/',
  },
  {
    component: BoardView,
    name: 'Board',
    path: '/board/:board',
  },
  {
    component: NotFound,
    path: '/:pathMatch(.*)*',
    name: 'Page not found',
  },
];
