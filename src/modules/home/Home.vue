
<template>
  <!-- <div class="" style="padding: 5vw;">

  </div> -->
    <van-row gutter="10" style="padding:3vw;">
      <van-col span="24" class="bg-danger">span: 8</van-col>
    </van-row>
    <van-row gutter="10" style="padding:3vw;">
      <van-col span="8" class="bg-primary" >span: 8</van-col>
      <van-col span="8" class="bg-success" >span: 8</van-col>
      <van-col span="8" class="bg-primary" >span: 8</van-col>
    </van-row>
  <!-- <div class="" style="padding: 5vw;">

  </div> -->
</template>
<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const active = ref("home");

const count = ref(0)
</script>
