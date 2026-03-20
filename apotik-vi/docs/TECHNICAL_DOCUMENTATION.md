# Apotik VI - Dokumentasi Teknis Lengkap

## Daftar Isi
1. [Ringkasan Proyek](#ringkasan-proyek)
2. [Arsitektur Sistem](#arsitektur-sistem)
3. [Struktur File](#struktur-file)
4. [Detail Komponen](#detail-komponen)
5. [Fitur & Cara Kerja](#fitur--cara-kerja)
6. [Data Model](#data-model)
7. [API & Fungsi](#api--fungsi)
8. [Custom Styles](#custom-styles)
9. [Dark Mode](#dark-mode)
10. [Print Support](#print-support)
11. [PWA/Manifest](#pwamanifest)
12. [Troubleshooting](#troubleshooting)
13. [Pengembangan Lanjutan](#pengembangan-lanjutan)

---

## 1. Ringkasan Proyek {#ringkasan-proyek}

### Identitas Proyek
| Aspek | Detail |
|-------|--------|
| **Nama** | Apotik VI |
| **Tipe** | Sistem Manajemen Apotik Web |
| **Versi** | 1.0.0 |
| **Tech Stack** | HTML5 + Tailwind CSS + Vanilla JavaScript |
| **Storage** | LocalStorage (Browser) |
| **Tipe App** | Single Page Application (SPA) |

### Tujuan
Membangun aplikasi web untuk mengelola:
- Stok obat (CRUD)
- Input resep dokter
- Dashboard monitoring
- Warnings (stok rendah, akan expired)
- Export/Import data

---

## 2. Arsitektur Sistem {#arsitektur-sistem}

### Diagram Arsitektur
```
┌─────────────────────────────────────────────────────────────┐
│                     BROWSER                                 │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    │
│  │   index.html │    │  Tailwind   │    │   Chart.js  │    │
│  │   (SPA)     │───▶│   (CDN)     │    │   (CDN)     │    │
│  └──────┬──────┘    └─────────────┘    └─────────────┘    │
│         │                                                  │
│         ▼                                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   JavaScript                         │   │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────────┐   │   │
│  │  │  app.js   │  │enhanced.js│  │  LocalStorage │   │   │
│  │  │ (Core)    │  │(Features) │  │   (Data)     │   │   │
│  │  └───────────┘  └───────────┘  └───────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Alur Data
```
User Action → JavaScript Handler → LocalStorage → Update UI
                                    ↓
                              Render Function
```

### External Dependencies
1. **Tailwind CSS** - `https://cdn.tailwindcss.com`
2. **Chart.js** - `https://cdn.jsdelivr.net/npm/chart.js`
3. **Google Fonts** - Inter font family

---

## 3. Struktur File {#struktur-file}

```
apotik-vi/
├── index.html              # Main SPA entry point
├── manifest.json           # PWA manifest untuk installable app
├── sample-data-obat.csv   # Data contoh untuk import
├── README.md              # Panduan penggunaan (user-facing)
├── css/
│   ├── custom.css         # Main styles + Dark mode
│   └── print.css         # Print stylesheet
├── js/
│   ├── app.js           # Core application logic
│   └── enhanced.js     # Additional features
├── assets/
│   └── logo.svg        # Apotik VI Logo (SVG)
└── docs/
    └── (reserved for future)
```

---

## 4. Detail Komponen {#detail-komponen}

### 4.1 index.html

**Fungsi:** Main entry point SPA, berisi semua markup HTML

**Struktur:**
```html
<!-- Loading Screen -->
<div id="loading-screen">...</div>

<!-- Toast Container -->
<div id="toast-container">...</div>

<!-- Main Layout -->
<div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside id="sidebar">...</aside>
    
    <!-- Main Content -->
    <main class="flex-1 lg:ml-64">
        <!-- Header -->
        <header>...</header>
        
        <!-- Content Pages -->
        <div id="main-content">
            <div id="page-dashboard">...</div>
            <div id="page-stok">...</div>
            <div id="page-resep">...</div>
            <div id="page-laporan">...</div>
        </div>
    </main>
</div>

<!-- Modals -->
<div id="modal-obat">...</div>
<div id="modal-resep">...</div>
<div id="modal-confirm">...</div>
```

**Navigasi Halaman:**
- Dashboard (`#page-dashboard`)
- Stok Obat (`#page-stok`)
- Resep Dokter (`#page-resep`)
- Laporan (`#page-laporan`)

### 4.2 js/app.js

**Fungsi:** Core application logic - semua fungsi utama

**Struktur Code:**
```javascript
// ===== STATE MANAGEMENT =====
const AppState = { ... }

// ===== STORAGE HELPERS =====
const Storage = {
    KEY_OBAT: 'apotikvi_obat',
    KEY_RESEP: 'apotikvi_resep',
    KEY_ACTIVITIES: 'apotikvi_activities',
    getObat(), setObat(), getResep(), ...
}

// ===== UTILITY FUNCTIONS =====
function generateId() { ... }
function formatCurrency(amount) { ... }
function formatDate(dateStr) { ... }
function getDaysUntilExpired(expiredDate) { ... }
function isLowStock(stok) { ... }
function isExpiringSoon(expiredDate) { ... }

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type) { ... }

// ===== MODAL HANDLERS =====
function showModal(type, data) { ... }
function closeModal(type) { ... }
function showConfirm(message, onConfirm) { ... }

// ===== NAVIGATION =====
function navigateTo(page) { ... }

// ===== CRUD OPERATIONS =====
function handleObatSubmit(e) { ... }
function editObat(id) { ... }
function deleteObat(id) { ... }
function handleResepSubmit(e) { ... }
function updateResepStatus(id, status) { ... }
function editResep(id) { ... }
function deleteResep(id) { ... }
function filterResep(status) { ... }

// ===== RENDER FUNCTIONS =====
function renderDashboard() { ... }
function renderCategoryChart(obat) { ... }
function renderLowStockList(obat) { ... }
function renderExpiringList(obat) { ... }
function renderRecentActivity() { ... }
function renderStokTable() { ... }
function renderResepList() { ... }
function renderLaporan() { ... }

// ===== DATA EXPORT/IMPORT =====
function exportData(type) { ... }
function downloadCSV(content, filename) { ... }
function importData(input) { ... }

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() { ... });
```

### 4.3 js/enhanced.js

**Fungsi:** Fitur tambahan yang tidak ada di core

**Fitur yang tersedia:**
```javascript
// Dark Mode
function toggleDarkMode() { ... }
function initDarkMode() { ... }

// Print Functions
function printPage() { ... }
function printObatList() { ... }
function printResepList() { ... }
function printDashboard() { ... }

// Sample Data
function loadSampleData() { ... }

// Data Management
function clearAllData() { ... }
function exportAllData() { ... }

// Notifications
function checkNotifications() { ... }

// Stats
function getStats() { ... }
```

### 4.4 css/custom.css

**Fungsi:** Custom styles dan CSS variables

**CSS Variables:**
```css
:root {
    --bg-primary: #e7ecef;    /* Platinum - background utama */
    --bg-card: #ffffff;       /* White - card background */
    --text-heading: #274c77;  /* Dusk Blue - heading */
    --text-body: #1a1a1a;     /* Dark - body text */
    --text-muted: #8b8c89;    /* Grey Olive - muted text */
    --primary: #274c77;       /* Dusk Blue - primary color */
    --primary-hover: #6096ba; /* Steel Blue - hover state */
    --accent: #a3cef1;        /* Icy Blue - accent */
    --border: #d1d5db;        /* Border color */
    --success: #22c55e;       /* Green - success */
    --warning: #f59e0b;       /* Amber - warning */
    --danger: #ef4444;        /* Red - danger/error */
}
```

**Warna yang Digunakan:**
| Nama | Hex | Usage |
|------|-----|-------|
| Platinum | `#e7ecef` | Background halaman |
| Dusk Blue | `#274c77` | Header, navbar, button utama |
| Steel Blue | `#6096ba` | Button hover, icon |
| Icy Blue | `#a3cef1` | Highlight, border |
| Grey Olive | `#8b8c89` | Text sekunder |

---

## 5. Fitur & Cara Kerja {#fitur--cara-kerja}

### 5.1 Stok Obat (CRUD)

**Tambah Obat:**
1. Klik tombol "Tambah Obat"
2. Modal form muncul
3. Isi data: nama, kategori, stok, harga, satuan, expired
4. Klik "Simpan"
5. Data disimpan ke LocalStorage
6. Tabel & dashboard di-refresh

**Edit Obat:**
1. Klik ikon edit pada baris obat
2. Modal form muncul dengan data terisi
3. Ubah data yang diinginkan
4. Klik "Simpan"
5. Data di-update di LocalStorage

**Hapus Obat:**
1. Klik ikon hapus
2. Modal konfirmasi muncul
3. Klik "Hapus"
4. Data dihapus dari LocalStorage

**Search & Filter:**
- Ketik di search box → filtering real-time (tanpa reload)
- Pilih kategori dari dropdown → filter berdasarkan kategori

### 5.2 Resep Dokter

**Input Resep Baru:**
1. Klik "Input Resep Baru"
2. Isi: nama dokter, nama pasien, tanggal
3. Klik "Tambah Obat" untuk memilih obat
4. Pilih obat dari dropdown (auto-complete dari database)
5. Isi dosis dan jumlah
6. Ulangi step 3-5 untuk obat tambahan
7. Klik "Simpan"

**Proses Resep:**
1. Klik tombol "Proses" pada resep berstatus "Baru"
2. Status berubah menjadi "Diproses"
3. **Stok obat otomatis dikurangi** sesuai jumlah dalam resep

**Selesai Resep:**
1. Klik tombol "Selesai" pada resep berstatus "Diproses"
2. Status berubah menjadi "Selesai"

### 5.3 Dashboard

**Stats Cards:**
- Total Obat: jumlah semua obat di database
- Stok Rendah: obat dengan stok < 10
- Akan Expired: obat yang akan expired dalam 30 hari
- Resep Hari Ini: jumlah resep dengan tanggal hari ini

**Grafik Kategori:**
- Doughnut chart menggunakan Chart.js
- Menampilkan distribusi kategori obat
- Otomatis update saat data berubah

**Aktivitas Terbaru:**
- Menampilkan 5 aktivitas terakhir
- Tipe: tambah/edit/hapus obat, input/edit resep
- Disimpan di LocalStorage (max 50 items)

### 5.4 Warnings

**Low Stock Warning:**
- Ditampilkan jika stok < 10
- Badge merah "Rendah" di tabel
- Ditampilkan di dashboard

**Expired Warning:**
- Ditampilkan jika expired dalam 30 hari
- Badge kuning di tabel
- Ditampilkan di dashboard

**Expired (Sudah Lewat):**
- Badge merah "Expired"
- Tidak bisa digunakan

### 5.5 Export/Import

**Export CSV:**
1. Klik icon panah di topbar
2. Pilih "Export CSV"
3. File CSV otomatis terdownload

**Import CSV:**
1. Klik icon panah di topbar
2. Pilih "Import CSV"
3. Pilih file CSV dari komputer
4. Data akan ditambahkan ke database

**Format CSV Obat:**
```csv
Nama,Kategori,Stok,Harga,Satuan,Tanggal Expired,Tanggal Input,Catatan
Paracetamol 500mg,Analgesik,150,5000,Tablet,2027-06-15,2026-03-01,
```

---

## 6. Data Model {#data-model}

### 6.1 Obat Object
```javascript
{
    id: "string",           // Auto-generated: Date.now().toString(36) + random
    nama: "string",        // Nama obat, contoh: "Paracetamol 500mg"
    kategori: "string",    // "Analgesik" | "Antibiotik" | "Vitamin" | "Antasida" | "Lainnya"
    stok: number,          // Jumlah stok (integer)
    harga: number,         // Harga dalam Rupiah (integer)
    satuan: "string",      // "Tablet" | "Kapsul" | "Botol" | "Strip" | "Box"
    tanggal_expired: "YYYY-MM-DD",  // Tanggal expired
    tanggal_input: "YYYY-MM-DD",    // Tanggal input ke sistem
    catatan: "string"      // Catatan opsional
}
```

### 6.2 Resep Object
```javascript
{
    id: "string",           // Auto-generated
    nama_dokter: "string",  // Nama dokter
    nama_pasien: "string", // Nama pasien
    tanggal: "YYYY-MM-DD", // Tanggal resep
    items: [
        {
            obat_id: "string",    // Reference ke ID obat
            nama_obat: "string", // Nama obat (denormalized)
            dosis: "string",     // Contoh: "3x1", "2x1"
            jumlah: number       // Jumlah unit
        }
    ],
    status: "string",      // "baru" | "diproses" | "selesai"
    catatan: "string",     // Catatan opsional
    created_at: "datetime", // ISO timestamp
    updated_at: "datetime"  // ISO timestamp
}
```

### 6.3 Activity Object
```javascript
{
    id: "string",           // Auto-generated
    type: "string",         // "add_obat" | "edit_obat" | "delete_obat" | "add_resep" | "edit_resep" | "update_resep"
    description: "string",  // Deskripsi aktivitas
    timestamp: "datetime"   // ISO timestamp
}
```

### 6.4 LocalStorage Keys
| Key | Data |
|-----|------|
| `apotikvi_obat` | Array of Obat objects |
| `apotikvi_resep` | Array of Resep objects |
| `apotikvi_activities` | Array of Activity objects |
| `apotikvi_darkmode` | "true" or "false" |

---

## 7. API & Fungsi {#api--fungsi}

### 7.1 Storage API

```javascript
// Get all obat
Storage.getObat()
// Returns: Array<Obat>

// Save obat
Storage.setObat(obat)
// Parameter: Array<Obat>

// Get all resep
Storage.getResep()
// Returns: Array<Resep>

// Save resep
Storage.setResep(resep)
// Parameter: Array<Resep>

// Add activity
Storage.addActivity(activity)
// Parameter: Activity object
```

### 7.2 Utility Functions

```javascript
// Generate unique ID
generateId()
// Returns: string (contoh: "m1a2b3c4d5e6f7")

// Format angka ke Rupiah
formatCurrency(5000)
// Returns: "Rp 5.000"

// Format tanggal ke format Indonesia
formatDate("2026-03-19")
// Returns: "19 Mar 2026"

// Hitung hari sampai expired
getDaysUntilExpired("2026-04-19")
// Returns: 30 (atau jumlah hari)

// Cek stok rendah
isLowStock(5)
// Returns: true (jika < 10)

// Cek akan expired
isExpiringSoon("2026-04-15")
// Returns: true (jika ≤ 30 hari)
```

### 7.3 Render Functions

```javascript
// Render semua komponen dashboard
renderDashboard()

// Render tabel obat dengan filter
renderStokTable()

// Render daftar resep dengan filter status
renderResepList()

// Render ringkasan laporan
renderLaporan()

// Render chart kategori
renderCategoryChart(obat)

// Render daftar stok rendah
renderLowStockList(obat)

// Render daftar akan expired
renderExpiringList(obat)

// Render aktivitas terbaru
renderRecentActivity()
```

---

## 8. Custom Styles {#custom-styles}

### 8.1 Color Palette

**Implementasi di HTML:**
```html
<div class="bg-platinum text-dusk-blue">
    <!-- Background: #e7ecef, Text: #274c77 -->
</div>
```

**CSS Classes:**
| Class | CSS Property |
|-------|--------------|
| `.bg-platinum` | `background-color: #e7ecef` |
| `.bg-dusk-blue` | `background-color: #274c77` |
| `.text-dusk-blue` | `color: #274c77` |
| `.bg-steel-blue` | `background-color: #6096ba` |
| `.text-steel-blue` | `color: #6096ba` |
| `.text-grey-olive` | `color: #8b8c89` |

### 8.2 Badge Styles

| Badge | Class | Background | Text |
|-------|-------|------------|------|
| Normal | `.badge-normal` | `rgba(163, 207, 241, 0.2)` | `#6096ba` |
| Low Stock | `.badge-low-stock` | `#fee2e2` | `#ef4444` |
| Expiring | `.badge-expiring` | `#fef3c7` | `#f59e0b` |
| Success | `.badge-success` | `#dcfce7` | `#22c55e` |
| Danger | `.badge-danger` | `#fee2e2` | `#ef4444` |

### 8.3 Card Hover Effect
```css
.card-hover {
    transition: all 0.3s ease;
}
.card-hover:hover {
    transform: translateY(-4px);
}
```

---

## 9. Dark Mode {#dark-mode}

### Cara Kerja
1. Simpan preferensi ke LocalStorage (`apotikvi_darkmode`)
2. Toggle class `dark-mode` pada element `<body>`
3. CSS override untuk dark mode colors

### Cara Aktivasi
Dark mode belum terhubung ke UI. Untuk mengaktifkan:
```javascript
// Di browser console
toggleDarkMode()
```

### CSS Dark Mode
```css
body.dark-mode {
    --bg-primary: #1a1a2e;
    --bg-card: #16213e;
    --text-heading: #a3cef1;
    background-color: #0f0f23 !important;
    color: #e5e5e5 !important;
}
```

---

## 10. Print Support {#print-support}

### css/print.css

**Yang di-hidden saat print:**
- Navigation (sidebar, header buttons)
- Modal dialogs
- Toast notifications
- Loading screen

**Yang di-show saat print:**
- Table data
- Cards/content
- Print header & footer

**Cara Menggunakan:**
1. Tekan `Ctrl + P` (Windows) atau `Cmd + P` (Mac)
2. Atau klik button dengan fungsi `printPage()`

---

## 11. PWA/Manifest {#pwamanifest}

### manifest.json

```json
{
  "name": "Apotik VI",
  "short_name": "ApotikVI",
  "description": "Sistem Manajemen Apotik Modern",
  "start_url": "index.html",
  "display": "standalone",
  "background_color": "#e7ecef",
  "theme_color": "#274c77",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "assets/logo.svg",
      "sizes": "any",
      "type": "image/svg+xml"
    }
  ]
}
```

### Cara Install
1. Buka `index.html` di Chrome/Edge
2. Akan muncul install prompt (jika didukung)
3. Atau klik menu → "Install Apotik VI"

---

## 12. Troubleshooting {#troubleshooting}

### Masalah: Data tidak tersimpan
**Penyebab:** Browser membersihkan LocalStorage
**Solusi:** Gunakan fitur Export CSV untuk backup rutin

### Masalah: Print tidak muncul benar
**Solusi:** Pastikan `css/print.css` ter-load dengan benar

### Masalah: Chart tidak muncul
**Penyebab:** Chart.js CDN tidak ter-load
**Solusi:** Periksa koneksi internet, Chart.js diperlukan

### Masalah: Gambar/logo tidak muncul
**Penyebab:** Path file salah
**Solusi:** Pastikan struktur file sesuai, logo ada di `assets/logo.svg`

---

## 13. Pengembangan Lanjutan {#pengembangan-lanjutan}

### Fitur yang Bisa Ditambahkan

| Fitur | Deskripsi | Difficulty |
|-------|-----------|------------|
| Dark Mode Toggle | Button untuk switch light/dark mode | Easy |
| User Login | Authentication dengan password | Medium |
| Cloud Sync | Sinkronisasi ke Firebase/Supabase | Medium |
| Barcode Scanner | Scan barcode obat dengan kamera | Hard |
| Drug Interaction | Cek interaksi obat | Hard |
| Print Label | Cetak label untuk obat | Easy |
| Laporan Grafik | Chart.js untuk penjualan | Easy |
| Multi-branch | Support beberapa apotik | Hard |

### Cara Menambahkan Dark Mode Toggle

Tambahkan button di header:
```html
<button onclick="toggleDarkMode()" class="p-2 hover:bg-platinum rounded-lg">
    <svg class="w-6 h-6 text-dusk-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
    </svg>
</button>
```

Dan load enhanced.js:
```html
<script src="js/enhanced.js"></script>
```

---

## Credits

**Dibuat dengan:** OpenClaw AI Assistant  
**Tech Stack:** HTML5, Tailwind CSS, Vanilla JavaScript, Chart.js  
**Tanggal:** 2026-03-19  

---

*Dokumen ini dibuat untuk keperluan teknis dan pengembangan lanjutan.*
