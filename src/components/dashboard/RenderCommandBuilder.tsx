"use client";

import { useState, useMemo } from "react";
import { cn } from "../../lib/utils";
import { renderCodecs } from "../../data/render-codecs";
import { CopyButton } from "./CopyButton";

export const RenderCommandBuilder: React.FC = () => {
  const [compositionId, setCompositionId] = useState("MyComp");
  const [outputPath, setOutputPath] = useState("out/video.mp4");
  const [codec, setCodec] = useState("h264");
  const [crf, setCrf] = useState(18);
  const [overrideResolution, setOverrideResolution] = useState(false);
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [useFrameRange, setUseFrameRange] = useState(false);
  const [startFrame, setStartFrame] = useState(0);
  const [endFrame, setEndFrame] = useState(89);
  const [muted, setMuted] = useState(false);
  const [enforceAudio, setEnforceAudio] = useState(false);
  const [logLevel, setLogLevel] = useState("info");

  const selectedCodec = renderCodecs.find((c) => c.value === codec);

  const command = useMemo(() => {
    const parts = ["npx remotion render", compositionId];

    // Update output extension based on codec
    const ext = selectedCodec?.extension || "mp4";
    const path = outputPath.replace(/\.[^.]+$/, `.${ext}`);
    parts.push(path);

    if (codec !== "h264") parts.push(`--codec ${codec}`);
    if (codec !== "gif" && codec !== "prores") parts.push(`--crf ${crf}`);
    if (overrideResolution) {
      parts.push(`--width ${width}`);
      parts.push(`--height ${height}`);
    }
    if (useFrameRange) parts.push(`--frames ${startFrame}-${endFrame}`);
    if (muted) parts.push("--muted");
    if (enforceAudio) parts.push("--enforce-audio-track");
    if (logLevel !== "info") parts.push(`--log-level ${logLevel}`);

    return parts.join(" ");
  }, [
    compositionId, outputPath, codec, crf, overrideResolution, width, height,
    useFrameRange, startFrame, endFrame, muted, enforceAudio, logLevel, selectedCodec,
  ]);

  const inputClass =
    "leading-[1.7] block w-full rounded-geist bg-background p-geist-half text-foreground text-sm border border-unfocused-border-color transition-colors duration-150 ease-in-out focus:border-focused-border-color outline-none";

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">
            Composition ID
          </label>
          <input
            type="text"
            value={compositionId}
            onChange={(e) => setCompositionId(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">
            Ruta de salida
          </label>
          <input
            type="text"
            value={outputPath}
            onChange={(e) => setOutputPath(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">Codec</label>
          <select
            value={codec}
            onChange={(e) => setCodec(e.target.value)}
            className={inputClass}
          >
            {renderCodecs.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          {selectedCodec && (
            <p className="text-xs text-subtitle mt-1">
              {selectedCodec.description}
            </p>
          )}
        </div>

        {codec !== "gif" && codec !== "prores" && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">
              CRF (Calidad): {crf}
            </label>
            <input
              type="range"
              min={1}
              max={51}
              value={crf}
              onChange={(e) => setCrf(Number(e.target.value))}
              className="w-full accent-foreground"
            />
            <div className="flex justify-between text-xs text-subtitle">
              <span>Mejor calidad</span>
              <span>Menor tamano</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={overrideResolution}
            onChange={(e) => setOverrideResolution(e.target.checked)}
            className="accent-foreground"
          />
          <span className="text-sm">Override de resolucion</span>
        </label>
        {overrideResolution && (
          <div className="grid grid-cols-2 gap-3 ml-6">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-subtitle">Ancho</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-subtitle">Alto</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className={inputClass}
              />
            </div>
          </div>
        )}

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useFrameRange}
            onChange={(e) => setUseFrameRange(e.target.checked)}
            className="accent-foreground"
          />
          <span className="text-sm">Rango de frames</span>
        </label>
        {useFrameRange && (
          <div className="grid grid-cols-2 gap-3 ml-6">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-subtitle">Frame inicio</label>
              <input
                type="number"
                min={0}
                value={startFrame}
                onChange={(e) => setStartFrame(Number(e.target.value))}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-subtitle">Frame fin</label>
              <input
                type="number"
                min={0}
                value={endFrame}
                onChange={(e) => setEndFrame(Number(e.target.value))}
                className={inputClass}
              />
            </div>
          </div>
        )}

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={muted}
            onChange={(e) => setMuted(e.target.checked)}
            className="accent-foreground"
          />
          <span className="text-sm">Sin audio (--muted)</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={enforceAudio}
            onChange={(e) => setEnforceAudio(e.target.checked)}
            className="accent-foreground"
          />
          <span className="text-sm">Forzar pista de audio (--enforce-audio-track)</span>
        </label>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">
            Nivel de log
          </label>
          <select
            value={logLevel}
            onChange={(e) => setLogLevel(e.target.value)}
            className={cn(inputClass, "w-48")}
          >
            {["verbose", "info", "warn", "error"].map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Comando</h3>
          <CopyButton text={command} label="Copiar comando" />
        </div>
        <pre className="bg-foreground/5 rounded-geist p-geist-half text-sm font-mono text-foreground overflow-x-auto whitespace-pre-wrap">
          {command}
        </pre>
      </div>
    </div>
  );
};
