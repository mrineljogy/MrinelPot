import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { contact } from "@/content/contact";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ButtonGlow } from "@/components/ButtonGlow";

export const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-light mb-12">
          Contact
        </h2>

        <div className="space-y-6 max-w-2xl">
          <div className="flex items-center gap-4">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <a href={`mailto:${contact.email}`} className="text-base hover:text-primary transition-colors font-light">
              {contact.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <span className="text-base font-light">{contact.phone}</span>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <span className="text-base font-light">{contact.location}</span>
          </div>
          <div className="flex gap-4 pt-4">
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-tilt-btn"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-tilt-btn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button className="uiverse-button mt-3" type="button"><ButtonGlow>Click me</ButtonGlow></button>
            </DialogTrigger>
            <DialogContent className="max-w-md border-violet-300/25 bg-background/90 p-7 backdrop-blur-xl">
              <DialogHeader>
                <p className="text-xs uppercase tracking-[0.22em] text-violet-400">Something Different</p>
                <DialogTitle className="pt-2 text-3xl font-light">My Other Side</DialogTitle>
              </DialogHeader>
              <p className="text-sm leading-relaxed text-muted-foreground">
                This is my second creative portfolio, which shows my transition from clean developer style to something more creative, unique and captivating. Follow the link to see my other side.
              </p>
              <a className="uiverse-button mt-2 self-start" href="https://mrineljogy.github.io/MRINEL-SAYS-HI/" target="_blank" rel="noopener noreferrer">
                <ButtonGlow>Visit creative portfolio</ButtonGlow>
              </a>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};
