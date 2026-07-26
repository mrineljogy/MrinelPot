import { useState, type CSSProperties } from "react";

const AboutPortraitReveal = () => {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, visible: false });

  const moveSpotlight = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
      visible: true,
    });
  };

  const revealStyle = {
    "--spotlight-x": `${spotlight.x}%`,
    "--spotlight-y": `${spotlight.y}%`,
    opacity: spotlight.visible ? 1 : 0,
  } as CSSProperties;

  return (
    <div
      className="about-portrait-reveal"
      onPointerEnter={moveSpotlight}
      onPointerMove={moveSpotlight}
      onPointerLeave={() => setSpotlight((current) => ({ ...current, visible: false }))}
    >
      <img src="/about-main.jpeg" alt="Mrinel Jogy" className="about-portrait-image" loading="eager" />
      <img src="/about-reveal-new.jpeg" alt="" aria-hidden="true" className="about-portrait-overlay" style={revealStyle} />
      <span className="about-portrait-hint">Hover to reveal</span>
    </div>
  );
};

export default AboutPortraitReveal;

