<template>
<van-nav-bar
  title="Instagram"
  left-text="Back"
  right-text="Add"
  left-arrow
  @click-right="onClickRight"
  @click-left="onClickLeft"
/>
  <van-row>
    <van-grid :border="true" clickable :column-num="3">
      <van-grid-item @click="contentClicked({})">
        <van-image
          width="7.6rem"
          height="7.6rem"
          lazy-load
          src="https://room-bucket.s3.ap-southeast-3.amazonaws.com/3ec3127e-722d-48ca-8a4d-e5063a675ab6.jpg"
        />
      </van-grid-item>
      <van-grid-item @click="contentClicked({})">
        <van-image
          width="7.6rem"
          height="7.6rem"
          lazy-load
          src="https://room-bucket.s3.ap-southeast-3.amazonaws.com/3ec3127e-722d-48ca-8a4d-e5063a675ab6.jpg"
        />
      </van-grid-item>
      <van-grid-item @click="contentClicked({})">
        <van-image
          width="7.6rem"
          height="7.6rem"
          lazy-load
          src="https://room-bucket.s3.ap-southeast-3.amazonaws.com/3ec3127e-722d-48ca-8a4d-e5063a675ab6.jpg"
        />
      </van-grid-item>
      <van-grid-item @click="contentClicked({})">
        <van-image
          width="7.6rem"
          height="7.6rem"
          lazy-load
          src="https://room-bucket.s3.ap-southeast-3.amazonaws.com/3ec3127e-722d-48ca-8a4d-e5063a675ab6.jpg"
        />
      </van-grid-item>
      <van-grid-item @click="contentClicked({})">
        <van-image
          width="7.6rem"
          height="7.6rem"
          lazy-load
          src="https://room-bucket.s3.ap-southeast-3.amazonaws.com/3ec3127e-722d-48ca-8a4d-e5063a675ab6.jpg"
        />
      </van-grid-item>
      <van-grid-item @click="contentClicked({})">
        <van-image
          width="7.6rem"
          height="7.6rem"
          lazy-load
          src="https://room-bucket.s3.ap-southeast-3.amazonaws.com/3ec3127e-722d-48ca-8a4d-e5063a675ab6.jpg"
        />
      </van-grid-item>
    </van-grid>
  </van-row>
  <van-row style="padding: 2vh;">
    <!-- <div > -->
      <van-button plain type="primary" size="small" block @click="onLoadMore()">Load more</van-button>
    <!-- </div> -->
  </van-row>
</template>

<script setup lang="ts">
  import { useRouter } from "vue-router";
  import { showToast } from 'vant';

  const router = useRouter();

  const onClickLeft = () => history.back();
  const onLoadMore = () => {
    showToast('Load more');
  };

  const onClickRight = () => {
    router.push({
      name: "module:instagram:input",
      params : {
        locale : 'en'
      }
    });
  };
const contentClicked = (e: any) => {
    router.push({
      name: "module:instagram:detail",
      params : {
        locale: 'en',
        id: 'uuid'
      }
    });
}
</script>
