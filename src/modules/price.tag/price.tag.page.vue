<template>
  <van-sticky>
    <van-nav-bar title="Price Tag" left-arrow @click-left="onNavLeftClick" />
  </van-sticky>
  <van-row>
    <van-col span="24">
      <van-cell-group inset title="Check price">
        <van-field v-model="price" name="price" label="Price" type="number" />
      </van-cell-group>

      <van-notice-bar
        wrapable
        color="#1989fa"
        background="#ecf9ff"
        left-icon="info-o"
        style="margin-top: 1vh"
      >
        Price after marketplace fee has been applied
      </van-notice-bar>

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

      <div id="print-area" style="padding: 5px;">
        <table
          style="
            width: 100%;
            word-wrap: break-word;
            table-layout: fixed;
            white-space: pre-line;
          "
          v-for="e in [...Array(row).keys()]"
        >
          <tr>
            <td style="border-radius: 10px;padding:5px;text-align: center; border-right:  1px solid black;border-left:  1px solid black;border-top:  1px solid black;border-bottom:  1px solid black;">
              <span style="font-weight: bold; font-size: 16px; margin: 10px;"><span style="font-size: 12px;font-style: italic;">Rp</span>{{ numberWithCommas(price) }}</span>
            </td>
            <td style="width: 0.5px; "></td>
            <td style="border-radius: 10px;padding:5px;text-align: center; border-right:  1px solid black;border-left:  1px solid black;border-top:  1px solid black;border-bottom:  1px solid black;">
              <span style="font-weight: bold; font-size: 16px; margin: 10px;"><span style="font-size: 12px;font-style: italic;">Rp</span>{{ numberWithCommas(price) }}</span>
            </td>
            <td style="width: 0.5px; "></td>
            <td style="border-radius: 10px;padding:5px;text-align: center; border-right:  1px solid black;border-left:  1px solid black;border-top:  1px solid black;border-bottom:  1px solid black;">
              <span style="font-weight: bold; font-size: 16px; margin: 10px;"><span style="font-size: 12px;font-style: italic;">Rp</span>{{ numberWithCommas(price) }}</span>
            </td>
            <td style="width: 0.5px; "></td>
          </tr>
          <tr>
            <td colspan="3" style="height: 0.5px;"></td>
          </tr>
        </table>
      </div>
    </van-col>
  </van-row>
  <div id="printable-area" style="padding-bottom: 1.75vh"></div>
</template>
<script setup lang="ts">
import html2canvas from "html2canvas";
import printJS from "print-js";
import {  ref } from "vue";
import { onNavLeftClick } from "../../utils/compose.util";

const price: any = ref();
const row: number = 12;
const  numberWithCommas = (x: number) => {
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") ||  0
}
const onPrint = async () => {
  // store to local db

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

      (document as any).getElementById("print-area").style.display = "block";
      (document as any).getElementById("canvas-area").style.display = "none";
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
