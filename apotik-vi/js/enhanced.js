/**
 * Apotik VI - Enhanced Features
 * Additional functions for dark mode, print, sample data
 */

// ==================== DARK MODE ====================
function toggleDarkMode() {
    const body = document.body;
    const isDark = body.classList.contains('dark-mode');
    
    if (isDark) {
        body.classList.remove('dark-mode');
        localStorage.setItem('apotikvi_darkmode', 'false');
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('apotikvi_darkmode', 'true');
    }
}

function initDarkMode() {
    const darkMode = localStorage.getItem('apotikvi_darkmode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
}

// ==================== PRINT FUNCTIONS ====================
function printPage() {
    // Add print header
    const header = document.createElement('div');
    header.className = 'print-header';
    header.innerHTML = `
        <h1>Apotik VI</h1>
        <p>Laporan Sistem Manajemen Apotik</p>
    `;
    
    // Add print footer
    const footer = document.createElement('div');
    footer.className = 'print-footer';
    footer.innerHTML = `<span class="print-date">Dicetak: ${new Date().toLocaleDateString('id-ID')}</span>`;
    
    // Insert into main content
    const mainContent = document.getElementById('main-content');
    mainContent.insertBefore(header, mainContent.firstChild);
    mainContent.appendChild(footer);
    
    // Trigger print
    window.print();
    
    // Clean up after print
    setTimeout(() => {
        header.remove();
        footer.remove();
    }, 1000);
}

function printObatList() {
    navigateTo('stok');
    setTimeout(() => {
        printPage();
    }, 500);
}

function printResepList() {
    navigateTo('resep');
    setTimeout(() => {
        printPage();
    }, 500);
}

function printDashboard() {
    navigateTo('dashboard');
    setTimeout(() => {
        printPage();
    }, 500);
}

// ==================== SAMPLE DATA ====================
function loadSampleData() {
    const sampleObat = [
        { nama: 'Paracetamol 500mg', kategori: 'Analgesik', stok: 150, harga: 5000, satuan: 'Tablet', tanggal_expired: '2027-06-15' },
        { nama: 'Amoxicillin 500mg', kategori: 'Antibiotik', stok: 75, harga: 8500, satuan: 'Kapsul', tanggal_expired: '2026-12-20' },
        { nama: 'Vitamin C 1000mg', kategori: 'Vitamin', stok: 200, harga: 12000, satuan: 'Tablet', tanggal_expired: '2027-03-10' },
        { nama: 'Omeprazole 20mg', kategori: 'Antasida', stok: 45, harga: 15000, satuan: 'Kapsul', tanggal_expired: '2027-01-25' },
        { nama: 'Ibuprofen 400mg', kategori: 'Analgesik', stok: 8, harga: 6000, satuan: 'Tablet', tanggal_expired: '2027-05-20' },
        { nama: 'Cetirizine 10mg', kategori: 'Vitamin', stok: 120, harga: 4500, satuan: 'Tablet', tanggal_expired: '2027-04-15' },
        { nama: 'Metformin 500mg', kategori: 'Lainnya', stok: 25, harga: 12000, satuan: 'Tablet', tanggal_expired: '2026-11-30' },
        { nama: 'Salbutamol Inhaler', kategori: 'Lainnya', stok: 15, harga: 35000, satuan: 'Botol', tanggal_expired: '2026-10-15' },
        { nama: 'Methylprednisolone 4mg', kategori: 'Lainnya', stok: 5, harga: 18000, satuan: 'Tablet', tanggal_expired: '2027-02-28' },
        { nama: 'Azithromycin 250mg', kategori: 'Antibiotik', stok: 60, harga: 18000, satuan: 'Kapsul', tanggal_expired: '2027-01-10' },
        { nama: 'Domperidone 10mg', kategori: 'Antasida', stok: 90, harga: 7500, satuan: 'Tablet', tanggal_expired: '2027-08-20' },
        { nama: 'Calcium Carbonate', kategori: 'Vitamin', stok: 180, harga: 8000, satuan: 'Tablet', tanggal_expired: '2027-06-30' },
        { nama: 'Loperamide 2mg', kategori: 'Lainnya', stok: 40, harga: 5000, satuan: 'Tablet', tanggal_expired: '2027-04-01' },
        { nama: 'Paracetamol Syrup', kategori: 'Analgesik', stok: 25, harga: 18000, satuan: 'Botol', tanggal_expired: '2026-09-15' },
        { nama: 'Amoxicillin Syrup', kategori: 'Antibiotik', stok: 3, harga: 22000, satuan: 'Botol', tanggal_expired: '2026-08-20' }
    ];
    
    const obat = sampleObat.map(o => ({
        ...o,
        id: generateId(),
        tanggal_input: new Date().toISOString().split('T')[0],
        catatan: o.stok < 10 ? 'Stok rendah - pesan ulang' : ''
    }));
    
    Storage.setObat(obat);
    
    // Sample resep
    const sampleResep = [
        {
            nama_dokter: 'Dr. Sari',
            nama_pasien: 'Budi Santoso',
            tanggal: new Date().toISOString().split('T')[0],
            items: [
                { obat_id: obat[0].id, nama_obat: 'Paracetamol 500mg', dosis: '3x1', jumlah: 10 },
                { obat_id: obat[2].id, nama_obat: 'Vitamin C 1000mg', dosis: '1x1', jumlah: 30 }
            ],
            status: 'selesai'
        },
        {
            nama_dokter: 'Dr. Budi',
            nama_pasien: 'Ani Wijaya',
            tanggal: new Date().toISOString().split('T')[0],
            items: [
                { obat_id: obat[1].id, nama_obat: 'Amoxicillin 500mg', dosis: '3x1', jumlah: 21 },
                { obat_id: obat[5].id, nama_obat: 'Cetirizine 10mg', dosis: '1x1', jumlah: 10 }
            ],
            status: 'diproses'
        }
    ];
    
    const resep = sampleResep.map(r => ({
        ...r,
        id: generateId(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }));
    
    Storage.setResep(resep);
    
    // Sample activities
    const activities = [
        { type: 'add_obat', description: 'Memuat data contoh' },
        { type: 'add_resep', description: 'Input resep untuk Budi Santoso' },
        { type: 'add_resep', description: 'Input resep untuk Ani Wijaya' }
    ];
    
    activities.forEach(a => Storage.addActivity(a));
    
    showToast('Data contoh berhasil dimuat!', 'success');
    renderDashboard();
    renderStokTable();
    renderResepList();
}

// ==================== CLEAR ALL DATA ====================
function clearAllData() {
    showConfirm('Hapus SEMUA data? Ini tidak bisa dibatalkan!', () => {
        localStorage.removeItem('apotikvi_obat');
        localStorage.removeItem('apotikvi_resep');
        localStorage.removeItem('apotikvi_activities');
        showToast('Semua data dihapus', 'success');
        renderDashboard();
        renderStokTable();
        renderResepList();
    });
}

// ==================== ENHANCED SEARCH ====================
function searchObat(query) {
    const obat = Storage.getObat();
    const lowerQuery = query.toLowerCase();
    
    return obat.filter(o => 
        o.nama.toLowerCase().includes(lowerQuery) ||
        o.kategori.toLowerCase().includes(lowerQuery)
    );
}

// ==================== NOTIFICATIONS ====================
function checkNotifications() {
    const obat = Storage.getObat();
    
    // Count alerts
    const lowStock = obat.filter(o => isLowStock(o.stok)).length;
    const expiringSoon = obat.filter(o => isExpiringSoon(o.tanggal_expired)).length;
    const expired = obat.filter(o => isExpired(o.tanggal_expired)).length;
    
    const totalAlerts = lowStock + expiringSoon + expired;
    
    // Update badge
    const badge = document.getElementById('notification-badge');
    if (totalAlerts > 0) {
        badge.textContent = totalAlerts > 9 ? '9+' : totalAlerts;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
    
    // Show notification if there are critical issues
    if (expired > 0) {
        showToast(`${expired} obat telah expired!`, 'error');
    } else if (lowStock > 3) {
        showToast(`${lowStock} obat dengan stok rendah!`, 'warning');
    }
}

// ==================== EXPORT ALL ====================
function exportAllData() {
    const obat = Storage.getObat();
    const resep = Storage.getResep();
    
    const timestamp = new Date().toISOString().split('T')[0];
    
    // Export obat
    const obatCsv = 'Nama,Kategori,Stok,Harga,Satuan,Tanggal Expired,Tanggal Input,Catatan\n' + 
        obat.map(o => `"${o.nama}","${o.kategori}",${o.stok},${o.harga},"${o.satuan}","${o.tanggal_expired}","${o.tanggal_input}","${o.catatan || ''}"`).join('\n');
    
    downloadCSV(obatCsv, `apotikvi_obat_${timestamp}.csv`);
    
    // Export resep
    const resepCsv = 'Dokter,Pasien,Tanggal,Status,Obat,Dosis,Jumlah\n' +
        resep.flatMap(r => r.items.map(item => `"${r.nama_dokter}","${r.nama_pasien}","${r.tanggal}","${r.status}","${item.nama_obat}","${item.dosis}",${item.jumlah}`)).join('\n');
    
    downloadCSV(resepCsv, `apotikvi_resep_${timestamp}.csv`);
    
    // Export activities
    const activities = Storage.getActivities();
    const activitiesCsv = 'Waktu,Tipe,Deskripsi\n' +
        activities.map(a => `"${a.timestamp}","${a.type}","${a.description}"`).join('\n');
    
    downloadCSV(activitiesCsv, `apotikvi_activities_${timestamp}.csv`);
    
    showToast('Semua data diexport!', 'success');
}

// ==================== STATS CALCULATIONS ====================
function getStats() {
    const obat = Storage.getObat();
    const resep = Storage.getResep();
    
    const totalObat = obat.length;
    const totalNilaiStok = obat.reduce((sum, o) => sum + (o.stok * o.harga), 0);
    const lowStock = obat.filter(o => isLowStock(o.stok)).length;
    const expiringSoon = obat.filter(o => isExpiringSoon(o.tanggal_expired)).length;
    const expired = obat.filter(o => isExpired(o.tanggal_expired)).length;
    
    const totalResep = resep.length;
    const resepSelesai = resep.filter(r => r.status === 'selesai').length;
    const resepDiproses = resep.filter(r => r.status === 'diproses').length;
    
    const today = new Date().toISOString().split('T')[0];
    const resepHariIni = resep.filter(r => r.tanggal === today).length;
    
    return {
        totalObat,
        totalNilaiStok,
        lowStock,
        expiringSoon,
        expired,
        totalResep,
        resepSelesai,
        resepDiproses,
        resepHariIni
    };
}

// ==================== ADDITIONAL UI HELPERS ====================
function showLoading(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.innerHTML = '<div class="animate-pulse flex space-x-4"><div class="flex-1 space-y-4 py-1"><div class="h-4 bg-gray-200 rounded w-3/4"></div></div></div>';
    }
}

function formatNumber(num) {
    return new Intl.NumberFormat('id-ID').format(num);
}

function getCategoryColor(kategori) {
    const colors = {
        'Analgesik': '#ef4444',
        'Antibiotik': '#3b82f6',
        'Vitamin': '#22c55e',
        'Antasida': '#f59e0b',
        'Lainnya': '#8b5cf6'
    };
    return colors[kategori] || '#6b7280';
}
