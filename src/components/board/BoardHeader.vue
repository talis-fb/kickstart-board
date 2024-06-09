<template>
  <div class="flex gap-2 justify-start ml-2">
    <div class="relative py-1.5 h-8">
      <div class="invisible px-3">
        {{ inputBoardName }}
      </div>

      <input
        v-model="inputBoardName"
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
      class="relative self-center w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-sm cursor-pointer"
      :class="[starred ? 'fill-current text-yellow-300' : 'stroke-current text-white']"
      data-cy="star"
      @click="$emit('clickOnStar')"
    >
      <StarIcon class="place-self-center m-2" />
    </div>

    <BoardOptions
      :board="board"
      class="inline-grid relative w-8 h-8"
    />

    <SearchCards
      v-model:input="inputSearchCards"
      class="inline-grid relative w-60 h-8"
    />
  </div>
</template>

<script setup lang="ts">
import Board from '@/typings/board';
import { blurInput } from '@/utils/blurInput';
import { selectInput } from '@/utils/selectInput';
import BoardOptions from '@/components/board/BoardOptions.vue';
import StarIcon from '@/assets/icons/star.svg';
import { ref, watch } from 'vue';
import SearchCards from './SearchCards.vue';

const props = defineProps<{
  boardName: string;
  searchCards: string;
  board: Board;
  starred: boolean;
  onChangeBoardName: () => void;
}>();

const emit = defineEmits(['update:boardName', 'clickOnStar', 'update:searchCards']);

const inputBoardName = ref(props.boardName);
watch(inputBoardName, () => {
  emit('update:boardName', inputBoardName.value);
});

const inputSearchCards = ref('');
watch(inputSearchCards, () => {
  console.log(inputSearchCards.value);
  emit('update:searchCards', inputSearchCards.value);
});
</script>

<style lang="postcss" scoped>
.board-title:focus {
  @apply bg-gray1 bg-opacity-100 hover:bg-opacity-100 text-black;
}

.board-title {
  @apply absolute outline-none font-bold top-0 bottom-0 right-0 left-0 w-full pl-3 rounded-sm cursor-pointer;
}
</style>
