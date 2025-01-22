import Dexie from "dexie";

// Membuat dan mengatur database
const localDb = new Dexie("roomPwaDb");

localDb.version(2).stores({
  history: "++id, name, phone, address", // Primary key and indexed props
  historyMassal: "++id, address, provider, payment", // Primary key and indexed props
});

export default localDb;
