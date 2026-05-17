import { useState } from 'react';
import { Search, Calendar, User, ArrowUpRight, ArrowDownLeft, X, Package } from 'lucide-react';

const Transactions = () => {
  const [selectedTx, setSelectedTx] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const dummyTx = [
    { 
      id: 'TRX-001', 
      customer: 'Budi Santoso', 
      dateBorrow: '2026-05-16', 
      dateReturn: '2026-05-18', 
      total: 500000, 
      paidAmount: 500000,
      status: 'disewa',
      paymentStatus: 'lunas',
      items: [
        { name: 'Tenda 4x4', qty: 1, price: 150000 },
        { name: 'Kursi Lipat', qty: 20, price: 5000 },
        { name: 'Meja Kotak', qty: 2, price: 20000 },
        { name: 'Pemasangan', qty: 1, price: 210000 }
      ]
    },
    { 
      id: 'TRX-002', 
      customer: 'Siti Aminah', 
      dateBorrow: '2026-05-15', 
      dateReturn: '2026-05-17', 
      total: 1500000, 
      paidAmount: 500000,
      status: 'dikembalikan',
      paymentStatus: 'dp',
      items: [
        { name: 'Paket Hajatan Standar', qty: 1, price: 1500000 }
      ]
    },
    { 
      id: 'TRX-003', 
      customer: 'PT. Maju Jaya', 
      dateBorrow: '2026-05-18', 
      dateReturn: '2026-05-20', 
      total: 3000000, 
      paidAmount: 0,
      status: 'pending',
      paymentStatus: 'belum_bayar',
      items: [
        { name: 'Paket VIP', qty: 1, price: 3000000 }
      ]
    },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getStatusBadge = (status) => {
    if (status === 'disewa') return <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800">Disewa</span>;
    if (status === 'dikembalikan') return <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">Selesai</span>;
    if (status === 'pending') return <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800">Menunggu</span>;
    return null;
  };

  const getPaymentBadge = (paymentStatus) => {
    if (paymentStatus === 'lunas') return <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">Lunas</span>;
    if (paymentStatus === 'dp') return <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200">DP</span>;
    if (paymentStatus === 'belum_bayar') return <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200">Belum Bayar</span>;
    return null;
  };

  const filteredTx = dummyTx.filter(tx => {
    const matchSearch = tx.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        tx.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDate = filterDate ? tx.dateBorrow === filterDate : true;
    return matchSearch && matchDate;
  });

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Transaksi</h1>
          <p className="text-slate-500 mt-1">Catat transaksi peminjaman dan pengembalian barang.</p>
        </div>
        {/* Desktop Buttons */}
        <div className="hidden sm:flex gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm hover:shadow">
            <ArrowDownLeft size={20} />
            Pengembalian
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow">
            <ArrowUpRight size={20} />
            Penyewaan Baru
          </button>
        </div>

        {/* Mobile FABs */}
        <div className="sm:hidden fixed bottom-20 right-4 z-40 flex flex-col gap-3">
          <button className="p-4 rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-200 transition-transform active:scale-95">
            <ArrowDownLeft size={24} />
          </button>
          <button className="p-4 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-200 transition-transform active:scale-95">
            <ArrowUpRight size={24} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari ID transaksi atau nama..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative flex items-center min-w-[160px]">
            <input 
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            {filterDate && (
              <button 
                onClick={() => setFilterDate('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
        
        <div>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="py-4 px-6 font-medium">ID Transaksi</th>
                  <th className="py-4 px-6 font-medium">Customer</th>
                  <th className="py-4 px-6 font-medium">Tgl Pinjam</th>
                  <th className="py-4 px-6 font-medium">Tgl Kembali</th>
                  <th className="py-4 px-6 font-medium">Status & Bayar</th>
                  <th className="py-4 px-6 font-medium">Total Harga</th>
                  <th className="py-4 px-6 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTx.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-slate-500">
                      Tidak ada transaksi yang cocok dengan pencarian Anda.
                    </td>
                  </tr>
                ) : (
                  filteredTx.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-blue-600">{tx.id}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-slate-400" />
                          <span className="font-medium text-slate-700">{tx.customer}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-600">{formatDate(tx.dateBorrow)}</td>
                      <td className="py-4 px-6 text-slate-600">{formatDate(tx.dateReturn)}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1.5">
                          {getStatusBadge(tx.status)}
                          {getPaymentBadge(tx.paymentStatus)}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-700 font-medium">Rp {tx.total.toLocaleString('id-ID')}</td>
                      <td className="py-4 px-6 text-right">
                        <button onClick={() => setSelectedTx(tx)} className="text-blue-600 hover:text-blue-800 font-medium hover:underline">Detail</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden p-4 space-y-4 bg-slate-50/50">
            {filteredTx.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-sm">
                Tidak ada transaksi yang cocok dengan pencarian Anda.
              </div>
            ) : (
              filteredTx.map((tx) => (
                <div key={tx.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">{tx.customer}</h3>
                      <p className="text-blue-600 text-xs font-medium mt-0.5">{tx.id}</p>
                    </div>
                    <div className="flex gap-1.5 flex-wrap justify-end max-w-[120px]">
                      {getStatusBadge(tx.status)}
                      {getPaymentBadge(tx.paymentStatus)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div>
                      <p className="text-slate-400 text-xs mb-0.5">Tgl Pinjam</p>
                      <p className="font-medium text-slate-700">{formatDate(tx.dateBorrow)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs mb-0.5">Tgl Kembali</p>
                      <p className="font-medium text-slate-700">{formatDate(tx.dateReturn)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-1">
                    <div>
                      <p className="text-slate-400 text-xs mb-0.5">Total Harga</p>
                      <p className="font-bold text-slate-800 text-sm">Rp {tx.total.toLocaleString('id-ID')}</p>
                    </div>
                    <button onClick={() => setSelectedTx(tx)} className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      Detail
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal Detail Transaksi */}
      {selectedTx && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-backdrop" onClick={() => setSelectedTx(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-modal" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Detail Transaksi</h2>
                <p className="text-sm font-medium text-blue-600 mt-0.5">{selectedTx.id}</p>
              </div>
              <button onClick={() => setSelectedTx(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Customer</p>
                  <p className="font-bold text-slate-800 text-xl">{selectedTx.customer}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  {getStatusBadge(selectedTx.status)}
                  {getPaymentBadge(selectedTx.paymentStatus)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Tanggal Pinjam</p>
                  <p className="font-medium text-slate-800 text-sm">{formatDate(selectedTx.dateBorrow)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Tanggal Kembali</p>
                  <p className="font-medium text-slate-800 text-sm">{formatDate(selectedTx.dateReturn)}</p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <Package size={18} className="text-slate-400" />
                  Daftar Sewa
                </p>
                <div className="space-y-3">
                  {selectedTx.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 rounded-lg border border-slate-100 bg-white shadow-sm">
                      <div>
                        <p className="font-medium text-slate-700 text-sm">{item.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.qty} x Rp {item.price.toLocaleString('id-ID')}</p>
                      </div>
                      <p className="font-semibold text-slate-800 text-sm">Rp {(item.qty * item.price).toLocaleString('id-ID')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50 flex flex-col gap-3 shrink-0">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Total Harga</span>
                <span className="text-slate-800 font-medium">Rp {selectedTx.total.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Sudah Dibayar</span>
                <span className="text-emerald-600 font-medium">Rp {selectedTx.paidAmount.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-200/60">
                <span className="text-slate-800 font-bold">Sisa Tagihan</span>
                <span className={`text-xl font-bold ${selectedTx.total - selectedTx.paidAmount > 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                  Rp {(selectedTx.total - selectedTx.paidAmount).toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
