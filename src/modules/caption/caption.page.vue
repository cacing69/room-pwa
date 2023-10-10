<template>
  <van-row>
    <van-col span="24">
      <van-cell-group inset style="margin-top: 2vh">
        <van-cell
          is-link
          title="Category"
          @click="showCategory = true"
          :value="categoryObject?.data?.name || 'None'"
        />
        <van-action-sheet
          v-model:show="showCategory"
          :actions="columns"
          @select="onConfirm"
          cancel-text="Close"
          @cancel="onCategoryCancel"
          style="padding-bottom: 1.75vh"
        />
        <van-field
          v-model="brand"
          name="brand"
          label="Brand"
          placeholder=""
          :rules="[{ required: false, message: 'brand is required' }]"
        />
        <van-field
          v-model="design"
          name="design"
          label="Design"
          placeholder=""
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="button"
          size="small"
          @click="onCopy"
        >
          Copy
        </van-button>
      </div>
    </van-col>
  </van-row>
  <van-row>
    <van-col span="24">
      <van-collapse v-model="active">
        <van-collapse-item title="Generated caption" name="1"
          ><div
            style="font-size: 82.5%"
            v-html="generatedCaption.replace(/\n/g, '<br />')"
          ></div
        ></van-collapse-item>
      </van-collapse>
    </van-col>
  </van-row>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { showToast } from "vant";
import { columnsReff } from "./caption.reff";
import Hashids from "hashids";

const columns = columnsReff;

const showCategory = ref(false);

const active = ref(["1"]);
const brand: any = ref("");
const design: any = ref("");
const categoryObject: any = reactive({});

const onCategoryCancel = () => (showCategory.value = false);

const generatedCaption = computed(() => {
  const replaceBrand =
    brand.value?.toLowerCase()?.replaceAll(" ", "") || "thrift";
  const replaceDesign =
    design.value?.toLowerCase()?.replaceAll(" ", "") || "thrift";

  const timestamp = new Date().getTime();
  const hashids = new Hashids();
  const replaceUuid = hashids.encode(timestamp);

  const getPattern = categoryObject?.data?.meta?.hashtag
    ?.map((e: string) => {
      return `#${e
        .replaceAll("#brand#", replaceBrand)
        .replaceAll("#design#", replaceDesign)
        .replaceAll("#uuid#", `${replaceUuid}`)}`;
    })
    .join(" ");

  const altName = `${categoryObject?.data?.meta?.altTag || ""}`
    .trim()
    .toUpperCase();

  const header = `BISMILLAHIRRAHMANIRRAHIM
  CHECK READY STOK ${categoryObject?.data?.meta?.readyHashtag || "#roomthrift"}

  ITEM : ${altName} ${brand?.value?.toUpperCase()} ${
    design?.value?.toUpperCase() || ""
  }
  CATEGORY : ${categoryObject?.data?.name?.toUpperCase() || "-"}
  ${categoryObject?.data?.meta?.extraCaption || ""}
  PRICE : ASK

  DETAIL GESER SAMPAI UJUNG -->

  LOKASI : KUBU RAYA

  JIKA BERMINAT HUBUNGI VIA DM
  INSYAALLAH AMANAH

  NB : BIASAKAN BACA CAPTION
  - TANYAKAN STOK TERLEBIH DAHULU
  - BARANG YANG SUDAH DIBELI TIDAK DAPAT DIKEMBALIKAN
  - TELITI SEBELUM MEMBELI, TANYAKAN SEDETAIL MUNGKIN
  - ONGKOS KIRIM DI TANGGUNG PEMBELI`;

  return `${header}\n\n${getPattern || ""}`;
});

const onCopy = () => {
  navigator.clipboard.writeText(generatedCaption.value);
  showToast("Caption copied");
};

const onConfirm = (e: any) => {
  showCategory.value = false;

  columns.forEach((v, k) => {
    if (v.value == e.value) categoryObject.data = v;
  });
};
</script>
