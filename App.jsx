import * as React from "react";

// ==========================================
// CONFIGURACIÓN Y DATA (Mantenible fuera del componente)
// ==========================================
const LOADING_MESSAGES = [
  "Sintonizando frecuencia energética...",
  "Interpretando vibración espiritual...",
  "Analizando movimiento del péndulo...",
  "Canalizando señales intuitivas...",
  "La energía comienza a estabilizarse...",
];

const THEMATIC_RESPONSES = {
  love: [
    "La conexión emocional alrededor de esta situación se siente intensa y auténtica.",
    "El péndulo detecta emociones profundas que aún no han sido expresadas.",
  ],
  money: [
    "La energía financiera muestra posibilidades de crecimiento, aunque requiere paciencia.",
    "Hay señales positivas alrededor de decisiones económicas importantes.",
  ],
  work: [
    "El entorno laboral refleja cambios y oportunidades próximas.",
    "La energía profesional se siente en movimiento y expansión.",
  ],
  default: [
    "La vibración energética muestra señales importantes alrededor de esta decisión.",
    "El péndulo percibe movimientos internos que deben observarse con atención.",
  ],
};

const MOVEMENTS = [
  { name: "Circular horario", interpretation: "La energía fluye positivamente y muestra apertura hacia tu pregunta.", answer: "Sí", energy: "positive" },
  { name: "Circular antihorario", interpretation: "El péndulo percibe bloqueos o señales de espera antes de actuar.", answer: "No", energy: "negative" },
  { name: "Adelante y atrás", interpretation: "La vibración indica claridad y un camino favorable.", answer: "Sí", energy: "positive" },
  { name: "Izquierda y derecha", interpretation: "La energía se siente inestable. Procede con cautela.", answer: "No", energy: "neutral" },
  { name: "Movimiento errático", interpretation: "Las energías aún no están definidas. Reformula tu pregunta.", answer: "Incierto", energy: "confused" },
];

const ZODIAC_ELEMENTS = {
  Aries: "Fuego", Leo: "Fuego", Sagitario: "Fuego",
  Tauro: "Tierra", Virgo: "Tierra", Capricornio: "Tierra",
  Géminis: "Aire", Libra: "Aire", Acuario: "Aire",
  Cáncer: "Agua", Escorpio: "Agua", Piscis: "Agua"
};

// ==========================================
// FUNCIONES AUXILIARES DE LÓGICA DE NEGOCIO
// ==========================================
const detectTheme = (text) => {
  const lower = text.toLowerCase();
  if (/amor|pareja|relaci[oó]n|ex|novi/i.test(lower)) return "love";
  if (/dinero|negocio|ventas|riqueza|invertir/i.test(lower)) return "money";
  if (/empleo|trabajo|empresa|jefe|carrera/i.test(lower)) return "work";
  return "default";
};

