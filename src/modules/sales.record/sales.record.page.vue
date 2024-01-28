<template>
  <van-sticky>
    <van-nav-bar title="Sales Record" left-arrow @click-left="onNavLeftClick" />
  </van-sticky>
  <van-row>
    <van-col span="24">

    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
      Total penjualan hari ini : <b>Rpxxx.xxx</b>
    </van-notice-bar>

      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="button"
          size="small"
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
            border-collapse: collapse;
            border: 1px solid black;
            font-size: 12px;
          "
        >
          <tr>
            <th style="border: 1px solid black; width:7.5%; text-align: center">+</th>
            <th style="border: 1px solid black" @click="showPicker = true">
              {{ fieldValue.text }}
            </th>
            <th style="border: 1px solid black; width:10%; text-align: center;">
              <input type="number" name="" id="" style="width:30px">
            </th>
            <th style="border: 1px solid black; text-align: center">
              <input type="number" name="" id="" style="width:95px">
            </th>
            <th style="border: 1px solid black; text-align: center; width:40px">CASH</th>
          </tr>
          <tr>
            <td colspan="5" style="height:1px;"></td>
          </tr>
          <tr>
            <td style="border: 1px solid black;  text-align: center">1</td>
            <td style="border: 1px solid black" >
              Item selected
            </td>
            <td style="border: 1px solid black;  text-align: center;">
              3
            </td>
            <td style="border: 1px solid black; text-align: right">
              100.000
            </td>
            <td style="border: 1px solid black; text-align: center">QR</td>
          </tr>
        </table>
      </div>
    </van-col>
  </van-row>
  <van-popup v-model:show="showPicker" round position="bottom">
    <van-picker
      title="Title"
      :columns="columns"
      @cancel="showPicker = false"
      @confirm="onConfirm"
      @change="onChange"
    />
  </van-popup>
  <van-number-keyboard
    :show="showKeyboard"
    @blur="() => {showKeyboard = false}"
    @input="onInput"
    @delete="onDelete"
  />
</template>
<script setup lang="ts">

const showKeyboard = ref(false);
const onInput = (value: any) => showToast(value);
const onDelete = () => showToast('delete');
// ---------
const showPicker = ref(false);
import html2canvas from "html2canvas";
import printJS from "print-js";
import {  ref } from "vue";
import { onNavLeftClick } from "../../utils/compose.util";
import { showToast } from "vant";

const onConfirm = ({ selectedOptions }: {selectedOptions: any}) => {
  showPicker.value = false;
  fieldValue.value = selectedOptions[0]
};

const fieldValue = ref({text: ""});

const columns = [
      { text: 'Delaware', value: 'Delaware' },
      { text: 'Florida', value: 'Florida' },
      { text: 'Wenzhou', value: 'Wenzhou' },
      { text: 'Indiana', value: 'Indiana' },
      { text: 'Maine', value: 'Maine' },
    ];

const price: any = ref();
const row: number = 13;
const  numberWithCommas = (x: number) => {
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") ||  0
}

const onChange = ({ selectedValues, selectedOptions }: any) => {
  showPicker.value = false;
  console.log(selectedValues)
  fieldValue.value = selectedOptions[0]
  showToast(`Value: ${selectedValues.join(',')}`);
};

</script>

<style scoped>
</style>
