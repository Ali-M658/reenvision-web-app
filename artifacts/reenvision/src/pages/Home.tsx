import { motion } from "framer-motion";
import { Link } from "wouter";
import { Brain, MessageSquare, FlaskConical, ChevronRight, PlayCircle, Flame } from "lucide-react";
import { COURSES } from "@/data/curriculum";
import { cn } from "@/lib/utils";

// TODO: backend hooks here
// const { data: userProgress } = useGetUserProgress();
// const { data: courses } = useGetCourses();

const COURSE_META = [
  {
    Icon: Brain,
    gradientFrom: "from-[#1f639e]",
    gradientTo: "to-[#124070]",
    lightBg: "bg-blue-50",
    border: "border-blue-100",
    badgeText: "text-[#1f639e]",
    progressBar: "bg-[#1f639e]",
    tag: "Foundations",
  },
  {
    Icon: MessageSquare,
    gradientFrom: "from-sky-500",
    gradientTo: "to-cyan-700",
    lightBg: "bg-sky-50",
    border: "border-sky-100",
    badgeText: "text-sky-700",
    progressBar: "bg-sky-500",
    tag: "Skills",
  },
  {
    Icon: FlaskConical,
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-700",
    lightBg: "bg-emerald-50",
    border: "border-emerald-100",
    badgeText: "text-emerald-700",
    progressBar: "bg-emerald-500",
    tag: "Hands-On",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardV = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3 } },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 px-8 py-8">
      {/* Page header */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-1">Your Learning Path</h1>
            <p className="text-slate-500 font-medium">All courses are open — start wherever you want.</p>
          </div>

          {/* Resume banner */}
          {/* TODO: backend hooks here — replace with real current lesson */}
          <Link href="/course/1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 bg-white border border-blue-100 rounded-2xl px-5 py-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="bg-[#1f639e] rounded-xl p-2">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-black text-[#1f639e]">Pick up where you left off</p>
                <p className="text-xs text-slate-400 font-medium">Course 1 · Unit 3: How Models Learn</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 ml-1" />
            </motion.div>
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Day Streak", value: "7", color: "text-orange-500" },
            { label: "XP Earned", value: "1,240", color: "text-[#1f639e]" },
            { label: "Units Done", value: "2", color: "text-[#1f639e]" },
            { label: "Accuracy", value: "94%", color: "text-emerald-600" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 px-5 py-4 shadow-sm">
              <p className={cn("text-2xl font-black", stat.color)}>{stat.value}</p>
              <p className="text-xs text-slate-400 font-bold mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Course cards — all open, side by side */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {COURSES.map((course, i) => {
          const meta = COURSE_META[i];
          const { Icon } = meta;
          const completedUnits = course.units.filter((u) => u.state === "completed").length;
          const inProgressUnit = course.units.find((u) => u.state === "in-progress");
          const progress = Math.round((completedUnits / course.units.length) * 100);

          return (
            <motion.div key={course.id} variants={cardV}>
              <Link href={`/course/${course.id}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 flex flex-col h-full"
                  data-testid={`card-course-${course.id}`}
                >
                  {/* Card header gradient */}
                  <div className={cn("bg-gradient-to-br p-6", meta.gradientFrom, meta.gradientTo)}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs font-black px-2.5 py-1 rounded-full bg-white/20 text-white">
                        Course {course.id} · {meta.tag}
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/70" />
                    </div>
                    <div className="bg-white/15 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-xl font-black text-white leading-tight">{course.title}</h2>
                    <p className="text-sm text-white/80 font-semibold mt-0.5">{course.subtitle}</p>
                  </div>

                  {/* Card body */}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{course.description}</p>

                    {/* Unit previews */}
                    <div className="space-y-2 mb-5 flex-1">
                      {course.units.slice(0, 3).map((unit) => (
                        <div key={unit.id} className="flex items-center gap-2">
                          <PlayCircle className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
                          <span className="text-xs text-slate-500 font-medium truncate">{unit.title}</span>
                          <span className="text-[10px] text-slate-300 font-bold ml-auto flex-shrink-0">{unit.duration}</span>
                        </div>
                      ))}
                      {course.units.length > 3 && (
                        <p className="text-xs text-slate-400 font-bold pl-5">+{course.units.length - 3} more units</p>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-bold text-slate-400">
                          {completedUnits}/{course.units.length} units complete
                        </span>
                        <span className={cn("text-xs font-black", progress > 0 ? meta.badgeText : "text-slate-300")}>
                          {progress}%
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className={cn("h-full rounded-full", meta.progressBar)}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.3 + i * 0.1 }}
                        />
                      </div>
                      {inProgressUnit && (
                        <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
                          In progress: {inProgressUnit.title}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
