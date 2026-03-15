import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function SkillsIntro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-4xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="text-8xl mb-6">🤝</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Let me show you</span>
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            what I bring to the table
          </p>
          <motion.div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, #00d4ff, #7b2ff7)' }}
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/3 left-10 w-2 h-2 rounded-full bg-neon opacity-30 animate-float" />
        <div className="absolute top-1/4 right-20 w-3 h-3 rounded-full bg-purple opacity-20 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-neon opacity-25 animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
}
