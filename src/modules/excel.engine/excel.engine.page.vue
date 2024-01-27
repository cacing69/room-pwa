<template>
  <van-sticky>
    <van-nav-bar
      title="Excel engine"
      left-text="Back"
      left-arrow
      @click-left="onNavLeftClick"
    />
  </van-sticky>
  <van-row gutter="10" style="padding: 3vw"> this is excel engine </van-row>
</template>
<script setup lang="ts">
import { onNavLeftClick } from "../../utils/compose.util";

const onClickLeft = () => history.back();
</script>
