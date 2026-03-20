# 🔍 Kilo Code CLI - Research

> Tanggal: 2026-03-17
> Sumber: https://kilo.ai/docs | https://github.com/Kilo-Org/kilocode

---

## 📋 Overview

**Kilo Code** = Open-source agentic engineering platform (#1 coding agent on OpenRouter)
- 1.5M+ users, 25T+ tokens processed
- Support: VS Code Extension, JetBrains Extension, **CLI**
- License: Open source

---

## 🔧 CLI Installation

```bash
npm install -g @kilocode/cli
# atau
npx @kilocode/cli
```

### Binary Download (ARM64 Linux)
- File: `kilo-linux-arm64.tar.gz`
- From: https://github.com/Kilo-Org/kilocode/releases

---

## ⚡ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| Code Generation | Generate kode dari natural language |
| Terminal Commands | Jalankan command shell |
| Browser Automation | Automasi browser |
| Multi Mode | Architect, Coder, Debugger + custom modes |
| MCP Server | Support MCP marketplace |
| Inline Autocomplete | Saran kode otomatis |
| `--auto` Flag | Fully autonomous (CI/CD) |
| 500+ Models | Gemini, Claude, GPT, dll via Kilo Gateway |

---

## 🎯 Mode System

| Mode | Fungsi |
|------|--------|
| **Architect** | Planning & design |
| **Coder** | Write & edit code |
| **Debugger** | Debug & fix issues |
| Custom | User-defined modes |

---

## 🔄 Workflow: Zuli + Kilo Code

### Konsep
Zuli = **Orchestrator** (high-level reasoning, planning, communication)
Kilo Code = **Executor** (coding tasks, file operations, debugging)

### Token Efficiency Model

| Komponen | Model | Biaya | Fungsi |
|----------|-------|-------|--------|
| Zuli (Orchestrator) | hunter-alpha (OpenRouter) | Sedang | Planning, routing, komunikasi |
| Kilo Code (Executor) | Auto/GPT-5/Claude | Variabel | Eksekusi coding task |
| Codex (Fallback) | GPT-5.4 via OpenAI | Mahal | Heavy analysis |

### Routing Rules

**Zuli handle sendiri:**
- Chat umum, Q&A singkat
- File read/search sederhana
- Ekstraksi data dari PDF
- Referensi dosis obat
- Ringkasan, penjelasan

**Delegate ke Kilo Code:**
- Multi-file editing
- Project scaffolding
- Complex debugging
- Refactoring kode
- Test writing & running
- CI/CD automation

**Delegate ke Codex (dengan konfirmasi):**
- Deep codebase analysis
- Architecture review
- Complex multi-step coding

---

## 💡 Rencana Implementasi

### Phase 1: Install & Test
- [ ] Install Kilo Code CLI (`npm install -g @kilocode/cli`)
- [ ] Test basic commands
- [ ] Cek integrasi dengan OpenRouter API key

### Phase 2: Integration
- [ ] Buat wrapper script (seperti ask-codex.sh untuk Codex)
- [ ] Define routing rules di system prompt
- [ ] Test delegation flow

### Phase 3: Automation
- [ ] Auto-route task kompleks ke Kilo Code
- [ ] Monitor token usage per tool
- [ ] Optimize berdasarkan hasil

---

## 🆚 Perbandingan: Kilo Code vs Codex CLI

| Aspek | Kilo Code | Codex CLI |
|-------|-----------|-----------|
| Install | npm (gampang) | npm (gampang) |
| Auth | Kilo account / API key | OpenAI account |
| Model | 500+ models (OpenRouter) | GPT-5.4 only |
| Mode | Multi-mode | Single |
| Auto mode | `--auto` flag | Sandbox modes |
| ARM64 | ✅ Binary available | ✅ Works |
| Open Source | ✅ | ❌ |
| Cost | Flexible (BYOK) | OpenAI pricing |

---

## 📝 Catatan
- Release terbaru: 17 Mar 2026 (hari ini!)
- Granular bash permission rules baru ditambahkan
- WarpGrep AI-powered codebase search baru
- Proxy ke app.opencode.ai sudah di-disable

---

*Next action: Install dan test Kilo Code CLI*
