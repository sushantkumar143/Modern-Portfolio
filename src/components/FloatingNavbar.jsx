import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings, FiLinkedin, FiGithub, FiInstagram, FiTwitter } from 'react-icons/fi';

/* 
 * Helper function to convert hex to rgb string: 
 * "#FF2D95" -> "255, 45, 149"
 */
function hexToRgbStr(hex) {
  let r = 0, g = 0, b = 0;
  // 3 digits
  if (hex.length === 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
  }
  // 6 digits
  else if (hex.length === 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }
  return `${+r}, ${+g}, ${+b}`;
}

const NAV_LINKS = [
  { id: 'linkedin', icon: FiLinkedin, href: 'https://linkedin.com/in/sushantkumar143' },
  { id: 'github', icon: FiGithub, href: 'https://github.com/sushantkumar143' },
  { id: 'instagram', icon: FiInstagram, href: 'https://instagram.com/sushantt_14`' },
  { id: 'twitter', icon: FiTwitter, href: 'https://twitter.com/sushantt_14' },
];

export default function FloatingNavbar() {
  const [isHovered, setIsHovered] = useState(false);
  const colorInputRef = useRef(null);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    const rgbStr = hexToRgbStr(newColor);

    // Update global CSS variables for the theme
    document.documentElement.style.setProperty('--color-neon', newColor);
    document.documentElement.style.setProperty('--neon-rgb', rgbStr);
  };

  const openColorPicker = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
      style={{
        position: 'fixed',
        top: '50%',
        left: '20px',
        transform: 'translateY(-50%)',
        zIndex: 9999, // Ensure it sits above sections
        width: '60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 0',
        gap: '24px',
        borderRadius: '40px',
        // background: isHovered ? 'rgba(var(--neon-rgb), 0.2)' : 'rgba(15, 15, 20, 0.4)',
        background: isHovered
          ? 'linear-gradient(180deg, rgba(10,10,15,0.9), rgba(var(--neon-rgb),0.08))'
          : 'rgba(120, 120, 130, 0.25)', // soft grey glass
        backdropFilter: 'blur(16px)',
        border: `1px solid ${isHovered ? 'rgba(var(--neon-rgb), 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
        boxShadow: isHovered
          ? '0 8px 32px rgba(0, 0, 0, 0.4)'
          : '0 8px 32px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hidden Color Picker */}
      <input
        type="color"
        ref={colorInputRef}
        onChange={handleColorChange}
        defaultValue="#00d4ff"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
      />

      {/* Settings / Theme Changer Icon */}
      <NavIcon
        icon={FiSettings}
        onClick={openColorPicker}
        tooltip="Change Theme"
        isHoveredContainer={isHovered}
      />

      {/* Divider */}
      <div style={{
        width: '24px',
        height: '1px',
        background: isHovered ? 'rgba(var(--neon-rgb), 0.3)' : 'rgba(255, 255, 255, 0.1)',
        transition: 'background 0.4s ease'
      }} />

      {/* Social Links */}
      {NAV_LINKS.map((link) => (
        <NavIcon
          key={link.id}
          icon={link.icon}
          href={link.href}
          tooltip={link.id.charAt(0).toUpperCase() + link.id.slice(1)}
          isHoveredContainer={isHovered}
        />
      ))}

    </motion.div>
  );
}

function NavIcon({ icon: Icon, href, onClick, tooltip }) {
  const [isHovered, setIsHovered] = useState(false);

  const innerContent = (
    <motion.div
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        background: isHovered ? 'rgba(var(--neon-rgb), 0.15)' : 'transparent',
        border: `1px solid ${isHovered ? 'rgba(var(--neon-rgb), 0.6)' : 'transparent'}`,
        color: isHovered ? 'var(--color-neon)' : 'rgba(255, 255, 255, 0.6)',
        boxShadow: isHovered ? '0 0 15px rgba(var(--neon-rgb), 0.4)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <Icon size={20} strokeWidth={isHovered ? 2.5 : 2} style={{ transition: 'all 0.3s ease' }} />

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              left: '52px',
              padding: '6px 12px',
              background: 'rgba(10, 10, 15, 0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(var(--neon-rgb), 0.3)',
              borderRadius: '8px',
              color: 'var(--color-neon)',
              fontSize: '12px',
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 600,
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
          >
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', background: 'transparent' }}>
        {innerContent}
      </a>
    );
  }

  return <div onClick={onClick}>{innerContent}</div>;
}
