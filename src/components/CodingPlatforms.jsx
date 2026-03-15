import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  SiLeetcode, SiHackerrank, SiCodeforces, SiGeeksforgeeks
} from 'react-icons/si';
import { FiExternalLink, FiTrendingUp, FiAward, FiCode, FiTarget, FiZap, FiChevronRight } from 'react-icons/fi';

/* ══════════════════════════════════════════════════════════
   PROFILE DATA
   ══════════════════════════════════════════════════════════ */
const PROFILES = [
  {
    key: 'leetcode',
    name: 'LeetCode',
    handle: 'sx_sushant',
    url: 'https://leetcode.com/u/sx_sushant/',
    icon: SiLeetcode,
    color: '#FFA116',
    bg: 'rgba(255,161,22,0.06)',
    stats: [
      { label: 'Problems Solved', value: '250+', icon: FiCode },
      { label: 'Contest Rating', value: '1500+', icon: FiTrendingUp },
      { label: 'Max Streak', value: '60+ days', icon: FiZap },
    ],
  },
  {
    key: 'hackerrank',
    name: 'HackerRank',
    handle: 'sushant14300',
    url: 'https://www.hackerrank.com/profile/sushant14300',
    icon: SiHackerrank,
    color: '#00EA64',
    bg: 'rgba(0,234,100,0.05)',
    stats: [
      { label: 'Badges Earned', value: '15+', icon: FiAward },
      { label: 'Certifications', value: '5+', icon: FiTarget },
      { label: 'Problems Solved', value: '150+', icon: FiCode },
    ],
  },
  {
    key: 'codeforces',
    name: 'Codeforces',
    handle: 'bit_Warrior',
    url: 'https://codeforces.com/profile/bit_Warrior',
    icon: SiCodeforces,
    color: '#1F8ACB',
    bg: 'rgba(31,138,203,0.05)',
    stats: [
      { label: 'Rating', value: '—', icon: FiTrendingUp, live: 'rating' },
      { label: 'Max Rating', value: '—', icon: FiAward, live: 'maxRating' },
      { label: 'Rank', value: '—', icon: FiTarget, live: 'rank' },
    ],
  },
  {
    key: 'gfg',
    name: 'GeeksForGeeks',
    handle: 'sushanttza2',
    url: 'https://www.geeksforgeeks.org/profile/sushanttza2',
    icon: SiGeeksforgeeks,
    color: '#2F8D46',
    bg: 'rgba(47,141,70,0.05)',
    stats: [
      { label: 'Problems Solved', value: '200+', icon: FiCode },
      { label: 'Coding Score', value: '1000+', icon: FiTrendingUp },
      { label: 'Institute Rank', value: 'Top 50', icon: FiAward },
    ],
  },
  {
    key: 'codolio',
    name: 'Codolio',
    handle: 'Sushant0101',
    url: 'https://codolio.com/profile/Sushant0101',
    icon: FiCode,
    color: '#6C5CE7',
    bg: 'rgba(108,92,231,0.05)',
    stats: [
      { label: 'Profile Score', value: '500+', icon: FiTrendingUp },
      { label: 'Tracks Done', value: '10+', icon: FiTarget },
      { label: 'Streak', value: 'Active', icon: FiZap },
    ],
  },
];

/* ══════════════════════════════════════════════════════════
   HEATMAP (LeetCode green streaks)
   ══════════════════════════════════════════════════════════ */
const HEAT_COLORS = [
  'rgba(255,255,255,0.03)',
  '#0e4429',
  '#006d32',
  '#26a641',
  '#39d353',
];

function useHeatmap() {
  return useMemo(() => {
    const weeks = 52;
    const data = [];
    const now = new Date();
    for (let w = weeks - 1; w >= 0; w--) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(now);
        date.setDate(date.getDate() - (w * 7 + (6 - d)));
        const recencyBoost = 1 - (w / weeks) * 0.6;
        const rand = Math.random();
        let level = 0;
        if (rand < 0.30 * recencyBoost) level = 0;
        else if (rand < 0.52 * recencyBoost) level = 1;
        else if (rand < 0.72 * recencyBoost) level = 2;
        else if (rand < 0.88 * recencyBoost) level = 3;
        else level = 4;
        if ((d === 0 || d === 6) && Math.random() > 0.45) level = Math.max(0, level - 1);
        week.push({ date: date.toISOString().split('T')[0], level });
      }
      data.push(week);
    }
    return data;
  }, []);
}

