import { Link, useLocation } from "wouter";
import { Home, TrendingUp, Trophy, User, Flame, Gem, Brain, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// TODO: backend hooks here
// const { data: userStats } = useGetUserStats();

const NAV_ITEMS = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/progress", icon: TrendingUp, label: "Progress" },
  { href: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-100 flex flex-col z-50 shadow-sm">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-100">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-9 h-9 bg-gradient-to-br from-[#2575b5] to-[#164f7d] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-blue-200 transition-shadow">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-black text-lg text-slate-900 tracking-tight">ReEnvision</span>
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#1f639e]" />
                <span className="text-[10px] font-bold text-[#1f639e] uppercase tracking-widest">AI Literacy</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            location === item.href ||
            (item.href !== "/" && location.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}>
              <div
                data-testid={`nav-${item.label.toLowerCase()}`}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-150 cursor-pointer",
                  isActive
                    ? "bg-[#1f639e] text-white shadow-md shadow-blue-200"
                    : "text-slate-500 hover:bg-blue-50 hover:text-[#1f639e]"
                )}
              >
                <item.icon
                  className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400")}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User stats */}
      <div className="px-4 py-4 border-t border-slate-100 space-y-2">
        {/* TODO: backend hooks here — replace with real user stats */}
        <div className="flex items-center gap-3 px-3 py-2.5 bg-orange-50 rounded-xl">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-400/40" strokeWidth={2} />
          <div>
            <p className="text-xs font-black text-orange-600">7 Day Streak</p>
            <p className="text-[10px] text-orange-400 font-semibold">Keep it up!</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-3 py-2.5 bg-blue-50 rounded-xl">
          <Gem className="w-5 h-5 text-[#1f639e] fill-blue-200/50" strokeWidth={2} />
          <div>
            <p className="text-xs font-black text-[#1f639e]">1,240 XP</p>
            <p className="text-[10px] text-blue-400 font-semibold">Level 5</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
