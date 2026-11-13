import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Luxury Parallax Image Container
 * Smoothly shifts an image inside an overflow-hidden frame as the user scrolls past.
 * GPU-accelerated with will-change-transform and touch-friendly for 60/120fps on mobile.
 * EXACT same animation and depth on mobile as desktop.
 */
export function ParallaxImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  offset = 65, // Generous luxury pixel depth on mobile and desktop
  mobileOffset,
  scale = 1.2, // Prevents edge gaps during parallax glide
  loading = 'lazy'
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Exact same full parallax depth across all devices
  const activeOffset = mobileOffset !== undefined ? mobileOffset : offset;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-activeOffset, activeOffset]
  );

  const isPositioned = /\b(!?absolute|!?fixed|!?sticky)\b/.test(className);

  return (
    <div
      ref={ref}
      className={`${isPositioned ? '' : 'relative'} overflow-hidden ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: shouldReduceMotion ? 1 : scale }}
        className={`w-full h-full object-cover will-change-transform transform-gpu ${imgClassName}`}
        loading={loading}
      />
    </div>
  );
}

/**
 * Continuous Parallax Content Wrapper
 * Smoothly translates any text, card, or element continuously as the page scrolls.
 * Pairs with Lenis inertia for seamless fluid motion on both mobile and desktop.
 */
export function ParallaxContent({
  children,
  className = '',
  speed = 36, // Max differential pixels
  reverse = false
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Exact same continuous parallax speed on mobile as desktop
  const activeSpeed = speed;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion
      ? [0, 0]
      : reverse
      ? [activeSpeed, -activeSpeed]
      : [-activeSpeed, activeSpeed]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`will-change-transform transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * ParallaxReveal: Combines a silky smooth viewport entrance AND continuous parallax glide as you scroll!
 * Exact same motion and timing across mobile and desktop.
 */
export function ParallaxReveal({
  children,
  className = '',
  speed = 28, // continuous parallax depth
  delay = 0,
  reverse = false
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Exact same continuous parallax speed on mobile as desktop
  const activeSpeed = speed;

  // Continuous subtle differential parallax Y offset based on scroll position
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion
      ? [0, 0]
      : reverse
      ? [activeSpeed, -activeSpeed]
      : [-activeSpeed, activeSpeed]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y: parallaxY }}
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`will-change-transform transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parallel Grid Column: Shifts alternate columns at different speeds
 * creating parallel multi-speed depth when scrolling grids.
 * Exact same offset on mobile and desktop.
 */
export function ParallaxColumn({
  children,
  className = '',
  offset = 32,
  isEven = false
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Exact same multi-speed depth on mobile as desktop
  const activeOffset = offset;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion
      ? [0, 0]
      : isEven
      ? [-activeOffset, activeOffset]
      : [activeOffset, -activeOffset]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`will-change-transform transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * Luxury Floating Watermark Typography
 * Renders oversized couture text drifting slowly behind content to establish dramatic editorial parallax depth.
 * Exact same floating drift speed on mobile and desktop.
 */
export function ParallaxWatermark({
  text = 'KOKARÉ',
  speed = 70,
  reverse = false,
  className = ''
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Exact same floating speed on mobile as desktop
  const activeSpeed = speed;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion
      ? [0, 0]
      : reverse
      ? [activeSpeed, -activeSpeed]
      : [-activeSpeed, activeSpeed]
  );

  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <motion.span
        style={{ y }}
        className="font-serif text-[18vw] sm:text-[14vw] md:text-[12vw] font-normal tracking-[0.18em] uppercase text-[#161616]/[0.03] whitespace-nowrap will-change-transform transform-gpu"
      >
        {text}
      </motion.span>
    </div>
  );
}

/**
 * Smooth Luxury Viewport Fade In with Apple / Couture Bézier Curve
 */
export function FadeInUp({
  children,
  className = '',
  delay = 0,
  yOffset = 24,
  duration = 0.7
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] // Luxury high-end cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
