import { useState, useEffect } from 'react';
import { navLinks } from '../data/portfolioData';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

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
            gap: '2px',
          }}
        >
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
        </a>

        {/* Desktop Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
          className="hidden md:flex"
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

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          className="md:hidden"
          style={{
            fontSize: '1.6rem',
            color: 'var(--color-neon)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
            style={{
              margin: '12px 16px 0',
              padding: '24px',
              borderRadius: '16px',
              background: 'rgba(10, 10, 15, 0.95)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(var(--neon-rgb), 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  color: activeSection === link.href.replace('#', '') ? 'var(--color-neon)' : '#9ca3b0',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--color-neon)';
                  e.target.style.background = 'rgba(var(--neon-rgb), 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = activeSection === link.href.replace('#', '') ? 'var(--color-neon)' : '#9ca3b0';
                  e.target.style.background = 'transparent';
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
