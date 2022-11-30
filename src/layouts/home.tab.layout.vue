
<template>
    <div id="app-container">
        <slot/>
    </div>

    <van-tabbar class="van-safe-area-bottom" v-model="active">
        <template v-for="tab in tabMenu">
            <van-tabbar-item :name="tab?.name" :icon="tab?.icon" @click="navigateTo(tab.name)" style="text-transform: capitalize;">{{tab.name}}</van-tabbar-item>
        </template>
    </van-tabbar>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const active = ref("home");
const router = useRouter();
const route = useRoute();

const tabMenu = [
    {
        name: 'home',
        icon: 'home-o',
    },
    {
        name: 'caption',
        icon: 'edit',
    },
    {
        name: 'order',
        icon: 'cart-o',
    },
        {
        name: 'setting',
        icon: 'setting-o',
    }
];

const navigateTo = (e: string) => {
  active.value = e;

  router.replace({
      name: `module:${e}`,
      params: {
          locale: 'en',
      },
  });
}

onMounted(() => {
    tabMenu.forEach((v, k) => {
        if (route.path.includes(v.name)) {
            active.value = v.name;
        }
    });
});

</script>
