import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './LandingSection.scss';

// SVG paths for the Mosaic logo
const logoFragments = [
    { d: "M407.45,244.94l-67.84-121.52c-8.64-15.48-32.22-9.34-32.22,8.38v127.94c0,2.65,1.43,5.09,3.74,6.4l51.8,29.2c10.62,5.99,24.09,1.6,29.15-9.49l15.63-34.28c.97-2.12.87-4.58-.27-6.62Z", fill: "#491733" },
    { d: "M434.44,244.94l67.67-121.21c8.69-15.56,32.39-9.39,32.39,8.43v127.59c0,2.65-1.43,5.09-3.74,6.4l-51.8,29.19c-10.62,5.99-24.1,1.6-29.16-9.5l-15.63-34.27c-.97-2.12-.87-4.58.27-6.62Z", fill: "#491733" },
    { d: "M428.97,271.92c-2.75-6.15-11.48-6.15-14.23,0l-16.64,37.15c-1.73,3.87-.55,8.42,2.84,10.96l16.14,12.09c2.77,2.07,6.57,2.08,9.35.02l16.3-12.12c3.41-2.53,4.6-7.1,2.87-10.98l-16.63-37.12Z", fill: "#491733" },
    { d: "M367.95,315.14l-51.07-28.43c-4.25-2.37-9.48.71-9.48,5.57v45.96c0,6.07,2.38,11.9,6.63,16.24l25.68,26.19c4.05,4.13,10.97,2.91,13.38-2.34l20.72-45.31c3.01-6.58.45-14.36-5.86-17.87Z", fill: "#491733" },
    { d: "M522.52,288.1l-46.94,26.13c-7.24,4.03-10.17,12.96-6.72,20.5l18.93,41.39c2.89,6.32,11.23,7.78,16.09,2.82l23.5-23.96c4.56-4.65,7.11-10.9,7.11-17.41v-42.43c0-6.14-6.6-10.02-11.97-7.04Z", fill: "#491733" },
    { d: "M339.9,123.95l-13.72,29.5-18.79-12.75v-8.89c0-17.73,23.58-23.86,32.22-8.38l.29.52Z", fill: "#a9acd6" },
    { tag: "polygon", points: "360.53 160.9 345.75 166.73 329.7 155.84 342.42 128.46 360.53 160.9", fill: "#e65a9a" },
    { tag: "polygon", points: "383.72 202.43 362.59 164.58 334.37 175.73 344.49 189.1 383.72 202.43", fill: "#f4c9da" },
    { tag: "polygon", points: "341.03 168.59 307.4 181.88 307.4 145.77 341.03 168.59", fill: "#e65a9a" },
    { tag: "polygon", points: "340.9 191.31 331.88 226.41 307.4 210.65 307.4 186.38 330.33 177.32 340.9 191.31", fill: "#e65a9a" },
    { tag: "polygon", points: "378.72 206.01 341.52 232.62 340.24 231.8 340.23 231.79 340.21 231.78 340.21 231.78 335.59 228.8 344.64 193.62 378.72 206.01", fill: "#f4c9da" },
    { d: "M373.46,298.01c-3.55.06-7.18-.8-10.52-2.68l-14.63-8.25s0,0,0,0l18.48-19.98,6.66,30.91Z", fill: "#a9acd6" },
    { d: "M407.72,251.56l-15.63,34.28c-2.84,6.22-8.31,10.33-14.45,11.69l-7.94-36.84c-.23-1.08-.23-2.2.02-3.28l1.31-5.8c.14-.62.62-1.11,1.23-1.26l33.57-8.32,1.62,2.91c1.14,2.03,1.24,4.49.27,6.62Z", fill: "#a9acd6" },
    { d: "M383.05,208.06l-23.22,16.61,13.26,21.17,30.62-7.6-16.66-29.85-3.03-.55c-.34-.06-.69.02-.97.22Z", fill: "#f4c9da" },
    { tag: "polygon", points: "368.07 245.71 365.95 255.08 344.49 235.64 356.42 227.11 368.07 245.71", fill: "#f4c9da" },
    { d: "M365.66,262.16l-21.1,22.81-28.06-15.81,21.65-33.6,26.95,24.41c.12.11.21.26.24.43l.32,1.76Z", fill: "#a9acd6" },
    { d: "M334.69,233.21l-21.85,33.89-3.41-1.93c-1.26-.71-2.03-2.04-2.03-3.49v-46.05s27.29,17.57,27.29,17.57Z", fill: "#a9acd6" },
    { d: "M485.47,278.85l-4.27,15.22-2.24,1.26c-10.62,5.99-24.1,1.6-29.15-9.5l-15.71-34.44,51.37,27.45Z", fill: "#a9acd6" },
    { d: "M534.49,220.68v38.44s0,.75,0,.75c0,1.51-1.79,2.3-2.91,1.29l-30.38-27.28,33.3-13.2Z", fill: "#e65a9a" },
    { tag: "polygon", points: "497.49 235.99 449.64 254.96 486.62 274.72 497.49 235.99", fill: "#a9acd6" },
    { tag: "polygon", points: "530.37 266.35 486.37 291.16 500.78 239.77 530.37 266.35", fill: "#a9acd6" },
    { d: "M534.49,132.16v46.74s-22.55-20.83-22.55-20.83l21.81-31.12c.48,1.6.74,3.34.74,5.21Z", fill: "#e65a9a" },
    { d: "M531.71,122.57l-22.88,32.64-16.03-14.81,9.3-16.66c6.86-12.29,23.09-11.03,29.61-1.17Z", fill: "#a9acd6" },
    { tag: "polygon", points: "505.44 157.77 492.99 168.37 478.6 165.85 490.7 144.16 505.44 157.77", fill: "#f4c9da" },
    { tag: "polygon", points: "532.5 182.75 491.21 196.58 495.53 171.71 508.53 160.63 532.5 182.75", fill: "#e65a9a" },
    { tag: "polygon", points: "524.36 220.68 507.71 195.47 534.49 186.51 534.49 216.81 524.36 220.68", fill: "#e65a9a" },
    { tag: "polygon", points: "520.46 222.37 484.23 236.74 490.4 201.27 503.6 196.85 520.46 222.37", fill: "#f4c9da" },
    { tag: "polygon", points: "491.18 172.32 480.31 234.86 457.45 203.74 476.44 169.72 491.18 172.32", fill: "#f4c9da" },
    { d: "M478.24,239.12l-33.44,13.26-10.87-5.81c-.08-.04-.12-.14-.09-.23l.28-.82s.01-.03.02-.04l21.06-37.72,23.04,31.36Z", fill: "#e65a9a" },
    { d: "M444.13,305.77l-21.46,4.33c-.63.13-1.28-.04-1.77-.46l-16.68-14.23,10.52-23.49c2.75-6.15,11.48-6.15,14.23,0l15.16,33.85Z", fill: "#a9acd6" },
    { d: "M420.98,315.21l-6.62,14.87-13.42-10.06c-3.39-2.54-4.57-7.09-2.84-10.95l4.33-9.68,18.54,15.82Z", fill: "#e65a9a" },
    { d: "M442.73,320.02l-16.3,12.12c-2.54,1.88-5.93,2.04-8.61.47l8.44-18.95,19.6-3.96c1.34,3.73.1,7.93-3.12,10.32Z", fill: "#e65a9a" },
    { d: "M340.81,300.03l-33.41,21.34v-29.08c0-4.87,5.23-7.94,9.49-5.58l23.92,13.32Z", fill: "#a9acd6" },
    { tag: "polyline", points: "334.03 338.82 309.13 325.24 333.97 309.36 348.21 346.56", fill: "#f4c9da" },
    { tag: "polygon", points: "368.46 344.73 359.5 364.32 354.54 351.36 368.46 344.73", fill: "#e65a9a" },
    { d: "M357.06,369.67l-3.96,8.66c-2.41,5.25-9.33,6.47-13.38,2.34l-16.47-16.8,12.23-19.48,15.04,8.21,6.54,17.08Z", fill: "#e65a9a" },
    { d: "M331.79,342.38l-11.56,18.42-6.19-6.31c-4.26-4.33-6.64-10.16-6.64-16.24v-9.18s24.4,13.32,24.4,13.32Z", fill: "#e65a9a" },
    { d: "M373.82,333.02l-2.65,5.79-18.13,8.64-15.45-40.39,7.38-4.72,22.99,12.8c6.31,3.52,8.87,11.3,5.86,17.88Z", fill: "#a9acd6" },
    { d: "M509.58,328.43l-21.28,14.32-19.61-8.39c-3.2-7.46-.25-16.17,6.88-20.13l12.54-6.98,21.47,21.18Z", fill: "#a9acd6" },
    { d: "M534.49,295.13v16.53s-21.37,14.38-21.37,14.38l-21.19-20.92,30.6-17.03c5.36-2.99,11.97.89,11.97,7.03Z", fill: "#a9acd6" },
    { d: "M534.49,316.71v20.85c0,6.51-2.56,12.76-7.12,17.41l-3.11,3.17-31.37-13.42,41.6-28Z", fill: "#f4c9da" },
    { d: "M521.12,361.34l-17.24,17.59c-4.67,4.76-12.54,3.61-15.72-2.08l14.74-23.3,18.22,7.79Z", fill: "#e65a9a" },
    { tag: "polygon", points: "499 351.88 486.06 372.34 471.28 340.02 499 351.88", fill: "#e65a9a" }
];

