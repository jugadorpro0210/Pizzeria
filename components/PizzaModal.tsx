import React, { useState, useMemo } from 'react';
import { PizzaTemplate, Ingredient, CartItem } from '../types';
import { useStore } from '../store/StoreContext';
import { Icons } from '../constants';

interface PizzaModalProps {
    pizza: PizzaTemplate;
    onClose: () => void;
}

const PizzaModal: React.FC<PizzaModalProps> = ({ pizza, onClose }) => {
    const { inventory, addToCart } = useStore();
    
    const [size, setSize] = useState<'M' | 'L' | 'XL'>('L');
    const [quantity, setQuantity] = useState(1);
    const [addedIngredients, setAddedIngredients] = useState<Ingredient[]>([]);
    
    // In a full implementation, we'd allow removing default ingredients. Kept simple for now.
    
    const sizeMultiplier = size === 'M' ? 0.8 : size === 'L' ? 1 : 1.3;
    
    const availableExtras = useMemo(() => {
        return inventory.filter(ing => 
            !pizza.defaultIngredients.includes(ing.id) && 
            ing.category !== 'base'
        );
    }, [inventory, pizza]);

    const handleAddIngredient = (ing: Ingredient) => {
        if (!addedIngredients.find(i => i.id === ing.id)) {
            setAddedIngredients([...addedIngredients, ing]);
        }
    };

    const handleRemoveIngredient = (id: string) => {
        setAddedIngredients(addedIngredients.filter(i => i.id !== id));
    };

    const currentPrice = useMemo(() => {
        const extrasCost = addedIngredients.reduce((sum, ing) => sum + ing.price, 0);
        return ((pizza.basePrice * sizeMultiplier) + extrasCost) * quantity;
    }, [pizza.basePrice, sizeMultiplier, addedIngredients, quantity]);

    const handleAddToCart = () => {
        const cartItem: CartItem = {
            id: `ci_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            pizzaId: pizza.id,
            name: pizza.name,
            size,
            sizeMultiplier,
            customIngredients: addedIngredients,
            removedIngredients: [],
            basePrice: pizza.basePrice,
            totalPrice: currentPrice / quantity, // price per unit
            quantity
        };
        addToCart(cartItem);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
            <div className="bg-cyber-dark border border-slate-700 rounded-2xl w-full max-w-3xl flex flex-col md:flex-row overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                
                {/* Image Section */}
                <div className="md:w-2/5 relative h-48 md:h-auto bg-slate-800">
                    <img src={pizza.imageUrl} alt={pizza.name} className="w-full h-full object-cover opacity-80 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-cyber-dark to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h2 className="text-2xl font-bold font-mono text-brand-500 drop-shadow-md">{pizza.name}</h2>
                        <p className="text-sm text-slate-300 mt-1 line-clamp-2">{pizza.description}</p>
                    </div>
                    <button onClick={onClose} className="absolute top-4 left-4 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-md transition-colors md:hidden">
                        <Icons.X className="w-5 h-5" />
                    </button>
                </div>

                {/* Configuration Section */}
                <div className="flex-1 p-6 flex flex-col max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-between items-start hidden md:flex mb-6">
                        <h3 className="text-xl font-semibold text-slate-100">Configurar Protocolo</h3>
                        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                            <Icons.X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Size Selection */}
                        <div>
                            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 block">Tamaño (Resolución)</label>
                            <div className="flex bg-slate-800/50 p-1 rounded-lg border border-slate-700/50">
                                {(['M', 'L', 'XL'] as const).map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setSize(s)}
                                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                                            size === s 
                                            ? 'bg-brand-500 text-white shadow-md' 
                                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                                        }`}
                                    >
                                        {s === 'M' ? 'Mediana (M)' : s === 'L' ? 'Grande (L)' : 'Familiar (XL)'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Extra Ingredients */}
                        <div>
                            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 block">Módulos Extra (Ingredientes)</label>
                            
                            {/* Selected Extras */}
                            {addedIngredients.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {addedIngredients.map(ing => (
                                        <div key={ing.id} className="flex items-center gap-1 bg-brand-500/20 text-brand-400 px-3 py-1 rounded-full text-sm border border-brand-500/30">
                                            <span>{ing.name} (+${ing.price.toFixed(2)})</span>
                                            <button onClick={() => handleRemoveIngredient(ing.id)} className="ml-1 hover:text-brand-200">
                                                <Icons.X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Available Extras Grid */}
                            <div className="grid grid-cols-2 gap-2">
                                {availableExtras.map(ing => {
                                    const isAdded = addedIngredients.some(i => i.id === ing.id);
                                    if (isAdded) return null;
                                    return (
                                        <button
                                            key={ing.id}
                                            onClick={() => handleAddIngredient(ing)}
                                            className="flex items-center justify-between p-2 rounded border border-slate-700 hover:border-brand-500/50 hover:bg-slate-800/80 transition-colors text-left group"
                                        >
                                            <span className="text-sm text-slate-300 group-hover:text-slate-100">{ing.name}</span>
                                            <span className="text-xs font-mono text-brand-500">+${ing.price.toFixed(2)}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-auto pt-6 border-t border-slate-800 flex items-end justify-between gap-4">
                        <div>
                            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1 block">Cantidad</label>
                            <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-slate-400 hover:text-white">
                                    <Icons.Minus className="w-4 h-4" />
                                </button>
                                <span className="w-6 text-center font-mono font-medium">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-slate-400 hover:text-white">
                                    <Icons.Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-between transition-all neon-glow"
                        >
                            <span>Ejecutar Compilación</span>
                            <span className="font-mono bg-black/20 px-2 py-1 rounded text-sm">${currentPrice.toFixed(2)}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PizzaModal;
