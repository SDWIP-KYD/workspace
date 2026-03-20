# 📋 Workflow: Website Apotik VI

> Membangun website/aplikasi manajemen apotik yang profesional, interaktif, dan intuitif.

---

## 🏗️ Workflow: Apotik VI — Pharmacy Management Website

### 📋 Deskripsi
Membangun website lengkap untuk Apotik VI dengan fitur manajemen stok obat, input resep dokter, dan dashboard yang menarik. Menggunakan teknologi modern dengan tampilan profesional.

### 🎨 Color Palette

| Nama | Hex | Penggunaan |
|------|-----|-----------|
| **Platinum** | `#e7ecef` | Background utama (page, card, section) |
| **Dusk Blue** | `#274c77` | Primary color (header, navbar, button utama, heading) |
| **Steel Blue** | `#6096ba` | Secondary color (button hover, link, icon accent, badge) |
| **Icy Blue** | `#a3cef1` | Accent light (hover background, highlight, border ring, progress bar) |
| **Grey Olive** | `#8b8c89` | Muted/neutral (text secondary, placeholder, disabled state, divider) |

**Rules:**
- Background = Platinum (terang, clean)
- Text utama = Dusk Blue (kontras tinggi, readable)
- Interactive elements = Steel Blue / Icy Blue
- Text sekunder & disabled = Grey Olive
- Jangan gunakan Grey Olive untuk teks di background gelap (low contrast)

### 📅 Jadwal
- **Trigger:** manual (Om Seno request)
- **Target:** Selesai dalam 1 sesi
- **Deadline:** Hari ini

---

## 🎭 Team Rapat (Agency-Agents)

| Agent | Role | Tugas |
|-------|------|-------|
| 🎤 **Zuli** | **Project Lead** | Koordinasi, delegasi ke Kilo, quality check, deploy |
| 🎨 **Frontend Developer** | Lead Dev | Build HTML/CSS/JS, komponen interaktif, responsive |
| 🎯 **UI Designer** | Visual Lead | Layout, spacing, typography, color implementation |
| 🏛️ **UX Architect** | UX Flow | Information architecture, user journey, navigation |
| 📝 **Content Creator** | Copywriter | Teks halaman, label, deskripsi, placeholder text |
| 🔍 **SEO Specialist** | SEO | Meta tags, semantic HTML, accessibility |

---

## 📦 Worktasks

1. [Planning & Architecture] → status: `pending`
2. [Core Structure & Styling] → status: `pending`
3. [Stok Obat Management] → status: `pending`
4. [Input Resep Dokter] → status: `pending`
5. [Dashboard & UI Enhancement] → status: `pending`
6. [Additional Features] → status: `pending`
7. [Testing & Finalization] → status: `pending`

---

## ✅ Tasks per Worktask

### Worktask 1: Planning & Architecture (UX Architect + Zuli)
- [ ] 1.1 Define page structure (Home, Stok Obat, Resep, Dashboard)
- [ ] 1.2 Plan database schema (obat: nama, kategori, stok, harga, expired; resep: dokter, pasien, obat, tanggal)
- [ ] 1.3 Plan user flow: Apoteker → Input stok / Kelola resep / Cari obat
- [ ] 1.4 Define tech stack: HTML5 + Tailwind CSS + Vanilla JS (atau React jika kompleks)
- [ ] 1.5 Create file/folder structure

### Worktask 2: Core Structure & Styling (Frontend Dev + UI Designer)
- [ ] 2.1 Create HTML skeleton dengan semantic elements
- [ ] 2.2 Implement color palette (Dusk Blue header/nav, Platinum bg, Steel Blue accent)
- [ ] 2.3 Build responsive navbar dengan navigasi
- [ ] 2.4 Create sidebar layout untuk dashboard
- [ ] 2.5 Build card components dengan hover effects
- [ ] 2.6 Add typography (clean sans-serif, hierarchy dengan warna)
- [ ] 2.7 Responsive design (mobile-first)

### Worktask 3: Stok Obat Management (Frontend Dev)
- [ ] 3.1 Build stok obat table dengan sort & pagination
- [ ] 3.2 Implement search bar (real-time filter by nama/kategori)
- [ ] 3.3 Add obat form (tambah baru): nama, kategori, stok, harga, tanggal expired
- [ ] 3.4 Edit obat (inline edit atau modal)
- [ ] 3.5 Delete obat (konfirmasi sebelum hapus)
- [ ] 3.6 Kategori filter dropdown
- [ ] 3.7 Low stock warning indicator (< 10 stok = badge merah)
- [ ] 3.8 Expiry date warning (< 30 hari = badge kuning)

### Worktask 4: Input Resep Dokter (Frontend Dev)
- [ ] 4.1 Build resep input form: nama dokter, nama pasien, tanggal, daftar obat
- [ ] 4.2 Auto-complete obat dari database stok (search existing drugs)
- [ ] 4.3 Multi-obat input (tambah obat satu per satu ke resep)
- [ ] 4.4 Resep list/table dengan status (baru, diproses, selesai)
- [ ] 4.5 Edit resep (apotik bisa ubah dosis, tambah/kurang obat)
- [ ] 4.6 Resep detail view
- [ ] 4.7 Auto-kurangi stok saat resep diproses
- [ ] 4.8 Print resep (optional)

