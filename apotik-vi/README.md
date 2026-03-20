# Apotik VI - Sistem Manajemen Apotik

## 📋 Ringkasan

| Aspek | Detail |
|-------|--------|
| **Versi** | 1.0.0 |
| **Tech Stack** | HTML5 + Tailwind CSS + Vanilla JavaScript |
| **Storage** | LocalStorage (Browser) |
| **Tipe** | Single Page Application (SPA) |
| **Dependencies** | Tailwind CSS (CDN), Chart.js (CDN), Google Fonts |

---

## 🚀 Quick Start

### Cara Buka Aplikasi
1. Buka file `index.html` di browser mana pun:
   ```
   /workspace/apotik-vi/index.html
   ```
2. Atau deploy ke web server

### Load Sample Data (Opsional)
1. Klik icon panah di topbar
2. Klik "Import CSV"
3. Pilih file `sample-data-obat.csv`
4. Data contoh akan ter-load

---

## 📁 Struktur File

```
apotik-vi/
├── index.html                    # Main SPA
├── manifest.json                 # PWA manifest
├── sample-data-obat.csv         # Sample data untuk import
├── README.md                    # Panduan ini
├── css/
│   ├── custom.css              # Main styles + Dark mode
│   └── print.css               # Print stylesheet
├── js/
│   ├── app.js                  # Core application
│   └── enhanced.js             # Additional features
├── assets/
│   └── logo.svg                # Logo Apotik VI
└── docs/
    └── TECHNICAL_DOCUMENTATION.md  # Dokumentasi teknis lengkap
```

---

## 🎨 Color Palette

| Nama | Hex | Usage |
|------|-----|-------|
| Platinum | `#e7ecef` | Background utama |
| Dusk Blue | `#274c77` | Header, navbar, button |
| Steel Blue | `#6096ba` | Hover states |
| Icy Blue | `#a3cef1` | Highlights |
| Grey Olive | `#8b8c89` | Text sekunder |

---

## 💾 Data Storage

Data disimpan di LocalStorage browser:
- `apotikvi_obat` - Data obat
- `apotikvi_resep` - Data resep
- `apotikvi_activities` - Riwayat aktivitas

**Penting:** Hapus cache browser = hapus semua data. Gunakan Export CSV untuk backup!

---

## 📖 Cara Penggunaan

### Dashboard
- View stats: total obat, stok rendah, akan expired, resep hari ini
- View chart distribusi kategori obat
- View aktivitas terbaru

### Stok Obat
- **Tambah:** Klik "Tambah Obat" → Isi form → Simpan
- **Edit:** Klik icon edit → Ubah → Simpan  
- **Hapus:** Klik icon hapus → Konfirmasi
- **Cari:** Ketik di search box (real-time)
- **Filter:** Pilih kategori dari dropdown

### Resep Dokter
- **Input:** Klik "Input Resep Baru" → Isi data → Tambah obat → Simpan
- **Proses:** Klik "Proses" → Stok otomatis berkurang
- **Selesai:** Klik "Selesai" jika sudah diambil
- **Filter:** Semua / Baru / Diproses / Selesai

### Laporan
- View ringkasan data
- Export ke CSV

---

## 🔧 Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Data hilang | Import dari CSV backup |
| Print tidak benar | Gunakan browser modern, cek print.css |
| Chart tidak muncul | Pastikan terhubung internet (Chart.js dari CDN) |
| Logo tidak muncul | Pastikan assets/logo.svg ada |

---

## 📚 Dokumentasi Lengkap

Untuk detail teknis (arsitektur, data model, API, cara开发 lanjutan), lihat:
```
apotik-vi/docs/TECHNICAL_DOCUMENTATION.md
```

---

## Lisensi

Open Source - Dibuat dengan OpenClaw

---

**Apotik VI v1.0.0**
