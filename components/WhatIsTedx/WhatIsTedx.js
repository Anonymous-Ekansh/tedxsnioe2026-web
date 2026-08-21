import './WhatIsTedx.scss';
import { motion } from 'framer-motion';
import { useMotionVariants } from '../shared/motionVariants';

export default function WhatIsTedx() {
    const mv = useMotionVariants();

    return (
        <div className="WhatIsTedx">
            <motion.div
                className="WhatIsTedx__inner"
                variants={mv.staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
            >
                <motion.span className="WhatIsTedx__eyebrow" variants={mv.fadeUp}>
                    ABOUT THE PROGRAM
                </motion.span>

                <motion.h2 className="WhatIsTedx__title" variants={mv.fadeUp}>
                    What is <span className="WhatIsTedx__tedx-highlight">TED<span className="WhatIsTedx__x">x</span></span> ?
                </motion.h2>

                <motion.p className="WhatIsTedx__body" variants={mv.fadeUp}>
                    In the spirit of ideas worth spreading, TED has created a program called TEDx. TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. Our event is called TEDxShiv Nadar University, where x&nbsp;=&nbsp;independently organized TED event.
                </motion.p>

                <motion.p className="WhatIsTedx__body" variants={mv.fadeUp}>
                    At our TEDxShiv Nadar University event, TEDTalks video and live speakers will combine to spark deep discussion and connection in a small group. The TED Conference provides general guidance for the TEDx program, but individual TEDx events, including ours, are self-organized.
                </motion.p>

                <motion.div className="WhatIsTedx__divider" variants={mv.fadeIn} />

                <motion.a
                    href="https://www.ted.com/about/programs-initiatives/tedx-program"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="WhatIsTedx__link"
                    variants={mv.fadeUp}
                >
                    Learn more about TEDx program
                    <svg
                        className="WhatIsTedx__link-arrow"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                    </svg>
                </motion.a>
            </motion.div>
        </div>
    );
}
