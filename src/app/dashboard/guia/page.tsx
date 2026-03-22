"use client";

import { useState } from "react";
import Link from "next/link";

const modules = [
  {
    id: 1,
    title: "Fundamentos",
    sections: [
      {
        title: "Introduccion",
        content: `Remotion es un framework de video basado en React. Cada frame es un render de React — todo lo que sabes de React se aplica a la creacion de videos.

Conceptos clave:
• Frame como unidad de tiempo: A 30fps, el frame 90 = segundo 3
• interpolate(): Mapea frames a valores (opacidad, posicion, escala)
• spring(): Animaciones con fisica realista (rebote, amortiguacion)
• Composition: Unidad de video con resolucion, fps y duracion
• Sequence: Posiciona elementos en el tiempo

Claude Code es un agente IA en tu terminal que lee tu proyecto completo, genera codigo Remotion correcto y ejecuta comandos. Las Agent Skills (40 archivos .md) le dan conocimiento especifico de Remotion.

El flujo: Describes un video → Claude genera codigo → Previsualizas → Iteras → Renderizas`,
      },
      {
        title: "Requisitos Previos",
        content: `Software necesario:
• Node.js v20+ LTS → nodejs.org
• npm v10+ (incluido con Node)
• Claude Code → npm install -g @anthropic-ai/claude-code
• Editor de codigo (VS Code, Cursor, etc.)
• Git (recomendado)

Verificacion rapida:
  node --version    # v20.x.x o superior
  npm --version     # v10.x.x o superior
  claude --version  # Version instalada

Sistema:
• RAM: Minimo 8GB, recomendado 16GB
• Espacio: Al menos 2GB libres
• CPU: Multi-core recomendado para renderizado`,
      },
      {
        title: "Instalacion del Proyecto",
        content: `4 pasos rapidos:

1. Crear proyecto:
   npx create-video@latest mi-proyecto

2. Instalar y arrancar:
   cd mi-proyecto && npm install && npm run dev

3. Instalar Agent Skills (otra terminal):
   npx skills add remotion-dev/skills

4. Abrir Claude Code (otra terminal):
   claude

Estructura creada:
  mi-proyecto/
    src/Root.tsx              → Registro de composiciones
    src/MyComp/Main.tsx       → Componente principal
    public/                   → Assets estaticos
    package.json              → Dependencias
    remotion.config.ts        → Configuracion

Tip: Selecciona template "Blank" para empezar limpio.`,
      },
    ],
  },
  {
    id: 2,
    title: "Las 40 Skills de Remotion",
    sections: [
      {
        title: "Animacion y Movimiento",
        content: `• animations — Fade, scale, rotate, translate, parallax con interpolate/spring
• timing — Springs naturales, easings cubicos, bezier custom, delays
• sequencing — Stagger de elementos, entradas escalonadas, Series
• transitions — TransitionSeries: crossfade, slide, wipe, flip, clockWipe
• text-animations — Typewriter, reveal por palabra, highlight, contador
• trimming — Recortar inicio/final de cualquier animacion
• stagger — Entrada secuencial de multiples elementos
• easing — Funciones de aceleracion (cubic, bezier, bounce)
• loop — Repetir animaciones con Loop component
• freeze — Congelar un frame especifico con Freeze`,
      },
      {
        title: "Media y Contenido",
        content: `• videos — OffthreadVideo: incrustar, recortar, slow-mo, loop
• audio — Musica de fondo, fade volumen, velocidad, multiples pistas
• images — Img con delayRender para carga garantizada
• gifs — GIFs sincronizados con timeline, control frame a frame
• assets — staticFile() para public/, gestion centralizada
• lottie — Animaciones After Effects via JSON con @remotion/lottie`,
      },
      {
        title: "Texto y Subtitulos",
        content: `• subtitles — Formato Caption {text, startMs, endMs}
• display-captions — Subtitulos con highlight de palabra activa
• import-srt-captions — Importar archivos .srt existentes
• transcribe-captions — Generar subtitulos desde audio con IA
• measuring-text — Medir dimensiones de texto para layouts
• fonts — Google Fonts con loadFont(), fuentes locales`,
      },
      {
        title: "Datos, Efectos y Utilidades",
        content: `Datos:
• charts — Barras animadas, pie charts, lineas SVG
• maps — Mapbox con animacion de coordenadas y zoom
• parameters — Zod schemas para videos parametrizables
• calculate-metadata — Duracion dinamica basada en datos

Efectos:
• 3d — Three.js con ThreeCanvas, rotaciones, materiales
• light-leaks — Fugas de luz cinematicas
• transparent-videos — Canal alpha (VP9 WebM o ProRes 4444)
• audio-visualization — Espectro, waveforms, reactivo al bajo
• voiceover — Voz IA con ElevenLabs
• sfx — Efectos de sonido sincronizados

Utilidades:
• tailwind — Solo para layouts, NUNCA para animaciones
• compositions — Estructura, folders, stills, schemas
• can-decode — Verificar compatibilidad de codec
• extract-frames — Sacar frames individuales
• get-audio/video-duration — Medicion de media
• measuring-dom-nodes — Layouts dinamicos`,
      },
    ],
  },
  {
    id: 3,
    title: "Creacion de Videos",
    sections: [
      {
        title: "Crear un Video desde Cero",
        content: `1. Abre Claude Code en la carpeta del proyecto: claude
2. Formula tu primer prompt con estos datos:
   - Resolucion y formato (ej: 1080x1920 vertical)
   - Duracion y FPS (ej: 15 segundos a 30fps = 450 frames)
   - Estructura de escenas (que pasa en cada una)
   - Estilo visual (colores hex, fuentes, estetica)
   - Tipo de animaciones (springs, transiciones)

Ejemplo de prompt:
"Crea un video Remotion vertical 1080x1920 de 15 segundos a 30fps.
Escena 1 (0-5s): Fondo gradiente #667eea a #764ba2, texto 'Hola Mundo'
con spring({damping:200}) desde abajo.
Escena 2 (5-10s): Fondo #0f0f0f, tres bullets con stagger de 15 frames.
Escena 3 (10-15s): Logo centrado con scale spring({damping:20}).
Transiciones: TransitionSeries con slide desde izquierda.
Fuente: Inter via @remotion/google-fonts."

3. Claude genera los archivos
4. Abre Remotion Studio: localhost:3100
5. Itera con cambios especificos`,
      },
      {
        title: "Editar Video Existente",
        content: `Puedes usar Remotion para editar clips ya grabados:

Incrustar video existente:
  <OffthreadVideo src={staticFile("mi-clip.mp4")} />

Recortar (de segundo 5 a segundo 20):
  <OffthreadVideo src={...} startFrom={150} endAt={600} />

Prompts tipicos de edicion:
• "Importa el video base.mp4 y anade subtitulos animados"
• "Recorta el video de 0:05 a 0:20 y anade un titulo superior"
• "Anade un lower third con mi nombre en la esquina inferior"
• "Inserta B-roll en la escena 2 sobre el clip principal"
• "Cambia la velocidad del clip a 1.5x en la seccion central"

Patron de B-roll:
  <Sequence from={150} durationInFrames={90}>
    <AbsoluteFill style={{zIndex: 2}}>
      <OffthreadVideo src={staticFile("broll.mp4")} />
    </AbsoluteFill>
  </Sequence>`,
      },
    ],
  },
  {
    id: 4,
    title: "Prompting PRO",
    sections: [
      {
        title: "Reglas de Oro del Prompting",
        content: `1. Se NUMERICO siempre:
   MAL:  "un azul bonito"
   BIEN: "#667eea"
   MAL:  "que dure un rato"
   BIEN: "5 segundos (150 frames a 30fps)"

2. Especifica SPRINGS con parametros:
   MAL:  "animacion suave"
   BIEN: "spring({damping:200, stiffness:100, mass:1})"

3. Da ESTRUCTURA de escenas:
   MAL:  "haz un video de producto"
   BIEN: "Escena 1 (0-90): Hero. Escena 2 (90-240): Features..."

4. Pide ARQUITECTURA antes de CODIGO:
   "Primero dame un storyboard textual con timing por escena.
    No generes codigo todavia."

5. Itera INCREMENTALMENTE:
   Primero: Layout y estructura
   Segundo: Animaciones y transiciones
   Tercero: Colores, fuentes, detalles
   Cuarto: Audio y efectos finales`,
      },
      {
        title: "Anti-patrones a Evitar",
        content: `NUNCA hagas esto en Remotion:
• CSS transitions/keyframes → Usa interpolate/spring
• Tailwind animate-* → Usa APIs de Remotion
• useFrame de React Three Fiber → Usa useCurrentFrame de Remotion
• <img> tag de HTML → Usa <Img> de Remotion
• Nombres de color CSS ("red") → Usa hex (#ff0000)
• setTimeout/setInterval → Usa el frame actual
• requestAnimationFrame → Remotion controla los frames

Errores de prompting:
• Pedir todo de una vez → Divide en fases
• No dar medidas exactas → Siempre px, hex, fps, frames
• Ignorar las skills → Mencionalas explicitamente
• No previsualizar → Revisa cada iteracion`,
      },
    ],
  },
  {
    id: 5,
    title: "Renderizado y Exportacion",
    sections: [
      {
        title: "Comandos de Render",
        content: `Render basico MP4:
  npx remotion render src/remotion/index.ts MiVideo out/video.mp4

Calidad alta:
  npx remotion render ... --codec h264 --crf 16

Solo probar 3 segundos:
  npx remotion render ... --frames 0-89

GIF animado:
  npx remotion render ... --codec gif --every-nth-frame 2

ProRes (edicion):
  npx remotion render ... --codec prores --prores-profile 4444

WebM transparente:
  npx remotion render ... --codec vp8 --pixel-format yuva420p`,
      },
      {
        title: "Presets por Plataforma",
        content: `YouTube:  H.264, CRF 16-18, 1920x1080, < 256GB
TikTok:  H.264, CRF 18-20, 1080x1920, < 287MB
Instagram Reel: H.264, CRF 18-20, 1080x1920, < 250MB
Instagram Feed: H.264, CRF 18-20, 1080x1080, < 650MB
LinkedIn: H.264, CRF 18, 1920x1080, < 5GB
Twitter:  H.264, CRF 20-22, 1280x720, < 512MB

Multiples variantes automatizadas:
  for lang in es en fr; do
    npx remotion render ... --props="{\\"idioma\\":\\"$lang\\"}" out/video-$lang.mp4
  done`,
      },
    ],
  },
  {
    id: 6,
    title: "Troubleshooting",
    sections: [
      {
        title: "Problemas Comunes y Soluciones",
        content: `"Could not read package.json"
→ La carpeta no es un proyecto Remotion. Repite npx create-video@latest

"npx.ps1 cannot be loaded" (Windows PowerShell)
→ Usa CMD en lugar de PowerShell, o ejecuta:
  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

Claude no ve las skills
→ Verifica que ejecutaste "npx skills add remotion-dev/skills" en la raiz
→ Comprueba que existe .agents/skills/ con archivos SKILL.md

Video se renderiza en negro
→ Verifica que el Composition ID coincide con el del render
→ Revisa que los componentes estan registrados en Root.tsx

Animaciones no funcionan
→ Asegurate de usar interpolate/spring de "remotion", no CSS
→ Verifica que useCurrentFrame() esta importado de "remotion"

Fuentes no cargan
→ Usa loadFont de @remotion/google-fonts, no links CSS
→ Llama a loadFont() fuera del componente

Assets no se encuentran
→ Colocalos en public/ y usa staticFile("nombre.ext")
→ Los nombres son case-sensitive en Linux/Mac`,
      },
    ],
  },
  {
    id: 7,
    title: "SuperConstructor Dashboard",
    sections: [
      {
        title: "Que es y Como Usarlo",
        content: `El SuperConstructor es tu centro de control en localhost:3001/dashboard.
Tiene 8 tabs que cubren todo el flujo de produccion:

🗺 Roadmap — Flujo visual de los 7 pasos de generacion
⚙ Config — Specs tecnicas (plataforma, resolucion, fps, duracion)
✏ Prompts — Constructor de prompts por secciones
📚 Skills — Referencia de las 40 skills con ejemplos
📋 Templates — 8 plantillas listas para copiar/personalizar
▶ Render — Generador de comandos de render
{} JSON — Parametrizacion con Zod schemas
🔧 Custom Skills — Crear tus propias skills de marca

Flujo recomendado:
  Config → Prompts → (consulta Skills) → Copiar → Claude Code → Studio → Render`,
      },
      {
        title: "Ejercicio Rapido: Tu Primer Video en 5 Min",
        content: `1. Tab Config: Selecciona TikTok (1080x1920, 30fps, 15s)
2. Tab Templates: "Reel para Redes Sociales" → Copiar
3. Terminal: cd tu-proyecto && claude
4. Pega el prompt en Claude Code
5. Abre localhost:3100 y verifica
6. Itera: "Cambia el color de la escena 1 a #FF6B35"
7. Tab Render: Genera comando y ejecuta:
   npx remotion render src/remotion/index.ts TikTokReel out/reel.mp4 --codec h264 --crf 18`,
      },
      {
        title: "Skills Personalizadas",
        content: `Tab Custom Skills te permite crear reglas propias para Claude:

1. Define nombre, tags y descripcion
2. Escribe las reglas en markdown:
   - Colores de tu marca (hex)
   - Fuentes permitidas
   - Tipos de animacion preferidos
   - Posicion del logo
   - Anti-patrones de tu marca
3. Guarda en .agents/skills/tu-skill/SKILL.md

Beneficios:
• Consistencia en todos los videos
• No repites instrucciones de marca
• Todo el equipo genera con la misma estetica`,
      },
    ],
  },
];

