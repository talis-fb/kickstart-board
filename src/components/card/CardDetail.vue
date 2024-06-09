<template>
  <div
    class="flex fixed top-0 left-0 z-40 justify-center items-center w-full h-full bg-backdrop"
    data-cy="card-detail-backdrop"
    @click.self="
      closeModalCardEdit(activeCard.id);
      router.push(router.currentRoute.value.path);
    "
  >
    <div
      class="grid overflow-scroll grid-cols-4 gap-1 p-5 w-11/12 max-w-7xl h-5/6 bg-gray2"
      data-cy="card-detail"
    >
      <div class="flex flex-col col-span-3 gap-3">
        <div class="mb-4 ml-9">
          <div class="flex gap-3">
            <div class="w-6 h-6 opacity-75">
              <BoardIcon />
            </div>
            <input
              v-model="activeCard.name"
              v-click-away="clickAwayCardName"
              data-cy="card-detail-title"
              class="p-1 w-full h-8 text-xl font-bold bg-white bg-opacity-0 focus:bg-opacity-80 rounded outline-none"
              @focus="
                selectInput($event);
                cardNameInputActive = true;
              "
              @change="patchCard(activeCard, { name: activeCard.name })"
              @keyup.enter="
                blurInput($event);
                cardNameInputActive = false;
              "
              @keyup.esc="
                blurInput($event);
                cardNameInputActive = false;
              "
            >
          </div>
          <div class="flex flex-col gap-2 ml-9">
            <h2 class="text-gray-600">
              in list <span
                class="underline"
                data-cy="card-list-name"
              >{{ cardListName }}</span>
            </h2>
            <h2 class="text-gray-600">
              DUE DATE
            </h2>
            <div class="flex gap-2">
              <Checkbox :card="activeCard" />
              <h2
                class="p-1 text-gray-600 bg-gray3 rounded cursor-pointer hover:bg-gray"
                @click="showDate = true"
              >
                {{ new Date(activeCard.deadline).toDateString() }}
                <button data-cy="calendar-dropdown">
                  <Downarrow class="inline-block py-2 pl-2 w-5 text-gray-800 cursor-pointer fill-current stroke-current" />
                </button>
              </h2>
              <div
                v-if="showDate"
                class="absolute"
              >
                <Datepicker
                  v-model="date"
                  v-click-away="clickAwayDate"
                  inline
                  auto-apply
                  :enable-time-picker="false"
                  data-cy="card-detail-deadline"
                  @update:model-value="updateDate"
                >
                  <template #day="{ day }">
                    <div data-cy="day">
                      {{ day }}
                    </div>
                  </template>
                  <template #month="{ text }">
                    <div data-cy="header-month">
                      {{ text }}
                    </div>
                  </template>
                  <template #month-overlay="{ text }">
                    <div data-cy="month">
                      {{ text }}
                    </div>
                  </template>
                  <template #year="{ year }">
                    <div data-cy="header-year">
                      {{ year }}
                    </div>
                  </template>
                  <template #year-overlay="{ text }">
                    <div data-cy="year">
                      {{ text }}
                    </div>
                  </template>
                </Datepicker>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-4 ml-9">
          <div class="flex gap-2">
            <div class="w-6 h-6 opacity-75">
              <Description />
            </div>
            <h1 class="inline-block mb-4 text-lg font-bold text-black">
              Description
            </h1>
          </div>
          <div class="flex lg:ml-9">
            <MdEditor
              v-model="activeCard.description"
              language="en-US"
              code-theme="atom"
              :scroll-element="scrollElement"
              class="p-3 w-full h-25 max-h-50"
            />
            <!-- <textarea
              v-model="activeCard.description"
              class="p-3 w-full h-36 rounded resize-none"
              data-cy="card-description"
              @focus="
                selectInput($event);
                descriptionInputActive = true;
              "
              @change="patchCard(activeCard, { description: activeCard.description })"
              @keydown.enter="
                blurInput($event);
                descriptionInputActive = false;
              "
              @keyup.esc="
                blurInput($event);
                descriptionInputActive = false;
              "
            /> -->
          </div>
        </div>
        <div class="mb-4 ml-9">
          <div class="flex gap-2">
            <div class="w-6 h-6 opacity-75">
              <Attachment />
            </div>
            <h1 class="inline-block mb-4 text-lg font-semibold text-black">
              Image
            </h1>
          </div>
          <div class="lg:ml-9">
            <div
              v-if="activeCard.image"
              class="grid grid-cols-6 gap-x-4"
              data-cy="image-attachment"
            >
              <div class="col-span-2 row-span-2">
                <img :src="'/backend' + activeCard.image">
              </div>
              <div class="col-span-4 font-bold">
                {{ activeCard.image.replace(`/data/uploaded/${activeCard.id}_`, '') }}
                <a
                  class="block font-normal underline cursor-pointer"
                  data-cy="image-delete"
                  :href="'/backend' + activeCard.image"
                  download
                >
                  <Download class="inline-block mb-1 w-4" />Download
                </a>
                <div
                  class="block font-normal underline cursor-pointer"
                  data-cy="image-delete"
                  @click="patchCard(activeCard, { image: null })"
                >
                  <Cross class="inline-block mb-1 w-4" />Delete
                </div>
              </div>
            </div>
            <Dropzone
              v-else
              :card="activeCard"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-1 w-full">
        <div class="flex justify-end w-full h-8 cursor-pointer">
          <Cross
            class="w-6 h-6 text-gray-600 hover:bg-gray5 rounded-sm fill-current"
            @click="
              closeModalCardEdit(activeCard.id);
              router.push(router.currentRoute.value.path);
            "
          />
        </div>
        <div
          class="py-0.5 px-2 text-sm text-gray-600 bg-gray3 hover:bg-gray5 rounded-sm cursor-pointer"
          data-cy="calendar-button"
          @click="showDate = true"
        >
          <Clock class="inline-block mr-2 mb-0.5 w-4" />Due date
        </div>
        <div
          class="py-0.5 px-2 text-sm text-gray-600 bg-gray3 hover:bg-gray5 rounded-sm cursor-pointer"
          data-cy="copy-properties"
          @click="copyProperties(activeCard)"
        >
          <Copy class="inline-block mr-2 mb-0.5 w-4" />Copy attributes
        </div>
        <div
          class="py-0.5 px-2 text-sm text-gray-600 bg-gray3 hover:bg-gray5 rounded-sm cursor-pointer"
          data-cy="card-detail-delete"
          @click="
            deleteCard(activeCard);
            router.push(router.currentRoute.value.path);
          "
        >
          <Trash class="inline-block mr-2 mb-0.5 w-4" />Delete card
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { blurInput } from '@/utils/blurInput';
import { ref, onMounted } from 'vue';
import { selectInput } from '@/utils/selectInput';
import { useStore } from '@/stores/store';
import Attachment from '@/assets/icons/attachment.svg';
import BoardIcon from '@/assets/icons/board.svg';
import Card from '@/typings/card';
import Checkbox from '@/components/Checkbox.vue';
import Clock from '@/assets/icons/clock.svg';
import Copy from '@/assets/icons/copy.svg';
import Cross from '@/assets/icons/cross.svg';
import Download from '@/assets/icons/download.svg';
import Description from '@/assets/icons/description.svg';
import Downarrow from '@/assets/icons/downarrow.svg';
import Dropzone from '../Dropzone.vue';
import List from '@/typings/list';
import Trash from '@/assets/icons/trash.svg';
import moment from 'moment';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const scrollElement = document.documentElement;

const router = useRouter();
const { showNotification, closeModalCardEdit, patchCard, deleteCard } = useStore();
const { lists, activeCard } = storeToRefs(useStore());
const cardListName = lists.value.find((l: List) => l.id === activeCard.value.listId)!['name'];

const showDate = ref(false);
const cardNameInputActive = ref(false);
const descriptionInputActive = ref(false);
const date = ref(new Date());

const clickAwayCardName = () => {
  cardNameInputActive.value = false;
};
const clickAwayDate = () => {
  showDate.value = false;
};

const updateDate = (data: string) => {
  const formattedDate = moment(data).format('YYYY-MM-DD');
  patchCard(activeCard.value, { deadline: formattedDate });
  showDate.value = false;
};

const copyProperties = (content: Card) => {
  const clipBoardValue = JSON.stringify(content, null, 2);
  const clipboard = window.navigator.clipboard;
  showNotification('Card info copied to clipboard', false);
  return clipboard.writeText(clipBoardValue);
};

onMounted(() => {
  router.push(`${router.currentRoute.value.path}?card=${activeCard.value.id}`);
});
</script>
