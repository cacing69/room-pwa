<template>
  <div id="app-container">
    <div class="layout-content" style="max-height: 93vh; overflow: scroll">
      <slot />
    </div>
  </div>
  <div class="layout-footer">
    <van-tabbar
      class="van-safe-area-bottom"
      v-model="active"
      style="padding-bottom: 1.75vh"
    >
      <template v-for="tab in tabMenu" v-bind:key="tab">
        <van-tabbar-item
          :name="tab?.name"
          :icon="tab?.icon"
          @click="navigateTo(tab.name)"
          style="text-transform: capitalize"
          >{{ tab.name }}</van-tabbar-item
        >
    </template>
    </van-tabbar>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const active = ref("home");
const router = useRouter();
const route = useRoute();

const tabMenu = [
  {
    name: "home",
    icon: "home-o",
  },
  {
    name: "caption",
    icon: "edit",
  },
  {
    name: "order",
    icon: "cart-o",
  },
  {
    name: "setting",
    icon: "setting-o",
  },
];

const navigateTo = (e: string) => {
  active.value = e;

  router.replace({
    name: `module:${e}`,
    params: {
      locale: "en",
    },
  });
};

onMounted(() => {
  tabMenu.forEach((v, k) => {
    if (route.path.includes(v.name)) {
      active.value = v.name;
    }
  });
});
</script>
