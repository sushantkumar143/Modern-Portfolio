import { useRef, useEffect } from 'react';
import { education } from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EducationSection() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const timelineRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!sectionRef.current || !lineRef.current || !timelineRef.current) return;

      const ctx = gsap.context(() => {

        // 1. Line grows — scrub linked directly to scroll (instant)
        gsap.fromTo(lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              end: 'bottom 80%',
              scrub: true,
            },
          }
        );

        // 2. Each card animates in with blur effect
        cardsRef.current.forEach((row, i) => {
          if (!row) return;
          const dot = row.querySelector('.tl-dot');
          const connector = row.querySelector('.tl-connector');
          const card = row.querySelector('.tl-card');
          const isLeft = i % 2 === 0;

          if (dot) {
            gsap.fromTo(dot,
              { scale: 0, opacity: 0, filter: 'blur(8px)' },
              {
                scale: 1, opacity: 1, filter: 'blur(0px)',
                duration: 0.5, ease: 'back.out(2)',
                scrollTrigger: {
                  trigger: row,
                  start: 'top 65%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          }

          if (connector) {
            gsap.fromTo(connector,
              { scaleX: 0, opacity: 0, filter: 'blur(6px)' },
              {
                scaleX: 1, opacity: 1, filter: 'blur(0px)',
                duration: 0.3,
                scrollTrigger: {
                  trigger: row,
                  start: 'top 60%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          }

          if (card) {
            gsap.fromTo(card,
              { x: isLeft ? -80 : 80, opacity: 0, scale: 0.88, filter: 'blur(12px)' },
              {
                x: 0, opacity: 1, scale: 1, filter: 'blur(0px)',
                duration: 0.7, ease: 'power3.out',
                scrollTrigger: {
                  trigger: row,
                  start: 'top 58%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          }
        });

      }, sectionRef);

      return () => ctx.revert();
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '0 6% 80px',
      }}
    >
      {/* ── Sticky Heading — semi-transparent with fade zone below ── */}
      <div style={{
        position: 'sticky',
        top: '60px',
        zIndex: 5,
        textAlign: 'center',
        paddingTop: '10px',
        paddingBottom: '14px',
        background: 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}>
        <h2 style={{
          fontSize: '3rem', fontWeight: 800,
          fontFamily: "'Outfit', sans-serif", marginBottom: '0px',
        }}>
          <span className="gradient-text">Education</span>
        </h2>
        <p style={{ color: '#9ca3b0', fontSize: '1.05rem' }}>My academic journey</p>

        {/* Dark gradient shadow that fades cards as they approach */}
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '100%',
          height: '80px',
          background: 'linear-gradient(to bottom, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.6) 40%, rgba(10,10,15,0) 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Timeline — scrolls naturally ── */}
      <div ref={timelineRef} style={{
        position: 'relative',
        maxWidth: '1000px',
        width: '100%',
        margin: '16px auto 0',
      }}>
        {/* Faint guide line */}
        <div style={{
          position: 'absolute', left: '50%', top: 0, height: '100%',
          width: '1px', transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.04)',
        }} />

        {/* Growing neon line — scrubs with scroll */}
        <div
          ref={lineRef}
          style={{
            position: 'absolute', left: '50%',
            top: '-40px',
            height: 'calc(100% + 100px)',
            width: '3px', borderRadius: '2px',
            transform: 'translateX(-50%) scaleY(0)',
            transformOrigin: 'top center',
            background: 'linear-gradient(to bottom, transparent 0%, #00d4ff 8%, #7b2ff7 92%, transparent 100%)',
            zIndex: 1,
          }}
        />

        {/* Education Cards */}
        {education.map((edu, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              style={{
                display: 'flex',
                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                position: 'relative',
                marginBottom: index < education.length - 1 ? '50px' : '0',
              }}
            >
              {/* Dot */}
              <div className="tl-dot" style={{
                position: 'absolute', left: '50%', top: '28px',
                width: '18px', height: '18px', borderRadius: '50%',
                transform: 'translateX(-50%) scale(0)',
                background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
                boxShadow: '0 0 14px rgba(0,212,255,0.6), 0 0 35px rgba(0,212,255,0.15)',
                zIndex: 3, border: '3px solid #0a0a0f', opacity: 0,
              }} />

              {/* Connector */}
              <div className="tl-connector" style={{
                position: 'absolute', top: '36px',
                left: isLeft ? 'auto' : 'calc(50% + 9px)',
                right: isLeft ? 'calc(50% - 9px)' : 'auto',
                width: '45px', height: '2px',
                background: 'rgba(0,212,255,0.3)',
                transformOrigin: isLeft ? 'right center' : 'left center',
                opacity: 0, zIndex: 2,
              }} />

              {/* Card */}
              <div className="tl-card" style={{
                width: 'calc(50% - 70px)',
                padding: '30px 32px',
                borderRadius: '18px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
                cursor: 'default', opacity: 0,
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,212,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)';
                  e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,212,255,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span style={{
                  display: 'inline-block', padding: '6px 16px',
                  borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600,
                  color: '#00d4ff', background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.15)',
                  marginBottom: '18px', letterSpacing: '0.5px',
                }}>
                  {edu.year}
                </span>

                <h3 style={{
                  fontSize: '1.2rem', fontWeight: 700, color: '#e4e4e7',
                  marginBottom: '10px', fontFamily: "'Outfit', sans-serif", lineHeight: 1.4,
                }}>
                  {edu.degree}
                </h3>

                <p style={{
                  fontSize: '1rem', color: '#00d4ff', fontWeight: 500, marginBottom: '8px',
                }}>
                  {edu.institution}
                </p>

                <p style={{ fontSize: '0.95rem', color: '#7b2ff7', fontWeight: 600 }}>
                  {edu.grade}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
