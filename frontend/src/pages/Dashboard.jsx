import { useState } from 'react';
import { Package, Box, ShoppingCart, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dataHarian = [
  { name: 'Senin', total: 4 },
  { name: 'Selasa', total: 7 },
  { name: 'Rabu', total: 5 },
  { name: 'Kamis', total: 10 },
  { name: 'Jumat', total: 14 },
  { name: 'Sabtu', total: 25 },
  { name: 'Minggu', total: 18 },
];

const dataMingguan = [
  { name: 'Ming 1', total: 45 },
  { name: 'Ming 2', total: 52 },
  { name: 'Ming 3', total: 38 },
  { name: 'Ming 4', total: 65 },
];

const dataBulanan = [
  { name: 'Jan', total: 120 },
  { name: 'Feb', total: 150 },
  { name: 'Mar', total: 180 },
  { name: 'Apr', total: 140 },
  { name: 'Mei', total: 210 },
];

const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 hover:shadow-md transition-shadow">
    <div className="order-2 sm:order-1">
      <p className="text-xs sm:text-sm font-medium text-slate-500 line-clamp-1">{title}</p>
      <p className="text-xl sm:text-2xl font-bold text-slate-800 mt-0.5 sm:mt-2">{value}</p>
      {trend && (
        <div className="flex items-center gap-1 mt-1 sm:mt-2 text-[10px] sm:text-sm">
          <TrendingUp size={14} className="text-emerald-500" />
          <span className="text-emerald-500 font-medium">{trend}</span>
          <span className="text-slate-400 ml-1 hidden lg:inline">dari bulan lalu</span>
        </div>
      )}
    </div>
    <div className={`p-2 sm:p-3 rounded-lg w-fit order-1 sm:order-2 ${colorClass}`}>
      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
    </div>
  </div>
);

const Dashboard = () => {
  const [chartFilter, setChartFilter] = useState('harian');

  const getChartData = () => {
    switch(chartFilter) {
      case 'mingguan': return dataMingguan;
      case 'bulanan': return dataBulanan;
      default: return dataHarian;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Ringkasan inventaris dan transaksi sewa hajat hari ini.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <StatCard title="Transaksi Aktif" value="12" icon={ShoppingCart} trend="+2.5%" colorClass="bg-blue-50 text-blue-600" />
        <StatCard title="Barang Satuan" value="145" icon={Box} colorClass="bg-amber-50 text-amber-600" />
        <StatCard title="Paket Bundling" value="8" icon={Package} colorClass="bg-purple-50 text-purple-600" />
        <StatCard title="Menunggu" value="5" icon={ShoppingCart} colorClass="bg-rose-50 text-rose-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          
          {/* Chart Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-slate-800">Tren Transaksi</h2>
              <div className="flex bg-slate-100 p-1 rounded-lg w-full sm:w-auto">
                <button 
                  onClick={() => setChartFilter('harian')}
                  className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${chartFilter === 'harian' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >Harian</button>
                <button 
                  onClick={() => setChartFilter('mingguan')}
                  className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${chartFilter === 'mingguan' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >Mingguan</button>
                <button 
                  onClick={() => setChartFilter('bulanan')}
                  className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${chartFilter === 'bulanan' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >Bulanan</button>
              </div>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getChartData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                    labelStyle={{ color: '#64748b', marginBottom: '4px' }}
                    cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-semibold text-slate-800">Transaksi Terbaru</h2>
              <button className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700">Lihat Semua</button>
            </div>
            <div>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="py-3 px-4 font-medium rounded-tl-lg">ID Transaksi</th>
                      <th className="py-3 px-4 font-medium">Penyewa</th>
                      <th className="py-3 px-4 font-medium">Tgl Pinjam</th>
                      <th className="py-3 px-4 font-medium">Status & Bayar</th>
                      <th className="py-3 px-4 font-medium rounded-tr-lg">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { id: 1, name: 'Budi Santoso', total: 500000, pStatus: 'lunas' },
                      { id: 2, name: 'Siti Aminah', total: 1500000, pStatus: 'dp' },
                      { id: 3, name: 'PT. Maju Jaya', total: 3000000, pStatus: 'belum_bayar' }
                    ].map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 text-slate-700 font-medium">TRX-00{tx.id}</td>
                        <td className="py-3 px-4 text-slate-600">{tx.name}</td>
                        <td className="py-3 px-4 text-slate-600">16 Mei 2026</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1.5">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                              Disewa
                            </span>
                            {tx.pStatus === 'lunas' && <span className="inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">Lunas</span>}
                            {tx.pStatus === 'dp' && <span className="inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200">DP</span>}
                            {tx.pStatus === 'belum_bayar' && <span className="inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200">Belum Bayar</span>}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-700 font-medium">Rp {tx.total.toLocaleString('id-ID')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3 mt-2">
                {[
                  { id: 1, name: 'Budi Santoso', total: 500000, pStatus: 'lunas' },
                  { id: 2, name: 'Siti Aminah', total: 1500000, pStatus: 'dp' },
                  { id: 3, name: 'PT. Maju Jaya', total: 3000000, pStatus: 'belum_bayar' }
                ].map((tx) => (
                  <div key={tx.id} className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] sm:text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">TRX-00{tx.id}</span>
                        <h3 className="font-bold text-slate-800 text-sm mt-1.5">{tx.name}</h3>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                          Disewa
                        </span>
                        {tx.pStatus === 'lunas' && <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">Lunas</span>}
                        {tx.pStatus === 'dp' && <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200">DP</span>}
                        {tx.pStatus === 'belum_bayar' && <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200">Belum Bayar</span>}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-1 pt-2 border-t border-slate-200/60">
                      <span className="text-slate-500 text-xs">16 Mei 2026</span>
                      <span className="font-bold text-blue-700 text-sm">Rp {tx.total.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar on Desktop / Bottom on Mobile */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-6 h-fit lg:sticky lg:top-20">
          <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-4">Stok Menipis</h2>
          <div className="space-y-3">
            {[
              { name: 'Kursi Lipat', stock: 5, total: 100 },
              { name: 'Tenda 4x4', stock: 1, total: 10 },
              { name: 'Sound System Set', stock: 0, total: 5 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-slate-700">{item.name}</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{item.stock} / {item.total} tersedia</p>
                </div>
                <div className={`text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md ${item.stock === 0 ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                  {item.stock === 0 ? 'Habis' : 'Kritis'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
