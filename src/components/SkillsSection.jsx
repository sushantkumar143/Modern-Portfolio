import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '../data/portfolioData';

// Extract all unique icons from all categories
const allIcons = [];
skillCategories.forEach(cat => {
  cat.skills.forEach(skill => {
    // We don't have explicit icons for every skill in portfolioData yet, 
    // so we'll use the category icon as a fallback, or we can use the first letter
    allIcons.push({
      name: skill.name,
      icon: cat.icon // using category icon for now since individual skills don't have icons in data
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

  return (
    <div ref={ref} className="mb-6 last:mb-0" style={{ display: 'flex', alignItems: 'center' }}>
      
      {/* Leftmost Larger Icon */}
      <div style={{ 
        marginRight: '20px', 
        fontSize: '1.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)',
        flexShrink: 0
      }}>
        {icon}
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

function SphereIconCloud() {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  // Make the sphere denser by tripling the icons
  const denseIcons = [...uniqueIcons, ...uniqueIcons, ...uniqueIcons].map((icon, i) => ({
    ...icon,
    id: i
  }));

  // Handle continuous rotation with momentum
  useEffect(() => {
    let animationFrameId;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      // Always apply auto-rotation (circular spinning)
      currentX += 0.012;
      currentY -= 0.018;

      // Apply velocity from mouse swipes (momentum)
      currentX += velocity.current.x;
      currentY += velocity.current.y;

      // Decay the velocity for smooth deceleration
      velocity.current.x *= 0.92;
      velocity.current.y *= 0.92;

      if (Math.abs(velocity.current.x) < 0.0001) velocity.current.x = 0;
      if (Math.abs(velocity.current.y) < 0.0001) velocity.current.y = 0;

      setRotation({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Track mouse movement and compute velocity for momentum
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      if (isHovering.current) {
        const dx = x - lastMouse.current.x;
        const dy = y - lastMouse.current.y;
        // Gentle momentum - follows cursor direction smoothly
        velocity.current.x += dy * 0.8;
        velocity.current.y -= dx * 0.8;
        // Cap max velocity so it never goes crazy
        velocity.current.x = Math.max(-0.3, Math.min(0.3, velocity.current.x));
        velocity.current.y = Math.max(-0.3, Math.min(0.3, velocity.current.y));
      }

      lastMouse.current = { x, y };
      isHovering.current = true;
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const radius = 210;
  
  const items = denseIcons.map((item, i) => {
    const N = denseIcons.length;
    
    // Distribute points evenly on a sphere
    const phi = Math.acos(1 - (2 * i) / N);
    const theta = Math.sqrt(N * Math.PI) * phi;
    
    // Convert spherical to cartesian coordinates
    let x = radius * Math.cos(theta) * Math.sin(phi);
    let y = radius * Math.sin(theta) * Math.sin(phi);
    let z = radius * Math.cos(phi);

    // Apply X-axis rotation
    const cosX = Math.cos(rotation.x);
    const sinX = Math.sin(rotation.x);
    let y1 = y * cosX - z * sinX;
    let z1 = y * sinX + z * cosX;
    y = y1;
    z = z1;

    // Apply Y-axis rotation
    const cosY = Math.cos(rotation.y);
    const sinY = Math.sin(rotation.y);
    let x1 = x * cosY + z * sinY;
    let z2 = -x * sinY + z * cosY;
    x = x1;
    z = z2;

    // Projection & Scaling (larger for items closer to the front)
    const scale = (radius + z) / (2 * radius); // Maps -radius..+radius to 0..1
    const opacity = 0.1 + 0.9 * scale; // Items in back fade out
    
    return {
      ...item,
      x, y, z, scale, opacity
    };
  });

  // Sort so items in the back render first (below front items)
  items.sort((a, b) => a.z - b.z);

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        height: '500px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'grab',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ position: 'relative', width: 0, height: 0 }}>
        {items.map((item, i) => {
          const isFront = item.z > 0;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${item.x}px`,
                top: `${item.y}px`,
                transform: `translate(-50%, -50%) scale(${item.scale * 1.0 + 0.35})`,
                opacity: item.opacity,
                zIndex: Math.floor(item.z + radius),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                width: '34px',
                height: '34px',
                // NO bounding boxes - clean floating icons
                background: 'none',
                border: 'none',
                borderRadius: 0,
                backdropFilter: 'none',
                boxShadow: 'none',
                filter: isFront 
                  ? `drop-shadow(0 0 6px rgba(0,212,255,0.6))` 
                  : `blur(${Math.max(0, -item.z / 40)}px)`,
                transition: 'opacity 0.05s linear',
                pointerEvents: 'none',
              }}
              title={item.name}
            >
              {item.icon}
            </div>
          );
        })}
      </div>
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
                    icon={skillCategories[activeCategory].icon} 
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
