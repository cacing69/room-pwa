<template>
<van-sticky>
    <van-nav-bar title="Resi Massal" left-arrow @click-left="onNavLeftClick">
      <template #right>
        <van-icon name="orders-o" @click="onRightClick" />
      </template>
    </van-nav-bar>
    <van-popup
      v-model:show="showRight"
      position="right"
      :style="{ width: '90%', height: '100%' }"
    >
      <van-search
        show-action
        input-align="left"
        placeholder="Search"
        @cancel="onCancelClicked"
        v-model="search"
      />
      <van-list>
        <!-- <van-cell
          v-for="hist in history.value"
          :key="hist"
          :title="hist.name"
          :value="hist.phone"
          :label="hist.address"
          @click="onItemRightClicked(hist)"
        /> -->
        <van-swipe-cell v-for="(r, index) in resi">
          <van-cell
          :title="r.address"
            :value="(index + 1)"
          />
          <template #right>
            <van-button
              square
              type="danger"
              text="Delete"
              @click="onDeleteResiClicked(index)"
            />
          </template>
        </van-swipe-cell>
      </van-list>
    </van-popup>
  </van-sticky>
<!-- <van-nav-bar title="Resi Batch" left-arrow @click-left="onNavLeftClick">
</van-nav-bar> -->
  <van-row>
    <van-col span="24">
      <!-- <van-cell-group inset title="Seller">
        <van-cell
          is-link
          title="Account"
          @click="showSeller = true"
          :value="seller?.name || 'None'"
        />
      </van-cell-group> -->
      <van-cell-group inset title="Rincian Pengiriman">
        <van-field
          v-model="address"
          type="textarea"
          rows="3"
          autosize
          right-icon="records-o"
          placeholder="Nama, No.HP & Alamat"
          @click-right-icon="onAddressPaste"
        />
        <van-cell
          is-link
          title="Ekspedisi"
          @click="showProvider = true"
          :value="provider?.name || 'None'"
        />
        <van-field name="radio">
            <template #input>
              <van-radio-group v-model="service" direction="horizontal">
                <van-radio name="cash">CASH</van-radio>
                <van-radio name="dfod">DFOD</van-radio>
                <van-radio name="cod">COD</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            v-if="service === 'cod'"
            v-model="price"
            name="price"
            type="number"
            label="Price (IDR)"
          />
      </van-cell-group>
    </van-col>
  </van-row>
  <van-row style="padding-top: 10px;">
    <van-col span="24">
      <van-cell-group inset>
        <van-grid :column-num="2">
        <van-grid-item>
          <van-button
            round
            block
            type="primary"
            native-type="button"
            size="small"
            @click="onAddResi"
          >
            + Tambah Resi ({{ resi.length }})
          </van-button>
        </van-grid-item>

        <van-grid-item>
        <van-button
          round
          block
          type="success"
          native-type="button"
          size="small"
          @click="onPrint"
        >
          Print
        </van-button>
        </van-grid-item>
      </van-grid>
      </van-cell-group>
    </van-col>
  </van-row>
  <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
    Set paper size as width x height = 78x100
  </van-notice-bar>
  <div id="print-area"></div>
  <template v-for="(r, index) in resi">
      <div :id="'print-area-' + (index + 1)" style="padding: 5px">
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
            <td colspan="3" style="padding: 3.5px; font-size: 12px">Penerima :</td>
          </tr>
          <tr v-if="name.trim()">
            <td
              colspan="3"
              style="padding: 3.5px; font-size: 20px; font-weight: bold"
            >
              {{ name.trim() || "-" }}
            </td>
          </tr>
          <tr v-if="phone.trim()">
            <td
              colspan="3"
              style="padding: 3.5px; font-size: 20px; font-weight: bold"
            >
              {{ phone.trim() || "-" }}
            </td>
          </tr>
          <tr>
            <td colspan="3" style="padding: 3.5px; font-size: 18px">
              {{ r.address.trim() || "-" }}
            </td>
          </tr>
          <tr style="border-top: 1px solid black; border-collapse: collapse">
            <td
              style="
                text-align: center;
                border-right: 1px solid black;
                border-bottom: 1px solid black;
                border-collapse: collapse;
                margin: 0px;
                padding: 1px;
              "
            >
              <template v-if="r.provider?.logo">
                <img style="width: 100%" :src="r.provider?.logo" alt="" />
              </template>
              <template v-else>
                <span style="font-weight: bold">NO IMAGE</span>
              </template>
            </td>
            <td
              rowspan="3"
              style="
                padding-top: 3.5px;
                font-size: 18px;
                font-weight: bold;
                text-align: center;
              "
            >
              <template v-if="item?.name?.toLowerCase() !== 'lainnya'">
                <span>
                  {{ item?.name?.toUpperCase() }}
                </span>
              </template>
              <template v-else>
                <span>
                  {{ itemName?.toUpperCase() || "-" }}
                </span>
              </template>
            </td>
            <td
              rowspan="3"
              class=""
              style="
                border-left: 1px solid black;
                border-collapse: collapse;
                text-align: center;
              "
            >
              <img
                style="width: 100%"
                :src="seller?.qr || '/etc/ph-qr-dummy.png'"
                alt=""
              />
            </td>
          </tr>
          <template v-if="r.service === 'cod'">
            <tr
              style="
                padding: 3.5px;
                font-size: 18px;
                font-weight: bold;
                text-align: center;
              "
            >
              <td
                style="
                  border-bottom: 1px solid black;
                  border-right: 1px solid black;
                "
              >
                {{ r.service.toUpperCase() }}
              </td>
            </tr>
            <tr
              style="
                padding: 3.5px;
                font-size: 18px;
                font-weight: bold;
                text-align: center;
                border-bottom: 1px solid black;
              "
            >
              <td style="border-right: 1px solid black">
                Rp{{ numberFormat(r.price) }}
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td style="border-right: 1px solid black"></td>
            </tr>
            <tr
              style="
                padding-top: 3.5px;
                font-size: 20px;
                font-weight: bold;
                text-align: center;
                border-collapse: collapse;
              "
            >
              <td style="border-right: 1px solid black">
                {{ r.service.toUpperCase() }}
              </td>
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
                border-top: 1px solid black;
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
  </template>
  <template v-for="(r, index) in resi">
    <div :id="'printable-area-' + (index + 1)" style="padding-bottom: 1.75vh"></div>
  </template>
  <van-action-sheet
    v-model:show="showProvider"
    :actions="providers"
    @select="onProviderSelect"
    style="padding-bottom: 1.75vh"
  />
  <!-- <van-action-sheet
    v-model:show="showSeller"
    :actions="sellers"
    @select="onSellerSelect"
    style="padding-bottom: 1.75vh"
  /> -->
  <!-- <van-action-sheet
    v-model:show="showItem"
    :actions="items"
    @select="onItemSelect"
    style="padding-bottom: 1.75vh"
  /> -->
