import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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
    mobileText: "At just 17, Kaamya Karthikeyan became the youngest girl to complete the Seven Summits. A Computer Science and Engineering student, she balances academics with high-altitude mountaineering. She is the youngest Indian and second-youngest girl globally to summit Mount Everest from the Nepal side.",
    peaks: [
      "Mount Everest",
      "Aconcagua",
      "Denali",
      "Mount Kilimanjaro",
      "Mount Elbrus",
      "Mount Vinson",
      "Mount Kosciuszko"
    ],
    peaksTitle: "7 Peaks. 7 Continents."
  },
  {
    id: 2,
    name: 'Anant Kaushik',
    role: 'Co-Founder & CEO, Out Of Ordinary Media',
    tag: 'Media & Storytelling',
    image: '/Images/speakers/anant.jpeg',
    hook: "Building communities out of the ordinary.",
    highlights: [
      {
        headline: "Platform Architect",
        punchline: "Led production at FilterCopy and YouTube/Podcasts at Humans of Bombay."
      },
      {
        headline: "Media Pioneer",
        punchline: "Building a new venture at the intersection of content and strategy."
      },
      {
        headline: "Brand Visionary",
        punchline: "Mastering the art of personal branding through powerful storytelling."
      }
    ],
    mobileText: "Over the past 8 years, Anant Kaushik has led production at FilterCopy and headed YouTube & Podcasts at Humans of Bombay. Now, as the Co-Founder and CEO of Out Of Ordinary Media, he is building his own venture at the intersection of content, branding, and digital media.",
    peaks: [
      "FilterCopy",
      "Humans of Bombay",
      "Out of Ordinary",
      "Digital Media",
      "Personal Brand",
      "Content",
      "Storytelling"
    ],
    peaksTitle: "Brands. Content. Impact."
  },
  {
    id: 3,
    name: 'Vetri Dhagumudi',
    role: 'Former Global Director of sustainability at Nike\nFounder and CEO of Hydris AI',
    tag: 'AI & Sustainability',
    image: '/Images/speakers/vetri.jpeg',
    hook: "Building intelligent operations out of the ordinary.",
    highlights: [
      {
        headline: "Global Executive",
        punchline: "Spent 20+ years leading sustainability at Nike and Kimberly-Clark, including 4 years as Nike's Global Nature Director."
      },
      {
        headline: "Serial Founder",
        punchline: "Previously founded JarvisWater, building AI/ML-based training software that tackled water industry's aging workforce crisis."
      },
      {
        headline: "AI For Industry",
        punchline: "Now Founder & CEO of Hydris, applying AI to industrial operations where technology and sustainability meet."
      }
    ],
    mobileText: "Vetri Dhagumudi spent 20+ years leading sustainability at Nike and Kimberly-Clark. A serial founder, he previously built JarvisWater and is now the Founder & CEO of Hydris, applying AI to industrial operations.",
    peaks: [
      "NIKE",
      "Former Global Director",
      "HYDRIS AI",
      "APPLIED AI",
      "industrial operations",
      "SUSTAINABILITY",
      "TECHNOLOGY"
    ],
    peaksTitle: "AI. INDUSTRY. IMPACT."
  },
  {
    id: 4,
    name: 'Arun Maira',
    role: 'Former Chairman, Boston Consulting Group (BCG)\nFormer Member, Planning Commission of India',
    tag: 'Leadership & Strategy',
    image: '/Images/speakers/arun.jpg',
    hook: "A 50-year legacy shaping billion-dollar industries and driving national policy.",
    highlights: [
      {
        headline: "Corporate Titan",
        punchline: "Spent 25 years building Tata Motors, followed by leading Boston Consulting Group (BCG) as Chairman, driving transformation across top global corporations."
      },
      {
        headline: "National Architect",
        punchline: "Steered India's industrial and urban policies as a Member of the Planning Commission, shaping the nation's economic future."
      },
      {
        headline: "Visionary Author",
        punchline: "A renowned systems thinker and author of several definitive books on transformational leadership, ethical capitalism, and institutional change."
      }
    ],
    mobileText: "With a career spanning over 50 years, Arun Maira is a titan of Indian industry and policy. He spent 25 years at the Tata Group before becoming Chairman of Boston Consulting Group (BCG). Later, as a Member of the Planning Commission of India, he helped steer the nation's industrial and economic policies. He is a renowned author and thought leader on systems thinking, leadership, and institutional transformation.",
    peaks: [
      "TATA GROUP",
      "PLANNING COMMISSION",
      "POLICY MAKER",
      "Boston Consulting Group (BCG)",
      "SYSTEMS THINKING",
      "LEADERSHIP",
      "AUTHOR"
    ],
    peaksTitle: "INDUSTRY. POLICY. LEADERSHIP."
  },
  {
    id: 5,
    name: 'Muneef Khan',
    role: 'Independent Journalist & Educator\nJournalism Faculty, Shiv Nadar University',
    tag: 'Journalism & Public Discourse',
    image: '/Images/speakers/muneef.jpg',
    hook: "Understanding the stories behind the noise.",
    highlights: [
      {
        headline: "Independent Journalist",
        punchline: "Reporting on conflict, governance, and public affairs, his work has appeared in The Hindu, The Wire, ThePrint, and Rolling Stone India."
      },
      {
        headline: "Journalism & Academia",
        punchline: "An alumnus of the Asian College of Journalism, he actively shapes the next generation of storytellers as a faculty member at Shiv Nadar University."
      },
      {
        headline: "Information & Public Narratives",
        punchline: "His reporting critically examines how information is gathered and presented, decoding the complex narratives surrounding major global events."
      }
    ],
    mobileText: "Based in New Delhi, Muneef Khan is an independent journalist whose reporting has appeared across publications including The Hindu, The Wire, ThePrint, Newslaundry and Rolling Stone India. His work examines how journalism, information and the narratives surrounding major events shape public understanding.",
    peaks: [
      "JOURNALISM",
      "MEDIA",
      "PUBLIC DISCOURSE",
      "NARRATIVES",
      "CONFLICT & WAR",
      "TRUTH & INFO"
    ],
    peaksTitle: "JOURNALISM. INFORMATION. IMPACT."
  }
];

