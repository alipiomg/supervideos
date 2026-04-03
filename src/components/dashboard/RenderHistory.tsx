"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "../../lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RenderEntry {
  id: string;
  timestamp: string;
  compositionId: string;
  status: "pending" | "rendering" | "done" | "error";
  codec: string;
  resolution: string;
  duration: string;
  fps: number;
  crf: number;
  command: string;
  outputPath: string;
  props?: string;
  notes?: string;
}

type StatusType = RenderEntry["status"];

const STORAGE_KEY = "supervideos-render-history";

const CODEC_OPTIONS = ["h264", "h265", "vp8", "vp9", "prores", "gif"] as const;

const STATUS_COLORS: Record<StatusType, string> = {
  done: "bg-green-500/15 text-green-400 border border-green-500/30",
  pending: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  rendering: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  error: "bg-red-500/15 text-red-400 border border-red-500/30",
};

const STATUS_LABELS: Record<StatusType, string> = {
  done: "Completado",
  pending: "Pendiente",
  rendering: "Renderizando",
  error: "Error",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadHistory(): RenderEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as RenderEntry[];
  } catch {
    return [];
  }
}

function saveHistory(entries: RenderEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function buildCommand(entry: {
  compositionId: string;
  outputPath: string;
  codec: string;
  crf: number;
  props?: string;
}): string {
  let cmd = `npx remotion render src/remotion/index.ts ${entry.compositionId} ${entry.outputPath} --codec ${entry.codec} --crf ${entry.crf}`;
  if (entry.props && entry.props.trim()) {
    cmd += ` --props='${entry.props.trim()}'`;
  }
  return cmd;
}

function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.floor(
    (today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24)
  );

  const time = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (diffDays === 0) return `Hoy ${time}`;
  if (diffDays === 1) return `Ayer ${time}`;
  return `${date.getDate()} ${date.toLocaleString("es-ES", { month: "short" })} ${date.getFullYear()} ${time}`;
}