</template>
<script setup lang="ts">
import html2canvas from "html2canvas";
import printJS from "print-js";
import { closeToast, showLoadingToast, showNotify } from "vant";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import Dexie, { liveQuery } from "dexie";
import { onMounted } from "vue";
                  import { useObservable } from "@vueuse/rxjs";
                  import { jsPDF } from "jspdf";
import { onNavLeftClick } from "../../utils/compose.util";
import { providers } from '../../services/data/providers.data';
import { sellers } from '../../services/data/sellers.data';

const name: any = ref("");
const history: any = ref([]);
const resi: any = ref([]);
const phone: any = ref("");
const price: any = ref("");
const service: any = ref("cash");
const item: any = ref({ name: "Pakaian" });
const itemName: any = ref("");
const address: any = ref("");
const showProvider: any = ref(false);
const showSeller: any = ref(false);
const showItem: any = ref(false);
const provider = ref({} as any);
const seller = ref({} as any);
const showRight = ref(false);
const search: any = ref("");

// const db = new Dexie("resiDb");

onMounted(() => {
  // db.version(1).stores({
  //   history: "uuid, name, phone, address", // Primary key and indexed props
  // });
  // const modal = new Modal(theModal.value!, {});

  // modal.show();

  seller.value = sellers[2];
  provider.value = providers[0];
});


const onProviderSelect = (item: any) => {
  provider.value = item;
  showProvider.value = false;
};

const onSellerSelect = (item: any) => {
  seller.value = item;
  showSeller.value = false;
};

const onItemSelect = (_item: any) => {
  item.value = _item;
  showItem.value = false;
};

const onRightClick = () => {
  showRight.value = true;

  // history.value = useObservable(
    // liveQuery(() => (db as any).history.toArray()) as any
  // );
};

