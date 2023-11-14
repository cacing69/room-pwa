<template>
  <van-sticky>
    <van-nav-bar title="Order Detail" left-arrow @click-left="onClickLeft">
    </van-nav-bar>
  </van-sticky>
  <van-row gutter="10" style="padding: 3vw">
    this is order detail {{ postId }}</van-row
  >
  <span v-if="isLoading">
    <van-skeleton title :row="3" />
  </span>
  <span v-else-if="isError">Error: {{ error?.message }}</span>
  <span v-else-if="data" style="padding-bottom: 1.75vh">
    <span>{{ data.title }}</span>
  </span>
  <!-- We can assume by this point that `isSuccess === true` -->
</template>
<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { getPost } from "../../services/json_placeholder.api";
import { useRoute } from "vue-router";

const route = useRoute();

const postId = route.params.id;

const { isLoading, isError, data, error } = useQuery({
  queryKey: ["post", postId],
  queryFn: ({ queryKey }) => getPost(queryKey[1]),
});

const onClickLeft = () => (window as any).history.back();
</script>
