import { useEffect, useState } from "react";
import LiquidEther from "@/components/LiquidEther";

interface SiteBackgroundProps {
  active?: boolean;
}

export const SiteBackground = ({ active = true }: SiteBackgroundProps) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (active) {
      // Delay mounting slightly (150ms) to allow the preloader exit animation to complete smoothly
      const timer = setTimeout(() => setShouldRender(true), 150);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(false);
    }
  }, [active]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background animate-fade-in">
      <LiquidEther
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        isViscous={true}
        viscous={30}
        mouseForce={45}
        cursorSize={70}
        resolution={0.5} // Resolution at 0.5 scales beautifully and renders smoothly at 60 FPS
        autoDemo
        autoSpeed={1.2}
        autoIntensity={3.2}
      />
    </div>
  );
};

export default SiteBackground;
