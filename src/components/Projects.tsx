import { useMemo, useState, type CSSProperties } from "react";
import { ArrowRight, Github, FileText } from "lucide-react";
import { projects, Project } from "@/content/projects";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import "./ProjectCard.css";
import { ButtonGlow } from "@/components/ButtonGlow";

const DevpostIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="h-4 w-4" aria-hidden="true">
    <path fill="#13b5ec" d="M8 18.5 20 6h24l12 12.5-12 27.5H20z" />
    <path fill="#fff" d="M25 20h9.5c6.2 0 10.5 3.9 10.5 11s-4.2 11-10.4 11H25zm9.4 17.3c3.7 0 5.8-2.7 5.8-6.3 0-3.7-2.1-6.3-5.8-6.3H30v12.6z" />
  </svg>
);

type ProjectTab = "personal" | "school";

const ProjectCard = ({ project }: { project: Project }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent flipping when clicking on a link or button
    if (
      (e.target as HTMLElement).closest("a") || 
      (e.target as HTMLElement).closest("button") || 
      (e.target as HTMLElement).closest('[role="dialog"]')
    ) {
      return;
    }
    setIsFlipped(prev => !prev);
  };

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientY - bounds.top) / bounds.height - 0.5) * -10,
      y: ((event.clientX - bounds.left) / bounds.width - 0.5) * 10,
    });
  };

  const githubLink = project.externalLinks?.find((link) => link.label === "GitHub");
  const devpostLink = project.externalLinks?.find((link) => link.label === "Devpost");
  const paperLink = project.externalLinks?.find((link) => link.label === "Paper");
  const primaryRepoLink = project.id === "pawgress" ? devpostLink ?? githubLink : paperLink ?? githubLink;

  return (
    <div 
      className={`flip-card project-card-glow group cursor-pointer ${isFlipped ? "flipped" : ""}`}
      onClick={handleCardClick}
      onMouseMove={handlePointerMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ perspective: "1000px" }}
    >
      <div
        className="flip-card-inner"
        style={{
          transform: isFlipped
            ? "rotateY(180deg)"
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.015, 1.015, 1.015)`,
        } as CSSProperties}
      >
        {/* Front Side */}
        <div className="flip-card-front flex flex-col justify-start text-left">
          {/* Image Section */}
          <div className="relative w-full overflow-hidden bg-neutral-900 aspect-[16/9]">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500"
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col flex-1 p-6 justify-between">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="project-card-title text-xl font-serif font-semibold leading-tight text-white">
                {project.title}
              </h3>
              {project.badge && (
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 whitespace-nowrap">
                  {project.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-white/45 font-mono tracking-[0.2em] uppercase mt-auto">
              Click to Flip
            </p>
          </div>
        </div>

        {/* Back Side */}
        <div className="flip-card-back flex flex-col justify-between p-6 text-left">
          <div>
            <h3 className="text-xl font-serif font-bold mb-3 text-white">
              {project.title}
            </h3>
            <p className="text-xs text-white/80 font-light mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {project.tags.slice(0, 4).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-white/20 text-white text-[10px] rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="text-[10px] text-white/60 self-center ml-1">
                  +{project.tags.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 mt-auto w-full">
            <Dialog>
              <DialogTrigger asChild>
                <button className="uiverse-button project-action-button w-full">
                  <ButtonGlow>View Project</ButtonGlow>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader className="flex flex-row items-start justify-between gap-4">
                  <div>
                    <DialogTitle className="text-2xl font-serif font-semibold">{project.title}</DialogTitle>
                  </div>

                  {primaryRepoLink && (
                    <Button
                      asChild
                      variant="default"
                      className="group bg-foreground text-background hover:opacity-90"
                    >
                      <a
                        href={primaryRepoLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        {primaryRepoLink.label === "Devpost" ? (
                          <>
                            <DevpostIcon />
                            <span>Devpost</span>
                          </>
                        ) : primaryRepoLink.label === "Paper" ? (
                          <>
                            <FileText className="h-4 w-4" />
                            <span>Paper</span>
                          </>
                        ) : (
                          <>
                            <Github className="h-4 w-4" />
                            <span>GitHub</span>
                          </>
                        )}
                      </a>
                    </Button>
                  )}
                </DialogHeader>

                <div className="space-y-6">
                  {/* Image/Video Carousel */}
                  {project.images.length > 0 && (
                    <Carousel className="w-full">
                      <CarouselContent>
                        {project.images.map((media, i) => {
                          const isYoutube = media.includes("youtube.com") || media.includes("youtu.be");
                          return (
                            <CarouselItem key={i}>
                              <div className="flex items-center justify-center bg-transparent rounded-lg overflow-hidden">
                                {isYoutube ? (
                                  <div className="relative w-full aspect-video">
                                    <iframe
                                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                                      src={media.replace("watch?v=", "embed/")}
                                      title={`${project.title} Video ${i + 1}`}
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    ></iframe>
                                  </div>
                                ) : (
                                  <img
                                    src={media}
                                    alt={`${project.title} - Image ${i + 1}`}
                                    className="w-full h-auto max-h-[400px] object-contain rounded-lg shadow-sm"
                                  />
                                )}
                              </div>
                            </CarouselItem>
                          );
                        })}
                      </CarouselContent>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </Carousel>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{project.overview}</p>

                  {project.details && project.details.length > 0 && (
                    <div className="space-y-2">
                      {project.details.map((detail, i) => (
                        <p
                          key={i}
                          className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {project.externalLinks
                      ?.filter((link) => link.label !== "GitHub" && link.label !== primaryRepoLink?.label)
                      .map((link, i) => (
                        <Button key={i} asChild variant="outline" className="group">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            {link.label === "Devpost" ? (
                              <>
                                <DevpostIcon />
                                <span>Devpost</span>
                              </>
                            ) : (
                              <>
                                {link.label}
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </a>
                        </Button>
                      ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {primaryRepoLink && (
              <a
                href={primaryRepoLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all text-xs tracking-wider uppercase font-semibold text-center text-white flex items-center justify-center gap-2"
              >
                {primaryRepoLink.label === "Devpost" ? (
                  <>
                    <DevpostIcon />
                    <span>Devpost</span>
                  </>
                ) : primaryRepoLink.label === "Paper" ? (
                  <>
                    <FileText className="w-4 h-4 text-white" />
                    <span>Paper</span>
                  </>
                ) : (
                  <>
                    <Github className="w-4 h-4 text-white" />
                    <span>GitHub</span>
                  </>
                )}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  const [tab, setTab] = useState<ProjectTab>("school");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => p.category === tab);
  }, [tab]);

  return (
    <section id="projects" className="py-24 px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto max-w-7xl">
        {/* Title */}
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif font-light mb-6">
          Projects
        </h2>

        {/* Toggle Buttons */}
        <div className="flex items-center gap-2 mb-12">
          <button
            onClick={() => setTab("school")}
            className={`px-4 py-2 text-xs uppercase tracking-wider rounded-md border font-sans font-light transition
              ${tab === "school"
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-foreground border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5"
              }`}
          >
            College Projects
          </button>

          <button
            onClick={() => setTab("personal")}
            className={`px-4 py-2 text-xs uppercase tracking-wider rounded-md border font-sans font-light transition
              ${tab === "personal"
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-foreground border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5"
              }`}
          >
            Personal Projects
          </button>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
