"use client";

import { useState, useCallback } from "react";
import { cn } from "../../lib/utils";

// ---------------------------------------------------------------------------
// Quick-action definitions
// ---------------------------------------------------------------------------

interface QuickAction {
  id: string;
  icon: string;
  title: string;
  duration: string;
  platform: string;
  prompt: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "reel-vertical",
    icon: "🎬",
    title: "Reel Vertical 15s",
    duration: "15 seg",
    platform: "TikTok / Instagram",
    prompt: `Crea un video Remotion vertical para TikTok/Instagram Reels con estas specs:

ESPECIFICACIONES TECNICAS:
- Resolucion: 1080x1920 (vertical 9:16)
- FPS: 30
- Duracion: 15 segundos (450 frames)
- Composition ID: "SocialReel"

ESCENAS:
1. (frames 0-150 / 0-5s) HOOK
   - Fondo: gradiente radial de #667eea a #764ba2
   - Texto principal: "¿Sabias que...?" en Inter Bold 72px blanco
   - Animacion: spring({fps:30, damping:200}) desde translateY(100px) a translateY(0)
   - Opacidad: interpolate(frame, [0,20], [0,1], {extrapolateRight:"clamp"})

2. (frames 150-300 / 5-10s) CONTENIDO
   - Fondo: #0f0f0f
   - Transicion: TransitionSeries con slide({direction:"from-right"})
   - 3 bullets de texto (Inter Regular 36px, blanco):
     * "Punto 1: [tu contenido]"
     * "Punto 2: [tu contenido]"
     * "Punto 3: [tu contenido]"
   - Stagger: cada bullet entra 15 frames despues del anterior
   - Animacion por bullet: spring({fps:30, damping:100}) en opacidad y translateX(-30 a 0)

3. (frames 300-450 / 10-15s) CTA
   - Fondo: gradiente lineal de #667eea a #764ba2
   - Logo centrado (200x200px) con scale spring({fps:30, damping:20})
   - Texto CTA: "Sigueme para mas" en Inter Bold 48px blanco
   - Entrada del CTA: delay 20 frames despues del logo, fade in con interpolate

REGLAS TECNICAS:
- Usar useCurrentFrame() y useVideoConfig() de "remotion"
- Animaciones SOLO con interpolate() y spring() de "remotion"
- Fuente: loadFont() de @remotion/google-fonts/Inter
- Assets en public/ referenciados con staticFile()
- Usar AbsoluteFill para contenedores
- Usar TransitionSeries de @remotion/transitions para transiciones entre escenas
- Registrar composicion en Root.tsx con schema Zod`,
  },
  {
    id: "product-demo",
    icon: "🛍️",
    title: "Demo de Producto 30s",
    duration: "30 seg",
    platform: "YouTube / Web",
    prompt: `Crea un video Remotion horizontal para demo de producto con estas specs:

ESPECIFICACIONES TECNICAS:
- Resolucion: 1920x1080 (horizontal 16:9)
- FPS: 30
- Duracion: 30 segundos (900 frames)
- Composition ID: "ProductDemo"

ESCENAS:
1. (frames 0-150 / 0-5s) INTRO CON LOGO
   - Fondo: gradiente lineal 135deg de #1a1a2e a #16213e
   - Logo centrado (300x300px) con scale spring({fps:30, damping:12, mass:0.5})
   - Particulas flotantes: 20 circulos de 4px #ffffff15 con movimiento sinusoidal
   - Nombre de marca debajo del logo: Inter Bold 48px #e2e8f0
   - Animacion nombre: interpolate(frame, [30,60], [0,1]) opacidad + translateY(20 a 0)

2. (frames 150-360 / 5-12s) HERO DEL PRODUCTO
   - Fondo: #0a0a0a
   - Transicion: fade({}) de @remotion/transitions
   - Imagen del producto centrada (800x600px) con sombra 0 20px 60px rgba(0,0,0,0.5)
   - Animacion entrada: spring({fps:30, damping:80}) scale(0.8 a 1) + opacidad
   - Texto headline: Inter Bold 56px blanco, max-width 600px, centrado arriba
   - Headline entrada: delay 15 frames, spring en translateY(40 a 0)

3. (frames 360-630 / 12-21s) FEATURES (3 bloques secuenciales)
   - Fondo: #0f172a
   - Transicion: slide({direction:"from-bottom"})
   - Layout: icono izquierda (64x64px) + texto derecha
   - Feature 1 (frames 360-450): icono + titulo Inter SemiBold 32px #60a5fa + desc Inter Regular 24px #94a3b8
   - Feature 2 (frames 450-540): mismo layout, color icono #34d399
   - Feature 3 (frames 540-630): mismo layout, color icono #f472b6
   - Cada feature: spring({fps:30, damping:100}) en opacidad y translateX(-50 a 0)

4. (frames 630-900 / 21-30s) CTA FINAL
   - Fondo: gradiente lineal 135deg de #667eea a #764ba2
   - Texto CTA: Inter Bold 64px blanco "Descubrelo Ahora"
   - Animacion: spring({fps:30, damping:15, mass:0.8}) en scale
   - Boton CTA: rounded-full bg-white text-#764ba2 px-12 py-4
   - URL debajo: Inter Regular 28px #e2e8f0 con opacidad 0.8
   - Entrada URL: delay 30 frames, interpolate opacidad [0,1]

REGLAS TECNICAS:
- Usar useCurrentFrame() y useVideoConfig() de "remotion"
- Animaciones SOLO con interpolate() y spring() de "remotion"
- Fuente: loadFont() de @remotion/google-fonts/Inter
- Assets en public/ referenciados con staticFile()
- Usar AbsoluteFill para contenedores
- Usar TransitionSeries de @remotion/transitions para transiciones entre escenas
- Registrar composicion en Root.tsx con schema Zod
- Usar Sequence para timing de cada escena`,
  },
  {
    id: "logo-reveal",
    icon: "✨",
    title: "Logo Reveal 5s",
    duration: "5 seg",
    platform: "Universal",
    prompt: `Crea una animacion Remotion de logo reveal con estas specs:

ESPECIFICACIONES TECNICAS:
- Resolucion: 1920x1080 (horizontal 16:9)
- FPS: 30
- Duracion: 5 segundos (150 frames)
- Composition ID: "LogoReveal"

FASES DE ANIMACION:
1. (frames 0-30 / 0-1s) PREPARACION
   - Fondo: #000000 solido
   - Linea horizontal centrada: width 0 a 200px, height 2px, color #ffffff
   - Animacion linea: interpolate(frame, [0,30], [0,200], {extrapolateRight:"clamp"})
   - Opacidad linea: interpolate(frame, [0,10], [0,1])

2. (frames 30-60 / 1-2s) EXPANSION
   - La linea se expande: width 200px a 100% del viewport
   - interpolate(frame, [30,60], [200, 1920])
   - Simultaneamente height crece: 2px a 4px
   - Flash blanco sutil: un div fullscreen con opacidad interpolate(frame, [55,60,65], [0, 0.3, 0])

3. (frames 60-110 / 2-3.7s) LOGO REVEAL
   - Logo centrado (400x400px) aparece desde scale 0
   - spring({fps:30, damping:10, mass:0.4, stiffness:100}) en scale
   - Glow detras del logo: box-shadow 0 0 80px 40px rgba(102,126,234,0.4)
   - El glow pulsa: opacidad interpolate con sin(frame*0.1) * 0.3 + 0.7
   - Linea horizontal desaparece: interpolate(frame, [60,75], [1,0]) opacidad

4. (frames 110-150 / 3.7-5s) TAGLINE + SETTLE
   - Texto tagline debajo del logo: Inter Medium 32px #a0aec0
   - Entrada: spring({fps:30, damping:200}) en translateY(30 a 0) + opacidad
   - Logo settle: escala micro-bounce spring({fps:30, damping:8}) de 1.02 a 1.0
   - Fondo transiciona: #000000 a #0a0a0a muy sutil

REGLAS TECNICAS:
- Usar useCurrentFrame() y useVideoConfig() de "remotion"
- Animaciones SOLO con interpolate() y spring() de "remotion"
- Fuente: loadFont() de @remotion/google-fonts/Inter
- Logo en public/logo.png referenciado con staticFile("logo.png")
- Usar AbsoluteFill para el contenedor principal
- Usar Img de "remotion" para el logo
- Math.sin() permitido para efectos de pulso
- Registrar composicion en Root.tsx con schema Zod`,
  },
  {
    id: "explainer",
    icon: "📚",
    title: "Explicativo 60s",
    duration: "60 seg",
    platform: "YouTube / Redes",
    prompt: `Crea un video Remotion explicativo/educativo con estas specs:

ESPECIFICACIONES TECNICAS:
- Resolucion: 1920x1080 (horizontal 16:9)
- FPS: 30
- Duracion: 60 segundos (1800 frames)
- Composition ID: "Explainer60"

ESCENAS:
1. (frames 0-180 / 0-6s) TITULO + GANCHO
   - Fondo: #1e1b4b con patron de puntos subtle (dots grid 20px gap, #ffffff08)
   - Numero grande "01" en Inter Black 200px #6366f1 con opacidad 0.15, posicion top-right
   - Titulo: Inter Bold 64px blanco, max-width 900px, centrado
   - Subtitulo: Inter Regular 28px #a5b4fc, debajo del titulo
   - Animacion titulo: spring({fps:30, damping:100}) translateY(60 a 0) + opacidad
   - Animacion subtitulo: delay 20 frames, mismo spring

2. (frames 180-540 / 6-18s) CONCEPTO 1 - PROBLEMA
   - Fondo: #0f172a
   - Transicion: wipe({direction:"from-left"}) de @remotion/transitions
   - Layout split: izquierda texto (50%), derecha ilustracion (50%)
   - Titulo seccion: Inter SemiBold 40px #f87171 con icono alerta
   - 4 lineas de texto explicativo: Inter Regular 26px #e2e8f0, line-height 1.6
   - Cada linea entra con stagger de 20 frames
   - Ilustracion derecha: SVG o imagen 400x400px con spring scale

3. (frames 540-900 / 18-30s) CONCEPTO 2 - SOLUCION
   - Fondo: #0f172a
   - Transicion: slide({direction:"from-right"})
   - Layout split invertido: ilustracion izquierda, texto derecha
   - Titulo seccion: Inter SemiBold 40px #34d399 con icono check
   - 4 lineas explicativas con stagger de 20 frames
   - Highlight box: border-left 4px #34d399, bg #34d39910, padding 16px
   - Animacion highlight: interpolate width de 0 a 100%

4. (frames 900-1260 / 30-42s) CONCEPTO 3 - COMO FUNCIONA
   - Fondo: #1a1a2e
   - Transicion: fade({})
   - 3 pasos en layout horizontal con flechas entre ellos
   - Cada paso: icono 48px + titulo Inter SemiBold 28px + desc Inter Regular 22px
   - Colores pasos: #60a5fa, #a78bfa, #34d399
   - Stagger pasos: 40 frames entre cada uno
   - Flechas animadas: interpolate width de 0 a 60px entre cada paso

5. (frames 1260-1530 / 42-51s) DATOS / ESTADISTICAS
   - Fondo: #0a0a0a
   - Transicion: slide({direction:"from-bottom"})
   - 3 numeros grandes animados (contador de 0 a valor final)
   - Numeros: Inter Black 80px con colores #60a5fa, #f472b6, #fbbf24
   - Animacion contador: interpolate(frame, [start, start+60], [0, targetValue])
   - Label debajo: Inter Regular 24px #94a3b8
   - Barra de progreso debajo de cada numero

6. (frames 1530-1800 / 51-60s) CIERRE + CTA
   - Fondo: gradiente 135deg de #4f46e5 a #7c3aed
   - Logo centrado con spring scale
   - Texto resumen: Inter Bold 48px blanco
   - CTA: Inter SemiBold 32px blanco con underline animado
   - Redes sociales iconos: 3 iconos en fila, stagger 10 frames
   - Fade out general en ultimos 30 frames

REGLAS TECNICAS:
- Usar useCurrentFrame() y useVideoConfig() de "remotion"
- Animaciones SOLO con interpolate() y spring() de "remotion"
- Fuente: loadFont() de @remotion/google-fonts/Inter
- Assets en public/ referenciados con staticFile()
- Usar AbsoluteFill, Sequence para contenedores y timing
- Usar TransitionSeries de @remotion/transitions para transiciones
- Math.round() para contadores animados de numeros
- Registrar composicion en Root.tsx con schema Zod`,
  },
  {
    id: "data-dashboard",
    icon: "📊",
    title: "Data Dashboard 20s",
    duration: "20 seg",
    platform: "Presentaciones / Web",
    prompt: `Crea un video Remotion con dashboard de datos animado con estas specs:

ESPECIFICACIONES TECNICAS:
- Resolucion: 1920x1080 (horizontal 16:9)
- FPS: 30
- Duracion: 20 segundos (600 frames)
- Composition ID: "DataDashboard"

ESCENAS:
1. (frames 0-90 / 0-3s) TITULO DEL DASHBOARD
   - Fondo: #0f172a
   - Grid lines sutiles: 1px #1e293b cada 60px
   - Titulo: Inter Bold 52px blanco "Dashboard de Metricas"
   - Fecha: Inter Regular 24px #64748b "Enero 2025"
   - Animacion: spring({fps:30, damping:150}) translateY(40 a 0) + opacidad
   - 4 mini KPI cards aparecen en fila: stagger 10 frames cada una

2. (frames 90-270 / 3-9s) KPI CARDS + GRAFICO DE BARRAS
   - Layout: 4 KPI cards arriba (25% cada una), grafico de barras abajo
   - KPI cards: bg #1e293b, rounded 12px, padding 20px
     * Card 1: "Usuarios" 12,847 (+23%) color #60a5fa
     * Card 2: "Ingresos" $45.2K (+18%) color #34d399
     * Card 3: "Conversion" 3.2% (+0.5%) color #a78bfa
     * Card 4: "Retencion" 89% (-2%) color #fbbf24
   - Numeros animados: interpolate de 0 al valor en 45 frames
   - Porcentaje cambio: verde para +, rojo para -
   - Grafico de barras: 7 barras (Lun-Dom)
   - Cada barra crece de height 0 a su valor con spring({fps:30, damping:80})
   - Stagger barras: 8 frames entre cada una
   - Colores barras: gradiente vertical #6366f1 a #8b5cf6

3. (frames 270-450 / 9-15s) GRAFICO DE LINEA ANIMADO
   - Fondo: #0f172a
   - Transicion: fade({})
   - Eje X: 12 meses, Inter Regular 18px #64748b
   - Eje Y: valores 0-100, Inter Regular 18px #64748b
   - Linea 1 (principal): #6366f1 stroke 3px
   - Linea 2 (comparativa): #64748b stroke 2px dashed
   - Animacion: SVG path con strokeDashoffset animado
     * dashArray = pathLength, dashOffset = interpolate(frame, [270,390], [pathLength, 0])
   - Area debajo de linea 1: fill gradiente #6366f120 a transparent
   - Punto highlight en max valor: circulo 8px #6366f1 con pulse

4. (frames 450-600 / 15-20s) PIE CHART + RESUMEN
   - Layout: pie chart izquierda (40%), resumen derecha (60%)
   - Pie chart SVG con 4 segmentos:
     * Segmento 1: 40% #6366f1
     * Segmento 2: 25% #34d399
     * Segmento 3: 20% #f472b6
     * Segmento 4: 15% #fbbf24
   - Animacion: cada segmento crece con interpolate en strokeDashoffset
   - Stagger: 15 frames entre segmentos
   - Leyenda derecha: color dot + label + porcentaje
   - Texto resumen: Inter SemiBold 28px blanco con highlight keywords
   - Fade out general en ultimos 20 frames

REGLAS TECNICAS:
- Usar useCurrentFrame() y useVideoConfig() de "remotion"
- Animaciones SOLO con interpolate() y spring() de "remotion"
- Fuente: loadFont() de @remotion/google-fonts/Inter
- SVG inline para graficos (no librerias externas)
- Usar AbsoluteFill y Sequence para layout y timing
- Usar TransitionSeries de @remotion/transitions
- Math.round() para contadores, toLocaleString() para formateo
- Registrar composicion en Root.tsx con schema Zod`,
  },
  {
    id: "audiogram",
    icon: "🎙️",
    title: "Audiograma Podcast",
    duration: "30-60 seg",
    platform: "Instagram / Twitter",
    prompt: `Crea un audiograma Remotion para clips de podcast con estas specs:

ESPECIFICACIONES TECNICAS:
- Resolucion: 1080x1080 (cuadrado 1:1)
- FPS: 30
- Duracion: configurable via props (default 30s / 900 frames)
- Composition ID: "PodcastAudiogram"

ESTRUCTURA VISUAL:
1. CAPA BASE (siempre visible)
   - Fondo: #0a0a0a
   - Borde decorativo: 4px inset con gradiente #6366f1 a #ec4899
   - Padding interno: 60px

2. HEADER (fijo, parte superior)
   - Foto del podcast: circulo 80x80px con border 3px #6366f1
   - Nombre podcast: Inter Bold 28px blanco, a la derecha de la foto
   - Nombre episodio: Inter Regular 22px #94a3b8, debajo del nombre
   - Animacion entrada: spring({fps:30, damping:100}) translateY(-30 a 0) + opacidad

3. WAVEFORM CENTRAL (frames 0 al final)
   - Posicion: centrado vertical, width 100%
   - 60 barras verticales distribuidas uniformemente
   - Cada barra: width 6px, rounded-full, color gradiente #6366f1 a #a855f7
   - Altura base: 8px
   - Altura animada: 8px a 80px segun amplitud del audio
   - Simulacion de audio: Math.sin(frame * 0.15 + i * 0.3) * 0.5 + 0.5
   - Multiplicador aleatorio por barra: seededRandom(i) para variedad
   - Transicion suave: interpolate entre frames para smoothing

4. SUBTITULOS / QUOTE (parte inferior central)
   - Texto grande: Inter SemiBold 36px blanco, text-align center
   - Max-width: 800px
   - Comillas decorativas: Inter Black 120px #6366f120 como fondo
   - El texto cambia segun el timestamp (usar Sequence para cada frase)
   - Animacion por frase: fade in 10 frames + spring translateY(20 a 0)
   - Highlight palabra actual: color #a855f7 con interpolate por palabra

5. PROGRESS BAR (parte inferior)
   - Posicion: bottom 40px, width calc(100% - 120px)
   - Track: height 4px, bg #1e293b, rounded-full
   - Fill: height 4px, bg gradiente #6366f1 a #a855f7
   - Fill width: interpolate(frame, [0, totalFrames], [0, 100]) + "%"
   - Timestamp actual: Inter Mono 18px #64748b a la izquierda
   - Timestamp total: Inter Mono 18px #64748b a la derecha
   - Formato: "0:15 / 0:30"

6. FOOTER (fijo, parte inferior)
   - Icono play/pause decorativo: triangulo #6366f1 con opacidad 0.5
   - Texto "Escucha el episodio completo" Inter Regular 20px #64748b
   - Link/handle: Inter SemiBold 20px #a855f7

REGLAS TECNICAS:
- Usar useCurrentFrame() y useVideoConfig() de "remotion"
- Animaciones SOLO con interpolate() y spring() de "remotion"
- Fuente: loadFont() de @remotion/google-fonts/Inter
- Para audio real: usar getAudioData() y useAudioData() de @remotion/media-utils
- Para waveform real: visualizeAudio() de @remotion/media-utils
- Assets en public/ referenciados con staticFile()
- Usar AbsoluteFill y Sequence
- Crear funcion seededRandom(seed) para alturas pseudoaleatorias consistentes
- Props Zod: audioSrc (string), podcastName, episodeName, quotes (array)
- Registrar composicion en Root.tsx con schema Zod`,
  },
];