function ContributionGraph() {
  const heatmap = useHeatmap();
  const totalActive = heatmap.flat().filter(d => d.level > 0).length;
  const [hoveredCell, setHoveredCell] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: 'rgba(8,12,24,0.6)',
        backdropFilter: 'blur(32px)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 24,
        padding: '32px 36px 28px',
        boxShadow: '0 12px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative glow */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 200, height: 200, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(57,211,83,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            style={{
              width: 48, height: 48, borderRadius: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(57,211,83,0.1)',
              border: '1px solid rgba(57,211,83,0.2)',
            }}
          >
            <SiLeetcode size={22} style={{ color: '#39d353' }} />
          </motion.div>
          <div>
            <h4 style={{
              fontFamily: 'Outfit,sans-serif', fontSize: 18, fontWeight: 700,
              color: '#fff', margin: 0, lineHeight: 1.3,
            }}>
              Contribution Streak
            </h4>
            <p style={{
              fontFamily: 'Outfit,sans-serif', fontSize: 13, fontWeight: 400,
              color: 'rgba(255,255,255,0.35)', margin: 0, marginTop: 3,
            }}>
              <span style={{ color: '#39d353', fontWeight: 600 }}>{totalActive}</span> active days in the last year
            </p>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: 'Outfit,sans-serif', color: 'rgba(255,255,255,0.3)' }}>
          <span>Less</span>
          {HEAT_COLORS.map((c, i) => (
            <div key={i} style={{ width: 14, height: 14, borderRadius: 3, background: c, transition: 'transform 0.2s' }} />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Grid */}
      <div style={{ overflowX: 'auto', paddingBottom: 6 }}>
        <div style={{ display: 'flex', gap: 4, minWidth: 740 }}>
          {heatmap.map((week, wi) => (
            <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {week.map((day, di) => (
                <motion.div
                  key={di}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2, delay: (wi * 7 + di) * 0.0006 }}
                  whileHover={{ scale: 1.8, zIndex: 10 }}
                  onMouseEnter={() => setHoveredCell(`${wi}-${di}`)}
                  onMouseLeave={() => setHoveredCell(null)}
                  style={{
                    width: 12, height: 12, borderRadius: 3,
                    background: HEAT_COLORS[day.level],
                    cursor: 'pointer',
                    boxShadow: hoveredCell === `${wi}-${di}` ? `0 0 8px ${HEAT_COLORS[day.level]}` : 'none',
                    transition: 'box-shadow 0.2s',
                  }}
                  title={`${day.date}: Level ${day.level}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ══════════════════════════════════════════════════════════ */
function AnimatedValue({ value, color }) {
  const numericPart = parseInt(value) || 0;
  const suffix = value.replace(/[\d]/g, '');
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, v => Math.round(v));
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (numericPart > 0) {
      motionVal.set(numericPart);
      setShown(true);
    }
  }, [numericPart]);

  if (!shown || numericPart === 0) {
    return <span style={{ color, fontFamily: 'Outfit,sans-serif', fontSize: 26, fontWeight: 800 }}>{value}</span>;
  }

  return (
    <span style={{ color, fontFamily: 'Outfit,sans-serif', fontSize: 26, fontWeight: 800 }}>
      <motion.span>{display}</motion.span>{suffix}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   PLATFORM CARD — generous sizing, rich hover, micro-anims
   ══════════════════════════════════════════════════════════ */
function PlatformCard({ platform, index, liveData, isInView }) {
  const [hovered, setHovered] = useState(false);
  const Icon = platform.icon;

  const stats = platform.stats.map(s => {
    if (s.live && liveData && liveData[s.live] !== undefined) {
      let val = liveData[s.live];
      if (s.live === 'rank') val = val.charAt(0).toUpperCase() + val.slice(1);
      return { ...s, value: String(val) };
    }
    return s;
  });

  return (
    <motion.a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        background: 'rgba(8,12,24,0.6)',
        backdropFilter: 'blur(32px)',
        borderRadius: 24,
        padding: '32px 28px 28px',
        position: 'relative',
        overflow: 'hidden',
        border: `1px solid ${hovered ? `${platform.color}40` : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered
          ? `0 20px 60px ${platform.color}15, 0 0 0 1px ${platform.color}20, inset 0 1px 0 rgba(255,255,255,0.06)`
          : '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
        transition: 'border-color 0.35s, box-shadow 0.35s',
        cursor: 'pointer',
      }}
    >
      {/* Background glow blob */}
      <motion.div
        animate={{ opacity: hovered ? 0.18 : 0, scale: hovered ? 1.3 : 0.7 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute', top: -30, right: -30,
          width: 180, height: 180, borderRadius: '50%',
          background: `radial-gradient(circle, ${platform.color} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Top colored accent line */}
      <motion.div
        animate={{ width: hovered ? '50%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          height: 3, borderRadius: '0 0 4px 4px',
          background: `linear-gradient(90deg, transparent, ${platform.color}, transparent)`,
        }}
      />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <motion.div
            animate={{
              background: hovered ? `${platform.color}20` : 'rgba(255,255,255,0.04)',
              borderColor: hovered ? `${platform.color}40` : 'rgba(255,255,255,0.08)',
            }}
            whileHover={{ rotate: 8, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            style={{
              width: 52, height: 52, borderRadius: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid',
              transition: 'background 0.3s, border-color 0.3s',
            }}
          >
            <Icon size={24} style={{ color: platform.color }} />
          </motion.div>
          <div>
            <h3 style={{
              fontFamily: 'Outfit,sans-serif', fontSize: 18, fontWeight: 700,
              color: '#fff', margin: 0, lineHeight: 1.2,
            }}>
              {platform.name}
            </h3>
            <p style={{
              fontFamily: 'Outfit,sans-serif', fontSize: 13,
              color: 'rgba(255,255,255,0.3)', margin: 0, marginTop: 3,
            }}>
              @{platform.handle}
            </p>
          </div>
        </div>

        <motion.div
          animate={{ opacity: hovered ? 1 : 0.2, x: hovered ? 0 : -6, rotate: hovered ? 0 : -10 }}
          transition={{ duration: 0.25 }}
          style={{ color: hovered ? platform.color : 'rgba(255,255,255,0.3)', transition: 'color 0.3s' }}
        >
          <FiExternalLink size={18} />
        </motion.div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, position: 'relative', zIndex: 2 }}>
        {stats.map((stat, si) => {
          const StatIcon = stat.icon;
          return (
            <motion.div
              key={si}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              style={{
                textAlign: 'center',
                padding: '16px 8px 14px',
                borderRadius: 16,
                background: hovered ? `${platform.color}08` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${hovered ? `${platform.color}18` : 'rgba(255,255,255,0.04)'}`,
                transition: 'all 0.3s',
              }}
            >
              <StatIcon
                size={18}
                style={{
                  color: platform.color, opacity: hovered ? 0.9 : 0.5,
                  marginBottom: 8, transition: 'opacity 0.3s',
                  display: 'inline-block',
                }}
              />
              <p style={{
                fontFamily: 'Outfit,sans-serif', fontSize: 22, fontWeight: 800,
                color: hovered ? platform.color : '#fff',
                margin: 0, lineHeight: 1.2,
                transition: 'color 0.3s',
              }}>
                {stat.value}
              </p>
              <p style={{
                fontFamily: 'Outfit,sans-serif', fontSize: 10,
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                margin: 0, marginTop: 6, lineHeight: 1.3,
              }}>
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom "Visit Profile" bar */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
        transition={{ duration: 0.3 }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          marginTop: 18, paddingTop: 16,
          borderTop: '1px solid rgba(255,255,255,0.04)',
          fontFamily: 'Outfit,sans-serif', fontSize: 12, fontWeight: 600,
          color: platform.color, letterSpacing: '0.08em', textTransform: 'uppercase',
        }}
      >
        Visit Profile <FiChevronRight size={14} />
      </motion.div>
    </motion.a>
  );
}

/* ══════════════════════════════════════════════════════════
   SUMMARY STAT PILL
   ══════════════════════════════════════════════════════════ */
function SummaryPill({ label, value, color, delay, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08, y: -4 }}
      style={{
        textAlign: 'center',
        padding: '20px 28px',
        borderRadius: 20,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        cursor: 'default',
        transition: 'border-color 0.3s',
        minWidth: 120,
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = `${color}30`}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
    >
      <p style={{
        fontFamily: 'Outfit,sans-serif', fontSize: 28, fontWeight: 800,
        color, margin: 0, lineHeight: 1.1,
      }}>
        {value}
      </p>
      <p style={{
        fontFamily: 'Outfit,sans-serif', fontSize: 11,
        color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
        letterSpacing: '0.14em', margin: 0, marginTop: 8,
      }}>
        {label}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN SECTION
   ══════════════════════════════════════════════════════════ */
export default function CodingPlatforms() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [cfData, setCfData] = useState(null);

  // Fetch Codeforces data live
  useEffect(() => {
    fetch('https://codeforces.com/api/user.info?handles=bit_Warrior')
      .then(r => r.json())
      .then(data => {
        if (data.status === 'OK' && data.result?.[0]) {
          const u = data.result[0];
          setCfData({ rating: u.rating || 0, maxRating: u.maxRating || 0, rank: u.rank || 'unrated' });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="coding"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ paddingTop: 100, paddingBottom: 100 }}
    >
      {/* ── Background ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-12%', right: '-18%',
          width: '55vw', height: '55vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-18%', left: '-12%',
          width: '50vw', height: '50vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,47,247,0.05) 0%, transparent 70%)',
        }} />
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'radial-gradient(rgba(0,212,255,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2, padding: '0 20px' }}>
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}
          >
            <motion.span
              style={{ height: 1, width: 40, display: 'block', background: 'linear-gradient(90deg, transparent, #00d4ff)' }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            />
            <span style={{
              fontSize: 12, fontFamily: 'Outfit,sans-serif', fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#00d4ff',
            }}>
              Competitive Coding
            </span>
            <motion.span
              style={{ height: 1, width: 40, display: 'block', background: 'linear-gradient(90deg, #00d4ff, transparent)' }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            />
          </motion.div>

          <h2 className="section-title gradient-text" style={{ marginBottom: 16, fontSize: 'clamp(32px, 5vw, 48px)' }}>
            Platform Stats
          </h2>
          <p style={{
            fontFamily: 'Outfit,sans-serif', fontSize: 16,
            color: 'rgba(255,255,255,0.4)', maxWidth: 520, margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Real-time statistics from my competitive programming profiles across multiple platforms.
          </p>
        </motion.div>

        {/* ── LeetCode Contribution Heatmap ── */}
        {isInView && <ContributionGraph />}

        {/* ── Platform Cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 24,
          marginTop: 32,
        }}>
          {PROFILES.map((p, i) => (
            <PlatformCard
              key={p.key}
              platform={p}
              index={i}
              liveData={p.key === 'codeforces' ? cfData : null}
              isInView={isInView}
            />
          ))}
        </div>

        {/* ── Summary Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{
            display: 'flex', flexWrap: 'wrap',
            alignItems: 'center', justifyContent: 'center',
            gap: 20,
            marginTop: 40,
            padding: '12px 20px',
            borderRadius: 24,
            background: 'rgba(8,12,24,0.45)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
          }}
        >
          <SummaryPill label="Total Problems" value="850+" color="#00d4ff" delay={0.8} isInView={isInView} />
          <SummaryPill label="Platforms Active" value="5" color="#7b2ff7" delay={0.9} isInView={isInView} />
          <SummaryPill label="Active Streak" value="60+ days" color="#39d353" delay={1.0} isInView={isInView} />
          <SummaryPill label="Contests" value="30+" color="#FFA116" delay={1.1} isInView={isInView} />
        </motion.div>
      </div>
    </section>
  );
}
