import React, { useState } from 'react';
import { PIZZA_MENU } from '../constants';
import { PizzaTemplate } from '../types';
import PizzaModal from '../components/PizzaModal';

const Menu: React.FC = () => {
    const [selectedPizza, setSelectedPizza] = useState<PizzaTemplate | null>(null);

    return (
        <div className="p-8 h-full flex flex-col">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-100 mb-2 font-mono">/root/menu</h1>
                <p className="text-slate-400 text-sm">Seleccione una unidad base para configurar.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                {PIZZA_MENU.map((pizza) => (
                    <div 
                        key={pizza.id}
                        className="glass-panel rounded-2xl overflow-hidden group cursor-pointer hover:border-brand-500/50 transition-all duration-300 flex flex-col h-full"
                        onClick={() => setSelectedPizza(pizza)}
                    >
                        <div className="relative h-48 overflow-hidden">
                            <div className="absolute inset-0 bg-brand-500/20 mix-blend-color z-10 group-hover:opacity-0 transition-opacity"></div>
                            <img 
                                src={pizza.imageUrl} 
                                alt={pizza.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[30%] group-hover:grayscale-0"
                            />
                            <div className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-brand-500 font-mono font-bold text-sm">
                                ${pizza.basePrice.toFixed(2)}
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-brand-400 transition-colors">{pizza.name}</h3>
                            <p className="text-slate-400 text-sm flex-1">{pizza.description}</p>
                            
                            <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center text-brand-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                <span>Iniciar Configuración</span>
                                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedPizza && (
                <PizzaModal 
                    pizza={selectedPizza} 
                    onClose={() => setSelectedPizza(null)} 
                />
            )}
        </div>
    );
};

export default Menu;
