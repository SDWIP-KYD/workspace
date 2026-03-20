# Product Requirements Document (PRD)
# Website Apotik VI — Sistem Manajemen Apotik

| Field | Value |
|-------|-------|
| **Document Owner** | Zuli (Project Lead) |
| **Version** | 1.0 Draft |
| **Date** | 2026-03-18 |
| **Status** | 🟡 In Review |
| **Advisor** | Kilo Code (General Advisor) |

---

## 1. Overview & Problem Statement

### 1.1 Project Overview
Membangun website manajemen apotik untuk **Apotik VI** — sistem berbasis web yang memungkinkan pengelolaan stok obat, input resep dokter, dan monitoring dashboard dalam satu platform terpusat.

### 1.2 Problem Statement
Apotik VI saat ini mengelola operasional secara manual (kertas/Excel), menyebabkan:

| # | Masalah | Dampak |
|---|---------|--------|
| 1 | Stok dihitung manual | Tidak akurat, kehabisan obat tanpa peringatan |
| 2 | Resep dokter ditulis tangan | Rawan salah baca, tidak terarsip |
| 3 | Tidak ada peringatan expired | Obat kadaluarsa terjual ke pasien |
| 4 | Tidak ada search system | Cari obat lambat, terutama dengan stok banyak |
| 5 | Tidak ada data terpusat | Sulit buat keputusan bisnis |

### 1.3 Solution
Single-page web application yang bisa diakses langsung (tanpa install), dengan:
- CRUD stok obat lengkap dengan search & filter
- Form input resep dokter yang terintegrasi dengan database obat
- Dashboard monitoring real-time (stok, expired, resep)
- Data persistence via LocalStorage (upgradeable ke backend)

---

## 2. Goals & Success Metrics

### 2.1 Business Goals
| Goal | Target |
|------|--------|
| Kurangi waktu pencarian obat | Dari 5 menit → < 10 detik |
| Eliminasi stok kosong tanpa peringatan | 0 kasus stok habis tanpa warning |
| Akurasi data stok | 99%+ akurat |
| Waktu input resep | Dari 3 menit → < 30 detik |

### 2.2 Success Metrics
| Metric | Measurement | Target |
|--------|-------------|--------|
| Search response time | Time to result | < 500ms |
| CRUD operation time | Add/Edit/Delete | < 2 detik |
| User adoption | Daily active usage | 100% oleh apoteker |
| Data accuracy | Stock count match | ≥ 99% |
| Error rate | Failed operations | < 1% |

---

## 3. Target Users & Personas

### 3.1 Primary Users

**👤 Persona 1: Apoteker (Primary)**
- Nama: Bu Rina, 35 tahun
- Tech skill: Menengah (HP & komputer sehari-hari)
- Kebutuhan: Kelola stok, input resep, cari obat cepat
- Pain point: Manual counting, lupa stok habis, resep tidak terbaca
- Device: Desktop di apotik + HP untuk cek cepat

**👤 Persona 2: Admin Apotik**
- Nama: Pak Dedi, 40 tahun  
- Tech skill: Dasar (Excel, WhatsApp)
- Kebutuhan: Lihat laporan, monitor performa apotik
- Pain point: Tidak ada data akurat untuk keputusan
- Device: Desktop/laptop

### 3.2 Secondary Users

**👤 Persona 3: Dokter (External)**
- Nama: Dr. Sari
- Kebutuhan: Kirim resep ke apotik secara digital
- Pain point: Resep tulisan tangan sering tidak terbaca
- Device: HP/tablet

---

## 4. User Stories & Scenarios

### 4.1 User Stories — P1 (Must Have)

| # | As a... | I want to... | So that... |
|---|---------|-------------|-----------|
| US-01 | Apoteker | Tambah obat baru ke stok | Data obat lengkap di sistem |
| US-02 | Apoteker | Edit info obat (harga, stok, dll) | Data selalu up-to-date |
| US-03 | Apoteker | Hapus obat dari stok | Database bersih dari obat tidak dipakai |
| US-04 | Apoteker | Cari obat berdasarkan nama/kategori | Temukan obat dalam < 10 detik |
| US-05 | Apoteker | Lihat daftar semua obat dalam tabel | Overview stok lengkap |
| US-06 | Apoteker | Input resep dari dokter (nama dokter, pasien, obat) | Resep tercatat digital |
| US-07 | Apoteker | Pilih obat dari database saat input resep | Tidak perlu ketik ulang nama obat |
| US-08 | Apoteker | Lihat peringatan stok rendah (< 10) | Segera order ulang |
| US-09 | Apoteker | Lihat peringatan obat expired (< 30 hari) | Tidak jual obat kadaluarsa |
| US-10 | Apoteker | Edit resep yang sudah diinput | Koreksi jika ada kesalahan |

