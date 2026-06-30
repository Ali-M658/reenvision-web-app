import { Settings, Bell, Moon, Volume2, Trophy, Zap, Flame, Brain } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// TODO: backend hooks here
// const { data: profile } = useGetProfile();

export default function Profile() {
  return (
    <div className="min-h-screen bg-slate-50 px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 mb-8">Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: user card */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-[#2575b5] to-[#124070] text-white rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-4 shadow-lg shadow-blue-100">
                A
              </div>
              {/* TODO: backend hooks here — replace with real user data */}
              <h2 className="text-xl font-black text-slate-900">Alex Learner</h2>
              <p className="text-slate-400 text-sm font-medium mt-0.5">Joined March 2024</p>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#1f639e] rounded-full font-bold text-sm mt-3 border border-blue-100">
                <Trophy className="w-3.5 h-3.5" />
                Level 5 · Gold League
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {[
                { icon: Flame, label: "Day Streak", value: "7", color: "text-orange-500", bg: "bg-orange-50" },
                { icon: Zap, label: "Total XP", value: "1,240", color: "text-[#1f639e]", bg: "bg-blue-50" },
                { icon: Brain, label: "Units Completed", value: "2", color: "text-[#1f639e]", bg: "bg-blue-50" },
              ].map((stat, i) => (
                <div key={stat.label} className={cn("flex items-center gap-3 px-5 py-4", i !== 2 && "border-b border-slate-50")}>
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", stat.bg)}>
                    <stat.icon className={cn("w-4 h-4", stat.color)} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
                    <p className={cn("text-sm font-black", stat.color)}>{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: achievements + settings */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
            >
              <h2 className="font-black text-slate-800 mb-4">Achievements</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { title: "Wildfire", icon: Zap, level: 3, color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-100", unlocked: true },
                  { title: "Scholar", icon: Brain, level: 2, color: "text-[#1f639e]", bg: "bg-blue-50", border: "border-blue-100", unlocked: true },
                  { title: "Champion", icon: Trophy, level: 1, color: "text-yellow-500", bg: "bg-yellow-50", border: "border-yellow-100", unlocked: false },
                ].map((a, i) => (
                  <div
                    key={i}
                    className={cn(
                      "rounded-2xl border p-4 flex flex-col items-center text-center gap-2",
                      a.bg, a.border,
                      !a.unlocked && "opacity-40 grayscale"
                    )}
                  >
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center border-2", a.bg, a.border)}>
                      <a.icon className={cn("w-6 h-6", a.color)} />
                    </div>
                    <div>
                      <p className="font-black text-slate-700 text-sm">{a.title}</p>
                      <p className="text-xs text-slate-400 font-bold">Level {a.level}</p>
                    </div>
                    {!a.unlocked && <p className="text-[10px] text-slate-400 font-bold">Locked</p>}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
            >
              <h2 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-slate-400" />
                Settings
              </h2>
              <div className="space-y-1">
                {[
                  { id: "notifications", icon: Bell, label: "Daily Reminders", sub: "Get notified to maintain your streak", defaultChecked: true },
                  { id: "sound", icon: Volume2, label: "Sound Effects", sub: "Play sounds during lessons", defaultChecked: true },
                  { id: "darkmode", icon: Moon, label: "Dark Mode", sub: "Switch to a darker interface", defaultChecked: false },
                ].map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-b-0">
                    <Label htmlFor={setting.id} className="flex items-start gap-3 cursor-pointer">
                      <setting.icon className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-slate-700 text-sm">{setting.label}</p>
                        <p className="text-xs text-slate-400 font-medium">{setting.sub}</p>
                      </div>
                    </Label>
                    <Switch id={setting.id} defaultChecked={setting.defaultChecked} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
