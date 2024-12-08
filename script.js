import { db } from "./firebase-config.js";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const acCollection = collection(db, "acData");

// Tambah Data
document.getElementById("acForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const office = document.getElementById("office").value;
  const unit = document.getElementById("unit").value;
  const address = document.getElementById("address").value;

  try {
    await addDoc(acCollection, { office, unit, address, lastUpdated: null });
    alert("Data berhasil ditambahkan!");
    fetchAndRenderData();
    this.reset();
  } catch (error) {
    console.error("Error menambah data:", error);
  }
});

// Ambil dan Render Data
async function fetchAndRenderData() {
  const tableBody = document.getElementById("summaryBody");
  tableBody.innerHTML = "";

  try {
    const querySnapshot = await getDocs(acCollection);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${data.office}</td>
        <td>${data.unit}</td>
        <td>${data.address}</td>
        <td>
          <button onclick="editData('${doc.id}', '${data.office}', '${data.unit}', '${data.address}')">Edit</button>
          <button onclick="deleteData('${doc.id}')">Hapus</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error mengambil data:", error);
  }
}

// Edit Data
async function editData(id, currentOffice, currentUnit, currentAddress) {
  const office = prompt("Update Kantor:", currentOffice);
  const unit = prompt("Update Unit AC:", currentUnit);
  const address = prompt("Update Alamat:", currentAddress);

  if (!office || !unit || !address) {
    alert("Data tidak boleh kosong.");
    return;
  }

  try {
    const docRef = doc(db, "acData", id);
    await updateDoc(docRef, { office, unit, address, lastUpdated: new Date().toISOString() });
    alert("Data berhasil diupdate!");
    fetchAndRenderData();
  } catch (error) {
    console.error("Error mengupdate data:", error);
  }
}

// Hapus Data
async function deleteData(id) {
  if (!confirm("Yakin ingin menghapus data ini?")) return;

  try {
    const docRef = doc(db, "acData", id);
    await deleteDoc(docRef);
    alert("Data berhasil dihapus!");
    fetchAndRenderData();
  } catch (error) {
    console.error("Error menghapus data:", error);
  }
}

// Cari Data
document.getElementById("search").addEventListener("input", function () {
  const searchValue = this.value.toLowerCase();
  const rows = document.querySelectorAll("#summaryBody tr");

  rows.forEach((row) => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(searchValue) ? "" : "none";
  });
});

// Load Data Saat Halaman Dibuka
fetchAndRenderData();