// ---------------------------------------------------------------------------
// Tips
// ---------------------------------------------------------------------------

const TIPS = [
  "Abre Claude Code en la carpeta del proyecto antes de pegar el prompt",
  "Usa 'npm run remotion' para abrir Remotion Studio y previsualizar",
  "Itera con cambios especificos: 'cambia el color de la escena 2 a #FF6B35'",
  "Renderiza primero solo 3 segundos con --frames 0-89 para verificar",
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CopyBtn({
  text,
  label = "Copiar",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "rounded-geist px-3 py-1.5 text-sm font-medium transition-colors",
        copied
          ? "bg-green-600/20 text-green-400"
          : "bg-foreground/10 text-foreground hover:bg-foreground/20"
      )}
    >
      {copied ? "Copiado" : label}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function PromptExecutor() {
  const [prompt, setPrompt] = useState("");
  const [tipsOpen, setTipsOpen] = useState(false);

  // Derive a composition ID from the prompt (first match or fallback)
  const compIdMatch = prompt.match(/Composition ID:\s*"([^"]+)"/);
  const compId = compIdMatch ? compIdMatch[1] : "MyComp";

  // ---------- command blocks ----------
  const cmdOpen = `cd C:\\Users\\alimu\\Documents\\supervideos && claude`;

  const cmdPrompt = `# Pega este prompt en Claude Code:\n${prompt}`;

  const cmdRender = `# Previsualizar
npm run remotion

# Render rapido (3 segundos de prueba)
npx remotion render src/remotion/index.ts ${compId} out/test.mp4 --frames 0-89

# Render final
npx remotion render src/remotion/index.ts ${compId} out/final.mp4 --codec h264 --crf 18`;

  // ---------- render ----------
  return (
    <div className="space-y-8">
      {/* ======= Section 1: Quick Actions ======= */}
      <section>
        <h2 className="text-foreground text-lg font-semibold mb-4">
          Acciones Rapidas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.id}
              onClick={() => setPrompt(action.prompt)}
              className={cn(
                "text-left rounded-geist p-geist border transition-colors duration-150 ease-in-out group",
                prompt === action.prompt
                  ? "border-focused-border-color bg-foreground/5"
                  : "border-unfocused-border-color bg-background hover:border-focused-border-color hover:bg-foreground/[0.03]"
              )}
            >
              <span className="text-2xl block mb-2">{action.icon}</span>
              <span className="text-foreground font-medium block">
                {action.title}
              </span>
              <span className="text-subtitle text-sm block mt-1">
                {action.duration} &middot; {action.platform}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ======= Section 2: Prompt Editor ======= */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-foreground text-lg font-semibold">
            Prompt Editor
          </h2>
          <span className="text-subtitle text-sm">
            {prompt.length} caracteres
          </span>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={12}
          placeholder="Escribe o selecciona un prompt de las acciones rapidas..."
          className="leading-[1.7] block w-full rounded-geist bg-background p-geist-half text-foreground text-sm border border-unfocused-border-color transition-colors duration-150 ease-in-out focus:border-focused-border-color outline-none resize-y min-h-[300px]"
        />

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => setPrompt("")}
            disabled={!prompt}
            className={cn(
              "rounded-geist px-3 py-1.5 text-sm font-medium transition-colors",
              prompt
                ? "bg-red-600/15 text-red-400 hover:bg-red-600/25"
                : "bg-foreground/5 text-foreground/30 cursor-not-allowed"
            )}
          >
            Limpiar
          </button>
          <CopyBtn text={prompt} label="Copiar Prompt" />
        </div>
      </section>

      {/* ======= Section 3: Terminal Commands ======= */}
      {prompt.length > 0 && (
        <section>
          <h2 className="text-foreground text-lg font-semibold mb-4">
            Comandos para Terminal
          </h2>

          <div className="space-y-4">
            {/* Block 1 */}
            <div className="rounded-geist border border-unfocused-border-color bg-background overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-unfocused-border-color bg-foreground/[0.03]">
                <span className="text-subtitle text-sm font-medium">
                  1. Abrir Claude Code
                </span>
                <CopyBtn text={cmdOpen} />
              </div>
              <pre className="p-geist-half text-sm text-foreground overflow-x-auto leading-[1.7]">
                {cmdOpen}
              </pre>
            </div>

            {/* Block 2 */}
            <div className="rounded-geist border border-unfocused-border-color bg-background overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-unfocused-border-color bg-foreground/[0.03]">
                <span className="text-subtitle text-sm font-medium">
                  2. Prompt para Claude
                </span>
                <CopyBtn text={cmdPrompt} />
              </div>
              <pre className="p-geist-half text-sm text-foreground overflow-x-auto leading-[1.7] max-h-48 overflow-y-auto">
                {cmdPrompt}
              </pre>
            </div>

            {/* Block 3 */}
            <div className="rounded-geist border border-unfocused-border-color bg-background overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-unfocused-border-color bg-foreground/[0.03]">
                <span className="text-subtitle text-sm font-medium">
                  3. Preview y Render
                </span>
                <CopyBtn text={cmdRender} />
              </div>
              <pre className="p-geist-half text-sm text-foreground overflow-x-auto leading-[1.7]">
                {cmdRender}
              </pre>
            </div>
          </div>
        </section>
      )}

      {/* ======= Section 4: Tips ======= */}
      <section>
        <button
          onClick={() => setTipsOpen((v) => !v)}
          className="flex items-center gap-2 text-foreground font-medium text-sm group"
        >
          <span
            className={cn(
              "transition-transform duration-150",
              tipsOpen ? "rotate-90" : "rotate-0"
            )}
          >
            &#9654;
          </span>
          Tips de Uso
        </button>

        {tipsOpen && (
          <ul className="mt-3 space-y-2 pl-5 list-disc text-subtitle text-sm leading-[1.7]">
            {TIPS.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
