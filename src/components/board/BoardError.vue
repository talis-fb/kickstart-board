<template>
  <div
    class="grid justify-center content-center h-screen"
    data-cy="board-list-error-message"
  >
    <span class="block mb-4 text-8xl font-bold text-center text-gray-200">{{ status }}</span>
    <p class="block mb-4 text-center text-gray-400">
      {{ errorMessage || 'There was an error loading board' }}
    </p>
    <router-link
      to="/"
      class="block font-semibold text-center text-blue7"
    >
      Go back home
    </router-link>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  errorMessage: string;
  status: number;
}>();
</script>
