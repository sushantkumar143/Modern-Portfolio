import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const canvasRef = useRef(null);
  const hiddenSvgRef = useRef(null);
  const [svgPaths, setSvgPaths] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = 'hidden';

    // Fetch the signature SVG to extract paths
    fetch('/models/file.svg')
      .then((res) => res.text())
      .then((text) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'image/svg+xml');
        const paths = Array.from(doc.querySelectorAll('path')).map((p) => p.getAttribute('d'));
        setSvgPaths(paths);
      })
      .catch(console.error);

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Wait until SVG paths are rendered invisibly in DOM to calculate their lengths
  useEffect(() => {
    if (svgPaths.length > 0 && canvasRef.current && hiddenSvgRef.current) {
      setIsReady(true);
    }
  }, [svgPaths]);

  // Main Animation Engine
  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    const numParticles = 800;
    const pathElements = Array.from(hiddenSvgRef.current.querySelectorAll('path'));
    const pathsData = pathElements.map((p, i) => ({
      element: p,
      d: svgPaths[i],
      length: p.getTotalLength(),
      path2d: new Path2D(svgPaths[i]),
    }));

    // SVG ViewBox is 1024x480. Scale and center it for Canvas
    const svgWidth = 1024;
    const svgHeight = 480;
    const scale = Math.min(width / svgWidth, height / svgHeight) * 0.8;
    const offsetX = (width - svgWidth * scale) / 2;
    const offsetY = (height - svgHeight * scale) / 2;

    // Use an offscreen canvas to render text and extract text pixels
    const tCanvas = document.createElement('canvas');
    tCanvas.width = width;
    tCanvas.height = height;
    const tCtx = tCanvas.getContext('2d', { willReadFrequently: true });
    tCtx.fillStyle = '#000';
    tCtx.fillRect(0, 0, width, height);
    tCtx.fillStyle = '#fff';
    tCtx.font = `bold ${Math.min(width * 0.1, 120)}px Outfit, sans-serif`;
    tCtx.textAlign = 'center';
    tCtx.textBaseline = 'middle';
    tCtx.fillText('Sushant Kumar', width / 2, height / 2);

    const imgData = tCtx.getImageData(0, 0, width, height).data;
    const validTextPoints = [];
    const samplingDelta = 4;
    for (let y = 0; y < height; y += samplingDelta) {
      for (let x = 0; x < width; x += samplingDelta) {
        if (imgData[(y * width + x) * 4] > 128) {
          validTextPoints.push({ x, y });
        }
      }
    }

    let particles = [];
    const totalLength = pathsData.reduce((sum, p) => sum + p.length, 0);

    // Initialize Particles with targets for all phases
    for (let i = 0; i < numParticles; i++) {
      // 1. Origin point (picked uniformly along the total length of the SVG signature)
      let originX = width / 2;
      let originY = height / 2;
      const randomLen = Math.random() * totalLength;
      let acc = 0;
      for (const p of pathsData) {
        if (randomLen <= acc + p.length) {
          const pt = p.element.getPointAtLength(randomLen - acc);
          originX = offsetX + pt.x * scale;
          originY = offsetY + pt.y * scale;
          break;
        }
        acc += p.length;
      }

      // 2. Neural point (random inside a sphere)
      const angle1 = Math.random() * Math.PI * 2;
      const angle2 = Math.acos(2 * Math.random() - 1);
      const r = Math.random() * (Math.min(width, height) * 0.4);
      const neuralX = width / 2 + r * Math.sin(angle2) * Math.cos(angle1);
      const neuralY = height / 2 + r * Math.sin(angle2) * Math.sin(angle1);

      // 3. Text point (randomly assigned from text pixels)
      let textPt = { x: width / 2, y: height / 2 };
      if (validTextPoints.length > 0) {
        textPt = validTextPoints[Math.floor(Math.random() * validTextPoints.length)];
      }

      particles.push({
        x: originX,
        y: originY,
        vx: (Math.random() - 0.5) * 40,
        vy: (Math.random() - 0.5) * 40,
        radius: Math.random() * 1.5 + 0.5,
        color: '#00ff7f',
        neuralX: neuralX,
        neuralY: neuralY,
        textX: textPt.x + (Math.random() - 0.5) * 6,
        textY: textPt.y + (Math.random() - 0.5) * 6,
        explosionEndX: 0,
        explosionEndY: 0,
        neuralEndX: 0,
        neuralEndY: 0,
        renderX: originX,
        renderY: originY,
      });
    }

    // GSAP Parameters to control the unified render loop
    const params = {
      drawProgress: 0,
      glowIntensity: 0,
      explosionProgress: 0,
      neuralProgress: 0,
      textProgress: 0,
      globalAlpha: 1,
    };

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Sequence definitions
    tl.to(params, { drawProgress: 1, duration: 3.0, ease: 'power2.inOut' })
      .to(params, { glowIntensity: 1, duration: 0.8, ease: 'power1.inOut' })
      .to(params, { explosionProgress: 1, duration: 1.5, ease: 'power3.out' })
      .call(() => {
        // Freeze exploded positions to act as starting points for Neural Networking finding
        particles.forEach((p) => {
          p.explosionEndX = p.renderX;
          p.explosionEndY = p.renderY;
        });
      })
      .to(params, { neuralProgress: 1, duration: 2.0, ease: 'power2.inOut' })
      .call(() => {
        // Freeze sorted out Neural positions to interpolate towards the text outline
        particles.forEach((p) => {
          p.neuralEndX = p.renderX;
          p.neuralEndY = p.renderY;
        });
      })
      .to(params, { textProgress: 1, duration: 2.0, ease: 'power2.inOut' })
      .to({}, { duration: 1.0 }) // Hold text
      .to(params, { globalAlpha: 0, duration: 1.0, ease: 'power2.inOut' });

    let animationFrameId;

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = params.globalAlpha;

      if (params.drawProgress > 0 && params.explosionProgress === 0) {
        ctx.save();
        if (params.glowIntensity > 0) {
          ctx.shadowColor = '#00ff7f';
          ctx.shadowBlur = params.glowIntensity * 25;
        }
        ctx.strokeStyle = '#00ff7f';
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.translate(offsetX, offsetY);
        ctx.scale(scale, scale);

        pathsData.forEach((p) => {
          ctx.setLineDash([p.length]);
          ctx.lineDashOffset = p.length * (1 - params.drawProgress);
          ctx.stroke(p.path2d);
        });
        ctx.restore();
      } else if (params.explosionProgress > 0) {
        if (params.neuralProgress === 0) {
          // Explosion Phase
          particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.94; // Friction
            p.vy *= 0.94;
            p.renderX = p.x;
            p.renderY = p.y;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.renderX, p.renderY, p.radius, 0, Math.PI * 2);
            ctx.fill();
          });
        } else if (params.neuralProgress > 0 && params.textProgress === 0) {
          // Neural Phase
          const nP = easeInOutCubic(params.neuralProgress);
          particles.forEach((p) => {
            p.renderX = p.explosionEndX + (p.neuralX - p.explosionEndX) * nP;
            p.renderY = p.explosionEndY + (p.neuralY - p.explosionEndY) * nP;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.renderX, p.renderY, p.radius * 1.5, 0, Math.PI * 2);
            ctx.fill();
          });

          ctx.strokeStyle = `rgba(0, 255, 127, ${0.12 * params.neuralProgress})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          const connectDist = width * 0.06;
          for (let i = 0; i < particles.length; i += 3) {
            for (let j = i + 1; j < particles.length; j += 4) {
              const dx = particles[i].renderX - particles[j].renderX;
              const dy = particles[i].renderY - particles[j].renderY;
              if (dx * dx + dy * dy < connectDist * connectDist) {
                ctx.moveTo(particles[i].renderX, particles[i].renderY);
                ctx.lineTo(particles[j].renderX, particles[j].renderY);
              }
            }
          }
          ctx.stroke();
        } else if (params.textProgress > 0) {
          // Text Phase
          const tP = easeInOutCubic(params.textProgress);
          particles.forEach((p) => {
            p.renderX = p.neuralEndX + (p.textX - p.neuralEndX) * tP;
            p.renderY = p.neuralEndY + (p.textY - p.neuralEndY) * tP;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.renderX, p.renderY, p.radius, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      tl.kill();
    };
  }, [isReady, onComplete, svgPaths]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#0b0b0b] flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      {/* Hidden SVG used strictly to extract path topology mathematically */}
      <svg
        ref={hiddenSvgRef}
        width="1024"
        height="480"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      >
        {svgPaths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
    </div>
  );
}
