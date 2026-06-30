import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";

import Home from "@/pages/Home";
import Course from "@/pages/Course";
import Lesson from "@/pages/Lesson";
import Progress from "@/pages/Progress";
import Leaderboard from "@/pages/Leaderboard";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/not-found";
import Sidebar from "@/components/Sidebar";

const queryClient = new QueryClient();

function PageTransition({ children, location }: { children: React.ReactNode; location: string }) {
  return (
    <motion.div
      key={location}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();
  const isLesson = location.startsWith("/lesson");

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-foreground flex">
      {/* Sidebar — hidden on lesson screen */}
      {!isLesson && <Sidebar />}

      {/* Main content */}
      <main className={isLesson ? "flex-1" : "flex-1 ml-64 overflow-y-auto min-h-screen"}>
        <AnimatePresence mode="wait">
          {isLesson ? (
            <motion.div
              key="lesson"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="min-h-screen"
            >
              <Switch location={location}>
                <Route path="/lesson/:courseId/:unitId" component={Lesson} />
                <Route path="/lesson" component={Lesson} />
                <Route component={NotFound} />
              </Switch>
            </motion.div>
          ) : (
            <PageTransition location={location}>
              <Switch location={location}>
                <Route path="/" component={Home} />
                <Route path="/course/:id" component={Course} />
                <Route path="/progress" component={Progress} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route path="/profile" component={Profile} />
                <Route component={NotFound} />
              </Switch>
            </PageTransition>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