const randomFromArray = (array) => array[Math.floor(Math.random() * array.length)];

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function PendulumApp() {
  // Estados de Formulario
  const [consultantName, setConsultantName] = React.useState("");
  const [zodiacSign, setZodiacSign] = React.useState("");
  const [age, setAge] = React.useState("");
  const [question, setQuestion] = React.useState("");

  // Estados de UI y Control de Animación
  const [isSwinging, setIsSwinging] = React.useState(false);
  const [currentLoadingMessage, setCurrentLoadingMessage] = React.useState("");
  const [showResults, setShowResults] = React.useState(false);

  // Estados de Respuesta Mística
  const [readingResult, setReadingResult] = React.useState({
    movement: "",
    interpretation: "",
    directAnswer: "",
    confidence: 0,
    energyState: "neutral"
  });

  React.useEffect(() => {
    document.title = "Péndulo Místico™";
  }, []);

  const startReading = () => {
    if (!question.trim()) return;

    // 1. Inicializar estados de carga y resetear lecturas previas
    setIsSwinging(true);
    setShowResults(false);
    setCurrentLoadingMessage(randomFromArray(LOADING_MESSAGES));

    // Rotación de mensajes mística durante la espera
    const messageInterval = setInterval(() => {
      setCurrentLoadingMessage(randomFromArray(LOADING_MESSAGES));
    }, 2200);

    // 2. Procesar la respuesta en background
    const selectedMovement = randomFromArray(MOVEMENTS);
    const theme = detectTheme(question);
    
    // Parseo de preguntas binarias ("A o B")
    let finalAnswer = selectedMovement.answer;
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes(" o ") || lowerQuestion.includes(" entre ")) {
      const cleanQuestion = question.replace(/\?/g, "").replace(/entre/gi, "").trim();
      const options = cleanQuestion.split(/ o /i);
      if (options.length >= 2) {
        finalAnswer = randomFromArray(options).trim();
      }
    }

    // Personalización del output usando la metadata del usuario (Estrategia PM)
    const element = ZODIAC_ELEMENTS[zodiacSign] || "astral";
    const baseInterpretation = randomFromArray(THEMATIC_RESPONSES[theme]);
    let personalizedText = `${baseInterpretation} ${selectedMovement.interpretation}`;
    
    if (consultantName) personalizedText = `${consultantName}, ${personalizedText.toLowerCase()}`;
    if (zodiacSign) personalizedText += ` Tu naturaleza de elemento ${element} influirá fuertemente en este desenlace.`;

    // Cálculo de confianza preciso
    let calculatedConfidence = Math.floor(Math.random() * 21) + 70; // 70-90%
    if (selectedMovement.name === "Circular horario") calculatedConfidence = 96;
    if (selectedMovement.name === "Movimiento errático") calculatedConfidence = 42;

    // Guardar el resultado calculado pero NO mostrarlo de inmediato
    setReadingResult({
      movement: selectedMovement.name,
      interpretation: personalizedText,
      directAnswer: finalAnswer,
      confidence: calculatedConfidence,
      energyState: selectedMovement.energy
    });

    // 3. Revelación asincrónica (Simular la canalización real de energía)
    const duration = selectedMovement.name === "Movimiento errático" ? 6500 : 5000;
    
    setTimeout(() => {
      clearInterval(messageInterval);
      setIsSwinging(false);
      setShowResults(true);
    }, duration);
  };

  const resetSession = () => {
    setConsultantName("");
    setZodiacSign("");
    setAge("");
    setQuestion("");
    setShowResults(false);
    setIsSwinging(false);
    setReadingResult({
      movement: "",
      interpretation: "",
      directAnswer: "",
      confidence: 0,
      energyState: "neutral"
    });
  };

  // Mapeo de clases de animación CSS según el movimiento del péndulo
  const getPendulumAnimationClass = () => {
    if (!isSwinging && !showResults) return "";
    
    const activeMovement = readingResult.movement;
    if (isSwinging) return "animate-[spin_3s_linear_infinite]"; // Rotación misteriosa neutra mientras carga
    
    switch (activeMovement) {
      case "Circular horario": return "animate-[spin_2s_linear_infinite]";
      case "Circular antihorario": return "animate-[spin_2s_linear_infinite_reverse]";
      case "Adelante y atrás": return "animate-[swing_1.5s_ease-in-out_infinite]";
      case "Izquierda y derecha": return "animate-[sideSwing_1.5s_ease-in-out_infinite]";
      case "Movimiento errático": return "animate-[wiggle_0.5s_ease-in-out_infinite]";
      default: return "";
    }
  };

  return (
    <>
      {/* Estilos inyectados nativamente para evitar dependencias externas en las animaciones complejas */}
      <style>{`
        @keyframes swing {
          0%, 100% { transform: rotateZ(-30deg) rotateX(15deg); }
          50% { transform: rotateZ(30deg) rotateX(-15deg); }
        }
        @keyframes sideSwing {
          0%, 100% { transform: rotateY(-40deg) rotateZ(-10deg); }
          50% { transform: rotateY(40deg) rotateZ(10deg); }
        }
        @keyframes wiggle {
          0%, 100% { transform: translate(2px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-3deg); }
          30% { transform: translate(3px, 2px) rotate(4deg); }
          50% { transform: translate(-2px, 1px) rotate(-2deg); }
          70% { transform: translate(2px, 1px) rotate(3deg); }
          90% { transform: translate(-1px, -1px) rotate(1deg); }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-indigo-950 text-white p-6 overflow-hidden antialiased">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-300 to-fuchsia-400 bg-clip-text text-transparent mb-3 tracking-tight">
              Péndulo Místico™
            </h1>
            <p className="text-fuchsia-300 tracking-[0.3em] uppercase text-xs font-semibold">
              Radiestesia Digital Inmersiva
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* PANEL DE CONTROL / ENTRADAS */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl transition-all duration-300">
              <div className="space-y-5">
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">Tu nombre</label>
                  <input
                    value={consultantName}
                    onChange={(e) => setConsultantName(e.target.value)}
                    placeholder="Ej: Carlos"
                    disabled={isSwinging}
                    className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors disabled:opacity-40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-300">Signo zodiacal</label>
                    <select
                      value={zodiacSign}
                      onChange={(e) => setZodiacSign(e.target.value)}
                      disabled={isSwinging}
                      className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors disabled:opacity-40"
                    >
                      <option value="" className="bg-slate-900">Selecciona</option>
                      {Object.keys(ZODIAC_ELEMENTS).map((sign) => (
                        <option key={sign} value={sign} className="bg-slate-900">{sign}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-300">Edad</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Edad"
                      disabled={isSwinging}
                      className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors disabled:opacity-40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">Haz tu pregunta de manera clara</label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="¿Es conveniente hacer esta inversión en este momento?"
                    disabled={isSwinging}
                    className="w-full h-32 p-4 rounded-2xl bg-black/40 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors resize-none disabled:opacity-40"
                  />
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    onClick={startReading}
                    disabled={isSwinging || !question.trim()}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 font-bold text-lg shadow-lg hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-30 disabled:pointer-events-none"
                  >
                    {isSwinging ? "Canalizando Consulta..." : "Consultar el Péndulo"}
                  </button>

                  <button
                    onClick={resetSession}
                    disabled={isSwinging}
                    className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors disabled:opacity-20"
                  >
                    Nueva consulta energética
                  </button>
                </div>
              </div>
            </div>

            {/* PANEL DE VISUALIZACIÓN / PÉNDULO */}
            <div className="space-y-6">
              <div 
                className="relative h-[550px] rounded-3xl bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl"
                style={{ perspective: "1000px" }}
              >
                {/* Glow de Energía dinámico */}
                <div className={`absolute inset-0 transition-all duration-1000 ease-out ${
                  isSwinging 
                    ? "bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.25),transparent_60%)]"
                    : readingResult.energyState === "positive" && showResults
                    ? "bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.25),transparent_60%)]"
                    : readingResult.energyState === "negative" && showResults
                    ? "bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.20),transparent_60%)]"
                    : readingResult.energyState === "confused" && showResults
                    ? "bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.20),transparent_60%)]"
                    : "bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_60%)]"
                }`}></div>

                {/* Mensaje de carga interactivo en UI */}
                {isSwinging && (
                  <div className="absolute top-12 text-center animate-pulse px-4">
                    <p className="text-purple-300 font-medium tracking-wide text-sm bg-purple-950/40 border border-purple-500/20 px-4 py-2 rounded-full backdrop-blur-md">
                      {currentLoadingMessage}
                    </p>
                  </div>
                )}

                {/* Estructura del Péndulo */}
                <div className="relative flex flex-col items-center h-full pt-10">
                  <div className="w-3 h-3 rounded-full bg-slate-400 z-10 shadow-glow"></div>
                  
                  <div
                    className={`origin-top transition-transform duration-500 ${getPendulumAnimationClass()}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Cuerda */}
                    <div className="w-[2px] h-64 bg-gradient-to-b from-slate-400 via-slate-500 to-slate-700 mx-auto"></div>
                    {/* Cristal / Cuarzo Amuleto */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-200 via-purple-500 to-indigo-950 border-2 border-white/40 shadow-[0_0_50px_rgba(147,51,234,0.6)] relative flex items-center justify-center">
                      <div className="absolute w-12 h-12 rounded-full bg-white/10 blur-sm"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* REVELACIÓN DE RESULTADOS ASÍNCRONOS */}
              {showResults && readingResult.movement && (
                <div className="space-y-4 animate-[fadeIn_0.6s_ease-out]">
                  <div className="bg-black/40 border border-indigo-500/20 rounded-2xl p-5 backdrop-blur-md">
                    <p className="text-indigo-400 uppercase tracking-widest text-xs font-semibold mb-1">
                      Movimiento detectado
                    </p>
                    <h2 className="text-2xl font-black mb-2 text-white">
                      {readingResult.movement}
                    </h2>
                    <p className="text-slate-300 text-base leading-relaxed">
                      {readingResult.interpretation}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-950/40 to-purple-950/40 border border-purple-500/30 rounded-2xl p-5 backdrop-blur-md">
                    <p className="uppercase tracking-widest text-xs font-semibold text-slate-400 mb-1">
                      Dictamen del Oráculo
                    </p>
                    <h2 className="text-4xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                      {readingResult.directAnswer}
                    </h2>
                    
                    <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                        style={{ width: `${readingResult.confidence}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-400 font-medium">
                      Sincronización Energética: {readingResult.confidence}%
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}