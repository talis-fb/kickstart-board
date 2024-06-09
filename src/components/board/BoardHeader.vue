<template>
      <div class="py-2.5">
        <div class="inline-block relative py-1.5 mr-0 ml-3 h-8">
          <div class="inline-block invisible px-3 font-bold">
            <!-- {{ state.board.name }} -->
            {{ boardName }}
          </div>

          <!-- v-click-away="onClickAway" -->
          <input
            v-model="boardName"
            class="text-white bg-white bg-opacity-20 hover:bg-opacity-30 board-title"
            data-cy="board-title"
            autocomplete="off"
            name="board-title"
            @focus="selectInput($event)"
            @change="onChangeBoardName"
            @keyup.enter="blurInput($event)"
            @keyup.esc="blurInput($event)"
          >

        </div>
        <div
          class="inline-grid relative self-center ml-2 w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-sm cursor-pointer"
          :class="[starred ? 'fill-current text-yellow-300' : 'stroke-current text-white']"
          data-cy="star"
          @click="$emit('clickOnStar')"
        >
          <Star class="place-self-center m-2" />
        </div>
        <BoardOptions :board="board" />
      </div>
</template>

<script setup lang="ts">
import Board from '@/typings/board';
import { blurInput } from '@/utils/blurInput';
import { selectInput } from '@/utils/selectInput';
import BoardOptions from '@/components/board/BoardOptions.vue';
import Star from '@/assets/icons/star.svg';

const props = defineProps<{
    boardName: string,
    board: Board,
    starred: boolean,
    onChangeBoardName: () => void
}>()

console.log('starred', props.starred);

defineEmits(['update:boardName', 'clickOnStar']);
</script>

<style lang="postcss" scoped>
.board-title:focus {
  @apply bg-gray1 bg-opacity-100 hover:bg-opacity-100 text-black;
}

.board-title {
  @apply absolute outline-none font-bold top-0 bottom-0 right-0 left-0 w-full pl-3 rounded-sm cursor-pointer;
}
</style>