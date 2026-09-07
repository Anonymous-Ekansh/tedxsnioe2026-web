import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

import AboutUs from "../components/AboutUs/AboutUs";
import LandingSection from "../components/LandingSection/LandingSection";
import PastSpeakers from "../components/PastSpeakers/PastSpeakers";
import WhatIsTedx from "../components/WhatIsTedx/WhatIsTedx";
import RegistrationCTA from "../components/RegistrationCTA/RegistrationCTA";
import SpeakerReveal from "../components/SpeakerReveal/SpeakerReveal";

import '../styles/routes/home.scss'

export default function Home() {
    const { scrollYProgress } = useScroll(); // Tracks the entire window scroll

    // Map the full 0-1 page scroll to the exact color journey
    // Hero (0%) -> SpeakerReveal (15%) -> PastSpeakers (35%) -> About (60%) -> WhatIs (80%) -> CTA (100%)
    const color1 = useTransform(scrollYProgress, [0, 0.15, 0.35, 1], ["rgba(230, 90, 154, 0.26)", "rgba(73, 23, 51, 0.4)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"]);
    const color2 = useTransform(scrollYProgress, [0, 0.15, 0.35, 1], ["rgba(244, 201, 218, 0.20)", "rgba(73, 23, 51, 0.3)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"]);
    const color3 = useTransform(scrollYProgress, [0, 0.15, 0.35, 1], ["rgba(169, 172, 214, 0.18)", "rgba(73, 23, 51, 0.2)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"]);
    
    // Base linear gradient mapping the site's palette
    const baseStart = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.6, 0.8, 1], ["#160611", "#1b0915", "#491733", "#491733", "#1B2432", "#0d0d0d"]);
    const baseMid = useTransform(scrollYProgress,   [0, 0.15, 0.35, 0.6, 0.8, 1], ["#241020", "#331024", "#491733", "#1B2432", "#0d0d0d", "#0d0d0d"]);
    const baseEnd = useTransform(scrollYProgress,   [0, 0.15, 0.35, 0.6, 0.8, 1], ["#491733", "#491733", "#491733", "#1B2432", "#0d0d0d", "#0d0d0d"]);

    const backgroundTemplate = useMotionTemplate`
      radial-gradient(900px 600px at 18% 30%, ${color1}, transparent 62%),
      radial-gradient(720px 520px at 82% 68%, ${color2}, transparent 60%),
      radial-gradient(540px 420px at 58% 18%, ${color3}, transparent 60%),
      linear-gradient(135deg, ${baseStart} 0%, ${baseMid} 56%, ${baseEnd} 100%)
    `;

    return (
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            {/* Global Continuous Background */}
            <motion.div 
                style={{ 
                    position: 'fixed', 
                    inset: 0, 
                    zIndex: -1, 
                    background: backgroundTemplate 
                }} 
            />
            {/* Global Grain Texture */}
            <div 
                style={{ 
                    position: 'fixed', 
                    inset: 0, 
                    zIndex: 0, 
                    opacity: 0.35, 
                    mixBlendMode: 'overlay', 
                    pointerEvents: 'none', 
                    backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\'/></filter><rect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/></svg>")' 
                }} 
            />

            {/* Content Layers */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <section className="LandingPageSection" id="home">
                    <LandingSection />
                </section>

                <SpeakerReveal />

                <section id="past-speakers" className="PastSpeakersSection">
                    <PastSpeakers />
                </section>

                <section id="about" className="AboutSection">
                    <AboutUs />
                </section>
                
                <section id="what-is-tedx" className="WhatIsTedxSection">
                    <WhatIsTedx />
                </section>

                <section id="register-cta" className="CTASection">
                    <RegistrationCTA />
                </section>
            </div>
        </div>
    )
}
