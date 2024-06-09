<template>
  <div
    class="grid"
    :class="state.loadingError.show ? 'bg-white' : 'bg-blue6'"
  >
    <!-- LOADING -->
    <BoardLoading v-if="state.loading" />


    <!-- ERROR STATE -->
    <BoardError 
      v-if="state.loadingError.show" 
      :status="state.loadingError.status" 
      :error-message="state.loadingError.message" />


    <!-- BOARD DETAIL -->
    <div
      v-if="!state.loading && !state.loadingError.show"
      class="overflow-x-auto whitespace-nowrap board-detail"
      data-cy="board-detail"
    >
    
    <BoardHeader 
      v-model:board-name="state.board.name" 
      :board="state.board" 
      :starred="state.board.starred" 
      :on-change-board-name="() => state.patchBoard(state.board, { name: state.board.name })"
      @clickOnStar="state.patchBoard(
        state.board, 
        { starred: !state.board.starred }
      )"
      />

      <!-- <BoardHeader /> -->

      <draggable
        v-model="state.lists"
        animation="150"
        group="lists"
        item-key="order"
        class="inline-block"
        @end="state.updateListsOrder"
      >
        <template #item="{ element }">
          <div
            class="inline-block align-top"
            data-cy="list-placeholder"
          >
            <ListItem :list="element" />
          </div>
        </template>
      </draggable>
      <div class="inline-block align-top">
        <ListCreate :board="state.board.id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { blurInput } from '@/utils/blurInput';
import { ref } from 'vue';
import { selectInput } from '@/utils/selectInput';
import { useStore } from '@/stores/store';
import { useRoute } from 'vue-router';
import BoardOptions from '@/components/board/BoardOptions.vue';
import BoardLoading from '@/components/board/BoardLoading.vue';
import BoardHeader from '@/components/board/BoardHeader.vue';
import BoardError from '@/components/board/BoardError.vue';
import ListCreate from '@/components/list/ListCreate.vue';
import ListItem from '@/components/list/ListItem.vue';
import LoadingIcon from '@/assets/icons/loadingIcon.svg';
import Star from '@/assets/icons/star.svg';
import draggable from 'vuedraggable';
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
