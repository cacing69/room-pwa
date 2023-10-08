<template>
  <van-sticky>
    <van-nav-bar
      title="Resi Manual"
      left-text="Back"
      left-arrow
      @click-left="onClickLeft"
    />
  </van-sticky>
  <van-row>
    <van-col span="24">
      <van-cell-group inset title="General Info">
        <van-cell
          is-link
          title="Seller"
          @click="showSeller = true"
          :value="seller?.name || 'None'"
        />
        <van-field
          v-model="name"
          name="name"
          label="Name"
          right-icon="records-o"
          @click-right-icon="onNamePaste"
        />
        <van-field
          v-model="phone"
          name="phone"
          label="Phone"
          type="tel"
          right-icon="records-o"
          @click-right-icon="onPhonePaste"
        />
      </van-cell-group>
      <van-cell-group inset title="Shipping detail">
        <van-field
          v-model="address"
          type="textarea"
          rows="3"
          autosize
          right-icon="records-o"
          @click-right-icon="onAddressPaste"
        />
        <van-field v-model="item" name="item" label="Item" />
        <van-cell
          is-link
          title="Express delivery"
          @click="showProvider = true"
          :value="provider?.name || 'None'"
        />
        <van-field name="radio" label="Service">
          <template #input>
            <van-radio-group v-model="service" direction="horizontal">
              <van-radio name="cash">CASH</van-radio>
              <van-radio name="dfod">DFOD</van-radio>
              <van-radio name="cod">COD</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-if="service == 'cod'"
          v-model="price"
          name="price"
          type="number"
          label="Price (IDR)"
        />
        <van-cell title="Paper size">
          <van-tag plain type="primary">78x100</van-tag>
        </van-cell>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="button"
          size="small"
          @click="onPrint"
        >
          Print
        </van-button>
      </div>
    </van-col>
  </van-row>
  <div id="print-area" style="padding: 5px">
    <table
      class="table-border"
      style="
        width: 100%;
        word-wrap: break-word;
        table-layout: fixed;
        white-space: pre-line;
      "
    >
      <tr>
        <td
          colspan="2"
          style="padding: 3.5px; font-size: 12px; font-style: italic"
        >
          Pengirim :
        </td>
        <td
          rowspan="4"
          style="border-left: 1px solid black; border-collapse: collapse"
          width="100"
        >
          <img width="100" :src="seller?.logo || '/etc/ph-square.jpg'" alt="" />
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 3.5px">
          <b>{{ seller?.name || "LOREM IPSUM" }}</b>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 3.5px">
          <b>{{ seller?.phone || "+62 800-0000-0000" }}</b>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 3.5px; font-size: 14px">
          {{
            seller?.address ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus ipsum leo, a auctor odio tempus eu."
          }}
        </td>
      </tr>
      <tr
        style="
          border-top: 1px solid black;
          border-collapse: collapse;
          font-style: italic;
        "
      >
        <td colspan="2" style="padding: 3.5px; font-size: 12px">Penerima :</td>
      </tr>
      <tr v-if="name.trim()">
        <td
          colspan="3"
          style="padding: 3.5px; font-size: 20px; font-weight: bold"
        >
          {{ name.trim() || "-" }}
        </td>
      </tr>
      <tr v-if="name.trim()">
        <td
          colspan="3"
          style="padding: 3.5px; font-size: 20px; font-weight: bold"
        >
          {{ phone.trim() || "-" }}
        </td>
      </tr>
      <tr>
        <td colspan="3" style="padding: 3.5px; font-size: 18px">
          {{ address.trim() || "-" }}
        </td>
      </tr>
      <tr
        style="
          border-top: 1px solid black;
          border-bottom: 1px solid black;
          border-collapse: collapse;
        "
      >
        <td
          style="
            text-align: center;
            border-right: 1px solid black;
            border-collapse: collapse;
            margin: 0px;
            padding: 1px;
          "
        >
          <img
            style="width: 100%"
            :src="provider?.logo || '/etc/ph-width.png'"
            alt=""
          />
        </td>
        <td
          rowspan="3"
          style="
            padding: 3.5px;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            border-left: 1px solid black;
            border-collapse: collapse;
          "
        >
          {{ item.toUpperCase() || "-" }}
        </td>
        <td
          rowspan="3"
          class=""
          style="border-left: 1px solid black; border-collapse: collapse"
        >
          <img
            style="width: 100%"
            :src="seller?.qr || '/etc/ph-qr-dummy.png'"
            alt=""
          />
        </td>
      </tr>
      <template v-if="service == 'cod'">
        <tr
          style="
            padding: 3.5px;
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            border-bottom: 1px solid black;
            border-collapse: collapse;
          "
        >
          <td>{{ service.toUpperCase() }}</td>
        </tr>
        <tr
          style="
            padding: 3.5px;
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            border-bottom: 1px solid black;
            border-collapse: collapse;
          "
        >
          <td>Rp{{ numberFormat(price) }}</td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td></td>
        </tr>
        <tr
          style="
            padding-top: 3.5px;
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            border-bottom: 1px solid black;
            border-collapse: collapse;
          "
        >
          <td>{{ service.toUpperCase() }}</td>
        </tr>
      </template>
      <tr>
        <td
          colspan="3"
          style="
            text-align: center;
            font-size: 12px;
            padding: 3px;
            font-style: italic;
          "
        >
          scan qrcode untuk melihat item lainnya (ig : @{{
            seller?.instagram || "instagram"
          }})
        </td>
      </tr>
    </table>
    <!-- <div id="canvas-area" style="display: block"></div> -->
  </div>
  <div id="printable-area"></div>
  <van-action-sheet
    v-model:show="showProvider"
    :actions="providers"
    @select="onProviderSelect"
  />
  <van-action-sheet
    v-model:show="showSeller"
    :actions="sellers"
    @select="onSellerSelect"
  />
