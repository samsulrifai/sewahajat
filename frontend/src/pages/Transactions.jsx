import { Search, Calendar, User, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const Transactions = () => {
  const dummyTx = [
    { id: 'TRX-001', customer: 'Budi Santoso', dateBorrow: '16 Mei 2026', dateReturn: '18 Mei 2026', total: 500000, status: 'disewa' },
    { id: 'TRX-002', customer: 'Siti Aminah', dateBorrow: '15 Mei 2026', dateReturn: '17 Mei 2026', total: 1500000, status: 'dikembalikan' },
    { id: 'TRX-003', customer: 'PT. Maju Jaya', dateBorrow: '18 Mei 2026', dateReturn: '20 Mei 2026', total: 3000000, status: 'pending' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Transaksi</h1>
          <p className="text-slate-500 mt-1">Catat transaksi peminjaman dan pengembalian barang.</p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
            <ArrowDownLeft size={20} />
            Pengembalian
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <ArrowUpRight size={20} />
            Penyewaan Baru
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Cari ID transaksi atau nama..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100">
            <Calendar size={18} />
            <span>Semua Tanggal</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="py-4 px-6 font-medium">ID Transaksi</th>
                <th className="py-4 px-6 font-medium">Customer</th>
                <th className="py-4 px-6 font-medium">Tgl Pinjam</th>
                <th className="py-4 px-6 font-medium">Tgl Kembali</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium">Total Harga</th>
                <th className="py-4 px-6 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dummyTx.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-blue-600">{tx.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-slate-400" />
                      <span className="font-medium text-slate-700">{tx.customer}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{tx.dateBorrow}</td>
                  <td className="py-4 px-6 text-slate-600">{tx.dateReturn}</td>
                  <td className="py-4 px-6">
                    {tx.status === 'disewa' && <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Sedang Disewa</span>}
                    {tx.status === 'dikembalikan' && <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">Dikembalikan</span>}
                    {tx.status === 'pending' && <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">Menunggu</span>}
                  </td>
                  <td className="py-4 px-6 text-slate-700 font-medium">Rp {tx.total.toLocaleString('id-ID')}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-medium hover:underline">Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