const numberFormat = (value: any) => {
  let nf = new Intl.NumberFormat("id-ID");
  return nf.format(value);
};

const onInputSearch = (event: any) => {
  // if (event.target.value.trim()) {
  //   let regex = new RegExp(event.target.value.trim(), "i");

  //   history.value = useObservable(
  //     liveQuery(() =>
  //       (db as any).history
  //         // .where("name")
  //         .filter((history: any) => regex.test(history.name))
  //         .toArray()
  //     ) as any
  //   );
  // } else {
  //   history.value = useObservable(
  //     liveQuery(() => (db as any).history.toArray()) as any
  //   );
  // }
};

const onItemRightClicked = (history: any) => {
  name.value = history.name;
  phone.value = history.phone;
  address.value = history.address;

  showRight.value = false;
  history.value = [];
};

const onDeleteHistoryClicked = (history: any) => {
  // (db as any).history
  //   .where("uuid")
  //   .equalsIgnoreCase(history.uuid)
  //   .delete()
  //   .then(function (deleted: any) {
  //     showNotify({
  //       type: "success",
  //       message: `${history.name} deleted`,
  //       duration: 1000,
  //     });
  //   });
};

const onCancelClicked = () => {
  showRight.value = false;
};

const onNamePaste = () => {
  name.value = "";
  navigator.clipboard.readText().then((cliptext) => (name.value = cliptext));
};

const onPhonePaste = () => {
  phone.value = "";
  navigator.clipboard.readText().then((cliptext) => (phone.value = cliptext));
};

const onAddressPaste = () => {
  address.value = "";
  navigator.clipboard.readText().then((cliptext) => (address.value = cliptext));
};

const onDeleteResiClicked = (index: any) => {
  resi.value.splice(index, 1);
  // address.value = "";
  // navigator.clipboard.readText().then((cliptext) => (address.value = cliptext));
};

const onClearResi = async () => {
  resi.value = [];
}

const onAddResi = async () => {
  resi.value.push({
    address: address.value,
    service: service.value,
    price: price.value,
    provider: provider.value,
  });

  address.value = "";
  service.value = "cash";
  price.value = "";
  provider.value = providers[0];
}

const onPrint = async () => {
  const pdf = new jsPDF();
  showLoadingToast({
    duration: 0,
    forbidClick: true,
    loadingType: "spinner",
    message: "Print...",
  });

   // Iterate over each item in the dataArray
  for (const [index, item] of resi.value.entries()) {
    // Populate the `print-area` with data from the current item
    const printDiv = (document as any).getElementById(`print-area-${(index + 1)}`)
    printDiv.style.pageBreakAfter = "always";

    (document as any).getElementById(`print-area-${(index + 1)}`).style.display = "block";
    (document as any).getElementById("canvas-area")?.remove();

    await html2canvas((document as any).querySelector(`#print-area-${(index + 1)}`)).then(
      (canvas) => {
        const myCreatedElement = (document as any).createElement("div");
        const myContainer = (document as any).getElementById(`printable-area-${(index + 1)}`);

        myCreatedElement.setAttribute("id", `canvas-area-${(index + 1)}`);
        myContainer.appendChild(myCreatedElement);

        const canvasArea = (document as any).getElementById(`canvas-area-${(index + 1)}`);

        // Clear previous content
        let child = canvasArea.lastElementChild;

        while (child) {
          canvasArea.removeChild(child);
          child = canvasArea.lastElementChild;
        }

        // Hide the original content before appending the canvas
        (document as any).getElementById(`print-area-${(index + 1)}`).style.display = "none";
        canvasArea.appendChild(canvas);

        const imgData = canvas.toDataURL('image/png'); // Ubah canvas ke data URL

        // Tambahkan canvas ke PDF
        const imgWidth = 210; // Lebar dalam mm (A4)
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Proporsi tinggi

        if (index > 0) {
          pdf.addPage(); // Tambahkan halaman baru jika bukan halaman pertama
        }
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight,  undefined, 'FAST');

        // Reset for the next iteration
        (document as any).getElementById(`print-area-${(index + 1)}`).style.display = "block";
        (document as any).getElementById(`canvas-area-${(index + 1)}`).style.display = "none";
      }
    );

  }
  const timestamp = new Date().getTime();
  pdf.save(`resi-wesale-${timestamp}.pdf`);

  closeToast();
};
</script>

<style scoped>
.table-border {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
