/**
 * Apotik VI - Main Application JavaScript
 * Pharmacy Management System - LocalStorage Based
 */

// ==================== STATE MANAGEMENT ====================
const AppState = {
    obat: [],
    resep: [],
    activities: [],
    currentPage: 'dashboard',
    currentResepFilter: 'semua'
};

// ==================== STORAGE HELPERS ====================
const Storage = {
    KEY_OBAT: 'apotikvi_obat',
    KEY_RESEP: 'apotikvi_resep',
    KEY_ACTIVITIES: 'apotikvi_activities',
    
    getObat() {
        return JSON.parse(localStorage.getItem(this.KEY_OBAT) || '[]');
    },
    
    setObat(obat) {
        localStorage.setItem(this.KEY_OBAT, JSON.stringify(obat));
    },
    
    getResep() {
        return JSON.parse(localStorage.getItem(this.KEY_RESEP) || '[]');
    },
    
    setResep(resep) {
        localStorage.setItem(this.KEY_RESEP, JSON.stringify(resep));
    },
    
    getActivities() {
        return JSON.parse(localStorage.getItem(this.KEY_ACTIVITIES) || '[]');
    },
    
    addActivity(activity) {
        const activities = this.getActivities();
        activities.unshift({
            ...activity,
            id: Date.now(),
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(this.KEY_ACTIVITIES, JSON.stringify(activities.slice(0, 50)));
    }
};

// ==================== UTILITY FUNCTIONS ====================
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

function getDaysUntilExpired(expiredDate) {
    const today = new Date();
    const expired = new Date(expiredDate);
    return Math.ceil((expired - today) / (1000 * 60 * 60 * 24));
}

function isLowStock(stok) { return parseInt(stok) < 10; }
function isExpiringSoon(expiredDate) { return getDaysUntilExpired(expiredDate) <= 30 && getDaysUntilExpired(expiredDate) > 0; }
function isExpired(expiredDate) { return getDaysUntilExpired(expiredDate) <= 0; }

// ==================== TOAST NOTIFICATIONS ====================
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span class="text-sm font-medium">${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.animation = 'slideIn 0.3s ease reverse'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ==================== MODAL HANDLERS ====================
function showModal(type, data = null) {
    const modal = document.getElementById(`modal-${type}`);
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    if (type === 'obat' && data) {
        document.getElementById('modal-obat-title').textContent = 'Edit Obat';
        document.getElementById('obat-id').value = data.id;
        document.getElementById('obat-nama').value = data.nama;
        document.getElementById('obat-kategori').value = data.kategori;
        document.getElementById('obat-stok').value = data.stok;
        document.getElementById('obat-harga').value = data.harga;
        document.getElementById('obat-satuan').value = data.satuan;
        document.getElementById('obat-expired').value = data.tanggal_expired;
        document.getElementById('obat-catatan').value = data.catatan || '';
    } else if (type === 'obat') {
        document.getElementById('modal-obat-title').textContent = 'Tambah Obat Baru';
        document.getElementById('form-obat').reset();
        document.getElementById('obat-id').value = '';
    } else if (type === 'resep' && data) {
        document.getElementById('resep-id').value = data.id;
        document.getElementById('resep-dokter').value = data.nama_dokter;
        document.getElementById('resep-pasien').value = data.nama_pasien;
        document.getElementById('resep-tanggal').value = data.tanggal;
        document.getElementById('resep-catatan').value = data.catatan || '';
        renderResepObatList(data.items || []);
    } else if (type === 'resep') {
        document.getElementById('form-resep').reset();
        document.getElementById('resep-id').value = '';
        document.getElementById('resep-tanggal').value = new Date().toISOString().split('T')[0];
        renderResepObatList([{ id: generateId(), obat_id: '', nama_obat: '', dosis: '', jumlah: 1 }]);
    }
}

function closeModal(type) {
    const modal = document.getElementById(`modal-${type}`);
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function showConfirm(message, onConfirm) {
    const modal = document.getElementById('modal-confirm');
    document.getElementById('confirm-message').textContent = message;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.getElementById('confirm-yes').onclick = () => { onConfirm(); closeModal('confirm'); };
}

// ==================== NAVIGATION ====================
function navigateTo(page) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === page) item.classList.add('active');
    });
    
    const titles = { dashboard: 'Dashboard', stok: 'Stok Obat', resep: 'Resep Dokter', laporan: 'Laporan' };
    document.getElementById('page-title').textContent = titles[page] || 'Dashboard';
    
    document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden'));
    document.getElementById(`page-${page}`).classList.remove('hidden');
    
    AppState.currentPage = page;
    if (page === 'dashboard') renderDashboard();
    else if (page === 'stok') renderStokTable();
    else if (page === 'resep') renderResepList();
    else if (page === 'laporan') renderLaporan();
    
    document.getElementById('sidebar').classList.remove('sidebar-open');
}

