import { useReducedMotion } from 'framer-motion';

// ─── Shared fade-up variant ────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: 'easeOut' },
  },
};

// ─── Shared fade-in (no vertical movement) ─────────────────────
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

// ─── Stagger container ─────────────────────────────────────────
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

// ─── Mosaic assemble (tiles scatter → final position) ──────────
// Call mosaicAssembleItem(index) for each tile to get unique offsets
const seededRandom = (i) => {
  const x = Math.sin(i * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

export function mosaicAssembleItem(index) {
  const rx = (seededRandom(index * 2) - 0.5) * 160;      // ±80
  const ry = (seededRandom(index * 2 + 1) - 0.5) * 120;  // ±60

  return {
    hidden: { opacity: 0, scale: 0.6, x: rx, y: ry },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.34, 1.56, 0.64, 1], // back.out(1.4) approximation
      },
    },
  };
}

// Mobile version with reduced scatter distances
export function mosaicAssembleItemMobile(index) {
  const rx = (seededRandom(index * 2) - 0.5) * 80;   // ±40
  const ry = (seededRandom(index * 2 + 1) - 0.5) * 60; // ±30

  return {
    hidden: { opacity: 0, scale: 0.6, x: rx, y: ry },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };
}

export const mosaicStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

// ─── Empty variants for reduced-motion ─────────────────────────
const emptyVariant = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

const emptyContainer = {
  hidden: {},
  visible: {},
};

// ─── Hook: returns variants or empty based on reduced motion ───
export function useMotionVariants() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return {
      fadeUp: emptyVariant,
      fadeIn: emptyVariant,
      staggerContainer: emptyContainer,
      mosaicAssembleItem: () => emptyVariant,
      mosaicAssembleItemMobile: () => emptyVariant,
      mosaicStagger: emptyContainer,
      shouldAnimate: false,
    };
  }

  return {
    fadeUp,
    fadeIn,
    staggerContainer,
    mosaicAssembleItem,
    mosaicAssembleItemMobile,
    mosaicStagger,
    shouldAnimate: true,
  };
}
