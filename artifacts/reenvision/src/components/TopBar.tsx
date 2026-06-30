import React from "react";
import { Flame, Gem } from "lucide-react";

export default function TopBar() {
  return (
    <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border pt-safe">
      <div className="flex items-center justify-between h-14 px-4 max-w-md mx-auto">
        <div className="font-bold text-xl text-primary tracking-tight flex items-center gap-2">
          ReEnvision
        </div>
        
        <div className="flex items-center gap-4 font-bold">
          {/* Streak */}
          <div className="flex items-center gap-1.5 text-orange-500">
            <Flame className="w-5 h-5 fill-orange-500/20" strokeWidth={2.5} />
            <span>7</span>
          </div>
          
          {/* Gems/XP */}
          <div className="flex items-center gap-1.5 text-blue-500">
            <Gem className="w-5 h-5 fill-blue-500/20" strokeWidth={2.5} />
            <span>1.2k</span>
          </div>
        </div>
      </div>
    </div>
  );
}