// ==================== OBAT CRUD ====================
function handleObatSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('obat-id').value;
    const obatData = {
        id: id || generateId(),
        nama: document.getElementById('obat-nama').value,
        kategori: document.getElementById('obat-kategori').value,
        stok: parseInt(document.getElementById('obat-stok').value),
        harga: parseInt(document.getElementById('obat-harga').value),
        satuan: document.getElementById('obat-satuan').value,
        tanggal_expired: document.getElementById('obat-expired').value,
        catatan: document.getElementById('obat-catatan').value,
        tanggal_input: id ? Storage.getObat().find(o => o.id === id)?.tanggal_input : new Date().toISOString().split('T')[0]
    };
    
    let obat = Storage.getObat();
    if (id) {
        const index = obat.findIndex(o => o.id === id);
        if (index !== -1) {
            obat[index] = obatData;
            Storage.addActivity({ type: 'edit_obat', description: `Mengedit obat: ${obatData.nama}` });
            showToast('Obat berhasil diperbarui', 'success');
        }
    } else {
        obat.push(obatData);
        Storage.addActivity({ type: 'add_obat', description: `Menambahkan obat: ${obatData.nama}` });
        showToast('Obat berhasil ditambahkan', 'success');
    }
    
    Storage.setObat(obat);
    closeModal('obat');
    renderStokTable();
    renderDashboard();
}

function editObat(id) {
    const obat = Storage.getObat().find(o => o.id === id);
    if (obat) showModal('obat', obat);
}

function deleteObat(id) {
    const obat = Storage.getObat().find(o => o.id === id);
    if (!obat) return;
    showConfirm(`Hapus "${obat.nama}"?`, () => {
        let obatList = Storage.getObat().filter(o => o.id !== id);
        Storage.setObat(obatList);
        Storage.addActivity({ type: 'delete_obat', description: `Menghapus obat: ${obat.nama}` });
        showToast('Obat dihapus', 'success');
        renderStokTable();
        renderDashboard();
    });
}

// ==================== RESEP CRUD ====================
function addResepObat() {
    const list = document.getElementById('resep-obat-list');
    const id = generateId();
    const obat = Storage.getObat();
    const options = obat.map(o => `<option value="${o.id}">${o.nama}</option>`).join('');
    
    const div = document.createElement('div');
    div.className = 'flex gap-2 items-start p-3 bg-platinum rounded-lg';
    div.dataset.id = id;
    div.innerHTML = `
        <select class="resep-obat-select flex-1 px-3 py-2 border border-grey-olive/30 rounded-lg text-sm">
            <option value="">Pilih Obat</option>${options}
        </select>
        <input type="text" placeholder="Dosis" class="resep-obat-dosis w-24 px-3 py-2 border border-grey-olive/30 rounded-lg text-sm">
        <input type="number" min="1" value="1" class="resep-obat-jumlah w-16 px-3 py-2 border border-grey-olive/30 rounded-lg text-sm">
        <button type="button" onclick="this.parentElement.remove()" class="p-2 text-red-500 hover:bg-red-100 rounded-lg">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
    `;
    list.appendChild(div);
}

