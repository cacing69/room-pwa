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
          src="https://room-bucket.s3.ap-southeast-3.amazonaws.com/f8b17b91-6bce-4557-92ef-89f0dca712ae.jpg"
        />
      </van-grid-item>
      <van-grid-item @click="contentClicked({})">
        <van-image
          width="7.6rem"
          height="7.6rem"
          lazy-load
          src="https://room-bucket.s3.ap-southeast-3.amazonaws.com/252a87be-8948-44d7-a7fc-4c06214ec48a.jpg"
        />
      </van-grid-item>
      <van-grid-item @click="contentClicked({})">
        <van-image
          width="7.6rem"
          height="7.6rem"
          lazy-load
          src="https://room-bucket.s3.ap-southeast-3.amazonaws.com/37beb919-2a14-4b49-8d54-fb60ce681af4.jpg"
        />
      </van-grid-item>
      <van-grid-item @click="contentClicked({})">
        <van-image
          width="7.6rem"
          height="7.6rem"
          lazy-load
          src="https://room-bucket.s3.ap-southeast-3.amazonaws.com/749e58bd-292d-4307-b827-1694506d7455.jpg"
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
