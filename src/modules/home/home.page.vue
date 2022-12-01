
<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh" style="height: 100vh;padding-top: 0vh;">
    <van-cell-group inset title="This month">
      <van-cell title="Earnings" value="1.000.000" />
      <van-cell title="Order" value="100"/>
    </van-cell-group>
    <van-cell-group title="Tools">
      <van-grid :border="false">
        <van-grid-item icon="photo-o"  text="Instagram" @click="() => { }"/>
        <van-grid-item icon="photo-o" text="Column 2" />
        <van-grid-item icon="photo-o" text="Column 3" />
        <van-grid-item icon="photo-o" text="Column 4" />
      </van-grid>
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
