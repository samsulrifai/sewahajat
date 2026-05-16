import { Package, Box, ShoppingCart, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="text-2xl font-bold text-slate-800 mt-2">{value}</p>
      {trend && (
        <div className="flex items-center gap-1 mt-2 text-sm">
          <TrendingUp size={16} className="text-emerald-500" />
          <span className="text-emerald-500 font-medium">{trend}</span>
          <span className="text-slate-400 ml-1">dari bulan lalu</span>
        </div>
      )}
    </div>
    <div className={`p-3 rounded-lg ${colorClass}`}>
      <Icon size={24} />
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">Ringkasan inventaris dan transaksi sewa hajat hari ini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Total Transaksi Aktif" 
          value="12" 
          icon={ShoppingCart} 
          trend="+2.5%" 
          colorClass="bg-blue-50 text-blue-600" 
        />
        <StatCard 
          title="Total Barang Satuan" 
          value="145" 
          icon={Box} 
          colorClass="bg-amber-50 text-amber-600" 
        />
        <StatCard 
          title="Total Paket Bundling" 
          value="8" 
          icon={Package} 
          colorClass="bg-purple-50 text-purple-600" 
        />
        <StatCard 
          title="Menunggu Pengembalian" 
          value="5" 
          icon={ShoppingCart} 
          colorClass="bg-rose-50 text-rose-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Transaksi Terbaru</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Lihat Semua</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="py-3 px-4 font-medium rounded-tl-lg">ID Transaksi</th>
                  <th className="py-3 px-4 font-medium">Penyewa</th>
                  <th className="py-3 px-4 font-medium">Tgl Pinjam</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium rounded-tr-lg">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-slate-700 font-medium">TRX-00{i}</td>
                    <td className="py-3 px-4 text-slate-600">Budi Santoso</td>
                    <td className="py-3 px-4 text-slate-600">16 Mei 2026</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Disewa
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">Rp 500.000</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Stok Menipis</h2>
          <div className="space-y-4">
            {[
              { name: 'Kursi Lipat', stock: 5, total: 100 },
              { name: 'Tenda 4x4', stock: 1, total: 10 },
              { name: 'Sound System Set', stock: 0, total: 5 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-slate-50 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-slate-700">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.stock} / {item.total} tersedia</p>
                </div>
                <div className={`text-sm font-bold px-2 py-1 rounded-md ${item.stock === 0 ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
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
