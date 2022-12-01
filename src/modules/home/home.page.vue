
<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh" style="height: 100vh;padding-top: 2vh;">
    <van-cell-group inset>
      <van-cell title="Cell title" value="Content" />
      <van-cell title="Cell title" value="Content" label="Description" />
    </van-cell-group>
  </van-pull-refresh>
</template>
<script setup lang="ts">
import { ref } from 'vue';
  import { showToast } from 'vant';

  const count = ref(0);
  const loading = ref(false);

  const onRefresh = () => {
      setTimeout(() => {
        showToast('Refresh Success');
        loading.value = false;
        count.value++;
      }, 1000);
    };
</script>
