import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, XCircle, PlayCircle, ChevronRight } from "lucide-react";
import { Link, useParams, useLocation } from "wouter";
import { COURSES } from "@/data/curriculum";
import { cn } from "@/lib/utils";

// TODO: backend hooks here
// const { data: lesson } = useGetLesson(courseId, unitId);
// const { mutate: submitAnswer } = useSubmitAnswer();
// const { mutate: completeUnit } = useCompleteUnit();

export default function Lesson() {
  const params = useParams<{ courseId: string; unitId: string }>();
  const [, setLocation] = useLocation();

  const courseId = parseInt(params.courseId ?? "1", 10);
  const unitId = parseInt(params.unitId ?? "103", 10);

  const course = COURSES.find((c) => c.id === courseId) ?? COURSES[0];
  const unit = course.units.find((u) => u.id === unitId) ?? course.units[2];
  const unitIndex = course.units.indexOf(unit);

  const [phase, setPhase] = useState<"video" | "quiz">("video");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "correct" | "incorrect">("idle");
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const questions = unit.questions;
  const question = questions[currentQ];

  const ACCENT = [
    {
      btn: "bg-[#1f639e] hover:bg-[#185280]",
      progress: "bg-[#1f639e]",
      selectedBorder: "border-[#1f639e] bg-blue-50 text-[#1f639e]",
    },
    {
      btn: "bg-sky-600 hover:bg-sky-700",
      progress: "bg-sky-500",
      selectedBorder: "border-sky-500 bg-sky-50 text-sky-700",
    },
    {
      btn: "bg-emerald-600 hover:bg-emerald-700",
      progress: "bg-emerald-500",
      selectedBorder: "border-emerald-500 bg-emerald-50 text-emerald-700",
    },
  ];
  const accent = ACCENT[(courseId - 1) % ACCENT.length];

  const handleCheck = () => {
    if (selected === null || !question) return;
    if (status === "idle") {
      const correct = selected === question.correctIndex;
      setStatus(correct ? "correct" : "incorrect");
      if (correct) setScore((s) => s + 1);
    } else {
      if (currentQ + 1 >= questions.length) {
        setDone(true);
      } else {
        setCurrentQ((q) => q + 1);
        setSelected(null);
        setStatus("idle");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5">
        <Link href={`/course/${course.id}`}>
          <button
            data-testid="button-close-lesson"
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </Link>

        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full", accent.progress)}
            initial={{ width: 0 }}
            animate={{
              width:
                phase === "video"
                  ? "40%"
                  : `${40 + (currentQ / (questions.length || 1)) * 60}%`,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        <div className="text-xs font-bold text-slate-500 w-28 text-right">
          {/* TODO: backend hooks here */}
          Course {course.id} · Unit {unitIndex + 1}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Video + info area */}
        <div className="flex-1 flex flex-col">
          {/* Video placeholder */}
          <div className="aspect-video relative bg-slate-900 max-h-[60vh]">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 px-8 text-center">
              <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/15 flex items-center justify-center backdrop-blur-sm">
                <PlayCircle className="w-11 h-11 text-white" />
              </div>
              <div>
                <p className="text-white font-black text-xl mb-1">{unit.title}</p>
                <p className="text-slate-400 text-sm font-medium">{unit.duration} video lesson</p>
              </div>
              {/* TODO: backend hooks here — replace with real video embed (e.g. YouTube iframe, Vimeo, Mux) */}
              <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-2.5 mt-2">
                <p className="text-slate-500 text-xs font-mono">{"// <VideoEmbed src={unit.videoUrl} />"}</p>
              </div>
            </div>
          </div>

          {/* Below video info */}
          <div className="p-6 border-b border-white/5">
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">
              {course.title}
            </p>
            <h2 className="text-white font-black text-lg mb-2">{unit.title}</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{unit.description}</p>
          </div>

          {/* CTA to move to quiz */}
          {phase === "video" && questions.length > 0 && (
            <div className="p-6">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setPhase("quiz")}
                data-testid="button-to-quiz"
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl font-black text-white text-sm transition-colors shadow-lg",
                  accent.btn
                )}
              >
                Take the Knowledge Check
                <ChevronRight className="w-4 h-4" />
              </motion.button>
              <p className="text-slate-600 text-xs mt-2 font-medium">
                {questions.length} question{questions.length !== 1 ? "s" : ""} based on this video
              </p>
            </div>
          )}

          {phase === "video" && questions.length === 0 && (
            <div className="p-6">
              <Link href={`/course/${course.id}`}>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className={cn("px-6 py-3 rounded-xl font-black text-white text-sm", accent.btn)}
                >
                  Back to Course
                </motion.button>
              </Link>
            </div>
          )}
        </div>

        {/* Quiz panel */}
        <AnimatePresence>
          {phase === "quiz" && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.25 }}
              className="w-full lg:w-[420px] border-l border-white/5 bg-slate-900 flex flex-col"
            >
              {done ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/30 flex items-center justify-center mb-5">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h2 className="text-white font-black text-2xl mb-2">Unit Complete!</h2>
                  <p className="text-slate-400 text-sm mb-1">You scored</p>
                  <p className="text-4xl font-black text-white mb-1">
                    {score}/{questions.length}
                  </p>
                  <p className="text-slate-500 text-sm mb-8">
                    {score === questions.length ? "Perfect score!" : "Keep it up!"}
                  </p>
                  <Link href={`/course/${course.id}`}>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      className={cn("px-8 py-3 rounded-xl font-black text-white", accent.btn)}
                    >
                      Back to Course
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="px-6 py-5 border-b border-white/5">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">
                      Knowledge Check · {currentQ + 1} of {questions.length}
                    </p>
                    <p className="text-white font-black text-base leading-snug">{question.prompt}</p>
                  </div>

                  <div className="flex-1 px-6 py-5 flex flex-col gap-3">
                    {question.options.map((opt, i) => {
                      const isSelected = selected === i;
                      const isWrong = status === "incorrect" && isSelected;
                      const isCorrect = status === "correct" && isSelected;

                      return (
                        <motion.button
                          key={i}
                          data-testid={`button-option-${i}`}
                          whileTap={status === "idle" ? { scale: 0.98 } : undefined}
                          onClick={() => status === "idle" && setSelected(i)}
                          className={cn(
                            "p-4 rounded-xl border-2 text-left font-bold text-sm transition-all duration-150",
                            !isSelected && status === "idle" && "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20",
                            isSelected && status === "idle" && cn("border-2", accent.selectedBorder),
                            isWrong && "bg-red-950/50 border-red-500/50 text-red-400",
                            isCorrect && "bg-emerald-950/50 border-emerald-500/50 text-emerald-400",
                            status !== "idle" && !isSelected && "opacity-30 pointer-events-none"
                          )}
                        >
                          <span className="mr-3 font-black text-slate-500 text-xs">
                            {String.fromCharCode(65 + i)}
                          </span>
                          {opt}
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className={cn(
                    "px-6 py-5 border-t border-white/5 transition-colors duration-300",
                    status === "correct" ? "bg-emerald-950/30" : status === "incorrect" ? "bg-red-950/30" : ""
                  )}>
                    <AnimatePresence mode="popLayout">
                      {status !== "idle" && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mb-4"
                        >
                          <div className={cn(
                            "flex items-center gap-2 font-black text-sm mb-2",
                            status === "correct" ? "text-emerald-400" : "text-red-400"
                          )}>
                            {status === "correct"
                              ? <><CheckCircle className="w-5 h-5" /> Exactly right!</>
                              : <><XCircle className="w-5 h-5" /> Not quite</>}
                          </div>
                          <p className="text-slate-400 text-xs leading-relaxed">{question.explanation}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      data-testid="button-check-continue"
                      whileTap={{ scale: 0.97 }}
                      onClick={handleCheck}
                      disabled={selected === null}
                      className={cn(
                        "w-full py-3.5 rounded-xl font-black text-sm text-white transition-colors",
                        selected !== null ? accent.btn : "bg-white/10 text-slate-500 cursor-not-allowed"
                      )}
                    >
                      {status === "idle"
                        ? "Check Answer"
                        : currentQ + 1 >= questions.length
                        ? "Finish"
                        : "Next Question"}
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
