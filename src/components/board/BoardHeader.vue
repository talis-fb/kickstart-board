<template>
  <div>
    <div class="inline-block relative py-1.5 mr-0 ml-3 h-8">
      <div class="inline-block invisible px-3 font-bold">
        {{ boardName }}
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
      class="inline-grid relative self-center ml-2 w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-sm cursor-pointer"
      :class="[starred ? 'fill-current text-yellow-300' : 'stroke-current text-white']"
      data-cy="star"
      @click="$emit('clickOnStar')"
    >
      <StarIcon class="place-self-center m-2" />
    </div>
    
    <BoardOptions :board="board" class="inline-grid relative h-8 w-8 ml-2" />

    <SearchCards 
      class="inline-grid relative h-8 w-60 ml-2 bg-white bg-opacity-20 hover:bg-opacity-30" />


    <div class="relative inline-grid h-8">
      <div class="inline-block invisible font-bold">
        <SearchIcon />
      </div>

      <input
        v-model="searchCards"
        class="text-white bg-white bg-opacity-20 hover:bg-opacity-30 board-title"
        placeholder="Search cards in list.."
        data-cy="board-title"
        autocomplete="off"
        name="board-title"
        @keyup.enter="blurInput($event)"
        @keyup.esc="blurInput($event)"
      >
    </div>

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
import SearchIcon from '@/assets/icons/search.svg';

const props = defineProps<{
  boardName: string;
  board: Board;
  starred: boolean;
  onChangeBoardName: () => void;
}>();

const emit = defineEmits(['update:boardName', 'clickOnStar']);

const inputBoardName = ref(props.boardName);
watch(inputBoardName, () => {
  emit('update:boardName', inputBoardName.value);
});


const searchCards = ref('');
</script>

<style lang="postcss" scoped>
.board-title:focus {
  @apply bg-gray1 bg-opacity-100 hover:bg-opacity-100 text-black;
}

.board-title {
  @apply absolute outline-none font-bold top-0 bottom-0 right-0 left-0 w-full pl-3 rounded-sm cursor-pointer;
}
</style>
