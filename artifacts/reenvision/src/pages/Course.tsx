import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams, useLocation } from "wouter";
import {
  ChevronRight,
  PlayCircle,
  CheckCircle2,
  Circle,
  Clock,
  ArrowLeft,
  Brain,
  MessageSquare,
  FlaskConical,
} from "lucide-react";
import { COURSES } from "@/data/curriculum";
import type { Unit } from "@/data/curriculum";
import { cn } from "@/lib/utils";

// TODO: backend hooks here
// const { data: course } = useGetCourse(id);
// const { data: userProgress } = useGetUserCourseProgress(id);

const COURSE_ICONS = [Brain, MessageSquare, FlaskConical];

const COURSE_GRADIENTS = [
  {
    from: "from-[#1f639e]", to: "to-[#124070]",
    accent: "text-[#1f639e]", activeBg: "bg-blue-50", border: "border-blue-200",
    btn: "bg-[#1f639e] hover:bg-[#185280]",
  },
  {
    from: "from-sky-500", to: "to-cyan-700",
    accent: "text-sky-600", activeBg: "bg-sky-50", border: "border-sky-200",
    btn: "bg-sky-600 hover:bg-sky-700",
  },
  {
    from: "from-emerald-500", to: "to-teal-700",
    accent: "text-emerald-600", activeBg: "bg-emerald-50", border: "border-emerald-200",
    btn: "bg-emerald-600 hover:bg-emerald-700",
  },
];

function UnitStateIcon({ state }: { state: Unit["state"] }) {
  if (state === "completed") return <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />;
  if (state === "in-progress") return <PlayCircle className="w-5 h-5 text-[#1f639e] fill-blue-100" />;
  return <Circle className="w-5 h-5 text-slate-300" />;
}

export default function Course() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const courseId = parseInt(params.id ?? "1", 10);
  const course = COURSES.find((c) => c.id === courseId) ?? COURSES[0];
  const meta = COURSE_GRADIENTS[(courseId - 1) % COURSE_GRADIENTS.length];
  const Icon = COURSE_ICONS[(courseId - 1) % COURSE_ICONS.length];

  const [selectedUnit, setSelectedUnit] = useState<Unit>(
    course.units.find((u) => u.state === "in-progress") ?? course.units[0]
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Course header */}
      <div className={cn("bg-gradient-to-r p-8", meta.from, meta.to)}>
        <div className="max-w-6xl mx-auto">
          <Link href="/">
            <button
              data-testid="button-back-home"
              className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-bold mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Courses
            </button>
          </Link>

          <div className="flex items-center gap-5">
            <div className="bg-white/15 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Icon className="w-9 h-9 text-white" />
            </div>
            <div>
              <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-0.5">Course {course.id}</p>
              <h1 className="text-2xl font-black text-white">{course.title}</h1>
              <p className="text-white/80 font-semibold text-sm">{course.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two-panel layout */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-8 py-8 flex gap-6 items-start">
        {/* Left: Unit list */}
        <div className="w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <h2 className="font-black text-slate-700 text-sm">{course.units.length} Units</h2>
            </div>
            <div className="divide-y divide-slate-50">
              {course.units.map((unit, i) => {
                const isSelected = selectedUnit.id === unit.id;
                return (
                  <motion.button
                    key={unit.id}
                    data-testid={`button-unit-${unit.id}`}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedUnit(unit)}
                    className={cn(
                      "w-full text-left px-4 py-3.5 flex items-start gap-3 transition-colors",
                      isSelected
                        ? cn(meta.activeBg, "border-l-4", meta.border)
                        : "hover:bg-slate-50 border-l-4 border-transparent"
                    )}
                  >
                    <UnitStateIcon state={unit.state} />
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm font-bold leading-tight", isSelected ? meta.accent : "text-slate-700")}>
                        <span className="text-slate-400 font-black mr-1.5">{i + 1}.</span>
                        {unit.title}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-slate-300" />
                        <span className="text-[11px] text-slate-400 font-medium">{unit.duration}</span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Unit detail */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedUnit.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-4">
                {/* Video placeholder */}
                <div className="aspect-video bg-slate-900 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <div className="relative z-10 flex flex-col items-center gap-3 text-center px-8">
                    <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <PlayCircle className="w-9 h-9 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-black text-lg">{selectedUnit.title}</p>
                      <p className="text-slate-400 text-sm font-medium mt-1">{selectedUnit.duration} video lesson</p>
                    </div>
                    {/* TODO: backend hooks here — embed real video URL here */}
                    <div className="mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                      <p className="text-slate-500 text-xs font-mono">{"// Video will be embedded here"}</p>
                    </div>
                  </div>
                </div>

                {/* Unit info */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className={cn("text-xs font-black uppercase tracking-widest mb-1", meta.accent)}>
                        Course {course.id} · Unit {course.units.indexOf(selectedUnit) + 1}
                      </p>
                      <h2 className="text-xl font-black text-slate-900">{selectedUnit.title}</h2>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-bold text-slate-400">{selectedUnit.duration}</span>
                    </div>
                  </div>
                  <p className="text-slate-500 leading-relaxed text-sm">{selectedUnit.description}</p>

                  <div className="mt-6 flex items-center gap-3">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setLocation(`/lesson/${course.id}/${selectedUnit.id}`)}
                      data-testid="button-start-lesson"
                      className={cn(
                        "flex items-center gap-2 px-6 py-3 rounded-xl font-black text-white text-sm transition-colors shadow-md",
                        meta.btn
                      )}
                    >
                      <PlayCircle className="w-4 h-4" />
                      {selectedUnit.state === "completed"
                        ? "Rewatch Lesson"
                        : selectedUnit.state === "in-progress"
                        ? "Continue"
                        : "Start Lesson"}
                    </motion.button>
                    {selectedUnit.state === "completed" && (
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-bold">Completed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quiz preview card */}
              {selectedUnit.questions.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-black text-slate-800">Knowledge Check</h3>
                      <p className="text-sm text-slate-400 font-medium mt-0.5">
                        {selectedUnit.questions.length} question{selectedUnit.questions.length !== 1 ? "s" : ""} based on this video
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300" />
                  </div>
                  <p className="text-sm text-slate-500 bg-slate-50 rounded-xl p-3 italic">
                    "{selectedUnit.questions[0].prompt}"
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setLocation(`/lesson/${course.id}/${selectedUnit.id}`)}
                    className={cn("mt-4 w-full py-2.5 rounded-xl font-black text-sm text-white transition-colors", meta.btn)}
                  >
                    Watch & Answer
                  </motion.button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
