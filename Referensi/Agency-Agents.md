---
title: The Agency — AI Agent Collection
url: https://github.com/msitarzewski/agency-agents
date: 2026-03-17
tags: [ai-agents, claude-code, prompt-engineering, reference]
---

# 🎭 The Agency: AI Specialists Ready to Transform Your Workflow

> **A complete AI agency at your fingertips** — Koleksi AI agent personalities yang dirancang untuk Claude Code dan tools lainnya (Cursor, Aider, Windsurf, Gemini CLI, OpenCode).

## 📊 Quick Stats

| Metric | Value |
|--------|-------|
| ⭐ Stars | 51,193 |
| 🍴 Forks | 7,629 |
| 📅 Created | 2025-10-13 |
| 🔄 Updated | 2026-03-17 |
| 📝 License | MIT |
| 🔧 Language | Shell (scripts) |

## 🚀 Apa Ini?

Born from a Reddit thread dan bulan-bulan iterasi, **The Agency** adalah kumpulan AI agent personalities. Setiap agent punya:

- **🎯 Specialized** — Deep expertise di domain-nya (bukan generic prompt template)
- **🧠 Personality-Driven** — Voice, communication style, dan approach yang unik
- **📋 Deliverable-Focused** — Real code, processes, dan measurable outcomes
- **✅ Production-Ready** — Battle-tested workflows dan success metrics

## ⚡ Cara Pakai

### Option 1: Claude Code (Recommended)
```bash
cp -r agency-agents/* ~/.claude/agents/
# Lalu activate di session: "Hey Claude, activate Frontend Developer mode"
```

### Option 2: Tools Lain (Cursor, Aider, Windsurf, dll.)
```bash
./scripts/convert.sh          # Generate integration files
./scripts/install.sh           # Auto-detect & install
./scripts/install.sh --tool cursor  # Target tool spesifik
```

## 🎨 Roster Agent (70+ Agent)

### 💻 Engineering Division (22 Agent)

| Agent | Specialty | Gunakan Ketika |
|-------|-----------|----------------|
| 🎨 Frontend Developer | React/Vue/Angular, UI, performance | Modern web apps, pixel-perfect UI |
| 🏗️ Backend Architect | API design, database, scalability | Microservices, cloud infrastructure |
| 📱 Mobile App Builder | iOS/Android, React Native, Flutter | Cross-platform mobile apps |
| 🤖 AI Engineer | ML models, deployment, AI integration | ML features, data pipelines |
| 🚀 DevOps Automator | CI/CD, infrastructure automation | Pipeline, deployment automation |
| ⚡ Rapid Prototyper | Fast POC, MVPs | Hackathon, quick iteration |
| 💎 Senior Developer | Laravel/Livewire, advanced patterns | Complex implementations |
| 🔒 Security Engineer | Threat modeling, secure code review | App security, vulnerability assessment |
| ⚡ Autonomous Optimization Architect | LLM routing, cost optimization | Intelligent API selection |
| 🔩 Embedded Firmware Engineer | Bare-metal, RTOS, ESP32/STM32 | IoT devices, embedded systems |
| 🚨 Incident Response Commander | Incident management, post-mortems | Production incidents |
| ⛓️ Solidity Smart Contract Engineer | EVM contracts, gas optimization | DeFi protocols |
| 📚 Technical Writer | Developer docs, API reference | Technical documentation |
| 🎯 Threat Detection Engineer | SIEM rules, threat hunting | Detection layers |
| 💬 WeChat Mini Program Developer | WeChat ecosystem, Mini Programs | WeChat apps |
| 👁️ Code Reviewer | PR reviews, code quality gates | Code quality, mentoring |
| 🗄️ Database Optimizer | Schema design, query optimization | PostgreSQL/MySQL tuning |
| 🌿 Git Workflow Master | Branching strategies, conventional commits | Git workflow design |
| 🏛️ Software Architect | System design, DDD, trade-off analysis | Architecture decisions |
| 🛡️ SRE | SLOs, error budgets, observability | Production reliability |
| 🧬 AI Data Remediation Engineer | Self-healing pipelines, semantic clustering | Fixing broken data at scale |
| 🔧 Data Engineer | Data pipelines, lakehouse, ETL/ELT | Data infrastructure |
| 🔗 Feishu Integration Developer | Feishu/Lark bots, workflows | Feishu ecosystem |

### 🎨 Design Division (8 Agent)

