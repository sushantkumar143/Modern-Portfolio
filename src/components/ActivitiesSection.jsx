import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { activities } from '../data/portfolioData';

export default function ActivitiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Split into two rows for infinite scroll effect
  const row1 = activities.slice(0, Math.ceil(activities.length / 2));
  const row2 = activities.slice(Math.ceil(activities.length / 2));

  // Duplicate for seamless loop
  const scrollRow1 = [...row1, ...row1, ...row1];
  const scrollRow2 = [...row2, ...row2, ...row2];

  return (
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

      {/* Scrolling rows */}
      <div className="space-y-4">
        {/* Row 1 - scroll left */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4"
            animate={{ x: [0, '-33.33%'] }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          >
            {scrollRow1.map((activity, i) => (
              <div
                key={i}
                className="shrink-0 glass rounded-full px-6 py-3 neon-border text-sm text-text-secondary whitespace-nowrap hover:text-neon hover:bg-neon-dim transition-all"
              >
                {activity}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - scroll right */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4"
            animate={{ x: ['-33.33%', 0] }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          >
            {scrollRow2.map((activity, i) => (
              <div
                key={i}
                className="shrink-0 glass rounded-full px-6 py-3 neon-border text-sm text-text-secondary whitespace-nowrap hover:text-neon hover:bg-neon-dim transition-all"
              >
                {activity}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
