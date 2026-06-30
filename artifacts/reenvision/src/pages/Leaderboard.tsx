import { useState } from "react";
import { Medal, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// TODO: backend hooks here
// const { data: players } = useGetLeaderboard({ timeframe: tab });
const PLAYERS = [
  { id: 1, name: "Maria Garcia", xp: 4250, isCurrent: false },
  { id: 2, name: "John Smith", xp: 3900, isCurrent: false },
  { id: 3, name: "Sarah Lee", xp: 3720, isCurrent: false },
  { id: 4, name: "David Kim", xp: 3100, isCurrent: false },
  { id: 5, name: "You", xp: 2840, isCurrent: true },
  { id: 6, name: "Emma Watson", xp: 2500, isCurrent: false },
  { id: 7, name: "James Bond", xp: 2100, isCurrent: false },
  { id: 8, name: "Oliver Twist", xp: 1950, isCurrent: false },
  { id: 9, name: "Jack Sparrow", xp: 1800, isCurrent: false },
  { id: 10, name: "Peter Pan", xp: 1500, isCurrent: false },
];

const MEDAL_COLORS = [
  "text-yellow-500 fill-yellow-400",
  "text-slate-400 fill-slate-300",
  "text-amber-600 fill-amber-500",
];

export default function Leaderboard() {
  const [tab, setTab] = useState<"week" | "all">("week");

  return (
    <div className="min-h-screen bg-slate-50 px-8 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-yellow-50 border border-yellow-100 rounded-2xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900">Leaderboard</h1>
            <p className="text-slate-400 font-medium text-sm">Gold League · Top 5 advance</p>
          </div>

          {/* Tab switcher */}
          <div className="ml-auto flex p-1 bg-white border border-slate-100 rounded-xl shadow-sm font-bold text-sm">
            <button
              data-testid="tab-week"
              onClick={() => setTab("week")}
              className={cn(
                "px-4 py-2 rounded-lg transition-colors",
                tab === "week" ? "bg-[#1f639e] text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              This Week
            </button>
            <button
              data-testid="tab-all"
              onClick={() => setTab("all")}
              className={cn(
                "px-4 py-2 rounded-lg transition-colors",
                tab === "all" ? "bg-[#1f639e] text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              All Time
            </button>
          </div>
        </div>

        {/* Top 3 podium */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[PLAYERS[1], PLAYERS[0], PLAYERS[2]].map((player, pos) => {
            const actualRank = pos === 0 ? 2 : pos === 1 ? 1 : 3;
            const heights = ["h-24", "h-32", "h-20"];
            const podiumColors = [
              "bg-gradient-to-b from-slate-200 to-slate-300",
              "bg-gradient-to-b from-yellow-300 to-amber-400",
              "bg-gradient-to-b from-amber-200 to-amber-300",
            ];
            const avatarColors = [
              "bg-slate-400",
              "bg-[#1f639e]",
              "bg-amber-500",
            ];
            return (
              <div key={player.id} className="flex flex-col items-center gap-2">
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center font-black text-lg text-white", avatarColors[pos])}>
                  {player.name.charAt(0)}
                </div>
                <p className="text-xs font-black text-slate-700 text-center">{player.name}</p>
                <p className="text-xs text-slate-400 font-bold">{player.xp.toLocaleString()} XP</p>
                <div className={cn("w-full rounded-t-xl", podiumColors[pos === 1 ? 0 : pos === 0 ? 1 : 2], heights[pos === 1 ? 0 : pos === 0 ? 1 : 2])} />
              </div>
            );
          })}
        </div>

        {/* Full list */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {PLAYERS.map((player, index) => {
            const isTop3 = index < 3;
            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
                data-testid={`row-player-${player.id}`}
                className={cn(
                  "flex items-center gap-4 px-5 py-4 border-b border-slate-50 last:border-b-0",
                  player.isCurrent
                    ? "bg-blue-50 border-l-4 border-l-[#1f639e]"
                    : "hover:bg-slate-50"
                )}
              >
                <div className="w-6 font-black text-sm text-slate-400 text-center">{index + 1}</div>

                <div className="relative">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white",
                    player.isCurrent ? "bg-[#1f639e]" : "bg-slate-200 text-slate-600"
                  )}>
                    {player.name.charAt(0)}
                  </div>
                  {isTop3 && (
                    <div className="absolute -bottom-1.5 -right-1.5">
                      <Medal className={cn("w-5 h-5", MEDAL_COLORS[index])} />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <p className={cn("font-bold text-sm", player.isCurrent ? "text-[#1f639e]" : "text-slate-800")}>
                    {player.name}
                    {player.isCurrent && <span className="ml-2 text-xs font-black text-blue-300">(you)</span>}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">{player.xp.toLocaleString()} XP</p>
                </div>

                <div className="w-32 hidden sm:block">
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className={cn("h-full rounded-full", player.isCurrent ? "bg-[#1f639e]" : "bg-slate-300")}
                      initial={{ width: 0 }}
                      animate={{ width: `${(player.xp / PLAYERS[0].xp) * 100}%` }}
                      transition={{ duration: 0.8, delay: index * 0.05 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
