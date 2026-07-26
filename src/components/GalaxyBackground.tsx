import { useMemo } from 'react';

export const SquaresBackground = () => {
  // Generate many star positions for a realistic starfield effect
  const generateStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      // Vary star sizes - most small, some medium, few large
      const rand = Math.random();
      let size = 2;
      if (rand > 0.95) size = 8; // Bright stars
      else if (rand > 0.85) size = 5; // Medium stars
      else if (rand > 0.7) size = 3.5; // Small-medium stars
      else size = 2; // Small stars
      
      // Vary opacity for depth
      const opacity = Math.random() * 0.9 + 0.3;
      
      // Some stars are white, some slightly yellow
      const isYellow = Math.random() > 0.8;
      const color = isYellow ? `rgba(255, 255, 200, ${opacity})` : `rgba(255, 255, 255, ${opacity})`;
      
      stars.push(`radial-gradient(${size}px ${size}px at ${x}% ${y}%, ${color}, transparent)`);
    }
    return stars.join(',\n            ');
  };

  // Memoize star patterns - reduced count for better performance
  const starsLayer1 = useMemo(() => generateStars(80), []);
  const starsLayer2 = useMemo(() => generateStars(60), []);
  const starsLayer3 = useMemo(() => generateStars(40), []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Pure black/dark background - no colored gradients */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'hsl(var(--background))',
        }} 
      />
      
      {/* Main starfield layer - dense stars with slow movement */}
      <div 
        className="absolute inset-0 opacity-100 dark:opacity-100"
        style={{
          backgroundImage: starsLayer1,
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 0%',
          animation: 'galaxyMove1 120s linear infinite',
          maskImage: 'radial-gradient(ellipse 100% 70% at 50% 50%, black 50%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 70% at 50% 50%, black 50%, transparent 100%)',
          willChange: 'background-position',
        }} 
      />
      
      {/* Secondary star layer for depth - different speed */}
      <div 
        className="absolute inset-0 opacity-100 dark:opacity-100"
        style={{
          backgroundImage: starsLayer2,
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 0%',
          animation: 'galaxyMove2 100s linear infinite',
          maskImage: 'radial-gradient(ellipse 100% 70% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 70% at 50% 50%, black 40%, transparent 100%)',
          willChange: 'background-position',
        }} 
      />
      
      {/* Twinkling stars layer - subtle animation */}
      <div 
        className="absolute inset-0 opacity-100 dark:opacity-100"
        style={{
          backgroundImage: starsLayer3,
          backgroundSize: '150% 150%',
          backgroundPosition: '0% 0%',
          animation: 'starTwinkle 50s ease-in-out infinite alternate',
          maskImage: 'radial-gradient(ellipse 100% 70% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 70% at 50% 50%, black 30%, transparent 100%)',
        }} 
      />
      
      <style>{`
        @keyframes galaxyMove1 {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }
        
        @keyframes galaxyMove2 {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes starTwinkle {
          0% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

