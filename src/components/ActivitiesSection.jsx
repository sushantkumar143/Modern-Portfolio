import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { activities } from '../data/portfolioData';

export default function ActivitiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Split into two rows for infinite scroll effect
  const row1 = activities.slice(0, Math.ceil(activities.length / 2));
  const row2 = activities.slice(Math.ceil(activities.length / 2));

  // Duplicate more aggressively for seamless CSS marquee loop
  const scrollRow1 = [...row1, ...row1, ...row1, ...row1];
  const scrollRow2 = [...row2, ...row2, ...row2, ...row2];

  // Render a single activity box
  const ActivityCard = ({ activity }) => (
    <div 
      onClick={() => setSelectedActivity(activity)}
      className="group/box relative shrink-0 w-[360px] h-[240px] rounded-2xl overflow-hidden cursor-pointer bg-dark-card border-2 border-transparent hover:[animation:border-neon-cycle_3s_linear_infinite] transition-colors"
    >
      {/* Background Image */}
      <img 
        src={activity.image} 
        alt={activity.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/box:scale-110"
      />
      
      {/* Top Banner (Always Visible) */}
      {/* Increased height (p-8), centered, larger font (text-lg font-bold) */}
      <div className="absolute top-0 left-0 w-full bg-black/70 backdrop-blur-sm p-8 border-b border-white/10 text-center flex items-center justify-center">
        <h3 className="text-white font-bold text-lg leading-tight">
          {activity.title}
        </h3>
      </div>

      {/* Bottom Hover Overlay (Slides up to middle) */}
      {/* Decreased transparency (darker, mostly solid black), description text only */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black/90 backdrop-blur-md border-t border-neon/30 flex flex-col justify-center p-6 translate-y-full group-hover/box:translate-y-0 transition-transform duration-500 ease-out">
        <p className="text-gray-200 text-sm drop-shadow-md leading-relaxed font-medium text-center">
          {activity.description}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <section className="section-padding relative overflow-hidden" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title gradient-text">Activities & Volunteering</h2>
            <p className="section-subtitle">Beyond the code</p>
          </motion.div>
        </div>

        {/* Scrolling rows - Using CSS animation for perfect pause-on-hover */}
        {/* Maintained proper gap (space-y-16 is a clear separation between rows) */}
        <div className="space-y-16 flex flex-col items-center">
          
          {/* Row 1 - scroll left */}
          <div className="w-full overflow-hidden">
            <div className="flex gap-8 w-max animate-marquee hover:[animation-play-state:paused]">
              {scrollRow1.map((activity, i) => (
                <ActivityCard key={i} activity={activity} />
              ))}
            </div>
          </div>

          {/* Row 2 - scroll right */}
          <div className="w-full overflow-hidden">
            <div className="flex gap-8 w-max animate-marquee-reverse hover:[animation-play-state:paused]">
              {scrollRow2.map((activity, i) => (
                <ActivityCard key={`r2-${i}`} activity={activity} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedActivity(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            {/* Modal Container: ~50vw and 50vh, scrollable if content exceeds */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
              className="relative w-[90vw] md:w-[50vw] h-[80vh] md:h-[50vh] bg-dark-card border border-white/10 rounded-2xl overflow-y-auto shadow-2xl flex flex-col items-center p-8"
            >
              <button 
                onClick={() => setSelectedActivity(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-neon hover:text-black rounded-full text-white transition-colors"
                aria-label="Close modal"
              >
                <FiX size={24} />
              </button>

              {/* Top: Topic Name */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center w-full px-8">
                {selectedActivity.title}
              </h3>

              {/* Center: Image */}
              <div className="w-full max-w-xl aspect-video relative rounded-xl overflow-hidden mb-6 flex-shrink-0 shadow-lg border border-white/5">
                <img 
                  src={selectedActivity.image} 
                  alt={selectedActivity.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Bottom: Content Layout */}
              <div className="w-full max-w-xl flex flex-col items-center text-center pb-4">
                <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                  {selectedActivity.description}
                </p>
                
                {selectedActivity.link && selectedActivity.link !== "#" && (
                  <a 
                    href={selectedActivity.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neon/10 border border-neon text-neon hover:bg-neon hover:text-dark transition-colors font-medium"
                  >
                    View Project <FiArrowUpRight />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
