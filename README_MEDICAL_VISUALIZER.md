# Medical Journal Visualizer - Panduan Penggunaan

## 🔧 Cara Kerja Generate Gambar

### Tools yang digunakan:

1. **exec** - Untuk membaca PDF jurnal
   ```bash
   pdf2txt.py -t text "jurnal.pdf" | head -500
   ```

2. **image_synthesize** - MiniMax Image Generation API (built-in OpenClaw)
   - Ini adalah tool internal yang memanggil layanan MiniMax
   - Model: MiniMax Image Generation
   - Resolution: up to 2K
   - Aspect ratio: 16:9, 1:1, etc.

---

## 📝 Prompt Structure (PENTING!)

Prompt yang saya gunakan mengikuti format spesifik:

```markdown
Medical [TYPE] infographic showing [TOPIC]. 
Display: [DATA SPESIFIK dari jurnal - angka, statistik].
[PENJELASAN MENDALAM tentang mekanisme/klinik].
Minimalist flat vector style. 
Color palette: [WARNA #HEX] for [ELEMEN], [WARNA #HEX] for [ELEMEN], Medical White #F8FAFC background. 
Sans-serif typography, [LAYOUT], NO FOOTER.
```

### Contoh Prompt Lengkap:

```
Medical journal cover illustration for 'Neutrophil-to-lymphocyte ratio and platelet-to-lymphocyte ratio as predictive markers in hepatoblastoma'. 
Display: Hepatoblastoma overview - Primary hepatic malignancy in children, incidence 0.5-1.5 per 100,000 population, accounts for 80% of malignant liver tumors in children younger than 3 years. Show liver anatomy with tumor location highlighted. Include biomarker indicators: NLR cutoff 0.59, PLR cutoff 106.94. Show survival statistics: 3-year Overall Survival 58.4%, 3-year Event-Free Survival 51.5%. 
Minimalist flat vector style, professional clinical mood. 
Color palette: Royal Blue #2563EB for biomarkers and headers, Crimson #DC2626 for tumor/pathology, Slate Blue #1E293B for labels, Medical White #F8FAFC background. 
Sans-serif typography, bold hierarchical layout, NO FOOTER.
```

---

## ⚠️ Mengapa Local Generation Sering Gagal?

### Masalah Umum:

1. **Prompt terlalu panjang** - Beberapa model memiliki limit token yang lebih kecil
2. **Tidak ada detail spesifik** - Model butuh deskripsi detail tentang:
   - Warna spesifik (hex codes)
   - Style (minimalist flat vector)
   - Layout yang diinginkan
   - Elemen yang harus ada
3. **Tidak ada konteks medis** - Model perlu tahu ini untuk konteks medis
4. **Aspect ratio tidak disebutkan** - Beberapa model butuh explicit mention

### Solusi:

1. **Gunakan prompt yang lebih ringkas** tapi tetap spesifik
2. **Sebutkan warna dengan hex codes** - bukan hanya nama warna
3. **Tambahkan style indicator** - "minimalist flat vector"
4. **Mention NO FOOTER** jika tidak mau watermark

---

## 🚀 Cara Pakai Python Script (Local)

### Prerequisites:
```bash
pip install requests pillow
```

### Setup API Key:
```bash
# Option 1: Environment variable
export MINIMAX_API_KEY="your-api-key"

# Option 2: Command line
python script.py --api-key "your-api-key" ...
```

### Get API Key:
1. Daftar di https://platform.minimax.io/
2. Buat API key di dashboard
3. Salin ke environment atau command

### Usage:

```bash
# Generate single image
python medical_journal_visualizer.py \
    --api-key "your-key" \
    --topic "journal cover" \
    --data "NLR cutoff 0.59, PLR cutoff 106.94" \
    --mechanism "Show liver anatomy with tumor location" \
    --colors "Royal Blue #2563EB for biomarkers, Crimson #DC2626 for tumor" \
    --output "frame_1.png"

# Or use full prompt
python medical_journal_visualizer.py \
    --api-key "your-key" \
    --prompt "Medical infographic showing..." \
    --output "frame_1.png"

# Create HTML slideshow from existing images
python medical_journal_visualizer.py \
    --html "/path/to/images/folder" \
    --title "My Presentation"
```

---

## 📊 Color Palettes Tersedia

### Palette 1: Blue/Crimson (Yang baru)
| Color | Hex | Usage |
|-------|-----|-------|
| Royal Blue | #2563EB | Primary, headers |
| Crimson | #DC2626 | Pathology |
| Slate | #1E293B | Labels |
| Amber | #F59E0B | Warnings |
| Emerald | #10B981 | Success |
| Gray | #64748B | Neutral |

### Palette 2: Teal/Crimson (Yang lama)
| Color | Hex | Usage |
|-------|-----|-------|
| Teal | #0D7377 | Intervention |
| Crimson | #C0392B | Pathology |
| Slate Blue | #2D4159 | Secondary |
| Amber | #F0A500 | Limitations |
| Green | #27AE60 | Improvement |
| Gray | #7F8C8D | Control |

---

## 💡 Tips Prompt Engineering

### DO:
✅ Gunakan hex codes untuk warna
✅ Berikan angka spesifik dari jurnal
✅ Jelaskan mekanisme/pathway
✅ Tambahkan "minimalist flat vector style"
✅ Mention "NO FOOTER" jika tidak mau footer

### DON'T:
❌ Jangan terlalu panjang (max ~500 kata)
❌ Jangan gunakan istilah yang ambigu
❌ Jangan lupa aspect ratio
❌ Jangan lupa background color

---

## 📁 File Structure

```
/workspace/
├── scripts/
│   └── medical_journal_visualizer.py   # Main script
├── medical-journal-visualizations/
│   ├── hepatoblastoma-nlr-plr/
│   │   ├── frame_*.png
│   │   └── index.html
│   └── ...
└── README_MEDICAL_VISUALIZER.md       # This file
```
