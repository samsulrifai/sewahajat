import { FileText, Download, Search } from 'lucide-react';

const Invoices = () => {
  const dummyTx = [
    { id: 'INV-001', ref: 'TRX-001', customer: 'Budi Santoso', date: '16 Mei 2026', total: 500000 },
    { id: 'INV-002', ref: 'TRX-002', customer: 'Siti Aminah', date: '15 Mei 2026', total: 1500000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Invoice</h1>
          <p className="text-slate-500 mt-1">Daftar tagihan penyewaan dan eksport dokumen ke PDF.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Cari No Invoice..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="py-4 px-6 font-medium">No Invoice</th>
                <th className="py-4 px-6 font-medium">Ref. Transaksi</th>
                <th className="py-4 px-6 font-medium">Customer</th>
                <th className="py-4 px-6 font-medium">Tanggal</th>
                <th className="py-4 px-6 font-medium">Total</th>
                <th className="py-4 px-6 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dummyTx.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-800 flex items-center gap-2">
                    <FileText size={16} className="text-slate-400" />
                    {tx.id}
                  </td>
                  <td className="py-4 px-6 text-slate-500">{tx.ref}</td>
                  <td className="py-4 px-6 font-medium text-slate-700">{tx.customer}</td>
                  <td className="py-4 px-6 text-slate-600">{tx.date}</td>
                  <td className="py-4 px-6 text-slate-700 font-medium">Rp {tx.total.toLocaleString('id-ID')}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors font-medium">
                      <Download size={16} />
                      PDF
                    </button>
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

export default Invoices;
