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
          :rules="[{ required: false, message: 'name is required' }]"
        />
        <van-field v-model="phone" name="phone" label="Phone" />
      </van-cell-group>
      <van-cell-group inset title="Address">
        <van-field v-model="address" type="textarea" rows="3" autosize />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="button"
          size="small"
          @click="onGenerate"
        >
          Generate
        </van-button>
      </div>
    </van-col>
  </van-row>
  <div id="print-area" style="padding: 5px">
    <table class="table-border">
      <tr>
        <td style="padding: 3.5px; font-size: 12px">Pengirim :</td>
        <td rowspan="4" class="table-border">
          <img width="100" :src="'/various/wesale.png'" alt="" />
        </td>
      </tr>
      <tr>
        <td style="padding: 3.5px"><b>WeSale</b></td>
      </tr>
      <tr>
        <td style="padding: 3.5px"><b>+62 896-7216-5341</b></td>
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
      <tr>
        <td
          colspan="2"
          style="padding: 3.5px; font-size: 20px; font-weight: bold"
        >
          Nama Penerima
        </td>
      </tr>
      <tr>
        <td
          colspan="2"
          style="padding: 3.5px; font-size: 20px; font-weight: bold"
        >
          089678787878
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 3.5px; font-size: 18px">
          Jl. Adisucipto Km 15.3, Gg. Seruat Sambas No.06, Arang Limbung, Sungai
          Raya, Kab. Kubu Raya Regency, Kalimantan Barat
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
          TOPI
        </td>
        <td class="table-border">
          <img width="100" :src="'/various/qr.png'" alt="" />
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
          scan qrcode untuk melihat item yang masih tersedia
        </td>
      </tr>
    </table>
    <div id="canvas-area" style="display: none"></div>
  </div>
</template>
<script setup lang="ts">
import html2canvas from "html2canvas";
import printJS from "print-js";
import { computed, reactive, ref } from "vue";
const name: any = ref("");
const phone: any = ref("");
const address: any = ref("");
const onClickLeft = () => history.back();

const header = {
  roomthrift: {
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

const onGenerate = () => {
  html2canvas((document as any).querySelector("#print-area")).then(
    (canvas: any) => {
      const canvasArea = (document as any).getElementById("canvas-area");

      while (canvasArea.firstChild) {
        canvasArea.firstChild.remove();
      }
      canvasArea.appendChild(canvas);

      printJS({
        printable: "print-area",
        type: "html",
        targetStyles: ["*"],
        style: "#canvas-area { visibility: visible; }",
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
