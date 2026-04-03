"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "../../lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FieldDef {
  name: string;
  type: "string" | "number" | "color";
}

interface Platform {
  id: string;
  label: string;
  width: number;
  height: number;
}

const PLATFORMS: Platform[] = [
  { id: "youtube", label: "YouTube", width: 1920, height: 1080 },
  { id: "tiktok", label: "TikTok", width: 1080, height: 1920 },
  { id: "instagram", label: "Instagram Feed", width: 1080, height: 1080 },
  { id: "twitter", label: "Twitter", width: 1280, height: 720 },
];

const CODECS = ["h264", "h265", "vp8", "vp9", "prores", "gif"] as const;

const INPUT_CLASS =
  "leading-[1.7] block w-full rounded-geist bg-background p-geist-half text-foreground text-sm border border-unfocused-border-color transition-colors duration-150 ease-in-out focus:border-focused-border-color outline-none";

const JSON_PLACEHOLDER = `[
  { "titulo": "Video 1", "color": "#667eea", "cta": "Compra ahora" },
  { "titulo": "Video 2", "color": "#e74c3c", "cta": "Suscribete" },
  { "titulo": "Video 3", "color": "#2ecc71", "cta": "Descarga gratis" }
]`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildCommand(
  compositionId: string,
  outputPath: string,
  namingPattern: string,
  codec: string,
  crf: number,
  additionalFlags: string,
  props: Record<string, unknown>,
  index: number,
  platform?: Platform,
) {
  const filename = namingPattern
    .replace("{compositionId}", compositionId)
    .replace("{index}", String(index));

  const suffix = platform ? `-${platform.id}` : "";
  const ext = codec === "gif" ? "gif" : "mp4";
  const out = `${outputPath}${filename}${suffix}.${ext}`;

  const platformFlags = platform
    ? ` --width ${platform.width} --height ${platform.height}`
    : "";

  const propsStr = JSON.stringify(props);

  return `npx remotion render src/remotion/index.ts ${compositionId} ${out} --codec ${codec} --crf ${crf}${platformFlags}${additionalFlags ? ` ${additionalFlags}` : ""} --props='${propsStr}'`;
}

function buildBashScript(commands: { label: string; cmd: string }[]) {
  const lines = [
    "#!/bin/bash",
    `echo "Renderizando ${commands.length} variantes..."`,
    "",
  ];

  commands.forEach((c, i) => {
    lines.push(`# ${c.label}`);
    lines.push(c.cmd);
    lines.push(`echo "Variante ${i + 1} completada"`);
    lines.push("");
  });

  lines.push(
    `echo "Batch completado! ${commands.length} videos generados"`,
  );
  return lines.join("\n");
}