### 4.2 User Stories — P2 (Should Have)

| # | As a... | I want to... | So that... |
|---|---------|-------------|-----------|
| US-11 | Admin | Lihat dashboard dengan ringkasan | Monitor performa harian |
| US-12 | Admin | Export data stok ke CSV | Backup atau analisis di Excel |
| US-13 | Admin | Import data stok dari CSV | Migrasi data cepat |
| US-14 | Apoteker | Lihat riwayat resep per pasien | Track obat yang pernah diberikan |
| US-15 | Apoteker | Filter obat berdasarkan kategori | Cari lebih spesifik |
| US-16 | Apoteker | Dapat notifikasi toast untuk setiap aksi | Konfirmasi berhasil/gagal |

### 4.3 User Stories — P3 (Nice to Have)

| # | As a... | I want to... | So that... |
|---|---------|-------------|-----------|
| US-17 | Dokter | Kirim resep digital ke apotik | Resep langsung masuk sistem |
| US-18 | Admin | Lihat grafik penjualan | Analisis trend bisnis |
| US-19 | Admin | Print resep/label obat | Arsip fisik |
| US-20 | Apoteker | Scan barcode obat | Input lebih cepat |

---

## 5. Feature Requirements

### 5.1 Feature Priority Matrix

| Feature | Priority | Complexity | Sprint |
|---------|----------|------------|--------|
| Stok Obat CRUD | P0 - Critical | Medium | Sprint 1 |
| Search & Filter | P0 - Critical | Low | Sprint 1 |
| Input Resep Dokter | P0 - Critical | High | Sprint 1 |
| Dashboard Overview | P1 - High | Medium | Sprint 2 |
| Low Stock Warning | P1 - High | Low | Sprint 2 |
| Expiry Warning | P1 - High | Low | Sprint 2 |
| CSV Export/Import | P1 - High | Medium | Sprint 2 |
| Resep History | P2 - Medium | Medium | Sprint 3 |
| Print Function | P3 - Low | Low | Sprint 3 |
| Dark Mode | P3 - Low | Medium | Sprint 3 |

### 5.2 Detailed Feature Specs

#### FEATURE 1: Stok Obat Management
**Description:** CRUD lengkap untuk manajemen stok obat

**Data Model:**
```
Obat {
  id: string (auto-generated UUID)
  nama: string (required) — e.g. "Paracetamol 500mg"
  kategori: enum — ["Analgesik", "Antibiotik", "Vitamin", "Antasida", "Lainnya"]
  stok: number (required, min: 0)
  harga: number (required, min: 0) — dalam Rupiah
  satuan: enum — ["Tablet", "Kapsul", "Botol", "Strip", "Box"]
  tanggal_expired: date (required)
  tanggal_input: date (auto)
  catatan: string (optional)
}
```

**Acceptance Criteria:**
- [ ] Form tambah obat validasi semua field required
- [ ] Edit obat via modal/inline edit
- [ ] Delete dengan konfirmasi dialog
- [ ] Tabel sortable (nama, stok, harga, expired)
- [ ] Pagination jika > 20 items
- [ ] Stok < 10 = badge merah "Low Stock"
- [ ] Expired < 30 hari = badge kuning "Expiring Soon"

#### FEATURE 2: Search & Filter
**Description:** Real-time search dan kategori filter

**Acceptance Criteria:**
- [ ] Search bar di atas tabel
- [ ] Filter real-time (delay < 100ms setelah user stop ketik)
- [ ] Search by nama obat (case-insensitive, partial match)
- [ ] Dropdown filter kategori
- [ ] Kombinasi search + kategori filter
- [ ] "No results" state dengan clear message
- [ ] Clear filter button

#### FEATURE 3: Input Resep Dokter
**Description:** Form untuk mencatat resep dari dokter

