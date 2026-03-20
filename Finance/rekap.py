#!/usr/bin/env python3
"""
Finance Rekap - Hitung & Generate Obsidian dari data.csv
Usage:
    python3 rekap.py              # Generate semua (Dashboard + Daily)
    python3 rekap.py --summary    # Tampilkan ringkasan saja
    python3 rekap.py --month 2026-03  # Generate rekap bulanan
"""

import csv
import sys
from collections import defaultdict
from datetime import datetime

FINANCE_DIR = "/storage/emulated/0/Documents/Obsidian/Seno/Finance"
DATA_FILE = f"{FINANCE_DIR}/data.csv"
DAILY_DIR = f"{FINANCE_DIR}/Daily"
REKAP_DIR = f"{FINANCE_DIR}/Rekap"


def load_data():
    """Load transaksi dari CSV"""
    transactions = []
    try:
        with open(DATA_FILE, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                row['jumlah'] = int(row['jumlah'])
                transactions.append(row)
    except FileNotFoundError:
        pass
    return transactions


def format_rupiah(amount):
    """Format angka ke Rupiah"""
    if amount >= 1_000_000:
        return f"Rp {amount/1_000_000:.1f}jt"
    elif amount >= 1_000:
        return f"Rp {amount:,}".replace(",", ".")
    return f"Rp {amount}"


def generate_daily(transactions):
    """Generate file harian dari data"""
    import os
    os.makedirs(DAILY_DIR, exist_ok=True)
    
    # Group by date
    by_date = defaultdict(list)
    for t in transactions:
        by_date[t['date']].append(t)
    
    for date, items in sorted(by_date.items(), reverse=True):
        pemasukan = sum(i['jumlah'] for i in items if i['type'] == 'pemasukan')
        pengeluaran = sum(i['jumlah'] for i in items if i['type'] == 'pengeluaran')
        
        # Readable date
        dt = datetime.strptime(date, '%Y-%m-%d')
        hari = dt.strftime('%d %B %Y')
        
        content = f"# 📅 {hari}\n\n"
        
        # Pengeluaran section
        peng_items = [i for i in items if i['type'] == 'pengeluaran']
        if peng_items:
            content += "## 💸 Pengeluaran\n\n"
            for item in peng_items:
                emoji = get_emoji(item['kategori'])
                content += f"- {emoji} **{item['nama']}** - {format_rupiah(item['jumlah'])}"
                if item['catatan'] and item['catatan'] != '-':
                    content += f" _({item['catatan']})_"
                content += "\n"
            content += "\n"
        
        # Pemasukan section
        pem_items = [i for i in items if i['type'] == 'pemasukan']
        if pem_items:
            content += "## 💰 Pemasukan\n\n"
            for item in pem_items:
                emoji = get_emoji(item['kategori'])
                content += f"- {emoji} **{item['nama']}** - {format_rupiah(item['jumlah'])}"
                if item['catatan'] and item['catatan'] != '-':
                    content += f" _({item['catatan']})_"
                content += "\n"
            content += "\n"
        
        # Summary
        content += "---\n\n"
        content += f"| Jenis | Total |\n|-------|-------|\n"
        content += f"| 💰 Pemasukan | {format_rupiah(pemasukan)} |\n"
        content += f"| 💸 Pengeluaran | {format_rupiah(pengeluaran)} |\n"
        selisih = pemasukan - pengeluaran
        emoji_selisih = "📈" if selisih >= 0 else "📉"
        content += f"| {emoji_selisih} Selisih | {format_rupiah(abs(selisih))} |\n"
        
        filename = f"{DAILY_DIR}/{date}.md"
        with open(filename, 'w') as f:
            f.write(content)


def generate_dashboard(transactions):
    """Generate Dashboard.md"""
    total_pemasukan = sum(t['jumlah'] for t in transactions if t['type'] == 'pemasukan')
    total_pengeluaran = sum(t['jumlah'] for t in transactions if t['type'] == 'pengeluaran')
    selisih = total_pemasukan - total_pengeluaran
    
    # Group by kategori
    by_kategori = defaultdict(lambda: {'count': 0, 'total': 0})
    for t in transactions:
        if t['type'] == 'pengeluaran':
            by_kategori[t['kategori']]['count'] += 1
            by_kategori[t['kategori']]['total'] += t['jumlah']
    
    content = "# 💰 Dashboard Keuangan\n\n"
    content += f"> Update otomatis: {datetime.now().strftime('%d %b %Y, %H:%M')}\n\n"
    
    # Ringkasan
    content += "## 📊 Ringkasan\n\n"
    content += "| Jenis | Total |\n|-------|-------|\n"
    content += f"| 💰 Total Pemasukan | {format_rupiah(total_pemasukan)} |\n"
    content += f"| 💸 Total Pengeluaran | {format_rupiah(total_pengeluaran)} |\n"
    emoji_selisih = "📈" if selisih >= 0 else "📉"
    content += f"| {emoji_selisih} Selisih | {format_rupiah(abs(selisih))} |\n\n"
    
    # Pengeluaran per kategori
    content += "## 🏷️ Pengeluaran per Kategori\n\n"
    content += "| Kategori | Jumlah | Total |\n|----------|--------|-------|\n"
    for kategori, data in sorted(by_kategori.items(), key=lambda x: x[1]['total'], reverse=True):
        emoji = get_emoji(kategori)
        content += f"| {emoji} {kategori} | {data['count']}x | {format_rupiah(data['total'])} |\n"
    content += "\n"
    
    # Transaksi terbaru
    content += "## 📝 Transaksi Terbaru (10 terakhir)\n\n"
    content += "| Tanggal | Jenis | Kategori | Nama | Jumlah |\n|---------|-------|----------|------|--------|\n"
    for t in transactions[-10:][::-1]:
        emoji = get_emoji(t['kategori'])
        jenis = "💸" if t['type'] == 'pengeluaran' else "💰"
        content += f"| {t['date']} | {jenis} | {emoji} {t['kategori']} | {t['nama']} | {format_rupiah(t['jumlah'])} |\n"
    
    content += "\n---\n\n"
    content += "## 🔗 Link\n\n"
    content += "- 📄 [[Rekap/2026-03|Rekap Bulanan]]\n"
    content += "- 🏷️ [[_Kategori|Daftar Kategori]]\n\n"
    content += "> [!note] Input via Chat\n"
    content += "> Bilang ke Parker: *\"Makan 25rb\"* atau *\"Gaji 5jt\"* — Parker yang catat!\n"
    
    filename = f"{FINANCE_DIR}/Dashboard.md"
    with open(filename, 'w') as f:
        f.write(content)


def generate_rekap_bulanan(transactions, bulan):
    """Generate rekap bulanan YYYY-MM"""
    os.makedirs(REKAP_DIR, exist_ok=True)
    
    year, month = bulan.split('-')
    filtered = [t for t in transactions if t['date'].startswith(bulan)]
    
    total_pemasukan = sum(t['jumlah'] for t in filtered if t['type'] == 'pemasukan')
    total_pengeluaran = sum(t['jumlah'] for t in filtered if t['type'] == 'pengeluaran')
    
    bulan_nama = datetime.strptime(bulan, '%Y-%m').strftime('%B %Y')
    
    content = f"# 📊 Rekap {bulan_nama}\n\n"
    content += "## 💰 Pemasukan\n\n"
    content += f"**Total: {format_rupiah(total_pemasukan)}**\n\n"
    for t in filtered:
        if t['type'] == 'pemasukan':
            emoji = get_emoji(t['kategori'])
            content += f"- {emoji} {t['nama']} - {format_rupiah(t['jumlah'])}\n"
    
    content += f"\n## 💸 Pengeluaran\n\n"
    content += f"**Total: {format_rupiah(total_pengeluaran)}**\n\n"
    for t in filtered:
        if t['type'] == 'pengeluaran':
            emoji = get_emoji(t['kategori'])
            content += f"- {emoji} {t['nama']} - {format_rupiah(t['jumlah'])}\n"
    
    filename = f"{REKAP_DIR}/{bulan}.md"
    with open(filename, 'w') as f:
        f.write(content)


def print_summary(transactions):
    """Tampilkan ringkasan di terminal"""
    total_pemasukan = sum(t['jumlah'] for t in transactions if t['type'] == 'pemasukan')
    total_pengeluaran = sum(t['jumlah'] for t in transactions if t['type'] == 'pengeluaran')
    selisih = total_pemasukan - total_pengeluaran
    
    print(f"\n{'='*40}")
    print(f"📊 RINGKASAN KEUANGAN")
    print(f"{'='*40}")
    print(f"💰 Total Pemasukan:  {format_rupiah(total_pemasukan)}")
    print(f"💸 Total Pengeluaran: {format_rupiah(total_pengeluaran)}")
    print(f"{'📈' if selisih >= 0 else '📉'} Selisih:         {format_rupiah(abs(selisih))}")
    print(f"{'='*40}\n")


def get_emoji(kategori):
    """Get emoji untuk kategori"""
    emojis = {
        'food': '🍔', 'transport': '🚗', 'utilities': '🏠',
        'shopping': '🛒', 'entertainment': '🎮', 'health': '🏥',
        'subscription': '📱', 'education': '📚', 'fashion': '👕',
        'gift': '🎁', 'business': '💼', 'other': '📦',
        'salary': '💼', 'freelance': '📦', 'investment': '📈',
        'bonus': '🎁', 'refund': '🔄', 'other-income': '💵',
        'transfer-savings': '🏦', 'transfer-invest': '📤'
    }
    return emojis.get(kategori, '📌')


if __name__ == '__main__':
    import os
    
    transactions = load_data()
    
    if '--summary' in sys.argv:
        print_summary(transactions)
    elif '--month' in sys.argv:
        idx = sys.argv.index('--month') + 1
        bulan = sys.argv[idx] if idx < len(sys.argv) else '2026-03'
        generate_rekap_bulanan(transactions, bulan)
        print(f"✅ Rekap {bulan} generated!")
    else:
        generate_daily(transactions)
        generate_dashboard(transactions)
        print_summary(transactions)
        print("✅ Dashboard & Daily files generated!")
