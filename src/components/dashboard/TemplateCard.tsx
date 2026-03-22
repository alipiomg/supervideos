"use client";

import { cn } from "../../lib/utils";
import { CopyButton } from "./CopyButton";
import type { PresetTemplate } from "../../data/preset-templates";

export const TemplateCard: React.FC<{
  template: PresetTemplate;
  onUse?: (template: PresetTemplate) => void;
}> = ({ template, onUse }) => {
  return (
    <div className="border border-unfocused-border-color rounded-geist p-geist-half flex flex-col gap-3">
      <div>
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-semibold text-foreground">
            {template.name}
          </h4>
          <span className="px-1.5 py-0.5 text-[10px] rounded bg-foreground/10 text-foreground/70 shrink-0">
            {template.platform}
          </span>
        </div>
        <p className="text-xs text-subtitle mt-1">{template.description}</p>
      </div>

      <div className="flex items-center gap-3 text-xs text-subtitle">
        <span>
          {template.width}x{template.height}
        </span>
        <span>{template.fps}fps</span>
        <span>{template.durationSeconds}s</span>
      </div>

      <div className="flex flex-wrap gap-1">
        {template.tags.map((tag) => (
          <span
            key={tag}
            className="px-1.5 py-0.5 text-[10px] rounded bg-foreground/10 text-foreground/70"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-2 mt-auto">
        {onUse && (
          <button
            onClick={() => onUse(template)}
            className={cn(
              "flex-1 border border-foreground bg-foreground text-background rounded-geist px-geist-half py-1.5 text-xs font-medium",
              "hover:bg-background hover:text-foreground transition-all duration-150",
            )}
          >
            Usar template
          </button>
        )}
        <CopyButton text={template.promptTemplate} label="Copiar" />
      </div>
    </div>
  );
};
