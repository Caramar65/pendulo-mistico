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

  // NUEVO MOTOR DE EXTRACCIÓN BLINDADO
  const extraerOpcionesInteligente = (texto) => {
    // 1. Limpiamos signos de interrogación, exclamación y puntos
    let limpio = texto.replace(/[¿?¡!.]/g, '');
    
    // 2. Si el usuario usó dos puntos ":", tomamos solo lo que está después de los dos puntos
    if (limpio.includes(':')) {
      limpio = limpio.split(':').pop();
    }
    
    // 3. Separamos la frase buscando la letra "o" o "O" que tenga espacios a los lados
    const partes = limpio.split(/\s+[oO]\s+/);
    
    if (partes.length >= 2) {
      // Limpiamos espacios sobrantes de las dos opciones resultantes
      const opcion1 = partes[partes.length - 2].trim();
      const opcion2 = partes[partes.length - 1].trim();
      
      if (opcion1 && opcion2) {
        return [opcion1, opcion2];
      }
    }
    return null;
  };

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
      // Ejecutamos el extractor blindado
      const opcionesDetectadas = extraerOpcionesInteligente(pregunta);
      
      let movimientos = [];

      if (opcionesDetectadas) {
        const [op1, op2] = opcionesDetectadas;
        
        movimientos = [
          { 
            tipo: 'Vórtice Circular Horario (Alineación Absoluta)', 
            dictamen: {
              veredicto: `INCLINACIÓN ENERGÉTICA: ${op1.toUpperCase()}`,
              revelacion: `El péndulo dibuja un círculo perfecto de luz sobre la frecuencia de ${op1}. Los astros y las corrientes del destino se concentran con gran magnetismo sobre esta opción, disipando cualquier rastro de duda en el tejido del tiempo.`,
              consejo: `El cosmos habla con claridad para ti, ${nombre}. El camino de ${op1} posee la fuerza y la alineación vibratoria para manifestarse con éxito en tu realidad.`
            }
          },
          { 
            tipo: 'Vórtice Circular Antihorario (Alineación Absoluta)', 
            dictamen: {
              veredicto: `INCLINACIÓN ENERGÉTICA: ${op2.toUpperCase()}`,
              revelacion: `El péndulo rompe la inercia y gira con fuerza liberadora hacia el campo magnético de ${op2}. La geometría sagrada del universo rechaza las alternativas y concentra toda la energía de realización en este sendero específico.`,
              consejo: `Presta atención a las señales, ${nombre}. El flujo cósmico decreta que la vibración de ${op2} es la que contiene la llave de la manifestación.`
            }
          }
        ];
      } else {
        // Respuestas generales simplificadas solo si NO se detectan dos opciones con la letra "o"
        movimientos = [
          { 
            tipo: 'Vórtice Circular Horario (Alineación de Luz)', 
            dictamen: {
              veredicto: 'SÍ CLARO Y EVOLUTIVO',
              revelacion: 'El péndulo dibuja la geometría sagrada del éxito. Las corrientes universales se han alineado en perfecta sincronía con tu vibración.',
              consejo: 'Avanza con absoluta certeza y firmeza. Las fuerzas cósmicas respaldan tu intención.'
            }
          }
        ];
      }

      // Selección aleatoria dentro del contexto correcto
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

  const reiniciarConsulta = () => {
    setPregunta('');
    setResultado(null);
    setTipoMovimiento('');
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
          
          {/* Nombre */}
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

          {/* Signo y Edad */}
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

          {/* Pregunta */}
          <div>
            <label className="block text-[10px] font-semibold text-purple-400 uppercase tracking-widest mb-1">
              Haz tu pregunta de manera clara
            </label>
            <textarea
              rows="2"
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
              disabled={estaConsultando}
              placeholder="¿Quien quedara de presidente en colombia: Abelardo o cepeda?..."
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

        {/* RESPUESTA PERSONALIZADA ASIGNANDO LAS OPCIONES REALES */}
        {resultado && (
          <div 
            ref={respuestaRef}
            className="w-full bg-gradient-to-b from-zinc-900 to-black border border-purple-500/30 rounded-2xl p-6 text-center shadow-2xl shadow-purple-950/20 space-y-4 animate-[fadeIn_0.6s_ease-out]"
          >
            <div className="inline-block px-3 py-1 bg-purple-950/50 border border-purple-500/20 rounded-full text-[9px] uppercase font-bold tracking-widest text-purple-400">
              Lectura Personalizada para {nombre} ({signo})
            </div>
            
            <div>
              <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-0.5">Fluctuación Radiestésica:</div>
              <div className="text-sm font-bold text-pink-400 tracking-wide">{tipoMovimiento}</div>
            </div>
            
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-1"></div>
            
            <div className="text-left space-y-3 bg-black/40 p-4 rounded-xl border border-zinc-800/60">
              <div>
                <div className="text-green-400 text-[11px] font-bold uppercase tracking-wider mb-1">⚡ Dictamen Astral:</div>
                <div className="text-white text-sm font-extrabold tracking-wide mb-1 text-center bg-zinc-900/50 py-1.5 rounded border border-zinc-800 px-2">
                  {resultado.veredicto}
                </div>
                <p className="text-zinc-300 text-xs leading-relaxed font-light mt-2">
                  {resultado.revelacion}
                </p>
              </div>
              
              <div className="pt-2 border-t border-zinc-900">
                <div className="text-purple-400 text-[11px] font-bold uppercase tracking-wider mb-1">🔮 Guía del Cosmos:</div>
                <p className="text-zinc-400 text-xs leading-relaxed italic">
                  "{resultado.consejo}"
                </p>
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