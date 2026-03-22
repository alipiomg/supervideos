"use client";

import { presetTemplates } from "../../data/preset-templates";
import { TemplateCard } from "./TemplateCard";
import type { PresetTemplate } from "../../data/preset-templates";

export const PresetTemplates: React.FC<{
  onUseTemplate?: (template: PresetTemplate) => void;
}> = ({ onUseTemplate }) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-subtitle">
        Templates listos para usar. Haz clic en &quot;Usar template&quot; para cargar el prompt en el Constructor, o &quot;Copiar&quot; para pegarlo directamente en Claude Code.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {presetTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onUse={onUseTemplate}
          />
        ))}
      </div>
    </div>
  );
};
