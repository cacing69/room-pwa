<template>
  <div class="van-safe-area-bottom">
    <van-list
      v-model:loading="isLoading"
      :finished="!isLoading"
      finished-text="Finished"
    >
      <van-cell
        @click="goToDetail(post.id)"
        v-for="post in data"
        :key="post"
        :title="post.title"
      />
    </van-list>
  </div>
</template>
<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { getPosts } from "../../services/json_placeholder.api";
import { useRouter } from "vue-router";

const router = useRouter();

const { isLoading, isError, data, error } = useQuery({
  queryKey: ["posts"],
  queryFn: getPosts,
});

const goToDetail = (id: string) => {
  router.push(`/en/order/${id}`);
};
</script>
