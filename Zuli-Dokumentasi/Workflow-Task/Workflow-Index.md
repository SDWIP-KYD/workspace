# 📋 Workflow Index

## Active Workflows

### 1. Extract Dosis Obat (Micromedex)
- **File:** `workflows/extract-dosis-obat.md`
- **Status:** Script ready, testing phase
- **WT-1:** Pediatric extraction (0/1057 obat)
- **WT-2:** NeoFax extraction (0/361 obat)
- **WT-3:** Cross-reference
- **Script:** `scripts/extract_drug.py`

### 2. Zuli + Kilo Code Integration
- **Status:** Research phase
- **Research:** [[Kilo-Code-CLI-Research]]
- **Next:** Install CLI & test
- **Goal:** Delegate heavy coding tasks to Kilo Code untuk hemat token

### 3. Codex Adapter
- **Status:** Code ready, waiting for auth
- **Issue:** Perlu OpenAI API key atau OAuth login
- **File:** `codex/ask-codex.sh` (v2)

### 4. Financial Manager
- **Status:** Active (via cron)
- **Cron:** Daily 21:00 WITA, Weekly Sunday 20:00 WITA
- **Data:** `data.csv` di Obsidian Finance

---

## Completed Workflows
- DrugDoses XML extraction → Obsidian (2,577 obat)
- Micromedex Index creation (1,418 obat)
- PyMuPDF installation (force unpack wheel)

---

*Terakhir diupdate: 2026-03-17*

### 5. Zuli vs Kilo Code Token Test
- **Status:** Completed ✅
- **Result:** Kilo Code = more tokens but $0, Zuli = fewer tokens with model cost
- **Folder:** `.openclaw/kilocode/`

### 6. Zuli ↔ Kilo Code Integration
- **Status:** Completed ✅
- **Wrapper:** `scripts/ask-kilo.sh` (code/review/debug/architect)
- **Token usage:** ~14K/request, $0 (free model)
- **Timeout:** 180s
- **Routing rules:** di TOOLS.md

### 7. Kilo Code Full Integration
- **Status:** Completed ✅
- **Features:** Auto-routing, session continuity, review pipeline, scheduled tasks, learning loop, Obsidian integration
- **Scripts:** ask-kilo.sh, review-kilo.sh, kilo-obsidian.sh, kilo-weekly-check.sh
- **Topic:** 570 (kilo-terminal)
