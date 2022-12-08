<template>
  <van-sticky>
    <van-nav-bar
      title="Add content"
      left-text="Back"
      left-arrow
      @click-left="onClickLeft"
    />
  </van-sticky>
  <van-cell-group inset title="Url forwarder">
    <van-field
      v-model="urlScraper"
      placeholder="Paste url scraper here"
      label-align="top"
    />
  </van-cell-group>
  <van-cell-group inset title="Scrape content">
    <van-field
      v-for="(url, index) in urls"
      v-model="urls[index]"
      :readonly="(index != urls.length - 1)"
      placeholder="https://www.instagram.com/p/someUniqId/"
      :rules="[{ required: false, message: 'brand is required' }]"
      @click-right-icon="removeUrl(index)"
      right-icon="delete-o"
    />
  </van-cell-group>
  <van-row style="padding: 2vh;">
    <van-button round :disabled="!canAddMoreUrl" plain type="primary" size="small" block @click="addUrl()">Add more url</van-button>
  </van-row>
  <van-action-bar>
    <van-action-bar-icon icon="add-o" text="Add url" @click="" />
    <van-action-bar-button :loading="isLoading" :disabled="isLoading" type="primary" text="Scrape" @click="submitUrl()" />
  </van-action-bar>
  <van-submit-bar :loading="isLoading" :disabled="isLoading" button-type="primary" button-text="Scrape" @submit="submitUrl()" />
</template>

<script setup lang="ts">
  import { closeToast, showLoadingToast, showNotify, showToast } from 'vant';
  import { computed, onMounted, ref } from 'vue';
  import store from "store2";
  import { useMutation } from 'vue-query';
  import { postInstagramUrls } from '../../services/instagram.api';

  const onClickLeft = () => history.back();
  const urls = ref<string[]>([""]);
  const urlScraper = ref("");

  const canAddMoreUrl = computed(() => urls.value[urls.value.length - 1] != "")

  const { error, mutate, reset, isLoading } = useMutation({
    mutationFn: postInstagramUrls,
    onSettled: () => {
      closeToast()
    },
    onSuccess: () => {
      store.set('urlScraper', urlScraper.value)
      showNotify({
        type: 'success',
        message: 'Url scraped'
      });
      urls.value = [""];
    },
    onError: () => {
      showNotify({
        type: 'danger',
        message: 'Failed to scrape'
      });
    }
  });

  const addUrl = () => {
    urls.value.push("");
  };

  const removeUrl = (index: number) => {
    if (urls.value.length == 1) {
      showNotify({
        type: 'warning',
        message: 'There is 1 field left for url input'
      });
    } else {
      urls.value.splice(index, 1);
    }
  }

  const getCleanUrls = computed(() => {
    if (urls.value.length > 1) {
      if (urls.value[urls.value.length - 1] == "") {
        return urls.value.splice(urls.value.length - 1, 1);
      }
    }

    // check if value duplicate;

    return urls.value;
  })

  const hasDuplicates = computed(() => urls.value.length !== new Set(urls.value).size);

const submitUrl = () => {

  if (urlScraper.value?.trim()?.length == 0) {
    showNotify({
      type: 'warning',
      message: 'There are empty url scraper '
    });

    return;
  } else {
    if (!urlScraper.value?.trim()?.match(/^https:\/\/\.*(.*\.)?ngrok.io/)) {
      showNotify({
        type: 'warning',
        message: 'There are invalide url scraper forward '
      });
      return;
    }
  }

    if (!hasDuplicates) {
      showLoadingToast({
        duration: 0,
        forbidClick: true,
        loadingType: "spinner",
        message: "Loading...",
      });
      mutate(
        {
          urls: getCleanUrls.value,
          urlScraper: urlScraper.value
      })
    } else {
      showNotify({
        type: 'warning',
        message: 'There are duplicate urls '
      });
    }
  };

  onMounted(() => {
    urlScraper.value = store.get("urlScraper");
  })
</script>
