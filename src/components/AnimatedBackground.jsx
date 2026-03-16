import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // alpha: false if we handle our own bg, but alpha: true allows the CSS bg to show through
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let targetX = width / 2;
    let targetY = height / 2;
    let currentX = targetX;
    let currentY = targetY;

    // Spacing for the rhombus grid
    const S = 70;
    let gridPath = new Path2D();

    const buildGrid = () => {
      gridPath = new Path2D();
      // Draw \ diagonal lines
      let C = -height;
      while (C < width) {
        gridPath.moveTo(C, 0);
        gridPath.lineTo(C + height, height);
        C += S;
      }
      // Draw / diagonal lines
      let K = 0;
      while (K < width + height) {
        gridPath.moveTo(K, 0);
        gridPath.lineTo(K - height, height);
        K += S;
      }
    };

    buildGrid();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      buildGrid();
    };

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;

    const render = () => {
      // Smooth interpolation for cursor
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw base faint grid
      // ctx.lineWidth = 1;
      // ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      // ctx.stroke(gridPath);

      // 2. Draw glowing proximity grid using radial gradient mask
      const glowRadius = 200; // Radius of the interaction glow
      const gradient = ctx.createRadialGradient(
        currentX, currentY, 0,
        currentX, currentY, glowRadius
      );

      // Neon colors specified: Neon Blue, Neon Pink, Neon Violet
      gradient.addColorStop(0, 'rgba(0, 229, 255, 0.9)');    // #00E5FF
      gradient.addColorStop(0.4, 'rgba(255, 45, 149, 0.5)'); // #FF2D95
      gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');     // #8A2BE2 faded to transparent

      // Additive blending for true neon light effect
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = gradient;
      // Slightly thicker line for the glow
      ctx.lineWidth = 1.5;

      // Optional: Add a subtle shadow blur to intensify the "Spline-like" neon feel
      ctx.shadowColor = 'rgba(0, 229, 255, 0.4)';
      ctx.shadowBlur = 8;

      ctx.stroke(gridPath);

      // Reset composite operation and shadow for the next frame
      ctx.globalCompositeOperation = 'source-over';
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    // Start rendering
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0a] pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