function renderResepObatList(items) {
    const list = document.getElementById('resep-obat-list');
    list.innerHTML = '';
    const obat = Storage.getObat();
    
    if (items.length === 0) { addResepObat(); return; }
    
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'flex gap-2 items-start p-3 bg-platinum rounded-lg';
        div.dataset.id = item.id || generateId();
        
        const options = obat.map(o => `<option value="${o.id}" ${o.id === item.obat_id ? 'selected' : ''}>${o.nama}</option>`).join('');
        
        div.innerHTML = `
            <select class="resep-obat-select flex-1 px-3 py-2 border border-grey-olive/30 rounded-lg text-sm">
                <option value="">Pilih Obat</option>${options}
            </select>
            <input type="text" value="${item.dosis || ''}" class="resep-obat-dosis w-24 px-3 py-2 border border-grey-olive/30 rounded-lg text-sm" placeholder="3x1">
            <input type="number" min="1" value="${item.jumlah || 1}" class="resep-obat-jumlah w-16 px-3 py-2 border border-grey-olive/30 rounded-lg text-sm">
            <button type="button" onclick="this.parentElement.remove()" class="p-2 text-red-500 hover:bg-red-100 rounded-lg">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        `;
        list.appendChild(div);
    });
}

function handleResepSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('resep-id').value;
    
    const items = [];
    document.querySelectorAll('#resep-obat-list > div').forEach(div => {
        const obat_id = div.querySelector('.resep-obat-select').value;
        const nama_obat = div.querySelector('.resep-obat-select option:checked')?.text || '';
        const dosis = div.querySelector('.resep-obat-dosis').value;
        const jumlah = parseInt(div.querySelector('.resep-obat-jumlah').value) || 1;
        if (obat_id) items.push({ obat_id, nama_obat, dosis, jumlah });
    });
    
    if (items.length === 0) { showToast('Pilih minimal satu obat', 'warning'); return; }
    
    const resepData = {
        id: id || generateId(),
        nama_dokter: document.getElementById('resep-dokter').value,
        nama_pasien: document.getElementById('resep-pasien').value,
        tanggal: document.getElementById('resep-tanggal').value,
        items: items,
        status: id ? Storage.getResep().find(r => r.id === id)?.status : 'baru',
        catatan: document.getElementById('resep-catatan').value,
        created_at: id ? Storage.getResep().find(r => r.id === id)?.created_at : new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
    
    let resep = Storage.getResep();
    if (id) {
        const index = resep.findIndex(r => r.id === id);
        if (index !== -1) {
            resep[index] = resepData;
            Storage.addActivity({ type: 'edit_resep', description: `Mengedit resep: ${resepData.nama_pasien}` });
            showToast('Resep diperbarui', 'success');
        }
    } else {
        resep.push(resepData);
        Storage.addActivity({ type: 'add_resep', description: `Input resep baru untuk: ${resepData.nama_pasien}` });
        showToast('Resep ditambahkan', 'success');
    }
    
    Storage.setResep(resep);
    closeModal('resep');
    renderResepList();
    renderDashboard();
}

function updateResepStatus(id, status) {
    let resep = Storage.getResep();
    const index = resep.findIndex(r => r.id === id);
    if (index === -1) return;
    
    const oldStatus = resep[index].status;
    resep[index].status = status;
    resep[index].updated_at = new Date().toISOString();
    
    if (status === 'diproses' && oldStatus !== 'diproses') {
        resep[index].items.forEach(item => {
            const obat = Storage.getObat().find(o => o.id === item.obat_id);
            if (obat) {
                obat.stok = Math.max(0, obat.stok - item.jumlah);
                Storage.setObat(Storage.getObat().map(o => o.id === obat.id ? obat : o));
            }
        });
        showToast('Stok dikurangi', 'info');
    }
    
    Storage.setResep(resep);
    Storage.addActivity({ type: 'update_resep', description: `Status resep: ${status}` });
    renderResepList();
    renderDashboard();
}

function editResep(id) {
    const resep = Storage.getResep().find(r => r.id === id);
    if (resep) showModal('resep', resep);
}

