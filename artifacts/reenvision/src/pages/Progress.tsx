import { Flame, Clock, Target, Zap, TrendingUp, Brain, MessageSquare, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";
import { COURSES } from "@/data/curriculum";
import { cn } from "@/lib/utils";

// TODO: backend hooks here
// const { data: progress } = useGetProgress();
// const { data: courseProgress } = useGetCourseProgress();

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const activeDays = [true, true, true, false, false, false, false];

const COURSE_ICONS = [Brain, MessageSquare, FlaskConical];
const COURSE_COLORS = [
  { bar: "bg-[#1f639e]", bg: "bg-blue-50", text: "text-[#1f639e]", border: "border-blue-100" },
  { bar: "bg-sky-500", bg: "bg-sky-50", text: "text-sky-600", border: "border-sky-100" },
  { bar: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
];

export default function Progress() {
  return (
    <div className="min-h-screen bg-slate-50 px-8 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 mb-1">Your Progress</h1>
        <p className="text-slate-400 font-medium mb-8">Track your learning across all courses.</p>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Flame, label: "Day Streak", value: "7", sub: "Keep it up!", color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-100" },
            { icon: Zap, label: "Total XP", value: "1,240", sub: "Level 5", color: "text-[#1f639e]", bg: "bg-blue-50", border: "border-blue-100" },
            { icon: Target, label: "Accuracy", value: "94%", sub: "Across all units", color: "text-[#1f639e]", bg: "bg-blue-50", border: "border-blue-100" },
            { icon: Clock, label: "Time Practiced", value: "4h 20m", sub: "This week", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className={cn("bg-white rounded-2xl border p-5 shadow-sm", stat.border)}
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <p className={cn("text-2xl font-black", stat.color)}>{stat.value}</p>
              <p className="text-sm font-bold text-slate-700 mt-0.5">{stat.label}</p>
              <p className="text-xs text-slate-400 font-medium">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Activity */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-5 h-5 text-[#1f639e]" />
              <h2 className="font-black text-slate-800">This Week</h2>
            </div>
            <div className="flex justify-between items-end gap-2">
              {days.map((day, i) => (
                <div key={day} className="flex flex-col items-center gap-2 flex-1">
                  <div className={cn(
                    "w-full rounded-lg transition-all",
                    activeDays[i] ? "bg-[#1f639e] h-12" : "bg-slate-100 h-6"
                  )} />
                  <span className={cn(
                    "text-xs font-bold",
                    activeDays[i] ? "text-[#1f639e]" : "text-slate-300"
                  )}>
                    {day}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 font-medium mt-4 text-center">
              {/* TODO: backend hooks here */}
              3 of 7 days active this week
            </p>
          </motion.div>

          {/* Course progress breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
          >
            <h2 className="font-black text-slate-800 mb-5">Course Breakdown</h2>
            <div className="space-y-4">
              {COURSES.map((course, i) => {
                const meta = COURSE_COLORS[i];
                const CourseIcon = COURSE_ICONS[i];
                const completed = course.units.filter((u) => u.state === "completed").length;
                const pct = Math.round((completed / course.units.length) * 100);

                return (
                  <div key={course.id} className={cn("rounded-xl border p-4", meta.bg, meta.border)}>
                    <div className="flex items-center gap-3 mb-2">
                      <CourseIcon className={cn("w-4 h-4", meta.text)} />
                      <span className={cn("text-sm font-black", meta.text)}>{course.title}</span>
                      <span className="ml-auto text-xs font-black text-slate-400">{pct}%</span>
                    </div>
                    <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                      <motion.div
                        className={cn("h-full rounded-full", meta.bar)}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 + i * 0.1 }}
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5 font-medium">
                      {/* TODO: backend hooks here */}
                      {completed}/{course.units.length} units
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
