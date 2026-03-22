"use client";

import { useState } from "react";
import { cn } from "../../lib/utils";

const CollapsibleSection = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-unfocused-border-color rounded-geist overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-geist-half bg-foreground/5 hover:bg-foreground/10 transition-colors"
      >
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <span className="text-foreground/50 text-xs">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="p-geist-half">{children}</div>}
    </div>
  );
};

const StepCard = ({
  number,
  icon,
  title,
  tabRef,
  bullets,
  tip,
}: {
  number: number;
  icon: string;
  title: string;
  tabRef: string;
  bullets: string[];
  tip: string;
}) => (
  <div className="relative flex gap-4">
    {/* Timeline line */}
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background text-xs font-bold shrink-0">
        {number}
      </div>
      {number < 7 && <div className="w-px flex-1 bg-unfocused-border-color mt-1" />}
    </div>
    {/* Content */}
    <div className="pb-6 flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span>{icon}</span>
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-foreground/10 text-foreground/60">
          {tabRef}
        </span>
      </div>
      <ul className="space-y-1 mb-2">
        {bullets.map((b, i) => (
          <li key={i} className="text-subtitle text-xs flex gap-1.5">
            <span className="text-foreground/30 shrink-0">-</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="text-[11px] bg-foreground/5 border border-unfocused-border-color rounded-geist px-2 py-1.5 text-foreground/70">
        <span className="font-semibold text-foreground/80">Tip:</span> {tip}
      </div>
    </div>
  </div>
);

const TabGuide = ({
  icon,
  name,
  purpose,
  details,
  tip,
}: {
  icon: string;
  name: string;
  purpose: string;
  details: string[];
  tip?: string;
}) => (
  <div className="border border-unfocused-border-color rounded-geist p-geist-half space-y-2">
    <div className="flex items-center gap-2">
      <span>{icon}</span>
      <h4 className="text-sm font-semibold text-foreground">{name}</h4>
    </div>
    <p className="text-xs text-foreground/70">
      <span className="font-semibold">Para que sirve:</span> {purpose}
    </p>
    <ul className="space-y-1">
      {details.map((d, i) => (
        <li key={i} className="text-subtitle text-xs flex gap-1.5">
          <span className="text-foreground/30 shrink-0">-</span>
          <span>{d}</span>
        </li>
      ))}
    </ul>
    {tip && (
      <div className="text-[11px] bg-foreground/5 border border-unfocused-border-color rounded-geist px-2 py-1.5 text-foreground/70">
        <span className="font-semibold text-foreground/80">Tip Pro:</span> {tip}
      </div>
    )}
  </div>
);

const SkillGroup = ({
  title,
  icon,
  skills,
}: {
  title: string;
  icon: string;
  skills: { name: string; desc: string }[];
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <span>{icon}</span>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
    </div>
    <div className="grid gap-1.5">
      {skills.map((s, i) => (
        <div
          key={i}
          className="text-xs flex gap-2 px-2 py-1.5 border border-unfocused-border-color rounded-geist bg-foreground/[0.02]"
        >
          <span className="font-mono font-semibold text-foreground/80 shrink-0 w-[160px]">
            {s.name}
          </span>
          <span className="text-subtitle">{s.desc}</span>
        </div>
      ))}
    </div>
  </div>
);

export const RoadmapGuide: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Section 1: Roadmap */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-1">
          Roadmap de Generacion de Video
        </h2>
        <p className="text-subtitle text-xs mb-4">
          Sigue estos 7 pasos para crear videos profesionales con SuperConstructor + Claude Code + Remotion.
        </p>

        <div className="pl-1">
          <StepCard
            number={1}
            icon="⚙"
            title="Configurar Especificaciones"
            tabRef="Tab Config"
            bullets={[
              "Selecciona la plataforma de destino",
              "Ajusta resolucion, FPS y duracion",
            ]}
            tip="Empieza con 720p para previews rapidos, renderiza en alta calidad al final"
          />
          <StepCard
            number={2}
            icon="🎬"
            title="Disenar la Estructura"
            tabRef="Tab Prompts > Escenas"
            bullets={[
              "Define el numero de escenas y su duracion",
              "Describe que ocurre en cada escena",
            ]}
            tip="Divide videos largos en escenas de 3-7 segundos para mejor ritmo"
          />
          <StepCard
            number={3}
            icon="🎨"
            title="Elegir Estilo Visual"
            tabRef="Tab Prompts > Estilo"
            bullets={[
              "Selecciona un estilo base (minimalista, cinematico, etc.)",
              "Define paleta de colores y tipografia",
            ]}
            tip="Usa maximo 2-3 colores y 2 fuentes para coherencia visual"
          />
          <StepCard
            number={4}
            icon="✨"
            title="Configurar Animaciones"
            tabRef="Tab Prompts > Animaciones"
            bullets={[
              "Elige tipo de movimiento (spring suave, con rebote, lineal)",
              "Define transiciones entre escenas",
            ]}
            tip="Spring con damping:200 para elegancia, damping:8 para energia"
          />
          <StepCard
            number={5}
            icon="📋"
            title="Generar y Copiar el Prompt"
            tabRef="Tab Prompts > Prompt Generado"
            bullets={[
              "Revisa el prompt generado",
              "Copia y pega en Claude Code",
            ]}
            tip="Anade contexto extra como 'Usa la skill de transiciones' para guiar a Claude"
          />
          <StepCard
            number={6}
            icon="👁"
            title="Previsualizar e Iterar"
            tabRef="Remotion Studio"
            bullets={[
              "Abre Remotion Studio (localhost:3100) o usa npm run dev",
              "Revisa el video frame a frame",
              "Pide cambios especificos a Claude: colores, timing, animaciones",
            ]}
            tip="Itera de forma incremental: primero layout, luego animaciones, luego detalles"
          />
          <StepCard
            number={7}
            icon="🚀"
            title="Renderizar y Exportar"
            tabRef="Tab Render"
            bullets={[
              "Configura codec, calidad y resolucion final",
              "Copia el comando de render",
              "Ejecuta en terminal",
            ]}
            tip="Usa --frames 0-89 para probar solo los primeros 3 segundos antes del render completo"
          />
        </div>
      </div>

      {/* Section 2: Platform Guide */}
      <CollapsibleSection title="Guia de la Plataforma SuperConstructor" defaultOpen={false}>
        <div className="space-y-3 pt-1">
          <TabGuide
            icon="⚙"
            name="Config - Configuracion de Video"
            purpose="Establecer las especificaciones tecnicas del video antes de empezar"
            details={[
              "Click en un preset de plataforma o introduce dimensiones custom",
              "El calculo automatico de frames (duracion x fps) te ayuda a planificar timing",
              "Flujo: Config -> Prompts -> Skills (consulta) -> Render",
            ]}
          />
          <TabGuide
            icon="✏"
            name="Prompts - Constructor de Prompts"
            purpose="Generar prompts optimizados para Claude Code sin tener que escribirlos manualmente"
            details={[
              "Abre cada seccion colapsable, rellena los campos, el prompt se genera automaticamente abajo",
              "Secciones: Escenas (estructura), Estilo Visual, Colores y Tipografia, Animaciones, Audio, Notas",
              "El boton 'Copiar prompt' copia todo listo para pegar en Claude Code",
            ]}
            tip="Usa 'Notas Adicionales' para instrucciones especificas como 'Usa TransitionSeries' o 'Anade light leaks'"
          />
          <TabGuide
            icon="📚"
            name="Skills - Referencia de Skills"
            purpose="Consultar las 36 skills de Remotion instaladas sin salir del dashboard"
            details={[
              "Busca por nombre o filtra por tags (animacion, audio, 3d, etc.)",
              "Click en una skill para ver el resumen y codigo de ejemplo",
              "Usa esta info para enriquecer tus prompts: 'Usa la tecnica de la skill de text-animations para efecto typewriter'",
            ]}
          />
          <TabGuide
            icon="📋"
            name="Templates - Plantillas Pre-construidas"
            purpose="Arrancar rapido con prompts profesionales ya probados"
            details={[
              "8 templates disponibles: Reel Social, Demo Producto, Explicativo, Data Viz, Logo Reveal, Anuncio, Intro YouTube, Audiograma Podcast",
              "'Usar template': carga el prompt en el tab de Prompts para personalizarlo",
              "'Copiar': copia el prompt directamente para pegarlo en Claude Code",
              "Como personalizar: Despues de copiar, busca [PERSONALIZAR] en el prompt y reemplaza con tus datos",
            ]}
          />
          <TabGuide
            icon="▶"
            name="Render - Generador de Comandos"
            purpose="Construir el comando de render sin memorizar flags"
            details={[
              "Opciones: Composition ID, codec (H.264, H.265, VP9, ProRes, GIF), calidad CRF, resolucion override, rango de frames, flags (--muted, --enforce-audio-track)",
              "El comando se actualiza en tiempo real y tiene boton de copiar",
            ]}
          />
          <TabGuide
            icon="{}"
            name="JSON - Configuracion Parametrizada"
            purpose="Crear videos reutilizables con parametros variables (textos, colores, datos)"
            details={[
              "Define campos (nombre, tipo, valor) y genera el JSON de defaultProps + el Zod schema",
              "Caso de uso: Videos con datos que cambian (reportes semanales, versiones multi-idioma, A/B testing)",
              "El Zod schema se pega en el componente, el JSON en defaultProps de la Composition",
            ]}
          />
          <TabGuide
            icon="🔧"
            name="Custom Skills - Crear Skills Propias"
            purpose="Ensenar a Claude patrones especificos de tu proyecto"
            details={[
              "Define nombre, tags, descripcion, cuando usar, y las reglas en markdown",
              "Guarda el archivo generado en .agents/skills/tu-skill/SKILL.md",
              "Ejemplo: Crear una skill para tu sistema de diseno corporativo con colores, fuentes y patrones de animacion propios",
            ]}
          />
        </div>
      </CollapsibleSection>

      {/* Section 3: Skill Possibilities */}
      <CollapsibleSection title="Posibilidades por Skill" defaultOpen={false}>
        <div className="space-y-5 pt-1">
          <SkillGroup
            title="Animacion y Movimiento"
            icon="🎭"
            skills={[
              { name: "animations", desc: "Fade in/out, scale, rotate, translate, opacidad dinamica, parallax" },
              { name: "timing", desc: "Springs naturales, easings cubicos, bezier custom, rebotes, delays" },
              { name: "sequencing", desc: "Stagger de elementos, entradas escalonadas, sincronizacion precisa" },
              { name: "transitions", desc: "Crossfade, slide (4 direcciones), wipe, flip, clockWipe entre escenas" },
              { name: "text-animations", desc: "Typewriter, reveal por palabra, highlight animado, contador numerico" },
              { name: "trimming", desc: "Recortar inicio/final de cualquier animacion o escena" },
            ]}
          />
          <SkillGroup
            title="Media y Contenido"
            icon="🎥"
            skills={[
              { name: "videos", desc: "Incrustar clips, recortar, cambiar velocidad (slow-mo, fast-forward), loop, pitch" },
              { name: "audio", desc: "Musica de fondo, fade in/out de volumen, velocidad, pitch, multiples pistas" },
              { name: "images", desc: "Fotos con carga garantizada, secuencias de imagenes, dimensiones dinamicas" },
              { name: "gifs", desc: "GIFs sincronizados con el timeline, control frame a frame" },
              { name: "assets", desc: "Gestion centralizada en public/, staticFile() para referencias seguras" },
              { name: "lottie", desc: "Animaciones vectoriales After Effects via JSON" },
            ]}
          />
          <SkillGroup
            title="Texto y Subtitulos"
            icon="📝"
            skills={[
              { name: "subtitles", desc: "Formato Caption (text, startMs, endMs), JSON y SRT" },
              { name: "display-captions", desc: "Subtitulos animados con highlight de palabra activa" },
              { name: "import-srt-captions", desc: "Importar archivos .srt existentes" },
              { name: "transcribe-captions", desc: "Generar subtitulos desde audio con IA" },
              { name: "measuring-text", desc: "Medir dimensiones de texto, ajustar a contenedores" },
              { name: "fonts", desc: "Google Fonts con loadFont(), fuentes locales, weights multiples" },
            ]}
          />
          <SkillGroup
            title="Datos y Visualizacion"
            icon="📊"
            skills={[
              { name: "charts", desc: "Barras animadas, pie charts, lineas SVG, graficos de stock" },
              { name: "maps", desc: "Mapas Mapbox con animacion de coordenadas y zoom" },
              { name: "parameters", desc: "Videos parametrizables con Zod (texto, colores, booleanos, numeros)" },
              { name: "calculate-metadata", desc: "Duracion y dimensiones dinamicas basadas en datos externos" },
            ]}
          />
          <SkillGroup
            title="Efectos y Avanzado"
            icon="🔮"
            skills={[
              { name: "3d", desc: "Escenas Three.js con ThreeCanvas, rotaciones, iluminacion, materiales" },
              { name: "light-leaks", desc: "Fugas de luz cinematicas para transiciones" },
              { name: "transparent-videos", desc: "Exportar con canal alpha (VP9 WebM o ProRes 4444)" },
              { name: "audio-visualization", desc: "Barras de espectro, waveforms, efectos reactivos al bajo" },
              { name: "voiceover", desc: "Voz en off IA con ElevenLabs, duracion dinamica" },
            ]}
          />
          <SkillGroup
            title="Utilidades"
            icon="🛠"
            skills={[
              { name: "tailwind", desc: "TailwindCSS para layouts (NUNCA para animaciones)" },
              { name: "compositions", desc: "Estructura del proyecto, folders, stills, schemas" },
              { name: "can-decode", desc: "Verificar compatibilidad de codec" },
              { name: "extract-frames", desc: "Sacar frames individuales de videos" },
              { name: "get-audio-duration", desc: "Medir duracion de archivos de audio" },
              { name: "get-video-duration", desc: "Medir duracion de archivos de video" },
              { name: "get-video-dimensions", desc: "Obtener dimensiones de archivos de video" },
              { name: "measuring-dom-nodes", desc: "Layouts dinamicos basados en dimensiones reales" },
              { name: "sfx", desc: "Efectos de sonido sincronizados (whoosh, click, pop)" },
            ]}
          />
        </div>
      </CollapsibleSection>
    </div>
  );
};
