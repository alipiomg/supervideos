"use client";

import { useState, useCallback } from "react";
import { cn } from "../../lib/utils";
import { VideoConfigPanel } from "./VideoConfigPanel";
import { PromptBuilder } from "./PromptBuilder";
import { SkillsReference } from "./SkillsReference";
import { PresetTemplates } from "./PresetTemplates";
import { RenderCommandBuilder } from "./RenderCommandBuilder";
import { JsonConfigGenerator } from "./JsonConfigGenerator";
import { CustomSkillsCreator } from "./CustomSkillsCreator";
import { RoadmapGuide } from "./RoadmapGuide";
import { PromptAssistant } from "./PromptAssistant";
import PromptExecutor from "./PromptExecutor";
import RenderHistory from "./RenderHistory";
import BatchRender from "./BatchRender";
import CompositionsGallery from "./CompositionsGallery";

const tabs = [
  { id: "roadmap", label: "Roadmap", icon: "🗺" },
  { id: "executor", label: "Ejecutor", icon: "🚀" },
  { id: "gallery", label: "Galeria", icon: "🎬" },
  { id: "assistant", label: "Asistente", icon: "🎯" },
  { id: "config", label: "Config", icon: "⚙" },
  { id: "prompt", label: "Prompts", icon: "✏" },
  { id: "skills", label: "Skills", icon: "📚" },
  { id: "templates", label: "Templates", icon: "📋" },
  { id: "batch", label: "Batch", icon: "📦" },
  { id: "render", label: "Render", icon: "▶" },
  { id: "history", label: "Historial", icon: "📊" },
  { id: "json", label: "JSON", icon: "{}" },
  { id: "custom", label: "Custom Skills", icon: "🔧" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export const DashboardShell: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("roadmap");

  const handleUseTemplate = useCallback(
    () => {
      setActiveTab("prompt");
    },
    [],
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Tab Navigation */}
      <nav className="flex flex-wrap gap-1 border-b border-unfocused-border-color pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-geist text-sm font-medium transition-all duration-150",
              activeTab === tab.id
                ? "bg-foreground text-background"
                : "text-foreground/60 hover:text-foreground hover:bg-foreground/5",
            )}
          >
            <span className="text-xs">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "roadmap" && <RoadmapGuide />}
        {activeTab === "executor" && <PromptExecutor />}
        {activeTab === "gallery" && <CompositionsGallery />}
        {activeTab === "assistant" && <PromptAssistant />}
        {activeTab === "config" && <VideoConfigPanel />}
        {activeTab === "prompt" && <PromptBuilder />}
        {activeTab === "skills" && <SkillsReference />}
        {activeTab === "templates" && (
          <PresetTemplates onUseTemplate={handleUseTemplate} />
        )}
        {activeTab === "batch" && <BatchRender />}
        {activeTab === "render" && <RenderCommandBuilder />}
        {activeTab === "history" && <RenderHistory />}
        {activeTab === "json" && <JsonConfigGenerator />}
        {activeTab === "custom" && <CustomSkillsCreator />}
      </div>
    </div>
  );
};