function deleteResep(id) {
    const resep = Storage.getResep().find(r => r.id === id);
    if (!resep) return;
    showConfirm(`Hapus resep "${resep.nama_pasien}"?`, () => {
        let resepList = Storage.getResep().filter(r => r.id !== id);
        Storage.setResep(resepList);
        showToast('Resep dihapus', 'success');
        renderResepList();
        renderDashboard();
    });
}

function filterResep(status) {
    AppState.currentResepFilter = status;
    document.querySelectorAll('.resep-filter-btn').forEach(btn => {
        btn.classList.remove('bg-platinum', 'text-dusk-blue');
        btn.classList.add('text-grey-olive');
        if (btn.dataset.filter === status) { btn.classList.add('bg-platinum', 'text-dusk-blue'); btn.classList.remove('text-grey-olive'); }
    });
    renderResepList();
}

// ==================== RENDER FUNCTIONS ====================
function renderDashboard() {
    const obat = Storage.getObat();
    const resep = Storage.getResep();
    
    document.getElementById('stat-total-obat').textContent = obat.length;
    document.getElementById('stat-stok-rendah').textContent = obat.filter(o => isLowStock(o.stok)).length;
    document.getElementById('stat-akan-expired').textContent = obat.filter(o => isExpiringSoon(o.tanggal_expired)).length;
    
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('stat-resep-hari').textContent = resep.filter(r => r.tanggal === today).length;
    
    renderCategoryChart(obat);
    renderLowStockList(obat);
    renderExpiringList(obat);
    renderRecentActivity();
}

function renderCategoryChart(obat) {
    const categories = {};
    obat.forEach(o => { categories[o.kategori] = (categories[o.kategori] || 0) + 1; });
    
    const ctx = document.getElementById('category-chart');
    if (!ctx) return;
    if (window.categoryChartInstance) window.categoryChartInstance.destroy();
    
    window.categoryChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categories).length ? Object.keys(categories) : ['Tidak Ada Data'],
            datasets: [{ data: Object.values(categories).length ? Object.values(categories) : [1], backgroundColor: ['#274c77', '#6096ba', '#a3cef1', '#22c55e', '#f59e0b', '#8b8c89'], borderWidth: 0 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }
    });
}

function renderLowStockList(obat) {
    const container = document.getElementById('low-stock-list');
    const lowStock = obat.filter(o => isLowStock(o.stok));
    if (lowStock.length === 0) { container.innerHTML = '<p class="text-sm text-grey-olive text-center py-4">Tidak ada stok rendah</p>'; return; }
    container.innerHTML = lowStock.slice(0, 5).map(o => `<div class="flex justify-between items-center p-2 bg-red-50 rounded-lg"><div><p class="font-medium text-sm text-dusk-blue">${o.nama}</p><p class="text-xs text-grey-olive">${o.kategori}</p></div><span class="badge badge-low-stock">${o.stok} ${o.satuan}</span></div>`).join('');
}

function renderExpiringList(obat) {
    const container = document.getElementById('expiring-list');
    const expiring = obat.filter(o => isExpiringSoon(o.tanggal_expired));
    if (expiring.length === 0) { container.innerHTML = '<p class="text-sm text-grey-olive text-center py-4">Tidak ada akan expired</p>'; return; }
    container.innerHTML = expiring.slice(0, 5).map(o => `<div class="flex justify-between items-center p-2 bg-amber-50 rounded-lg"><div><p class="font-medium text-sm text-dusk-blue">${o.nama}</p><p class="text-xs text-grey-olive">${formatDate(o.tanggal_expired)}</p></div><span class="badge badge-expiring">${getDaysUntilExpired(o.tanggal_expired)} hari</span></div>`).join('');
}

function renderRecentActivity() {
    const container = document.getElementById('recent-activity');
    const activities = Storage.getActivities().slice(0, 5);
    if (activities.length === 0) { container.innerHTML = '<p class="text-sm text-grey-olive text-center py-4">Belum ada aktivitas</p>'; return; }
    container.innerHTML = activities.map(a => `<div class="flex items-center gap-3 p-2"><div><p class="text-sm text-dusk-blue">${a.description}</p><p class="text-xs text-grey-olive">${formatDate(a.timestamp.split('T')[0])}</p></div></div>`).join('');
}

