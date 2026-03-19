import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import { semesters, studentInfo, gradeColors, gradePoints, insights } from '../data/academicData';

/* ─── Animated Counter ─── */
function Counter({ value, decimals = 0, suffix = '', inView }) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 25, mass: 1 });
  const [display, setDisplay] = useState('0');

  useEffect(() => { mv.set(inView ? value : 0); }, [inView, value, mv]);
  useEffect(() => {
    const unsub = spring.on('change', v => setDisplay(v.toFixed(decimals)));
    return unsub;
  }, [spring, decimals]);

  return <span>{display}{suffix}</span>;
}

/* ─── SVG Line Chart ─── */
function TGPAChart({ animate, width = 420, height = 220 }) {
  const pad = { top: 30, right: 30, bottom: 40, left: 50 };
  const w = width - pad.left - pad.right;
  const h = height - pad.top - pad.bottom;

  const tgpas = semesters.map(s => s.tgpa);
  const minY = Math.floor(Math.min(...tgpas) * 10) / 10 - 0.3;
  const maxY = Math.ceil(Math.max(...tgpas) * 10) / 10 + 0.2;

  const x = (i) => pad.left + (i / (tgpas.length - 1)) * w;
  const y = (v) => pad.top + (1 - (v - minY) / (maxY - minY)) * h;

  // Build Bezier curve
  const pts = tgpas.map((v, i) => [x(i), y(v)]);
  let path = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const cx1 = pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * 0.4;
    const cx2 = pts[i][0] - (pts[i][0] - pts[i - 1][0]) * 0.4;
    path += ` C ${cx1} ${pts[i - 1][1]}, ${cx2} ${pts[i][1]}, ${pts[i][0]} ${pts[i][1]}`;
  }

  // Area fill
  const areaPath = path + ` L ${pts[pts.length - 1][0]} ${pad.top + h} L ${pts[0][0]} ${pad.top + h} Z`;

  // Y-axis ticks
  const yTicks = [];
  for (let v = Math.ceil(minY * 2) / 2; v <= maxY; v += 0.5) {
    yTicks.push(v);
  }

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-neon)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--color-neon)" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Grid lines */}
      {yTicks.map((v, i) => (
        <g key={i}>
          <line x1={pad.left} y1={y(v)} x2={pad.left + w} y2={y(v)}
            stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
          <text x={pad.left - 10} y={y(v) + 4} textAnchor="end"
            fill="rgba(255,255,255,0.3)" fontSize="11" fontFamily="'Outfit',sans-serif">
            {v.toFixed(1)}
          </text>
        </g>
      ))}

      {/* X-axis labels */}
      {semesters.map((s, i) => (
        <text key={i} x={x(i)} y={pad.top + h + 24} textAnchor="middle"
          fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="'Outfit',sans-serif">
          Sem {s.term}
        </text>
      ))}

      {/* Area fill */}
      <motion.path
        d={areaPath} fill="url(#chartFill)"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      />

      {/* Line */}
      <motion.path
        d={path} fill="none" stroke="var(--color-neon)" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {/* Data points */}
      {pts.map(([px, py], i) => (
        <motion.g key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={animate ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ delay: 0.5 + i * 0.18, duration: 0.4, type: 'spring' }}
          style={{ transformOrigin: `${px}px ${py}px` }}
        >
          <circle cx={px} cy={py} r="14" fill="var(--color-neon)" opacity="0.08" />
          <circle cx={px} cy={py} r="5" fill="var(--color-neon)" filter="url(#glow)" />
          <circle cx={px} cy={py} r="2.5" fill="#fff" />
          {/* Value label */}
          <rect x={px - 20} y={py - 28} width="40" height="18" rx="6"
            fill="rgba(10,10,15,0.85)" stroke="rgba(var(--neon-rgb),0.3)" strokeWidth="1" />
          <text x={px} y={py - 16} textAnchor="middle" fill="var(--color-neon)"
            fontSize="10" fontWeight="700" fontFamily="'Outfit',sans-serif">
            {tgpas[i]}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

/* ─── Bar Chart for Modal ─── */
function TGPABarChart({ width = 500, height = 200 }) {
  const pad = { top: 20, right: 20, bottom: 40, left: 50 };
  const w = width - pad.left - pad.right;
  const h = height - pad.top - pad.bottom;
  const tgpas = semesters.map(s => s.tgpa);
  const maxY = 10;
  const barW = w / tgpas.length * 0.5;
  const gap = w / tgpas.length;

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-neon)" />
          <stop offset="100%" stopColor="#7b2ff7" />
        </linearGradient>
      </defs>

      {/* Y-axis */}
      {[6, 7, 8, 9, 10].map((v, i) => (
        <g key={i}>
          <line x1={pad.left} y1={pad.top + (1 - v / maxY) * h} x2={pad.left + w} y2={pad.top + (1 - v / maxY) * h}
            stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <text x={pad.left - 8} y={pad.top + (1 - v / maxY) * h + 4} textAnchor="end"
            fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="'Outfit',sans-serif">{v}</text>
        </g>
      ))}

      {tgpas.map((v, i) => {
        const barH = (v / maxY) * h;
        const bx = pad.left + i * gap + (gap - barW) / 2;
        const by = pad.top + h - barH;
        return (
          <motion.g key={i}>
            <motion.rect x={bx} width={barW} rx={4}
              fill="url(#barGrad)" opacity={0.85}
              initial={{ y: pad.top + h, height: 0 }}
              animate={{ y: by, height: barH }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
            />
            <motion.text x={bx + barW / 2} textAnchor="middle"
              fill="#fff" fontSize="11" fontWeight="700" fontFamily="'Outfit',sans-serif"
              initial={{ y: pad.top + h, opacity: 0 }}
              animate={{ y: by - 6, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
            >{v}</motion.text>
            <text x={bx + barW / 2} y={pad.top + h + 18} textAnchor="middle"
              fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="'Outfit',sans-serif">
              Sem {semesters[i].term}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ─── Grade Badge ─── */
function GradeBadge({ grade }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 10px', borderRadius: 20,
      fontSize: 11, fontWeight: 700, fontFamily: "'Outfit',sans-serif",
      color: gradeColors[grade] || '#fff',
      background: `${gradeColors[grade] || '#888'}18`,
      border: `1px solid ${gradeColors[grade] || '#888'}40`,
    }}>
      {grade}
    </span>
  );
}

/* ─── Semester Detail Card (Modal) ─── */
function SemesterCard({ sem, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16, padding: '20px 24px', cursor: 'pointer',
        transition: 'border-color 0.3s, background 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(var(--neon-rgb),0.25)';
        e.currentTarget.style.background = 'rgba(var(--neon-rgb),0.04)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
      }}
      onClick={() => setOpen(!open)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: open ? 16 : 0 }}>
        <div>
          <span style={{ color: 'var(--color-neon)', fontWeight: 700, fontSize: 14, fontFamily: "'Outfit',sans-serif" }}>
            Semester {sem.term}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginLeft: 12 }}>
            {sem.courses.length} courses
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontSize: 22, fontWeight: 800, fontFamily: "'Outfit',sans-serif",
            background: 'linear-gradient(135deg, var(--color-neon), #7b2ff7)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {sem.tgpa}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }}
          >▾</motion.span>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr auto auto',
              gap: '8px 16px', fontSize: 12, fontFamily: "'Outfit',sans-serif",
            }}>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>Course</span>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 600, textAlign: 'center' }}>Credits</span>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 600, textAlign: 'center' }}>Grade</span>
              {sem.courses.map((c, i) => (
                <motion.div key={i} style={{ display: 'contents' }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>{c.name}</span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>{c.credits}</span>
                  <div style={{ textAlign: 'center' }}><GradeBadge grade={c.grade} /></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   FULLSCREEN ANALYTICS MODAL
   ════════════════════════════════════════════════════════ */
function AnalyticsModal({ onClose }) {
  const gradeDistribution = {};
  semesters.forEach(s => s.courses.forEach(c => {
    gradeDistribution[c.grade] = (gradeDistribution[c.grade] || 0) + 1;
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(5,5,10,0.85)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, overflowY: 'auto',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 960, maxHeight: '90vh', overflowY: 'auto',
          background: 'rgba(12,14,24,0.95)',
          border: '1px solid rgba(var(--neon-rgb),0.15)',
          borderRadius: 24, padding: '40px 36px',
          boxShadow: '0 0 80px rgba(var(--neon-rgb),0.08)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <h3 style={{
              fontFamily: "'Outfit',sans-serif", fontSize: 28, fontWeight: 800,
              background: 'linear-gradient(135deg, var(--color-neon), #7b2ff7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              marginBottom: 4,
            }}>
              Academic Analytics
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: "'Outfit',sans-serif" }}>
              {studentInfo.programme} · {studentInfo.university}
            </p>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12, width: 40, height: 40, cursor: 'pointer',
            color: '#fff', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(var(--neon-rgb),0.5)'; e.currentTarget.style.color = 'var(--color-neon)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
          >✕</button>
        </div>

        {/* Stat Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'CGPA', value: studentInfo.cgpa, dec: 2, color: 'var(--color-neon)' },
            { label: 'Best Semester', value: insights.bestSemester.tgpa, dec: 2, sub: `Sem ${insights.bestSemester.term}` },
            { label: 'Total Courses', value: insights.totalCourses, dec: 0 },
            { label: 'Total Credits', value: insights.totalCredits, dec: 0 },
          ].map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16, padding: '20px 18px', textAlign: 'center',
              }}
            >
              <div style={{
                fontSize: 32, fontWeight: 800, fontFamily: "'Outfit',sans-serif",
                color: s.color || '#fff', marginBottom: 4,
              }}>
                <Counter value={s.value} decimals={s.dec} inView={true} />
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: "'Outfit',sans-serif", textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {s.label}
              </div>
              {s.sub && <div style={{ fontSize: 10, color: 'var(--color-neon)', marginTop: 4 }}>{s.sub}</div>}
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
          {/* Line chart */}
          <div style={{
            background: 'rgba(255,255,255,0.02)', borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.06)', padding: '20px 16px',
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', fontFamily: "'Outfit',sans-serif", marginBottom: 12 }}>
              📈 TGPA Trend
            </div>
            <TGPAChart animate={true} width={400} height={200} />
          </div>

          {/* Bar chart */}
          <div style={{
            background: 'rgba(255,255,255,0.02)', borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.06)', padding: '20px 16px',
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', fontFamily: "'Outfit',sans-serif", marginBottom: 12 }}>
              📊 Semester Comparison
            </div>
            <TGPABarChart width={400} height={200} />
          </div>
        </div>

        {/* Grade Distribution */}
        <div style={{
          background: 'rgba(255,255,255,0.02)', borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.06)', padding: '20px 24px', marginBottom: 32,
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', fontFamily: "'Outfit',sans-serif", marginBottom: 16 }}>
            🧠 Grade Distribution
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {Object.entries(gradeDistribution).sort(([,a],[,b]) => b - a).map(([grade, count], i) => (
              <motion.div key={grade}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  background: `${gradeColors[grade]}12`, border: `1px solid ${gradeColors[grade]}30`,
                  borderRadius: 14, padding: '14px 20px', minWidth: 70,
                }}
              >
                <span style={{ fontSize: 24, fontWeight: 800, color: gradeColors[grade], fontFamily: "'Outfit',sans-serif" }}>{count}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: gradeColors[grade], opacity: 0.8 }}>{grade}</span>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>
                  {grade === 'O' ? 'Outstanding' : grade === 'A+' ? 'Excellent' : grade === 'A' ? 'Very Good' : grade === 'B+' ? 'Good' : grade === 'B' ? 'Above Avg' : grade}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Semester Breakdown */}
        <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', fontFamily: "'Outfit',sans-serif", marginBottom: 16 }}>
          🎯 Semester-wise Breakdown
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {semesters.map((s, i) => <SemesterCard key={i} sem={s} index={i} />)}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN ACADEMIC SECTION
   ════════════════════════════════════════════════════════ */
export default function AcademicSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const tgpas = semesters.map(s => s.tgpa);
  const trend = tgpas[tgpas.length - 1] - tgpas[tgpas.length - 2];

  return (
    <>
      <section
        id="academics"
        ref={ref}
        style={{ position: 'relative', padding: '80px 6%', overflow: 'hidden' }}
      >
        {/* Background decorations */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '10%', right: '-5%',
            width: '35vw', height: '35vw', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(var(--neon-rgb),0.04) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '10%', left: '-8%',
            width: '30vw', height: '30vw', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(123,47,247,0.04) 0%, transparent 70%)',
          }} />
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 12,
            }}>
              <span style={{ display: 'block', height: 1, width: 28, background: 'linear-gradient(90deg, transparent, var(--color-neon))' }} />
              <span style={{
                fontSize: 11, fontWeight: 600, fontFamily: "'Outfit',sans-serif",
                letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-neon)',
              }}>
                Academic Performance
              </span>
              <span style={{ display: 'block', height: 1, width: 28, background: 'linear-gradient(90deg, var(--color-neon), transparent)' }} />
            </div>
            <h2 style={{
              fontSize: '2.8rem', fontWeight: 800, fontFamily: "'Outfit',sans-serif",
              marginBottom: 8,
            }}>
              <span className="gradient-text">Semester Analytics</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontFamily: "'Outfit',sans-serif", maxWidth: 450, margin: '0 auto' }}>
              Hover to explore TGPA progression. Click to dive into detailed semester-wise analytics.
            </p>
          </motion.div>

          {/* ── Main Content: Card + Chart ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setModalOpen(true)}
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 32, cursor: 'pointer',
              background: hovered ? 'rgba(var(--neon-rgb),0.02)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${hovered ? 'rgba(var(--neon-rgb),0.2)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: 24, padding: '40px 36px',
              boxShadow: hovered ? '0 12px 60px rgba(var(--neon-rgb),0.1)' : '0 8px 30px rgba(0,0,0,0.25)',
              transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* LEFT — Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {/* CGPA */}
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: "'Outfit',sans-serif" }}>
                  Cumulative GPA
                </span>
                <div style={{
                  fontSize: 64, fontWeight: 800, fontFamily: "'Outfit',sans-serif",
                  background: 'linear-gradient(135deg, var(--color-neon), #7b2ff7)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1,
                }}>
                  <Counter value={studentInfo.cgpa} decimals={2} inView={inView} />
                </div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8,
                  padding: '4px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                  color: 'var(--color-neon)', background: 'rgba(var(--neon-rgb),0.1)',
                  border: '1px solid rgba(var(--neon-rgb),0.2)', fontFamily: "'Outfit',sans-serif",
                }}>
                  🏆 {studentInfo.division}
                </div>
              </div>

              {/* Insights row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div style={{
                  background: 'rgba(var(--neon-rgb),0.05)', borderRadius: 14,
                  padding: '14px 16px', border: '1px solid rgba(var(--neon-rgb),0.1)',
                }}>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4, fontFamily: "'Outfit',sans-serif" }}>
                    Best Semester
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-neon)', fontFamily: "'Outfit',sans-serif" }}>
                    {insights.bestSemester.tgpa}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Sem {insights.bestSemester.term} · {insights.bestSemester.percentage}%</div>
                </div>
                <div style={{
                  background: 'rgba(123,47,247,0.05)', borderRadius: 14,
                  padding: '14px 16px', border: '1px solid rgba(123,47,247,0.1)',
                }}>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4, fontFamily: "'Outfit',sans-serif" }}>
                    Courses Cleared
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#a855f7', fontFamily: "'Outfit',sans-serif" }}>
                    <Counter value={insights.totalCourses} inView={inView} />
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{insights.totalCredits} credits earned</div>
                </div>
              </div>

              {/* Trend indicator */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, fontSize: 12,
                color: trend >= 0 ? '#22c55e' : '#ef4444', fontWeight: 600, fontFamily: "'Outfit',sans-serif",
              }}>
                <span style={{ fontSize: 16 }}>{trend >= 0 ? '↑' : '↓'}</span>
                Latest trend: {Math.abs(trend).toFixed(2)} from Sem IV → V
              </div>

              {/* CTA hint */}
              <motion.div
                animate={{ opacity: hovered ? 1 : 0.4 }}
                style={{
                  marginTop: 20, fontSize: 12, color: 'var(--color-neon)',
                  fontFamily: "'Outfit',sans-serif", display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                <motion.span
                  animate={{ x: hovered ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Click to explore detailed analytics →
                </motion.span>
              </motion.div>
            </div>

            {/* RIGHT — Chart */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TGPAChart animate={hovered || inView} width={440} height={240} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && <AnalyticsModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          #academics [style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
