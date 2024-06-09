<template>
  <Search v-if="state.showSearch" />
  <Navbar />
  <Notification />
  <Tools v-if="state.showTools" />
  <router-view class="mt-10" />
</template>

<script setup lang="ts">
import { useStore } from '@/stores/store';
import Navbar from '@/components/Navbar.vue';
import Notification from '@/components/Notification.vue';
import Tools from '@/components/Tools.vue';
import Search from '@/components/Search.vue';
import { authTokenValidationMiddleware } from '@/middlewares/authToken';
import { shortcutSetupMiddleware } from '@/middlewares/shortcuts';

const state = useStore();

authTokenValidationMiddleware();
shortcutSetupMiddleware();
</script>
