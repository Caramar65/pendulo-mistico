import React, { useState, useRef } from 'react';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [signo, setSigno] = useState('');
  const [edad, setEdad] = useState('');
  const [pregunta, setPregunta] = useState('');
  const [estaConsultando, setEstaConsultando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [tipoMovimiento, setTipoMovimiento] = useState('');

  // Referencias para controlar el desplazamiento de la pantalla
  const penduloRef = useRef(null);
  const respuestaRef = useRef(null);

  const manejarConsulta = (e) => {
    e.preventDefault();
    if (!pregunta.trim() || !nombre.trim() || !signo) return;

    setEstaConsultando(true);
    setResultado(null);
    setTipoMovimiento('');

    // Desplazar suavemente hacia el péndulo cuando empieza a moverse
    setTimeout(() => {
      penduloRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    // Conexión mística (3.5 segundos de oscilación)
    setTimeout(() => {
      const movimientos = [
        { 
          tipo: 'Circular en sentido horario', 
          dictamen: 'SÍ CLARO Y AFIRMATIVO. Las fuerzas cósmicas indican un camino despejado, lleno de armonía y éxito para tu propósito. Avanza con absoluta confianza.' 
        },
        { 
          tipo: 'Circular en sentido antihorario', 
          dictamen: 'NO ROTUNDO Y ADVERTENCIA. Existen bloqueos densos o energías en oposición en este camino. El cosmos te sugiere detenerte, proteger tu energía y reevaluar la situación por completo.' 
        },
        { 
          tipo: 'Oscilación Lineal Vertical', 
          dictamen: 'PROBABLE Y EVOLUTIVO. La puerta está abierta y el flujo energético es favorable, pero el resultado final dependerá estrictamente de tu determinación y de las acciones que tomes hoy.' 
        },
        { 
          tipo: 'Oscilación Lineal Horizontal', 
          dictamen: 'DUDOSO E INCIERTO. Hay fuerzas en conflicto y confusión en el entorno astral en este momento. El panorama no está claro; la recomendación es serenar la mente y consultar más tarde.' 
        }
      ];

      const azar = movimientos[Math.floor(Math.random() * movimientos.length)];
      
      setTipoMovimiento(azar.tipo);
      setResultado(azar.dictamen);
      setEstaConsultando(false);

      // Desplazar suavemente hacia la respuesta final cuando aparece
      setTimeout(() => {
        respuestaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);

    }, 3500);
  };

  // Función para reiniciar por completo la consulta mística
  const reiniciarConsulta = () => {
    setPregunta('');
    setResultado(null);
    setTipoMovimiento('');
    // Devolvemos la pantalla arriba suavemente al formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-start p-4 selection:bg-purple-500">
      {/* Encabezado */}
      <header className="text-center my-8 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 drop-shadow-lg mb-2">
          PÉNDULO MÍSTICO
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Radiestesia Digital Inmersiva. Introduce tus datos y formula tu pregunta binaria para consultar al cosmos.
        </p>
      </header>

      {/* Formulario Completo Místico */}
      <main className="w-full max-w-lg bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm mb-8">
        <form onSubmit={manejarConsulta} className="space-y-4">
          
          {/* Fila: Nombre */}
          <div>
            <label className="block text-[10px] font-semibold text-purple-400 uppercase tracking-widest mb-1">
              Tu Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled={estaConsultando}
              placeholder="Ej: Carlos"
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all disabled:opacity-50"
              required
            />
          </div>

          {/* Fila: Signo y Edad */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-semibold text-purple-400 uppercase tracking-widest mb-1">
                Signo Zodiacal
              </label>
              <select
                value={signo}
                onChange={(e) => setSigno(e.target.value)}
                disabled={estaConsultando}
                className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all disabled:opacity-50"
                required
              >
                <option value="" disabled>Selecciona</option>
                <option value="Aries">Aries</option>
                <option value="Tauro">Tauro</option>
                <option value="Géminis">Géminis</option>
                <option value="Cáncer">Cáncer</option>
                <option value="Leo">Leo</option>
                <option value="Virgo">Virgo</option>
                <option value="Libra">Libra</option>
                <option value="Escorpio">Escorpio</option>
                <option value="Sagitario">Sagitario</option>
                <option value="Capricornio">Capricornio</option>
                <option value="Acuario">Acuario</option>
                <option value="Piscis">Piscis</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-purple-400 uppercase tracking-widest mb-1">
                Edad
              </label>
              <input
                type="number"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                disabled={estaConsultando}
                placeholder="Edad"
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Fila: Pregunta */}
          <div>
            <label className="block text-[10px] font-semibold text-purple-400 uppercase tracking-widest mb-1">
              Haz tu pregunta de manera clara
            </label>
            <textarea
              rows="2"
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
              disabled={estaConsultando}
              placeholder="¿Es conveniente hacer esta inversión en este momento?..."
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all disabled:opacity-50 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={estaConsultando || !pregunta.trim() || !nombre.trim() || !signo}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-purple-900/30 transition-all transform active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
          >
            {estaConsultando ? 'Conectando con tu energía...' : 'Consultar el Péndulo'}
          </button>
        </form>
      </main>

      {/* SECCIÓN DEL PÉNDULO */}
      <div ref={penduloRef} className="w-full max-w-sm flex flex-col items-center justify-center my-4 min-h-[260px]">
        {estaConsultando && (
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-2 h-24 bg-gradient-to-b from-zinc-700 to-purple-500 origin-top animate-[spin_2s_linear_infinite] rounded-full">
              <div className="absolute -bottom-4 -left-3 w-8 h-8 bg-gradient-to-br from-purple-500 via-indigo-600 to-pink-500 rounded-full shadow-lg shadow-purple-500/50 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>
            </div>
            <p className="text-zinc-500 text-[10px] tracking-widest uppercase animate-pulse">
              Canalizando vibración de {nombre} ({signo})...
            </p>
          </div>
        )}

        {!estaConsultando && !resultado && (
          <div className="text-center p-6 border border-dashed border-zinc-800 rounded-2xl text-zinc-600 max-w-xs">
            <span className="text-2xl block mb-1">✨</span>
            <p className="text-xs">El péndulo permanece inmóvil esperando tu vibración.</p>
          </div>
        )}

        {/* SECCIÓN DE LA RESPUESTA PERSONALIZADA Y COMPLETA */}
        {resultado && (
          <div 
            ref={respuestaRef}
            className="w-full bg-gradient-to-b from-zinc-900 to-black border border-purple-500/30 rounded-2xl p-6 text-center shadow-2xl shadow-purple-950/20 space-y-4"
          >
            <div className="inline-block px-3 py-1 bg-purple-950/50 border border-purple-500/20 rounded-full text-[9px] uppercase font-bold tracking-widest text-purple-400">
              Lectura para {nombre} ({signo})
            </div>
            
            <div>
              <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-0.5">Movimiento Detectado:</div>
              <div className="text-sm font-bold text-pink-400 tracking-wide">{tipoMovimiento}</div>
            </div>
            
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-1"></div>
            
            <div>
              <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">Dictamen Astral:</div>
              <div className="text-base md:text-lg font-medium text-emerald-400 leading-relaxed max-w-sm mx-auto">
                {resultado}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={reiniciarConsulta}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold py-2.5 px-4 rounded-xl border border-zinc-700 transition-all active:scale-95"
              >
                Nueva consulta energética
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-auto py-4 text-[10px] text-zinc-700 tracking-wider uppercase">
        © 2026 Péndulo Místico Pro — Conexión Astro-Digital
      </footer>
    </div>
  );
}