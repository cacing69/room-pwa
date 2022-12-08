<template>
  <van-sticky>
    <van-nav-bar
      title="Content detail"
      left-text="Back"
      left-arrow
      @click-left="onClickLeft"
    />
  </van-sticky>
  <div style="padding: 1vh;">
    <van-swipe lazy-render style="height: 40vh;" :loop="false">
      <van-swipe-item v-for="(media, index) in data?.medias" :key="media" >
        <van-image lazy-load :src="media.url" width="100%" height="100%" style="object-fit: cover;" @click="onPreviewImage(index)"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup lang="ts">
  import { showImagePreview } from 'vant';
  import { useQuery } from 'vue-query';
  import { useRoute } from 'vue-router';
  import { getInstagramDetail } from '../../services/instagram.api';

const onClickLeft = () => history.back();

const onPreviewImage = (index: number) => {
    showImagePreview({
      images: data.value?.medias?.map((media: any) => media.url),
      closeable: true,
      startPosition: index,
      loop: false
    });
  }

  const route = useRoute();
  const instagramId = route.params.uuid;
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['instagramDetail', instagramId],
    queryFn: () => getInstagramDetail(instagramId as any),
    select: (data) => data?.data,
    refetchOnWindowFocus: false
  });
</script>