function renderStokTable() {
    const tbody = document.getElementById('stok-table-body');
    const search = document.getElementById('stok-search').value.toLowerCase();
    const kategori = document.getElementById('stok-kategori-filter').value;
    
    let obat = Storage.getObat().filter(o => o.nama.toLowerCase().includes(search) && (!kategori || o.kategori === kategori));
    
    if (obat.length === 0) { tbody.innerHTML = '<tr><td colspan="6" class="px-6 py-8 text-center text-grey-olive">Tidak ada data</td></tr>'; return; }
    
    tbody.innerHTML = obat.map(o => {
        let badge = '';
        if (isExpired(o.tanggal_expired)) badge = '<span class="badge badge-danger">Expired</span>';
        else if (isExpiringSoon(o.tanggal_expired)) badge = `<span class="badge badge-expiring">${getDaysUntilExpired(o.tanggal_expired)} hari</span>`;
        else if (isLowStock(o.stok)) badge = '<span class="badge badge-low-stock">Rendah</span>';
        else badge = '<span class="badge badge-normal">Normal</span>';
        
        return `<tr class="hover:bg-platinum/50"><td class="px-6 py-4"><div><p class="font-medium text-dusk-blue">${o.nama}</p>${o.catatan ? `<p class="text-xs text-grey-olive">${o.catatan}</p>` : ''}</div></td><td class="px-6 py-4"><span class="badge badge-normal">${o.kategori}</span></td><td class="px-6 py-4"><span class="font-medium ${isLowStock(o.stok) ? 'text-red-500' : 'text-dusk-blue'}">${o.stok}</span> <span class="text-grey-olive">${o.satuan}</span></td><td class="px-6 py-4 text-dusk-blue">${formatCurrency(o.harga)}</td><td class="px-6 py-4">${badge}</td><td class="px-6 py-4"><div class="flex gap-2"><button onclick="editObat('${o.id}')" class="p-2 text-steel-blue hover:bg-steel-blue/10 rounded-lg"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button><button onclick="deleteObat('${o.id}')" class="p-2 text-red-500 hover:bg-red-100 rounded-lg"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></td></tr>`;
    }).join('');
}

function renderResepList() {
    const container = document.getElementById('resep-list');
    let resep = Storage.getResep();
    const filter = AppState.currentResepFilter;
    if (filter !== 'semua') resep = resep.filter(r => r.status === filter);
    resep.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    
    if (resep.length === 0) { container.innerHTML = '<p class="text-center text-grey-olive py-8">Tidak ada resep</p>'; return; }
    
    const statusColors = { 'baru': 'bg-blue-100 text-blue-700', 'diproses': 'bg-amber-100 text-amber-700', 'selesai': 'bg-green-100 text-green-700' };
    
    container.innerHTML = resep.map(r => `<div class="border border-grey-olive/20 rounded-xl p-4"><div class="flex justify-between items-start mb-3"><div><h4 class="font-semibold text-dusk-blue">${r.nama_pasien}</h4><p class="text-sm text-grey-olive">Dr. ${r.nama_dokter} • ${formatDate(r.tanggal)}</p></div><span class="px-3 py-1 rounded-full text-sm font-medium ${statusColors[r.status]}">${r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span></div><div class="mb-3"><p class="text-sm text-grey-olive mb-1">Obat:</p><div class="flex flex-wrap gap-2">${r.items.map(item => `<span class="px-2 py-1 bg-platinum rounded text-sm">${item.nama_obat} (${item.dosis})</span>`).join('')}</div></div><div class="flex gap-2">${r.status === 'baru' ? `<button onclick="updateResepStatus('${r.id}', 'diproses')" class="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600">Proses</button>` : ''}${r.status === 'diproses' ? `<button onclick="updateResepStatus('${r.id}', 'selesai')" class="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600">Selesai</button>` : ''}<button onclick="editResep('${r.id}')" class="px-3 py-1 bg-steel-blue text-white rounded-lg text-sm hover:bg-dusk-blue">Edit</button><button onclick="deleteResep('${r.id}')" class="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600">Hapus</button></div></div>`).join('');
}