function cycleStatus(current: StatusType): StatusType {
  if (current === "pending") return "rendering";
  if (current === "rendering") return "done";
  if (current === "done") return "pending";
  return "pending"; // error -> pending
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

// ---------------------------------------------------------------------------
// Default form values
// ---------------------------------------------------------------------------

const DEFAULT_FORM = {
  compositionId: "",
  codec: "h264",
  resolution: "1920x1080",
  duration: "30s",
  fps: 30,
  crf: 18,
  outputPath: "out/video.mp4",
  props: "",
  notes: "",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function RenderHistory() {
  const [history, setHistory] = useState<RenderEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedCmd, setExpandedCmd] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [lastCommand, setLastCommand] = useState<string | null>(null);

  // Load on mount
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  // Persist helper
  const persist = useCallback((entries: RenderEntry[]) => {
    const sorted = [...entries].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    setHistory(sorted);
    saveHistory(sorted);
  }, []);

  // Stats
  const total = history.length;
  const completed = history.filter((e) => e.status === "done").length;
  const errors = history.filter((e) => e.status === "error").length;

  // Form handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.compositionId.trim()) return;

    const command = buildCommand({
      compositionId: form.compositionId,
      outputPath: form.outputPath,
      codec: form.codec,
      crf: Number(form.crf),
      props: form.props,
    });

    const entry: RenderEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      compositionId: form.compositionId,
      status: "pending",
      codec: form.codec,
      resolution: form.resolution,
      duration: form.duration,
      fps: Number(form.fps),
      crf: Number(form.crf),
      command,
      outputPath: form.outputPath,
      props: form.props || undefined,
      notes: form.notes || undefined,
    };

    persist([entry, ...history]);
    setLastCommand(command);
    setForm(DEFAULT_FORM);
  };

  const handleDelete = (id: string) => {
    persist(history.filter((e) => e.id !== id));
  };

  const handleStatusChange = (id: string) => {
    persist(
      history.map((e) =>
        e.id === id ? { ...e, status: cycleStatus(e.status) } : e
      )
    );
  };

  const handleSetStatus = (id: string, status: StatusType) => {
    persist(
      history.map((e) => (e.id === id ? { ...e, status } : e))
    );
  };

  const handleClear = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
      return;
    }
    persist([]);
    setConfirmClear(false);
  };

  const handleCopy = (text: string, id: string) => {
    copyToClipboard(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // ---------------------------------------------------------------------------
  // Input class helper
  // ---------------------------------------------------------------------------
  const inputClass =
    "w-full rounded-geist border border-unfocused-border-color bg-background text-foreground p-geist-half text-sm focus:border-focused-border-color focus:outline-none transition-colors";
  const labelClass = "block text-subtitle text-xs mb-1 font-medium";
  const btnClass =
    "rounded-geist px-3 py-1.5 text-sm font-medium transition-colors";

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Historial de Renders
          </h2>
          <div className="mt-1 flex gap-4 text-subtitle text-xs">
            <span>Total: {total}</span>
            <span className="text-green-400">Completados: {completed}</span>
            <span className="text-red-400">Errores: {errors}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setShowForm((v) => !v);
              setLastCommand(null);
            }}
            className={cn(
              btnClass,
              "bg-blue-600 text-white hover:bg-blue-500"
            )}
          >
            {showForm ? "Cerrar Formulario" : "Nuevo Render"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={total === 0}
            className={cn(
              btnClass,
              confirmClear
                ? "bg-red-600 text-white hover:bg-red-500"
                : "border border-unfocused-border-color text-foreground hover:border-focused-border-color",
              total === 0 && "opacity-40 cursor-not-allowed"
            )}
          >
            {confirmClear ? "Confirmar Limpiar" : "Limpiar Historial"}
          </button>
        </div>
      </div>

      {/* New Render Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-geist border border-unfocused-border-color bg-background p-geist space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Composition ID */}
            <div>
              <label className={labelClass}>Composition ID</label>
              <input
                name="compositionId"
                value={form.compositionId}
                onChange={handleChange}
                placeholder="MyComp"
                required
                className={inputClass}
              />
            </div>

            {/* Codec */}
            <div>
              <label className={labelClass}>Codec</label>
              <select
                name="codec"
                value={form.codec}
                onChange={handleChange}
                className={inputClass}
              >
                {CODEC_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Resolution */}
            <div>
              <label className={labelClass}>Resolution</label>
              <input
                name="resolution"
                value={form.resolution}
                onChange={handleChange}
                placeholder="1920x1080"
                className={inputClass}
              />
            </div>

            {/* Duration */}
            <div>
              <label className={labelClass}>Duration</label>
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="30s"
                className={inputClass}
              />
            </div>

            {/* FPS */}
            <div>
              <label className={labelClass}>FPS</label>
              <input
                name="fps"
                type="number"
                value={form.fps}
                onChange={handleChange}
                min={1}
                max={120}
                className={inputClass}
              />
            </div>

            {/* CRF */}
            <div>
              <label className={labelClass}>CRF</label>
              <input
                name="crf"
                type="number"
                value={form.crf}
                onChange={handleChange}
                min={0}
                max={63}
                className={inputClass}
              />
            </div>

            {/* Output Path */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label className={labelClass}>Output Path</label>
              <input
                name="outputPath"
                value={form.outputPath}
                onChange={handleChange}
                placeholder="out/video.mp4"
                className={inputClass}
              />
            </div>

            {/* Props JSON */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label className={labelClass}>Props JSON (opcional)</label>
              <textarea
                name="props"
                value={form.props}
                onChange={handleChange}
                rows={2}
                placeholder='{"title":"Mi Video","color":"#ff0000"}'
                className={cn(inputClass, "resize-y")}
              />
            </div>

            {/* Notes */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label className={labelClass}>Notas (opcional)</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={2}
                placeholder="Notas sobre este render..."
                className={cn(inputClass, "resize-y")}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className={cn(btnClass, "bg-blue-600 text-white hover:bg-blue-500")}
            >
              Registrar Render
            </button>
            <button
              type="button"
              onClick={() => setForm(DEFAULT_FORM)}
              className={cn(
                btnClass,
                "border border-unfocused-border-color text-foreground hover:border-focused-border-color"
              )}
            >
              Reset
            </button>
          </div>

          {/* Last generated command */}
          {lastCommand && (
            <div className="mt-3 rounded-geist border border-focused-border-color bg-background p-geist-half">
              <div className="flex items-center justify-between mb-1">
                <span className="text-subtitle text-xs font-medium">
                  Comando generado
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(lastCommand, "last-cmd")}
                  className={cn(btnClass, "text-xs py-1 px-2 border border-unfocused-border-color text-foreground hover:border-focused-border-color")}
                >
                  {copiedId === "last-cmd" ? "Copiado!" : "Copiar"}
                </button>
              </div>
              <code className="block text-xs text-green-400 break-all whitespace-pre-wrap">
                {lastCommand}
              </code>
            </div>
          )}
        </form>
      )}

      {/* Empty State */}
      {history.length === 0 && (
        <div className="rounded-geist border border-unfocused-border-color bg-background p-geist text-center">
          <p className="text-subtitle text-sm">
            No hay renders registrados. Usa el formulario para registrar tu
            primer render o genera un comando desde el tab Render.
          </p>
        </div>
      )}

      {/* History Table */}
      {history.length > 0 && (
        <div className="rounded-geist border border-unfocused-border-color overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-unfocused-border-color bg-background text-subtitle text-xs uppercase tracking-wider">
                  <th className="p-geist-half">Fecha</th>
                  <th className="p-geist-half">Composicion</th>
                  <th className="p-geist-half">Estado</th>
                  <th className="p-geist-half">Codec / Res</th>
                  <th className="p-geist-half">Duracion</th>
                  <th className="p-geist-half">Comando</th>
                  <th className="p-geist-half text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-unfocused-border-color">
                {history.map((entry) => (
                  <tr
                    key={entry.id}
                    className="bg-background hover:bg-foreground/5 transition-colors"
                  >
                    {/* Date */}
                    <td className="p-geist-half whitespace-nowrap text-foreground">
                      {formatRelativeDate(entry.timestamp)}
                    </td>

                    {/* Composition */}
                    <td className="p-geist-half font-mono text-foreground">
                      {entry.compositionId}
                    </td>

                    {/* Status */}
                    <td className="p-geist-half">
                      <button
                        type="button"
                        onClick={() => handleStatusChange(entry.id)}
                        className={cn(
                          "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium cursor-pointer transition-colors",
                          STATUS_COLORS[entry.status]
                        )}
                        title="Click para cambiar estado"
                      >
                        {STATUS_LABELS[entry.status]}
                      </button>
                    </td>

                    {/* Codec + Resolution */}
                    <td className="p-geist-half text-subtitle">
                      {entry.codec} / {entry.resolution}
                    </td>

                    {/* Duration */}
                    <td className="p-geist-half text-subtitle">
                      {entry.duration}
                    </td>

                    {/* Command */}
                    <td className="p-geist-half max-w-[200px]">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedCmd(
                            expandedCmd === entry.id ? null : entry.id
                          )
                        }
                        className="text-left text-xs text-subtitle hover:text-foreground transition-colors"
                        title="Click para expandir"
                      >
                        {expandedCmd === entry.id ? (
                          <code className="block break-all whitespace-pre-wrap text-green-400">
                            {entry.command}
                          </code>
                        ) : (
                          <code className="block truncate">
                            {entry.command}
                          </code>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-geist-half">
                      <div className="flex items-center justify-end gap-1 flex-wrap">
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(entry.command, `cmd-${entry.id}`)
                          }
                          className={cn(
                            btnClass,
                            "text-xs py-1 px-2 border border-unfocused-border-color text-foreground hover:border-focused-border-color"
                          )}
                          title="Copiar comando"
                        >
                          {copiedId === `cmd-${entry.id}` ? "Copiado!" : "Copiar"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSetStatus(entry.id, "done")}
                          className={cn(
                            btnClass,
                            "text-xs py-1 px-2 text-green-400 border border-green-500/30 hover:bg-green-500/10"
                          )}
                          title="Marcar como completado"
                        >
                          Done
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSetStatus(entry.id, "error")}
                          className={cn(
                            btnClass,
                            "text-xs py-1 px-2 text-red-400 border border-red-500/30 hover:bg-red-500/10"
                          )}
                          title="Marcar como error"
                        >
                          Error
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleCopy(entry.command, `re-${entry.id}`);
                          }}
                          className={cn(
                            btnClass,
                            "text-xs py-1 px-2 text-blue-400 border border-blue-500/30 hover:bg-blue-500/10"
                          )}
                          title="Re-render (copiar comando)"
                        >
                          {copiedId === `re-${entry.id}` ? "Copiado!" : "Re-render"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(entry.id)}
                          className={cn(
                            btnClass,
                            "text-xs py-1 px-2 text-red-400 border border-red-500/30 hover:bg-red-500/10"
                          )}
                          title="Eliminar"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