| Agent | Specialty | Gunakan Ketika |
|-------|-----------|----------------|
| 🎯 UI Designer | Visual design, design systems | Interface creation, brand consistency |
| 🔍 UX Researcher | User testing, behavior analysis | Usability testing, design insights |
| 🏛️ UX Architect | Technical architecture, CSS systems | Developer-friendly foundations |
| 🎭 Brand Guardian | Brand identity, positioning | Brand strategy, guidelines |
| 📖 Visual Storyteller | Visual narratives, multimedia | Brand storytelling |
| ✨ Whimsy Injector | Personality, delight, playful interactions | Micro-interactions, Easter eggs |
| 📷 Image Prompt Engineer | AI image prompts, photography | Midjourney, DALL-E, Stable Diffusion |
| 🌈 Inclusive Visuals Specialist | Representation, bias mitigation | Culturally accurate AI images |

### 💰 Paid Media Division (7 Agent)

| Agent | Specialty | Gunakan Ketika |
|-------|-----------|----------------|
| 💰 PPC Campaign Strategist | Google/Microsoft/Amazon Ads | Account buildouts, budget allocation |
| 🔍 Search Query Analyst | Search term analysis, negative keywords | Query audits, wasted spend elimination |
| 📋 Paid Media Auditor | 200+ point account audits | Account takeovers, competitive pitches |
| 📡 Tracking & Measurement Specialist | GTM, GA4, conversion tracking | Tracking audits, platform migrations |
| ✍️ Ad Creative Strategist | RSA copy, Meta creative | Creative launches, testing programs |
| 📺 Programmatic & Display Buyer | GDN, DSPs, ABM display | Display planning, partner outreach |
| 📱 Paid Social Strategist | Meta, LinkedIn, TikTok | Social ad programs, audience strategy |

### 💼 Sales Division (8 Agent)

| Agent | Specialty | Gunakan Ketika |
|-------|-----------|----------------|
| 🎯 Outbound Strategist | Signal-based prospecting, ICP targeting | Research-driven outreach |
| 🔍 Discovery Coach | SPIN, Gap Selling, Sandler | Discovery calls, qualifying |
| ♟️ Deal Strategist | MEDDPICC, competitive positioning | Scoring deals, win strategies |
| 🛠️ Sales Engineer | Technical demos, POC scoping | Pre-sales technical wins |
| 🏹 Proposal Strategist | RFP response, win themes | Persuasive proposals |
| 📊 Pipeline Analyst | Forecasting, pipeline health | Pipeline reviews, RevOps |
| 🗺️ Account Strategist | Land-and-expand, QBRs | Post-sale expansion, NRR growth |
| 🏋️ Sales Coach | Rep development, call coaching | Team coaching |

### 📢 Marketing Division (20+ Agent)

| Agent | Specialty | Gunakan Ketika |
|-------|-----------|----------------|
| 🚀 Growth Hacker | User acquisition, viral loops | Explosive growth, conversion |
| 📝 Content Creator | Multi-platform content, editorial | Content strategy, copywriting |
| 🐦 Twitter Engager | Real-time engagement, thought leadership | Twitter/LinkedIn strategy |
| 📱 TikTok Strategist | Viral content, algorithm optimization | Gen Z/Millennial audience |
| 📸 Instagram Curator | Visual storytelling, community | Instagram strategy, aesthetic |
| 🤝 Reddit Community Builder | Authentic engagement, value-driven | Reddit strategy, community trust |
| 📱 App Store Optimizer | ASO, conversion optimization | App marketing, store optimization |
| 🌐 Social Media Strategist | Cross-platform strategy | Multi-platform campaigns |
| 📕 Xiaohongshu Specialist | Lifestyle content, trend-driven | Xiaohongshu growth, Gen Z |
| 💬 WeChat Official Account Manager | Subscriber engagement | WeChat OA strategy |
| 🧠 Zhihu Strategist | Thought leadership, knowledge-driven | Zhihu authority building |
| 🇨🇳 Baidu SEO Specialist | Baidu optimization, ICP compliance | China search market |
| 🎬 Bilibili Content Strategist | B站 algorithm, danmaku culture | Bilibili audience building |
| 🎠 Carousel Growth Engine | TikTok/Instagram carousels | Autonomous carousel publishing |
| 💼 LinkedIn Content Creator | Personal branding, B2B content | LinkedIn growth |
| 🛒 China E-Commerce Operator | Taobao, Tmall, Pinduoduo | Multi-platform e-commerce |
| 🎥 Kuaishou Strategist | Kuaishou, grassroots growth | Lower-tier markets |
| 🔍 SEO Specialist | Technical SEO, link building | Organic search growth |
| 📘 Book Co-Author | Thought-leadership books | Ghostwriting, publishing |
| 🌏 Cross-Border E-Commerce Specialist | Amazon, Shopee, Lazada | Cross-border fulfillment |
| 🎵 Douyin Strategist | Douyin, short-video marketing | China short-video platform |
| 🎙️ Livestream Commerce Coach | Host training, live room optimization | Livestream e-commerce |
| 🎧 Podcast Strategist | Podcast content strategy | Chinese podcast market |
| 🔒 Private Domain Operator | WeCom, private traffic | WeChat private domain |
| 🎬 Short-Video Editing Coach | Post-production, editing workflows | Video editing optimization |
| 🔥 Weibo Strategist | Sina Weibo, trending topics | Weibo operations and growth |
| 🔮 AI Citation Strategist | AEO/GEO, AI recommendation visibility | ChatGPT, Claude, Gemini visibility |

