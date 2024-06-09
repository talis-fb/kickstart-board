<template>
  <draggable
    v-model="state.lists"
    animation="150"
    group="lists"
    item-key="order"
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
</template>

<script setup lang="ts">
import { useStore } from '@/stores/store';
import ListItem from '@/components/list/ListItem.vue';
import draggable from 'vuedraggable';

const state = useStore();
</script>
