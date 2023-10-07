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
      v-model="urlForwarder"
      placeholder="Paste url scraper here"
      label-align="top"
    />
  </van-cell-group>
  <van-cell-group inset title="Scrape content">
    <van-grid :border="true" clickable :column-num="3">
      <van-grid-item v-for="top3Item in top3Data" v-bind:key="top3Item">
        <van-image
          width="6.97rem"
          height="6.97rem"
          lazy-load
          :src="top3Item.coverUrl"
        />
      </van-grid-item>
    </van-grid>
    <van-field
      v-for="(url, index) in urls"
      v-bind:key="url"
      v-model="urls[index]"
      :readonly="index != urls.length - 1"
      @keypress.enter="submitUrl"
      :placeholder="`https://www.instagram.com/p/uniqId_${index + 1}/`"
      :rules="[{ required: false, message: 'brand is required' }]"
      @click-right-icon="removeUrl(index)"
      right-icon="delete-o"
    />
  </van-cell-group>
  <van-row style="padding: 2vh">
    <van-button
      round
      :disabled="!canAddMoreUrl"
      plain
      type="primary"
      size="small"
      block
      @click="addUrl()"
      >Add more url</van-button
    >
  </van-row>
  <van-submit-bar
    :loading="isPending"
    :disabled="isPending"
    button-type="primary"
    button-text="Scrape"
    @submit="submitUrl()"
  />
</template>

<script setup lang="ts">
import { closeToast, showLoadingToast, showNotify, showToast } from "vant";
import { computed, onMounted, ref } from "vue";
import store from "store2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { getInstagram, postInstagramUrls } from "../../services/instagram.api";

const onClickLeft = () => history.back();
const urls = ref<string[]>([""]);

const urlForwarder = ref("");
const queryClient = useQueryClient();

const canAddMoreUrl = computed(() => urls.value[urls.value.length - 1] != "");

const { error, mutate, reset, isPending } = useMutation({
  mutationFn: postInstagramUrls,
  onSettled: () => {
    closeToast();
  },
  onSuccess: () => {
    setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ["getTop3Instagram"] });
    }, 1000);

    showNotify({
      type: "success",
      message: "Url scraped",
    });
    urls.value = [""];
  },
  onError: () => {
    showNotify({
      type: "danger",
      message: "Failed to scrape",
    });
  },
});

const addUrl = () => {
  urls.value.push("");
};

const removeUrl = (index: number) => {
  if (urls.value.length == 1) {
    showNotify({
      type: "warning",
      message: "There is 1 field left for url input",
    });
  } else {
    urls.value.splice(index, 1);
  }
};

const getCleanUrls = computed(() => {
  if (urls.value.length >= 1) {
    if (!urls.value[urls.value.length - 1].match(/^https?:\/\/.*/)) {
      if (urls.value.length != 1) {
        return urls.value.splice(urls.value.length - 1, 1);
      }
    }
  }

  return urls.value;
});

const hasDuplicates = computed(
  () => urls.value.length !== new Set(urls.value).size
);

const { data: top3Data } = useQuery({
  queryKey: ["getTop3Instagram"],
  queryFn: () => getInstagram({ pageParam: 1 }, { limit: 3 }),
  select: (data) => data?.data,
  refetchOnWindowFocus: false,
});

const submitUrl = () => {
  if (urlForwarder.value?.trim()?.length == 0) {
    showNotify({
      type: "warning",
      message: "There are empty forwarder ",
    });

    return;
  } else {
    if (
      !urlForwarder.value
        ?.trim()
        ?.match(/^https?:\/\/(localhost:\d{4}|.*\.ngrok\.io)/)
    ) {
      showNotify({
        type: "warning",
        message: "There are invalid forwarder ",
      });
      return;
    }
  }

  store.set("urlForwarder", urlForwarder.value);

  if (urls.value.length == 1) {
    if (!urls.value[0].match(/^https:\/\/.*/)) {
      showNotify({
        type: "warning",
        message: "There are empty urls ",
      });

      return;
    }
  }

  if (!hasDuplicates.value) {
    showLoadingToast({
      duration: 0,
      forbidClick: true,
      loadingType: "spinner",
      message: "Loading...",
    });

    mutate({
      urls: getCleanUrls.value,
      forwarder: urlForwarder.value,
    });
  } else {
    showNotify({
      type: "warning",
      message: "There are duplicate urls ",
    });
  }
};

onMounted(() => {
  urlForwarder.value = store.get("urlForwarder");
});
</script>
