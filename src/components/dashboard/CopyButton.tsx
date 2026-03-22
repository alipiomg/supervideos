"use client";

import { useCallback, useState } from "react";
import { cn } from "../../lib/utils";

export const CopyButton: React.FC<{
  text: string;
  className?: string;
  label?: string;
}> = ({ text, className, label = "Copiar" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "border rounded-geist px-geist-half py-1 text-xs font-medium transition-all duration-150 ease-in-out",
        copied
          ? "bg-green-600 text-white border-green-600"
          : "bg-background text-foreground border-unfocused-border-color hover:border-focused-border-color",
        className,
      )}
    >
      {copied ? "Copiado!" : label}
    </button>
  );
};
