import React from 'react';
import { Icons } from '../constants';

const About: React.FC = () => {
    return (
        <div className="p-8 h-full flex flex-col items-center overflow-y-auto">
            <div className="w-full max-w-4xl mt-8">
                
                <header className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-4 bg-brand-500/10 rounded-full mb-6 border border-brand-500/30 neon-glow">
                        <Icons.Pizza className="w-12 h-12 text-brand-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-100 font-mono mb-4 tracking-tight">Pizzas Virtuales <span className="text-brand-500">OS</span></h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Donde el código fuente se mezcla con el queso fundido. Redefiniendo la gastronomía a través del paradigma digital.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* Misión */}
                    <div className="glass-panel p-8 rounded-3xl border border-slate-700/50 relative overflow-hidden group hover:border-brand-500/50 transition-colors duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-bl-full -z-10 group-hover:bg-brand-500/10 transition-colors"></div>
                        <div className="flex items-center gap-3 mb-6">
                            <Icons.Terminal className="w-8 h-8 text-brand-500" />
                            <h2 className="text-2xl font-bold text-white font-mono">Nuestra Misión</h2>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            Procesar y compilar ingredientes de la más alta calidad para desplegar pizzas excepcionales. Buscamos optimizar la experiencia de usuario (UX) en cada bocado, garantizando cero latencia en satisfacción y un servicio 100% libre de bugs.
                        </p>
                    </div>

                    {/* Visión */}
                    <div className="glass-panel p-8 rounded-3xl border border-slate-700/50 relative overflow-hidden group hover:border-brand-500/50 transition-colors duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-bl-full -z-10 group-hover:bg-brand-500/10 transition-colors"></div>
                        <div className="flex items-center gap-3 mb-6">
                            <Icons.Package className="w-8 h-8 text-brand-500" />
                            <h2 className="text-2xl font-bold text-white font-mono">Nuestra Visión</h2>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            Ser el <span className="text-brand-400 font-mono">kernel</span> principal que alimente tanto a la red virtual como al plano físico, estandarizando el consumo de pizza mediante tecnología de punta, interfaces intuitivas y algoritmos de sabor inigualables.
                        </p>
                    </div>
                </div>

                {/* ASCII Art / Vibe Section */}
                <div className="glass-panel rounded-2xl p-6 border border-slate-800 text-center">
                    <pre className="text-[10px] sm:text-xs md:text-sm text-brand-500/60 font-mono leading-none overflow-x-auto whitespace-pre">
{`
   _____ _                __      ___      _               _ 
  |  __ (_)               \\ \\    / (_)    | |             | |
  | |__) | z ____ _ ___    \\ \\  / / _ _ __| |_ _   _  __ _| |
  |  ___/ |_  /_ \` / __|    \\ \\/ / | | '__| __| | | |/ _\` | |
  | |   | |/ / (_| \\__ \\     \\  /  | | |  | |_| |_| | (_| | |
  |_|   |_/___\\__,_|___/      \\/   |_|_|   \\__|\\__,_|\\__,_|_|
                                                             
              [ SYSTEM STATUS: DELICIOUS & ONLINE ]
`}
                    </pre>
                </div>

            </div>
        </div>
    );
};

export default About;
