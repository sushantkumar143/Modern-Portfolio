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

      {/* Bottom Hover Overlay (Shadowish Gradient fading up to mid-height) */}
      <div
        className="absolute bottom-0 left-0 w-full h-1/2 flex flex-col justify-end p-6 translate-y-full group-hover/box:translate-y-0 transition-transform duration-500 ease-out"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.7) 60%, transparent 100%)',
          backdropFilter: 'blur(3px)'
        }}
      >
        <p className="text-white text-sm drop-shadow-lg leading-relaxed font-medium text-center mb-1">
          {activity.description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="relative">
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
          <div className="w-full overflow-hidden group-hover-pause-row">
            <div className="flex gap-8 w-max animate-marquee pause-on-hover">
              {scrollRow1.map((activity, i) => (
                <ActivityCard key={i} activity={activity} />
              ))}
            </div>
          </div>

          {/* Row 2 - scroll right */}
          <div className="w-full overflow-hidden group-hover-pause-row">
            <div className="flex gap-8 w-max animate-marquee-reverse pause-on-hover">
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
            {/* Modal Container: High-end 'Photo Frame' Style */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[95vw] md:w-[60vw] h-[90vh] md:h-[80vh] bg-[#0c0c14] border-[12px] border-[#161621] rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center"
              style={{ boxShadow: '0 0 40px rgba(0,212,255,0.05)' }}
            >
              {/* Top Banner Area (Title) */}
              <div className="w-full pt-10 pb-6 px-10 text-center border-b border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-lg uppercase font-['Outfit']">
                  {selectedActivity.title}
                </h3>
              </div>

              {/* Scrollable Frame Interior */}
              <div className="flex-1 w-full overflow-y-auto p-8 flex flex-col items-center">

                {/* Image Frame with proper padding/border */}
                <div className="w-full max-w-2xl bg-[#1c1c28] p-4 rounded-3xl shadow-inner border border-white/5 mb-10 group/frame">
                  <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={selectedActivity.image}
                      alt={selectedActivity.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/frame:scale-105"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full max-w-2xl text-center px-4 mb-8">
                  <div className="inline-block w-12 h-1 bg-neon mb-6 rounded-full" />
                  <p className="text-gray-300 leading-relaxed text-lg md:text-xl font-medium font-['Inter']">
                    {selectedActivity.description}
                  </p>

                  {selectedActivity.link && selectedActivity.link !== "#" && (
                    <a
                      href={selectedActivity.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-10 inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-white text-black hover:bg-neon hover:text-black transition-all duration-300 font-bold uppercase tracking-widest text-sm shadow-xl hover:shadow-neon/20"
                    >
                      Explore More <FiArrowUpRight size={18} />
                    </a>
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-white/5 hover:bg-white text-white hover:text-black rounded-2xl transition-all duration-300 border border-white/10 group"
                aria-label="Close modal"
              >
                <FiX size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
