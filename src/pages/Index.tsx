import { useState, useEffect } from "react";
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
      {/* Background is mounted directly under the root container for correct stacking/layering */}
      <SiteBackground active={isLoaded} />

      {/* Dynamic percentage preloader */}
      <Preloader onComplete={() => setIsLoaded(true)} />

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
    </div>
  );
};

export default Index;