function getFragOffset(i) {
    const angle = ((i * 137.5) % 360) * (Math.PI / 180);
    const dist = 60 + (i * 15) % 80;
    return {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        rot: ((i % 2 === 0 ? 1 : -1) * (10 + (i * 5) % 15)),
    };
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.04 },
    },
};

function fragVariant(i) {
    const o = getFragOffset(i);
    return {
        hidden: { opacity: 0, x: o.x, y: o.y, rotate: o.rot, scale: 0.7 },
        visible: {
            opacity: 1, x: 0, y: 0, rotate: 0, scale: 1,
            transition: { duration: 1.6, ease: [0.2, 0.7, 0.2, 1] },
        },
    };
}

export default function LandingSection() {
    const prefersReducedMotion = useReducedMotion();
    const [assembled, setAssembled] = useState(false);

    useEffect(() => {
        if (prefersReducedMotion) {
            setAssembled(true);
            return;
        }
        const totalDuration = 1600 + logoFragments.length * 40 + 200;
        const timer = setTimeout(() => setAssembled(true), totalDuration);
        return () => clearTimeout(timer);
    }, [prefersReducedMotion]);

    const handleExploreClick = (e) => {
        e.preventDefault();
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    const renderFragment = (frag, i) => {
        const v = prefersReducedMotion
            ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
            : fragVariant(i);

        if (frag.tag === 'polygon') {
            return (
                <motion.polygon
                    key={i}
                    className="frag"
                    points={frag.points}
                    fill={frag.fill}
                    variants={v}
                    custom={i}
                />
            );
        } else if (frag.tag === 'polyline') {
            return (
                <motion.polyline
                    key={i}
                    className="frag"
                    points={frag.points}
                    fill={frag.fill}
                    variants={v}
                    custom={i}
                />
            );
        }
        return (
            <motion.path
                key={i}
                className="frag"
                d={frag.d}
                fill={frag.fill}
                variants={v}
                custom={i}
            />
        );
    };

    const LogoSVG = () => (
        <motion.svg
            viewBox="285 95 270 305"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid meet"
            variants={containerVariants}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate="visible"
            style={{ width: '100%', height: 'auto', display: 'block' }}
        >
            <g>
                {logoFragments.map((frag, i) => renderFragment(frag, i))}
            </g>
        </motion.svg>
    );

    return (
        <section className="hero">
            <div className="hero-bg" />
            <div className="hero-grain" />

            {/* Mosaic mark: absolutely positioned on the right */}
            <div className="mosaic-art">
                <motion.div
                    animate={
                        assembled && !prefersReducedMotion
                            ? { y: [0, -7, 0] }
                            : { y: 0 }
                    }
                    transition={
                        assembled && !prefersReducedMotion
                            ? { repeat: Infinity, repeatType: 'loop', duration: 9, ease: 'easeInOut' }
                            : {}
                    }
                    style={{ width: '100%', height: '100%' }}
                >
                    <LogoSVG />
                </motion.div>
            </div>

            {/* Top metadata line */}
            <div className="hero-top">
                <div className="meta-line">
                    <span className="dot" />
                    <span>TEDx Conference 2026</span>
                </div>
                <div className="hero-top-right">Shiv Nadar Institute of Eminence</div>
            </div>

            {/* Main content */}
            <div className="hero-main">
                <div className="hero-glow" aria-hidden="true" />

                {/* Mobile-only logo */}
                <motion.div
                    className="mobile-logo-wrapper"
                    animate={{ y: [0, -7, 0] }}
                    transition={{ repeat: Infinity, repeatType: 'loop', duration: 9, delay: 2.4, ease: 'easeInOut' }}
                >
                    <LogoSVG />
                </motion.div>

                <img
                    src="/Images/Assets/mosaic-wordmark.svg"
                    alt="MOSAIC"
                    className="mosaic-wordmark"
                />

                <p className="hero-sub">
                    In a fragmented world, breakthrough ideas emerge when separate pieces <em>connect</em>. One day. Many perspectives. Countless connections. A mosaic of ideas forming a bigger picture.
                </p>
            </div>

            {/* Bottom strip */}
            <div className="hero-bottom">
                {/* Coming soon block */}
                <div className="coming-soon-block">
                    <span className="cs-mask"><span className="cs-coming">Coming</span></span>
                    <span className="cs-mask"><span className="cs-soon">soon.</span></span>
                    <span className="cs-underline" aria-hidden="true" />
                    <div className="cs-dot-wrap">
                        <div className="cs-dot" aria-hidden="true" />
                        <span className="cs-dot-label">Stay tuned</span>
                    </div>
                </div>

                <div className="hero-actions">
                    <button className="btn-secondary" onClick={handleExploreClick}>
                        EXPLORE THEME &rarr;
                    </button>
                </div>
            </div>
        </section>
    );
}