**Data Model:**
```
Resep {
  id: string (auto-generated UUID)
  nama_dokter: string (required)
  nama_pasien: string (required)
  tanggal: date (auto, bisa diubah)
  items: Array<{
    obat_id: string (reference ke Obat)
    nama_obat: string (denormalized)
    dosis: string — e.g. "3x1 tablet"
    jumlah: number
  }>
  status: enum ["baru", "diproses", "selesai"]
  catatan: string (optional)
  created_at: datetime
  updated_at: datetime
}
```

**Acceptance Criteria:**
- [ ] Form input dokter, pasien, tanggal
- [ ] Tambah obat ke resep (search existing obat dari database)
- [ ] Auto-complete saat ketik nama obat
- [ ] Input dosis dan jumlah per obat
- [ ] Hapus obat dari resep sebelum submit
- [ ] Edit resep setelah dibuat
- [ ] Ubah status resep (baru → diproses → selesai)
- [ ] Saat status "diproses", otomatis kurangi stok obat
- [ ] List semua resep dengan filter by status/tanggal

#### FEATURE 4: Dashboard
**Description:** Overview ringkas untuk monitoring

**Widgets:**
1. **Total Obat** — jumlah item di database
2. **Stok Rendah** — count obat dengan stok < 10
3. **Akan Expired** — count obat expired < 30 hari
4. **Resep Hari Ini** — count resep yang dibuat hari ini
5. **Recent Activity** — 5 aktivitas terakhir (tambah/edit/hapus obat, input resep)
6. **Quick Actions** — shortcut ke Tambah Obat, Input Resep, Cari

---

## 6. Non-Functional Requirements

### 6.1 Performance
| Requirement | Target |
|-------------|--------|
| Page load time | < 2 detik di 3G |
| Search response | < 500ms (client-side) |
| CRUD operation | < 1 detik |
| Support items | Up to 5,000 obat |

### 6.2 Compatibility
| Platform | Support |
|----------|---------|
| Chrome (desktop) | ✅ Full |
| Firefox (desktop) | ✅ Full |
| Safari (desktop) | ✅ Full |
| Chrome Mobile | ✅ Full |
| Safari iOS | ✅ Full |
| Screen sizes | 320px - 1920px |

### 6.3 Usability
- Learning curve < 15 menit untuk user baru
- Semua aksi bisa dicapai dalam ≤ 3 klik
- Keyboard navigation support
- Error messages jelas dan actionable

### 6.4 Data
- Data stored di LocalStorage (browser)
- Auto-save setiap perubahan
- Export/import JSON/CSV untuk backup
- Tidak ada data loss saat browser close

---

## 7. UI/UX Requirements

### 7.1 Design System

**Color Palette:**
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#e7ecef` | Page background |
| `--bg-card` | `#ffffff` | Card, modal, form background |
| `--text-heading` | `#274c77` | All headings, nav text |
| `--text-body` | `#1a1a1a` | Body text (not from palette — use dark for readability) |
| `--text-muted` | `#8b8c89` | Secondary text, placeholder, disabled |
| `--primary` | `#274c77` | Primary buttons, active nav |
| `--primary-hover` | `#6096ba` | Button hover, link hover |
| `--accent` | `#a3cef1` | Border ring, highlight bg, progress |
| `--border` | `#d1d5db` | Table border, input border |
| `--success` | `#22c55e` | Success toast, active status |
| `--warning` | `#f59e0b` | Expiry warning badge |
| `--danger` | `#ef4444` | Low stock badge, delete button |

**Typography:**
| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 | System sans | 24px | 700 |
| H2 | System sans | 20px | 600 |
| H3 | System sans | 16px | 600 |
| Body | System sans | 14px | 400 |
| Small | System sans | 12px | 400 |
| Button | System sans | 14px | 500 |

### 7.2 Layout Structure
```
┌──────────────────────────────────────────────┐
│ TOPBAR: Logo | Search | Notification | User │
├────────┬─────────────────────────────────────┤
│        │                                     │
│ SIDE-  │  MAIN CONTENT AREA                  │
│ BAR    │                                     │
│        │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐  │
│ 📊Dash │  │Card │ │Card │ │Card │ │Card │  │
│ 💊Stok │  └─────┘ └─────┘ └─────┘ └─────┘  │
│ 📋Resep│                                     │
│ 📈Lapor│  ┌─────────────────────────────┐    │
│        │  │ Table / Form / Content      │    │
│        │  │                             │    │
│        │  └─────────────────────────────┘    │
│        │                                     │
├────────┴─────────────────────────────────────┤
│ FOOTER: Version | Last Saved | Credits      │
└──────────────────────────────────────────────┘
```

