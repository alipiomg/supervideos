"use client";

import { useState, useMemo } from "react";
import { cn } from "../../lib/utils";
import { skillsCatalog } from "../../data/skills-catalog";
import { SkillCard } from "./SkillCard";

export const SkillsReference: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    skillsCatalog.forEach((s) => s.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filtered = useMemo(() => {
    return skillsCatalog.filter((skill) => {
      const matchesSearch =
        !search ||
        skill.name.toLowerCase().includes(search.toLowerCase()) ||
        skill.description.toLowerCase().includes(search.toLowerCase()) ||
        skill.summary.toLowerCase().includes(search.toLowerCase());
      const matchesTag = !activeTag || skill.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [search, activeTag]);

  const inputClass =
    "leading-[1.7] block w-full rounded-geist bg-background p-geist-half text-foreground text-sm border border-unfocused-border-color transition-colors duration-150 ease-in-out focus:border-focused-border-color outline-none";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          placeholder="Buscar skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={cn(inputClass, "flex-1")}
        />
        <div className="text-sm text-subtitle self-center">
          {filtered.length} de {skillsCatalog.length} skills
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setActiveTag(null)}
          className={cn(
            "px-2 py-1 rounded-geist text-xs border transition-all",
            !activeTag
              ? "border-foreground bg-foreground text-background"
              : "border-unfocused-border-color hover:border-focused-border-color",
          )}
        >
          Todas
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={cn(
              "px-2 py-1 rounded-geist text-xs border transition-all",
              activeTag === tag
                ? "border-foreground bg-foreground text-background"
                : "border-unfocused-border-color hover:border-focused-border-color",
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
};
