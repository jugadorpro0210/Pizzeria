import React from 'react';
import { useStore } from '../store/StoreContext';
import { AppView } from '../types';
import { Icons } from '../constants';
import CartDrawer from './CartDrawer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { view, setView, cart, setIsCartOpen } = useStore();

    const navItems = [
        { id: AppView.MENU, icon: <Icons.Menu className="w-5 h-5" />, label: 'Menú Principal' },
        { id: AppView.CHECKOUT, icon: <Icons.Terminal className="w-5 h-5" />, label: 'Terminal de Pagos' },
        { id: AppView.RETURNS, icon: <Icons.RefreshCcw className="w-5 h-5" />, label: 'Devoluciones' },
        { id: AppView.INVENTORY, icon: <Icons.Package className="w-5 h-5" />, label: 'Inventario DB' },
        { id: AppView.ABOUT, icon: <Icons.Info className="w-5 h-5" />, label: 'Acerca del Sistema' },
    ];

    const cartCount = cart.reduce((a, b) => a + b.quantity, 0);

    return (
        <div className="flex h-screen w-full bg-cyber-darker text-slate-200 overflow-hidden font-sans">
            {/* Sidebar OS Style */}
            <aside className="w-64 flex flex-col glass-panel border-r border-slate-800 z-20">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500 to-brand-neon flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                        <Icons.Pizza className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-100 to-brand-500">Pizzas<br/>Virtuales</h1>
                        <span className="text-[10px] uppercase tracking-widest text-brand-500 font-mono">v2.1.0 // OS</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = view === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setView(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                                    ${isActive 
                                        ? 'bg-brand-500/10 text-brand-500 border border-brand-500/30' 
                                        : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-transparent'
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500 neon-glow"></div>
                                )}
                                <div className={`${isActive ? 'text-brand-500' : 'text-slate-500 group-hover:text-slate-300'}`}>
                                    {item.icon}
                                </div>
                                <span className="font-medium text-sm">{item.label}</span>
                            </button>
                        )
                    })}
                </nav>

                <div className="p-4 mt-auto border-t border-slate-800/50">
                    <div className="flex items-center gap-3 px-4 py-2 bg-cyber-dark rounded-lg border border-slate-800">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-mono text-slate-400">Sistema En Línea</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 relative flex flex-col h-full overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-cyber-darker to-cyber-darker">
                {/* Decorative background grid */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50 z-0 pointer-events-none"></div>
                
                {/* Top Taskbar */}
                <header className="h-16 relative z-20 border-b border-slate-800/60 bg-cyber-darker/80 backdrop-blur-md flex items-center justify-between px-6">
                    <div className="flex items-center gap-4 text-slate-400 text-sm font-mono">
                        <Icons.Clock className="w-4 h-4" />
                        <span>{new Date().toLocaleTimeString()}</span>
                    </div>
                    
                    <button 
                        onClick={() => setIsCartOpen(true)}
                        className="relative flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl transition-colors border border-slate-700"
                    >
                        <Icons.Cart className="w-5 h-5 text-brand-500" />
                        <span className="font-bold text-sm">Mi Carrito</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg neon-glow">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </header>

                {/* View Content */}
                <div className="relative z-10 flex-1 h-full overflow-y-auto">
                    {children}
                </div>
            </main>

            {/* Global Cart Drawer */}
            <CartDrawer />
        </div>
    );
};

export default Layout;
