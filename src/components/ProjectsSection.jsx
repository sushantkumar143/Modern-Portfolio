import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { FiGithub, FiExternalLink, FiMaximize2, FiX } from 'react-icons/fi';

const categories = ["All", "Data Science", "Machine Learning", "AI", "DevOps", "IT"];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedProject, setExpandedProject] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredProjects = activeCategory === "All"
    ? projects.slice(0, 5)
    : projects.filter(p => p.categories?.includes(activeCategory));

  return (
    <section id="projects" className="section-padding relative" ref={ref} style={{ padding: '100px 6% 120px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{
            fontSize: '3rem', fontWeight: 800,
            fontFamily: "'Outfit', sans-serif", marginBottom: '8px',
          }}>
            <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ color: '#9ca3b0', fontSize: '1.1rem' }}>Things I've built</p>
        </motion.div>

        {/* Categories Navbar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '40px', // Reduced gap before first project
          }}
        >
          {categories.map((cat, i) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={i}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '12px 28px',
                  borderRadius: '50px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: isActive ? '1px solid rgba(var(--neon-rgb), 0.4)' : '1px solid rgba(255,255,255,0.08)',
                  background: isActive ? 'rgba(var(--neon-rgb), 0.1)' : 'rgba(255,255,255,0.03)',
                  color: isActive ? 'var(--color-neon)' : '#9ca3b0',
                  boxShadow: isActive ? '0 0 20px rgba(var(--neon-rgb), 0.15)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#e4e4e7';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#9ca3b0';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Projects List with Sticky Stacking */}
        <div style={{ position: 'relative', paddingBottom: '100px' }}>
          {filteredProjects.map((project, index) => {
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  position: 'sticky',
                  top: `calc(120px + ${index * 60}px)`, // Increased to ~60px (1.5cm) gap so previous number shows half
                  width: '85%', // Takes ~85% of container width
                  margin: '0 auto', // centered
                  height: '75vh',
                  minHeight: '600px',
                  maxHeight: '900px',
                  marginBottom: '140px',
                  background: 'rgba(12, 12, 18, 1)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '24px',
                  boxShadow: '0 -15px 40px rgba(0,0,0,0.6), 0 0 20px rgba(var(--neon-rgb), 0.05)',
                  overflowY: 'auto',
                  overscrollBehavior: 'contain',
                  display: 'flex',
                  flexDirection: 'column',
                  zIndex: index, // Ensure stacking order
                }}
                className="project-card-scroll"
              >
                {/* Top Bar */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '24px 40px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}>
                  {/* Big Number */}
                  <span style={{
                    fontSize: '4.5rem',
                    fontWeight: 900,
                    fontFamily: "'Outfit', sans-serif",
                    background: 'linear-gradient(135deg, var(--color-neon), #7b2ff7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1,
                  }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div style={{ display: 'flex', gap: '16px' }}>
                    <a
                      href={project.github}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '12px 24px', borderRadius: '50px',
                        background: 'rgba(255,255,255,0.05)',
                        color: '#e4e4e7', fontSize: '0.95rem', fontWeight: 600,
                        transition: 'all 0.3s ease',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                    >
                      <FiGithub size={20} /> Code
                    </a>
                    <button
                      onClick={() => setExpandedProject(project)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '12px 24px', borderRadius: '50px',
                        background: 'linear-gradient(135deg, var(--color-neon), #7b2ff7)',
                        color: '#fff', fontSize: '0.95rem', fontWeight: 600,
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(var(--neon-rgb), 0.3)',
                        border: 'none', cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(var(--neon-rgb), 0.4)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(var(--neon-rgb), 0.3)'; }}
                    >
                      <FiMaximize2 size={20} /> Expand
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div style={{
                  display: 'flex',
                  flex: 1,
                  padding: '24px 40px 40px', // Reduced top padding
                  gap: '40px',
                  overflowY: 'visible' // Let the parent card handle the main scroll
                }}>
                  {/* Left Column: Image + Date */}
                  <div style={{
                    flex: '0 0 55%', // Take exactly 55% of space
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px', // Space between image and date
                    alignSelf: 'start'
                  }}>
                    {/* Image Container */}
                    <div style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      position: 'relative',
                      border: '1px solid rgba(255,255,255,0.05)',
                      aspectRatio: '16/9', // Force landscape ratio
                      width: '100%'
                    }}>
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      {/* Overlay gradient for premium look */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        pointerEvents: 'none'
                      }} />
                    </div>

                    {/* Date bottom left */}
                    <div style={{
                      alignSelf: 'flex-start',
                      background: 'rgba(255,255,255,0.03)',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      color: 'var(--color-neon)',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      fontFamily: "'Outfit', sans-serif",
                      letterSpacing: '1px'
                    }}>
                      {project.date || "2024"}
                    </div>
                  </div>

                  {/* Right: Info */}
                  <div style={{
                    flex: '1', // Take remaining space
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start' // align to top
                  }}>
                    <h3 style={{
                      fontSize: '1.8rem',
                      fontWeight: 800,
                      fontFamily: "'Outfit', sans-serif",
                      color: '#fff',
                      marginBottom: '20px',
                      lineHeight: 1.3,
                      wordWrap: 'break-word'
                    }}>
                      {project.title}
                    </h3>

                    <div style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      padding: '24px',
                      borderRadius: '16px',
                      marginBottom: '30px',
                      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
                    }}>
                      <p style={{
                        color: '#9ca3b0',
                        fontSize: '1rem',
                        lineHeight: 1.6
                      }}>
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Boxes */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {project.tech.map(t => (
                        <span key={t} style={{
                          padding: '8px 16px',
                          background: 'rgba(var(--neon-rgb), 0.05)',
                          border: '1px solid rgba(var(--neon-rgb), 0.2)',
                          color: 'var(--color-neon)',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          letterSpacing: '0.5px'
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Expand Modal */}
      {expandedProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(10, 10, 15, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px'
          }}
          onClick={() => setExpandedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            style={{
              width: '90%',
              maxWidth: '1200px',
              maxHeight: '90vh',
              background: 'rgba(12, 12, 18, 0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 30px rgba(var(--neon-rgb), 0.1)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '24px 40px',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: 800,
                fontFamily: "'Outfit', sans-serif",
                color: '#fff',
                lineHeight: 1,
              }}>
                {expandedProject.title}
              </h3>

              <button
                onClick={() => setExpandedProject(null)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#e4e4e7', border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer', transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{
              display: 'flex',
              flex: 1,
              padding: '40px',
              gap: '40px',
              flexWrap: 'wrap',
              overflowY: 'auto'
            }}>
              {/* Image */}
              <div style={{
                flex: '1 1 500px',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.05)',
                minHeight: '300px'
              }}>
                <img
                  src={expandedProject.image}
                  alt={expandedProject.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Info */}
              <div style={{
                flex: '1 1 300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  padding: '24px',
                  borderRadius: '16px',
                  marginBottom: '30px',
                }}>
                  <p style={{ color: '#e4e4e7', fontSize: '1.1rem', lineHeight: 1.6 }}>
                    {expandedProject.description}
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
                  {expandedProject.tech.map(t => (
                    <span key={t} style={{
                      padding: '8px 16px',
                      background: 'rgba(0,212,255,0.05)',
                      border: '1px solid rgba(0,212,255,0.2)',
                      color: '#00d4ff',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <a
                    href={expandedProject.github}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '12px 24px', borderRadius: '50px',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#e4e4e7', fontSize: '0.95rem', fontWeight: 600,
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <FiGithub size={20} /> Code
                  </a>
                  <a
                    href={expandedProject.live}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '12px 24px', borderRadius: '50px',
                      background: 'linear-gradient(135deg, var(--color-neon), #7b2ff7)',
                      color: '#fff', fontSize: '0.95rem', fontWeight: 600,
                    }}
                  >
                    <FiExternalLink size={20} /> Live Preview
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      <style>{`
        .project-card-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .project-card-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
        }
        .project-card-scroll::-webkit-scrollbar-thumb {
          background: rgba(var(--neon-rgb), 0.3);
          border-radius: 8px;
        }
        .project-card-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(var(--neon-rgb), 0.6);
        }
      `}</style>
    </section>
  );
}
