# 💰 Sistem Keuangan Pribadi

> [!tip] Cara Pakai
> **Bilang ke Parker di chat** — Parker yang catat! Contoh:
> - *"Makan siang 25rb"*
> - *"Gaji 5jt"*
> - *"Grab ke kantor 30rb"*
> - *"Rekap bulan ini"*

---

## 🔗 Link

| Link | Deskripsi |
|------|-----------|
| 📊 [[Dashboard\|Dashboard Keuangan]] | Ringkasan semua transaksi |
| 🏷️ [[_Kategori\|Daftar Kategori]] | List kategori |
| 📄 [[Rekap/2026-03\|Rekap Maret]] | Rekap bulanan |

---

## 📁 Struktur

```
📂 Finance/
├── 📊 data.csv          ← data transaksi (Parker manage)
├── 🐍 rekap.py          ← script generate
├── 📄 Dashboard.md      ← auto-generate dari data
├── 📂 Daily/            ← file harian (auto-generate)
├── 📂 Rekap/            ← rekap bulanan (auto-generate)
└── 🏷️ _Kategori.md      ← daftar kategori
```

---

## 🏷️ Kategori

**Pengeluaran:** `food` 🍔 | `transport` 🚗 | `utilities` 🏠 | `shopping` 🛒 | `entertainment` 🎮 | `health` 🏥 | `subscription` 📱 | `education` 📚 | `fashion` 👕 | `gift` 🎁 | `business` 💼 | `other` 📦

**Pemasukan:** `salary` 💼 | `freelance` 📦 | `investment` 📈 | `bonus` 🎁 | `refund` 🔄 | `other-income` 💵

---

> [!info] How It Works
> 1. Om Seno bilang transaksi ke Parker
> 2. Parker catat ke `data.csv`
> 3. Parker jalankan `rekap.py`
> 4. Dashboard & Daily otomatis update!
