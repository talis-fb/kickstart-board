<template>
  <div class="bg-blue6">
    <CardDetail v-if="modalEditCard.show" />
    <div
      class="grid"
      :class="state.loadingError.show ? 'bg-white' : 'bg-blue6'"
    >
      <!-- LOADING -->
      <BoardLoading
        v-if="state.loading"
        class="grid justify-center content-center h-screen loading"
      />

      <!-- ERROR STATE -->
      <BoardError
        v-if="state.loadingError.show"
        :status="state.loadingError.status"
        :error-message="state.loadingError.message"
        class="grid justify-center content-center h-screen"
        data-cy="board-list-error-message"
      />

      <!-- BOARD DETAIL -->
      <div
        v-if="!state.loading && !state.loadingError.show"
        class="overflow-x-auto whitespace-nowrap board-detail"
        data-cy="board-detail"
      >
        <BoardHeader
          v-model:board-name="state.board.name"
          v-model:search-cards="searchCards"
          :board="state.board"
          :starred="state.board.starred"
          :on-change-board-name="() => state.patchBoard(state.board, { name: state.board.name })"
          class="py-2.5"
          @clickOnStar="state.patchBoard(state.board, { starred: !state.board.starred })"
        />

        <Board class="inline-block" />

        <div class="inline-block align-top">
          <ListCreate
            :board="state.board.id"
            class="bg-gray2 rounded-sm shadow-md cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores/store';
import CardDetail from '@/components/card/CardDetail.vue';
import BoardLoading from '@/components/board/BoardLoading.vue';
import Board from '@/components/board/Board.vue';
import BoardHeader from '@/components/board/BoardHeader.vue';
import BoardError from '@/components/board/BoardError.vue';
import ListCreate from '@/components/list/ListCreate.vue';

const { modalEditCard } = storeToRefs(useStore());
const route = useRoute();
const state = useStore();
const boardId = Number(route.params.board);

const searchCards = ref('');
watch(searchCards, (value) => {
  if (value) {
    state.filtersCards = [
      {
        fieldFilter: 'name',
        value: searchCards.value,
      },
    ];
  }
 else {
    state.filtersCards = [];
  }
});

onMounted(() => {
  state.getBoardData(boardId);
});
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
