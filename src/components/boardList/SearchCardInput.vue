<template>
        <div
        class="inline-grid relative self-center ml-2 w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-sm cursor-pointer"
        :class="[state.board.starred ? 'fill-current' : 'stroke-current text-white']"
        data-cy="star"
        @click="
            state.patchBoard(state.board, {
            starred: !state.board.starred,
            })
        "
        >
    <Search class="place-self-center m-2" />
    </div>
</template>
  
  <script setup lang="ts">
  import Search from '@/assets/icons/search.svg';
  
  const route = useRoute();
  const state = useStore();
  const inputActive = ref(false);
  const boardId = Number(route.params.board);
  state.getBoardDetail(boardId);
  const onClickAway = () => {
    inputActive.value = false;
  };
  </script>
  
  <style lang="postcss" scoped>
  .board-detail {
    height: calc(100vh - 40px);
  }
  
  .board-title:focus {
    @apply bg-gray1 bg-opacity-100 hover:bg-opacity-100 text-black;
  }
  
  .board-title {
    @apply absolute outline-none font-bold top-0 bottom-0 right-0 left-0 w-full pl-3 rounded-sm cursor-pointer;
  }
  </style>
  