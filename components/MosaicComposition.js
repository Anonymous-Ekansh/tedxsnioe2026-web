import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMotionVariants } from './motionVariants';

/**
 * Mosaic tile composition — 12 irregular polygon shapes.
 * 
 * Props:
 *  - variant: 'default' | 'warm' | 'cool' — color weighting
 *  - className: additional class
 */

const colorSets = {
  default: {
    primary: '#e65a9a',      // 3–4 tiles
    secondary: '#a9acd6',    // 3–4 tiles
    highlight: '#f4c9da',    // 2–3 tiles
    shadow: '#5e2244',       // lightened #491733, 1–2 tiles
    stroke: '#2a0a1e',
  },
  warm: {
    primary: '#e65a9a',
    secondary: '#f4c9da',
    highlight: '#f6d56f',
    shadow: '#5e2244',
    stroke: '#2a0a1e',
  },
  cool: {
    primary: '#a9acd6',
    secondary: '#97d5cf',
    highlight: '#f4c9da',
    shadow: '#1b2432',
    stroke: '#0d1520',
  },
};

// 12 irregular polygon shapes — positioned within a 400x400 viewBox
const tiles = [
  { points: '45,20 120,8 135,65 80,90 30,70', colorIdx: 0 },
  { points: '140,5 210,25 200,80 145,75', colorIdx: 1 },
  { points: '225,15 310,30 290,95 235,85 220,50', colorIdx: 0 },
  { points: '320,20 380,55 365,110 300,90', colorIdx: 2 },
  { points: '25,95 75,100 90,165 55,185 15,150', colorIdx: 1 },
  { points: '105,90 180,85 195,150 160,180 95,170', colorIdx: 0 },
  { points: '210,95 285,100 275,175 225,185 200,145', colorIdx: 2 },
  { points: '300,105 375,120 360,195 310,190', colorIdx: 1 },
  { points: '40,200 110,190 130,255 85,280 30,260', colorIdx: 3 },
  { points: '145,195 220,200 235,270 190,290 135,265', colorIdx: 0 },
  { points: '245,205 330,210 315,280 260,290', colorIdx: 1 },
  { points: '90,295 165,285 180,345 140,370 75,350', colorIdx: 2 },
];

export default function MosaicComposition({ variant = 'default', className = '' }) {
  const colors = colorSets[variant] || colorSets.default;
  const mv = useMotionVariants();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 780);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const colorMap = [colors.primary, colors.secondary, colors.highlight, colors.shadow];

  const getTileVariant = (index) => {
    if (isMobile) {
      return mv.mosaicAssembleItemMobile(index);
    }
    return mv.mosaicAssembleItem(index);
  };

  return (
    <motion.div
      className={`mosaic-composition ${className}`}
      variants={mv.mosaicStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <svg
        viewBox="0 0 400 390"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        {tiles.map((tile, i) => (
          <motion.polygon
            key={i}
            points={tile.points}
            fill={colorMap[tile.colorIdx]}
            stroke={colors.stroke}
            strokeWidth="2"
            variants={getTileVariant(i)}
            className="mosaic-tile"
            style={{
              cursor: 'default',
              transition: 'filter 0.2s ease, transform 0.2s ease',
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
