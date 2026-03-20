# Workflow and Planning for Apotik VI Website

> **Project**: Website Apotik VI — Sistem Manajemen Apotik  
> **Version**: 1.0  
> **Date**: 2026-03-18  
> **Prepared by**: Zuli (Project Lead) with Kilo Code  
> **Status**: 🟡 In Review  

---

## 📖 Overview

This document combines the **workflow** (step-by-step process) and **planning** (timeline, milestones, resource allocation) for building the Apotik VI pharmacy management website based on the approved Product Requirements Document (PRD).

The goal is to deliver a single-page web application (SPA) that enables medicine stock management, doctor prescription input, and real-time dashboard monitoring — all accessible via browser without installation, using LocalStorage for data persistence.

---

## 🔁 Workflow (Phase‑by‑Phase)

The project is divided into seven worktasks (phases). Each phase contains specific tasks, owners, and acceptance criteria.

| Phase | Owner(s) | Description |
|-------|----------|-------------|
| **1. Planning & Architecture** | UX Architect + Zuli | Define structure, schema, user flow, tech stack, and file/folder layout. |
| **2. Core Structure & Styling** | Frontend Developer + UI Designer | Build HTML skeleton, implement color palette, responsive navbar/sidebar, card components, typography, and mobile‑first layout. |
| **3. Stok Obat Management** | Frontend Developer | Implement CRUD for medicine stock, search/filter, form modals, warnings (low stock/expiry), and pagination. |
| **4. Input Resep Dokter** | Frontend Developer | Build prescription form, auto‑complete drug search, multi‑item entry, edit/delete, status tracking, and stock deduction on process. |
| **5. Dashboard & UI Enhancement** | UI Designer + Frontend Dev | Create dashboard widgets (total stock, low stock, expiring soon, prescriptions today), recent activity log, quick actions, notifications (toast), loading states, and micro‑interactions. |
| **6. Additional Features** | Content Creator + SEO + Frontend Dev | Add LocalStorage persistence, CSV export/import, print‑friendly stylesheet, dark‑mode toggle (optional), PWA manifest, semantic HTML/ARIA, meta tags, and SEO optimization. |
| **7. Testing & Finalization** | Zuli | Test all CRUD operations, search/filter, prescription flow, responsiveness, color contrast, final polish, and deploy as a standalone HTML file. |

### Detailed Task List

#### Worktask 1: Planning & Architecture
- [ ] 1.1 Define page structure (Home, Stok Obat, Resep, Dashboard)
- [ ] 1.2 Plan database schema (obat: nama, kategori, stok, harga, expired; resep: dokter, pasien, obat, tanggal)
- [ ] 1.3 Plan user flow: Apoteker → Input stok / Kelola resep / Cari obat
- [ ] 1.4 Define tech stack: HTML5 + Tailwind CSS + Vanilla JS (or React if complexity grows)
- [ ] 1.5 Create file/folder structure

#### Worktask 2: Core Structure & Styling
- [ ] 2.1 Create HTML skeleton with semantic elements
- [ ] 2.2 Implement color palette (Dusk Blue header/nav, Platinum bg, Steel Blue accent)
- [ ] 2.3 Build responsive navbar with navigation
- [ ] 2.4 Create sidebar layout for dashboard
- [ ] 2.5 Build card components with hover effects
- [ ] 2.6 Add typography (clean sans‑serif, hierarchy with color)
- [ ] 2.7 Ensure responsive design (mobile‑first)

#### Worktask 3: Stok Obat Management
- [ ] 3.1 Build medicine stock table with sort & pagination
- [ ] 3.2 Implement search bar (real‑time filter by name/category)
- [ ] 3.3 Add medicine form (add new): name, category, stock, price, expiry date
- [ ] 3.4 Edit medicine (inline edit or modal)
- [ ] 3.5 Delete medicine (confirmation before delete)
- [ ] 3.6 Category filter dropdown
- [ ] 3.7 Low stock warning indicator (<10 stock = red badge)
- [ ] 3.8 Expiry date warning (<30 days = yellow badge)

