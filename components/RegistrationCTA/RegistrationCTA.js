import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMotionVariants } from '../shared/motionVariants';
import ButterflyLogo from '../shared/ButterflyLogo';
import './RegistrationCTA.scss';

export default function RegistrationCTA() {
    const mv = useMotionVariants();

    return (
        <div className="CTA">
            {/* Ghost butterfly watermark */}
            <div className="CTA__butterfly" aria-hidden="true">
                <ButterflyLogo
                    size={400}
                    breathing={true}
                    className="CTA__butterfly-svg"
                />
            </div>

            {/* Content */}
            <motion.div
                className="CTA__content"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.2 } },
                }}
            >
                {/* Chapter marker */}
                <motion.span
                    className="CTA__marker"
                    variants={mv.fadeIn}
                >
                    TED<span style={{ textTransform: 'none' }}>x</span> CONFERENCE 2026
                </motion.span>

                {/* Be part of / the picture. */}
                <div className="CTA__heading-wrap">
                    <motion.h2
                        className="CTA__heading CTA__heading--white"
                        variants={mv.shouldAnimate ? {
                            hidden: { opacity: 0, x: -120 },
                            visible: {
                                opacity: 1,
                                x: 0,
                                transition: { duration: 1, ease: 'easeOut' },
                            },
                        } : { hidden: { opacity: 1 }, visible: { opacity: 1 } }}
                    >
                        Be part of
                    </motion.h2>
                    <motion.h2
                        className="CTA__heading CTA__heading--pink"
                        variants={mv.shouldAnimate ? {
                            hidden: { opacity: 0, x: 120 },
                            visible: {
                                opacity: 1,
                                x: 0,
                                transition: { duration: 1, ease: 'easeOut' },
                            },
                        } : { hidden: { opacity: 1 }, visible: { opacity: 1 } }}
                    >
                        the picture.
                    </motion.h2>
                </div>

                {/* Supporting copy */}
                <motion.p
                    className="CTA__copy"
                    variants={mv.shouldAnimate ? {
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.7, ease: 'easeOut', delay: 0.4 },
                        },
                    } : { hidden: { opacity: 1 }, visible: { opacity: 1 } }}
                >
                    Register your interest for MOSAIC. Every attendee is a tile — without you, the picture is incomplete.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    className="CTA__buttons"
                    variants={mv.shouldAnimate ? {
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.7, ease: 'easeOut', delay: 0.6 },
                        },
                    } : { hidden: { opacity: 1 }, visible: { opacity: 1 } }}
                >
                    <Link href="/register" className="CTA__btn CTA__btn--primary">
                        REGISTER NOW <span className="CTA__btn-arrow">&rarr;</span>
                    </Link>
                    <Link href="/contact" className="CTA__btn CTA__btn--secondary">
                        Contact Us
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
