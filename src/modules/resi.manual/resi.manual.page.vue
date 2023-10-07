<template>
  <van-sticky>
    <van-nav-bar
      title="Resi Manual"
      left-text="Back"
      left-arrow
      @click-left="onClickLeft"
    />
  </van-sticky>
  <van-row>
    <van-col span="24">
      <van-cell-group inset title="Customer Info">
        <van-field
          v-model="name"
          name="name"
          label="Name"
          :rules="[{ required: false, message: 'name is required' }]"
        />
        <van-field v-model="phone" name="phone" label="Phone" />
      </van-cell-group>
      <van-cell-group inset title="Address">
        <van-field v-model="address" type="textarea" rows="3" autosize />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="button"
          size="small"
          @click="onPrint"
        >
          Print
        </van-button>
      </div>
    </van-col>
  </van-row>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from "vue";
const name: any = ref("");
const phone: any = ref("");
const address: any = ref("");
const onClickLeft = () => history.back();

const onPrint = () => {};
</script>
