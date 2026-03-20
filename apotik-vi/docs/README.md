# Apotik VI - Dokumentasi Sistem Manajemen Apotik

## 📋 Ringkasan Proyek

| Aspek | Detail |
|-------|--------|
| **Nama Proyek** | Apotik VI - Sistem Manajemen Apotik |
| **Versi** | 1.0.0 |
| **Tech Stack** | HTML5, Tailwind CSS (CDN), Vanilla JavaScript |
| **Storage** | LocalStorage (Browser) |
| **Tipe** | Single Page Application (SPA) |

---

## 🎨 Desain & Warna

### Color Palette

| Nama | Hex | Penggunaan |
|------|-----|-----------|
| **Platinum** | `#e7ecef` | Background utama halaman |
| **Dusk Blue** | `#274c77` | Header, navbar, button utama |
| **Steel Blue** | `#6096ba` | Button hover, accent |
| **Icy Blue** | `#a3cef1` | Highlight, border, progress |
| **Grey Olive** | `#8b8c89` | Text sekunder, placeholder |

### Penggunaan Warna

```
┌─────────────────────────────────────────────┐
│ HEADER / NAVBAR        [#274c77 Dusk Blue] │
├──────────┬──────────────────────────────────┤
│ SIDEBAR  │  MAIN CONTENT AREA               │
│ #274c77  │  Background: #e7ecef Platinum    │
│          │                                  │
│          │  Cards: White + shadow            │
│          │                                  │
├──────────┴──────────────────────────────────┤
│  FOOTER                  [#274c77 Dusk Blue] │
└─────────────────────────────────────────────┘
```

---

## 📁 Struktur File

```
apotik-vi/
├── index.html              # Main HTML file (SPA entry point)
├── css/
│   └── custom.css         # Custom styles + CSS variables
├── js/
│   └── app.js             # Application logic
├── assets/
│   └── logo.svg           # Apotik VI Logo
└── docs/
    └── README.md          # Dokumentasi ini
```

---

## 🚀 Cara Menggunakan

### 1. Buka Aplikasi
Buka file `index.html` di browser mana pun (Chrome, Firefox, Safari, Edge).

### 2. Fitur Utama

#### 📊 Dashboard
- Total obat di database
- Jumlah stok rendah (< 10)
- Jumlah akan expired (< 30 hari)
- Resep masuk hari ini
- Grafik distribusi kategori obat
- Daftar aktivitas terbaru

#### 💊 Stok Obat (CRUD)
- **Tambah**: Klik "Tambah Obat" → Isi formulir → Simpan
- **Edit**: Klik ikon edit pada baris obat → Ubah data → Simpan
- **Hapus**: Klik ikon hapus → Konfirmasi
- **Cari**: Ketik di search box (real-time)
- **Filter**: Pilih kategori dari dropdown

#### 📝 Resep Dokter
- **Input Resep Baru**: Klik "Input Resep Baru" → Isi data → Tambah obat → Simpan
- **Proses Resep**: Klik tombol "Proses" → Stok otomatis berkurang
- **Selesai**: Klik tombol "Selesai" jika resep sudah diambil
- **Filter**: Semua / Baru / Diproses / Selesai

#### 📈 Laporan
- Ringkasan total obat, resep, nilai stok
- Export data ke CSV

---

## 💾 Penyimpanan Data

Data disimpan di **LocalStorage** browser:
- `apotikvi_obat` - Data obat
- `apotikvi_resep` - Data resep
- `apotikvi_activities` - Riwayat aktivitas

### Backup & Restore
- **Export**: Klik icon panah di topbar → Export CSV
- **Import**: Klik icon → Import CSV

---

## 🔧 Fitur Teknis

### Responsive Design
- Mobile: < 768px (hamburger menu)
- Tablet: 768px - 1024px (collapsible sidebar)
- Desktop: > 1024px (full sidebar)

### Real-time Features
- Search obat (tanpa reload)
- Auto-save ke LocalStorage
- Toast notifications untuk feedback

### Icons
- Menggunakan SVG icons inline (tidak perlu external library)

---

## 📋 Data Model

### Obat
```javascript
{
  id: "string (auto-generated)",
  nama: "string",
  kategori: "Analgesik|Antibiotik|Vitamin|Antasida|Lainnya",
  stok: number,
  harga: number,
  satuan: "Tablet|Kapsul|Botol|Strip|Box",
  tanggal_expired: "YYYY-MM-DD",
  tanggal_input: "YYYY-MM-DD",
  catatan: "string (optional)"
}
```

### Resep
```javascript
{
  id: "string (auto-generated)",
  nama_dokter: "string",
  nama_pasien: "string",
  tanggal: "YYYY-MM-DD",
  items: [
    {
      obat_id: "string",
      nama_obat: "string",
      dosis: "string",
      jumlah: number
    }
  ],
  status: "baru|diproses|selesai",
  catatan: "string (optional)",
  created_at: "datetime",
  updated_at: "datetime"
}
```

---

## ⚠️ Keterbatasan

1. **Single User**: Hanya untuk 1 pengguna per browser
2. **Browser Specific**: Data hanya di browser tempat input
3. **No Cloud Sync**: Tidak ada sinkronisasi antar devices
4. **LocalStorage Limit**: Maksimal ~5MB tergantung browser

---

## 🔄 Pengembangan Lanjutan (v2.0)

Fitur yang bisa ditambahkan:
- [ ] User authentication (login)
- [ ] Multi-branch support
- [ ] Cloud database (Firebase/Supabase)
- [ ] Drug interaction checker
- [ ] Barcode scanner
- [ ] Print label obat
- [ ] Laporan penjualan grafik

---

## 📞 Support

Untuk pertanyaan atau masalah, hubungi tim pengembang.

---

*Dokumen dibuat secara otomatis untuk Apotik VI v1.0.0*
