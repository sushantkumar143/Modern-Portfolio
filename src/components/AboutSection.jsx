import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { aboutMe, personalInfo } from '../data/portfolioData';
import { FiDownload, FiEye } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const btnPrimary = {
  padding: '16px 36px',
  borderRadius: '50px',
  fontSize: '1rem',
  fontWeight: 700,
  color: '#0a0a0f',
  background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
  boxShadow: '0 4px 25px rgba(0,212,255,0.35)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  transition: 'all 0.35s ease',
  border: 'none',
  textDecoration: 'none',
  minWidth: '200px',
  justifyContent: 'center',
};

const btnSecondary = {
  padding: '16px 36px',
  borderRadius: '50px',
  fontSize: '1rem',
  fontWeight: 700,
  color: '#00d4ff',
  background: 'transparent',
  border: '2px solid rgba(0,212,255,0.4)',
  boxShadow: '0 0 20px rgba(0,212,255,0.1)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  transition: 'all 0.35s ease',
  textDecoration: 'none',
  minWidth: '200px',
  justifyContent: 'center',
};

export default function AboutSection() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  useEffect(() => {
    // Wait a tick so DOM measurements are correct
    const timeout = setTimeout(() => {
      if (!sectionRef.current || !leftRef.current || !rightRef.current) return;

      const rightHeight = rightRef.current.scrollHeight;
      const leftHeight = leftRef.current.scrollHeight;
      const extraScroll = Math.max(0, rightHeight - leftHeight);

      // Set the section height so there's room for the right content to scroll through
      sectionRef.current.style.minHeight = `${leftHeight + extraScroll + 200}px`;

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 80px',
          // End when the right-side content has fully scrolled into view
          end: () => `+=${extraScroll}`,
          pin: leftRef.current,
          pinSpacing: false,
        });
      });

      return () => ctx.revert();
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '100px 6% 60px',
        overflow: 'visible',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '400px 1fr',
        gap: '60px',
        alignItems: 'start',
      }}>

        {/* ═══ Left Column — Heading + Image (gets pinned by GSAP) ═══ */}
        <div ref={leftRef}>
          {/* Centered heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 800,
              fontFamily: "'Outfit', sans-serif",
              marginBottom: '8px',
            }}>
              <span className="gradient-text">About Me</span>
            </h2>
            <p style={{ color: '#9ca3b0', fontSize: '1.1rem' }}>
              Get to know me better
            </p>
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{
                width: '340px',
                height: '340px',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(0,212,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{ fontSize: '120px', animation: 'float 3s ease-in-out infinite' }}>
                  👨‍💻
                </div>
              </div>
              <div style={{
                position: 'absolute', top: '-12px', right: '-12px',
                width: '24px', height: '24px', borderRadius: '50%',
                background: '#00d4ff', opacity: 0.15,
                animation: 'float 3s ease-in-out infinite',
              }} />
              <div style={{
                position: 'absolute', bottom: '-12px', left: '-12px',
                width: '18px', height: '18px', borderRadius: '50%',
                background: '#7b2ff7', opacity: 0.15,
                animation: 'float 3s ease-in-out infinite 1s',
              }} />
            </div>
          </motion.div>
        </div>

        {/* ═══ Right Column — Content (scrolls naturally) ═══ */}
        <div ref={rightRef}>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Spacer to align with image top (accounts for heading height) */}
            <div style={{ height: '120px' }} />

            {/* Bio */}
            <p style={{
              color: '#c0c4cc',
              fontSize: '1.1rem',
              lineHeight: 1.85,
              marginBottom: '36px',
            }}>
              {aboutMe.bio}
            </p>

            {/* Highlights */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#e4e4e7',
                marginBottom: '20px',
                fontFamily: "'Outfit', sans-serif",
              }}>
                What I Do
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {aboutMe.highlights.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      marginBottom: '14px',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      transition: 'all 0.3s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0,212,255,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)';
                      e.currentTarget.style.transform = 'translateX(6px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <span style={{
                      marginTop: '6px', width: '8px', height: '8px',
                      borderRadius: '50%', flexShrink: 0,
                      background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
                      boxShadow: '0 0 8px rgba(0,212,255,0.4)',
                    }} />
                    <span style={{ color: '#c0c4cc', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Stats row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '40px',
            }}>
              {[
                { num: '15+', label: 'Projects' },
                { num: '5+', label: 'Certifications' },
                { num: '3+', label: 'Internships' },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: 'center',
                    padding: '20px 10px',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <p style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '4px',
                  }}>
                    {stat.num}
                  </p>
                  <p style={{ color: '#9ca3b0', fontSize: '0.85rem' }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Resume buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <a
                href={personalInfo.resumeLink}
                style={btnPrimary}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 8px 35px rgba(0,212,255,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 25px rgba(0,212,255,0.35)';
                }}
              >
                <FiDownload size={18} /> Download Resume
              </a>
              <button
                style={btnSecondary}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                  e.currentTarget.style.background = 'rgba(0,212,255,0.08)';
                  e.currentTarget.style.borderColor = '#00d4ff';
                  e.currentTarget.style.boxShadow = '0 4px 25px rgba(0,212,255,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.1)';
                }}
              >
                <FiEye size={18} /> Preview Resume
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
