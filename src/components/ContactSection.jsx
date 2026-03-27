import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
// removed three.js imports
import {
  FiSend, FiMail, FiUser, FiMessageCircle,
  FiGithub, FiLinkedin, FiTwitter, FiMapPin, FiPhone, FiArrowRight,
  FiSun, FiMoon
} from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';

/* ─────────────────────────────────────────
   IndiaMap — loads Leaflet from CDN
───────────────────────────────────────── */
import { mapLocations } from '../data/ContactMe';

function IndiaMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (window.L) { setLoaded(true); return; }
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(css);
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
    return () => { document.head.removeChild(css); document.head.removeChild(script); };
  }, []);

  useEffect(() => {
    if (!loaded || !mapRef.current || mapInstanceRef.current) return;
    const L = window.L;
    const map = L.map(mapRef.current, {
      center: [23.5, 81.0],
      zoom: 5, minZoom: 4, maxZoom: 18,
      scrollWheelZoom: true, zoomControl: false, attributionControl: false,
    });
    mapInstanceRef.current = map;
    L.control.zoom({ position: 'topright' }).addTo(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

    function createIcon(loc) {
      const c = loc.color || '#7b2ff7';
      const isSpecial = loc.type === 'home' || loc.type === 'current';
      const size = isSpecial ? 30 : 22;

      const pinPath = "M20,2C12.3,2,6,8.3,6,16c0,10.5,14,22,14,22s14-11.5,14-22C34,8.3,27.7,2,20,2z";

      return L.divIcon({
        html: `
          <div style="position:relative; width:${size}px; height:${size}px; display:flex; items-center; justify-center;">
            ${isSpecial ? `
              <div style="position:absolute; inset:-25%; border-radius:50%; background:${c}; opacity:0.25; animation:pulse-ring 2s infinite;"></div>
            ` : ''}
            <svg viewBox="0 0 40 40" width="${size}" height="${size}" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); transition: transform 0.3s ease;">
              <path d="${pinPath}" fill="${c}" stroke="#fff" stroke-width="2" />
            </svg>
          </div>
        `,
        className: 'custom-pin-icon',
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size],
      });
    }

    function typeLabel(t) { return t === 'current' ? 'Current Location' : t === 'home' ? 'Home' : ''; }

    mapLocations.forEach((loc) => {
      const c = loc.color || '#7b2ff7';
      const label = typeLabel(loc.type);
      const marker = L.marker([loc.lat, loc.lng], { icon: createIcon(loc) }).addTo(map);
      const popupBg = isDarkMode ? '#f8f9fa' : 'rgba(10,15,30,0.95)';
      const popupTextMain = isDarkMode ? '#1a1a1a' : 'rgba(255,255,255,0.75)';
      const popupTextSub = isDarkMode ? '#71717a' : 'rgba(255,255,255,0.5)';

      marker.bindPopup(`
        <div style="background:${popupBg};backdrop-filter:blur(12px);border:1px solid ${c}33;border-radius:12px;padding:14px 16px;min-width:190px;font-family:Outfit,sans-serif;box-shadow:0 10px 25px rgba(0,0,0,0.2);">
          <p style="color:${c};font-size:14px;font-weight:700;margin:0;line-height:1.3">${loc.icon || ''} ${loc.name}</p>
          <p style="color:${popupTextSub};font-size:11px;margin:4px 0 0;letter-spacing:0.08em">${loc.year}</p>
          <p style="color:${popupTextMain};font-size:12px;margin:8px 0 0;line-height:1.4">${loc.description}</p>
          ${label ? `<div style="display:flex;align-items:center;gap:6px;margin-top:8px"><span style="width:6px;height:6px;border-radius:50%;background:${c};display:inline-block;animation:leafletPulse 1.5s infinite"></span><span style="color:${c};font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em">${label}</span></div>` : ''}
        </div>`, { className: 'dynamic-popup', closeButton: true });
    });

    /* Chronological route — starting from 2005(kahalgaon) -> current location (punjab) -> dhanbad */
    const pathOrder = ['kahalgaon', 'sipat', 'chandrapura', 'chennai', 'rajasthan', 'punjab', 'dhanbad'];
    const chronological = pathOrder.map(id => mapLocations.find(l => l.id === id)).filter(Boolean);

    chronological.forEach((loc, i) => {
      if (i === 0) return;
      const from = [chronological[i - 1].lat, chronological[i - 1].lng];
      const to = [loc.lat, loc.lng];
      setTimeout(() => {
        L.polyline([from, to], {
          color: loc.color || '#00FFFF', weight: 4, dashArray: '6 8',
          opacity: 1, className: 'animated-route glow-line',
        }).addTo(map);
      }, i * 400);
    });

    return () => { map.remove(); mapInstanceRef.current = null; };
  }, [loaded, isDarkMode]);

  return (
    <div className="w-full">
      <div className="relative w-full h-[650px] lg:h-[75vh] max-h-[850px] rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(var(--neon-rgb), 0.12)', boxShadow: '0 0 40px rgba(var(--neon-rgb), 0.06), 0 8px 32px rgba(0,0,0,0.4)' }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })}
      >
        <div ref={mapRef} style={{ width: '100%', height: '100%', background: '#0a0a0f' }} />

        {/* Theme Toggle Button */}
        <button
          onClick={(e) => { e.stopPropagation(); setIsDarkMode(!isDarkMode); }}
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            zIndex: 500,
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            background: 'rgba(10, 15, 30, 0.85)',
            border: '1px solid rgba(var(--neon-rgb), 0.3)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-neon)',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(10, 15, 30, 0.95)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(var(--neon-rgb), 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(10, 15, 30, 0.85)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          title={isDarkMode ? "Switch to Light Map" : "Switch to Dark Map"}
        >
          {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

        {/* Spotlight Overlay: White glow only in Dark mode */}
        {isDarkMode && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 400,
              backdropFilter: 'brightness(1.5)',
              WebkitBackdropFilter: 'brightness(1.5)',
              maskImage: `radial-gradient(160px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(160px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
            }}
          />
        )}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#f2efe9' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              style={{ width: 28, height: 28, border: '2px solid rgba(var(--neon-rgb), 0.2)', borderTopColor: 'var(--color-neon)', borderRadius: '50%' }} />
          </div>
        )}
        <style>{`
          .dynamic-popup .leaflet-popup-content-wrapper{background:transparent!important;box-shadow:none!important;border-radius:12px!important;padding:0!important}
          .dynamic-popup .leaflet-popup-content{margin:0!important}
          .dynamic-popup .leaflet-popup-tip{background:${isDarkMode ? '#f8f9fa' : 'rgba(10,15,30,0.95)'}!important;border:1px solid rgba(0,212,255,0.15)!important;box-shadow:none!important}
          .leaflet-popup-close-button{color:${isDarkMode ? '#1a1a1a' : 'rgba(255,255,255,0.4)'}!important;font-size:18px!important;top:6px!important;right:8px!important}
          .leaflet-popup-close-button:hover{color:#00d4ff!important}
          .leaflet-control-zoom a{background:rgba(10,15,30,0.85)!important;color:#fff!important;border:1px solid rgba(var(--neon-rgb),0.15)!important;backdrop-filter:blur(10px)}
          .leaflet-control-zoom a:hover{background:rgba(10,15,30,0.95)!important;color:var(--color-neon)!important}
          
          /* Dark/Light mode tile filters */
          ${isDarkMode
            ? '.leaflet-tile-pane { filter: invert(100%) hue-rotate(180deg) brightness(0.9) contrast(1.15); }'
            : '.leaflet-tile-pane { filter: brightness(0.8) contrast(1.2) grayscale(0.1); }'}
          .glow-line { filter: drop-shadow(0 0 8px currentColor); }

          .animated-route{animation:dashMove 1.5s linear infinite}
          @keyframes dashMove{to{stroke-dashoffset:-20}}
          @keyframes pulse-ring {
            0% { transform: scale(0.6); opacity: 0.6; }
            80%, 100% { transform: scale(1.6); opacity: 0; }
          }
          @keyframes leafletPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
          .custom-pin-icon svg:hover { transform: scale(1.15) translateY(-4px); }
        `}</style>
      </div>

      {/* My Journey — below the map */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{
          marginTop: 16, background: '#0a0a0f', backdropFilter: 'blur(14px)',
          border: '1px solid rgba(var(--neon-rgb), 0.1)', borderRadius: 14, padding: '16px 20px',
        }}
      >
        <h5 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.85)', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <FiMapPin style={{ color: 'var(--color-neon)' }} size={14} />
          My Journey
        </h5>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[...mapLocations].reverse().map((loc, i) => {
            const c = loc.color || '#7b2ff7';
            return (
              <motion.div key={loc.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                onMouseEnter={() => setActiveId(loc.id)} onMouseLeave={() => setActiveId(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 8,
                  background: activeId === loc.id ? `${c}15` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${activeId === loc.id ? `${c}40` : 'rgba(255,255,255,0.06)'}`,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: 16 }}>{loc.icon || '📍'}</span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 14, fontWeight: 600, color: activeId === loc.id ? c : 'rgba(255,255,255,0.75)', transition: 'color 0.2s', lineHeight: 1.2 }}>
                    {loc.name.split(',')[0].split('(')[0].trim()}
                  </span>
                  <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.4)', lineHeight: 1.2 }}>
                    {loc.year}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}



