import { useState, useEffect, type FormEvent } from "react";
import DigitalRain from "@/components/DigitalRain";

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [count, setCount] = useState(0);
  const [exitAnimation, setExitAnimation] = useState(false);
  const [visible, setVisible] = useState(true);
  const [combination, setCombination] = useState([0, 0, 0]);
  const [showLock, setShowLock] = useState(false);
  const [lockError, setLockError] = useState(false);

  useEffect(() => {
    let current = 0;
    let timer: ReturnType<typeof setTimeout>;

    const increment = () => {
      let step = 1;
      if (current < 35) {
        step = Math.floor(Math.random() * 4) + 2; // fast initial load
      } else if (current < 75) {
        step = Math.floor(Math.random() * 2) + 1; // standard load
      } else if (current < 96) {
        step = 1; // slow tick at the end
      } else {
        step = 1; // very slow at the last stretch
      }

      current = Math.min(current + step, 100);
      setCount(current);

      if (current < 100) {
        let delay = Math.random() * 30 + 15;
        if (current > 40 && current < 46) delay = 180; // fake pause/hydration point
        if (current > 75 && current < 80) delay = 250; // second fake pause
        if (current > 90) delay = Math.random() * 100 + 80; // slow down at the very end
        timer = setTimeout(increment, delay);
      } else {
        // Completion pauses here until the visitor opens the combination lock.
        timer = setTimeout(() => setShowLock(true), 350);
      }
    };

    // Delay start of loader slightly for visual stability
    timer = setTimeout(increment, 200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  const formattedCount = count.toString().padStart(3, "0");

  const unlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (combination.join("") !== "567") {
      setLockError(true);
      return;
    }
    setLockError(false);
    setShowLock(false);
    setExitAnimation(true);
    window.setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 1100);
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-[#080808] text-white flex flex-col justify-between p-8 sm:p-12 md:p-16 select-none ${
        exitAnimation ? "preloader-exit-slide" : ""
      }`}
    >
      <DigitalRain glyphSize={10} trail={18} style={{ opacity: 0.65 }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,8,8,0.3),rgba(8,8,8,0.88)_72%)]" />
      {/* Top Header */}
      <div className="relative z-10 flex justify-between items-start w-full">
        <div className="flex flex-col">
          <span className="text-xs tracking-[0.25em] uppercase font-sans text-white/50">
            Portfolio Edition
          </span>
          <span className="text-sm font-serif font-light mt-1">
            2026
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-xs tracking-[0.25em] uppercase font-sans text-white/50">
            Current Status
          </span>
          <span className="text-sm font-sans font-light mt-1 text-[#FF9FFC]">
            {count < 45 ? "Compiling Modules" : count < 80 ? "Hydrating Canvas" : count < 100 ? "Finalizing Scene" : "Ready"}
          </span>
        </div>
      </div>

      {/* Middle Text - Editorial Reveal */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center flex-1 my-12">
        <div className="overflow-hidden h-[1.5em] flex items-center justify-center">
          <div className="animate-slide-reveal">
            <span className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-wide text-white/90">
              Mrinel Jogy
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-[1.5em] flex items-center justify-center mt-2">
          <div className="animate-slide-reveal reveal-delay-2">
            <span className="text-xs sm:text-sm tracking-[0.3em] uppercase font-sans text-white/40 text-center">
              Official Portfolio
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Counter and Footer */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-end w-full gap-6">
        <div className="flex flex-col text-left">
          <span className="text-xs tracking-[0.2em] uppercase font-sans text-white/50">
            Development & Analysis
          </span>
          <span className="text-sm font-serif font-light mt-1 text-white/80 max-w-[280px]">
            Building immersive systems, analytics, & cybersecurity.
          </span>
        </div>
        
        {/* Large Counter */}
        <div className="overflow-hidden leading-none select-none">
          <span className="block text-[15vw] sm:text-[10vw] font-serif font-light tracking-tighter text-white tabular-nums">
            {formattedCount}
          </span>
        </div>
      </div>

      {showLock && (
        <div className="lock-modal" role="dialog" aria-modal="true" aria-labelledby="lock-title">
          <div className="lock-modal-glow" />
          <form className="lock-modal-card" onSubmit={unlock}>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ffe7c9]/60">Secure access</p>
            <h2 id="lock-title" className="mt-3 text-2xl font-serif text-[#fff4e9]">Enter the combination</h2>
            <div className="lock-dial-shell mt-7">
              <div className="combination-lock" aria-label="Three digit combination lock">
                {combination.map((selectedDigit, dialIndex) => (
                <div
                  className="dial"
                  key={dialIndex}
                  onClick={() => {
                    setCombination((current) => current.map((value, index) => index === dialIndex ? (value + 1) % 10 : value));
                    setLockError(false);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setCombination((current) => current.map((value, index) => index === dialIndex ? (value + 1) % 10 : value));
                    }
                  }}
                  aria-label={`Rotate dial ${dialIndex + 1}; current value ${selectedDigit}`}
                >
                  <div className="nonagon" style={{ transform: `rotateX(${selectedDigit * 36}deg)` }}>
                    {Array.from({ length: 10 }, (_, digit) => (
                      <label className={`face face-${digit}`} key={digit}>
                        <span>{digit}</span>
                        <input
                          className={`radio radio-${digit}`}
                          type="radio"
                          name={`lock-dial-${dialIndex}`}
                          checked={selectedDigit === digit}
                          onChange={() => undefined}
                          aria-label={`Set dial ${dialIndex + 1} to ${digit}`}
                        />
                      </label>
                    ))}
                  </div>
                </div>
                ))}
              </div>
            </div>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#ffe7c9]/65">Click each dial to rotate · Hint: 567</p>
            {lockError && <p className="mt-3 text-xs text-[#ffb6a4]">That combination doesn’t unlock it.</p>}
            <button className="lock-unlock-button mt-6" type="submit">Unlock portfolio</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Preloader;
