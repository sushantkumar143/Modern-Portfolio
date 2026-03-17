/* ---------- Imports ---------- */
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Float } from '@react-three/drei';
import {
  FiSend, FiMail, FiUser, FiMessageCircle,
  FiGithub, FiLinkedin, FiTwitter, FiMapPin, FiPhone, FiArrowRight,
} from 'react-icons/fi';

/* ─────────────────────────────────────────
   3D Globe — untouched
───────────────────────────────────────── */
function Globe3D() {
  const globeRef = useRef();
  const { scene } = useGLTF('/models/globe.glb');
  useFrame((_, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.3;
  });
  return (
    <group ref={globeRef} dispose={null}>
      <primitive object={scene} scale={0.0002} position={[0, -0.2, 0]} />
    </group>
  );
}
useGLTF.preload('/models/globe.glb');

/* ─────────────────────────────────────────
   FloatingInput
   Fixed positioning approach:
   - Container has explicit height: 58px
   - Label animates `top` in px (not % mix)
     idle  -> top: 20px (visually centred)
     lifted -> top: 7px, scale 0.74
   - Input uses paddingTop shift so typed
     text doesn't sit under the label
───────────────────────────────────────── */
function FloatingInput({ type = 'text', name, label, value, onChange, icon: Icon, required = true, delay = 0 }) {
  const [isFocused, setIsFocused] = useState(false);
  const lifted = isFocused || (value && value.length > 0);

  return (
    <motion.div
      className="relative"
      style={{ height: 58 }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* border / bg */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-250"
        style={{
          background: isFocused ? 'rgba(var(--neon-rgb), 0.04)' : 'rgba(255,255,255,0.025)',
          border: `1px solid ${isFocused ? 'rgba(var(--neon-rgb), 0.48)' : 'rgba(255,255,255,0.08)'}`,
          boxShadow: isFocused ? '0 0 0 3px rgba(var(--neon-rgb), 0.07), 0 4px 18px rgba(0,0,0,0.18)' : 'none',
        }}
      />

      {/* icon — always centred in the 58px box */}
      <div
        className="absolute left-4 z-20 pointer-events-none"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          color: isFocused ? 'var(--color-neon)' : 'rgba(255,255,255,0.26)',
          transition: 'color 0.2s',
        }}
      >
        <Icon size={16} />
      </div>

      {/* floating label — top in px so it can never leave the box */}
      <motion.label
        className="absolute left-[46px] z-20 pointer-events-none font-['Outfit'] text-[15px] select-none origin-left"
        animate={{
          top: lifted ? 7 : 20,
          scale: lifted ? 0.74 : 1,
          color: isFocused
            ? 'var(--color-neon)'
            : lifted
              ? 'rgba(255,255,255,0.38)'
              : 'rgba(255,255,255,0.3)',
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ lineHeight: 1 }}
      >
        {label}
      </motion.label>

      {/* actual input — paddingTop grows when label is lifted */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="absolute inset-0 w-full rounded-xl z-10 font-['Outfit'] text-[15px] text-white bg-transparent outline-none"
        style={{
          paddingLeft: 46,
          paddingRight: 16,
          paddingTop: lifted ? 22 : 0,
          paddingBottom: lifted ? 4 : 0,
          caretColor: 'var(--color-neon)',
          transition: 'padding-top 0.2s ease, padding-bottom 0.2s ease',
        }}
      />

      {/* accent line */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-[1.5px] rounded-full z-30 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--color-neon), #7b2ff7, transparent)',
          translateX: '-50%',
        }}
        animate={{ width: isFocused ? '74%' : '0%' }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   FloatingTextarea
───────────────────────────────────────── */
function FloatingTextarea({ name, label, value, onChange, rows = 4, required = true, delay = 0 }) {
  const [isFocused, setIsFocused] = useState(false);
  const lifted = isFocused || (value && value.length > 0);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* border / bg */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-250"
        style={{
          background: isFocused ? 'rgba(var(--neon-rgb), 0.04)' : 'rgba(255,255,255,0.025)',
          border: `1px solid ${isFocused ? 'rgba(var(--neon-rgb), 0.48)' : 'rgba(255,255,255,0.08)'}`,
          boxShadow: isFocused ? '0 0 0 3px rgba(var(--neon-rgb), 0.07), 0 4px 18px rgba(0,0,0,0.18)' : 'none',
        }}
      />

      {/* icon */}
      <div
        className="absolute left-4 z-20 pointer-events-none"
        style={{
          top: 18,
          color: isFocused ? 'var(--color-neon)' : 'rgba(255,255,255,0.26)',
          transition: 'color 0.2s',
        }}
      >
        <FiMessageCircle size={16} />
      </div>

      {/* floating label */}
      <motion.label
        className="absolute left-[46px] z-20 pointer-events-none font-['Outfit'] text-[15px] select-none origin-left"
        animate={{
          top: lifted ? 7 : 18,
          scale: lifted ? 0.74 : 1,
          color: isFocused
            ? 'var(--color-neon)'
            : lifted
              ? 'rgba(255,255,255,0.38)'
              : 'rgba(255,255,255,0.3)',
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ lineHeight: 1 }}
      >
        {label}
      </motion.label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="relative z-10 w-full rounded-xl font-['Outfit'] text-[15px] text-white bg-transparent outline-none resize-none"
        style={{
          paddingLeft: 46,
          paddingRight: 16,
          paddingTop: 30,
          paddingBottom: 14,
          caretColor: 'var(--color-neon)',
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/2 h-[1.5px] rounded-full z-30 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--color-neon), #7b2ff7, transparent)',
          translateX: '-50%',
        }}
        animate={{ width: isFocused ? '74%' : '0%' }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   ContactRow  — styled like a form field row
   height: 58px, same border/bg as inputs,
   icon left, label+value stacked, arrow right
───────────────────────────────────────── */
function ContactRow({ icon: Icon, label, value, href, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        height: 58,
        borderRadius: 12,
        position: 'relative',
        overflow: 'hidden',
        background: hovered ? 'rgba(var(--neon-rgb), 0.04)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? 'rgba(var(--neon-rgb), 0.45)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hovered ? '0 0 0 3px rgba(var(--neon-rgb), 0.06), 0 4px 18px rgba(0,0,0,0.16)' : 'none',
        transition: 'background 0.22s, border-color 0.22s, box-shadow 0.22s',
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      {/* icon */}
      <div style={{
        width: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: hovered ? 'var(--color-neon)' : 'rgba(255,255,255,0.28)',
        transition: 'color 0.2s',
      }}>
        <Icon size={17} />
      </div>

      {/* label + value */}
      <div style={{ flex: 1, minWidth: 0, paddingLeft: 10 }}>
        <p style={{
          fontSize: 10,
          fontFamily: 'Outfit,sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.28)',
          marginBottom: 3,
          lineHeight: 1,
        }}>
          {label}
        </p>
        <p style={{
          fontSize: 15,
          fontFamily: 'Outfit,sans-serif',
          fontWeight: 500,
          color: hovered ? 'var(--color-neon)' : 'rgba(255,255,255,0.78)',
          lineHeight: 1.2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          transition: 'color 0.2s',
        }}>
          {value}
        </p>
      </div>

      {/* arrow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
        transition={{ duration: 0.18 }}
        style={{ flexShrink: 0, color: 'var(--color-neon)' }}
      >
        <FiArrowRight size={16} />
      </motion.div>

      {/* bottom accent line on hover */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          height: 1.5,
          borderRadius: 999,
          background: 'linear-gradient(90deg, transparent, var(--color-neon), #7b2ff7, transparent)',
          translateX: '-50%',
        }}
        animate={{ width: hovered ? '74%' : '0%' }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.a>
  );
}

/* ─────────────────────────────────────────
   ContactCard (kept for compatibility)
───────────────────────────────────────── */
function ContactCard({ icon: Icon, label, value, href, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}
    >
      <motion.div
        animate={{
          background: hovered
            ? 'linear-gradient(135deg, rgba(0,212,255,0.16), rgba(123,47,247,0.16))'
            : 'rgba(255,255,255,0.04)',
          borderColor: hovered ? 'rgba(0,212,255,0.38)' : 'rgba(255,255,255,0.08)',
          scale: hovered ? 1.06 : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{
          width: 40, height: 40, borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, border: '1px solid',
        }}
      >
        <motion.span
          animate={{ color: hovered ? 'var(--color-neon)' : 'rgba(255,255,255,0.38)' }}
          transition={{ duration: 0.18 }}
        >
          <Icon size={15} />
        </motion.span>
      </motion.div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 10, fontFamily: 'Outfit, sans-serif', textTransform: 'uppercase', letterSpacing: '0.13em', color: 'rgba(255,255,255,0.26)', marginBottom: 3, lineHeight: 1 }}>
          {label}
        </p>
        <motion.p
          animate={{ color: hovered ? 'var(--color-neon)' : 'rgba(255,255,255,0.72)' }}
          transition={{ duration: 0.18 }}
          style={{ fontSize: 13, fontFamily: 'Outfit, sans-serif', fontWeight: 500, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {value}
        </motion.p>
      </div>

      <motion.span
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -5 }}
        transition={{ duration: 0.16 }}
        style={{ flexShrink: 0, color: 'var(--color-neon)' }}
      >
        <FiArrowRight size={14} />
      </motion.span>
    </motion.a>
  );
}

