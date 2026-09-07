import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import './SpeakerReveal.scss';

// Cleaned up data - NO EMOJIS
const speakersData = [
  {
    id: 1,
    name: 'Kaamya Karthikeyan',
    role: 'Youngest Female to Conquer Top Seven Summits',
    tag: 'Adventure & Resilience',
    image: '/Images/speakers/kaamya.jpeg', 
    hook: "Defying the odds, one peak at a time.",
    highlights: [
      {
        headline: "Summit Superstar",
        punchline: "7 Continents. 7 Highest Peaks. All Climbed."
      },
      {
        headline: "Record Breaker",
        punchline: "Youngest Indian to summit Mount Everest"
      },
      {
        headline: "Inspiration",
        punchline: "Redefining limits for the next generation of adventurers."
      }
    ],
    peaks: [
      "Mount Everest",
      "Aconcagua",
      "Denali",
      "Mount Kilimanjaro",
      "Mount Elbrus",
      "Mount Vinson",
      "Mount Kosciuszko"
    ]
  }
];

export default function SpeakerReveal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const currentSpeaker = speakersData[currentIndex];

  // Auto-rotation logic
  useEffect(() => {
    if (speakersData.length <= 1 || !isInView || isHovered) return;
    const timer = setInterval(() => setCurrentIndex((prev) => (prev + 1) % speakersData.length), 3000);
    return () => clearInterval(timer);
  }, [isInView, isHovered, currentIndex]);

  // Scroll-linked continuous gradient & parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Subtle parallax for the main content
  const yLeft = useTransform(scrollYProgress, [0, 1], [-20, 30]);
  const yRight = useTransform(scrollYProgress, [0, 1], [20, -30]);

  // Generate 10x10 grid = 100 tiles for the mosaic
  const gridSize = 10;
  const wrapperSize = 380;
  const tileSize = wrapperSize / gridSize;
  const center = (gridSize - 1) / 2;
  
  const tiles = useMemo(() => {
    return Array.from({ length: gridSize * gridSize }).map((_, i) => {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      const dx = col - center;
      const dy = row - center;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const rx = Math.sin(i * 12.9898) * 350;
      const ry = Math.cos(i * 78.233) * 350;
      const rot = Math.sin(i * 45.123) * 90;
      
      return { id: i, row, col, dist, rx, ry, rot };
    });
  }, []);

  const tileVariants = {
    hidden: (custom) => ({ 
      opacity: 0, 
      scale: 0.3, 
      x: custom.rx, 
      y: custom.ry,
      rotate: custom.rot
    }),
    visible: (custom) => ({
      opacity: 1, 
      scale: 1, 
      x: 0, 
      y: 0,
      rotate: 0,
      transition: { 
        duration: 0.7, 
        delay: custom.dist * 0.05, 
        ease: [0.2, 0.8, 0.2, 1]
      }
    }),
    exit: (custom) => ({
      opacity: 0, 
      scale: 0.5, 
      x: custom.rx * 0.5, 
      y: custom.ry * 0.5,
      transition: { duration: 0.4, delay: custom.dist * 0.02, ease: "easeInOut" }
    })
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.8, delay: 0.8 + custom * 0.15, ease: "easeOut" }
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const highlightVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom) => ({
      opacity: 1, y: 0,
      // Deliberately delayed to land just after the photo completes its mosaic assembly (which takes ~1.3s)
      transition: { duration: 0.8, delay: 1.5 + custom * 0.12, ease: "easeOut" }
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <section 
      className="SpeakerReveal" 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ background: 'transparent' }}
    >
      <div className="SpeakerReveal__header">
        <h2 className="SpeakerReveal__title">SPEAKER REVEAL</h2>
        <p className="SpeakerReveal__subline">meet our lineup</p>
      </div>

      <AnimatePresence mode="wait">
        {isInView && (
          <motion.div 
            key={currentSpeaker.id}
            className="SpeakerReveal__main"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Left Text Block */}
            <motion.div className="SpeakerReveal__text-left" style={{ y: yLeft }}>
              <motion.span className="SpeakerReveal__tag" variants={textVariants} custom={0}>
                {currentSpeaker.tag}
              </motion.span>
              <motion.h3 className="SpeakerReveal__name" variants={textVariants} custom={1}>
                {currentSpeaker.name.split(' ').map((part, i) => (
                  <React.Fragment key={i}>
                    {part}<br/>
                  </React.Fragment>
                ))}
              </motion.h3>
              <motion.p className="SpeakerReveal__title-role" variants={textVariants} custom={2}>
                {currentSpeaker.role}
              </motion.p>
            </motion.div>

            {/* Center Photo Block */}
            <motion.div 
              className="SpeakerReveal__photo-wrapper"
              animate={{ scale: [1, 1.015, 1] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1.5 }}
            >
              <div className="SpeakerReveal__mosaic-grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gridTemplateRows: `repeat(${gridSize}, 1fr)` }}>
                {tiles.map((tile) => (
                  <motion.div
                    key={tile.id}
                    custom={tile}
                    variants={tileVariants}
                    className="SpeakerReveal__tile"
                    style={{ 
                      width: `${tileSize}px`, 
                      height: `${tileSize}px`,
                      willChange: "transform, opacity"
                    }}
                  >
                    <img 
                      src={currentSpeaker.image} 
                      alt=""
                      style={{
                        width: `${wrapperSize}px`,
                        height: `${wrapperSize}px`,
                        maxWidth: 'none',
                        maxHeight: 'none',
                        left: `-${tile.col * tileSize}px`,
                        top: `-${tile.row * tileSize}px`,
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Text Block */}
            <motion.div className="SpeakerReveal__text-right" style={{ y: yRight }}>
              <motion.p className="SpeakerReveal__hook" variants={textVariants} custom={3}>
                {currentSpeaker.hook}
              </motion.p>

              {currentSpeaker.peaks && (
                <motion.div className="SpeakerReveal__peaks-list" variants={textVariants} custom={4}>
                  <h4 className="SpeakerReveal__peaks-heading">7 Peaks. 7 Continents.</h4>
                  <div className="SpeakerReveal__peaks-underline" />
                  <div className="SpeakerReveal__peaks-collage">
                    {currentSpeaker.peaks.map((peak, idx) => {
                      const peakStyles = [
                        { fontSize: '3.2rem', fontWeight: 900, color: 'var(--ink)', textTransform: 'uppercase', lineHeight: '0.85', letterSpacing: '-0.02em', margin: '0 12px 0 0' },
                        { fontSize: '1.6rem', fontWeight: 300, color: 'var(--lavender)', textTransform: 'lowercase', lineHeight: '1', margin: '16px 20px 0 0' },
                        { fontSize: '4rem', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', lineHeight: '0.8', letterSpacing: '-0.04em', margin: '8px 16px 0 0' },
                        { fontSize: '1.4rem', fontWeight: 800, color: 'var(--yellow)', textTransform: 'uppercase', lineHeight: '1', letterSpacing: '0.1em', margin: '24px 16px 0 0' },
                        { fontSize: '2.6rem', fontWeight: 500, color: 'var(--ink)', textTransform: 'lowercase', lineHeight: '0.9', margin: '8px 12px 0 0' },
                        { fontSize: '2rem', fontWeight: 300, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', lineHeight: '1', margin: '12px 16px 0 0' },
                        { fontSize: '2.8rem', fontWeight: 900, color: 'var(--ink)', textTransform: 'uppercase', lineHeight: '0.85', letterSpacing: '-0.02em', margin: '8px 0 0 0' }
                      ];

                      return (
                        <motion.span 
                          key={idx} 
                          className="SpeakerReveal__peaks-item"
                          style={peakStyles[idx]}
                          initial={{ opacity: 0, scale: 0.5, y: 20 }}
                          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 20 }}
                          transition={{ duration: 0.6, delay: 2.0 + idx * 0.15, type: "spring", stiffness: 100 }}
                        >
                          {peak}
                        </motion.span>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isInView && (
          <motion.div 
            key={`highlights-${currentSpeaker.id}`}
            className="SpeakerReveal__highlights"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {currentSpeaker.highlights.map((h, i) => (
              <motion.div key={i} className="SpeakerReveal__highlight-card" variants={highlightVariants} custom={i}>
                <div className="SpeakerReveal__highlight-headline">
                  {h.headline}
                </div>
                <div className="SpeakerReveal__highlight-punchline">{h.punchline}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