#### Worktask 4: Input Resep Dokter
- [ ] 4.1 Build prescription input form: doctor name, patient name, date, medicine list
- [ ] 4.2 Auto‑complete medicine from stock database (search existing drugs)
- [ ] 4.3 Multi‑medicine input (add one medicine at a time to prescription)
- [ ] 4.4 Prescription list/table with status (new, processed, completed)
- [ ] 4.5 Edit prescription (change dosage, add/remove medicines)
- [ ] 4.6 Prescription detail view
- [ ] 4.7 Auto‑reduce stock when prescription status changes to "processed"
- [ ] 4.8 Print prescription (optional)

#### Worktask 5: Dashboard & UI Enhancement
- [ ] 5.1 Dashboard overview: total medicines, low stock count, expiring soon count, prescriptions today
- [ ] 5.2 Stat cards with icons and subtle animations
- [ ] 5.3 Recent activity log (last 5 actions: add/edit/delete medicine, input prescription)
- [ ] 5.4 Quick actions panel (shortcut to Add Medicine, Input Prescription, Search)
- [ ] 5.5 Notification system (toast for success/error/warning)
- [ ] 5.6 Loading states & skeleton screens
- [ ] 5.7 Smooth transitions & micro‑interactions

#### Worktask 6: Additional Features
- [ ] 6.1 LocalStorage/IndexedDB for persistence (no backend needed)
- [ ] 6.2 Export data to CSV
- [ ] 6.3 Import data from CSV
- [ ] 6.4 Print‑friendly stylesheet
- [ ] 6.5 Dark‑mode toggle (optional)
- [ ] 6.6 PWA manifest (installable as app)
- [ ] 6.7 Semantic HTML + ARIA labels for accessibility
- [ ] 6.8 Meta tags & SEO optimization

#### Worktask 7: Testing & Finalization
- [ ] 7.1 Test all CRUD operations for medicine stock
- [ ] 7.2 Test search and filter functionality
- [ ] 7.3 Test prescription input, edit, and status transitions
- [ ] 7.4 Test responsiveness on mobile, tablet, desktop
- [ ] 7.5 Verify color contrast (readability)
- [ ] 7.6 Final review and polish
- [ ] 7.7 Deploy as a single HTML file in the project workspace

---

## 📅 Planning (Timeline & Milestones)

The project follows a **3‑sprint** schedule as outlined in the PRD. Each sprint is 2‑3 days, with specific deliverables.

### Sprint Breakdown

| Sprint | Duration | Target Features | Deliverable |
|--------|----------|-----------------|-------------|
| **Sprint 1** | Day 1‑2 | • Core structure & styling<br>• Stok Obat CRUD<br>• Search & Filter<br>• Input Resep Dokter (basic form) | **Working prototype** – users can add/view/search medicines and input a simple prescription. |
| **Sprint 2** | Day 3‑4 | • Dashboard overview<br>• Low stock & expiry warnings<br>• CSV export/import<br>• Toast notifications<br>• Prescription list & editing | **Feature complete** – all P0 and P1 features implemented; ready for internal testing. |
| **Sprint 3** | Day 5 | • Responsiveness polish<br>• Print‑friendly styles<br>• Dark‑mode toggle (optional)<br>• Final testing & bug fixing | **Production ready** – tested, polished, and deployable as a standalone HTML file. |

### Milestones

| ID | Milestone | Target | Success Criteria |
|----|-----------|--------|-------------------|
| **M1** | Prototype Working | End of Sprint 1 | CRUD + Search + Prescription input functional; data persisted in LocalStorage. |
| **M2** | Feature Complete | End of Sprint 2 | All P0 & P1 features (dashboard, warnings, CSV, notifications) implemented and pass basic tests. |
| **M3** | Production Ready | End of Sprint 3 | All tasks completed, responsiveness verified, no critical bugs, final HTML file ready for deployment. |

---

## 👥 Resource Allocation

