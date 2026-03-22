"use client";

import { useState, useCallback } from "react";
import { cn } from "../../lib/utils";
import { platformPresets } from "../../data/platform-presets";

export type VideoConfig = {
  width: number;
  height: number;
  fps: number;
  durationSeconds: number;
  durationInFrames: number;
  platform: string;
};

export const VideoConfigPanel: React.FC<{
  onConfigChange?: (config: VideoConfig) => void;
}> = ({ onConfigChange }) => {
  const [selectedPreset, setSelectedPreset] = useState("youtube");
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [fps, setFps] = useState(30);
  const [durationSeconds, setDurationSeconds] = useState(10);

  const durationInFrames = Math.ceil(durationSeconds * fps);

  const handlePresetClick = useCallback(
    (presetId: string) => {
      const preset = platformPresets.find((p) => p.id === presetId);
      if (!preset) return;
      setSelectedPreset(presetId);
      setWidth(preset.width);
      setHeight(preset.height);
      setFps(preset.fps);
      onConfigChange?.({
        width: preset.width,
        height: preset.height,
        fps: preset.fps,
        durationSeconds,
        durationInFrames: Math.ceil(durationSeconds * preset.fps),
        platform: preset.platform,
      });
    },
    [durationSeconds, onConfigChange],
  );

  const notifyChange = useCallback(() => {
    onConfigChange?.({
      width,
      height,
      fps,
      durationSeconds,
      durationInFrames,
      platform: selectedPreset,
    });
  }, [width, height, fps, durationSeconds, durationInFrames, selectedPreset, onConfigChange]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">
          Plataforma
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {platformPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetClick(preset.id)}
              className={cn(
                "flex flex-col items-center gap-1 p-geist-half border rounded-geist text-sm transition-all duration-150",
                selectedPreset === preset.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-unfocused-border-color bg-background text-foreground hover:border-focused-border-color",
              )}
            >
              <span className="font-medium">{preset.name}</span>
              <span className="text-xs opacity-60">
                {preset.width}x{preset.height}
              </span>
              <span className="text-xs opacity-40">{preset.ratio}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">Ancho</label>
          <input
            type="number"
            value={width}
            onChange={(e) => {
              setWidth(Number(e.target.value));
              setSelectedPreset("custom");
            }}
            onBlur={notifyChange}
            className="leading-[1.7] block w-full rounded-geist bg-background p-geist-half text-foreground text-sm border border-unfocused-border-color transition-colors duration-150 ease-in-out focus:border-focused-border-color outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">Alto</label>
          <input
            type="number"
            value={height}
            onChange={(e) => {
              setHeight(Number(e.target.value));
              setSelectedPreset("custom");
            }}
            onBlur={notifyChange}
            className="leading-[1.7] block w-full rounded-geist bg-background p-geist-half text-foreground text-sm border border-unfocused-border-color transition-colors duration-150 ease-in-out focus:border-focused-border-color outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">FPS</label>
          <select
            value={fps}
            onChange={(e) => {
              setFps(Number(e.target.value));
              notifyChange();
            }}
            className="leading-[1.7] block w-full rounded-geist bg-background p-geist-half text-foreground text-sm border border-unfocused-border-color transition-colors duration-150 ease-in-out focus:border-focused-border-color outline-none"
          >
            {[24, 25, 30, 60].map((f) => (
              <option key={f} value={f}>
                {f} fps
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">
            Duracion (s)
          </label>
          <input
            type="number"
            min={1}
            value={durationSeconds}
            onChange={(e) => setDurationSeconds(Number(e.target.value))}
            onBlur={notifyChange}
            className="leading-[1.7] block w-full rounded-geist bg-background p-geist-half text-foreground text-sm border border-unfocused-border-color transition-colors duration-150 ease-in-out focus:border-focused-border-color outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 p-geist-half bg-foreground/5 rounded-geist">
        <div className="text-sm">
          <span className="text-subtitle">Resolucion:</span>{" "}
          <span className="font-medium text-foreground">
            {width}x{height}
          </span>
        </div>
        <div className="text-sm">
          <span className="text-subtitle">Frames:</span>{" "}
          <span className="font-medium text-foreground">{durationInFrames}</span>
        </div>
        <div className="text-sm">
          <span className="text-subtitle">Duracion:</span>{" "}
          <span className="font-medium text-foreground">
            {durationSeconds}s @ {fps}fps
          </span>
        </div>
      </div>
    </div>
  );
};
