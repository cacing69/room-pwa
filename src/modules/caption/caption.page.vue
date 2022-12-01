
<template>
  <!-- <van-nav-bar
        title="Home"
        left-text="Back"
        left-arrow
        @click-left="() => {}"
  /> -->
  <van-row>
    <van-col span="24">
      <van-cell-group inset style="margin-top: 2vh;">
        <!-- <van-field
          v-model="categoryLabel"
          is-link
          readonly
          name="category"
          label="Category"
          placeholder="Select Category"
          @click="showCategory = true"
        />
        <van-popup v-model:show="showCategory" position="bottom">
          <van-picker
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showCategory = false"
          />
        </van-popup> -->
        <van-row>
          <van-col span="12" class="">
            <van-cell title="Category"/>
          </van-col>
          <van-col span="12">
            <van-dropdown-menu >
              <van-dropdown-item title="" v-model="categoryLabel" :options="columns" @change="onConfirm"/>
            </van-dropdown-menu>
          </van-col>
        </van-row>
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
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="button" size="small" @click="onCopy">
          Copy
        </van-button>
      </div>
    </van-col>
  </van-row>
  <van-row>
    <van-col span="24">
      <van-collapse v-model="active">
        <van-collapse-item title="Generated caption" name="1"><div style="font-size: 82.5%;" v-html="generatedCaption.replace(/\n/g,'<br />')"></div></van-collapse-item>
      </van-collapse>
    </van-col>
  </van-row>

</template>
<script setup lang="ts">
  import { computed, reactive, ref } from 'vue';
  import { showToast } from 'vant';

  const columns = [
      {
        value: 'headgear',
        text: 'Headgear',
        meta: {
          readyHashtag: "#thriftcapready",
          altTag: "topi",
          extraCaption: "SIZE : -\n",
          hashtag: [
            "topi#brand#",
            "topi#brand#second",
            "topi#brand#vintage",
            "topi#design#",
            "snapback#design#",
            "snapback#brand#",
            "snapback#brand#second",
            "cap#brand#",
            "cap#brand#second",
            "cap#design#",
            "5panel#brand#",
            "5panel#brand#second",
            "trucker#brand#",
            "trucker#brand#second",
            "trucker#brand#",
            "trucker#design#",
            "topi#brand##design#",
            "#brand##design#second",
            "#brand##design#",
            "snapback#brand##design#",
            "#brand#",
            "#design#",
            "topivintage",
            "snapbackvintage",
            "topisecondbranded",
            "topisecond",
            "topibekas",
            "snapbacksecond",
            "capsecond",
          ]
        }
    },
      {
        value: 'tshirt',
        text: 'T-Shirt',
        meta: {
          readyHashtag: "#readyroomthrift",
          altTag: "kaos",
          extraCaption: "PANJANG : -\nLEBAR : -\n",
          hashtag: [
            "tshirt#brand#",
            "tshirt#design#",
            "tshirt#brand##design#",
            "tee#brand#",
            "tee#design#",
            "tee#brand##design#",
            "kaos#brand#",
            "kaos#design#",
            "kaos#brand##design#",
            "jual#brand#",
            "jual#design#",
            "jual#brand##design#",
            "#brand#second",
            "#brand#vintage",
            "thrift#brand#",
            "thrift#design#",
            "thrift#brand##design#",
            "#brand#",
            "#design#",
            "#brand##design#",
            "#brand#original",
            "jual#brand#second",
            "jual#brand#original",
            "vintage#brand#",
            "#brand#vintage",
            "secondbrand",
            "secondbranded",
            "kaossecond",
            "kaossecondbranded",
          ]
        }
      },
  ];

  const active = ref(['1']);
  const brand : any = ref("");
  const design : any = ref("");
  const categoryLabel : any = ref("Select category");
  const categoryObject: any = reactive({});

  const generatedCaption = computed(() => {
  const replaceBrand = brand?.value?.replace(" ", "")?.toLowerCase() || 'thrift';
  const replaceDesign = design?.value?.replace(" ", "")?.toLowerCase();

  const getPattern = categoryObject?.value?.meta?.hashtag?.map((e: string) => {
    return `#${e.replace('#brand#', replaceBrand).replace('#design#', replaceDesign || 'thrift')}`;
  }).join(" ");

  const altName = `${categoryObject?.value?.meta?.altTag || ''}`.trim().toUpperCase()

  const header = `BISMILLAHIRRAHMANIRRAHIM
CEK READY STOK ${categoryObject?.value?.meta?.readyHashtag || '#roomthrift'}

ITEM : ${altName} ${brand?.value?.toUpperCase()} ${design?.value?.toUpperCase() || ''}
CATEGORY : ${categoryObject?.value?.text?.toUpperCase() || '-'}
${categoryObject?.value?.meta?.extraCaption || ""}
IDR : ASK

DETAIL GESER SAMPAI UJUNG -->

ROOM THRIFT
LOKASI : Jl. Adisucipto KM 15.3, Desa Limbung, Dusun Limbung Jaya, Gg. Seruat Sambas No. 06

JIKA BERMINAT HUBUNGI
WA : +62 895-2933-8675
INSYAALLAH AMANAH

NB : BIASAKAN BACA CAPTION
- TANYAKAN STOK TERLEBIH DAHULU
- BARANG YANG SUDAH DIBELI TIDAK DAPAT DIKEMBALIKAN
- TELITI SEBELUM MEMBELI, TANYAKAN SEDETAIL MUNGKIN
- ONGKOS KIRIM DI TANGGUNG PEMBELI`;

    return `${header}\n\n${getPattern || ""}`;
  })

  const onCopy = () => {
    navigator.clipboard.writeText(generatedCaption.value);
    showToast('Caption copied');
  }

  const onConfirm = (e :any) => {
    console.log(e)

    columns.forEach((v, k) => {
      if(v.value == e) categoryObject.value = v
    })
  };
</script>