/* ─────────────────────────────────────────
   FloatingInput
   Fixed positioning approach:
   - Container has explicit height: 58px
   - Label animates `top` in px (not % mix)
     idle  -> top: 20px (visually centred)
     lifted -> top: 7px, scale 0.74
   - Input uses paddingTop shift so typed
     text doesn't sit under the label
───────────────────────────────────────── */
function FloatingInput({ type = 'text', name, label, value, onChange, icon: Icon, required = true, delay = 0 }) {
  const [isFocused, setIsFocused] = useState(false);
  const lifted = isFocused || (value && value.length > 0);

  return (
    <motion.div
      className="relative"
      style={{ height: 58 }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* border / bg */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-250"
        style={{
          background: isFocused ? 'rgba(var(--neon-rgb), 0.04)' : 'rgba(255,255,255,0.025)',
          border: `1px solid ${isFocused ? 'rgba(var(--neon-rgb), 0.48)' : 'rgba(255,255,255,0.08)'}`,
          boxShadow: isFocused ? '0 0 0 3px rgba(var(--neon-rgb), 0.07), 0 4px 18px rgba(0,0,0,0.18)' : 'none',
        }}
      />

      {/* icon — always centred in the 58px box */}
      <div
        className="absolute left-4 z-20 pointer-events-none"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          color: isFocused ? 'var(--color-neon)' : 'rgba(255,255,255,0.26)',
          transition: 'color 0.2s',
        }}
      >
        <Icon size={16} />
      </div>

      {/* floating label — top in px so it can never leave the box */}
      <motion.label
        className="absolute left-[46px] z-20 pointer-events-none font-['Outfit'] text-[15px] select-none origin-left"
        animate={{
          top: lifted ? 7 : 20,
          scale: lifted ? 0.74 : 1,
          color: isFocused
            ? 'var(--color-neon)'
            : lifted
              ? 'rgba(255,255,255,0.38)'
              : 'rgba(255,255,255,0.3)',
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ lineHeight: 1 }}
      >
        {label}
      </motion.label>

      {/* actual input — paddingTop grows when label is lifted */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="absolute inset-0 w-full rounded-xl z-10 font-['Outfit'] text-[15px] text-white bg-transparent outline-none"
        style={{
          paddingLeft: 46,
          paddingRight: 16,
          paddingTop: lifted ? 22 : 0,
          paddingBottom: lifted ? 4 : 0,
          caretColor: 'var(--color-neon)',
          transition: 'padding-top 0.2s ease, padding-bottom 0.2s ease',
        }}
      />

      {/* accent line */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-[1.5px] rounded-full z-30 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--color-neon), #7b2ff7, transparent)',
          translateX: '-50%',
        }}
        animate={{ width: isFocused ? '74%' : '0%' }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   FloatingTextarea
───────────────────────────────────────── */
function FloatingTextarea({ name, label, value, onChange, rows = 4, required = true, delay = 0 }) {
  const [isFocused, setIsFocused] = useState(false);
  const lifted = isFocused || (value && value.length > 0);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* border / bg */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-250"
        style={{
          background: isFocused ? 'rgba(var(--neon-rgb), 0.04)' : 'rgba(255,255,255,0.025)',
          border: `1px solid ${isFocused ? 'rgba(var(--neon-rgb), 0.48)' : 'rgba(255,255,255,0.08)'}`,
          boxShadow: isFocused ? '0 0 0 3px rgba(var(--neon-rgb), 0.07), 0 4px 18px rgba(0,0,0,0.18)' : 'none',
        }}
      />

      {/* icon */}
      <div
        className="absolute left-4 z-20 pointer-events-none"
        style={{
          top: 18,
          color: isFocused ? 'var(--color-neon)' : 'rgba(255,255,255,0.26)',
          transition: 'color 0.2s',
        }}
      >
        <FiMessageCircle size={16} />
      </div>

      {/* floating label */}
      <motion.label
        className="absolute left-[46px] z-20 pointer-events-none font-['Outfit'] text-[15px] select-none origin-left"
        animate={{
          top: lifted ? 7 : 18,
          scale: lifted ? 0.74 : 1,
          color: isFocused
            ? 'var(--color-neon)'
            : lifted
              ? 'rgba(255,255,255,0.38)'
              : 'rgba(255,255,255,0.3)',
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ lineHeight: 1 }}
      >
        {label}
      </motion.label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="relative z-10 w-full rounded-xl font-['Outfit'] text-[15px] text-white bg-transparent outline-none resize-none"
        style={{
          paddingLeft: 46,
          paddingRight: 16,
          paddingTop: 30,
          paddingBottom: 14,
          caretColor: 'var(--color-neon)',
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/2 h-[1.5px] rounded-full z-30 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--color-neon), #7b2ff7, transparent)',
          translateX: '-50%',
        }}
        animate={{ width: isFocused ? '74%' : '0%' }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   ContactRow  — styled like a form field row
   height: 58px, same border/bg as inputs,
   icon left, label+value stacked, arrow right
───────────────────────────────────────── */
function ContactRow({ icon: Icon, label, value, href, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        height: 58,
        borderRadius: 12,
        position: 'relative',
        overflow: 'hidden',
        background: hovered ? 'rgba(var(--neon-rgb), 0.04)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? 'rgba(var(--neon-rgb), 0.45)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hovered ? '0 0 0 3px rgba(var(--neon-rgb), 0.06), 0 4px 18px rgba(0,0,0,0.16)' : 'none',
        transition: 'background 0.22s, border-color 0.22s, box-shadow 0.22s',
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <div style={{
        width: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: hovered ? 'var(--color-neon)' : 'rgba(255,255,255,0.28)',
        transition: 'color 0.2s',
      }}>
        <Icon size={18} />
      </div>

      {/* label + value */}
      <div style={{ flex: 1, minWidth: 0, paddingLeft: 14 }}>
        <p style={{
          fontSize: 10,
          fontFamily: 'Outfit,sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.28)',
          marginBottom: 3,
          lineHeight: 1,
        }}>
          {label}
        </p>
        <p style={{
          fontSize: 15,
          fontFamily: 'Outfit,sans-serif',
          fontWeight: 500,
          color: hovered ? 'var(--color-neon)' : 'rgba(255,255,255,0.78)',
          lineHeight: 1.2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          transition: 'color 0.2s',
        }}>
          {value}
        </p>
      </div>

      {/* arrow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
        transition={{ duration: 0.18 }}
        style={{ flexShrink: 0, color: 'var(--color-neon)' }}
      >
        <FiArrowRight size={16} />
      </motion.div>

      {/* bottom accent line on hover */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          height: 1.5,
          borderRadius: 999,
          background: 'linear-gradient(90deg, transparent, var(--color-neon), #7b2ff7, transparent)',
          translateX: '-50%',
        }}
        animate={{ width: hovered ? '74%' : '0%' }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.a>
  );
}

/* ─────────────────────────────────────────
   ContactCard (kept for compatibility)
───────────────────────────────────────── */
function ContactCard({ icon: Icon, label, value, href, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}
    >
      <motion.div
        animate={{
          background: hovered
            ? 'linear-gradient(135deg, rgba(0,212,255,0.16), rgba(123,47,247,0.16))'
            : 'rgba(255,255,255,0.04)',
          borderColor: hovered ? 'rgba(0,212,255,0.38)' : 'rgba(255,255,255,0.08)',
          scale: hovered ? 1.06 : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{
          width: 40, height: 40, borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, border: '1px solid',
        }}
      >
        <motion.span
          animate={{ color: hovered ? 'var(--color-neon)' : 'rgba(255,255,255,0.38)' }}
          transition={{ duration: 0.18 }}
        >
          <Icon size={15} />
        </motion.span>
      </motion.div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 10, fontFamily: 'Outfit, sans-serif', textTransform: 'uppercase', letterSpacing: '0.13em', color: 'rgba(255,255,255,0.26)', marginBottom: 3, lineHeight: 1 }}>
          {label}
        </p>
        <motion.p
          animate={{ color: hovered ? 'var(--color-neon)' : 'rgba(255,255,255,0.72)' }}
          transition={{ duration: 0.18 }}
          style={{ fontSize: 13, fontFamily: 'Outfit, sans-serif', fontWeight: 500, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {value}
        </motion.p>
      </div>

      <motion.span
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -5 }}
        transition={{ duration: 0.16 }}
        style={{ flexShrink: 0, color: 'var(--color-neon)' }}
      >
        <FiArrowRight size={14} />
      </motion.span>
    </motion.a>
  );
}

