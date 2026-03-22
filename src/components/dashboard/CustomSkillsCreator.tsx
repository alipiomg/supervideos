"use client";

import { useState, useMemo } from "react";
import { cn } from "../../lib/utils";
import { CopyButton } from "./CopyButton";

export const CustomSkillsCreator: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [whenToUse, setWhenToUse] = useState("");
  const [content, setContent] = useState("");

  const output = useMemo(() => {
    const tagsList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .join(", ");

    return `---
name: ${name || "my-custom-skill"}
description: ${description || "Description of the skill"}
metadata:
  tags: ${tagsList || "custom"}
---

## When to use

${whenToUse || "Use this skill when..."}

## Rules

${content || "Add your rules and best practices here..."}
`;
  }, [name, description, tags, whenToUse, content]);

  const inputClass =
    "leading-[1.7] block w-full rounded-geist bg-background p-geist-half text-foreground text-sm border border-unfocused-border-color transition-colors duration-150 ease-in-out focus:border-focused-border-color outline-none";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">
              Nombre (kebab-case)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="my-custom-skill"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="animacion, custom, efectos"
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">
            Descripcion
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Breve descripcion de lo que hace esta skill"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">
            Cuando usar
          </label>
          <textarea
            value={whenToUse}
            onChange={(e) => setWhenToUse(e.target.value)}
            placeholder="Describe cuando se debe activar esta skill..."
            className={cn(inputClass, "min-h-[60px] resize-y")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">
            Contenido / Reglas (Markdown)
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe las reglas, patrones y ejemplos de codigo..."
            className={cn(inputClass, "min-h-[200px] resize-y font-mono text-xs")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Preview: SKILL.md
          </h3>
          <CopyButton text={output} label="Copiar SKILL.md" />
        </div>
        <pre className="bg-foreground/5 rounded-geist p-geist-half text-xs font-mono text-foreground overflow-x-auto whitespace-pre-wrap min-h-[200px]">
          {output}
        </pre>
      </div>

      <p className="text-xs text-subtitle">
        Guarda este contenido como SKILL.md en .agents/skills/tu-skill/ para que Claude lo cargue automaticamente.
      </p>
    </div>
  );
};
