import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Box, Package } from 'lucide-react';

const Inventory = () => {
  const [activeTab, setActiveTab] = useState('items'); // 'items' or 'packages'

  const dummyItems = [
    { id: 1, name: 'Tenda 4x4', stock: 10, available: 8, price: 150000 },
    { id: 2, name: 'Kursi Lipat', stock: 100, available: 45, price: 5000 },
    { id: 3, name: 'Sound System Set', stock: 5, available: 5, price: 500000 },
    { id: 4, name: 'Meja Kotak', stock: 20, available: 10, price: 20000 },
  ];

  const dummyPackages = [
    { 
      id: 1, 
      name: 'Paket Hajatan Standar', 
      price: 1500000, 
      items: [
        { name: 'Tenda 4x4', qty: 2 },
        { name: 'Kursi Lipat', qty: 50 },
        { name: 'Meja Kotak', qty: 5 }
      ]
    },
    { 
      id: 2, 
      name: 'Paket VIP', 
      price: 3000000, 
      items: [
        { name: 'Tenda VIP 4x4', qty: 2 },
        { name: 'Kursi Futura', qty: 50 },
        { name: 'Meja Kotak VIP', qty: 5 },
        { name: 'Sound System Set', qty: 1 }
      ]
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Inventaris</h1>
          <p className="text-slate-500 mt-1">Kelola daftar stok barang satuan dan paket bundling Anda.</p>
        </div>
        <button className={`inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors font-medium ${
          activeTab === 'items' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'
        }`}>
          <Plus size={20} />
          {activeTab === 'items' ? 'Tambah Barang' : 'Tambah Paket'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Tabs Header */}
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('items')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'items' 
                ? 'border-blue-600 text-blue-600 bg-blue-50/50' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Box size={18} />
            Barang Satuan
          </button>
          <button 
            onClick={() => setActiveTab('packages')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'packages' 
                ? 'border-purple-600 text-purple-600 bg-purple-50/50' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Package size={18} />
            Paket Bundling
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/30">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder={`Cari nama ${activeTab === 'items' ? 'barang' : 'paket'}...`} 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
          </div>
        </div>
        
        {/* Table Content */}
        <div className="overflow-x-auto">
          {activeTab === 'items' ? (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="py-4 px-6 font-medium">Nama Barang</th>
                  <th className="py-4 px-6 font-medium">Harga Sewa</th>
                  <th className="py-4 px-6 font-medium">Total Stok</th>
                  <th className="py-4 px-6 font-medium">Tersedia</th>
                  <th className="py-4 px-6 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dummyItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-800">{item.name}</td>
                    <td className="py-4 px-6 text-slate-600">Rp {item.price.toLocaleString('id-ID')}</td>
                    <td className="py-4 px-6 text-slate-600">{item.stock}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.available === 0 ? 'bg-rose-100 text-rose-700' : 
                        item.available < item.stock * 0.2 ? 'bg-amber-100 text-amber-700' : 
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {item.available}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-rose-50">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="py-4 px-6 font-medium">Nama Paket</th>
                  <th className="py-4 px-6 font-medium">Harga Paket</th>
                  <th className="py-4 px-6 font-medium">Komposisi Barang</th>
                  <th className="py-4 px-6 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dummyPackages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-800 align-top">{pkg.name}</td>
                    <td className="py-4 px-6 text-slate-600 align-top font-medium text-purple-700">Rp {pkg.price.toLocaleString('id-ID')}</td>
                    <td className="py-4 px-6">
                      <ul className="space-y-1">
                        {pkg.items.map((item, idx) => (
                          <li key={idx} className="text-slate-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                            {item.name} <span className="text-slate-400 text-xs font-medium">x{item.qty}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-4 px-6 text-right align-top">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-purple-600 transition-colors rounded-lg hover:bg-purple-50">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-rose-50">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
