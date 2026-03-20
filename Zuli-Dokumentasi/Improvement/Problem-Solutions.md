# 🔧 Problem & Solutions

Database masalah yang pernah dihadapi dan solusinya.

---

## Python / pip

### PyMuPDF Install Gagal di Python 3.13 ARM64 Android
- **Error:** `not a supported wheel on this platform`
- **Cause:** pip detect `Android-16-aarch64` bukan `manylinux_2_28_aarch64`
- **Solution:**
  1. Download wheel manual: `curl -o pymupdf.whl <URL>`
  2. `unzip pymupdf.whl -d extracted/`
  3. Copy `pymupdf/`, `fitz/`, dan `.dist-info/` ke `/usr/local/lib/python3.13/dist-packages/`
  4. Test: `python3 -c "import pymupdf"`
- **Date:** 2026-03-17
- **Status:** ✅ Resolved

### pip install Hang/Mati Mendadak
- **Error:** Process killed (SIGTERM) setelah 30-60 detik
- **Cause:** Compile from source butuh banyak resource di ARM64
- **Solution:** Cari prebuilt wheel, atau download manual
- **Tip:** `pip install --only-binary=:all:` untuk hindari compile

---

## CLI Tools

### Codex CLI - Not Logged In
- **Error:** `401 Unauthorized: Missing bearer or basic authentication`
- **Cause:** `codex login status` = "Not logged in"
- **Solution (pending):** 
  - Option A: `codex login --device-auth` → buka browser → masukkan kode
  - Option B: `printf 'sk-KEY' | codex login --with-api-key`
- **Date:** 2026-03-17
- **Status:** ⏳ Waiting for user action

### ClawHub CLI - Rate Limit / Hang
- **Error:** `Rate limit exceeded` atau hang saat resolving
- **Cause:** ClawHub API rate limit + network issues
- **Solution:** Install manual dari zip:
  1. Extract zip ke `skills/<nama-skill>/`
  2. Copy `SKILL.md`, `_meta.json`, dan file lainnya
- **Date:** 2026-03-17
- **Status:** ✅ Resolved

---

## PDF Extraction

### Marker di Footer Bukan Header
- **Issue:** Pattern `NEONATAL DRUG MONOGRAPH` muncul di LAST 5-10 lines halaman, bukan di awal
- **Cause:** PDF format — marker adalah footer pembatas antar monograf
- **Solution:** Search marker di last 10 lines, content = semua line sebelum marker
- **Date:** 2026-03-17
- **Status:** ✅ Resolved → diimplementasi di `scripts/extract_drug.py`

### pdftotext vs PyMuPDF
- **Learning:** `pdftotext` lebih cepat untuk bulk extraction, PyMuPDF lebih akurat untuk structured data
- **Usage:** pdftotext untuk indexing, PyMuPDF untuk detail monograf

---

## Network / Auth

### OPENAI_API_KEY Tidak Ada
- **Issue:** Tidak ada OpenAI API key di environment
- **Context:** Codex butuh key OpenAI, bukan OpenRouter
- **Solution:** Tunggu user setup atau pakai OAuth

---

*Last updated: 2026-03-17*
