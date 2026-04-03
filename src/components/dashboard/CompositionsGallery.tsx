"use client";

import { useState } from "react";
import { cn } from "../../lib/utils";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const compositions = [
  {
    id: "MyComp",
    name: "Demo Principal",
    component: "Main.tsx",
    width: 1280,
    height: 720,
    fps: 30,
    durationInFrames: 200,
    description:
      "Composicion de ejemplo con logo animado, anillos y texto con fade. Incluye spring animations y gradientes.",
    props: [{ name: "title", type: "string", default: "Welcome to Remotion" }],
    features: [
      "Spring animations",
      "SVG path animation",
      "Gradient backgrounds",
      "Text fade",
    ],
    file: "src/remotion/MyComp/Main.tsx",
    status: "ready" as const,
  },
  {
    id: "NextLogo",
    name: "Logo Next.js",
    component: "NextLogo.tsx",
    width: 140,
    height: 140,
    fps: 30,
    durationInFrames: 300,
    description:
      "Animacion del logo de Next.js con path evolution usando @remotion/paths.",
    props: [],
    features: ["evolvePath", "SVG gradients", "Path animation"],
    file: "src/remotion/MyComp/NextLogo.tsx",
    status: "ready" as const,
  },
];

const availableTemplates = [
  {
    id: "social-reel",
    name: "Reel para Redes Sociales",
    platform: "TikTok / Instagram",
    resolution: "1080x1920",
    duration: "15s",
    scenes: 3,
    features: [
      "Spring animations",
      "TransitionSeries",
      "Stagger text",
      "CTA animation",
    ],
    complexity: "Basico" as const,
    prompt:
      "Crea una composicion 'SocialReel' de 1080x1920, 30fps, 450 frames con 3 escenas: hook con texto grande, contenido con bullets staggered, y CTA con logo.",
  },
  {
    id: "product-demo",
    name: "Demo de Producto",
    platform: "YouTube / LinkedIn",
    resolution: "1920x1080",
    duration: "30s",
    scenes: 5,
    features: [
      "Feature showcase",
      "Screenshots",
      "Transitions",
      "Audio",
    ],
    complexity: "Intermedio" as const,
    prompt:
      "Crea una composicion 'ProductDemo' de 1920x1080, 30fps, 900 frames con 5 escenas: hero, 3 features con screenshots, y cierre con CTA.",
  },
  {
    id: "data-viz",
    name: "Dashboard de Datos",
    platform: "LinkedIn / Twitter",
    resolution: "1920x1080",
    duration: "20s",
    scenes: 3,
    features: [
      "Bar charts",
      "Counter animation",
      "Stagger",
      "Data-driven",
    ],
    complexity: "Avanzado" as const,
    prompt:
      "Crea una composicion 'DataViz' de 1920x1080, 30fps, 600 frames con 3 escenas: metricas con contadores animados, grafico de barras animado, y cierre.",
  },
  {
    id: "logo-reveal",
    name: "Logo Reveal",
    platform: "Universal",
    resolution: "1920x1080",
    duration: "5s",
    scenes: 1,
    features: ["Particles", "Scale spring", "Glow effect", "Minimal"],
    complexity: "Basico" as const,
    prompt:
      "Crea una composicion 'LogoReveal' de 1920x1080, 30fps, 150 frames: logo que aparece desde particulas convergentes con spring({damping:20}) y glow.",
  },
  {
    id: "explainer",
    name: "Video Explicativo",
    platform: "YouTube",
    resolution: "1920x1080",
    duration: "60s",
    scenes: 6,
    features: [
      "Typewriter",
      "Diagrams",
      "Sequencing",
      "Voiceover-ready",
    ],
    complexity: "Avanzado" as const,
    prompt:
      "Crea una composicion 'Explainer' de 1920x1080, 30fps, 1800 frames con 6 escenas educativas: intro, problema, solucion, demo, beneficios, CTA.",
  },
  {
    id: "podcast-audiogram",
    name: "Audiograma de Podcast",
    platform: "Instagram / Twitter",
    resolution: "1080x1080",
    duration: "60s",
    scenes: 1,
    features: [
      "Audio visualization",
      "Captions",
      "Waveform",
      "Square format",
    ],
    complexity: "Intermedio" as const,
    prompt:
      "Crea una composicion 'Audiogram' de 1080x1080, 30fps, 1800 frames: visualizacion de audio con barras de espectro, foto del host, titulo y subtitulos animados.",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDuration(frames: number, fps: number): string {
  const totalSeconds = Math.round(frames / fps);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

function getAspectLabel(w: number, h: number): string {
  const ratio = w / h;
  if (Math.abs(ratio - 16 / 9) < 0.05) return "16:9";
  if (Math.abs(ratio - 9 / 16) < 0.05) return "9:16";
  if (Math.abs(ratio - 1) < 0.05) return "1:1";
  return `${w}:${h}`;
}

function copyToClipboard(text: string, label: string) {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.createElement("div");
    toast.textContent = `Copiado: ${label}`;
    toast.className =
      "fixed bottom-6 right-6 z-50 rounded-lg bg-green-600 px-4 py-2 text-sm text-white shadow-lg transition-opacity duration-500";
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 500);
    }, 2000);
  });
}

