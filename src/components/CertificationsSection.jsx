import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';

function HoverBorderCard({ children, style, contentStyle, motionProps, className, onClick }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      {...motionProps}
      className={`hover-glow-card ${className || ''}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      style={{
        ...style,
        position: 'relative',
        borderRadius: style?.borderRadius || '24px'
      }}
    >
      <motion.div
        className="hover-glow-border"
        style={{
          background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(0,212,255,1) 0%, rgba(0,212,255,0.6) 30%, transparent 80%)`,
        }}
      />
      <div className="hover-glow-content" style={contentStyle}>
        {children}
      </div>
    </motion.div>
  );
}
import { certifications } from '../data/portfolioData';
import { FiExternalLink, FiX } from 'react-icons/fi';

export default function CertificationsSection() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

  // Set up horizontal scroll linked to vertical scroll
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  });

  // Calculate the total horizontal tracking distance based on number of cards
  const displayedCertifications = certifications.slice(0, 6);
  const totalCards = displayedCertifications.length;
  // We want to translate far enough to see all cards + the View All button
  // 42vw corresponds to the 40vw card + 2vw gap
  // Scroll just far enough so the View All button is fully visible at the right edge
  const slideDistance = (totalCards * 42) - 40;
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0vw", `-${slideDistance}vw`]);

  return (
    <>
      <section id="certifications" style={{ position: 'relative', background: '#0a0a0f' }}>

        {/* Magic scrolling container that is very tall to allow scrolling */}
        <div ref={scrollRef} style={{ height: `${(totalCards * 60) + 20}vh` }}>

          {/* This inner div STICKS to the screen while we scroll */}
          <div style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'hidden', // hides the overflowing horizontal cards
            padding: '0'
          }}>

            <div style={{ padding: '0 6%', marginBottom: '40px', textAlign: 'center' }}>
              <h2 style={{
                fontSize: '3rem', fontWeight: 800,
                fontFamily: "'Outfit', sans-serif", marginBottom: '8px',
              }}>
                <span className="gradient-text">Certifications</span>
              </h2>
              <p style={{ color: '#9ca3b0', fontSize: '1.1rem' }}>Professional credentials</p>
            </div>

            {/* Viewport for Cover Flow */}
            <div style={{
              width: '100vw',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              height: '550px',
              perspective: '1500px'
            }}>

              <motion.div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '40px', // Reduced gap
                  x: xTransform, // Framer Motion horizontal translate tied to scroll
                  width: 'max-content',
                  marginLeft: '30vw' // Start exactly centered (100vw - 40vw)/2
                }}
              >
                {displayedCertifications.map((cert, index) => {
                  return (
                    <HoverBorderCard
                      key={index}
                      motionProps={{
                        initial: { scaleX: 0.87, scaleY: 0.87 },
                        animate: { scaleX: 0.87, scaleY: 0.87 },
                        whileHover: { scaleX: 0.97, scaleY: 0.92 },
                        transition: { type: 'spring', stiffness: 300, damping: 30 }
                      }}
                      style={{
                        flexShrink: 0,
                        width: '40vw',
                        borderRadius: '24px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                        zIndex: 1
                      }}
                      contentStyle={{
                        background: 'rgba(28, 28, 38, 0.95)', // Lighter card background
                        border: '1px solid rgba(255,255,255,0.05)',
                        padding: '40px',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        borderRadius: '24px'
                      }}
                    >
                      {/* Top: Large Number & Course Name */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                        <span style={{
                          fontSize: '3rem',
                          fontWeight: 900,
                          fontFamily: "'Outfit', sans-serif",
                          background: 'linear-gradient(135deg, rgba(0,212,255,0.9), rgba(123,47,247,0.9))',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          lineHeight: 1,
                        }}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 style={{
                          fontSize: '1.6rem',
                          fontWeight: 700,
                          fontFamily: "'Outfit', sans-serif",
                          color: '#fff',
                          lineHeight: 1.3,
                          margin: 0
                        }}>
                          {cert.title}
                        </h3>
                      </div>

                      {/* Middle: Image */}
                      <div
                        style={{
                          width: '100%',
                          height: '350px', // Taller image for the wider card
                          borderRadius: '16px',
                          overflow: 'hidden',
                          marginBottom: '30px',
                          border: '1px solid rgba(255,255,255,0.05)',
                          position: 'relative',
                          cursor: 'pointer', // Indicate clickable
                        }}
                        onClick={() => setZoomedImage(cert)}
                      >
                        <motion.img
                          whileHover={{ scale: 1.05 }} // Zoom on hover of image
                          transition={{ duration: 0.3 }}
                          src={cert.image}
                          alt={cert.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {/* Overlay verification link button on the image */}
                        <a
                          href={cert.link}
                          target="_blank" rel="noreferrer"
                          style={{
                            position: 'absolute',
                            bottom: '12px', right: '12px',
                            display: 'flex', alignItems: 'center', gap: '6px',
                            background: 'rgba(10, 10, 15, 0.8)',
                            backdropFilter: 'blur(8px)',
                            padding: '8px 16px',
                            borderRadius: '50px',
                            color: '#00d4ff',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            border: '1px solid rgba(0,212,255,0.2)',
                            textDecoration: 'none'
                          }}
                        >
                          Verify <FiExternalLink />
                        </a>
                      </div>

                      {/* Below Image: Short description */}
                      <p style={{
                        color: '#9ca3b0',
                        fontSize: '0.95rem',
                        lineHeight: 1.5,
                        marginBottom: 'auto', // pushes the bottom row down
                        paddingBottom: '24px'
                      }}>
                        {cert.description}
                      </p>

                      {/* Bottom: Org and Date */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        paddingTop: '20px',
                        marginTop: 'auto'
                      }}>
                        <span style={{ color: '#e4e4e7', fontWeight: 600, fontSize: '0.9rem' }}>
                          {cert.issuer}
                        </span>
                        <span style={{
                          color: '#7b2ff7',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          background: 'rgba(123, 47, 247, 0.1)',
                          padding: '4px 12px',
                          borderRadius: '50px'
                        }}>
                          {cert.year}
                        </span>
                      </div>
                    </HoverBorderCard>
                  );
                })}

                {/* View All Card at the end of the scroll */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  style={{
                    flexShrink: 0,
                    width: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '15vw' // leave space at the end to stop scroll neatly
                  }}
                >
                  <button
                    onClick={() => setShowAll(true)}
                    style={{
                      padding: '16px 32px',
                      borderRadius: '50px',
                      background: 'rgba(0,212,255,0.05)',
                      border: '1px solid rgba(0,212,255,0.3)',
                      color: '#00d4ff',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0,212,255,0.1)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0,212,255,0.05)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    View All Credentials
                  </button>
                </motion.div>

              </motion.div>
            </div>
          </div>
        </div>
      </section>



      {/* Full-Screen Blur Modal */}
      {showAll && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 9999,
            background: 'rgba(10, 10, 15, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px'
          }}
          onClick={() => setShowAll(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              width: '100%',
              maxWidth: '1400px',
              height: '90vh',
              background: 'rgba(12, 12, 18, 0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 40px rgba(0,212,255,0.15)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '30px 50px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(255,255,255,0.02)'
            }}>
              <h3 style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                fontFamily: "'Outfit', sans-serif",
                color: '#fff',
                lineHeight: 1,
              }}>
                <span className="gradient-text">All Certifications</span>
              </h3>

              <button
                onClick={() => setShowAll(false)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '50px', height: '50px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#e4e4e7', border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer', transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                <FiX size={28} />
              </button>
            </div>

            {/* Modal Body (Scrollable Grid) */}
            <div 
              className="cert-modal-scroll"
              style={{
                flex: 1,
                padding: '50px',
                overflowY: 'auto',
                overscrollBehavior: 'contain'
              }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                gap: '40px'
              }}>
                {certifications.map((cert, index) => (
                  <HoverBorderCard
                    key={index}
                    style={{
                      borderRadius: '20px',
                    }}
                    contentStyle={{
                      background: 'rgb(28, 28, 38)', // Lighter card background
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '20px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%'
                    }}
                  >
                    <h4 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '16px', minHeight: '56px' }}>
                      {cert.title}
                    </h4>

                    <div style={{ width: '100%', height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px', position: 'relative' }}>
                      <img src={cert.image} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <a
                        href={cert.link} target="_blank" rel="noreferrer"
                        style={{
                          position: 'absolute', bottom: '10px', right: '10px',
                          display: 'flex', alignItems: 'center', gap: '6px',
                          background: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(8px)',
                          padding: '6px 14px', borderRadius: '50px',
                          color: '#00d4ff', fontSize: '0.8rem', fontWeight: 600,
                          border: '1px solid rgba(0,212,255,0.2)', textDecoration: 'none'
                        }}
                      >Verify <FiExternalLink /></a>
                    </div>

                    <p style={{ color: '#9ca3b0', fontSize: '0.9rem', marginBottom: '20px', flex: 1 }}>{cert.description}</p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                      <span style={{ color: '#e4e4e7', fontWeight: 600, fontSize: '0.9rem' }}>{cert.issuer}</span>
                      <span style={{ color: '#7b2ff7', fontWeight: 700, fontSize: '0.9rem' }}>{cert.year}</span>
                    </div>
                  </HoverBorderCard>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(10, 10, 15, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px'
          }}
          onClick={() => setZoomedImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomedImage(null)}
              style={{
                position: 'absolute', top: '-20px', right: '-20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer', zIndex: 10
              }}
            >
              <FiX size={24} />
            </button>
            <img
              src={zoomedImage.image}
              alt={zoomedImage.title}
              style={{
                width: '100%', height: '100%',
                maxHeight: '85vh', objectFit: 'contain',
                borderRadius: '16px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.8)'
              }}
            />
          </motion.div>
        </div>
      )}

      {/* Custom Styles for Scrollbars and Glow Cards */}
      <style>{`
        .hover-glow-card {
          position: relative;
        }
        .hover-glow-border {
          position: absolute;
          inset: -3px; /* Increased border thickness */
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        .hover-glow-card:hover .hover-glow-border {
          opacity: 1;
        }
        .hover-glow-content {
          position: relative;
          z-index: 1;
          height: 100%;
          border-radius: inherit;
          transition: box-shadow 0.3s ease;
        }
        /* Inner shadow when shining */
        .hover-glow-card:hover .hover-glow-content {
          box-shadow: inset 0 0 40px rgba(0, 212, 255, 0.1);
        }

        /* Falling star / neon fade style scrollbar */
        .cert-modal-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .cert-modal-scroll::-webkit-scrollbar-track {
          background: rgba(10, 10, 15, 0.4);
          border-radius: 10px;
        }
        .cert-modal-scroll::-webkit-scrollbar-thumb {
          background-image: 
            radial-gradient(circle at center calc(100% - 4px), #ffffff 0%, #00d4ff 4px, transparent 4px),
            linear-gradient(to bottom, transparent 0%, rgba(0,212,255,0.05) 20%, #00d4ff 100%);
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,212,255,0.5);
        }
        .cert-modal-scroll::-webkit-scrollbar-thumb:hover {
          background-image: 
            radial-gradient(circle at center calc(100% - 4px), #ffffff 0%, #00d4ff 4px, transparent 4px),
            linear-gradient(to bottom, transparent 0%, rgba(0,212,255,0.1) 20%, #00d4ff 100%);
          box-shadow: 0 0 15px rgba(0,212,255,0.8);
        }
      `}</style>
    </>
  );
}
