// herosection.jsx


import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations, Float, OrbitControls, Environment } from '@react-three/drei';
import { personalInfo } from '../data/portfolioData';
import { FiGithub, FiLinkedin, FiDownload, FiArrowRight } from 'react-icons/fi';

/* ---------- 3D Geometric Robot (GLTF) ---------- */
function Robot3D() {
  const group = useRef();
  // Load the GLTF model from the public folder
  const { scene, animations } = useGLTF('/models/robot.glb');
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    // Play the first animation if it exists
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]].reset().fadeIn(0.5).play();
    }
    return () => {
      // Cleanup animations on unmount
      if (names.length > 0 && actions[names[0]]) {
        actions[names[0]].fadeOut(0.5);
      }
    };
  }, [actions, names]);

  return (
    <group ref={group} dispose={null}>
      {/* 
        Adjust scale and position as needed based on how the model was exported.
        You may need to tweak these values depending on the actual size of robot.glb
      */}
      <primitive object={scene} scale={2} position={[0, -1, 0]} />
    </group>
  );
}

// Preload the model for performance
useGLTF.preload('/models/robot.glb');
/* ---------- Typing Animation Hook ---------- */
function useTypingAnimation(words, typingSpeed = 100, deletingSpeed = 60, pauseTime = 1500) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setText(
          isDeleting
            ? currentWord.substring(0, text.length - 1)
            : currentWord.substring(0, text.length + 1)
        );
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}

/* ---------- Button hover states ---------- */
const btnPrimaryBase = {
  padding: '16px 40px',
  borderRadius: '50px',
  fontSize: '1rem',
  fontWeight: 700,
  letterSpacing: '0.5px',
  color: '#0a0a0f',
  background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
  boxShadow: '0 4px 25px rgba(0,212,255,0.35), 0 0 60px rgba(0,212,255,0.1)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
  border: 'none',
  textDecoration: 'none',
  minWidth: '200px',
  justifyContent: 'center',
};

const btnSecondaryBase = {
  padding: '16px 40px',
  borderRadius: '50px',
  fontSize: '1rem',
  fontWeight: 700,
  letterSpacing: '0.5px',
  color: '#00d4ff',
  background: 'transparent',
  border: '2px solid rgba(0,212,255,0.4)',
  boxShadow: '0 0 20px rgba(0,212,255,0.1)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
  textDecoration: 'none',
  minWidth: '200px',
  justifyContent: 'center',
};

/* ---------- Hero Section ---------- */
export default function HeroSection() {
  const typedText = useTypingAnimation(personalInfo.roles);
  const heroRef = useRef(null);

  // Scroll progress for other potential parallax, robot is now static relative to Hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 6% 80px',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '15%', left: '10%',
          width: '500px', height: '500px', borderRadius: '50%', opacity: 0.08,
          background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '5%',
          width: '400px', height: '400px', borderRadius: '50%', opacity: 0.08,
          background: 'radial-gradient(circle, #7b2ff7 0%, transparent 70%)',
        }} />
      </div>

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
      }}>

        {/* Left Column – Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ padding: '20px 0' }}
        >
          {/* Greeting */}
          <p style={{
            color: '#9ca3b0',
            fontSize: '1.15rem',
            marginBottom: '12px',
            letterSpacing: '2px',
            fontWeight: 400,
          }}>
            👋 Hello, I'm
          </p>

          {/* Name */}
          <h1 style={{
            fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '20px',
            fontFamily: "'Outfit', sans-serif",
          }}>
            <span className="gradient-text">{personalInfo.name}</span>
          </h1>

          {/* Typed role */}
          <div style={{
            fontSize: '1.4rem',
            marginBottom: '8px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span style={{ color: '#00d4ff', fontWeight: 600, letterSpacing: '0.5px' }}>
              {'< '}{typedText}
            </span>
            <span style={{
              display: 'inline-block', width: '3px', height: '28px',
              background: '#00d4ff', marginLeft: '4px', borderRadius: '2px',
              animation: 'typing-cursor 0.8s ease infinite',
            }} />
            <span style={{ color: '#00d4ff', fontWeight: 600 }}>{' />'}</span>
          </div>

          {/* Tagline */}
          <p style={{
            color: '#9ca3b0',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            marginBottom: '40px',
            maxWidth: '520px',
          }}>
            {personalInfo.tagline}
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
            <a
              href="#contact"
              style={btnPrimaryBase}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 8px 35px rgba(0,212,255,0.5), 0 0 80px rgba(0,212,255,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 25px rgba(0,212,255,0.35), 0 0 60px rgba(0,212,255,0.1)';
              }}
            >
              Get In Touch <FiArrowRight size={18} />
            </a>
            <a
              href={personalInfo.resumeLink}
              style={btnSecondaryBase}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                e.currentTarget.style.background = 'rgba(0,212,255,0.08)';
                e.currentTarget.style.borderColor = '#00d4ff';
                e.currentTarget.style.boxShadow = '0 4px 25px rgba(0,212,255,0.25), 0 0 40px rgba(0,212,255,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.1)';
              }}
            >
              <FiDownload size={18} /> Download CV
            </a>
          </div>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '14px' }}>
            {[
              { href: personalInfo.socialLinks.github, icon: <FiGithub size={20} /> },
              { href: personalInfo.socialLinks.linkedin, icon: <FiLinkedin size={20} /> },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  border: '1px solid rgba(0,212,255,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#9ca3b0', transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00d4ff';
                  e.currentTarget.style.background = 'rgba(0,212,255,0.1)';
                  e.currentTarget.style.borderColor = '#00d4ff';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,212,255,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#9ca3b0';
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
        {/* Right Column – 3D Robot Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            height: '550px',
            width: '100%',
            position: 'relative',
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none' // Disable pointer events on wrapper
          }}
        >
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }} style={{ pointerEvents: 'auto' }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} />
            <directionalLight position={[-10, 10, -10]} intensity={0.5} />
            <Environment preset="city" />

            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              maxPolarAngle={Math.PI / 2 + 0.2} 
              minPolarAngle={Math.PI / 2 - 0.2}
            />

            <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5}>
              <group scale={3.5} position={[0, +4, 0]}>
                <Robot3D />
              </group>
            </Float>
          </Canvas>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute', bottom: '32px',
          left: '50%', transform: 'translateX(-50%)',
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div style={{
          width: '28px', height: '46px', borderRadius: '50px',
          border: '2px solid rgba(0,212,255,0.3)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          paddingTop: '8px',
        }}>
          <div style={{
            width: '4px', height: '10px', borderRadius: '4px',
            background: '#00d4ff',
          }} />
        </div>
      </motion.div>
    </section>
  );
}