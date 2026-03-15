import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-dark flex flex-col items-center justify-center">
      {/* Neon circular loader */}
      <div className="relative w-32 h-32 mb-8">
        <svg className="w-full h-full animate-spin" style={{ animationDuration: '3s' }} viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke="rgba(0,212,255,0.1)"
            strokeWidth="4"
          />
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke="url(#neonGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${progress * 2.64} 264`}
            style={{ transition: 'stroke-dasharray 0.1s ease' }}
          />
          <defs>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#7b2ff7" />
            </linearGradient>
          </defs>
        </svg>
        {/* Percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold neon-text">{progress}%</span>
        </div>
      </div>

      {/* Scanning text */}
      <div className="text-center">
        <p className="text-sm text-text-secondary tracking-[0.3em] uppercase mb-2" style={{
          animation: 'typing-cursor 1s ease-in-out infinite',
        }}>
          Initializing Portfolio
        </p>
        <div className="w-48 h-0.5 bg-dark-lighter rounded overflow-hidden mx-auto">
          <div
            className="h-full rounded transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00d4ff, #7b2ff7)',
            }}
          />
        </div>
      </div>

      {/* Scan line effect */}
      <div
        className="absolute left-0 w-full h-[2px] opacity-20 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
          animation: 'scan-line 2s linear infinite',
          top: 0,
        }}
      />
    </div>
  );
}
