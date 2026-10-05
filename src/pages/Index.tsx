import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { SiteBackground } from "@/components/SiteBackground";
import { Preloader } from "@/components/Preloader";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.18;
    void audio.play().then(() => setIsMusicPlaying(true)).catch(() => setIsMusicPlaying(false));
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play().then(() => setIsMusicPlaying(true)).catch(() => setIsMusicPlaying(false));
      return;
    }

    audio.pause();
    setIsMusicPlaying(false);
  };

  useEffect(() => {
    // Hide scrollbar and prevent scroll during preloader loading phase
    if (!isLoaded) {
      document.body.classList.add("no-scrollbar", "overflow-hidden");
    } else {
      document.body.classList.remove("no-scrollbar", "overflow-hidden");
    }
    return () => {
      document.body.classList.remove("no-scrollbar", "overflow-hidden");
    };
  }, [isLoaded]);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <audio ref={audioRef} src="/we-on-go-bia.mp3" loop preload="metadata" />
      {/* Background is mounted directly under the root container for correct stacking/layering */}
      <SiteBackground active={isLoaded} />

      {/* Dynamic percentage preloader */}
      <Preloader onComplete={() => setIsLoaded(true)} onStartAudio={startMusic} />

      {/* Main website contents - transition opacity based on preloader state */}
      <div
        className={`transition-all duration-1000 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        
        {/* Header has a slight delay to fade in after the hero name */}
        <div className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <Header />
        </div>

        <main id="main">
          <Hero isLoaded={isLoaded} />
          <About />
          <ChatBot />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        
        <Footer />
      </div>

      {isLoaded && (
        <button
          type="button"
          onClick={toggleMusic}
          className="portfolio-audio-toggle"
          aria-label={isMusicPlaying ? "Mute portfolio music" : "Play portfolio music"}
          title={isMusicPlaying ? "Mute music" : "Play music"}
        >
          {isMusicPlaying ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
        </button>
      )}
    </div>
  );
};

export default Index;
