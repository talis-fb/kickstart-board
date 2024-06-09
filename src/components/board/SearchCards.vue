<template>
  <div>
    <div class="flex overflow-hidden items-center w-full h-full bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg">
      <div class="w-12 h-full">
        <SearchIcon class="p-1 w-full h-full text-white" />
      </div>

      <div class="h-full">
        <input
          id="search"
          v-model="bindingInputValue"
          type="text"
          placeholder="Search something..."
          class="w-full h-full text-sm font-bold text-white placeholder:text-white bg-white bg-opacity-0 outline-none"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchIcon from '@/assets/icons/search.svg';
import { inputValue } from '@/utils/inputValue';
import { ref, watch } from 'vue';

const props = defineProps<{
  input: string;
}>();
const emit = defineEmits(['update:input']);

const bindingInputValue = ref(props.input);
watch(bindingInputValue, (value) => {
  emit('update:input', value);
});
</script>
