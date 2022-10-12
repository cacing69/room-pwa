<template>
  <component :is="layout">
    <div id="main-container">
      <router-view />
    </div>
  </component>
</template>

<script setup lang="ts">

import Default from "./layouts/default.layout.vue";
import { markRaw, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const layout = ref();
const route = useRoute();

watch(
  () => route?.meta?.layout,
  async (metaLayout) => {
    try {
      const component =
        metaLayout && (await import(`./layouts/${metaLayout}.layout.vue`));
      layout.value = markRaw(component?.default || Default);
    } catch (e) {
      layout.value = markRaw(Default);
    }
  }
);

</script>
