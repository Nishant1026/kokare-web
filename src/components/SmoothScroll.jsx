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
    // Enforce manual scroll restoration early
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Do NOT run virtual smooth-scroll on mobile / touch devices.
    // Touch devices already possess hardware-accelerated momentum scrolling natively (60/120fps).
    // Running synthetic JS touch interception on mobile causes touch inertia to bleed across
    // route navigations and forcibly scroll newly opened pages down to the footer.
    const isMobileOrTouch =
      window.innerWidth < 1024 ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isMobileOrTouch) {
      if (window.lenis) {
        window.lenis.destroy();
        delete window.lenis;
      }
      return;
    }

    // Check if user requested reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Desktop only: Luxury Lenis smooth momentum scrolling for mouse wheels & trackpads
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      infinite: false,
      autoResize: true,
      syncTouch: false // Never hijack mobile touch events
    });

    // Expose lenis instance to window for desktop helpers
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
