<template>
  <van-sticky>
    <van-nav-bar
      title="Instagram"
      left-text="Back"
      left-arrow
      @click-right="onClickRight"
      @click-left="onClickLeft"
    >
      <template #right>
        <van-icon name="plus" />
      </template>
    </van-nav-bar>
  </van-sticky>
  <van-pull-refresh v-model="isFetching" @refresh="onRevalidate()" style="height: 100vh;">
    <van-row>
      <van-grid :border="true" clickable :column-num="3">
        <template v-for="page in data?.pages">
          <van-grid-item v-for="item in page.data" @click="contentClicked(item.id)">
            <van-image
              width="7.6rem"
              height="7.6rem"
              lazy-load
              :src="item.coverUrl"
            />
          </van-grid-item>
        </template>
      </van-grid>
    </van-row>
  <van-row style="padding: 2vh;">
  <!-- <div > -->
    <van-button round plain type="primary" size="small" block @click="fetchNextPage" :disabled="!hasNextPage">Load more</van-button>
  <!-- </div> -->
  </van-row>
  </van-pull-refresh>
</template>

<script setup lang="ts">
  import { useRouter } from "vue-router";
  import { showToast } from 'vant';
  import { useInfiniteQuery, useQueryClient } from "vue-query";
  import { getInstagram } from "../../services/instagram.api";
import { ref } from "vue";

  const router = useRouter();

  const onClickLeft = () => history.back();

  const onClickRight = () => {
    router.push({
      name: "module:instagram:input",
      params : {
        locale : 'en'
      }
    });
  };


  const queryClient = useQueryClient();

  const onRevalidate = () => {
    queryClient.resetQueries();
  }

  const contentClicked = (id: any) => {
    router.push({
      name: "module:instagram:detail",
      params : {
        locale: 'en',
        uuid: id
      }
    });
  }

  const limit = ref(15);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isRefetching,
    refetch
  } = useInfiniteQuery({
    queryKey: ['getInstagram'],
    queryFn: (pageParam) => getInstagram(pageParam, { limit: limit.value }),
    getNextPageParam: (lastPage, pages) => lastPage.data.length == limit.value ? lastPage.meta.page + 1 : undefined,
    refetchOnWindowFocus: false
  });

  // refetch({ refetchPage: (page, index) => index === 0 })
</script>
