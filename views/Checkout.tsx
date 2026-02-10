import React, { useState, useMemo } from 'react';
import { useStore } from '../store/StoreContext';
import { Icons } from '../constants';
import { AppView } from '../types';

const Checkout: React.FC = () => {
    const { cart, placeOrder, setView } = useStore();
    const [customerName, setCustomerName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const subtotal = useMemo(() => cart.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0), [cart]);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) return;
        setIsProcessing(true);
        const success = await placeOrder(customerName);
        setIsProcessing(false);
        if (success) {
            setSuccessMsg('Transacción Completada Exitosamente.');
            setCustomerName('');
            setCardNumber('');
            setTimeout(() => {
                setSuccessMsg('');
                setView(AppView.MENU);
            }, 3000);
        }
    };

    if (successMsg) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8">
                <div className="w-24 h-24 bg-brand-500/20 rounded-full flex items-center justify-center mb-6 neon-glow animate-pulse">
                    <Icons.CheckCircle className="w-12 h-12 text-brand-500" />
                </div>
                <h2 className="text-2xl font-bold font-mono text-white mb-2">{successMsg}</h2>
                <p className="text-slate-400">Generando y encriptando recibo virtual...</p>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8">
                <Icons.Terminal className="w-16 h-16 text-slate-600 mb-4" />
                <h2 className="text-xl font-bold font-mono text-slate-400 mb-4">ERROR_404: BUFFER_VACÍO</h2>
                <p className="text-slate-500 mb-8 max-w-md text-center">
                    No se han detectado pizzas en la cola de procesamiento. Agregue unidades desde el menú principal para iniciar el cobro.
                </p>
                <button 
                    onClick={() => setView(AppView.MENU)}
                    className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all neon-glow"
                >
                    <Icons.Menu className="w-5 h-5" />
                    Ir al Menú
                </button>
            </div>
        );
    }

    return (
        <div className="p-8 h-full flex flex-col max-w-4xl mx-auto">
            <header className="mb-8 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-slate-800 rounded-full mb-4 shadow-lg border border-slate-700">
                    <Icons.CreditCard className="w-8 h-8 text-brand-500" />
                </div>
                <h1 className="text-3xl font-bold text-slate-100 font-mono">Pasarela de Pagos Segura</h1>
                <p className="text-slate-400 text-sm mt-2">Cifrado de extremo a extremo activo.</p>
            </header>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Resumen del Pedido */}
                <div className="flex-1 glass-panel rounded-2xl border border-slate-700 p-6 h-fit">
                    <h2 className="font-bold text-lg mb-4 text-slate-200 border-b border-slate-700 pb-2">Resumen de Ejecución</h2>
                    
                    <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between items-start">
                                <div>
                                    <span className="text-slate-200 font-medium">{item.quantity}x {item.name}</span>
                                    <div className="text-xs text-slate-500 font-mono">[{item.size}]</div>
                                </div>
                                <span className="font-mono text-slate-300">${(item.totalPrice * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2 font-mono text-sm border-t border-slate-700 pt-4">
                        <div className="flex justify-between text-slate-400">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                            <span>Impuestos de Red (8%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-white text-xl font-bold mt-4 pt-4 border-t border-slate-600">
                            <span>TOTAL A PAGAR</span>
                            <span className="text-brand-500">${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Formulario de Pago */}
                <div className="flex-1 glass-panel rounded-2xl border border-slate-700 p-6">
                    <form onSubmit={handleCheckout} className="space-y-5">
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block font-mono">Nombre del Usuario (Opcional)</label>
                            <input 
                                type="text" 
                                placeholder="Ej. Neo, Trinity..." 
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="w-full bg-cyber-dark border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-mono text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block font-mono">Número de Tarjeta (Simulada)</label>
                            <div className="relative">
                                <Icons.CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                                <input 
                                    type="text" 
                                    placeholder="0000 0000 0000 0000" 
                                    required
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    maxLength={19}
                                    className="w-full bg-cyber-dark border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block font-mono">Fecha Exp</label>
                                <input type="text" placeholder="MM/AA" required className="w-full bg-cyber-dark border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-all font-mono text-sm" />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block font-mono">CVV</label>
                                <input type="password" placeholder="***" required maxLength={4} className="w-full bg-cyber-dark border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-all font-mono text-sm" />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={isProcessing}
                            className={`w-full py-4 mt-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-white
                                ${isProcessing ? 'bg-slate-700 cursor-wait' : 'bg-brand-500 hover:bg-brand-600 neon-glow'}
                            `}
                        >
                            {isProcessing ? (
                                <Icons.RefreshCcw className="w-5 h-5 animate-spin" />
                            ) : (
                                <Icons.Terminal className="w-5 h-5" />
                            )}
                            <span>{isProcessing ? 'PROCESANDO TRANSACCIÓN...' : `PAGAR $${total.toFixed(2)}`}</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
