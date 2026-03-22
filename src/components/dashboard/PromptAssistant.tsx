"use client";

import { useState } from "react";
import { CopyButton } from "./CopyButton";

/* ── Collapsible Section ── */
const Section = ({
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

/* ── Colored Prompt Line ── */
const PromptLine = ({
  color,
  label,
  text,
  explanation,
}: {
  color: string;
  label: string;
  text: string;
  explanation: string;
}) => (
  <div className="flex gap-3 mb-3">
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="inline-block w-3 h-3 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
        <span className="text-xs font-bold" style={{ color }}>
          {label}
        </span>
      </div>
      <pre
        className="text-xs whitespace-pre-wrap font-mono p-2 rounded border-l-4"
        style={{ borderColor: color, backgroundColor: `${color}10` }}
      >
        {text}
      </pre>
    </div>
    <div className="w-64 shrink-0 text-xs text-subtitle leading-relaxed pt-6">
      {explanation}
    </div>
  </div>
);

/* ── Code Block with Copy ── */
const CodeBlock = ({
  code,
  label,
  bg = "bg-foreground/[0.03]",
}: {
  code: string;
  label: string;
  bg?: string;
}) => (
  <div className="relative">
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs font-medium text-subtitle">{label}</span>
      <CopyButton text={code} label="Copiar" />
    </div>
    <pre
      className={`${bg} border border-unfocused-border-color rounded-geist p-geist-half text-xs font-mono whitespace-pre-wrap overflow-x-auto leading-relaxed`}
    >
      {code}
    </pre>
  </div>
);

/* ── Exercise Card ── */
const Exercise = ({
  number,
  title,
  level,
  duration,
  description,
  prompt,
  code,
  instructions,
}: {
  number: number;
  title: string;
  level: "Basico" | "Intermedio" | "Avanzado";
  duration: string;
  description: string;
  prompt: string;
  code: string;
  instructions: string;
}) => {
  const [showCode, setShowCode] = useState(false);
  const levelColors = {
    Basico: "bg-green-600/20 text-green-400 border-green-600/30",
    Intermedio: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
    Avanzado: "bg-red-600/20 text-red-400 border-red-600/30",
  };

  return (
    <div className="border border-unfocused-border-color rounded-geist overflow-hidden">
      <div className="p-geist-half border-b border-unfocused-border-color bg-foreground/5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-bold text-foreground">
            {number}. {title}
          </span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full border ${levelColors[level]}`}
          >
            {level}
          </span>
          <span className="text-[10px] text-subtitle">{duration}</span>
        </div>
        <p className="text-xs text-subtitle">{description}</p>
      </div>

      <div className="p-geist-half space-y-3">
        {/* PROMPT */}
        <CodeBlock
          code={prompt}
          label="PROMPT → Pega esto en Claude Code"
          bg="bg-[#1a1a2e]"
        />

        {/* TOGGLE CODE */}
        <button
          onClick={() => setShowCode(!showCode)}
          className="text-xs text-blue-500 hover:text-blue-400 transition-colors"
        >
          {showCode
            ? "▲ Ocultar codigo resultado"
            : "▼ Ver codigo que Claude generaria"}
        </button>

        {showCode && (
          <CodeBlock
            code={code}
            label="CODIGO RESULTADO → Lo que Claude genera"
            bg="bg-[#0a1f0a]"
          />
        )}

        {/* INSTRUCTIONS */}
        <div className="bg-foreground/5 rounded-geist p-2 text-xs text-subtitle">
          <span className="font-semibold text-foreground">Como ejecutar: </span>
          {instructions}
        </div>
      </div>
    </div>
  );
};

/* ── Use Case Prompt ── */
const UseCasePrompt = ({
  title,
  description,
  prompt,
}: {
  title: string;
  description: string;
  prompt: string;
}) => (
  <div className="border border-unfocused-border-color rounded-geist overflow-hidden">
    <div className="p-geist-half bg-foreground/5 border-b border-unfocused-border-color">
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <p className="text-xs text-subtitle">{description}</p>
    </div>
    <div className="p-geist-half">
      <CodeBlock code={prompt} label="Prompt" />
    </div>
  </div>
);

/* ══════════════════════════════════════════════
   FULL PROMPT FOR ANATOMY SECTION
   ══════════════════════════════════════════════ */
const fullAnatomyPrompt = `Crea un video Remotion con estas especificaciones:

SPECS TECNICAS:
- Resolucion: 1080x1920 (vertical 9:16)
- FPS: 30
- Duracion: 15 segundos (450 frames)
- Composition ID: "ReelDemo"

ESCENAS:
1. (frames 0-150) Fondo gradiente #667eea a #764ba2. Texto "Descubre el poder de la IA" centrado, entrada con spring({damping:200, stiffness:100}) desde translateY(100px) a translateY(0).
2. (frames 150-300) Fondo #0f0f0f. Tres cards horizontales con iconos aparecen con stagger de 20 frames cada una, spring({damping:100}) en opacidad 0→1 y translateX(-50→0).
3. (frames 300-450) Fondo gradiente #764ba2 a #667eea. Logo centrado con scale spring({damping:20}) de 0 a 1. Texto CTA "Sigueme para mas" con fade in desde frame 380.

ESTILO VISUAL: Minimalista con glassmorphism sutil en las cards.
Fuente titulo: Montserrat Bold via loadFont de @remotion/google-fonts.
Fuente cuerpo: Inter Regular.

ANIMACIONES: Transiciones entre escenas con TransitionSeries y slide({direction:"from-left"}) con springTiming({config:{damping:200}}).

AUDIO: Sin audio por ahora.

REGLAS: Usar useCurrentFrame() + useVideoConfig() de "remotion". Animaciones SOLO con interpolate/spring de Remotion. NUNCA CSS transitions ni animate-* de Tailwind. Assets en public/ con staticFile(). Registrar <Composition> en Root.tsx con schema Zod.`;

/* ══════════════════════════════════════════════
   EXERCISES DATA
   ══════════════════════════════════════════════ */

const exercises: React.ComponentProps<typeof Exercise>[] = [
  {
    number: 1,
    title: "Texto con Spring",
    level: "Basico",
    duration: "10s · 1 escena · 300 frames",
    description:
      "Un texto que entra desde abajo con animacion spring y luego sale con fade out. Aprende useCurrentFrame, interpolate y spring.",
    prompt: `Crea un video Remotion con estas specs:
- Resolucion: 1920x1080, 30fps, 10 segundos (300 frames)
- Composition ID: "TextoSpring"
- 1 sola escena, fondo solido #0f0f0f

Animacion:
- Texto "Hola Remotion" centrado, blanco, 72px, fuente Inter Bold
- Frames 0-60: Entra desde abajo con spring({fps:30, damping:200, stiffness:100})
  aplicado a translateY (de 100px a 0px)
- Frames 60-240: Estable en posicion
- Frames 240-300: Fade out con interpolate en opacidad de 1 a 0

Usa useCurrentFrame() y useVideoConfig(). Registra en Root.tsx.`,
    code: `import { AbsoluteFill, Composition, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

const TextoSpring: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrada con spring (frames 0-60)
  const springValue = spring({ frame, fps, config: { damping: 200, stiffness: 100 } });
  const translateY = interpolate(springValue, [0, 1], [100, 0]);

  // Fade out (frames 240-300)
  const opacity = interpolate(frame, [240, 300], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f0f", justifyContent: "center", alignItems: "center" }}>
      <h1
        style={{
          fontFamily,
          fontSize: 72,
          fontWeight: "bold",
          color: "#ffffff",
          transform: \`translateY(\${translateY}px)\`,
          opacity,
        }}
      >
        Hola Remotion
      </h1>
    </AbsoluteFill>
  );
};

// En Root.tsx:
export const RemotionRoot = () => (
  <Composition id="TextoSpring" component={TextoSpring} durationInFrames={300} fps={30} width={1920} height={1080} />
);`,
    instructions:
      "Pega el prompt en Claude Code. Abre localhost:3100, selecciona 'TextoSpring'. Veras el texto subir con spring y desaparecer al final.",
  },
  {
    number: 2,
    title: "Tarjetas con Stagger",
    level: "Basico",
    duration: "15s · 1 escena · 450 frames",
    description:
      "3 tarjetas que entran una detras de otra con delay entre ellas. Aprende Sequence, delays y spring escalonado.",
    prompt: `Crea un video Remotion:
- 1920x1080, 30fps, 15 segundos (450 frames)
- Composition ID: "TarjetasStagger"
- Fondo #111827

3 tarjetas centradas horizontalmente (300x200px cada una, gap 24px):
- Tarjeta 1: icono "⚡" + texto "Rapido"
- Tarjeta 2: icono "🎨" + texto "Bonito"
- Tarjeta 3: icono "🔒" + texto "Seguro"

Cada tarjeta: fondo #1f2937, borde 1px #374151, border-radius 12px.

Animacion stagger:
- Tarjeta 1 entra en frame 30 con spring({damping:100}) en opacidad 0→1 y translateY 40→0
- Tarjeta 2 entra en frame 50 (delay 20 frames)
- Tarjeta 3 entra en frame 70 (delay 20 frames)

Usa <Sequence from={X}> para cada tarjeta. Fuente: Inter.`,
    code: `import { AbsoluteFill, Composition, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

const Card: React.FC<{ icon: string; label: string }> = ({ icon, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame, fps, config: { damping: 100 } });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const translateY = interpolate(s, [0, 1], [40, 0]);

  return (
    <div
      style={{
        width: 300, height: 200,
        backgroundColor: "#1f2937",
        border: "1px solid #374151",
        borderRadius: 12,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        gap: 12,
        opacity,
        transform: \`translateY(\${translateY}px)\`,
      }}
    >
      <span style={{ fontSize: 48 }}>{icon}</span>
      <span style={{ fontFamily, fontSize: 24, color: "#ffffff", fontWeight: 600 }}>{label}</span>
    </div>
  );
};

const TarjetasStagger: React.FC = () => {
  const cards = [
    { icon: "⚡", label: "Rapido" },
    { icon: "🎨", label: "Bonito" },
    { icon: "🔒", label: "Seguro" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#111827", justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 24 }}>
        {cards.map((card, i) => (
          <Sequence key={card.label} from={30 + i * 20}>
            <Card icon={card.icon} label={card.label} />
          </Sequence>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Root.tsx:
export const RemotionRoot = () => (
  <Composition id="TarjetasStagger" component={TarjetasStagger} durationInFrames={450} fps={30} width={1920} height={1080} />
);`,
    instructions:
      "Las 3 tarjetas aparecen escalonadas con 20 frames de diferencia. Usa las flechas del teclado en Remotion Studio para ver frame a frame como entran.",
  },
  {
    number: 3,
    title: "Reel 3 Escenas con Transiciones",
    level: "Intermedio",
    duration: "15s · 3 escenas · 450 frames",
    description:
      "Video vertical para TikTok con 3 escenas conectadas por transiciones slide. Aprende TransitionSeries, presentaciones y springTiming.",
    prompt: `Crea un video Remotion vertical para TikTok:
- 1080x1920, 30fps, 15 segundos (450 frames)
- Composition ID: "ReelTresEscenas"

ESCENAS con TransitionSeries:
1. (150 frames) Fondo gradiente lineal vertical #667eea→#764ba2.
   Texto "¿Sabias que...?" centrado, blanco, 64px, Montserrat Bold.
   Entrada spring({damping:200}) en opacidad y translateY.

2. (150 frames) Fondo #0a0a0a.
   Tres lineas de texto aparecen con stagger de 15 frames:
   "✅ Remotion usa React"
   "✅ Cada frame es un componente"
   "✅ Renderiza en MP4"
   Fuente Inter, 32px, blanco.

3. (150 frames) Fondo gradiente #764ba2→#667eea.
   Texto grande "Sigueme" centrado con spring({damping:20}) en scale 0→1.
   Subtexto "@micanal" 24px, opacity fade in desde frame 40 local.

TRANSICIONES: Entre cada escena usar slide({direction:"from-left"})
con springTiming({config:{damping:200}}) y duracion 15 frames.

Fuentes: Montserrat Bold + Inter Regular via @remotion/google-fonts.`,
    code: `import { AbsoluteFill, Composition, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: montserrat } = loadMontserrat();
const { fontFamily: inter } = loadInter();

const Escena1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 } });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const translateY = interpolate(s, [0, 1], [60, 0]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
        justifyContent: "center", alignItems: "center",
      }}
    >
      <h1 style={{ fontFamily: montserrat, fontSize: 64, fontWeight: 700, color: "#fff", opacity, transform: \`translateY(\${translateY}px)\` }}>
        ¿Sabias que...?
      </h1>
    </AbsoluteFill>
  );
};

const Escena2: React.FC = () => {
  const lines = ["✅ Remotion usa React", "✅ Cada frame es un componente", "✅ Renderiza en MP4"];
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a", justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {lines.map((line, i) => (
          <Sequence key={i} from={i * 15}>
            <FadeInLine text={line} />
          </Sequence>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const FadeInLine: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 100 } });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const x = interpolate(s, [0, 1], [-50, 0]);
  return (
    <p style={{ fontFamily: inter, fontSize: 32, color: "#fff", opacity, transform: \`translateX(\${x}px)\` }}>
      {text}
    </p>
  );
};

const Escena3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 20 } });
  const scale = interpolate(s, [0, 1], [0, 1]);
  const subOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #764ba2 0%, #667eea 100%)",
        justifyContent: "center", alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontFamily: montserrat, fontSize: 72, fontWeight: 700, color: "#fff", transform: \`scale(\${scale})\` }}>
          Sigueme
        </h1>
        <p style={{ fontFamily: inter, fontSize: 24, color: "#ffffffcc", opacity: subOpacity, marginTop: 16 }}>
          @micanal
        </p>
      </div>
    </AbsoluteFill>
  );
};

const transitionDuration = 15;
const sceneDuration = 150;

const ReelTresEscenas: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={sceneDuration}>
      <Escena1 />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition
      presentation={slide({ direction: "from-left" })}
      timing={springTiming({ config: { damping: 200 }, durationInFrames: transitionDuration })}
    />
    <TransitionSeries.Sequence durationInFrames={sceneDuration}>
      <Escena2 />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition
      presentation={slide({ direction: "from-left" })}
      timing={springTiming({ config: { damping: 200 }, durationInFrames: transitionDuration })}
    />
    <TransitionSeries.Sequence durationInFrames={sceneDuration}>
      <Escena3 />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);

// Root.tsx:
export const RemotionRoot = () => (
  <Composition id="ReelTresEscenas" component={ReelTresEscenas} durationInFrames={450} fps={30} width={1080} height={1920} />
);`,
    instructions:
      "Este es un reel vertical completo. En Remotion Studio veras las 3 escenas con transiciones slide entre ellas. Modifica los colores hex y textos para personalizarlo.",
  },
  {
    number: 4,
    title: "Datos Animados con Contador y Barras",
    level: "Intermedio",
    duration: "20s · 2 escenas · 600 frames",
    description:
      "Numeros que cuentan de 0 al valor final y barras que crecen. Aprende interpolate con Easing para datos.",
    prompt: `Crea un video Remotion de datos animados:
- 1920x1080, 30fps, 20 segundos (600 frames)
- Composition ID: "DatosAnimados"

ESCENA 1 (frames 0-300): Fondo #0f172a.
Titulo "Resultados Q1" centrado arriba, 48px, blanco, Montserrat Bold.
Tres metricas en fila (centradas):
- "Revenue" cuenta de $0 a $2.4M (interpolate con easing Easing.out(Easing.cubic))
- "Usuarios" cuenta de 0 a 150K
- "NPS" cuenta de 0 a 87
Cada numero en 64px blanco, label en 18px #94a3b8.
Las metricas empiezan con stagger de 20 frames (frame 30, 50, 70).

ESCENA 2 (frames 300-600): Fondo #0f172a.
Grafico de 4 barras verticales que crecen de abajo arriba:
- Ene: 600K (barra #667eea, alto max 300px)
- Feb: 800K (barra #764ba2)
- Mar: 1.0M (barra #a855f7)
- Abr: 1.2M (barra #ec4899)
Cada barra crece con spring({damping:100}) y stagger de 15 frames.
Label del mes debajo, valor encima.

Transicion: fade simple con interpolate entre escenas.
Fuentes: Montserrat Bold + Inter.`,
    code: `import { AbsoluteFill, Composition, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: montserrat } = loadMontserrat();
const { fontFamily: inter } = loadInter();

const Counter: React.FC<{ target: number; prefix?: string; suffix?: string }> = ({ target, prefix = "", suffix = "" }) => {
  const frame = useCurrentFrame();
  const value = interpolate(frame, [0, 90], [0, target], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const display = target >= 1000000
    ? \`\${prefix}\${(value / 1000000).toFixed(1)}M\${suffix}\`
    : target >= 1000
      ? \`\${prefix}\${Math.round(value / 1000)}K\${suffix}\`
      : \`\${prefix}\${Math.round(value)}\${suffix}\`;

  return (
    <span style={{ fontFamily: montserrat, fontSize: 64, fontWeight: 700, color: "#fff" }}>
      {display}
    </span>
  );
};

const Metric: React.FC<{ label: string; target: number; prefix?: string; suffix?: string }> = ({ label, target, prefix, suffix }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 100 } });
  const opacity = interpolate(s, [0, 1], [0, 1]);

  return (
    <div style={{ textAlign: "center", opacity }}>
      <Counter target={target} prefix={prefix} suffix={suffix} />
      <p style={{ fontFamily: inter, fontSize: 18, color: "#94a3b8", marginTop: 8 }}>{label}</p>
    </div>
  );
};

const Bar: React.FC<{ label: string; value: number; maxValue: number; color: string; displayValue: string }> = ({
  label, value, maxValue, color, displayValue,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 100 } });
  const height = interpolate(s, [0, 1], [0, (value / maxValue) * 300]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 120 }}>
      <span style={{ fontFamily: inter, fontSize: 16, color: "#fff", opacity: interpolate(s, [0, 1], [0, 1]) }}>
        {displayValue}
      </span>
      <div style={{ width: 80, height: 300, display: "flex", alignItems: "flex-end" }}>
        <div style={{ width: "100%", height, backgroundColor: color, borderRadius: "8px 8px 0 0" }} />
      </div>
      <span style={{ fontFamily: inter, fontSize: 14, color: "#94a3b8" }}>{label}</span>
    </div>
  );
};

const DatosAnimados: React.FC = () => {
  const frame = useCurrentFrame();
  const scene1Opacity = interpolate(frame, [270, 300], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scene2Opacity = interpolate(frame, [300, 330], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a" }}>
      {/* Escena 1: Metricas */}
      {frame < 330 && (
        <AbsoluteFill style={{ opacity: scene1Opacity, justifyContent: "center", alignItems: "center" }}>
          <h1 style={{ fontFamily: montserrat, fontSize: 48, fontWeight: 700, color: "#fff", marginBottom: 60 }}>
            Resultados Q1
          </h1>
          <div style={{ display: "flex", gap: 80 }}>
            {[
              { label: "Revenue", target: 2400000, prefix: "$" },
              { label: "Usuarios", target: 150000 },
              { label: "NPS", target: 87 },
            ].map((m, i) => (
              <Sequence key={m.label} from={30 + i * 20}>
                <Metric label={m.label} target={m.target} prefix={m.prefix} />
              </Sequence>
            ))}
          </div>
        </AbsoluteFill>
      )}

      {/* Escena 2: Barras */}
      {frame >= 300 && (
        <AbsoluteFill style={{ opacity: scene2Opacity, justifyContent: "center", alignItems: "center" }}>
          <h1 style={{ fontFamily: montserrat, fontSize: 48, fontWeight: 700, color: "#fff", marginBottom: 40 }}>
            Revenue Mensual
          </h1>
          <div style={{ display: "flex", gap: 40 }}>
            {[
              { label: "Ene", value: 600, color: "#667eea", display: "$600K" },
              { label: "Feb", value: 800, color: "#764ba2", display: "$800K" },
              { label: "Mar", value: 1000, color: "#a855f7", display: "$1.0M" },
              { label: "Abr", value: 1200, color: "#ec4899", display: "$1.2M" },
            ].map((bar, i) => (
              <Sequence key={bar.label} from={i * 15}>
                <Bar label={bar.label} value={bar.value} maxValue={1200} color={bar.color} displayValue={bar.display} />
              </Sequence>
            ))}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

// Root.tsx:
export const RemotionRoot = () => (
  <Composition id="DatosAnimados" component={DatosAnimados} durationInFrames={600} fps={30} width={1920} height={1080} />
);`,
    instructions:
      "Veras numeros contando hasta su valor final y barras creciendo. Cambia los datos (targets, colores, labels) para tus propios reportes.",
  },
  {
    number: 5,
    title: "Video Completo con Audio y Multiples Escenas",
    level: "Avanzado",
    duration: "30s · 4 escenas · 900 frames",
    description:
      "Video completo con TransitionSeries, audio con fade, overlay de texto y 4 escenas. Combina todas las tecnicas anteriores.",
    prompt: `Crea un video Remotion completo de 30 segundos:
- 1920x1080, 30fps, 30 segundos (900 frames)
- Composition ID: "VideoCompleto"

ESCENAS con TransitionSeries:
1. HERO (225 frames): Fondo gradiente #1a1a2e→#16213e.
   Titulo "SuperProducto" 80px Montserrat Bold blanco, spring({damping:200}) translateY.
   Subtitulo "La herramienta que necesitas" 28px Inter, fade in desde frame 40.

2. FEATURES (225 frames): Fondo #0a0a0a.
   3 features en columna con iconos, stagger 20 frames:
   "⚡ Velocidad extrema"
   "🎯 Precision total"
   "🔄 Automatizado"
   Cada uno: icono 40px + texto 28px Inter, spring({damping:100}) opacidad+translateX.

3. SOCIAL PROOF (225 frames): Fondo #1a1a2e.
   Numero grande "10,000+" con contador animado (Easing.out(Easing.cubic)).
   Subtexto "empresas confian en nosotros" fade in.

4. CTA (225 frames): Fondo gradiente #667eea→#764ba2.
   "Empieza gratis" 64px con scale spring({damping:20}).
   "superproducto.com" 24px con fade in.
   Boton visual (rectangulo redondeado #ffffff20) con pulse sutil.

TRANSICIONES: slide({direction:"from-right"}) con springTiming 20 frames entre cada escena.

AUDIO: Anade <Audio src={staticFile("musica.mp3")} volume={0.3} />
con fade in de 30 frames al inicio y fade out de 60 frames al final.
Usa volume como funcion: (f) => interpolate(f, [0,30,840,900], [0,0.3,0.3,0])

Fuentes: Montserrat Bold + Inter Regular via @remotion/google-fonts.`,
    code: `import { AbsoluteFill, Audio, Composition, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { staticFile } from "remotion";

const { fontFamily: montserrat } = loadMontserrat();
const { fontFamily: inter } = loadInter();

const Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 } });
  const translateY = interpolate(s, [0, 1], [80, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const subOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ fontFamily: montserrat, fontSize: 80, fontWeight: 700, color: "#fff", opacity, transform: \`translateY(\${translateY}px)\` }}>
        SuperProducto
      </h1>
      <p style={{ fontFamily: inter, fontSize: 28, color: "#ffffffaa", marginTop: 20, opacity: subOpacity }}>
        La herramienta que necesitas
      </p>
    </AbsoluteFill>
  );
};

const Features: React.FC = () => {
  const features = ["⚡ Velocidad extrema", "🎯 Precision total", "🔄 Automatizado"];
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a", justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {features.map((feat, i) => (
          <Sequence key={feat} from={i * 20}>
            <FeatureLine text={feat} />
          </Sequence>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const FeatureLine: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 100 } });
  return (
    <p style={{
      fontFamily: inter, fontSize: 36, color: "#fff",
      opacity: interpolate(s, [0, 1], [0, 1]),
      transform: \`translateX(\${interpolate(s, [0, 1], [-60, 0])}px)\`,
    }}>
      {text}
    </p>
  );
};

const SocialProof: React.FC = () => {
  const frame = useCurrentFrame();
  const count = interpolate(frame, [0, 90], [0, 10000], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const subOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a2e", justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ fontFamily: montserrat, fontSize: 96, fontWeight: 700, color: "#667eea" }}>
        {Math.round(count).toLocaleString()}+
      </h1>
      <p style={{ fontFamily: inter, fontSize: 28, color: "#ffffffaa", marginTop: 16, opacity: subOpacity }}>
        empresas confian en nosotros
      </p>
    </AbsoluteFill>
  );
};

const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 20 } });
  const scale = interpolate(s, [0, 1], [0, 1]);
  const urlOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontFamily: montserrat, fontSize: 64, fontWeight: 700, color: "#fff", transform: \`scale(\${scale})\` }}>
          Empieza gratis
        </h1>
        <p style={{ fontFamily: inter, fontSize: 24, color: "#ffffffcc", marginTop: 20, opacity: urlOpacity }}>
          superproducto.com
        </p>
      </div>
    </AbsoluteFill>
  );
};

const VideoCompleto: React.FC = () => {
  const sceneDuration = 225;
  const transitionDuration = 20;

  return (
    <>
      <Audio
        src={staticFile("musica.mp3")}
        volume={(f) =>
          interpolate(f, [0, 30, 840, 900], [0, 0.3, 0.3, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
        }
      />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={sceneDuration}><Hero /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: transitionDuration })} />
        <TransitionSeries.Sequence durationInFrames={sceneDuration}><Features /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: transitionDuration })} />
        <TransitionSeries.Sequence durationInFrames={sceneDuration}><SocialProof /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: transitionDuration })} />
        <TransitionSeries.Sequence durationInFrames={sceneDuration}><CTA /></TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};

// Root.tsx:
export const RemotionRoot = () => (
  <Composition id="VideoCompleto" component={VideoCompleto} durationInFrames={900} fps={30} width={1920} height={1080} />
);`,
    instructions:
      "Pon un archivo musica.mp3 en public/ para el audio. Este video tiene 4 escenas con transiciones, contador animado, stagger y audio con fade. Es un template profesional completo.",
  },
];

/* ══════════════════════════════════════════════
   USE CASE PROMPTS
   ══════════════════════════════════════════════ */

const useCasePrompts = [
  {
    title: "Pedir Arquitectura Antes de Codigo",
    description:
      "Primero pide el storyboard textual, luego genera el codigo. Evita rehacer todo.",
    prompt: `Antes de generar codigo, dame un storyboard textual para este video:

- Video de 30 segundos para YouTube (1920x1080, 30fps)
- Tema: presentacion de producto SaaS
- Tono: profesional pero moderno

Para cada escena dame:
1. Numero de escena y rango de frames
2. Que se ve en pantalla (layout, elementos)
3. Que texto aparece
4. Que animaciones hay (tipo de spring, interpolate)
5. Transicion a la siguiente escena

NO generes codigo todavia. Solo el storyboard textual.
Cuando yo lo apruebe, entonces genera el codigo Remotion completo.`,
  },
  {
    title: "Iterar Sobre un Video Existente",
    description:
      "Pide cambios especificos a un video que ya generaste. Se preciso con frames y valores.",
    prompt: `Modifica el video "ReelTresEscenas" que ya existe en el proyecto:

Cambios en Escena 1:
- Cambia el gradiente de #667eea→#764ba2 a #ff6b6b→#ee5a24
- Aumenta el fontSize del titulo de 64 a 72px
- Cambia el texto a "Top 3 Consejos"

Cambios en Escena 2:
- Reduce el stagger de 15 a 10 frames (mas rapido)
- Cambia los textos a:
  "1️⃣ Planifica antes de grabar"
  "2️⃣ Usa luz natural"
  "3️⃣ Edita con ritmo"

Cambios en Escena 3:
- Cambia spring damping de 20 a 12 (mas rebote en el CTA)
- Texto CTA: "Guardalo para despues"

NO cambies nada mas (transiciones, duraciones, estructura).`,
  },
  {
    title: "Parametrizar con Zod para Videos en Lote",
    description:
      "Crea un video reutilizable donde cambias textos y colores via props.",
    prompt: `Refactoriza el video "VideoCompleto" para hacerlo parametrizable con Zod:

Crea un schema con estos campos:
- titulo (string): texto del hero. Default: "SuperProducto"
- subtitulo (string): texto secundario. Default: "La herramienta que necesitas"
- colorPrimario (string): color hex del gradiente. Default: "#667eea"
- colorSecundario (string): segundo color gradiente. Default: "#764ba2"
- features (array de strings): lista de features. Default: ["⚡ Velocidad", "🎯 Precision", "🔄 Automatizado"]
- metrica (number): numero para social proof. Default: 10000
- ctaTexto (string): texto del CTA. Default: "Empieza gratis"
- ctaUrl (string): URL del CTA. Default: "superproducto.com"

Usa z.object() de Zod para el schema.
Registra la Composition con schema y calculateMetadata.
El componente debe leer TODOS los valores de props, nunca hardcodeados.`,
  },
  {
    title: "Anadir Subtitulos a un Clip de Video",
    description:
      "Importa un video existente y anade subtitulos animados con highlight.",
    prompt: `Crea una composicion que:
1. Importa el video "entrevista.mp4" de public/ usando <OffthreadVideo>
2. Anade subtitulos animados encima del video

Subtitulos (formato Caption):
const captions = [
  { text: "Bienvenidos", startMs: 0, endMs: 2000 },
  { text: "al episodio", startMs: 2000, endMs: 3500 },
  { text: "de hoy", startMs: 3500, endMs: 5000 },
  { text: "vamos a hablar", startMs: 5000, endMs: 7000 },
  { text: "de inteligencia", startMs: 7000, endMs: 9000 },
  { text: "artificial", startMs: 9000, endMs: 11000 },
];

Estilo de subtitulos:
- Posicion: centro inferior (bottom: 15%)
- Fondo: rgba(0,0,0,0.7) con padding 12px 24px y borderRadius 8px
- Texto: Inter Bold, 42px, blanco
- Palabra activa: highlight en #FFD700 (amarillo)
- Usa la skill display-captions si esta disponible

Composition: "EntrevistaSubtitulada", duracion: calcula con getVideoDuration.`,
  },
];

/* ══════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════ */

export const PromptAssistant: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* ── HEADER ── */}
      <div>
        <h2 className="text-xl font-bold text-foreground">
          Asistente de Prompts
        </h2>
        <p className="text-sm text-subtitle mt-1">
          Aprende como funcionan los prompts con ejemplos ejecutables. Copia el
          prompt, pegalo en Claude Code, y ve el resultado en Remotion Studio.
        </p>
      </div>

      {/* ══ SECCION 1: ANATOMIA ══ */}
      <Section title="1. Anatomia de un Prompt — Cada color es una seccion" defaultOpen>
        <p className="text-xs text-subtitle mb-4">
          Un buen prompt tiene 6 secciones. Cada una le dice a Claude exactamente
          que hacer. Sin ambiguedades, sin &quot;hazlo bonito&quot; — solo datos
          concretos.
        </p>

        <PromptLine
          color="#3b82f6"
          label="SPECS TECNICAS"
          text={`- Resolucion: 1080x1920 (vertical 9:16)
- FPS: 30
- Duracion: 15 segundos (450 frames)
- Composition ID: "ReelDemo"`}
          explanation="Define las dimensiones exactas, fps y duracion. Claude calcula los frames automaticamente pero es mejor darselos hechos."
        />

        <PromptLine
          color="#22c55e"
          label="ESCENAS"
          text={`1. (frames 0-150) Fondo gradiente #667eea a #764ba2.
   Texto "Descubre el poder de la IA" centrado,
   spring({damping:200, stiffness:100}) desde translateY(100).

2. (frames 150-300) Fondo #0a0a0a.
   Tres cards con stagger de 20 frames,
   spring({damping:100}) en opacidad y translateX.

3. (frames 300-450) Logo centrado scale spring({damping:20}).
   CTA "Sigueme" fade in desde frame 380.`}
          explanation="Describe CADA escena con rango de frames, que se ve, que texto, que animacion con parametros exactos de spring. Nunca 'animacion suave' — siempre damping:200."
        />

        <PromptLine
          color="#a855f7"
          label="ESTILO VISUAL"
          text={`Minimalista con glassmorphism sutil en las cards.
Fuente titulo: Montserrat Bold via loadFont de @remotion/google-fonts.
Fuente cuerpo: Inter Regular.`}
          explanation="Nombre del estilo + fuentes exactas. Siempre indica que use loadFont de @remotion/google-fonts, no CSS imports."
        />

        <PromptLine
          color="#f97316"
          label="ANIMACIONES"
          text={`Transiciones entre escenas con TransitionSeries
y slide({direction:"from-left"}) con
springTiming({config:{damping:200}}).`}
          explanation="Tipo de transicion + direccion + timing. TransitionSeries es la API correcta de Remotion para transiciones entre escenas."
        />

        <PromptLine
          color="#ec4899"
          label="AUDIO"
          text={`Sin audio por ahora.`}
          explanation="Indica explicitamente si hay audio o no. Si hay: archivo, volumen (0-1), fade in/out en frames."
        />

        <PromptLine
          color="#ef4444"
          label="REGLAS"
          text={`Usar useCurrentFrame() + useVideoConfig() de "remotion".
Animaciones SOLO con interpolate/spring de Remotion.
NUNCA CSS transitions ni animate-* de Tailwind.
Assets en public/ con staticFile().
Registrar <Composition> en Root.tsx con schema Zod.`}
          explanation="Las reglas evitan errores comunes. Sin ellas, Claude podria usar CSS animations que no funcionan en Remotion."
        />

        <div className="mt-4 pt-4 border-t border-unfocused-border-color">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-foreground">
              Prompt completo listo para copiar:
            </span>
            <CopyButton text={fullAnatomyPrompt} label="Copiar prompt completo" />
          </div>
        </div>
      </Section>

      {/* ══ SECCION 2: EJERCICIOS ══ */}
      <Section title="2. Ejercicios Ejecutables — De basico a avanzado" defaultOpen>
        <p className="text-xs text-subtitle mb-4">
          Cada ejercicio tiene el prompt que pegas en Claude Code y el codigo que
          deberia generar. Puedes copiar el prompt para que Claude lo genere, o
          copiar el codigo directamente para probarlo.
        </p>
        <div className="space-y-4">
          {exercises.map((ex) => (
            <Exercise key={ex.number} {...ex} />
          ))}
        </div>
      </Section>

      {/* ══ SECCION 3: USE CASES ══ */}
      <Section title="3. Prompts por Caso de Uso — Copiar y adaptar">
        <p className="text-xs text-subtitle mb-4">
          Prompts especializados para situaciones comunes. Copialos y adapta los
          valores a tu proyecto.
        </p>
        <div className="space-y-4">
          {useCasePrompts.map((uc) => (
            <UseCasePrompt key={uc.title} {...uc} />
          ))}
        </div>
      </Section>
    </div>
  );
};
