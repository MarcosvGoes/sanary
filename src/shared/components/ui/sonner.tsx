"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "bg-card/90 text-accent-foreground rounded-xs w-full",
          title: "font-semibold mb-1 text-sm",
          description: "text-xs opacity-80",
          success: "bg-card/90 text-accent-foreground",
          error: "bg-card/90 text-accent-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
