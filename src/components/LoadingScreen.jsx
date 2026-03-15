import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const canvasRef = useRef(null);
  const hiddenSvgRef = useRef(null);
  const [svgPaths, setSvgPaths] = useState([]);
  const [isReady, setIsReady] = useState(false);

  // Terminal State
  const [terminalLines, setTerminalLines] = useState([]);
  const fullTerminalScript = [
    '> Initializing System...',
    '> Loading AI Modules...',
    '> Activating Neural Engine...',
    '> Welcome Sushant Kumar'
  ];

  // Fetch SVG
  useEffect(() => {
    document.body.style.overflow = 'hidden';

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

  useEffect(() => {
    if (svgPaths.length > 0 && canvasRef.current && hiddenSvgRef.current) {
      setIsReady(true);
    }
  }, [svgPaths]);

  // Terminal Typing Logic
  useEffect(() => {
    if (!isReady) return;

    let currentLine = 0;
    let currentChar = 0;
    let typingInterval;

    const typeLine = () => {
      if (currentLine >= fullTerminalScript.length) return;

      const fullText = fullTerminalScript[currentLine];

      typingInterval = setInterval(() => {
        setTerminalLines((prev) => {
          const newLines = [...prev];
          if (!newLines[currentLine]) {
            newLines[currentLine] = '';
          }
          newLines[currentLine] = fullText.substring(0, currentChar + 1);
          return newLines;
        });

        currentChar++;

        if (currentChar >= fullText.length) {
          clearInterval(typingInterval);
          currentLine++;
          currentChar = 0;
          setTimeout(typeLine, 400); // 400ms pause between lines
        }
      }, 30); // 30ms per character
    };

    setTimeout(typeLine, 500); // Start terminal after 500ms

    return () => clearInterval(typingInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  // Canvas Drawing Logic
  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimize for no transparency needed on base canvas

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

    const pathElements = Array.from(hiddenSvgRef.current.querySelectorAll('path'));
    const pathsData = pathElements.map((p, i) => ({
      element: p,
      length: p.getTotalLength(),
      path2d: new Path2D(svgPaths[i]),
    }));

    // SVG ViewBox is 1024x480. Scale and center it for Canvas
    const svgWidth = 1024;
    const svgHeight = 480;
    const scale = Math.min(width / svgWidth, height / svgHeight) * 0.8;
    const offsetX = (width - svgWidth * scale) / 2;
    // Shift slightly down to make room for the text above/below if needed, but centering is usually best
    const offsetY = (height - svgHeight * scale) / 2 - 180;

    const params = {
      drawProgress: 0,
      glowIntensity: 0,
    };

    const tl = gsap.timeline({
      onComplete: () => {
        // Wait 1.5s after drawing finishes before exiting
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1500);
      },
    });

    // Animate SVG Signature (0 -> 3s)
    tl.to(params, { drawProgress: 1, duration: 3.0, ease: 'power2.inOut' })
      .to(params, { glowIntensity: 1, duration: 1.0, ease: 'power1.inOut' }, "-=0.5");

    let animationFrameId;

    const render = () => {
      // Solid dark background
      ctx.fillStyle = '#0b0b0b';
      ctx.fillRect(0, 0, width, height);

      if (params.drawProgress > 0) {
        ctx.save();
        if (params.glowIntensity > 0) {
          ctx.shadowColor = '#00ff7f';
          ctx.shadowBlur = params.glowIntensity * 20;
        }
        ctx.strokeStyle = '#00ff7f';
        ctx.lineWidth = 2.0;
        ctx.lineCap = 'round';
        ctx.translate(offsetX, offsetY);
        ctx.scale(scale, scale);

        pathsData.forEach((p) => {
          ctx.setLineDash([p.length]);
          ctx.lineDashOffset = p.length * (1 - params.drawProgress);
          ctx.stroke(p.path2d);
        });
        ctx.restore();
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

  // Movie Trailer name tracking
  const nameText = "SUSHANT KUMAR";
  const nameLetters = nameText.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.0, // Start after 1s
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, filter: 'blur(10px)', scale: 1.5 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0b0b0b] flex items-center justify-center overflow-hidden">
      {/* 1. Canvas for Signature SVG */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* 2. Bold, Tilted Name Component */}
      <div
        className="absolute w-full flex justify-center pointer-events-none select-none"
        style={{ top: '50%' }} // Position below the centered signature
      >
        <motion.div
          className="flex space-x-2 md:space-x-4 uppercase font-black tracking-[0.3em] md:tracking-[0.5em] text-[#00ff7f]"
          style={{
            fontFamily: 'var(--font-family-heading)',
            fontSize: 'clamp(1.5rem, 5vw, 4rem)',
            transformOrigin: 'center center',
            transform: 'rotate(-22deg) translateY(50px)', // Exactly 30 deg east-north tilt as requested
          }}
          initial="hidden"
          animate={isReady ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {nameLetters.map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              style={{
                textShadow: '0 0 20px rgba(0,255,127,0.6)',
                display: 'inline-block'
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* 3. Terminal Boot Sequence */}
      <div className="absolute bottom-8 right-8 text-[#00ff7f] font-mono text-xs md:text-sm tracking-widest pointer-events-none">
        {terminalLines.map((line, idx) => (
          <div key={idx} className="mb-1" style={{ textShadow: '0 0 8px rgba(47, 235, 238, 0.95)' }}>
            {line}
            {/* Blinking cursor on the active line */}
            {idx === terminalLines.length - 1 && terminalLines.length <= fullTerminalScript.length && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              >
                _
              </motion.span>
            )}
          </div>
        ))}
      </div>

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
