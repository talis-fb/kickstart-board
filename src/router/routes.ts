import BoardView from '@/views/BoardView.vue';
import BoardListView from '@/views/BoardListView.vue';
import NotFound from '@/views/NotFound.vue';

export const routes = [
  {
    component: BoardListView,
    name: 'BoardListView',
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
