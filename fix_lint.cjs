const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

const replaceMotion = (fileName) => {
  const filePath = path.join(componentsDir, fileName);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/import\s+\{\s*motion[\s,]*([^}]*)\}\s+from\s+['"]framer-motion['"];/g, 
                             "import { $1 } from 'framer-motion';");
    content = content.replace(/import\s+\{\s*\}\s+from\s+['"]framer-motion['"];\n?/g, "");
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${fileName}`);
  }
}

const files = [
  'AboutSection.jsx', 'AchievementsSection.jsx', 'ActivitiesSection.jsx',
  'CodingPlatforms.jsx', 'ContactSection.jsx', 'Navbar.jsx',
  'ProjectsSection.jsx', 'SkillsIntro.jsx', 'SkillsSection.jsx', 'HeroSection.jsx'
];

files.forEach(replaceMotion);

const certFile = path.join(componentsDir, 'CertificationsSection.jsx');
let certContent = fs.readFileSync(certFile, 'utf8');
const sectionEndStr = '      </section>';
const sectionEndIndex = certContent.indexOf(sectionEndStr);

if (sectionEndIndex !== -1) {
  const cleanHeader = certContent.substring(0, sectionEndIndex + sectionEndStr.length);
  
  const modals = `

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
            <div style={{
              flex: 1,
              padding: '50px',
              overflowY: 'auto'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                gap: '40px'
              }}>
                {certifications.map((cert, index) => (
                  <div key={index} style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '20px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  }}>
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
                  </div>
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
    </>
  );
}
`;
  
  fs.writeFileSync(certFile, cleanHeader + modals, 'utf8');
  console.log("Fixed CertificationsSection.jsx syntax using truncated append strategy.");
}