export default function GuiaPage() {
  const [activeModule, setActiveModule] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  const mod = modules[activeModule];
  const section = mod?.sections[activeSection];

  return (
    <div className="flex gap-6 min-h-[calc(100vh-80px)]">
      {/* Sidebar - Modulos */}
      <nav className="w-64 shrink-0 border-r border-unfocused-border-color pr-4">
        <h2 className="text-sm font-bold text-foreground mb-4">
          Modulos del Curso
        </h2>
        {modules.map((m, mi) => (
          <div key={m.id} className="mb-3">
            <button
              onClick={() => {
                setActiveModule(mi);
                setActiveSection(0);
              }}
              className={`w-full text-left text-sm px-3 py-2 rounded-geist transition-colors ${
                activeModule === mi
                  ? "bg-foreground/10 text-foreground font-semibold"
                  : "text-subtitle hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              M{m.id}: {m.title}
            </button>
            {activeModule === mi && (
              <div className="ml-4 mt-1 space-y-1">
                {m.sections.map((s, si) => (
                  <button
                    key={si}
                    onClick={() => setActiveSection(si)}
                    className={`w-full text-left text-xs px-2 py-1 rounded transition-colors ${
                      activeSection === si
                        ? "text-foreground font-medium bg-foreground/5"
                        : "text-subtitle hover:text-foreground"
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="mt-6 pt-4 border-t border-unfocused-border-color">
          <Link
            href="/dashboard"
            className="text-xs text-subtitle hover:text-foreground transition-colors"
          >
            ← Volver al Dashboard
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 max-w-3xl">
        <div className="mb-4">
          <span className="text-xs text-subtitle">
            Modulo {mod?.id} de {modules.length}
          </span>
          <h1 className="text-2xl font-bold text-foreground">{mod?.title}</h1>
        </div>

        {section && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {section.title}
            </h2>
            <div className="whitespace-pre-wrap text-sm text-foreground/90 leading-relaxed font-mono bg-foreground/[0.03] border border-unfocused-border-color rounded-geist p-geist">
              {section.content}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-4 border-t border-unfocused-border-color">
          <button
            onClick={() => {
              if (activeSection > 0) {
                setActiveSection(activeSection - 1);
              } else if (activeModule > 0) {
                const prevMod = modules[activeModule - 1];
                setActiveModule(activeModule - 1);
                setActiveSection((prevMod?.sections.length ?? 1) - 1);
              }
            }}
            disabled={activeModule === 0 && activeSection === 0}
            className="text-sm text-subtitle hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Anterior
          </button>
          <span className="text-xs text-subtitle">
            {activeSection + 1} / {mod?.sections.length}
          </span>
          <button
            onClick={() => {
              if (activeSection < (mod?.sections.length ?? 0) - 1) {
                setActiveSection(activeSection + 1);
              } else if (activeModule < modules.length - 1) {
                setActiveModule(activeModule + 1);
                setActiveSection(0);
              }
            }}
            disabled={
              activeModule === modules.length - 1 &&
              activeSection === (mod?.sections.length ?? 0) - 1
            }
            className="text-sm text-subtitle hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
