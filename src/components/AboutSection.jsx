import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Storytelling content blocks ── */
const storyBlocks = [
  {
    heading: 'Who I Am',
    content:
      'Im Sushant Kumar — a Computer Science student driven by an insatiable curiosity for Artificial Intelligence, Data Science, and intelligent systems. I thrive at the intersection of innovation and impact, turning bold ideas into technology that matters.',
  },
  {
    heading: 'What I Build',
    content:
      'From AI-powered chatbots and RAG pipelines to full-stack web applications and automation tools, I craft end-to-end solutions. My toolkit spans Python, C++, React, FastAPI, TensorFlow, and LangChain — always picking the right tool for the job.',
  },
  {
    heading: 'How I Think',
    content:
      'I approach every challenge like a puzzle — analyzing deeply, designing efficient algorithms, and architecting scalable systems. Whether its optimizing a neural network or refactoring a codebase, precision and elegance guide my work.',
  },
  {
    heading: 'My Journey',
    content:
      'Recognised with the Academic Achiever Award among 14,000+ students, a national-level hackathon finalist, and a consistent problem solver on competitive platforms — every milestone fuels the next leap forward.',
  },
  {
    heading: "Where I'm Going",
    content:
      'My north star is clear: becoming a Data Scientist and AI Engineer who builds intelligent systems that solve real-world problems at scale — from healthcare diagnostics to autonomous decision-making.',
  },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!sectionRef.current || !leftContentRef.current || !cardsContainerRef.current) return;

      const ctx = gsap.context(() => {
        // Pin the entire left column (heading + image) while right-side scrolls.
        // It stays pinned until the bottom of the section reaches the bottom of the screen.
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 40px',
          end: 'bottom bottom',
          pin: leftContentRef.current,
          pinSpacing: false,
        });

        // Fade out previous cards as new ones come in (except the last)
        cardsRef.current.forEach((card, i) => {
          if (!card) return;

          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          if (i < storyBlocks.length - 1) {
            const contentEl = card.querySelector('.about-card-content');
            if (contentEl) {
              gsap.to(contentEl, {
                opacity: 0.15,
                scrollTrigger: {
                  trigger: cardsRef.current[i + 1],
                  start: 'top 85%',
                  end: 'top 30%',
                  scrub: 1, // 1-second smoothing delay
                },
              });
            }
          }
        });
      });

      return () => ctx.revert();
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-visible"
      style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(15,15,15,0.22) 100%)',
        padding: '120px 5% 220px',
      }}
    >
      <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-16 lg:gap-32">

        {/* ═══ LEFT COLUMN — Sticky Visual & Heading (pinned by GSAP together) ═══ */}
        <div ref={leftContentRef} className="w-full lg:w-[450px] shrink-0 flex flex-col items-center gap-12 pt-[40px]">

          {/* Section Title — Horizontally Centered */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="w-full text-center"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold mb-3 font-heading">
              <span className="gradient-text">About Me</span>
            </h2>
            <p className="text-[#9ca3b0] text-lg">The story behind the code</p>
          </motion.div>

          {/* Visual — AI Portrait with glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-[340px] h-[400px] mx-auto"
          >
            {/* Glow backdrop */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(var(--neon-rgb),0.15) 0%, rgba(123,47,247,0.10) 40%, transparent 70%)',
                filter: 'blur(40px)',
                transform: 'scale(1.3)',
              }}
            />

            <div
              className="relative w-full h-full rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(10,10,15,0.6)',
                backdropFilter: 'blur(12px)',
                boxShadow:
                  '0 0 60px rgba(var(--neon-rgb), 0.08), 0 0 120px rgba(123,47,247,0.06)',
              }}
            >
              <img
                src="/images/profile.png"
                alt="Sushant Kumar Profile"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: "grayscale(100%) contrast(1.2) drop-shadow(0 0 30px rgba(255, 255, 224, 0.45))",
                  mixBlendMode: "luminosity",
                }}
              />

              {/* Scan line effect */}
              <div
                className="absolute left-0 w-full h-[1px] opacity-10"
                style={{
                  background: 'linear-gradient(90deg, transparent, var(--color-neon), transparent)',
                  animation: 'scan-line 4s linear infinite',
                }}
              />
            </div>

            {/* Floating decorative particles */}
            <div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-neon/15 animate-float" />
            <div className="absolute -bottom-3 -left-3 w-4 h-4 rounded-full bg-purple/15 animate-float" style={{ animationDelay: '1s' }} />
          </motion.div>

          {/* Stats row under the portrait */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 w-[340px] mx-auto"
          >
            {[
              { num: '15+', label: 'Projects' },
              { num: '5+', label: 'Certifications' },
              { num: '3+', label: 'Internships' },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-4 rounded-xl border border-white/5"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <p
                  className="text-2xl font-extrabold mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #f5d778)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.num}
                </p>
                <p className="text-xs text-[#9ca3b0]">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ═══ RIGHT COLUMN — Scrollable Storytelling Cards ═══ */}
        <div ref={cardsContainerRef} className="w-full lg:w-[750px] shrink-0 flex flex-col relative pb-32 pt-16">
          {storyBlocks.map((block, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="relative rounded-2xl border border-white/5 transition-colors duration-1000"
              style={{
                position: 'sticky',
                top: `${158 + i * 70}px`, // Stacks elegantly
                zIndex: i,
                // marginBottom: i === storyBlocks.length - 1 ? '0' : '45vh', // Much more scroll space
                marginBottom:
                  i === storyBlocks.length - 1
                    ? '0'
                    : i === storyBlocks.length - 2
                      ? '8vh'
                      : '18vh',
                background: 'rgba(15,15,20,0.85)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 -8px 40px rgba(0,0,0,0.5)', // Upward shadow for overlap separation
                padding: '32px 44px',
                minHeight: '260px', // Slightly taller text div
              }}
            >
              {/* Golden accent line at top */}
              <div
                className="absolute top-0 left-10 right-10 h-[1px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                  opacity: 0.4,
                }}
              />

              {/* Calligraphic Heading — centered */}
              <h3
                className="text-3xl md:text-4xl mb-6 text-center"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: '#D4AF37',
                  textShadow: '0 0 30px rgba(212,175,55,0.15)',
                }}
              >
                {block.heading}
              </h3>

              {/* Content — full width, no maxWidth cap */}
              <div className="about-card-content">
                <p
                  className="text-lg md:text-xl leading-[1.85]"
                  style={{ color: '#c8cad0' }}
                >
                  {block.content}
                </p>
              </div>

              {/* Subtle side glow */}
              <div
                className="absolute -left-[1px] top-1/4 bottom-1/4 w-[2px] rounded-full"
                style={{
                  background: 'linear-gradient(180deg, transparent, #D4AF37, transparent)',
                  opacity: 0.3,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
