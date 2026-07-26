import { about } from "@/content/about";
import AboutPortraitReveal from "@/components/AboutPortraitReveal";

export const About = () => {
  return (
    <section id="about" className="py-24 px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto max-w-5xl">
        <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4 text-center font-light">
          About Me
        </p>
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-light mb-12 text-center">
          Who I Am
        </h2>

        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-8 sm:gap-10 items-start">
          {/* Cursor-reveal portrait */}
          <div className="shrink-0 mx-auto sm:mx-0">
            <AboutPortraitReveal />
          </div>

          <div className="space-y-4 flex-1">
            <ul className="space-y-4 text-left">
              {about.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-foreground mt-2 font-light">•</span>
                  <p className="text-base md:text-lg text-foreground leading-relaxed font-light flex-1">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
