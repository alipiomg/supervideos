"use client";

import { useState, useMemo, useCallback } from "react";
import { cn } from "../../lib/utils";
import { CopyButton } from "./CopyButton";

type Scene = {
  description: string;
  durationSeconds: number;
};

const visualStyles = [
  "Minimalista",
  "Cinematico",
  "Corporativo",
  "Retro / Vintage",
  "Neon / Cyberpunk",
  "Cartoon / Playful",
  "Brutalist",
  "Glassmorphism",
  "Gradientes suaves",
  "Oscuro elegante",
];

const animationTypes = [
  { id: "spring-smooth", label: "Spring suave (damping: 200)", desc: "Movimiento natural sin rebote" },
  { id: "spring-bouncy", label: "Spring con rebote (damping: 8)", desc: "Efecto elastico divertido" },
  { id: "spring-snappy", label: "Spring rapido (damping: 20, stiffness: 200)", desc: "Movimiento rapido y preciso" },
  { id: "linear", label: "Lineal", desc: "Velocidad constante" },
  { id: "ease-out", label: "Ease Out", desc: "Rapido al inicio, lento al final" },
  { id: "ease-in-out", label: "Ease In-Out", desc: "Suave al inicio y al final" },
];

const Section: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-unfocused-border-color rounded-geist overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-geist-half bg-foreground/5 hover:bg-foreground/10 transition-colors"
      >
        <span className="text-sm font-medium text-foreground">{title}</span>
        <span className="text-foreground/50 text-xs">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="p-geist-half flex flex-col gap-3">{children}</div>}
    </div>
  );
};

