<template>
  <van-sticky>
    <van-nav-bar
      title="Check price"
      left-text="Back"
      left-arrow
      @click-left="onClickLeft"
    />
  </van-sticky>
  <van-row>
    <van-col span="24">
      <van-cell-group inset title="Check price">
        <van-field
          v-model="fee"
          name="fee"
          label="Fee"
          input-align="right"
          type="number"
        >
          <template #right-icon>
            <font-awesome-icon icon="fa-solid fa-percent" />
          </template>
        </van-field>
        <van-field
          v-model="price"
          name="price"
          label="Price"
          type="number"
          input-align="right"
        />
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
const fee: any = ref(8);
const price: any = ref();

const onClickLeft = () => history.back();

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
