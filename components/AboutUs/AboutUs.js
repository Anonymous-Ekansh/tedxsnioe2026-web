import React from 'react';
import { motion } from 'framer-motion';
import { useMotionVariants } from '../shared/motionVariants';
import MosaicGame from '../shared/MosaicGame';
import './AboutUs.scss';

function AboutUs() {
  const mv = useMotionVariants();

  return (
    <div className="AboutUs" id="about-content">
      <div className="AboutUs__inner">
        {/* Mobile: mosaic above text */}
        <motion.div
          className="AboutUs__mosaic AboutUs__mosaic--mobile"
          variants={mv.fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <MosaicGame />
        </motion.div>

        {/* Text column — 55% */}
        <motion.div
          className="AboutUs__text"
          variants={mv.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.span className="AboutUs__eyebrow" variants={mv.fadeUp}>
            THE MOSAIC IDEA
          </motion.span>

          <motion.h2 className="AboutUs__heading" variants={mv.fadeUp}>
            Every piece has a place.
          </motion.h2>

          <motion.p className="AboutUs__body" variants={mv.fadeUp}>
            A mosaic only reveals its image when every fragment finds its position. That is what
            Mosaic is about — the recognition that ideas, people, and moments gain meaning not in
            isolation, but through connection. Each piece carries its own color and shape; together,
            they compose something none could form alone.
          </motion.p>

          <motion.p className="AboutUs__body" variants={mv.fadeUp}>
            TEDxShivNadarUniversity brings those fragments into one room. Speakers from vastly
            different worlds share the insights that shaped their thinking, and the audience
            discovers how those perspectives interlock. One day of talks becomes a living mosaic —
            assembled in real time, unrepeatable, and bigger than the sum of its parts.
          </motion.p>

          <motion.div className="AboutUs__divider" variants={mv.fadeIn} />
        </motion.div>

        {/* Mosaic column — 45% (desktop only) */}
        <div className="AboutUs__mosaic AboutUs__mosaic--desktop">
          <MosaicGame />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
