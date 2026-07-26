import { Github, Linkedin, FileText } from "lucide-react";
import { hero } from "@/content/hero";
import { ButtonGlow } from "@/components/ButtonGlow";

interface HeroProps {
  isLoaded?: boolean;
}

export const Hero = ({ isLoaded = true }: HeroProps) => {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex flex-col justify-center items-center pt-24 pb-20 px-6 sm:px-8 lg:px-12 text-center select-none"
    >
      <div className="container mx-auto max-w-5xl relative z-10 flex flex-col items-center justify-center flex-1">
        {/* Entrance animations play when isLoaded is true */}
        {isLoaded && (
          <div className="flex flex-col items-center space-y-8 md:space-y-12">
            
            {/* Small Role Badge */}
            <div className="overflow-hidden h-6 flex items-center justify-center">
              <div className="animate-slide-reveal reveal-delay-1">
                <span className="text-xs sm:text-sm tracking-[0.25em] uppercase font-sans text-foreground/60 font-medium">
                  {hero.badge}
                </span>
              </div>
            </div>

            {/* Editorial Centered Typography Name */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-serif font-light tracking-tight leading-none text-foreground flex flex-col sm:flex-row justify-center items-center sm:gap-6">
                <span className="relative overflow-hidden block animate-slide-reveal reveal-delay-2">
                  <span>{hero.firstName.toUpperCase()}</span>
                </span>
                <span className="relative overflow-hidden block animate-slide-reveal reveal-delay-3 italic text-foreground/80 font-serif">
                  <span>{hero.lastName.toUpperCase()}</span>
                </span>
              </h1>
            </div>

            {/* Title / Role Tagline */}
            <div className="overflow-hidden max-w-2xl">
              <div className="animate-slide-reveal reveal-delay-4">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-serif font-light text-foreground/90 tracking-wide">
                  {hero.title}
                </h2>
              </div>
            </div>

            {/* Description */}
            <div className="overflow-hidden max-w-xl">
              <div className="animate-slide-reveal reveal-delay-5">
                <p className="text-base sm:text-lg text-foreground/60 font-sans font-light leading-relaxed">
                  {hero.description}
                </p>
              </div>
            </div>

            {/* CTA Buttons - Centered */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto animate-fade-in opacity-0 reveal-delay-6 fill-mode-forwards">
              <a
                href="#projects"
                className="uiverse-button w-full sm:w-auto"
              >
                <ButtonGlow>View Projects</ButtonGlow>
              </a>
              <a
                href={hero.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="uiverse-button w-full sm:w-auto"
              >
                <ButtonGlow><span className="inline-flex items-center justify-center gap-2"><FileText className="w-4 h-4" /> Resume</span></ButtonGlow>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-6 pt-2 animate-fade-in opacity-0 reveal-delay-7 fill-mode-forwards">
              <a
                href={hero.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-tilt-btn"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-foreground/75 hover:text-foreground" />
              </a>
              <a
                href={hero.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-tilt-btn"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-foreground/75 hover:text-foreground" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
