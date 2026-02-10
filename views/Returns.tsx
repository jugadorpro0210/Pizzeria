import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { Icons } from '../constants';
import { OrderStatus } from '../types';

const Returns: React.FC = () => {
    const { orders, refundOrder } = useStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOrders = orders.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (order.customerName && order.customerName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-8 h-full flex flex-col max-w-5xl mx-auto">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-slate-100 font-mono mb-2">Historial y Devoluciones</h1>
                <p className="text-slate-400 text-sm">Auditoría de transacciones y reversión de procesos.</p>
            </header>

            <div className="mb-6 flex gap-4">
                <div className="relative flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icons.Menu className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar por ID o Nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg bg-cyber-dark text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 font-mono text-sm"
                    />
                </div>
            </div>

            <div className="flex-1 glass-panel rounded-2xl border border-slate-700 overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-800">
                        <thead className="bg-slate-800/50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider font-mono">ID Transacción</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider font-mono">Fecha/Hora</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider font-mono">Usuario</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider font-mono">Total</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider font-mono">Estado</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider font-mono">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50 bg-cyber-dark/30">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500 font-mono text-sm">
                                        No se encontraron registros.
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-200 font-mono">
                                            {order.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 font-mono">
                                            {order.date.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                            {order.customerName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-400 font-mono font-bold">
                                            ${order.total.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full font-mono border ${
                                                order.status === OrderStatus.COMPLETED 
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {order.status === OrderStatus.COMPLETED && (
                                                <button 
                                                    onClick={() => refundOrder(order.id)}
                                                    className="text-brand-500 hover:text-brand-400 font-mono text-xs border border-brand-500/50 rounded px-3 py-1 hover:bg-brand-500/10 transition-colors"
                                                >
                                                    REVERTIR (REFUND)
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Returns;
