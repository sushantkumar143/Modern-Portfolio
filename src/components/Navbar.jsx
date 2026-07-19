import { useState, useEffect } from 'react';
import { navLinks, personalInfo } from '../data/portfolioData';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const linkStyle = (section) => ({
    color:
      activeSection === section
        ? 'var(--color-neon)'
        : hoveredLink === section
          ? 'var(--color-neon)'
          : '#9ca3b0',
    textShadow:
      activeSection === section
        ? '0 0 8px rgba(var(--neon-rgb), 0.6), 0 0 20px rgba(var(--neon-rgb), 0.2)'
        : hoveredLink === section
          ? '0 0 8px rgba(var(--neon-rgb), 0.4)'
          : 'none',
    transition: 'all 0.3s ease',
    position: 'relative',
    fontSize: '0.85rem',
    fontWeight: 500,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    cursor: 'pointer',
  });

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 50,
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled
            ? 'rgba(10, 10, 15, 0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(var(--neon-rgb), 0.08)'
            : '1px solid transparent',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            style={{
              fontSize: '1.8rem',
              fontWeight: 900,
              letterSpacing: '2px',
              fontFamily: "'Outfit', sans-serif",
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img
              src="/Assets/sushant1.png"
              alt="Logo"
              className="navbar-logo-img"
              style={{
                height: '60px',
                filter: 'drop-shadow(0 0 12px rgba(var(--neon-rgb), 0.6))'
              }}
            />
            <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 0 }}>
              <span
                style={{
                  color: 'var(--color-neon)',
                  textShadow: '0 0 10px rgba(var(--neon-rgb), 0.5), 0 0 40px rgba(var(--neon-rgb), 0.2)',
                }}
              >
                S
              </span>
              <span style={{ color: '#e4e4e7' }}>ushant</span>
              <span
                style={{
                  color: '#7b2ff7',
                  textShadow: '0 0 10px rgba(123,47,247,0.5)',
                  fontSize: '1.6rem',
                }}
              >
                .
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div
            style={{
              gap: '32px',
            }}
            className="hidden xl:flex items-center"
          >
            {navLinks.map((link) => {
              const section = link.href.replace('#', '');
              const isActive = activeSection === section;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  style={linkStyle(section)}
                  onMouseEnter={() => setHoveredLink(section)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                  {/* Active indicator line */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-6px',
                      left: isActive ? '0' : '50%',
                      width: isActive ? '100%' : hoveredLink === section ? '70%' : '0%',
                      height: '2px',
                      background: 'linear-gradient(90deg, var(--color-neon), #7b2ff7)',
                      borderRadius: '1px',
                      transition: 'all 0.3s ease',
                      transform: isActive ? 'none' : 'translateX(-50%)',
                      boxShadow: isActive ? '0 0 8px rgba(var(--neon-rgb), 0.5)' : 'none',
                    }}
                  />
                </a>
              );
            })}

            {/* CTA Button */}
            <a
              href="#contact"
              style={{
                padding: '8px 20px',
                borderRadius: '50px',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                color: '#0a0a0f',
                background: 'linear-gradient(135deg, var(--color-neon), #7b2ff7)',
                boxShadow: '0 0 15px rgba(var(--neon-rgb), 0.3), 0 0 30px rgba(var(--neon-rgb), 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 0 25px rgba(var(--neon-rgb), 0.5), 0 0 50px rgba(var(--neon-rgb), 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 0 15px rgba(var(--neon-rgb), 0.3), 0 0 30px rgba(var(--neon-rgb), 0.1)';
              }}
            >
              Hire Me
            </a>
          </div>

          {/* Mobile/Tablet Hamburger — Animated morphing icon */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            className="xl:hidden flex flex-col items-center justify-center"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              gap: '6px',
              width: '44px',
              height: '44px',
              position: 'relative',
              zIndex: 60,
            }}
          >
            {/* Three lines that morph into X */}
            <motion.span
              animate={{
                rotate: mobileOpen ? 45 : 0,
                y: mobileOpen ? 8 : 0,
                width: mobileOpen ? '24px' : '28px',
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'block',
                height: '2px',
                borderRadius: '2px',
                background: mobileOpen
                  ? 'var(--color-neon)'
                  : 'var(--color-neon)',
                boxShadow: mobileOpen
                  ? '0 0 8px rgba(var(--neon-rgb), 0.6)'
                  : '0 0 4px rgba(var(--neon-rgb), 0.3)',
                transformOrigin: 'center',
              }}
            />
            <motion.span
              animate={{
                opacity: mobileOpen ? 0 : 1,
                scaleX: mobileOpen ? 0 : 1,
                width: '20px',
              }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'block',
                height: '2px',
                borderRadius: '2px',
                background: '#7b2ff7',
                boxShadow: '0 0 4px rgba(123,47,247,0.3)',
              }}
            />
            <motion.span
              animate={{
                rotate: mobileOpen ? -45 : 0,
                y: mobileOpen ? -8 : 0,
                width: mobileOpen ? '24px' : '16px',
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'block',
                height: '2px',
                borderRadius: '2px',
                background: 'var(--color-neon)',
                boxShadow: mobileOpen
                  ? '0 0 8px rgba(var(--neon-rgb), 0.6)'
                  : '0 0 4px rgba(var(--neon-rgb), 0.3)',
                transformOrigin: 'center',
                alignSelf: 'flex-end',
              }}
            />
          </button>
        </div>
      </nav>

      {/* ═══ MOBILE FULLSCREEN DRAWER ═══ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(5, 5, 10, 0.6)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                zIndex: 48,
              }}
            />

            {/* Drawer panel — slides in from right */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden"
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '85%',
                maxWidth: '380px',
                zIndex: 49,
                background: 'rgba(8, 8, 14, 0.97)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                borderLeft: '1px solid rgba(var(--neon-rgb), 0.1)',
                display: 'flex',
                flexDirection: 'column',
                padding: '100px 32px 40px',
                overflowY: 'auto',
              }}
            >
              {/* Decorative background glows */}
              <div style={{
                position: 'absolute', top: '10%', right: '-20%',
                width: '300px', height: '300px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(var(--neon-rgb), 0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', bottom: '15%', left: '-15%',
                width: '250px', height: '250px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(123,47,247,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              {/* Nav Links with staggered animation */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                {navLinks.map((link, i) => {
                  const section = link.href.replace('#', '');
                  const isActive = activeSection === section;

                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px 20px',
                        borderRadius: '14px',
                        fontSize: '1.05rem',
                        fontWeight: isActive ? 700 : 500,
                        fontFamily: "'Outfit', sans-serif",
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        color: isActive ? 'var(--color-neon)' : '#9ca3b0',
                        background: isActive ? 'rgba(var(--neon-rgb), 0.06)' : 'transparent',
                        border: isActive
                          ? '1px solid rgba(var(--neon-rgb), 0.15)'
                          : '1px solid transparent',
                        textDecoration: 'none',
                        transition: 'all 0.25s ease',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Active indicator dot */}
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: isActive
                            ? 'var(--color-neon)'
                            : 'rgba(255,255,255,0.1)',
                          boxShadow: isActive
                            ? '0 0 10px rgba(var(--neon-rgb), 0.6)'
                            : 'none',
                          transition: 'all 0.3s ease',
                          flexShrink: 0,
                        }}
                      />
                      {link.label}

                      {/* Neon underline accent on active */}
                      {isActive && (
                        <motion.span
                          layoutId="mobile-nav-indicator"
                          style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '20px',
                            right: '20px',
                            height: '1px',
                            background: 'linear-gradient(90deg, var(--color-neon), #7b2ff7, transparent)',
                            borderRadius: '1px',
                          }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Bottom section — CTA + Socials */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Hire Me CTA */}
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '14px 24px',
                    borderRadius: '50px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: '#0a0a0f',
                    background: 'linear-gradient(135deg, var(--color-neon), #7b2ff7)',
                    boxShadow: '0 4px 20px rgba(var(--neon-rgb), 0.3)',
                    textDecoration: 'none',
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  ✦ Hire Me
                </a>

                {/* Social links row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                }}>
                  {[
                    { icon: FiGithub, href: personalInfo?.socialLinks?.github || '#' },
                    { icon: FiLinkedin, href: personalInfo?.socialLinks?.linkedin || '#' },
                    { icon: FiTwitter, href: personalInfo?.socialLinks?.twitter || '#' },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.08 }}
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        background: 'rgba(255,255,255,0.03)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9ca3b0',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 940px) {
          .navbar-logo-img {
            height: 40px !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .navbar-logo-img {
            height: 48px !important;
          }
        }
      `}</style>
    </>
  );
}
