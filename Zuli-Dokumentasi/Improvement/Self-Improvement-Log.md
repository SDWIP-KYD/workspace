# 💡 Self-Improvement Log

## Pelajaran dari Sesi 2026-03-17

### 1. Update Progress Real-Time (RULE WAJIB)
- **Aturan dari Om Seno:** Setiap step/task harus dikirim update-nya, bukan cuma pas selesai semua
- **Format:** Jelaskan step apa yang sedang/selesai/error, termasuk proses dan kesalahan
- **Tujuan:** Om Seno bisa monitor step-by-step dan tahu Zuli kerja dengan benar
- **Contoh:** Task ada 5 step → kirim 5 update (atau lebih kalau ada error di tengah)

### 2. Jangan Berhenti di Tengah Jalan
- **Kesalahan:** Zuli mulai buat dokumentasi tapi berhenti tanpa konfirmasi status ke Om Seno
- **Pelajaran:** Setiap task yang dimulai harus diselesaikan atau dilaporkan statusnya
- **Rule baru:** Jika Om Seno tanya "Bagaimana?" = task belum selesai dan butuh update

### 2. Platform Detection Issue (Android/ARM64)
- **Issue:** pip mendeteksi platform sebagai `Android` bukan `manylinux`, jadi wheel aarch64 ditolak
- **Solusi:** Download wheel manual → unzip → copy ke `dist-packages`
- **Reusable:** Pattern ini bisa dipakai untuk package Python lain yang bermasalah

### 3. PDF Structure Knowledge
- **NeoFax/Pediatric:** Marker "NEONATAL/PEDIATRIC DRUG MONOGRAPH" muncul di **footer** halaman (last 5-10 lines), bukan di header
- **Content** berada **di atas** marker
- **Pattern:** Search di last 10 lines, ambil content dari line 0 sampai marker

### 4. PDF Tools Hierarchy
- `pdftotext` — cepat, plain text, cocok untuk bulk extraction & indexing
- `PyMuPDF` (fitz) — structured extraction, bisa dict/table format, cocok untuk detail
- Keduanya berguna, pilih sesuai kebutuhan

### 5. ClawHub Install Issue
- **Issue:** Resolution hang terus (rate limit + network)
- **Fallback:** Install manual dari zip file
- **Note:** Skill bisa diinstall manual dengan copy ke `skills/` directory

### 6. Codex Auth
- `codex exec` butuh auth (OpenAI API key atau OAuth)
- `--device-auth` flow tersedia tapi butuh user interaction di browser
- **Status:** Belum resolved, tunggu Om Seno login

---

## Aturan Baru (dari Om Seno)

1. **"Bagaimana?" = evaluasi progress** — jangan bingung, langsung cek task sebelumnya
2. **Report status** — jangan berhenti tanpa kabar
3. **Dokumentasi ke Obsidian** — audit log, improvement, workflow/chat history

---

*Terakhir diupdate: 2026-03-17*

### 3. Cek Sebelum Download
- **Kesalahan:** Zuli download binary Kilo manual padahal Om Seno sudah install via npm
- **Pelajaran:** Cek `which` dan `--version` sebelum download/install apapun
- **Command benar:** `kilocode` (v7.0.49 via npm)