function complexityColor(c: string) {
  switch (c) {
    case "Basico":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "Intermedio":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "Avanzado":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    default:
      return "bg-neutral-500/20 text-neutral-400 border-neutral-500/30";
  }
}

// ---------------------------------------------------------------------------
// Derived stats
// ---------------------------------------------------------------------------

function getFormats(): string[] {
  const set = new Set<string>();
  compositions.forEach((c) => set.add(getAspectLabel(c.width, c.height)));
  return Array.from(set);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CompositionsGallery() {
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null);

  const formats = getFormats();

  return (
    <div className={cn("flex flex-col gap-8 p-geist text-foreground")}>
      {/* ----------------------------------------------------------------- */}
      {/* Section 1 : Composiciones Activas                                 */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <h2 className="mb-1 text-xl font-semibold tracking-tight">
          Composiciones Activas
        </h2>
        <p className="mb-4 text-subtitle text-sm">
          Composiciones registradas en el proyecto, listas para preview y render.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {compositions.map((comp) => {
            const duration = formatDuration(comp.durationInFrames, comp.fps);
            const aspect = getAspectLabel(comp.width, comp.height);

            return (
              <div
                key={comp.id}
                className={cn(
                  "flex flex-col gap-3 rounded-geist border border-unfocused-border-color bg-background p-geist",
                  "transition-colors hover:border-focused-border-color"
                )}
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold">
                      {comp.id}
                    </span>
                    <span className="text-subtitle text-sm">
                      ({comp.name})
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-green-500/30 bg-green-500/20 px-2.5 py-0.5 text-xs font-medium text-green-400">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
                    Lista
                  </span>
                </div>

                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-unfocused-border-color bg-background px-2 py-0.5 text-xs font-mono">
                    {comp.width}x{comp.height}
                  </span>
                  <span className="rounded-md border border-unfocused-border-color bg-background px-2 py-0.5 text-xs font-mono">
                    {aspect}
                  </span>
                  <span className="rounded-md border border-unfocused-border-color bg-background px-2 py-0.5 text-xs font-mono">
                    {comp.fps} fps
                  </span>
                  <span className="rounded-md border border-unfocused-border-color bg-background px-2 py-0.5 text-xs font-mono">
                    {duration}
                  </span>
                  <span className="rounded-md border border-unfocused-border-color bg-background px-2 py-0.5 text-xs font-mono">
                    {comp.durationInFrames} frames
                  </span>
                </div>

                {/* Description */}
                <p className="text-subtitle text-sm leading-relaxed">
                  {comp.description}
                </p>

                {/* Props */}
                {comp.props.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-subtitle">
                      Props
                    </span>
                    <div className="flex flex-col gap-1">
                      {comp.props.map((p) => (
                        <div
                          key={p.name}
                          className="flex items-center gap-2 rounded-md border border-unfocused-border-color bg-background px-2 py-1 text-xs font-mono"
                        >
                          <span className="font-semibold text-foreground">
                            {p.name}
                          </span>
                          <span className="text-subtitle">{p.type}</span>
                          {p.default && (
                            <span className="ml-auto text-subtitle">
                              = &quot;{p.default}&quot;
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="flex flex-wrap gap-1.5">
                  {comp.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-blue-500/30 bg-blue-500/15 px-2 py-0.5 text-[11px] font-medium text-blue-400"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* File path */}
                <span className="truncate text-[11px] font-mono text-subtitle">
                  {comp.file}
                </span>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 border-t border-unfocused-border-color pt-3">
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        "http://localhost:3100",
                        "URL de Remotion Studio"
                      )
                    }
                    className={cn(
                      "rounded-geist border border-unfocused-border-color bg-background px-3 py-1.5 text-xs font-medium",
                      "transition-colors hover:border-focused-border-color hover:bg-blue-500/10 hover:text-blue-400"
                    )}
                  >
                    Abrir en Studio
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `npx remotion render src/remotion/index.ts ${comp.id} out/${comp.id}.mp4`,
                        "Comando de render"
                      )
                    }
                    className={cn(
                      "rounded-geist border border-unfocused-border-color bg-background px-3 py-1.5 text-xs font-medium",
                      "transition-colors hover:border-focused-border-color hover:bg-purple-500/10 hover:text-purple-400"
                    )}
                  >
                    Render
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(comp.file, "Ruta del archivo")
                    }
                    className={cn(
                      "rounded-geist border border-unfocused-border-color bg-background px-3 py-1.5 text-xs font-medium",
                      "transition-colors hover:border-focused-border-color hover:bg-emerald-500/10 hover:text-emerald-400"
                    )}
                  >
                    Ver Codigo
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 2 : Crear Nueva Composicion                               */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <h2 className="mb-1 text-xl font-semibold tracking-tight">
          Crear Nueva Composicion
        </h2>
        <p className="mb-4 text-subtitle text-sm">
          Templates disponibles para generar nuevas composiciones con Claude.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {availableTemplates.map((tpl) => {
            const isExpanded = expandedPrompt === tpl.id;

            return (
              <div
                key={tpl.id}
                className={cn(
                  "flex flex-col gap-3 rounded-geist border border-unfocused-border-color bg-background p-geist",
                  "transition-colors hover:border-focused-border-color"
                )}
              >
                {/* Title + platform */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold leading-snug">
                    {tpl.name}
                  </h3>
                  <span className="shrink-0 rounded-full border border-unfocused-border-color bg-background px-2 py-0.5 text-[10px] font-medium text-subtitle">
                    {tpl.platform}
                  </span>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-unfocused-border-color bg-background px-2 py-0.5 text-xs font-mono">
                    {tpl.resolution}
                  </span>
                  <span className="rounded-md border border-unfocused-border-color bg-background px-2 py-0.5 text-xs font-mono">
                    {tpl.duration}
                  </span>
                  <span className="rounded-md border border-unfocused-border-color bg-background px-2 py-0.5 text-xs font-mono">
                    {tpl.scenes} {tpl.scenes === 1 ? "escena" : "escenas"}
                  </span>
                </div>

                {/* Complexity badge */}
                <span
                  className={cn(
                    "w-fit rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                    complexityColor(tpl.complexity)
                  )}
                >
                  {tpl.complexity}
                </span>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5">
                  {tpl.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-violet-500/30 bg-violet-500/15 px-2 py-0.5 text-[11px] font-medium text-violet-400"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Expanded prompt */}
                {isExpanded && (
                  <div className="rounded-md border border-unfocused-border-color bg-background p-geist-half">
                    <p className="text-xs font-mono leading-relaxed text-subtitle">
                      {tpl.prompt}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-auto flex gap-2 border-t border-unfocused-border-color pt-3">
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(tpl.prompt, `Prompt de ${tpl.name}`)
                    }
                    className={cn(
                      "flex-1 rounded-geist border border-blue-500/40 bg-blue-500/15 px-3 py-1.5 text-xs font-semibold text-blue-400",
                      "transition-colors hover:bg-blue-500/25"
                    )}
                  >
                    Crear con Claude
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedPrompt(isExpanded ? null : tpl.id)
                    }
                    className={cn(
                      "rounded-geist border border-unfocused-border-color bg-background px-3 py-1.5 text-xs font-medium",
                      "transition-colors hover:border-focused-border-color",
                      isExpanded && "border-focused-border-color text-foreground"
                    )}
                  >
                    {isExpanded ? "Ocultar" : "Ver Prompt"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 3 : Estadisticas del Proyecto                             */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <h2 className="mb-3 text-xl font-semibold tracking-tight">
          Estadisticas del Proyecto
        </h2>

        <div
          className={cn(
            "grid grid-cols-2 gap-4 rounded-geist border border-unfocused-border-color bg-background p-geist sm:grid-cols-4"
          )}
        >
          {/* Total composiciones */}
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-2xl font-bold">{compositions.length}</span>
            <span className="text-subtitle text-xs">
              Total composiciones
            </span>
          </div>

          {/* Formatos cubiertos */}
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-2xl font-bold">{formats.length}</span>
            <span className="text-subtitle text-xs">
              Formatos cubiertos
            </span>
            <span className="text-[10px] font-mono text-subtitle">
              {formats.join(", ")}
            </span>
          </div>

          {/* Templates disponibles */}
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-2xl font-bold">
              {availableTemplates.length}
            </span>
            <span className="text-subtitle text-xs">
              Templates disponibles
            </span>
          </div>

          {/* Skills instaladas */}
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-2xl font-bold">40</span>
            <span className="text-subtitle text-xs">
              Skills instaladas
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
