<template>
  <component :is="layout">
    <div id="main-container"  style="height: auto;">
      <router-view />
    </div>
  </component>
</template>

<script setup lang="ts">

import Default from "./layouts/default.layout.vue";
import { markRaw, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRegisterSW } from "virtual:pwa-register/vue";

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

if ("serviceWorker" in navigator) {
  console.log("serviceWorker");
  // && !/localhost/.test(window.location)) {
  useRegisterSW();
}

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