export const PromptBuilder: React.FC<{
  initialWidth?: number;
  initialHeight?: number;
  initialFps?: number;
  initialDuration?: number;
}> = ({
  initialWidth = 1920,
  initialHeight = 1080,
  initialFps = 30,
  initialDuration = 10,
}) => {
  const [width] = useState(initialWidth);
  const [height] = useState(initialHeight);
  const [fps] = useState(initialFps);
  const [totalDuration] = useState(initialDuration);

  const [scenes, setScenes] = useState<Scene[]>([
    { description: "", durationSeconds: 5 },
  ]);
  const [selectedStyle, setSelectedStyle] = useState("Minimalista");
  const [customStyleNotes, setCustomStyleNotes] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#4ecdc4");
  const [secondaryColor, setSecondaryColor] = useState("#ff6b6b");
  const [bgColor, setBgColor] = useState("#0f0f0f");
  const [textColor, setTextColor] = useState("#ffffff");
  const [titleFont, setTitleFont] = useState("Montserrat");
  const [bodyFont, setBodyFont] = useState("Inter");
  const [selectedAnimation, setSelectedAnimation] = useState("spring-smooth");
  const [transitionType, setTransitionType] = useState("crossfade");
  const [transitionFrames, setTransitionFrames] = useState(20);
  const [hasAudio, setHasAudio] = useState(false);
  const [audioNotes, setAudioNotes] = useState("");
  const [hasVoiceover, setHasVoiceover] = useState(false);
  const [extraNotes, setExtraNotes] = useState("");

  const addScene = useCallback(() => {
    setScenes((prev) => [...prev, { description: "", durationSeconds: 5 }]);
  }, []);

  const removeScene = useCallback((index: number) => {
    setScenes((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateScene = useCallback(
    (index: number, field: keyof Scene, value: string | number) => {
      setScenes((prev) =>
        prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
      );
    },
    [],
  );

  const generatedPrompt = useMemo(() => {
    let prompt = `Crea un video con Remotion (${width}x${height}, ${fps}fps, ${totalDuration} segundos).\n\n`;

    // Scenes
    if (scenes.some((s) => s.description)) {
      prompt += `## Estructura de escenas\n`;
      let timeAccum = 0;
      scenes.forEach((scene, i) => {
        const end = timeAccum + scene.durationSeconds;
        if (scene.description) {
          prompt += `- Escena ${i + 1} (${timeAccum}-${end}s): ${scene.description}\n`;
        }
        timeAccum = end;
      });
      prompt += `\n`;
    }

    // Style
    prompt += `## Estilo visual\n`;
    prompt += `Estilo: ${selectedStyle}.\n`;
    if (customStyleNotes) prompt += `Notas: ${customStyleNotes}\n`;
    prompt += `\n`;

    // Colors & fonts
    prompt += `## Colores y tipografia\n`;
    prompt += `- Primario: ${primaryColor}\n`;
    prompt += `- Secundario: ${secondaryColor}\n`;
    prompt += `- Fondo: ${bgColor}\n`;
    prompt += `- Texto: ${textColor}\n`;
    prompt += `- Titulos: ${titleFont} Bold\n`;
    prompt += `- Cuerpo: ${bodyFont} Regular\n\n`;

    // Animation
    const anim = animationTypes.find((a) => a.id === selectedAnimation);
    prompt += `## Animaciones\n`;
    prompt += `Tipo de animacion principal: ${anim?.label || selectedAnimation}\n`;
    prompt += `Transiciones entre escenas: ${transitionType}, ${transitionFrames} frames.\n`;
    prompt += `IMPORTANTE: Usar SOLO useCurrentFrame() e interpolate/spring. NUNCA CSS transitions ni animate-* de Tailwind.\n\n`;

    // Audio
    if (hasAudio || hasVoiceover) {
      prompt += `## Audio\n`;
      if (hasAudio) prompt += `- Musica/efectos: ${audioNotes || "Anadir musica de fondo apropiada"}\n`;
      if (hasVoiceover) prompt += `- Voiceover: Generar voz en off con ElevenLabs TTS\n`;
      prompt += `\n`;
    }

    // Extra
    if (extraNotes) {
      prompt += `## Notas adicionales\n${extraNotes}\n\n`;
    }

    prompt += `Registra la composicion en Root.tsx. Usa <TransitionSeries> si hay multiples escenas.`;

    return prompt;
  }, [
    width, height, fps, totalDuration, scenes, selectedStyle, customStyleNotes,
    primaryColor, secondaryColor, bgColor, textColor, titleFont, bodyFont,
    selectedAnimation, transitionType, transitionFrames, hasAudio, audioNotes,
    hasVoiceover, extraNotes,
  ]);

  const inputClass =
    "leading-[1.7] block w-full rounded-geist bg-background p-geist-half text-foreground text-sm border border-unfocused-border-color transition-colors duration-150 ease-in-out focus:border-focused-border-color outline-none";

  return (
    <div className="flex flex-col gap-4">
      {/* Scenes */}
      <Section title="Estructura de Escenas" defaultOpen>
        {scenes.map((scene, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="flex-1">
              <label className="text-xs text-subtitle mb-1 block">
                Escena {i + 1}
              </label>
              <textarea
                value={scene.description}
                onChange={(e) => updateScene(i, "description", e.target.value)}
                placeholder="Describe que ocurre en esta escena..."
                className={cn(inputClass, "min-h-[60px] resize-y")}
              />
            </div>
            <div className="w-20">
              <label className="text-xs text-subtitle mb-1 block">Seg.</label>
              <input
                type="number"
                min={1}
                value={scene.durationSeconds}
                onChange={(e) =>
                  updateScene(i, "durationSeconds", Number(e.target.value))
                }
                className={inputClass}
              />
            </div>
            {scenes.length > 1 && (
              <button
                onClick={() => removeScene(i)}
                className="mt-5 text-geist-error text-sm hover:underline"
              >
                X
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addScene}
          className="text-sm text-foreground/60 hover:text-foreground border border-dashed border-unfocused-border-color rounded-geist p-geist-quarter text-center"
        >
          + Anadir escena
        </button>
      </Section>

      {/* Visual Style */}
      <Section title="Estilo Visual">
        <div className="flex flex-wrap gap-2">
          {visualStyles.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={cn(
                "px-3 py-1 rounded-geist text-xs border transition-all",
                selectedStyle === style
                  ? "border-foreground bg-foreground text-background"
                  : "border-unfocused-border-color hover:border-focused-border-color",
              )}
            >
              {style}
            </button>
          ))}
        </div>
        <textarea
          value={customStyleNotes}
          onChange={(e) => setCustomStyleNotes(e.target.value)}
          placeholder="Notas adicionales sobre el estilo..."
          className={cn(inputClass, "min-h-[40px] resize-y")}
        />
      </Section>

      {/* Colors & Fonts */}
      <Section title="Colores y Tipografia">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Primario", value: primaryColor, set: setPrimaryColor },
            { label: "Secundario", value: secondaryColor, set: setSecondaryColor },
            { label: "Fondo", value: bgColor, set: setBgColor },
            { label: "Texto", value: textColor, set: setTextColor },
          ].map(({ label, value, set }) => (
            <div key={label} className="flex flex-col gap-1">
              <label className="text-xs text-subtitle">{label}</label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className="w-8 h-8 rounded border border-unfocused-border-color cursor-pointer"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className={cn(inputClass, "flex-1")}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-subtitle">Fuente Titulos</label>
            <select
              value={titleFont}
              onChange={(e) => setTitleFont(e.target.value)}
              className={inputClass}
            >
              {["Montserrat", "Poppins", "Inter", "Space Grotesk", "Roboto", "Open Sans", "Playfair Display", "Oswald"].map(
                (f) => (
                  <option key={f} value={f}>{f}</option>
                ),
              )}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-subtitle">Fuente Cuerpo</label>
            <select
              value={bodyFont}
              onChange={(e) => setBodyFont(e.target.value)}
              className={inputClass}
            >
              {["Inter", "Roboto", "Open Sans", "Lato", "Source Sans Pro", "Noto Sans"].map(
                (f) => (
                  <option key={f} value={f}>{f}</option>
                ),
              )}
            </select>
          </div>
        </div>
      </Section>

      {/* Animations */}
      <Section title="Animaciones y Transiciones">
        <div className="flex flex-col gap-2">
          {animationTypes.map((anim) => (
            <label
              key={anim.id}
              className={cn(
                "flex items-center gap-3 p-2 rounded-geist border cursor-pointer transition-all",
                selectedAnimation === anim.id
                  ? "border-foreground bg-foreground/5"
                  : "border-unfocused-border-color hover:border-focused-border-color",
              )}
            >
              <input
                type="radio"
                name="animation"
                value={anim.id}
                checked={selectedAnimation === anim.id}
                onChange={() => setSelectedAnimation(anim.id)}
                className="accent-foreground"
              />
              <div>
                <div className="text-sm font-medium">{anim.label}</div>
                <div className="text-xs text-subtitle">{anim.desc}</div>
              </div>
            </label>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-subtitle">Tipo de transicion</label>
            <select
              value={transitionType}
              onChange={(e) => setTransitionType(e.target.value)}
              className={inputClass}
            >
              {["crossfade", "slide", "wipe", "flip", "clockWipe", "none"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-subtitle">Frames de transicion</label>
            <input
              type="number"
              min={5}
              max={60}
              value={transitionFrames}
              onChange={(e) => setTransitionFrames(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>
      </Section>

      {/* Audio */}
      <Section title="Audio">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={hasAudio}
            onChange={(e) => setHasAudio(e.target.checked)}
            className="accent-foreground"
          />
          <span className="text-sm">Incluir musica/efectos de sonido</span>
        </label>
        {hasAudio && (
          <textarea
            value={audioNotes}
            onChange={(e) => setAudioNotes(e.target.value)}
            placeholder="Describe el tipo de audio (ej: musica corporativa suave, efecto whoosh en transiciones...)"
            className={cn(inputClass, "min-h-[40px] resize-y")}
          />
        )}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={hasVoiceover}
            onChange={(e) => setHasVoiceover(e.target.checked)}
            className="accent-foreground"
          />
          <span className="text-sm">Incluir voz en off (voiceover)</span>
        </label>
      </Section>

      {/* Extra notes */}
      <Section title="Notas Adicionales">
        <textarea
          value={extraNotes}
          onChange={(e) => setExtraNotes(e.target.value)}
          placeholder="Cualquier instruccion adicional para Claude..."
          className={cn(inputClass, "min-h-[60px] resize-y")}
        />
      </Section>

      {/* Generated prompt */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Prompt Generado
          </h3>
          <CopyButton text={generatedPrompt} label="Copiar prompt" />
        </div>
        <textarea
          readOnly
          value={generatedPrompt}
          className={cn(
            inputClass,
            "min-h-[200px] resize-y bg-foreground/5 font-mono text-xs",
          )}
        />
      </div>
    </div>
  );
};
