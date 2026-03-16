import React, { useState, useRef, useEffect, Component, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '../data/portfolioData';

// Extract all unique icons from all categories
const allIcons = [];
skillCategories.forEach(cat => {
  cat.skills.forEach(skill => {
    // If the skill has a specific 3D model, map it. If not, use generic icon.
    allIcons.push({
      name: skill.name,
      icon: skill.icon || cat.icon
    });
  });
});

// Remove duplicates based on name
const uniqueIcons = allIcons.filter((icon, index, self) =>
  index === self.findIndex((t) => t.name === icon.name)
);

function SkillBar({ name, level, delay, icon }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  // Helper to render the specific icon format
  const renderIcon = () => {
    if (typeof icon === 'string') {
      if (icon.endsWith('.glb')) {
        return (
          <div className="w-full h-full relative" style={{ overflow: 'visible' }}>
            <Canvas camera={{ position: [0, 0, 4], fov: 40 }} style={{ position: 'absolute', inset: -10, width: 'calc(100% + 20px)', height: 'calc(100% + 20px)' }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[5, 5, 5]} intensity={2} />
              <Suspense fallback={null}>
                <MiniGlbIcon url={icon} isHovered={isHovered} />
              </Suspense>
            </Canvas>
          </div>
        );
      } else if (icon.endsWith('.png') || icon.endsWith('.jpg') || icon.endsWith('.svg')) {
        return (
          <img 
            src={icon} 
            alt={`${name} icon`} 
            className="w-8 h-8 object-contain transition-transform duration-300" 
            style={{ transform: isHovered ? 'scale(1.15) translateY(-2px)' : 'scale(1)' }}
          />
        );
      }
    }
    // Fallback for emoji or generic text icon
    return <span className="transition-transform duration-300" style={{ transform: isHovered ? 'scale(1.2)' : 'scale(1)' }}>{icon}</span>;
  };

  return (
    <div ref={ref} className="mb-6 last:mb-0" style={{ display: 'flex', alignItems: 'center' }}>

      {/* Leftmost Larger Icon */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          marginRight: '20px',
          fontSize: '1.8rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '54px',
          height: '54px',
          background: isHovered ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.05)',
          borderRadius: '12px',
          border: isHovered ? '1px solid rgba(0,212,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
          boxShadow: isHovered ? '0 0 15px rgba(0,212,255,0.2)' : 'none',
          flexShrink: 0,
          transition: 'all 0.3s ease',
          zIndex: 10,
        }}
      >
        {renderIcon()}
      </div>

      {/* Right Content: Title, Level, and Bar */}
      <div style={{ flex: 1 }}>
        <div className="flex justify-between items-center mb-2">
          <span
            className="text-base font-semibold tracking-wide"
            style={{ color: '#e4e4e7', fontFamily: "'Outfit', sans-serif" }}
          >
            {name}
          </span>
          <span
            className="text-sm font-bold"
            style={{ color: '#00d4ff' }}
          >
            {level}%
          </span>
        </div>

        <div
          className="w-full h-2.5 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)' }}
        >
          <motion.div
            className="h-full rounded-full relative"
            style={{
              background: 'linear-gradient(90deg, #00d4ff, #7b2ff7)',
              boxShadow: '0 0 10px rgba(0,212,255,0.4)',
            }}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${level}%` } : {}}
            transition={{ duration: 1.2, delay: delay * 0.1, ease: 'easeOut' }}
          >
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
              borderRadius: '999px'
            }} />
          </motion.div>
        </div>
      </div>

    </div>
  );
}

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Resize, Center } from '@react-three/drei';
import * as THREE from 'three';

// The URLs of the 3D models the user provided
const glbModels = [
  '/models/icons/react_logo.glb',
  '/models/icons/javascript_1.glb',
  '/models/icons/html-3d.glb',
  '/models/icons/css-3d.glb',
  '/models/icons/threejs.glb',
  '/models/icons/c.glb',
  '/models/icons/java.glb',
  '/models/icons/github.glb',
  '/models/icons/PowerBi.glb',
  '/models/icons/Excel.glb'
];

// Helper to render a miniature GLB block in the Progress Bar list
function MiniGlbIcon({ url, isHovered }) {
  const { scene } = useGLTF(url);
  const clonedScene = useRef(scene.clone(true));
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (isHovered) {
        meshRef.current.rotation.y += delta * 2.5; // fast spin on hover
      } else {
        meshRef.current.rotation.y += delta * 0.4; // slow idle spin
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <Resize scale={1.8}>
        <Center>
          <primitive object={clonedScene.current} />
        </Center>
      </Resize>
    </mesh>
  );
}

class IconErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.warn(`Could not load 3D model at ${this.props.url}:`, error.message);
  }
  render() {
    if (this.state.hasError) {
      // Fallback: A modern glowing placeholder for any models with deprecated GLTF extensions
      return (
        <group position={this.props.position}>
          <mesh>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.8} wireframe />
          </mesh>
        </group>
      );
    }
    return this.props.children;
  }
}

// A single 3D icon node on the globe
function IconNode({ position, url, name }) {
  const meshRef = useRef();

  // Safely attempt to load the GLTF model. If the file doesn't exist, it will throw, 
  // so normally this should be wrapped in ErrorBoundary or Suspense at the Canvas level.
  const { scene } = useGLTF(url);
  // Clone the scene so we can reuse the same model multiple times in the dense sphere without conflicts
  const clonedScene = useRef(scene.clone(true));

  useFrame((state, delta) => {
    if (meshRef.current) {
      // "automatically rotate those icons also slowly"
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        {/* Resize automatically scales arbitrary sized GLTFs to exactly the specified width/height */}
        <Resize scale={0.5}>
          <Center>
            <primitive object={clonedScene.current} />
          </Center>
        </Resize>
      </mesh>
    </group>
  );
}

// Pre-load all models
glbModels.forEach(url => useGLTF.preload(url));

// The main rotating sphere group containing all icons
function RotatingSphere({ icons }) {
  const groupRef = useRef();
  const { viewport } = useThree();

  // Momentum state
  const rotation = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // 1. Auto rotation
    rotation.current.x += delta * 0.2; // roughly matches 0.012 per frame at 60fps
    rotation.current.y -= delta * 0.3; // roughly matches 0.018 per frame

    // 2. Mouse swipe momentum
    if (!isHovering.current) {
      // Decay velocity when not dragging
      velocity.current.x *= 0.95;
      velocity.current.y *= 0.95;
    }

    rotation.current.x += velocity.current.x;
    rotation.current.y += velocity.current.y;

    // Apply to group
    groupRef.current.rotation.x = rotation.current.y; // Mouse Y controls X rotation
    groupRef.current.rotation.y = rotation.current.x; // Mouse X controls Y rotation
  });

  // Track mouse for momentum (using window events to mimic the old container logic within the canvas)
  useEffect(() => {
    const handlePointerDown = (e) => {
      isHovering.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      if (!isHovering.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;

      // Add velocity relative to screen size mapping
      velocity.current.x += (dx / window.innerWidth) * 2;
      velocity.current.y += (dy / window.innerHeight) * 2;

      // Cap velocity
      velocity.current.x = Math.max(-0.1, Math.min(0.1, velocity.current.x));
      velocity.current.y = Math.max(-0.1, Math.min(0.1, velocity.current.y));

      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isHovering.current = false;
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  return (
    <group ref={groupRef}>
      {icons.map((item, i) => {
        // Distribute the 10 models evenly across all the nodes in the dense sphere
        const modelUrl = glbModels[i % glbModels.length];
        return (
          <IconErrorBoundary key={i} position={item.position} url={modelUrl}>
            <Suspense fallback={null}>
              <IconNode url={modelUrl} position={item.position} name={item.name} />
            </Suspense>
          </IconErrorBoundary>
        );
      })}
    </group>
  );
}

function SphereIconCloud() {
  const containerRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  // Generate dense points on sphere exactly like before, but now producing 3D vectors
  const denseIcons = [...uniqueIcons, ...uniqueIcons, ...uniqueIcons].map((icon, i) => ({
    ...icon,
    id: i
  }));

  const radius = 3; // Three.js units (relative to camera)
  const items = denseIcons.map((item, i) => {
    const N = denseIcons.length;
    const phi = Math.acos(1 - (2 * i) / N);
    const theta = Math.sqrt(N * Math.PI) * phi;

    // Cartesian coordinates
    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    return {
      ...item,
      position: [x, y, z]
    };
  });

  // Fallback UI in case models fail to load
  if (hasError) {
    return <div className="text-red-500">Failed to load 3D models. Please check console.</div>;
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '500px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'grab',
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00d4ff" />
        <RotatingSphere icons={items} />
      </Canvas>
    </div>
  );
}

export default function SkillsSection() {
  // -1 represents the "All" category
  const [activeCategory, setActiveCategory] = useState(-1);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Create the combined categories array with "All" at the beginning
  const tabs = [{ name: 'All' }, ...skillCategories];

  return (
    <section
      id="skills"
      ref={ref}
      style={{ padding: '100px 6% 80px', position: 'relative' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Section Heading */}
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
            <span className="gradient-text">Skills & Technologies</span>
          </h2>
          <p style={{ color: '#9ca3b0', fontSize: '1.1rem' }}>My technical arsenal</p>
        </motion.div>

        {/* Category Selector Navbar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '50px',
          }}
        >
          {tabs.map((tab, index) => {
            // Adjust index to match our state (-1 for 'All', 0+ for real categories)
            const catIndex = index - 1;
            const isActive = activeCategory === catIndex;

            return (
              <button
                key={catIndex}
                onClick={() => setActiveCategory(catIndex)}
                style={{
                  padding: '12px 28px',
                  borderRadius: '50px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: isActive ? '1px solid rgba(0,212,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  background: isActive ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.03)',
                  color: isActive ? '#00d4ff' : '#9ca3b0',
                  boxShadow: isActive ? '0 0 20px rgba(0,212,255,0.15)' : 'none',
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
                {tab.name}
              </button>
            );
          })}
        </motion.div>

        {/* Content Area */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}
        >
          {activeCategory === -1 ? (
            /* "All" Tab - 3D Rotating Sphere */
            <SphereIconCloud />
          ) : (
            /* Specific Category - Skills Grid */
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '30px',
            }}>
              {skillCategories[activeCategory].skills.map((skill, i) => (
                <div
                  key={skill.name}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '20px',
                    padding: '30px',
                    transition: 'all 0.4s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(0,212,255,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <SkillBar
                    name={skill.name}
                    level={skill.level}
                    delay={i}
                    icon={skill.icon || skillCategories[activeCategory].icon}
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
