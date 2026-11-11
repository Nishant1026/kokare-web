import React, { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Global Luxury Lenis Smooth Momentum Scrolling Provider
 * Uses vanilla Lenis instance directly to ensure 100% React 19 compatibility
 * without duplicate React runtime bundling, Context mismatches, or crashes.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Check if user requested reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Instantiate vanilla Lenis with exponential luxury deceleration
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
      syncTouch: false // Native touch on mobile, Lenis silky momentum on wheel
    });

    // Expose lenis instance to window for ScrollToTop, FloatingActions, and modals
    window.lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return <>{children}</>;
}
