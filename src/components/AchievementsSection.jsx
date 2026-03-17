import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence, useMotionTemplate } from 'framer-motion';

function HoverBorderCard({ children, style, contentStyle, motionProps, className, onClick }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      {...motionProps}
      className={`hover-glow-card ${className || ''}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      style={{
        ...style,
        position: 'relative',
        borderRadius: style?.borderRadius || '20px'
      }}
    >
      <motion.div
        className="hover-glow-border"
        style={{
          background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(var(--neon-rgb), 1) 0%, rgba(var(--neon-rgb), 0.6) 30%, transparent 80%)`,
        }}
      />
      <div className="hover-glow-content" style={contentStyle}>
        {children}
      </div>
    </motion.div>
  );
}
import { achievements } from '../data/portfolioData';

/* ─────────────────────────────────────────
   AnimatedCounter — counts from 0 → target
   when the element scrolls into view
───────────────────────────────────────── */
function AnimatedCounter({ value, suffix = '', inView }) {
  const num = parseInt(value, 10) || 0;
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 28, mass: 1.2 });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (inView) {
      motionVal.set(num);
    } else {
      motionVal.set(0);
    }
  }, [inView, num, motionVal]);

  useEffect(() => {
    const unsub = spring.on('change', (v) => {
      setDisplay(Math.round(v).toLocaleString());
    });
    return unsub;
  }, [spring]);

  return (
    <span>
      {display}
      {suffix && <span style={{ fontSize: '0.5em', verticalAlign: 'super', marginLeft: 2 }}>{suffix}</span>}
    </span>
  );
}