| Role | Name / Agent | Responsibilities |
|------|--------------|-------------------|
| **Project Lead** | Zuli | Overall coordination, requirement clarification, quality checks, sprint planning, stakeholder communication, final review & deployment. |
| **UX Architect** | (Agency‑Agents) | Define page structure, user flow, information architecture, navigation plan. |
| **UI Designer** | (Agency‑Agents) | Visual design, color palette implementation, typography, layout, component styling, responsive breakpoints. |
| **Frontend Developer** | (Agency‑Agents / Kilo Code) | HTML/CSS/JS implementation, component logic, state management, API‑like LocalStorage integration, performance optimization. |
| **Content Creator** | (Agency‑Agents) | Copywriting for labels, placeholders, help text, documentation, SEO meta tags. |
| **SEO Specialist** | (Agency‑Agents) | Ensure semantic HTML, ARIA labels, meta tags, accessibility (a11y) compliance. |

*Note: In this solo‑agent setup, Kilo Code will fulfill the Frontend Developer, Content Creator, and SEO Specialist roles under the guidance of Zuli.*

---

## 🔗 Dependencies & Assumptions

- **Tech Stack**: HTML5, Tailwind CSS (via CDN), Vanilla JavaScript, Chart.js (for dashboard graphs, if added later), LocalStorage API.
- **Browser Support**: Chrome, Firefox, Safari (desktop & mobile); assumes modern browser support for ES6+ features.
- **Data Persistence**: Initial version uses LocalStorage; designed for easy migration to a backend (REST/Firebase) in v2.0.
- **No External Backend**: v1.0 is fully client‑serverless; server‑only features (authentication, multi‑user, drug interaction) are out of scope.
- **Single User**: The app assumes a single pharmacy user (apotek) per browser instance; no login required.

---

## ⚠️ Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Scope creep from additional feature requests | Medium | Medium | Adhere strictly to P0/P1/P2 prioritization; log new ideas for v2.0. |
| Performance issues with large medicine lists (>1000 items) | High | Low | Implement efficient search (debounce), virtual scrolling if needed, and pagination. |
| Browser compatibility issues (especially Safari) | Medium | Low | Test on major browsers during each sprint; use feature detection and polyfills where needed. |
| Data loss due to LocalStorage clearing | Medium | Low | Educate users not to clear site data; provide CSV backup/restore as safety net. |
| Delay in sprint delivery due to unforeseen complexity | Medium | Medium | Daily stand‑up check‑ins; adjust task breakdown; leverage reusable components. |

---

## ✅ Definition of Done (DoD)

A task is considered **Done** when:
1. Code is written, reviewed, and follows the project’s coding standards.
2. Feature is implemented according to acceptance criteria in the PRD.
3. Unit/manual testing passes (no critical bugs).
4. Responsiveness verified on at least three screen sizes (mobile, tablet, desktop).
5. Accessibility checked (color contrast, ARIA labels, keyboard navigation).
6. Documentation updated (if applicable).
7. Task moved to “Done” column on the workflow board.

---

## 📎 Appendices

### A. Color Palette Reference
See `apotik-vi-website.md` for exact HEX values and usage rules.

### B. File Structure (Planned)
```
apotik-vi/
├── index.html              # SPA entry point
├── css/
│   └── custom.css          # Custom styles + CSS variables for tokens
├── js/
│   ├── app.js              # Router, state init, global utils
│   ├── storage.js          # LocalStorage wrapper (CRUD helpers)
│   ├── stok.js             # Medicine stock module
│   ├── resep.js            # Prescription module
│   ├── dashboard.js        # Dashboard widgets & updates
│   └── utils.js            # Format, validation, toast helpers
└── assets/
    └── icons.svg           # SVG sprite for icons
```

### C. Useful Links (from PRD)
- Tailwind CSS: https://tailwindcss.com
- Coolors (palette generation): https://coolors.co
- Agency‑Agents reference: https://github.com/msitarzewski/agency-agents

---

*This is a living document. Updates will be made as the project evolves and feedback is received from stakeholders.*

--- 
*Prepared with ❤️ by Zuli & Kilo Code.*