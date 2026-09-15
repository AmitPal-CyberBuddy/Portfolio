import { useEffect, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

import { MOTION_EASE } from './content';
import { useActiveSection, useCurrentTime, useScrolled, useScrollProgress, useTheme } from './lib/hooks';

import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Focus } from './components/Focus';
import { Resume, ResumeViewer } from './components/Resume';
import { Projects } from './components/Projects';
import { Writing } from './components/Writing';
import { Journey } from './components/Journey';
import { LearningLoop } from './components/LearningLoop';
import { Signals } from './components/Signals';
import { Now } from './components/Now';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);
  const time = useCurrentTime();
  const activeSection = useActiveSection();
  const progress = useScrollProgress();
  const showBackToTop = useScrolled(640);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1050);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <CustomCursor />
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        time={time}
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onOpenResume={() => setResumeOpen(true)}
      />
      <main id="main">
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <Focus />
        <Resume onOpenResume={() => setResumeOpen(true)} />
        <Projects />
        <Writing />
        <Journey />
        <LearningLoop />
        <Signals />
        <Now />
        <Contact onOpenResume={() => setResumeOpen(true)} />
      </main>
      <Footer />
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            className="back-to-top"
            aria-label="Back to top"
            data-cursor="TOP"
            initial={{ opacity: 0, y: 14, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.86 }}
            transition={{ duration: 0.28, ease: MOTION_EASE }}
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <span
              className="back-to-top__progress"
              aria-hidden="true"
              style={{ background: `conic-gradient(var(--accent) ${(progress * 100).toFixed(1)}%, color-mix(in srgb, var(--border-strong) 42%, transparent) 0)` }}
            />
            <ArrowUp size={16} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      <AnimatePresence>{resumeOpen && <ResumeViewer onClose={() => setResumeOpen(false)} />}</AnimatePresence>
    </MotionConfig>
  );
}