function buildPowerShellScript(commands: { label: string; cmd: string }[]) {
  const lines = [
    `Write-Host "Renderizando ${commands.length} variantes..."`,
    "",
    "$commands = @(",
  ];

  commands.forEach((c, i) => {
    const comma = i < commands.length - 1 ? "," : "";
    lines.push(`  '${c.cmd.replace(/'/g, "''")}'${comma}`);
  });

  lines.push(")");
  lines.push("");
  lines.push("$i = 1");
  lines.push("foreach ($cmd in $commands) {");
  lines.push("  Invoke-Expression $cmd");
  lines.push('  Write-Host "Variante $i completada"');
  lines.push("  $i++");
  lines.push("}");
  lines.push("");
  lines.push(
    `Write-Host "Batch completado! ${commands.length} videos generados"`,
  );
  return lines.join("\n");
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    /* fallback silent */
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BatchRender() {
  // --- Data Input state ---
  const [dataMode, setDataMode] = useState<"json" | "manual">("json");
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [parsedRows, setParsedRows] = useState<Record<string, unknown>[]>([]);
  const [detectedFields, setDetectedFields] = useState<string[]>([]);

  // Manual mode
  const [fields, setFields] = useState<FieldDef[]>([
    { name: "titulo", type: "string" },
    { name: "color", type: "string" },
    { name: "cta", type: "string" },
  ]);
  const [manualRows, setManualRows] = useState<Record<string, string>[]>([
    { titulo: "Video 1", color: "#667eea", cta: "Compra ahora" },
  ]);

  // --- Render Config state ---
  const [compositionId, setCompositionId] = useState("MiComp");
  const [outputPath, setOutputPath] = useState("out/batch/");
  const [namingPattern, setNamingPattern] = useState(
    "{compositionId}-{index}",
  );
  const [codec, setCodec] = useState<string>("h264");
  const [crf, setCrf] = useState(18);
  const [additionalFlags, setAdditionalFlags] = useState("");

  // --- Multi-platform ---
  const [multiPlatform, setMultiPlatform] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    PLATFORMS.map((p) => p.id),
  );

  // --- Clipboard feedback ---
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // -----------------------------------------------------------------------
  // Derived data
  // -----------------------------------------------------------------------

  const activeRows = dataMode === "json" ? parsedRows : manualRows;

  const allCommands = useMemo(() => {
    const cmds: { label: string; cmd: string }[] = [];
    activeRows.forEach((row, idx) => {
      if (multiPlatform) {
        const activePlatforms = PLATFORMS.filter((p) =>
          selectedPlatforms.includes(p.id),
        );
        activePlatforms.forEach((platform) => {
          const label = `Variante ${idx + 1} - ${platform.label}: ${String(row[Object.keys(row)[0]] ?? "")}`;
          cmds.push({
            label,
            cmd: buildCommand(
              compositionId,
              outputPath,
              namingPattern,
              codec,
              crf,
              additionalFlags,
              row,
              idx + 1,
              platform,
            ),
          });
        });
      } else {
        const label = `Variante ${idx + 1}: ${String(row[Object.keys(row)[0]] ?? "")}`;
        cmds.push({
          label,
          cmd: buildCommand(
            compositionId,
            outputPath,
            namingPattern,
            codec,
            crf,
            additionalFlags,
            row,
            idx + 1,
          ),
        });
      }
    });
    return cmds;
  }, [
    activeRows,
    compositionId,
    outputPath,
    namingPattern,
    codec,
    crf,
    additionalFlags,
    multiPlatform,
    selectedPlatforms,
  ]);

  const totalRenders = allCommands.length;
  const activePlatformCount = multiPlatform
    ? PLATFORMS.filter((p) => selectedPlatforms.includes(p.id)).length
    : 1;

  // -----------------------------------------------------------------------
  // Handlers
  // -----------------------------------------------------------------------

  const handleValidateJson = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        setJsonError("El JSON debe ser un array con al menos un objeto.");
        setParsedRows([]);
        setDetectedFields([]);
        return;
      }
      const allKeys = new Set<string>();
      parsed.forEach((obj: Record<string, unknown>) => {
        Object.keys(obj).forEach((k) => allKeys.add(k));
      });
      setDetectedFields(Array.from(allKeys));
      setParsedRows(parsed);
      setJsonError(null);
    } catch (e) {
      setJsonError(
        `JSON invalido: ${e instanceof Error ? e.message : String(e)}`,
      );
      setParsedRows([]);
      setDetectedFields([]);
    }
  }, [jsonText]);

  const handleAddField = useCallback(() => {
    setFields((prev) => [...prev, { name: `campo${prev.length + 1}`, type: "string" }]);
    setManualRows((prev) =>
      prev.map((row) => ({ ...row, [`campo${fields.length + 1}`]: "" })),
    );
  }, [fields.length]);

  const handleAddRow = useCallback(() => {
    const empty: Record<string, string> = {};
    fields.forEach((f) => (empty[f.name] = ""));
    setManualRows((prev) => [...prev, empty]);
  }, [fields]);

  const handleRemoveRow = useCallback((idx: number) => {
    setManualRows((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const handleUpdateField = useCallback(
    (fieldIdx: number, key: "name" | "type", value: string) => {
      setFields((prev) => {
        const updated = [...prev];
        const oldName = updated[fieldIdx].name;
        if (key === "name") {
          updated[fieldIdx] = { ...updated[fieldIdx], name: value };
          setManualRows((rows) =>
            rows.map((row) => {
              const newRow = { ...row };
              newRow[value] = newRow[oldName] ?? "";
              delete newRow[oldName];
              return newRow;
            }),
          );
        } else {
          updated[fieldIdx] = {
            ...updated[fieldIdx],
            type: value as FieldDef["type"],
          };
        }
        return updated;
      });
    },
    [],
  );

  const handleUpdateCell = useCallback(
    (rowIdx: number, fieldName: string, value: string) => {
      setManualRows((prev) => {
        const updated = [...prev];
        updated[rowIdx] = { ...updated[rowIdx], [fieldName]: value };
        return updated;
      });
    },
    [],
  );

  const handleCopy = useCallback(
    async (text: string, key: string) => {
      await copyToClipboard(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    },
    [],
  );

  const togglePlatform = useCallback((id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  }, []);

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-geist text-foreground">
      {/* ===== HEADER ===== */}
      <div>
        <h2 className="text-2xl font-semibold">Batch Render</h2>
        <p className="text-subtitle mt-1">
          Genera multiples variantes de video a partir de datos.
        </p>
      </div>

      {/* ===== SECTION 1: DATA INPUT ===== */}
      <section className="rounded-geist border border-unfocused-border-color bg-background p-geist">
        <h3 className="mb-4 text-lg font-medium">1. Datos de entrada</h3>

        {/* Tab toggle */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setDataMode("json")}
            className={cn(
              "rounded-geist px-4 py-1.5 text-sm font-medium transition-colors",
              dataMode === "json"
                ? "bg-foreground text-background"
                : "border border-unfocused-border-color text-foreground hover:border-focused-border-color",
            )}
          >
            JSON Array
          </button>
          <button
            onClick={() => setDataMode("manual")}
            className={cn(
              "rounded-geist px-4 py-1.5 text-sm font-medium transition-colors",
              dataMode === "manual"
                ? "bg-foreground text-background"
                : "border border-unfocused-border-color text-foreground hover:border-focused-border-color",
            )}
          >
            Filas Manuales
          </button>
        </div>

        {/* Mode A: JSON */}
        {dataMode === "json" && (
          <div className="space-y-3">
            <textarea
              className={cn(INPUT_CLASS, "min-h-[180px] font-mono text-xs")}
              placeholder={JSON_PLACEHOLDER}
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
            />
            <div className="flex items-center gap-3">
              <button
                onClick={handleValidateJson}
                className="rounded-geist bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Validar JSON
              </button>
              {parsedRows.length > 0 && (
                <span className="text-sm text-subtitle">
                  {parsedRows.length} variantes detectadas
                </span>
              )}
            </div>
            {jsonError && (
              <p className="text-sm text-red-500">{jsonError}</p>
            )}
            {detectedFields.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-subtitle">Campos:</span>
                {detectedFields.map((f) => (
                  <span
                    key={f}
                    className="rounded-geist border border-unfocused-border-color px-2 py-0.5 text-xs"
                  >
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mode B: Manual Rows */}
        {dataMode === "manual" && (
          <div className="space-y-4">
            {/* Field definitions */}
            <div className="space-y-2">
              <span className="text-sm font-medium text-subtitle">Campos</span>
              <div className="space-y-2">
                {fields.map((field, fi) => (
                  <div key={fi} className="flex gap-2">
                    <input
                      className={cn(INPUT_CLASS, "flex-1")}
                      value={field.name}
                      onChange={(e) =>
                        handleUpdateField(fi, "name", e.target.value)
                      }
                      placeholder="Nombre del campo"
                    />
                    <select
                      className={cn(INPUT_CLASS, "w-32")}
                      value={field.type}
                      onChange={(e) =>
                        handleUpdateField(fi, "type", e.target.value)
                      }
                    >
                      <option value="string">string</option>
                      <option value="number">number</option>
                      <option value="color">color</option>
                    </select>
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddField}
                className="rounded-geist border border-unfocused-border-color px-3 py-1 text-xs text-subtitle transition-colors hover:border-focused-border-color"
              >
                + Agregar Campo
              </button>
            </div>

            {/* Data table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="pb-2 pr-2 text-left text-xs text-subtitle">
                      #
                    </th>
                    {fields.map((f) => (
                      <th
                        key={f.name}
                        className="pb-2 pr-2 text-left text-xs text-subtitle"
                      >
                        {f.name}
                      </th>
                    ))}
                    <th className="pb-2 text-left text-xs text-subtitle" />
                  </tr>
                </thead>
                <tbody>
                  {manualRows.map((row, ri) => (
                    <tr key={ri}>
                      <td className="pr-2 py-1 text-subtitle">{ri + 1}</td>
                      {fields.map((f) => (
                        <td key={f.name} className="pr-2 py-1">
                          <input
                            className={cn(INPUT_CLASS, "min-w-[120px]")}
                            value={row[f.name] ?? ""}
                            onChange={(e) =>
                              handleUpdateCell(ri, f.name, e.target.value)
                            }
                          />
                        </td>
                      ))}
                      <td className="py-1">
                        <button
                          onClick={() => handleRemoveRow(ri)}
                          className="text-xs text-red-500 hover:text-red-400"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleAddRow}
              className="rounded-geist border border-unfocused-border-color px-3 py-1 text-xs text-subtitle transition-colors hover:border-focused-border-color"
            >
              + Agregar Fila
            </button>
            {manualRows.length > 0 && (
              <p className="text-sm text-subtitle">
                {manualRows.length} variantes definidas
              </p>
            )}
          </div>
        )}
      </section>

      {/* ===== SECTION 2: RENDER CONFIG ===== */}
      <section className="rounded-geist border border-unfocused-border-color bg-background p-geist">
        <h3 className="mb-4 text-lg font-medium">
          2. Configuracion de render
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Composition ID */}
          <div>
            <label className="mb-1 block text-sm text-subtitle">
              Composition ID
            </label>
            <input
              className={INPUT_CLASS}
              value={compositionId}
              onChange={(e) => setCompositionId(e.target.value)}
            />
          </div>
          {/* Output path */}
          <div>
            <label className="mb-1 block text-sm text-subtitle">
              Ruta de salida
            </label>
            <input
              className={INPUT_CLASS}
              value={outputPath}
              onChange={(e) => setOutputPath(e.target.value)}
            />
          </div>
          {/* Naming pattern */}
          <div>
            <label className="mb-1 block text-sm text-subtitle">
              Patron de nombre
            </label>
            <input
              className={INPUT_CLASS}
              value={namingPattern}
              onChange={(e) => setNamingPattern(e.target.value)}
            />
            <p className="mt-0.5 text-xs text-subtitle">
              Variables: {"{compositionId}"}, {"{index}"}
            </p>
          </div>
          {/* Codec */}
          <div>
            <label className="mb-1 block text-sm text-subtitle">Codec</label>
            <select
              className={INPUT_CLASS}
              value={codec}
              onChange={(e) => setCodec(e.target.value)}
            >
              {CODECS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          {/* CRF */}
          <div>
            <label className="mb-1 block text-sm text-subtitle">CRF</label>
            <input
              className={INPUT_CLASS}
              type="number"
              min={0}
              max={51}
              value={crf}
              onChange={(e) => setCrf(Number(e.target.value))}
            />
          </div>
          {/* Additional flags */}
          <div>
            <label className="mb-1 block text-sm text-subtitle">
              Flags adicionales
            </label>
            <input
              className={INPUT_CLASS}
              value={additionalFlags}
              onChange={(e) => setAdditionalFlags(e.target.value)}
              placeholder="--concurrency 2 --timeout 120"
            />
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: MULTI-PLATFORM (before commands so it affects output) ===== */}
      <section className="rounded-geist border border-unfocused-border-color bg-background p-geist">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">
            3. Export multi-plataforma
          </h3>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={multiPlatform}
              onChange={(e) => setMultiPlatform(e.target.checked)}
              className="h-4 w-4 accent-foreground"
            />
            Activar
          </label>
        </div>

        {multiPlatform && (
          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {PLATFORMS.map((p) => (
                <label
                  key={p.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-geist border p-geist-half text-sm transition-colors",
                    selectedPlatforms.includes(p.id)
                      ? "border-focused-border-color bg-foreground/5"
                      : "border-unfocused-border-color",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(p.id)}
                    onChange={() => togglePlatform(p.id)}
                    className="h-3.5 w-3.5 accent-foreground"
                  />
                  <span>
                    {p.label}{" "}
                    <span className="text-xs text-subtitle">
                      ({p.width}x{p.height})
                    </span>
                  </span>
                </label>
              ))}
            </div>
            {activeRows.length > 0 && (
              <p className="text-sm text-subtitle">
                {totalRenders} renders totales ({activeRows.length} variantes x{" "}
                {activePlatformCount} plataformas)
              </p>
            )}
          </div>
        )}
      </section>

      {/* ===== SECTION 3: GENERATED COMMANDS ===== */}
      <section className="rounded-geist border border-unfocused-border-color bg-background p-geist">
        <h3 className="mb-4 text-lg font-medium">4. Comandos generados</h3>

        {activeRows.length === 0 ? (
          <p className="text-sm text-subtitle">
            Agrega datos en la seccion 1 para generar comandos.
          </p>
        ) : (
          <div className="space-y-4">
            {/* Total count */}
            <p className="text-sm text-subtitle">
              {totalRenders} comando{totalRenders !== 1 ? "s" : ""} generado
              {totalRenders !== 1 ? "s" : ""}
            </p>

            {/* Individual commands */}
            <div className="max-h-[400px] overflow-y-auto rounded-geist border border-unfocused-border-color bg-black/50 p-geist-half">
              <pre className="whitespace-pre-wrap font-mono text-xs text-green-400">
                {allCommands
                  .map((c) => `# ${c.label}\n${c.cmd}`)
                  .join("\n\n")}
              </pre>
            </div>

            {/* Copy buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  handleCopy(
                    allCommands.map((c) => `# ${c.label}\n${c.cmd}`).join("\n\n"),
                    "all",
                  )
                }
                className={cn(
                  "rounded-geist px-4 py-1.5 text-sm font-medium transition-colors",
                  copiedKey === "all"
                    ? "bg-green-600 text-white"
                    : "bg-foreground text-background hover:opacity-90",
                )}
              >
                {copiedKey === "all"
                  ? "Copiado!"
                  : "Copiar Todos los Comandos"}
              </button>
              <button
                onClick={() =>
                  handleCopy(buildBashScript(allCommands), "bash")
                }
                className={cn(
                  "rounded-geist px-4 py-1.5 text-sm font-medium transition-colors",
                  copiedKey === "bash"
                    ? "bg-green-600 text-white"
                    : "border border-unfocused-border-color text-foreground hover:border-focused-border-color",
                )}
              >
                {copiedKey === "bash" ? "Copiado!" : "Copiar Script Bash"}
              </button>
              <button
                onClick={() =>
                  handleCopy(
                    buildPowerShellScript(allCommands),
                    "powershell",
                  )
                }
                className={cn(
                  "rounded-geist px-4 py-1.5 text-sm font-medium transition-colors",
                  copiedKey === "powershell"
                    ? "bg-green-600 text-white"
                    : "border border-unfocused-border-color text-foreground hover:border-focused-border-color",
                )}
              >
                {copiedKey === "powershell"
                  ? "Copiado!"
                  : "Copiar Script PowerShell"}
              </button>
            </div>

            {/* Bash script preview */}
            <details className="rounded-geist border border-unfocused-border-color">
              <summary className="cursor-pointer px-4 py-2 text-sm text-subtitle hover:text-foreground">
                Vista previa: Script Bash
              </summary>
              <div className="border-t border-unfocused-border-color bg-black/50 p-geist-half">
                <pre className="whitespace-pre-wrap font-mono text-xs text-green-400">
                  {buildBashScript(allCommands)}
                </pre>
              </div>
            </details>

            {/* PowerShell script preview */}
            <details className="rounded-geist border border-unfocused-border-color">
              <summary className="cursor-pointer px-4 py-2 text-sm text-subtitle hover:text-foreground">
                Vista previa: Script PowerShell
              </summary>
              <div className="border-t border-unfocused-border-color bg-black/50 p-geist-half">
                <pre className="whitespace-pre-wrap font-mono text-xs text-blue-400">
                  {buildPowerShellScript(allCommands)}
                </pre>
              </div>
            </details>
          </div>
        )}
      </section>
    </div>
  );
}
