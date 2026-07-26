import { useState, useEffect, useRef } from "react";
import { Calendar, Github } from "lucide-react";
import { workExperience, education } from "@/content/experience";

export const Experience = () => {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const experiences = activeTab === "work" ? workExperience : education;

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set(prev).add(index));
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -100px 0px",
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [experiences]);

  // Reset visible items when tab changes
  useEffect(() => {
    setVisibleItems(new Set());
  }, [activeTab]);

  return (
    <section id="experience" className="py-24 px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-light mb-4 text-center">
          Experience
        </h2>
        <p className="text-center text-foreground/70 font-light mb-16">
          Building innovative solutions across full-stack development, AI/ML, and embedded systems
        </p>

        <div className="flex gap-6 justify-center mb-16">
          <button
            onClick={() => setActiveTab("work")}
            className={`text-sm font-light transition-colors ${
              activeTab === "work"
                ? "text-foreground border-b border-foreground pb-1"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Work
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`text-sm font-light transition-colors ${
              activeTab === "education"
                ? "text-foreground border-b border-foreground pb-1"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Education
          </button>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-border"></div>

          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, idx) => {
              const isCurrent = activeTab === "work" && exp.current;

              return (
              <div
                key={idx}
                ref={(el) => (itemRefs.current[idx] = el)}
                className={`relative pl-12 sm:pl-24 transition-all duration-700 ${
                  visibleItems.has(idx)
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-2 sm:left-6 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 border-background z-10 ${isCurrent ? "bg-violet-500 shadow-[0_0_18px_rgba(168,85,247,0.95)]" : "bg-foreground"}`}></div>

                {/* Experience card */}
                <div className={`relative rounded-lg p-4 sm:p-6 transition-all ${isCurrent ? "border border-violet-400/70 bg-violet-500/[0.07] shadow-[0_0_0_1px_rgba(168,85,247,0.18),0_0_32px_rgba(139,92,246,0.32)]" : "bg-card border border-border hover:border-foreground/30"}`}>
                  {exp.github && (
                    <a
                      href={exp.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-3 top-3 sm:right-4 sm:top-4 p-1.5 sm:p-2 rounded-md border border-border hover:border-foreground/40 hover:bg-foreground/5 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </a>
                  )}
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4 pr-8 sm:pr-0">
                    {exp.logo && (
                      <img 
                        src={exp.logo} 
                        alt={exp.organization} 
                        className="w-10 h-10 sm:w-12 sm:h-12 object-contain flex-shrink-0 rounded" 
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-lg sm:text-xl font-light break-words">{exp.title}</h3>
                        {isCurrent && <span className="rounded-full border border-violet-300/50 bg-violet-500/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-violet-200 shadow-[0_0_14px_rgba(168,85,247,0.35)]">Current</span>}
                      </div>
                      <p className={`text-sm sm:text-base font-light mb-2 break-words ${isCurrent ? "text-violet-200" : "text-foreground/80"}`}>{exp.organization}</p>
                      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-foreground/60 font-light flex-wrap">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="whitespace-nowrap">{exp.period}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 sm:space-y-2 pt-2">
                    {exp.responsibilities.map((resp, i) => (
                      <div key={i} className="text-xs sm:text-sm text-foreground/70 leading-relaxed font-light flex gap-2 sm:gap-3">
                        <span className="text-foreground/80 text-sm sm:text-base leading-relaxed flex-shrink-0">•</span>
                        <span className="break-words flex-1">{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