/* ─────────────────────────────────────────
   SocialButton
───────────────────────────────────────── */
function SocialButton({ icon: Icon, href, label, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
    >
      <motion.div
        style={{ position: 'absolute', inset: 0, borderRadius: 10, border: '1px solid' }}
        animate={{
          background: hovered ? 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(123,47,247,0.15))' : 'rgba(255,255,255,0.04)',
          borderColor: hovered ? 'rgba(0,212,255,0.38)' : 'rgba(255,255,255,0.08)',
        }}
        transition={{ duration: 0.18 }}
      />
      <motion.span
        animate={{ color: hovered ? 'var(--color-neon)' : 'rgba(255,255,255,0.36)', scale: hovered ? 1.12 : 1 }}
        transition={{ duration: 0.16 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Icon size={14} />
      </motion.span>
    </motion.a>
  );
}

/* ─────────────────────────────────────────
   ScanLine
───────────────────────────────────────── */
function ScanLine() {
  return (
    <motion.div
      style={{
        position: 'absolute', left: 0, right: 0, height: 1, pointerEvents: 'none', zIndex: 0,
        background: 'linear-gradient(90deg, transparent 0%, rgba(var(--neon-rgb), 0.1) 40%, rgba(var(--neon-rgb), 0.1) 60%, transparent 100%)',
      }}
      initial={{ top: '0%' }}
      animate={{ top: '100%' }}
      transition={{ duration: 7, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
    />
  );
}

/* ─────────────────────────────────────────
   TypingDots
───────────────────────────────────────── */
function TypingDots() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-neon)', display: 'inline-block' }}
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -2.5, 0] }}
          transition={{ duration: 0.72, repeat: Infinity, delay: i * 0.13 }}
        />
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════
   MAIN CONTACT SECTION
