import { skillCategories } from "@/content/skills";

export const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-light mb-16">
          Skills
        </h2>

        <div className="space-y-8">
          {skillCategories.map((category) => (
            <div key={category.label}>
              <h3 className="text-lg font-light text-muted-foreground mb-5 tracking-wide">
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-2.5 px-3.5 py-2 rounded-lg border border-border bg-card hover:scale-105 hover:border-foreground/30 transition-all duration-300"
                  >
                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                      <img
                        src={skill.icon}
                        alt={`${skill.name} icon`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-xs text-foreground/80 font-light whitespace-nowrap">
                      {skill.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