/* ─────────────────────────────────────────
   AchievementRow — single alternating row
───────────────────────────────────────── */
function AchievementRow({ item, index }) {
  const rowRef = useRef(null);
  const isInView = useInView(rowRef, { once: false, margin: '-80px' });
  const isLeft = index % 2 === 0; // content left, image right on even indices
  const [imgHovered, setImgHovered] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);

  /* Slide direction based on alternation */
  const contentFrom = isLeft ? -60 : 60;
  const imageFrom = isLeft ? 60 : -60;

  return (
    <div
      ref={rowRef}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40,
        alignItems: 'center',
        marginBottom: index < achievements.length - 1 ? 64 : 0,
      }}
      className="achievements-row"
    >
      {/* ── Content Column ── */}
      <motion.div
        initial={{ opacity: 0, x: contentFrom, y: 30 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: contentFrom, y: 30 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        style={{ order: isLeft ? 1 : 2 }}
      >
        <HoverBorderCard
          motionProps={{
            onMouseEnter: () => setCardHovered(true),
            onMouseLeave: () => setCardHovered(false),
            animate: { y: cardHovered ? -4 : 0 },
            transition: { duration: 0.3 }
          }}
          style={{
            borderRadius: 20,
            boxShadow: cardHovered
              ? '0 8px 40px rgba(var(--neon-rgb), 0.12), 0 4px 20px rgba(0,0,0,0.3)'
              : '0 4px 24px rgba(0,0,0,0.25)',
          }}
          contentStyle={{
            background: 'rgb(12, 16, 28)', // Opaque to prevent glow bleed
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 20,
            padding: '36px 32px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative corner glow */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(var(--neon-rgb), 0.06) 0%, transparent 70%)',
              transform: 'translate(40%, -40%)',
              pointerEvents: 'none',
            }}
          />

          {/* Animated Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              style={{
                fontFamily: "'Caveat', 'Permanent Marker', cursive",
                fontSize: 72,
                fontWeight: 800,
                lineHeight: 1,
                marginBottom: 4,
                background: 'linear-gradient(135deg, var(--color-neon), #7b2ff7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: cardHovered ? 'brightness(1.2)' : 'brightness(1)',
                transition: 'filter 0.3s',
              }}
            >
              <AnimatedCounter value={item.stat} suffix={item.statSuffix} inView={isInView} />
            </div>
            <p
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.3)',
                marginBottom: 20,
              }}
            >
              {item.statLabel}
            </p>
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 20,
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.3,
              marginBottom: 8,
            }}
          >
            {item.title}
          </motion.h3>

          {/* Year badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: 0.32 }}
            style={{
              display: 'inline-block',
              fontFamily: 'Outfit, sans-serif',
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--color-neon)',
              background: 'rgba(var(--neon-rgb), 0.1)',
              border: '1px solid rgba(var(--neon-rgb), 0.2)',
              borderRadius: 20,
              padding: '4px 14px',
              marginBottom: 16,
              letterSpacing: '0.06em',
            }}
          >
            {item.year}
          </motion.span>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 14,
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.7,
            }}
          >
            {item.description}
          </motion.p>
        </HoverBorderCard>
      </motion.div>

      {/* ── Image Column ── */}
      <motion.div
        initial={{ opacity: 0, x: imageFrom, scale: 0.88, rotateY: isLeft ? 8 : -8 }}
        animate={
          isInView
            ? { opacity: 1, x: 0, scale: 1, rotateY: 0 }
            : { opacity: 0, x: imageFrom, scale: 0.88, rotateY: isLeft ? 8 : -8 }
        }
        transition={{ duration: 0.82, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        style={{ order: isLeft ? 2 : 1, perspective: 800 }}
      >
        <motion.div
          onMouseEnter={() => setImgHovered(true)}
          onMouseLeave={() => setImgHovered(false)}
          animate={{
            scale: imgHovered ? 1.03 : 1,
            rotateY: imgHovered ? (isLeft ? -3 : 3) : 0,
            boxShadow: imgHovered
              ? '0 12px 48px rgba(var(--neon-rgb), 0.18), 0 0 0 1px rgba(var(--neon-rgb), 0.3)'
              : '0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.07)',
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderRadius: 20,
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          {/* Image */}
          <motion.img
            src={item.image}
            alt={item.title}
            loading="lazy"
            animate={{
              scale: imgHovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: '100%',
              height: 320,
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(
                ${isLeft ? '135deg' : '225deg'},
                rgba(var(--neon-rgb), 0.12) 0%,
                rgba(123,47,247,0.08) 40%,
                rgba(0,0,0,0.5) 100%
              )`,
              pointerEvents: 'none',
            }}
          />

          {/* Bottom glow line on hover */}
          <motion.div
            animate={{ width: imgHovered ? '70%' : '0%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              height: 2,
              borderRadius: 2,
              background: 'linear-gradient(90deg, transparent, var(--color-neon), #7b2ff7, transparent)',
              pointerEvents: 'none',
            }}
          />

          {/* Index badge on image */}
          <motion.div
            animate={{
              background: imgHovered
                ? 'rgba(0,212,255,0.18)'
                : 'rgba(8,12,24,0.72)',
              borderColor: imgHovered
                ? 'rgba(0,212,255,0.4)'
                : 'rgba(255,255,255,0.1)',
            }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 40,
              height: 40,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(12px)',
              border: '1px solid',
              fontFamily: 'Outfit, sans-serif',
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--color-neon)',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN ACHIEVEMENTS SECTION
═══════════════════════════════════════════ */
export default function AchievementsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section id="achievements" className="section-padding relative overflow-hidden">
      {/* ── Background decorations ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[10%] right-[-8%] w-[40vw] h-[40vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(var(--neon-rgb), 0.035) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[10%] left-[-10%] w-[35vw] h-[35vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(123,47,247,0.04) 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(var(--neon-rgb), 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--neon-rgb), 0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto w-full px-6 relative z-10">
        {/* ══════ HEADER ══════ */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="h-px w-7" style={{ background: 'linear-gradient(90deg, transparent, var(--color-neon))', display: 'block' }} />
            <span
              className="text-[11px] font-['Outfit'] font-semibold tracking-[0.22em] uppercase"
              style={{ color: 'var(--color-neon)' }}
            >
              Milestones
            </span>
            <span className="h-px w-7" style={{ background: 'linear-gradient(90deg, var(--color-neon), transparent)', display: 'block' }} />
          </motion.div>

          <h2 className="section-title gradient-text mb-3">Achievements</h2>

          <p className="font-['Outfit'] text-sm text-white/40 max-w-md mx-auto leading-relaxed">
            Key milestones and accomplishments from my academic, technical, and leadership journey.
          </p>
        </motion.div>

        {/* ══════ ACHIEVEMENT ROWS ══════ */}
        {achievements.map((item, index) => (
          <AchievementRow key={index} item={item} index={index} />
        ))}
      </div>

      {/* Inline responsive styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');

        /* Hover Glow Card Components */
        .hover-glow-card {
          position: relative;
        }
        .hover-glow-border {
          position: absolute;
          inset: -1.5px; 
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        .hover-glow-card:hover .hover-glow-border {
          opacity: 1;
        }
        .hover-glow-content {
          position: relative;
          z-index: 1;
          height: 100%;
          border-radius: inherit;
        }

        @media (max-width: 768px) {
          .achievements-row {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            margin-bottom: 40px !important;
          }
          .achievements-row > * {
            order: unset !important;
          }
        }
      `}</style>
    </section>
  );
}
