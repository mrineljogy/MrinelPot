import { useEffect, useRef, type CSSProperties } from "react";

interface DigitalRainProps {
  glyphSize?: number;
  trail?: number;
  style?: CSSProperties;
}

interface Stream {
  y: number;
  rate: number;
  chars: string[];
}

const glyphs = "ｱｲｳｴｵｶｷｸ0123456789ABCDEFｸｿﾝ";

/** A lightweight canvas backdrop for the portfolio entry screen. */
const DigitalRain = ({ glyphSize = 10, trail = 18, style }: DigitalRainProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!container || !canvas || !context) return;

    const ctx = context;
    const characters = Array.from(glyphs);
    const pickCharacter = () => characters[Math.floor(Math.random() * characters.length)];
    const spacing = glyphSize * 2.4;
    let animationFrame = 0;
    let previousTime = 0;
    let streams: Stream[] = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const columns = Math.ceil(width / spacing);
      streams = Array.from({ length: columns }, () => ({
        y: Math.random() * height - height,
        rate: 78 + Math.random() * 82,
        chars: Array.from({ length: trail }, pickCharacter),
      }));
    };

    const render = (time: number) => {
      const elapsed = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 1 / 60;
      previousTime = time;
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${glyphSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      streams.forEach((stream, column) => {
        stream.y += stream.rate * elapsed;
        if (Math.random() < 0.12) stream.chars[Math.floor(Math.random() * trail)] = pickCharacter();
        if (stream.y - trail * glyphSize > height) {
          stream.y = -Math.random() * height * 0.45;
          stream.rate = 78 + Math.random() * 82;
        }

        stream.chars.forEach((character, index) => {
          const opacity = index === 0 ? 0.9 : 0.38 * (1 - index / trail);
          ctx.globalAlpha = opacity;
          ctx.fillStyle = index === 0 ? "#f5eaff" : "#c084fc";
          ctx.fillText(character, column * spacing + spacing / 2, stream.y - index * glyphSize);
        });
      });

      ctx.globalAlpha = 1;
      animationFrame = requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [glyphSize, trail]);

  return (
    <div ref={containerRef} aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", ...style }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
};

export default DigitalRain;