/* ─────────────────────────────────────────
   SocialButton
───────────────────────────────────────── */
function SocialButton({ icon: Icon, href, label, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
    >
      <motion.div
        style={{ position: 'absolute', inset: 0, borderRadius: 10, border: '1px solid' }}
        animate={{
          background: hovered ? 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(123,47,247,0.15))' : 'rgba(255,255,255,0.04)',
          borderColor: hovered ? 'rgba(0,212,255,0.38)' : 'rgba(255,255,255,0.08)',
        }}
        transition={{ duration: 0.18 }}
      />
      <motion.span
        animate={{ color: hovered ? 'var(--color-neon)' : 'rgba(255,255,255,0.36)', scale: hovered ? 1.12 : 1 }}
        transition={{ duration: 0.16 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Icon size={14} />
      </motion.span>
    </motion.a>
  );
}

/* ─────────────────────────────────────────
   ScanLine
───────────────────────────────────────── */
function ScanLine() {
  return (
    <motion.div
      style={{
        position: 'absolute', left: 0, right: 0, height: 1, pointerEvents: 'none', zIndex: 0,
        background: 'linear-gradient(90deg, transparent 0%, rgba(var(--neon-rgb), 0.1) 40%, rgba(var(--neon-rgb), 0.1) 60%, transparent 100%)',
      }}
      initial={{ top: '0%' }}
      animate={{ top: '100%' }}
      transition={{ duration: 7, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
    />
  );
}

/* ─────────────────────────────────────────
   TypingDots
───────────────────────────────────────── */
function TypingDots() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-neon)', display: 'inline-block' }}
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -2.5, 0] }}
          transition={{ duration: 0.72, repeat: Infinity, delay: i * 0.13 }}
        />
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════
   MAIN CONTACT SECTION
