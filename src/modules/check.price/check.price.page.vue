<template>
  <van-sticky>
    <van-nav-bar title="Check price" left-arrow @click-left="onNavLeftClick" />
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

      <van-cell-group inset style="margin-top: 1vh">
        <van-cell title="Cell title">
          <template #title>
            <div
              style="
                text-align: center;
                font-weight: bold;
                font-size: 30px;
                margin: 20px;
              "
              class="custom-title"
            >
              Rp{{ calculatedPrice }}
            </div>
          </template></van-cell
        >
      </van-cell-group>
    </van-col>
  </van-row>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { onNavLeftClick } from "../../utils/compose.util";

const fee: any = ref(8);
const price: any = ref();

const calculatedPrice = computed(() => {
  let _fee = (fee.value / 100) * price.value;
  let _value = _fee + parseInt(price.value);
  let nf = new Intl.NumberFormat("id-ID");
  let _result = nf.format(_value);

  return isNaN(_value) ? 0 : _result;
});
</script>

<style scoped>
.table-border {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