</template>
<script setup lang="ts">
import html2canvas from "html2canvas";
import printJS from "print-js";
import { closeToast, showLoadingToast } from "vant";
import { computed, reactive, ref } from "vue";
const selected: any = ref("");
const name: any = ref("");
const phone: any = ref("");
const price: any = ref("");
const service: any = ref("cash");
const item: any = ref("pakaian");
const address: any = ref("");
const showProvider: any = ref(false);
const showSeller: any = ref(false);
const provider = ref({});
const seller = ref({});

const providers = [
  {
    name: "J&T",
    logo: "/various/provider-jnt.png",
  },
  {
    name: "JNE",
    logo: "/various/provider-jne.png",
  },
  {
    name: "ID Express",
    logo: "/various/provider-id-express.png",
  },
];

const onProviderSelect = (item: any) => {
  provider.value = item;
  showProvider.value = false;
};

const onSellerSelect = (item: any) => {
  seller.value = item;
  showSeller.value = false;
};

const numberFormat = (value: any) => {
  let nf = new Intl.NumberFormat("id-ID");
  return nf.format(value);
};

const onClickLeft = () => history.back();

const sellers = [
  {
    name: "ROOM THRIFT",
    logo: "/various/roomthrift.jpg",
    phone: "+62 896-7216-5341",
    address:
      "Jl. Adisucipto Km 15.3, Gg. Seruat Sambas No.06, Arang Limbung, Sungai Raya, Kab. Kubu Raya, Kalimantan Barat, Indonesia",
    instagram: "room.thrift",
    qr: "/various/qr-roomthrift.png",
  },
  {
    name: "THRIFTCAP",
    logo: "/various/thriftcap.jpg",
    phone: "+62 896-7216-5341",
    address:
      "Jl. Adisucipto Km 15.3, Gg. Seruat Sambas No.06, Arang Limbung, Sungai Raya, Kab. Kubu Raya, Kalimantan Barat, Indonesia",
    instagram: "thriftcap",
    qr: "/various/qr-thriftcap.png",
  },
  {
    name: "WESALE",
    logo: "/various/wesale.png",
    phone: "+62 895-3217-62074",
    address:
      "Jl. Adisucipto Km 15.3, Gg. Seruat Sambas No.06, Arang Limbung, Sungai Raya, Kab. Kubu Raya, Kalimantan Barat, Indonesia",
    instagram: "wesalee_",
    qr: "/various/qr-wesale.png",
  },
];

const onNamePaste = () => {
  navigator.clipboard.readText().then((cliptext) => (name.value = cliptext));
};

const onPhonePaste = () => {
  navigator.clipboard.readText().then((cliptext) => (phone.value = cliptext));
};

const onAddressPaste = () => {
  navigator.clipboard.readText().then((cliptext) => (address.value = cliptext));
};

const onPrint = () => {
  showLoadingToast({
    duration: 0,
    forbidClick: true,
    loadingType: "spinner",
    message: "Print...",
  });
  // show first html original

  (document as any).getElementById("print-area").style.display = "block";

  (document as any)?.getElementById("canvas-area")?.remove();
  html2canvas((document as any).querySelector("#print-area")).then(
    (canvas: any) => {
      var myCreatedElement = document.createElement("div");
      var myContainer = document.getElementById("printable-area");

      //setAttribute() is used to create attributes or change it:
      myCreatedElement.setAttribute("id", "canvas-area");

      //here you add the element you created using appendChild()
      (myContainer as any).appendChild(myCreatedElement);

      const canvasArea = (document as any)?.getElementById("canvas-area");

      let child = canvasArea.lastElementChild;
      while (child) {
        canvasArea.removeChild(child);
        child = canvasArea.lastElementChild;
      }

      // before append, hide original
      (document as any).getElementById("print-area").style.display = "none";

      canvasArea.appendChild(canvas);

      printJS({
        printable: "canvas-area",
        type: "html",
        targetStyles: ["*"],
      });
      closeToast();
    }
  );
};
</script>

<style scoped>
.table-border {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
