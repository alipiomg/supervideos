"use client";

import { useState } from "react";
import type { SkillEntry } from "../../data/skills-catalog";

export const SkillCard: React.FC<{ skill: SkillEntry }> = ({ skill }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-unfocused-border-color rounded-geist overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-geist-half hover:bg-foreground/5 transition-colors"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              {skill.name}
            </h4>
            <p className="text-xs text-subtitle mt-0.5">{skill.description}</p>
          </div>
          <span className="text-xs text-subtitle shrink-0">
            {expanded ? "▲" : "▼"}
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 text-[10px] rounded bg-foreground/10 text-foreground/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </button>
      {expanded && (
        <div className="border-t border-unfocused-border-color p-geist-half">
          <p className="text-xs text-subtitle mb-2">{skill.summary}</p>
          <div className="text-xs text-subtitle mb-1">
            Archivo: <code className="text-foreground/80">{skill.file}</code>
          </div>
          <pre className="bg-foreground/5 rounded-geist p-2 text-xs overflow-x-auto text-foreground/90 font-mono whitespace-pre-wrap">
            {skill.exampleSnippet}
          </pre>
        </div>
      )}
    </div>
  );
};
