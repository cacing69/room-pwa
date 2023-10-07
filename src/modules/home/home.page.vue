<template>
  <van-pull-refresh
    v-model="loading"
    @refresh="onRefresh"
    style="height: 100vh"
  >
    <van-cell-group inset title="This month">
      <van-cell title="Earnings" value="1.000.000" />
      <van-cell title="Order" value="100" />
    </van-cell-group>
    <van-cell-group inset title="Tools">
      <van-grid :border="false" clickable :column-num="2">
        <van-grid-item to="/en/instagram">
          <van-row>
            <font-awesome-icon icon="fa-brands fa-instagram" size="2x" />
          </van-row>
          <van-row style="padding-top: 1vh">
            <span style="font-size: 12px">Instagram</span>
          </van-row>
        </van-grid-item>
        <van-grid-item to="/en/excel-engine">
          <van-row>
            <font-awesome-icon icon="fa-solid fa-file-excel" size="2x" />
          </van-row>
          <van-row style="padding-top: 1vh">
            <span style="font-size: 12px">Excel Engine</span>
          </van-row>
        </van-grid-item>
        <van-grid-item to="/en/resi-manual">
          <van-row>
            <font-awesome-icon icon="fa-solid fa-print" size="2x" />
          </van-row>
          <van-row style="padding-top: 1vh">
            <span style="font-size: 12px">Resi Manual</span>
          </van-row>
        </van-grid-item>
      </van-grid>
      <!-- <van-row>
        <van-col span="6">
          <van-icon name="chat-o" size="50" @click="()=>{}"/>
        </van-col>
        <van-col span="6">span: 6</van-col>
        <van-col span="6">span: 6</van-col>
        <van-col span="6">span: 6</van-col>
      </van-row> -->
    </van-cell-group>
  </van-pull-refresh>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { showToast } from "vant";

const count = ref(0);
const loading = ref(false);

const onRefresh = () => {
  setTimeout(() => {
    showToast("Refresh Success");
    loading.value = false;
    count.value++;
  }, 1000);
};
</script>
