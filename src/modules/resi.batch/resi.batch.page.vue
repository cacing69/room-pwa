<template>
<van-sticky>
    <van-nav-bar title="Resi Massal" left-arrow @click-left="onNavLeftClick">
      <template #right>
        <van-icon name="orders-o" @click="onResiActiveClick" style="padding-right: 20px;" size="20"/>
        <van-icon name="replay" @click="onRightClick" size="20"/>
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
        <van-swipe-cell v-for="(history, index) in historyMassal">
          <van-cell
            @click="onItemRightClicked(history)"
            :title="history?.address"
            :value="(index + 1)"
          />
          <template #right>
            <van-button
              square
              style=" height: 100%;"
              type="danger"
              text="Delete"
              @click="onDeleteHistoryMassalClicked(history?.id)"
            />
          </template>
        </van-swipe-cell>
      </van-list>
    </van-popup>
    <van-popup
      v-model:show="showResiActive"
      position="right"
      closeable
      :style="{ width: '90%', height: '100%' }"
    >
      <van-list style="padding-top: 40px;">
        <van-swipe-cell v-for="(resi, index) in resi">
          <van-cell
            :title="resi?.address"
            :value="(index + 1)"
          />
          <template #right>
            <van-button
              square
              style=" height: 100%;"
              type="danger"
              text="Remove"
              @click="onDeleteResiClicked(index)"
            />
          </template>
        </van-swipe-cell>
      </van-list>
    </van-popup>
  </van-sticky>
  <van-row>
    <van-col span="24">
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
</template>
<script setup lang="ts">
import html2canvas from "html2canvas";
import { closeToast, showLoadingToast, showNotify } from "vant";
import { ref, watchEffect } from "vue";
import { v4 as uuidv4 } from "uuid";
import { liveQuery } from "dexie";
import { onMounted } from "vue";
import { jsPDF } from "jspdf";
import { onNavLeftClick } from "../../utils/compose.util";
import { providers } from '../../services/data/providers.data';
import { sellers } from '../../services/data/sellers.data';
import localDb from '../../services/local.db';

const name: any = ref("");
const historyMassal: any = ref([]);
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
const showResiActive = ref(false);
const search: any = ref("");

const getRegex = (query: any) => new RegExp(query, 'i');

// const db = new Dexie("resiMassalDb");

const loadHistoryMassal = async () => {
  historyMassal.value = await (localDb as any).historyMassal.toArray();
};

// Menggunakan watchEffect untuk meng-update data ketika input berubah
    watchEffect(() => {
      const regex = getRegex(search.value);

      // Menggunakan liveQuery untuk memfilter data secara dinamis
      const filteredData = liveQuery(() =>
        (localDb as any).historyMassal
          .filter((historyMassal: any) => regex.test(historyMassal.address)) // Filter berdasarkan regex
          .toArray()
      );

      // Subscribe ke filteredData untuk mendapatkan hasilnya
      filteredData.subscribe((data) => {
        historyMassal.value = data;  // Memperbarui data hasil filter
      });
    });

onMounted(() => {
  seller.value = sellers[2];
  provider.value = providers[0];
  loadHistoryMassal();
});


const onProviderSelect = (item: any) => {
  provider.value = item;
  showProvider.value = false;
};

const onRightClick = () => {
  search.value = "";
  showRight.value = true;
};

const onResiActiveClick = () => {
  showResiActive.value = true;
};

const numberFormat = (value: any) => {
  let nf = new Intl.NumberFormat("id-ID");
  return nf.format(value);
};

const onItemRightClicked = (historyMassal: any) => {
  console.log(historyMassal)
  resi.value.push({
    address: historyMassal.address,
    service: JSON.parse(historyMassal.service),
    price: historyMassal.price,
    provider: JSON.parse(historyMassal.provider),
  });

  showRight.value = false;
};

const onCancelClicked = () => {
  showRight.value = false;
};

const onAddressPaste = () => {
  address.value = "";
  navigator.clipboard.readText().then((cliptext) => (address.value = cliptext));
};

const onDeleteResiClicked = (index: any) => {
  resi.value.splice(index, 1);
};

const onDeleteHistoryMassalClicked = (id: any) => {
  (localDb as any).historyMassal
    .delete(id);

    loadHistoryMassal();
};

const onAddResi = async () => {
  resi.value.push({
    address: address.value.trim(),
    service: service.value,
    price: price.value.trim(),
    provider: provider.value,
  });

  // check dulu, jika tidak ada save
  const checkLocalDb = await (localDb as any).historyMassal
    .where('address')
    .equals(address.value.trim())  // Memeriksa apakah ada data dengan alamat yang sama
    .toArray();

  console.log(checkLocalDb.length);

  if (checkLocalDb.length == 0) {
    // save to indexDB
    let saveToDb = {
      uuid: uuidv4(),
      address: address.value.trim(),
      service: JSON.stringify(service.value),
      price: price.value.trim(),
      provider: JSON.stringify(provider.value),
    };

    const saveHistoryMassal = await (localDb as any).historyMassal.add(saveToDb);
  }

  address.value = "";
  service.value = "cash";
  price.value = "";
  provider.value = providers[0];

  loadHistoryMassal();
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
