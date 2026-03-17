import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Initialize Lenis with smooth settings
    // 1.5s duration is slightly slower than default for a very premium feel
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Keep GSAP ScrollTrigger in sync with Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Provide Lenis to GSAP's ticker to sync animations
    const update = (time) => {
      // time passed to raf is in ms (GSAP gives s)
      // some lenis versions expect time in ms, others use DOMHighResTimeStamp
      // GSAP ticker gives time in seconds, we multiply by 1000
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    // Prevent layout thrashing
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
