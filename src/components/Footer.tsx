import { navigation } from "@/content/navigation";

export const Footer = () => {
  return (
    <footer className="py-16 px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex gap-8">
            {navigation.slice(1, 4).map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-light"
              >
                {item.name}
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground font-light">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};
