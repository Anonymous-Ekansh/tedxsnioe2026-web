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
            Join us at TEDxShiv Nadar University as we explore Mosaic—a celebration of the ideas, perspectives, and discoveries that shape the way we understand our world.
          </motion.p>

          <motion.p className="AboutUs__body" variants={mv.fadeUp}>
            Like the pieces of a mosaic, great ideas rarely exist in isolation. They emerge from different disciplines, challenge one another, and connect in unexpected ways to reveal a larger picture.
          </motion.p>

          <motion.p className="AboutUs__body" variants={mv.fadeUp}>
            Through thought-provoking talks and engaging discussions, TEDxShiv Nadar University brings together researchers, entrepreneurs, artists, scientists, innovators, educators, and changemakers whose ideas inspire curiosity, spark dialogue, and encourage fresh approaches to the challenges of our time. We celebrate ideas from our own community, creating a platform where local voices and global perspectives come together.
          </motion.p>

          <motion.p className="AboutUs__body" variants={mv.fadeUp}>
            At TEDxShiv Nadar University, we believe that Ideas Change Everything. Mosaic celebrates the power of bringing together our community to spark conversations that shape the future. Because every idea is a piece of something bigger.
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
