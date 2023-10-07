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
      <van-cell-group inset title="Customer Info">
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
          right-icon="records-o"
          @click-right-icon="onPhonePaste"
        />
        <van-field v-model="item" name="item" label="Item" />
      </van-cell-group>
      <van-cell-group inset title="Address">
        <van-field
          v-model="address"
          type="textarea"
          rows="3"
          autosize
          right-icon="records-o"
          @click-right-icon="onAddressPaste"
        />
        <van-cell title="Paper size">
          <van-tag round type="primary">78x100</van-tag>
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
        <td style="padding: 3.5px; font-size: 12px">Pengirim :</td>
        <td rowspan="4" class="table-border" width="100">
          <img width="100" :src="'/various/wesale.png'" alt="" />
        </td>
      </tr>
      <tr>
        <td style="padding: 3.5px"><b>WESALE</b></td>
      </tr>
      <tr>
        <td style="padding: 3.5px"><b>+62 895-3217-62074</b></td>
      </tr>
      <tr>
        <td style="padding: 3.5px; font-size: 14px">
          Jl. Adisucipto Km 15.3, Gg. Seruat Sambas No.06, Arang Limbung, Sungai
          Raya, Kab. Kubu Raya Regency, Kalimantan Barat
        </td>
      </tr>
      <tr style="border-top: 1px solid black; border-collapse: collapse">
        <td colspan="2" style="padding: 3.5px; font-size: 12px">penerima :</td>
      </tr>
      <tr v-if="name.trim()">
        <td
          colspan="2"
          style="padding: 3.5px; font-size: 20px; font-weight: bold"
        >
          {{ name.trim() || "-" }}
        </td>
      </tr>
      <tr v-if="name.trim()">
        <td
          colspan="2"
          style="padding: 3.5px; font-size: 20px; font-weight: bold"
        >
          {{ phone.trim() || "-" }}
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 3.5px; font-size: 18px">
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
          al
          style="
            padding: 3.5px;
            font-size: 25px;
            font-weight: bold;
            text-align: center;
          "
        >
          {{ item.toUpperCase() || "PAKAIAN" }}
        </td>
        <td class="table-border">
          <img style="width: 100%" :src="'/various/qr-wesale.png'" alt="" />
        </td>
      </tr>
      <tr>
        <td
          colspan="2"
          style="
            text-align: center;
            font-size: 12px;
            padding: 3px;
            color: gray;
            font-style: italic;
          "
        >
          scan qrcode untuk melihat item lainnya
        </td>
      </tr>
    </table>
    <!-- <div id="canvas-area" style="display: block"></div> -->
  </div>
  <div id="printable-area"></div>
</template>
<script setup lang="ts">
import html2canvas from "html2canvas";
import printJS from "print-js";
import { computed, reactive, ref } from "vue";
const name: any = ref("");
const phone: any = ref("");
const item: any = ref("");
const address: any = ref("");
const onClickLeft = () => history.back();

const header = {
  roomthrift: {
    logo: "logo/roomthrift.jpg",
    phone: "+62 896-7216-5341",
    address:
      "Jl. Adisucipto Km 15.3, Gg. Seruat Sambas No.06, Arang Limbung, Sungai Raya, Kab. Kubu Raya Regency, Kalimantan Barat",
  },
  thriftcap: {
    logo: "logo/roomthrift.jpg",
    phone: "+62 896-7216-5341",
    address:
      "Jl. Adisucipto Km 15.3, Gg. Seruat Sambas No.06, Arang Limbung, Sungai Raya, Kab. Kubu Raya Regency, Kalimantan Barat",
  },
  wesale: {
    logo: "logo/wesale.png",
    phone: "+62 895-3217-62074",
    address:
      "Jl. Adisucipto Km 15.3, Gg. Seruat Sambas No.06, Arang Limbung, Sungai Raya, Kab. Kubu Raya Regency, Kalimantan Barat",
  },
};

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
        // style:
        // "#canvas-area, #canvas-area > table { visibility: visible !important; }",
      });
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