### 📊 Product Division (5 Agent)

| Agent | Specialty | Gunakan Ketika |
|-------|-----------|----------------|
| 🎯 Sprint Prioritizer | Agile planning, feature prioritization | Sprint planning, backlog |
| 🔍 Trend Researcher | Market intelligence, competitive analysis | Market research, trends |
| 💬 Feedback Synthesizer | User feedback analysis | User insights, product priorities |
| 🧠 Behavioral Nudge Engine | Behavioral psychology, nudge design | User engagement |
| 🧭 Product Manager | Full lifecycle product ownership | Discovery, PRDs, roadmap |

### 🎬 Project Management Division (6 Agent)

| Agent | Specialty | Gunakan Ketika |
|-------|-----------|----------------|
| 🎬 Studio Producer | High-level orchestration | Multi-project oversight |
| 🐑 Project Shepherd | Cross-functional coordination | End-to-end coordination |
| ⚙️ Studio Operations | Day-to-day efficiency | Process optimization |
| 🧪 Experiment Tracker | A/B tests, hypothesis validation | Data-driven decisions |
| 👔 Senior Project Manager | Realistic scoping, task conversion | Scope management |
| 📋 Jira Workflow Steward | Git workflow, branch strategy | Jira-linked delivery |

### 🧪 Testing Division

| Agent | Specialty | Gunakan Ketika |
|-------|-----------|----------------|
| 📸 Evidence Collector | Screenshot-based QA, visual proof | UI testing, bug documentation |
| 🔍 Reality Checker | Evidence-based certification | Production readiness, quality gates |

## 🤔 Analisis Zuli

### 👍 Yang Bagus
- **Konsep specialized agent > generic prompt** — Context switching lebih jelas karena tiap agent punya boundary
- **Struktur rapi** — File markdown per agent, gampang di-copy ke Claude Code atau tool lain
- **Coverage luas** — Termasuk niche seperti Embedded Firmware, Feishu Integration, China market specialists
- **Multi-tool support** — Script convert buat Cursor, Aider, Windsurf, dll.
- **51K+ stars** — Community yang sangat besar dan aktif

### ⚠️ Yang Perlu Dipertimbangkan
- **Intinya prompt templates dengan extra steps** — Bedanya sama system prompt biasa: ada "personality" dan "communication style" ditulis di dalam. Tapi tetep aja, LLM-nya cuma ngikutin instruction — bukan beneran "specialist"
- **"Production-ready" dan "battle-tested"** klaim yang terlalu berani untuk collection of markdown files
- **Banyak agent yang overlap** — Misalnya "Frontend Developer" vs "Rapid Prototyper" vs "Senior Developer"
- **Personality swap bisa ganggu continuity** — Tiap ganti agent, context dan personality berubah total

### 💡 Takeaway untuk Kita
- Sebagai **referensi desain agent persona** — bagus
- Approach yang lebih natural: punya beberapa tool/skill yang bisa dipanggil sesuai konteks, daripada full personality swap
- Beberapa agent concept bisa diadaptasi buat workflow kita (misal: Code Reviewer, Technical Writer, Git Workflow Master)

---

*Source: [github.com/msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents)*
*Diakses: 2026-03-17*