export default function SpeakerReveal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isHovered = useRef(false);
  const isNavHovered = useRef(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const currentSpeaker = speakersData[currentIndex];

  // Auto-rotation logic
  useEffect(() => {
    if (speakersData.length <= 1 || !isInView) return;
    
    let timeoutId;
    const runTimer = () => {
      // 8 seconds if user is interacting/hovering over main section, otherwise 6 seconds
      const delay = isHovered.current ? 8000 : 6000;
      
      timeoutId = setTimeout(() => {
        if (!isNavHovered.current) {
          setCurrentIndex((prev) => (prev + 1) % speakersData.length);
        } else {
          // If hovering over navigation, don't change slide, just check again soon
          runTimer();
        }
      }, delay);
    };
    
    runTimer();
    return () => clearTimeout(timeoutId);
  }, [isInView, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + speakersData.length) % speakersData.length);
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % speakersData.length);
  };



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
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
    >
      <div className="SpeakerReveal__bg" />

      <div className="SpeakerReveal__header">
        <div className="SpeakerReveal__header-left">
          <h2 className="SpeakerReveal__title">SPEAKER REVEAL</h2>
          <p className="SpeakerReveal__subline" style={{marginTop: '12px'}}>meet our lineup</p>
        </div>
        {speakersData.length > 1 && (
          <div 
            className="SpeakerReveal__nav-wrapper SpeakerReveal__nav-desktop"
            onMouseEnter={() => { isNavHovered.current = true; }}
            onMouseLeave={() => { isNavHovered.current = false; }}
          >
            <button onClick={handlePrev} className="SpeakerReveal__text-btn">← PREV</button>
            <div className="SpeakerReveal__pagination">
              <span className="current">{currentIndex + 1}</span>
              <span className="separator">/</span>
              <span className="total">{speakersData.length}</span>
            </div>
            <button onClick={handleNext} className="SpeakerReveal__text-btn">NEXT →</button>
          </div>
        )}
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
            <motion.div className="SpeakerReveal__text-left">
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
                {currentSpeaker.role.split('\n').map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {line}{i !== arr.length - 1 && <br/>}
                  </React.Fragment>
                ))}
              </motion.p>
            </motion.div>

            {/* Center Photo Block */}
            <div className="SpeakerReveal__photo-scale-mobile">
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
            </div>

            {/* Right Text Block */}
            <motion.div className="SpeakerReveal__text-right">
              <motion.p className="SpeakerReveal__hook" variants={textVariants} custom={3}>
                {currentSpeaker.hook}
              </motion.p>

              {currentSpeaker.peaks && (
                <motion.div className="SpeakerReveal__peaks-list" variants={textVariants} custom={4}>
                  <h4 className="SpeakerReveal__peaks-heading">{currentSpeaker.peaksTitle || "7 Peaks. 7 Continents."}</h4>
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
          <>
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

            {currentSpeaker.mobileText && (
              <motion.div 
                key={`mobilebio-${currentSpeaker.id}`}
                className="SpeakerReveal__mobile-bio"
                style={{ marginTop: "-30px", marginBottom: "40px" }}
                variants={highlightVariants}
                custom={0}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {currentSpeaker.mobileText}
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      {/* Mobile Nav at bottom */}
      {speakersData.length > 1 && (
        <div 
          className="SpeakerReveal__nav-wrapper SpeakerReveal__nav-mobile"
          onMouseEnter={() => { isNavHovered.current = true; }}
          onMouseLeave={() => { isNavHovered.current = false; }}
        >
          <button onClick={handlePrev} className="SpeakerReveal__text-btn">← PREV</button>
          <div className="SpeakerReveal__pagination">
            <span className="current">{currentIndex + 1}</span>
            <span className="separator">/</span>
            <span className="total">{speakersData.length}</span>
          </div>
          <button onClick={handleNext} className="SpeakerReveal__text-btn">NEXT →</button>
        </div>
      )}

      {/* Subtle Footer for anticipation */}
      <div className="SpeakerReveal__footer-text">
        <p>More speakers revealing soon. Stay tuned.</p>
      </div>
    </section>
  );
}
