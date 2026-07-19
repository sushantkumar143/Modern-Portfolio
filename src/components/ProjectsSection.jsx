import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { FiGithub, FiExternalLink, FiMaximize2, FiX } from 'react-icons/fi';

const categories = ["All", "Data Science", "Machine Learning", "AI", "DevOps", "IT"];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedProject, setExpandedProject] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 940px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const filteredProjects = activeCategory === "All"
    ? projects.slice(0, 5)
    : projects.filter(p => p.categories?.includes(activeCategory));

  return (
    <section id="projects" className="section-padding relative" ref={ref} style={{ padding: isMobile ? '60px 4% 80px' : '100px 6% 120px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{
            fontSize: '3.2rem', fontWeight: 800,
            fontFamily: "'Outfit', sans-serif", marginBottom: '18px',
          }}>
            <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ color: '#9ca3b0', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>Things I've built</p>
        </motion.div>

        {/* Categories Navbar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            flexWrap: isMobile ? 'nowrap' : 'wrap',
            justifyContent: isMobile ? 'flex-start' : 'center',
            gap: isMobile ? '8px' : '12px',
            marginBottom: isMobile ? '24px' : '40px',
            overflowX: isMobile ? 'auto' : 'visible',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: isMobile ? '8px' : '0',
          }}
        >
          {categories.map((cat, i) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={i}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: isMobile ? '10px 18px' : '12px 28px',
                  borderRadius: '50px',
                  fontSize: isMobile ? '0.8rem' : '0.95rem',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
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
                data-lenis-prevent="true"
                style={{
                  position: isMobile ? 'relative' : 'sticky',
                  top: isMobile ? 'auto' : `calc(120px + ${index * 60}px)`,
                  width: isMobile ? '100%' : '85%',
                  margin: '0 auto',
                  height: isMobile ? 'auto' : '75vh',
                  minHeight: isMobile ? 'auto' : '600px',
                  maxHeight: isMobile ? 'none' : '900px',
                  marginBottom: isMobile ? '24px' : '140px',
                  background: 'rgba(12, 12, 18, 1)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: isMobile ? '16px' : '24px',
                  boxShadow: isMobile ? '0 4px 20px rgba(0,0,0,0.4)' : '0 -15px 40px rgba(0,0,0,0.6), 0 0 20px rgba(var(--neon-rgb), 0.05)',
                  overflowY: isMobile ? 'visible' : 'auto',
                  overscrollBehavior: 'contain',
                  display: 'flex',
                  flexDirection: 'column',
                  zIndex: index,
                }}
                className="project-card-scroll"
              >
                {/* Top Bar */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? '12px' : '0',
                  padding: isMobile ? '16px 20px' : '24px 40px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}>
                  {/* Big Number */}
                  <span style={{
                    fontSize: isMobile ? '2.5rem' : '4.5rem',
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
                        padding: isMobile ? '10px 16px' : '12px 24px', borderRadius: '50px',
                        background: 'rgba(255,255,255,0.05)',
                        color: '#e4e4e7', fontSize: isMobile ? '0.8rem' : '0.95rem', fontWeight: 600,
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
                  flexDirection: isMobile ? 'column' : 'row',
                  flex: 1,
                  padding: isMobile ? '16px 20px 24px' : '24px 40px 40px',
                  gap: isMobile ? '20px' : '40px',
                  overflowY: 'visible'
                }}>
                  {/* Left Column: Image + Date */}
                  <div style={{
                    flex: isMobile ? 'none' : '0 0 55%',
                    width: isMobile ? '100%' : 'auto',
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
            padding: isMobile ? '16px' : '40px'
          }}
          onClick={() => setExpandedProject(null)}
        >
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            style={{
              width: isMobile ? '100%' : '90%',
              maxWidth: '1000px',
              maxHeight: isMobile ? '95vh' : '90vh',
              background: 'rgba(12, 12, 18, 0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: isMobile ? '16px' : '24px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 30px rgba(var(--neon-rgb), 0.1)',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
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
              padding: isMobile ? '20px' : '24px 40px',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
              <h3 style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
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
              flexDirection: 'column',
              padding: isMobile ? '20px' : '40px',
              gap: isMobile ? '20px' : '30px',
            }}>
              {/* Image */}
              <div style={{
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.05)',
                background: '#0a0a0f'
              }}>
                <img
                  src={expandedProject.image}
                  alt={expandedProject.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Deep Description or Fallback */}
              {expandedProject.deepDescription ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Brief overview */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(var(--neon-rgb), 0.06), rgba(123, 47, 247, 0.06))',
                    border: '1px solid rgba(var(--neon-rgb), 0.15)',
                    padding: '24px',
                    borderRadius: '16px',
                  }}>
                    <p style={{ color: '#d1d5db', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                      {expandedProject.description}
                    </p>
                  </div>

                  {/* Render each deep description section */}
                  {expandedProject.deepDescription.map((section, sIdx) => (
                    <div key={sIdx} style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                    }}>
                      {/* Section Header */}
                      <div style={{
                        padding: '16px 24px',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        background: 'rgba(255,255,255,0.02)',
                      }}>
                        <h4 style={{
                          fontSize: '1.2rem',
                          fontWeight: 700,
                          fontFamily: "'Outfit', sans-serif",
                          color: '#fff',
                          margin: 0,
                        }}>
                          {section.title}
                        </h4>
                        {section.text && (
                          <p style={{ color: '#9ca3b0', fontSize: '0.92rem', lineHeight: 1.6, margin: '8px 0 0' }}>
                            {section.text}
                          </p>
                        )}
                      </div>

                      {/* Section Content */}
                      <div style={{ padding: '20px 24px' }}>
                        {/* Items layout (Key Features, Deployment, Evaluation) */}
                        {section.items && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {section.items.map((item, iIdx) => (
                              <div key={iIdx} style={{
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'flex-start',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.04)',
                                transition: 'all 0.3s ease',
                              }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(var(--neon-rgb), 0.04)';
                                  e.currentTarget.style.borderColor = 'rgba(var(--neon-rgb), 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
                                }}
                              >
                                <span style={{
                                  color: 'var(--color-neon)',
                                  fontSize: '1.1rem',
                                  lineHeight: 1,
                                  marginTop: '3px',
                                  flexShrink: 0,
                                }}>▸</span>
                                <div>
                                  <span style={{
                                    fontWeight: 700,
                                    color: '#e4e4e7',
                                    fontSize: '0.95rem',
                                    fontFamily: "'Outfit', sans-serif",
                                  }}>{item.label}</span>
                                  <span style={{ color: '#6b7280', margin: '0 8px' }}>—</span>
                                  <span style={{
                                    color: '#9ca3b0',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.6,
                                  }}>{item.text}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Agents table layout */}
                        {section.agents && (
                          <div style={{ overflowX: 'auto' }}>
                            <table style={{
                              width: '100%',
                              borderCollapse: 'separate',
                              borderSpacing: '0 6px',
                            }}>
                              <thead>
                                <tr>
                                  {['Agent', 'Responsibility', 'Model'].map((h) => (
                                    <th key={h} style={{
                                      textAlign: 'left',
                                      padding: '10px 14px',
                                      color: 'var(--color-neon)',
                                      fontSize: '0.8rem',
                                      fontWeight: 700,
                                      textTransform: 'uppercase',
                                      letterSpacing: '1.5px',
                                      borderBottom: '1px solid rgba(var(--neon-rgb), 0.15)',
                                    }}>{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {section.agents.map((agent, aIdx) => (
                                  <tr key={aIdx} style={{
                                    transition: 'all 0.2s ease',
                                  }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = 'rgba(var(--neon-rgb), 0.04)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = 'transparent';
                                    }}
                                  >
                                    <td style={{
                                      padding: '10px 14px',
                                      fontWeight: 700,
                                      color: '#e4e4e7',
                                      fontSize: '0.9rem',
                                      fontFamily: "'Outfit', sans-serif",
                                      whiteSpace: 'nowrap',
                                      borderRadius: '8px 0 0 8px',
                                    }}>{agent.name}</td>
                                    <td style={{
                                      padding: '10px 14px',
                                      color: '#9ca3b0',
                                      fontSize: '0.85rem',
                                      lineHeight: 1.5,
                                    }}>{agent.role}</td>
                                    <td style={{
                                      padding: '10px 14px',
                                      borderRadius: '0 8px 8px 0',
                                    }}>
                                      <span style={{
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.78rem',
                                        fontWeight: 600,
                                        background: agent.model === 'N/A'
                                          ? 'rgba(255,255,255,0.05)'
                                          : 'rgba(123, 47, 247, 0.12)',
                                        color: agent.model === 'N/A' ? '#6b7280' : '#a78bfa',
                                        border: `1px solid ${agent.model === 'N/A' ? 'rgba(255,255,255,0.08)' : 'rgba(123, 47, 247, 0.25)'}`,
                                        whiteSpace: 'nowrap',
                                      }}>{agent.model}</span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Stages pipeline layout */}
                        {section.stages && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {section.stages.map((stage, sIdx2) => (
                              <div key={sIdx2} style={{
                                display: 'flex',
                                alignItems: 'stretch',
                                gap: '16px',
                              }}>
                                {/* Pipeline line */}
                                <div style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  width: '24px',
                                  flexShrink: 0,
                                  paddingTop: '16px',
                                }}>
                                  <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: 'var(--color-neon)',
                                    boxShadow: '0 0 8px rgba(var(--neon-rgb), 0.4)',
                                    flexShrink: 0,
                                  }} />
                                  {sIdx2 < section.stages.length - 1 && (
                                    <div style={{
                                      width: '2px',
                                      flex: 1,
                                      background: 'linear-gradient(to bottom, var(--color-neon), rgba(var(--neon-rgb), 0.1))',
                                      marginTop: '4px',
                                    }} />
                                  )}
                                </div>
                                {/* Stage content */}
                                <div style={{
                                  padding: '12px 16px',
                                  borderRadius: '12px',
                                  background: 'rgba(255,255,255,0.02)',
                                  border: '1px solid rgba(255,255,255,0.04)',
                                  flex: 1,
                                  marginBottom: '8px',
                                }}>
                                  <div style={{
                                    fontWeight: 700,
                                    color: '#e4e4e7',
                                    fontSize: '0.92rem',
                                    fontFamily: "'Outfit', sans-serif",
                                    marginBottom: '4px',
                                  }}>{stage.name}</div>
                                  <div style={{
                                    color: '#9ca3b0',
                                    fontSize: '0.85rem',
                                    lineHeight: 1.6,
                                  }}>{stage.detail}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Metrics cards layout */}
                        {section.metrics && (
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                            gap: '12px',
                          }}>
                            {section.metrics.map((m, mIdx) => {
                              const colors = ['#00d4ff', '#a78bfa', '#34d399', '#f59e0b', '#f472b6'];
                              const accentColor = colors[mIdx % colors.length];
                              return (
                                <div key={mIdx} style={{
                                  padding: '16px',
                                  borderRadius: '14px',
                                  background: 'rgba(255,255,255,0.02)',
                                  border: `1px solid ${accentColor}22`,
                                  textAlign: 'center',
                                  transition: 'all 0.3s ease',
                                }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = `${accentColor}55`;
                                    e.currentTarget.style.background = `${accentColor}08`;
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = `${accentColor}22`;
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                  }}
                                >
                                  <div style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 800,
                                    fontFamily: "'Outfit', sans-serif",
                                    color: accentColor,
                                    marginBottom: '4px',
                                  }}>{m.value}</div>
                                  <div style={{
                                    fontSize: '0.82rem',
                                    fontWeight: 700,
                                    color: '#e4e4e7',
                                    marginBottom: '4px',
                                  }}>{m.metric}</div>
                                  <div style={{
                                    fontSize: '0.75rem',
                                    color: '#6b7280',
                                    lineHeight: 1.4,
                                  }}>{m.detail}</div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Fallback: plain description for projects without deepDescription */
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
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
                </div>
              )}

              {/* Tech Tags + Links (always shown) */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
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