### 7.3 Responsive Breakpoints
| Breakpoint | Layout |
|------------|--------|
| Desktop (> 1024px) | Sidebar + content side-by-side |
| Tablet (768-1024px) | Collapsible sidebar |
| Mobile (< 768px) | Hamburger menu, stacked layout |

---

## 8. Technical Architecture

### 8.1 Tech Stack
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Markup | HTML5 | Semantic, accessible |
| Styling | Tailwind CSS (CDN) + Custom CSS | Rapid dev, consistent |
| Logic | Vanilla JavaScript | Lightweight, no build step |
| Storage | LocalStorage API | No backend needed |
| Charts | Chart.js (CDN) | Dashboard graphs |
| Icons | SVG inline / Heroicons | No extra dependency |

### 8.2 File Structure
```
apotik-vi/
├── index.html              # SPA entry point
├── css/
│   └── custom.css          # Custom styles + color tokens
├── js/
│   ├── app.js              # Router, init, global state
│   ├── storage.js          # LocalStorage CRUD wrapper
│   ├── stok.js             # Stok obat module
│   ├── resep.js            # Resep module  
│   ├── dashboard.js        # Dashboard module
│   └── utils.js            # Helpers (format, validate, toast)
└── assets/
    └── icons.svg           # SVG sprite
```

### 8.3 Data Flow
```
User Action → JS Module → Storage Helper → LocalStorage
                                    ↓
                              Update UI ← Re-render
```

---

## 9. Timeline & Milestones

| Sprint | Duration | Features | Deliverable |
|--------|----------|----------|-------------|
| **Sprint 1** | Day 1-2 | Core structure, Stok CRUD, Search, Resep input | Working prototype |
| **Sprint 2** | Day 3-4 | Dashboard, Warnings, CSV export/import, Toast notifications | Feature complete |
| **Sprint 3** | Day 5 | Polish, responsive fix, print, dark mode (optional) | Production ready |

### Milestones
| # | Milestone | Target | Criteria |
|---|-----------|--------|----------|
| M1 | Prototype Working | End of Sprint 1 | CRUD + Search + Resep work |
| M2 | Feature Complete | End of Sprint 2 | All P0+P1 features done |
| M3 | Production Ready | End of Sprint 3 | Tested, polished, deployed |

---

## 10. Out of Scope (v1.0)

| Feature | Reason | Target Version |
|---------|--------|---------------|
| Backend/database | Overkill untuk v1, LocalStorage cukup | v2.0 |
| User authentication | Single user apotik | v2.0 |
| Multi-branch support | 1 apotik dulu | v3.0 |
| Payment integration | Di luar scope manajemen | v3.0 |
| Doctor portal | Perlu backend dulu | v2.0 |
| Mobile app (native) | PWA cukup untuk v1 | v2.0 |
| Barcode scanner | Library tambahan, kompleksitas | v2.0 |
| Drug interaction check | Perlu database medis | v3.0 |

---

## 11. Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| 1 | Apakah perlu multiple user login untuk v1? | Om Seno | 🔴 Open |
| 2 | Kategori obat default apa saja? | Om Seno | 🔴 Open |
| 3 | Berapa estimasi jumlah obat di stok? | Om Seno | 🔴 Open |
| 4 | Apakah perlu print resep di v1? | Om Seno | 🔴 Open |

---

## 12. Appendix

### 12.1 Glossary
| Term | Definition |
|------|-----------|
| CRUD | Create, Read, Update, Delete |
| PWA | Progressive Web App |
| LocalStorage | Browser storage API (key-value) |
| Sprint | Periode pengembangan (2-3 hari) |

### 12.2 References
- Color Palette: https://coolors.co (custom Apotik VI palette)
- Agency-Agents: github.com/msitarzewski/agency-agents
- Tailwind CSS: tailwindcss.com

### 12.3 Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-18 | Zuli | Initial draft dari rapat virtual |
| 1.1 | 2026-03-18 | Zuli + Kilo Code | Review advisory: added risks, suggestions, re-prioritized features |

---

*This is a living document. Updates will be made as the project evolves.*
