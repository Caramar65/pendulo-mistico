import React, { useState, useRef } from 'react';

export default function App() {
  const [pregunta, setPregunta] = useState('');
  const [estaConsultando, setEstaConsultando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [tipoMovimiento, setTipoMovimiento] = useState('');

  // Creamos las referencias invisibles para controlar la pantalla
  const penduloRef = useRef(null);
  const respuestaRef = useRef(null);

  const manejarConsulta = (e) => {
    e.preventDefault();
    if (!pregunta.trim()) return;

    // 1. Iniciamos consulta y limpiamos respuestas anteriores
    setEstaConsultando(true);
    setResultado(null);
    setTipoMovimiento('');

    // OPCIÓN UX: Desplazar suavemente hacia el péndulo para iniciar el suspenso
    setTimeout(() => {
      penduloRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    // Simulamos la conexión mística (3.5 segundos de movimiento)
    setTimeout(() => {
      const movimientos = [
        { tipo: 'Circular en sentido horario', dictamen: 'SÍ (Energía Positiva y Afirmativa)' },
        { tipo: 'Circular en sentido antihorario', dictamen: 'NO (Energía de Bloqueo o Negación)' },
        { tipo: 'Oscilación Lineal Vertical', dictamen: 'PROBABLE (El camino está abierto, depende de tu voluntad)' },
        { tipo: 'Oscilación Lineal Horizontal', dictamen: 'DUDOSO (Fuerzas en conflicto, vuelve a preguntar más tarde)' }
      ];

      // Selección aleatoria del dictamen cósmico
      const azar = movimientos[Math.floor(Math.random() * movimientos.length)];
      
      setTipoMovimiento(azar.tipo);
      setResultado(azar.dictamen);
      setEstaConsultando(false);

      // OPCIÓN UX: Una vez que aparece la respuesta, la pantalla baja automáticamente al veredicto
      setTimeout(() => {
        respuestaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);

    }, 3500);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-start p-4 selection:bg-purple-500">
      {/* Encabezado */}
      <header className="text-center my-8 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r fancy-text from-purple-400 via-pink-500 to-indigo-500 drop-shadow-lg mb-2">
          PÉNDULO MÍSTICO
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Formula una pregunta binaria (Ej: Opción A u Opción B) y deja que las fuerzas del cosmos guíen el dictamen a través del movimiento.
        </p>
      </header>

      {/* Formulario de Consulta */}
      <main className="w-full max-w-lg bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm mb-12">
        <form onSubmit={manejarConsulta} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-purple-400 uppercase tracking-widest mb-2">
              Tu Pregunta al Cosmos
            </label>
            <input
              type="text"
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
              disabled={estaConsultando}
              placeholder="¿Debería tomar el proyecto A o el proyecto B?..."
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={estaConsultando || !pregunta.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-purple-900/30 transition-all transform active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
          >
            {estaConsultando ? 'Conectando con la energía...' : 'Consultar al Péndulo'}
          </button>
        </form>
      </main>

      {/* SECCIÓN DEL PÉNDULO (Punto de enfoque 1) */}
      <div ref={penduloRef} className="w-full max-w-sm flex flex-col items-center justify-center my-8 min-h-[300px]">
        {estaConsultando && (
          <div className="flex flex-col items-center space-y-6">
            {/* Animación del péndulo físico */}
            <div className="relative w-2 h-24 bg-gradient-to-b from-zinc-700 to-purple-500 origin-top animate-[spin_2s_linear_infinite] rounded-full">
              <div className="absolute -bottom-4 -left-3 w-8 h-8 bg-gradient-to-br from-purple-500 via-indigo-600 to-pink-500 rounded-full shadow-lg shadow-purple-500/50 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>
            </div>
            <p className="text-zinc-400 text-xs tracking-widest uppercase animate-pulse">
              Detectando vibraciones del entorno...
            </p>
          </div>
        )}

        {!estaConsultando && !resultado && (
          <div className="text-center p-6 border border-dashed border-zinc-800 rounded-2xl text-zinc-600 max-w-xs">
            <span className="text-3xl block mb-2">✨</span>
            <p className="text-xs">El péndulo permanece inmóvil esperando tu vibración.</p>
          </div>
        )}

        {/* SECCIÓN DE LA RESPUESTA (Punto de enfoque 2) */}
        {resultado && (
          <div 
            ref={respuestaRef}
            className="w-full bg-gradient-to-b from-zinc-900 to-black border border-purple-500/30 rounded-2xl p-6 text-center shadow-2xl shadow-purple-950/20 animate-[fadeIn_0.5s_ease-out]"
          >
            <div className="inline-block px-3 py-1 bg-purple-950/50 border border-purple-500/20 rounded-full text-[10px] uppercase font-bold tracking-widest text-purple-400 mb-3">
              Dictamen Finalizado
            </div>
            <div className="text-zinc-400 text-xs mb-1 font-medium">Movimiento Detectado:</div>
            <div className="text-sm font-semibold text-pink-400 mb-4 tracking-wide">{tipoMovimiento}</div>
            
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-3"></div>
            
            <div className="text-zinc-400 text-xs mb-1 font-medium">Respuesta del Cosmos:</div>
            <div className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 tracking-wide drop-shadow">
              {resultado}
            </div>
          </div>
        )}
      </div>

      <footer className="mt-auto py-6 text-[10px] text-zinc-600 tracking-wider uppercase">
        © 2026 Péndulo Místico Pro — Sistema de Consulta Binaria
      </footer>
    </div>
  );
}

