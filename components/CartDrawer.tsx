import React, { useMemo } from 'react';
import { useStore } from '../store/StoreContext';
import { Icons } from '../constants';
import { AppView } from '../types';

const CartDrawer: React.FC = () => {
    const { isCartOpen, setIsCartOpen, cart, updateCartItemQuantity, removeFromCart, setView } = useStore();

    const subtotal = useMemo(() => cart.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0), [cart]);

    const handleProceedToCheckout = () => {
        setIsCartOpen(false);
        setView(AppView.CHECKOUT);
    };

    return (
        <>
            {/* Backdrop */}
            {isCartOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsCartOpen(false)}
                />
            )}

            {/* Slide-out Panel */}
            <div className={`fixed inset-y-0 right-0 z-50 w-full md:w-[400px] bg-cyber-darker border-l border-slate-700 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                
                <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        <Icons.Cart className="w-6 h-6 text-brand-500" />
                        <h2 className="text-xl font-bold font-mono text-slate-100">CARRITO_EN_LINEA</h2>
                    </div>
                    <button onClick={() => setIsCartOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                        <Icons.X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center">
                            <Icons.Package className="w-16 h-16 mb-4 opacity-20" />
                            <p className="font-mono text-sm">Buffer de carrito vacío.</p>
                            <p className="text-xs mt-2">Agrega unidades desde el menú principal.</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50 relative group">
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="absolute top-3 right-3 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Icons.Trash className="w-4 h-4" />
                                </button>
                                
                                <h3 className="font-bold text-slate-200 pr-6 leading-tight mb-1">
                                    {item.name} <span className="text-xs text-brand-500 font-mono ml-1">[{item.size}]</span>
                                </h3>
                                
                                {item.customIngredients.length > 0 && (
                                    <p className="text-xs text-slate-400 mb-3">
                                        + {item.customIngredients.map(i => i.name).join(', ')}
                                    </p>
                                )}

                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-1 bg-cyber-dark rounded-lg p-1 border border-slate-700">
                                        <button onClick={() => updateCartItemQuantity(item.id, -1)} className="p-1 hover:text-white text-slate-400">
                                            <Icons.Minus className="w-3 h-3" />
                                        </button>
                                        <span className="w-6 text-center text-sm font-mono font-bold text-slate-200">{item.quantity}</span>
                                        <button onClick={() => updateCartItemQuantity(item.id, 1)} className="p-1 hover:text-white text-slate-400">
                                            <Icons.Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <span className="font-mono text-brand-400 font-bold">
                                        ${(item.totalPrice * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-5 border-t border-slate-800 bg-slate-900/50">
                        <div className="flex justify-between items-center mb-4 text-slate-300">
                            <span className="font-mono text-sm">SUBTOTAL ESTIMADO:</span>
                            <span className="font-mono font-bold text-lg text-white">${subtotal.toFixed(2)}</span>
                        </div>
                        <button 
                            onClick={handleProceedToCheckout}
                            className="w-full bg-brand-500 hover:bg-brand-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 neon-glow transition-all"
                        >
                            <span>PROCEDER AL PAGO</span>
                            <Icons.CreditCard className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
