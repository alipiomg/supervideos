"use client";

import { useState, useMemo, useCallback } from "react";
import { cn } from "../../lib/utils";
import { CopyButton } from "./CopyButton";

type FieldType = "string" | "number" | "boolean" | "color";

type ConfigField = {
  id: string;
  name: string;
  type: FieldType;
  value: string;
};

let fieldCounter = 0;

export const JsonConfigGenerator: React.FC = () => {
  const [fields, setFields] = useState<ConfigField[]>([
    { id: `f${++fieldCounter}`, name: "title", type: "string", value: "Mi Video" },
    { id: `f${++fieldCounter}`, name: "primaryColor", type: "color", value: "#4ecdc4" },
    { id: `f${++fieldCounter}`, name: "duration", type: "number", value: "10" },
  ]);

  const addField = useCallback(() => {
    setFields((prev) => [
      ...prev,
      { id: `f${++fieldCounter}`, name: "", type: "string", value: "" },
    ]);
  }, []);

  const removeField = useCallback((id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const updateField = useCallback(
    (id: string, key: keyof ConfigField, val: string) => {
      setFields((prev) =>
        prev.map((f) => (f.id === id ? { ...f, [key]: val } : f)),
      );
    },
    [],
  );

  const jsonOutput = useMemo(() => {
    const obj: Record<string, unknown> = {};
    fields.forEach((f) => {
      if (!f.name) return;
      switch (f.type) {
        case "number":
          obj[f.name] = Number(f.value) || 0;
          break;
        case "boolean":
          obj[f.name] = f.value === "true";
          break;
        default:
          obj[f.name] = f.value;
      }
    });
    return JSON.stringify(obj, null, 2);
  }, [fields]);

  const zodOutput = useMemo(() => {
    const lines = fields
      .filter((f) => f.name)
      .map((f) => {
        switch (f.type) {
          case "number":
            return `  ${f.name}: z.number(),`;
          case "boolean":
            return `  ${f.name}: z.boolean(),`;
          case "color":
            return `  ${f.name}: zColor(),`;
          default:
            return `  ${f.name}: z.string(),`;
        }
      });

    const hasColor = fields.some((f) => f.type === "color");
    let imports = `import { z } from "zod";`;
    if (hasColor) imports += `\nimport { zColor } from "@remotion/zod-types";`;

    return `${imports}\n\nexport const MyVideoSchema = z.object({\n${lines.join("\n")}\n});`;
  }, [fields]);

  const inputClass =
    "leading-[1.7] block w-full rounded-geist bg-background p-geist-half text-foreground text-sm border border-unfocused-border-color transition-colors duration-150 ease-in-out focus:border-focused-border-color outline-none";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-foreground">Campos</h3>
        {fields.map((field) => (
          <div key={field.id} className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="text-xs text-subtitle mb-1 block">Nombre</label>
              <input
                type="text"
                value={field.name}
                onChange={(e) => updateField(field.id, "name", e.target.value)}
                placeholder="nombreCampo"
                className={inputClass}
              />
            </div>
            <div className="w-28">
              <label className="text-xs text-subtitle mb-1 block">Tipo</label>
              <select
                value={field.type}
                onChange={(e) =>
                  updateField(field.id, "type", e.target.value)
                }
                className={inputClass}
              >
                <option value="string">string</option>
                <option value="number">number</option>
                <option value="boolean">boolean</option>
                <option value="color">color</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs text-subtitle mb-1 block">Valor</label>
              {field.type === "boolean" ? (
                <select
                  value={field.value}
                  onChange={(e) => updateField(field.id, "value", e.target.value)}
                  className={inputClass}
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              ) : field.type === "color" ? (
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={field.value || "#000000"}
                    onChange={(e) => updateField(field.id, "value", e.target.value)}
                    className="w-8 h-8 rounded border border-unfocused-border-color cursor-pointer"
                  />
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => updateField(field.id, "value", e.target.value)}
                    className={cn(inputClass, "flex-1")}
                  />
                </div>
              ) : (
                <input
                  type={field.type === "number" ? "number" : "text"}
                  value={field.value}
                  onChange={(e) => updateField(field.id, "value", e.target.value)}
                  className={inputClass}
                />
              )}
            </div>
            <button
              onClick={() => removeField(field.id)}
              className="text-geist-error text-sm hover:underline pb-2"
            >
              X
            </button>
          </div>
        ))}
        <button
          onClick={addField}
          className="text-sm text-foreground/60 hover:text-foreground border border-dashed border-unfocused-border-color rounded-geist p-geist-quarter text-center"
        >
          + Anadir campo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              defaultProps (JSON)
            </h3>
            <CopyButton text={jsonOutput} />
          </div>
          <pre className="bg-foreground/5 rounded-geist p-geist-half text-xs font-mono text-foreground overflow-x-auto whitespace-pre-wrap min-h-[120px]">
            {jsonOutput}
          </pre>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Zod Schema
            </h3>
            <CopyButton text={zodOutput} />
          </div>
          <pre className="bg-foreground/5 rounded-geist p-geist-half text-xs font-mono text-foreground overflow-x-auto whitespace-pre-wrap min-h-[120px]">
            {zodOutput}
          </pre>
        </div>
      </div>
    </div>
  );
};