### Worktask 5: Dashboard & UI Enhancement (UI Designer + Frontend Dev)
- [ ] 5.1 Dashboard overview: total obat, stok rendah, resep hari ini, expired soon
- [ ] 5.2 Stat cards dengan icon dan animasi
- [ ] 5.3 Recent activity log
- [ ] 5.4 Quick actions panel (tambah obat, input resep, cari)
- [ ] 5.5 Notification system (toast untuk success/error/warning)
- [ ] 5.6 Loading states & skeleton screens
- [ ] 5.7 Smooth transitions & micro-interactions

### Worktask 6: Additional Features (Content Creator + SEO + Frontend Dev)
- [ ] 6.1 LocalStorage/IndexedDB untuk persistence (tanpa backend)
- [ ] 6.2 Export data ke CSV
- [ ] 6.3 Import data dari CSV
- [ ] 6.4 Print-friendly stylesheet
- [ ] 6.5 Dark mode toggle (optional)
- [ ] 6.6 PWA manifest (bisa install sebagai app)
- [ ] 6.7 Semantic HTML + ARIA labels untuk accessibility
- [ ] 6.8 Meta tags & SEO optimization

### Worktask 7: Testing & Finalization (Zuli)
- [ ] 7.1 Test semua fitur CRUD stok obat
- [ ] 7.2 Test search dan filter
- [ ] 7.3 Test input resep dan edit
- [ ] 7.4 Test responsive di mobile/tablet/desktop
- [ ] 7.5 Color contrast check (readability)
- [ ] 7.6 Final review dan polish
- [ ] 7.7 Deploy ke workspace sebagai file HTML

---

## 📊 Progress
- **Total:** ~40 tasks
- **Done:** 0/40
- **Status:** 🔴 Belum mulai

---

## 🎨 Color Usage Map

```
┌─────────────────────────────────────────────┐
│  HEADER / NAVBAR        [#274c77 Dusk Blue] │
│  Text: White, Logo: #a3cef1                 │
├──────────┬──────────────────────────────────┤
│ SIDEBAR  │  MAIN CONTENT AREA               │
│ #274c77  │  Background: #e7ecef Platinum    │
│ Text:    │                                  │
│ #a3cef1  │  ┌──────────────────────────┐    │
│ Active:  │  │ Card                     │    │
│ #6096ba  │  │ bg: white, border:       │    │
│          │  │ #a3cef1                  │    │
│          │  │ title: #274c77           │    │
│          │  │ text: #8b8c89            │    │
│          │  └──────────────────────────┘    │
│          │                                  │
│          │  [Button Primary]                │
│          │   bg: #274c77, hover: #6096ba    │
│          │                                  │
│          │  [Button Secondary]              │
│          │   bg: #6096ba, hover: #a3cef1    │
│          │   text: #274c77                  │
│          │                                  │
│          │  [Badge/Warning]                 │
│          │   low stock: red                 │
│          │   expiry: amber                  │
│          │   normal: #6096ba                │
├──────────┴──────────────────────────────────┤
│  FOOTER                  [#274c77 Dusk Blue] │
│  Text: #a3cef1                              │
└─────────────────────────────────────────────┘
```

---

## 🔗 Dependencies
- Kilo Code CLI (Account 1 — Minimax model)
- Color palette di atas
- Agency-agents roles sebagai guide

---

## 📢 Notifications
- **On Progress:** Update per worktask ke Om Seno
- **On Complete:** Preview + summary ke Topic 1
- **On Error:** Langsung notif Om Seno

---

## 💡 Implementasi Tambahan (Saran Zuli)

1. **Barcode Scanner** — Pakai kamera HP untuk scan barcode obat (QuaggaJS library)
2. **Notification Stok Rendah** — Alert otomatis ketika stok < threshold
3. **Laporan Penjualan** — Grafik penjualan harian/mingguan/bulanan (Chart.js)
4. **Multi-user** — Login apoteker vs admin dengan role berbeda
5. **Riwayat Pasien** — Track resep per pasien (riwayat obat)
6. **Drug Interaction Checker** — Warning jika 2 obat berinteraksi
7. **Print Label Obat** — Cetak label dosis untuk ditempel di kemasan
8. **Backup/Restore** — Export semua data ke JSON untuk backup

---

## 📝 Notes
- **Tech stack:** Single HTML file (bisa dibuka langsung, tidak perlu server)
- **Storage:** LocalStorage untuk persistence (bisa upgrade ke backend nanti)
- **Design:** Medical/pharmacy vibe — clean, professional, trustworthy
- **Priority:** Fitur stok obat & resep dokter dulu, enhancement menyusul
- All files created by Kilo Code CLI (delegasi via ask-kilo.sh)