═══════════════════════════════════════════ */
export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimer = useRef(null);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setIsTyping(true);
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => setIsTyping(false), 1200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTyping(false);
    setIsSubmitting(true);
    setError(null);

    // Web3Forms Integration
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      console.error('Web3Forms Access Key is missing. Please add VITE_WEB3FORMS_ACCESS_KEY to your .env file.');
      setError('System configuration error. Please try again later.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `🚀 New Message from ${formData.name} | Modern Portfolio`,
          from_name: `${formData.name} via Portfolio`,
          replyto: formData.email,
          title: "New Contact Form Submission",
          template: "table",
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please check your internet connection.');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const msgLen = formData.message.length;
  const charLimit = 500;

  const cardStyle = {
    background: '#0a0a0f',
    backdropFilter: 'blur(28px)',
    border: '1px solid rgba(255,255,255,0.07)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
    borderRadius: 20,
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ display: 'flex', alignItems: 'center' }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-8%] left-[-12%] w-[50vw] h-[50vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.042) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-12%] right-[-8%] w-[44vw] h-[44vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(123,47,247,0.052) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(var(--neon-rgb), 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--neon-rgb), 0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <ScanLine />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 relative z-10 py-14">

        {/* ══════ HEADER ══════ */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"  /* ← was mb-20, now mb-10 */
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="h-px w-7" style={{ background: 'linear-gradient(90deg, transparent, var(--color-neon))', display: 'block' }} />
            <span className="text-[13px] font-['Outfit'] font-semibold tracking-[0.22em] uppercase" style={{ color: 'var(--color-neon)' }}>
              Let's Talk
            </span>
            <span className="h-px w-7" style={{ background: 'linear-gradient(90deg, var(--color-neon), transparent)', display: 'block' }} />
          </motion.div>

          <h2 className="section-title gradient-text mb-3">Get In Touch</h2>

          <p className="font-['Outfit'] text-base text-white/40 max-w-xs mx-auto leading-relaxed">
            Have a project in mind? Let's build something{' '}
            <span style={{ color: 'var(--color-neon)', opacity: 0.85 }}>amazing</span> together.
          </p>
        </motion.div>

        {/* ══════ TWO-COLUMN GRID ══════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-start">

          {/* ══ LEFT: Info card + Form ══ */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.76, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >

            {/* Form / Success — FIRST */}
            <AnimatePresence mode="wait">
              {isSubmitted ? (

                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.93, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.93, y: -14 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  style={{ ...cardStyle, border: '1px solid rgba(0,212,255,0.16)', padding: 40, textAlign: 'center', position: 'relative', overflow: 'hidden' }}
                >
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      style={{ position: 'absolute', inset: 0, borderRadius: 20, border: '1px solid rgba(0,212,255,0.12)', pointerEvents: 'none' }}
                      initial={{ opacity: 0.5, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.08 + i * 0.05 }}
                      transition={{ duration: 1.8, delay: i * 0.28, repeat: Infinity }}
                    />
                  ))}
                  <motion.div
                    initial={{ scale: 0, rotate: -18 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.08 }}
                    style={{
                      width: 56, height: 56, margin: '0 auto 16px',
                      borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'linear-gradient(135deg, rgba(0,212,255,0.13), rgba(123,47,247,0.13))',
                      border: '1px solid rgba(0,212,255,0.2)',
                    }}
                  >
                    <FiSend size={22} style={{ color: 'var(--color-neon)' }} />
                  </motion.div>
                  <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
                    style={{ fontFamily: 'Outfit,sans-serif', fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
                    Message Sent!
                  </motion.p>
                  <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
                    style={{ fontFamily: 'Outfit,sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.36)' }}>
                    I'll reply within 24 hours.
                  </motion.p>
                </motion.div>

              ) : (

                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.48, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{ ...cardStyle, position: 'relative', overflow: 'hidden' }}
                >
                  {/* hover shimmer */}
                  <motion.div
                    style={{
                      position: 'absolute', inset: 0, pointerEvents: 'none',
                      background: 'linear-gradient(135deg, rgba(0,212,255,0.025) 0%, rgba(123,47,247,0.025) 100%)',
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.45 }}
                  />

                  <div style={{ position: 'relative', zIndex: 1, padding: '28px 28px 28px' }}>

                    {/* heading row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 22 }}>
                      <div>
                        <h4 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>
                          Drop me a line
                        </h4>
                        <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.26)', marginTop: 5 }}>
                          All fields are required
                        </p>
                      </div>
                      <AnimatePresence>
                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            transition={{ duration: 0.16 }}
                            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontFamily: 'Outfit,sans-serif', color: 'rgba(255,255,255,0.26)' }}
                          >
                            <span>typing</span>
                            <TypingDots />
                          </motion.div>
                        )}
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ fontSize: 13, fontFamily: 'Outfit,sans-serif', color: '#ff4d4d' }}
                          >
                            {error}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* fields — gap-4 between each */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <FloatingInput
                        type="text" name="name" label="Your name"
                        value={formData.name} onChange={handleChange}
                        icon={FiUser} delay={0.36}
                      />
                      <FloatingInput
                        type="email" name="email" label="Email address"
                        value={formData.email} onChange={handleChange}
                        icon={FiMail} delay={0.42}
                      />
                      <FloatingTextarea
                        name="message" label="Tell me about your project..."
                        value={formData.message} onChange={handleChange}
                        rows={4} delay={0.48}
                      />

                      <AnimatePresence>
                        {msgLen > 0 && (
                          <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -6 }}
                          >
                            <span style={{
                              fontFamily: 'Outfit,sans-serif', fontSize: 10, fontVariantNumeric: 'tabular-nums',
                              color: msgLen > charLimit * 0.85 ? '#f97316' : 'rgba(255,255,255,0.2)',
                            }}>
                              {msgLen} / {charLimit}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* submit */}
                    <motion.button
                      type="submit"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.42, delay: 0.56 }}
                      whileHover={{
                        scale: 1.015,
                        boxShadow: '0 0 26px rgba(0,212,255,0.3), 0 0 52px rgba(123,47,247,0.12)',
                      }}
                      whileTap={{ scale: 0.978 }}
                      style={{
                        marginTop: 20, width: '100%', height: 48,
                        borderRadius: 12, border: 'none', cursor: 'pointer',
                        background: 'linear-gradient(135deg, #00d4ff 0%, #7b2ff7 100%)',
                        fontFamily: 'Outfit,sans-serif', fontWeight: 700, color: '#fff',
                        fontSize: 14, letterSpacing: '0.11em', textTransform: 'uppercase',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                        position: 'relative', overflow: 'hidden',
                      }}
                      className="group"
                    >
                      <motion.span
                        style={{
                          position: 'absolute', inset: 0,
                          background: 'linear-gradient(105deg, transparent 28%, rgba(255,255,255,0.2) 50%, transparent 72%)',
                        }}
                        animate={{ x: ['-110%', '210%'] }}
                        transition={{ duration: 1.3, repeat: Infinity, ease: 'linear', repeatDelay: 1.1 }}
                        className="opacity-0 group-hover:opacity-100"
                      />
                      <motion.span
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ position: 'relative', zIndex: 1 }}
                      >
                        <FiSend size={15} />
                      </motion.span>
                      <span style={{ position: 'relative', zIndex: 1 }}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </span>
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Contact details card — BELOW FORM */}
            <motion.div
              className="relative overflow-hidden"
              style={{ ...cardStyle, padding: '36px 32px' }}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* accent blob */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)', transform: 'translate(28%,-28%)' }} />

              <p style={{
                fontSize: 10,
                fontFamily: 'Outfit,sans-serif',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.24)',
                marginBottom: 28
              }}>
                Contact Details
              </p>

              {/* Three contact rows — same height + border as form inputs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: FiMail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, delay: 0.5 },
                  { icon: FiPhone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, '')}`, delay: 0.56 },
                  { icon: FiMapPin, label: 'Location', value: personalInfo.location, href: '#', delay: 0.62 },
                ].map(({ icon: Icon, label, value, href, delay }) => (
                  <ContactRow key={label} icon={Icon} label={label} value={value} href={href} delay={delay} />
                ))}
              </div>

              {/* divider */}
              <div style={{ height: 1, margin: '18px 0', background: 'linear-gradient(90deg, rgba(255,255,255,0.05), rgba(0,212,255,0.1), rgba(255,255,255,0.05))' }} />

              {/* socials row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <p style={{ fontSize: 11, fontFamily: 'Outfit,sans-serif', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.22)', marginRight: 4 }}>
                  Find me on
                </p>
                <SocialButton icon={FiGithub} href={personalInfo.socialLinks.github} label="GitHub" delay={0.68} />
                <SocialButton icon={FiLinkedin} href={personalInfo.socialLinks.linkedin} label="LinkedIn" delay={0.72} />
                <SocialButton icon={FiTwitter} href={personalInfo.socialLinks.twitter} label="Twitter" delay={0.76} />
              </div>
            </motion.div>

          </motion.div>

          {/* ══ RIGHT: India Map ══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full relative flex items-center justify-center p-4 min-h-[500px]"
            style={{ marginTop: '0' }}
          >
            <IndiaMap />
          </motion.div>

        </div>
      </div>
    </section>
  );
}