import React from 'react';
import { useStore } from '../store/StoreContext';

const Inventory: React.FC = () => {
    const { inventory, updateInventoryStock } = useStore();

    const getStockStatus = (stock: number, category: string) => {
        const threshold = category === 'base' ? 100 : 50;
        if (stock <= 0) return { color: 'text-red-500', bg: 'bg-red-500/10', label: 'CRÍTICO' };
        if (stock < threshold) return { color: 'text-yellow-500', bg: 'bg-yellow-500/10', label: 'BAJO' };
        return { color: 'text-green-500', bg: 'bg-green-500/10', label: 'ÓPTIMO' };
    };

    return (
        <div className="p-8 h-full flex flex-col max-w-5xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-100 font-mono mb-2">Base de Datos: Inventario</h1>
                <p className="text-slate-400 text-sm">Monitor de recursos y módulos de ensamblaje.</p>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-max overflow-y-auto pb-10">
                {inventory.map((item) => {
                    const status = getStockStatus(item.stock, item.category);
                    return (
                        <div key={item.id} className="glass-panel rounded-xl p-5 border border-slate-700/80 relative overflow-hidden group">
                            {/* Category Badge */}
                            <span className="absolute top-4 right-4 text-[10px] uppercase font-mono tracking-wider text-slate-500 border border-slate-700 px-2 py-0.5 rounded">
                                {item.category}
                            </span>
                            
                            <h3 className="font-bold text-lg text-slate-200 mb-1 pr-16">{item.name}</h3>
                            <p className="text-xs font-mono text-slate-500 mb-4">ID: {item.id}</p>
                            
                            <div className="flex items-end justify-between mt-auto">
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-mono mb-1">Nivel Actual</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-2xl font-bold font-mono ${status.color}`}>
                                            {item.stock}
                                        </span>
                                        <span className="text-sm text-slate-500 font-mono">{item.unit}</span>
                                    </div>
                                    <span className={`inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded font-bold ${status.bg} ${status.color}`}>
                                        {status.label}
                                    </span>
                                </div>
                                
                                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => updateInventoryStock(item.id, 50)}
                                        className="bg-slate-800 hover:bg-brand-500 text-slate-300 hover:text-white text-xs font-mono px-2 py-1 rounded transition-colors"
                                    >
                                        +50
                                    </button>
                                    <button 
                                        onClick={() => updateInventoryStock(item.id, -10)}
                                        className="bg-slate-800 hover:bg-red-500/80 text-slate-300 hover:text-white text-xs font-mono px-2 py-1 rounded transition-colors"
                                    >
                                        -10
                                    </button>
                                </div>
                            </div>
                            
                            {/* Visual Stock Bar */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
                                <div 
                                    className={`h-full ${status.color.replace('text-', 'bg-')}`} 
                                    style={{ width: `${Math.min(100, (item.stock / (item.category === 'base' ? 1000 : 500)) * 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Inventory;
