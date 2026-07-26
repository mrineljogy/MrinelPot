import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/content/navigation";
import { hero } from "@/content/hero";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "dark"
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = navigation.map(nav => nav.href.replace("#", ""));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-6 sm:px-8 lg:px-12" aria-label="Main navigation">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Minimal */}
            <a
              href="#home"
              className="text-base font-sans font-medium hover:opacity-70 transition-opacity"
            >
              {hero.firstName}
            </a>

            {/* Desktop Navigation - Simple links */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.href.replace("#", "")
                      ? "text-foreground"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Theme Toggle Switch */}
              <div className="theme-toggle ml-2 select-none">
                <div className="theme-toggle-shell">
                  <input
                    type="checkbox"
                    id="theme-toggle-desktop"
                    className="theme-toggle-input"
                    checked={theme === "light"}
                    onChange={toggleTheme}
                  />
                  <label htmlFor="theme-toggle-desktop" className="theme-toggle-label"><span className="theme-toggle-slider" /></label>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              {/* Theme Toggle Switch */}
              <div className="theme-toggle mr-1 select-none">
                <div className="theme-toggle-shell">
                  <input
                    type="checkbox"
                    id="theme-toggle-mobile"
                    className="theme-toggle-input"
                    checked={theme === "light"}
                    onChange={toggleTheme}
                  />
                  <label htmlFor="theme-toggle-mobile" className="theme-toggle-label"><span className="theme-toggle-slider" /></label>
                </div>
              </div>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-light transition-all ${
                      activeSection === item.href.replace("#", "")
                        ? "bg-card text-foreground"
                        : "text-foreground/70 hover:text-foreground hover:bg-card/50"
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};