function renderLaporan() {
    const obat = Storage.getObat();
    const resep = Storage.getResep();
    
    document.getElementById('laporan-total-obat').textContent = obat.length;
    document.getElementById('laporan-total-resep').textContent = resep.length;
    
    const totalNilai = obat.reduce((sum, o) => sum + (o.stok * o.harga), 0);
    document.getElementById('laporan-nilai-stok').textContent = formatCurrency(totalNilai);
}

// ==================== DATA EXPORT/IMPORT ====================
function exportData(type = 'all') {
    if (type === 'obat' || type === 'all') {
        const obat = Storage.getObat();
        const csv = 'Nama,Kategori,Stok,Harga,Satuan,Tanggal Expired,Tanggal Input,Catatan\n' + 
            obat.map(o => `"${o.nama}","${o.kategori}",${o.stok},${o.harga},"${o.satuan}","${o.tanggal_expired}","${o.tanggal_input}","${o.catatan || ''}"`).join('\n');
        downloadCSV(csv, 'apotikvi_obat.csv');
        showToast('Data obat diexport', 'success');
    }
    if (type === 'resep' || type === 'all') {
        const resep = Storage.getResep();
        const csv = 'Dokter,Pasien,Tanggal,Status,Obat,Dosis,Jumlah\n' +
            resep.flatMap(r => r.items.map(item => `"${r.nama_dokter}","${r.nama_pasien}","${r.tanggal}","${r.status}","${item.nama_obat}","${item.dosis}",${item.jumlah}`)).join('\n');
        downloadCSV(csv, 'apotikvi_resep.csv');
        showToast('Data resep diexport', 'success');
    }
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

function importData(input) {
    const file = input.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        const lines = text.split('\n').slice(1);
        
        lines.forEach(line => {
            if (!line.trim()) return;
            const [nama, kategori, stok, harga, satuan, tanggal_expired, tanggal_input, catatan] = line.split(',').map(s => s.replace(/"/g, ''));
            if (nama && kategori) {
                const obat = Storage.getObat();
                obat.push({ id: generateId(), nama, kategori, stok: parseInt(stok) || 0, harga: parseInt(harga) || 0, satuan: satuan || 'Tablet', tanggal_expired, tanggal_input: tanggal_input || new Date().toISOString().split('T')[0], catatan: catatan || '' });
                Storage.setObat(obat);
            }
        });
        
        showToast('Data berhasil diimport', 'success');
        renderDashboard();
        renderStokTable();
    };
    reader.readAsText(file);
    input.value = '';
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    // Loading animation
    const loadingBar = document.getElementById('loading-bar');
    let width = 0;
    const interval = setInterval(() => {
        width += Math.random() * 20;
        if (width >= 100) { width = 100; clearInterval(interval); setTimeout(() => document.getElementById('loading-screen').style.opacity = '0', 300); }
        loadingBar.style.width = width + '%';
    }, 200);
    
    // Navigation clicks
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => { e.preventDefault(); navigateTo(item.dataset.page); });
    });
    
    // Mobile menu toggle
    document.getElementById('menu-toggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('sidebar-open');
    });
    
    // Form submissions
    document.getElementById('form-obat').addEventListener('submit', handleObatSubmit);
    document.getElementById('form-resep').addEventListener('submit', handleResepSubmit);
    
    // Search & filter
    document.getElementById('stok-search').addEventListener('input', renderStokTable);
    document.getElementById('stok-kategori-filter').addEventListener('change', renderStokTable);
    
    // Close modals on backdrop click
    document.querySelectorAll('[id^="modal-"]').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal.id.replace('modal-', ''));
        });
    });
    
    // Initial render
    renderDashboard();
});
