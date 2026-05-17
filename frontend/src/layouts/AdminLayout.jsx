import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Box, ShoppingCart, FileText } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Inventaris', href: '/inventory', icon: Box },
    { name: 'Transaksi', href: '/transactions', icon: ShoppingCart },
    { name: 'Invoice', href: '/invoices', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      
      {/* Desktop Sidebar (Hidden on Mobile) */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg flex-col">
        <div className="flex h-16 items-center px-6 border-b border-slate-100">
          <span className="text-xl font-bold text-slate-800">Sewa Hajat</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-blue-700' : 'text-slate-400'} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64 pb-16 lg:pb-0">
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between px-4 sm:px-6 bg-white border-b border-slate-100 lg:justify-end">
          <div className="lg:hidden">
             <span className="text-xl font-bold text-slate-800">Sewa Hajat</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
              A
            </div>
            <span className="text-sm font-medium text-slate-700 hidden sm:block">Admin User</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation (Hidden on Desktop) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex justify-around items-center px-2 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        {navigation.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center w-16 h-12 rounded-lg transition-colors ${
                isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon size={20} className={`mb-1 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
              <span className="text-[10px] font-medium leading-none">{item.name}</span>
            </Link>
          );
        })}
      </nav>

    </div>
  );
};

export default AdminLayout;
