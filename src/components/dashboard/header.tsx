"use client"

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export const DashboardHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Streamify Dashboard</h1>
        <p className="text-muted-foreground">
          Analytics and insights for your music streaming platform
        </p>
      </div>
      <ModeToggle />
    </div>
  );
}; 