═══════════════════════════════════════════ */
export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimer = useRef(null);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setIsTyping(true);
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => setIsTyping(false), 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTyping(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const msgLen = formData.message.length;
  const charLimit = 500;

  const cardStyle = {
    background: 'rgba(8, 12, 24, 0.62)',
    backdropFilter: 'blur(28px)',
    border: '1px solid rgba(255,255,255,0.07)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
    borderRadius: 20,
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ display: 'flex', alignItems: 'center' }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-8%] left-[-12%] w-[50vw] h-[50vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.042) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-12%] right-[-8%] w-[44vw] h-[44vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(123,47,247,0.052) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(var(--neon-rgb), 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--neon-rgb), 0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <ScanLine />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 relative z-10 py-14">

        {/* ══════ HEADER ══════ */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"  /* ← was mb-20, now mb-10 */
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="h-px w-7" style={{ background: 'linear-gradient(90deg, transparent, var(--color-neon))', display: 'block' }} />
            <span className="text-[13px] font-['Outfit'] font-semibold tracking-[0.22em] uppercase" style={{ color: 'var(--color-neon)' }}>
              Let's Talk
            </span>
            <span className="h-px w-7" style={{ background: 'linear-gradient(90deg, var(--color-neon), transparent)', display: 'block' }} />
          </motion.div>

          <h2 className="section-title gradient-text mb-3">Get In Touch</h2>

          <p className="font-['Outfit'] text-base text-white/40 max-w-xs mx-auto leading-relaxed">
            Have a project in mind? Let's build something{' '}
            <span style={{ color: 'var(--color-neon)', opacity: 0.85 }}>amazing</span> together.
          </p>
        </motion.div>

        {/* ══════ TWO-COLUMN GRID ══════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-start">

          {/* ══ LEFT: Info card + Form ══ */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.76, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >

            {/* Form / Success — FIRST */}
            <AnimatePresence mode="wait">
              {isSubmitted ? (

                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.93, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.93, y: -14 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  style={{ ...cardStyle, border: '1px solid rgba(0,212,255,0.16)', padding: 40, textAlign: 'center', position: 'relative', overflow: 'hidden' }}
                >
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      style={{ position: 'absolute', inset: 0, borderRadius: 20, border: '1px solid rgba(0,212,255,0.12)', pointerEvents: 'none' }}
                      initial={{ opacity: 0.5, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.08 + i * 0.05 }}
                      transition={{ duration: 1.8, delay: i * 0.28, repeat: Infinity }}
                    />
                  ))}
                  <motion.div
                    initial={{ scale: 0, rotate: -18 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.08 }}
                    style={{
                      width: 56, height: 56, margin: '0 auto 16px',
                      borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'linear-gradient(135deg, rgba(0,212,255,0.13), rgba(123,47,247,0.13))',
                      border: '1px solid rgba(0,212,255,0.2)',
                    }}
                  >
                    <FiSend size={22} style={{ color: 'var(--color-neon)' }} />
                  </motion.div>
                  <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
                    style={{ fontFamily: 'Outfit,sans-serif', fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
                    Message Sent!
                  </motion.p>
                  <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
                    style={{ fontFamily: 'Outfit,sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.36)' }}>
                    I'll reply within 24 hours.
                  </motion.p>
                </motion.div>

              ) : (

                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.48, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{ ...cardStyle, position: 'relative', overflow: 'hidden' }}
                >
                  {/* hover shimmer */}
                  <motion.div
                    style={{
                      position: 'absolute', inset: 0, pointerEvents: 'none',
                      background: 'linear-gradient(135deg, rgba(0,212,255,0.025) 0%, rgba(123,47,247,0.025) 100%)',
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.45 }}
                  />

                  <div style={{ position: 'relative', zIndex: 1, padding: '28px 28px 28px' }}>

                    {/* heading row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 22 }}>
                      <div>
                        <h4 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>
                          Drop me a line
                        </h4>
                        <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.26)', marginTop: 5 }}>
                          All fields are required
                        </p>
                      </div>
                      <AnimatePresence>
                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            transition={{ duration: 0.16 }}
                            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontFamily: 'Outfit,sans-serif', color: 'rgba(255,255,255,0.26)' }}
                          >
                            <span>typing</span>
                            <TypingDots />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* fields — gap-4 between each */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <FloatingInput
                        type="text" name="name" label="Your name"
                        value={formData.name} onChange={handleChange}
                        icon={FiUser} delay={0.36}
                      />
                      <FloatingInput
                        type="email" name="email" label="Email address"
                        value={formData.email} onChange={handleChange}
                        icon={FiMail} delay={0.42}
                      />
                      <FloatingTextarea
                        name="message" label="Tell me about your project..."
                        value={formData.message} onChange={handleChange}
                        rows={4} delay={0.48}
                      />

                      <AnimatePresence>
                        {msgLen > 0 && (
                          <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -6 }}
                          >
                            <span style={{
                              fontFamily: 'Outfit,sans-serif', fontSize: 10, fontVariantNumeric: 'tabular-nums',
                              color: msgLen > charLimit * 0.85 ? '#f97316' : 'rgba(255,255,255,0.2)',
                            }}>
                              {msgLen} / {charLimit}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* submit */}
                    <motion.button
                      type="submit"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.42, delay: 0.56 }}
                      whileHover={{
                        scale: 1.015,
                        boxShadow: '0 0 26px rgba(0,212,255,0.3), 0 0 52px rgba(123,47,247,0.12)',
                      }}
                      whileTap={{ scale: 0.978 }}
                      style={{
                        marginTop: 20, width: '100%', height: 48,
                        borderRadius: 12, border: 'none', cursor: 'pointer',
                        background: 'linear-gradient(135deg, #00d4ff 0%, #7b2ff7 100%)',
                        fontFamily: 'Outfit,sans-serif', fontWeight: 700, color: '#fff',
                        fontSize: 14, letterSpacing: '0.11em', textTransform: 'uppercase',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                        position: 'relative', overflow: 'hidden',
                      }}
                      className="group"
                    >
                      <motion.span
                        style={{
                          position: 'absolute', inset: 0,
                          background: 'linear-gradient(105deg, transparent 28%, rgba(255,255,255,0.2) 50%, transparent 72%)',
                        }}
                        animate={{ x: ['-110%', '210%'] }}
                        transition={{ duration: 1.3, repeat: Infinity, ease: 'linear', repeatDelay: 1.1 }}
                        className="opacity-0 group-hover:opacity-100"
                      />
                      <motion.span
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ position: 'relative', zIndex: 1 }}
                      >
                        <FiSend size={15} />
                      </motion.span>
                      <span style={{ position: 'relative', zIndex: 1 }}>Send Message</span>
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Contact details card — BELOW FORM */}
            <motion.div
              className="relative overflow-hidden p-6"
              style={cardStyle}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* accent blob */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)', transform: 'translate(28%,-28%)' }} />

              <p style={{ fontSize: 11, fontFamily: 'Outfit,sans-serif', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.24)', marginBottom: 18 }}>
                Contact Details
              </p>

              {/* Three contact rows — same height + border as form inputs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { icon: FiMail, label: 'Email', value: 'hello@yourname.dev', href: 'mailto:hello@yourname.dev', delay: 0.5 },
                  { icon: FiPhone, label: 'Phone', value: '+1 (555) 000-0000', href: 'tel:+15550000000', delay: 0.56 },
                  { icon: FiMapPin, label: 'Location', value: 'San Francisco, CA', href: '#', delay: 0.62 },
                ].map(({ icon: Icon, label, value, href, delay }) => (
                  <ContactRow key={label} icon={Icon} label={label} value={value} href={href} delay={delay} />
                ))}
              </div>

              {/* divider */}
              <div style={{ height: 1, margin: '18px 0', background: 'linear-gradient(90deg, rgba(255,255,255,0.05), rgba(0,212,255,0.1), rgba(255,255,255,0.05))' }} />

              {/* Socials row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <p style={{ fontSize: 11, fontFamily: 'Outfit,sans-serif', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.22)', marginRight: 4 }}>
                  Find me on
                </p>
                <SocialButton icon={FiGithub} href="https://github.com" label="GitHub" delay={0.68} />
                <SocialButton icon={FiLinkedin} href="https://linkedin.com" label="LinkedIn" delay={0.72} />
                <SocialButton icon={FiTwitter} href="https://twitter.com" label="Twitter" delay={0.76} />
              </div>
            </motion.div>

          </motion.div>

          {/* ══ RIGHT: 3D Globe ══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.87 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.05, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-[400px] lg:h-[620px] w-full relative flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ marginTop: '-60px' }}
          >
            {/* decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="w-[280px] h-[280px] lg:w-[420px] lg:h-[420px] rounded-full border border-[var(--color-neon)]/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-[220px] h-[220px] lg:w-[320px] lg:h-[320px] rounded-full border border-[#7b2ff7]/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-[340px] h-[340px] lg:w-[520px] lg:h-[520px] rounded-full"
                style={{ border: '1px dashed rgba(0,212,255,0.05)' }}
                animate={{ rotate: 180 }}
                transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-56 h-56 lg:w-72 lg:h-72 bg-[#00d4ff]/10 rounded-full blur-[80px]" />
            </div>

            {/* availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.62, delay: 0.72 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full z-10 pointer-events-none"
              style={{
                background: 'rgba(8,12,24,0.72)',
                backdropFilter: 'blur(14px)',
                border: '1px solid rgba(0,212,255,0.14)',
                boxShadow: '0 4px 18px rgba(0,0,0,0.26)',
                whiteSpace: 'nowrap',
              }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <span className="text-[13px] font-['Outfit'] text-white/46 tracking-wide">
                Available for projects
              </span>
            </motion.div>

            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
              <directionalLight position={[-10, -5, -10]} intensity={0.5} color="#00d4ff" />
              <pointLight position={[0, 5, 5]} intensity={0.8} color="#7b2ff7" />
              <Environment preset="city" />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} rotateSpeed={0.5} />
              <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
                <Globe3D />
              </Float>
            </Canvas>
          </motion.div>

        </div>
      </div>
    </section>
  );
}