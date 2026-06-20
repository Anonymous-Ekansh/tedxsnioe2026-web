import Link from 'next/link';
import './Sponsors.scss';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useMotionVariants } from '../shared/motionVariants';

export default function Sponsors() {
    const mv = useMotionVariants();

    const pastSponsors = [
        { url: "/Images/Sponsors/s1.png", name: "Cornitos" },
        { url: "/Images/Sponsors/s2.png", name: "Brew House" },
        { url: "/Images/Sponsors/s3.png", name: "Popman" },
        { url: "/Images/Sponsors/s4.png", name: "Oddity" },
        { url: "/Images/Sponsors/s5.png", name: "Shunya" },
        { url: "/Images/Sponsors/s6.png", name: "Pepsi" },
        { url: "/Images/Sponsors/s7.png", name: "Peppy" },
        { url: "/Images/Sponsors/s8.png", name: "Arthi Dances" },
        { url: "/Images/Sponsors/s9.png", name: "ED Times" },
        { url: "/Images/Sponsors/s10.png", name: "Social Rush" },
    ];

    return (
        <div className="SponsorsRedesign">
            {/* Heading */}
            <motion.div
                className="SponsorsRedesign__header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.15 } },
                }}
            >
                <motion.h2 className="SponsorsRedesign__title" variants={mv.fadeUp}>
                    BUILT WITH
                </motion.h2>
                <motion.p className="SponsorsRedesign__subline" variants={mv.fadeUp}>
                    Our Past Sponsors
                </motion.p>
            </motion.div>

            {/* Logo field — staggered flex */}
            <motion.div
                className="SponsorsRedesign__logos"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.08 } },
                }}
            >
                {pastSponsors.map((item, index) => (
                    <motion.div
                        className={`SponsorsRedesign__logo-item ${index % 2 !== 0 ? 'SponsorsRedesign__logo-item--offset' : ''}`}
                        key={index}
                        variants={mv.shouldAnimate ? {
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.7, ease: 'easeOut' },
                            },
                        } : { hidden: { opacity: 1 }, visible: { opacity: 1 } }}
                    >
                        <div className="SponsorsRedesign__logo-image">
                            <Image
                                src={item.url}
                                alt={item.name}
                                fill
                                quality={95}
                                priority={index < 5}
                                style={{
                                    objectFit: 'contain',
                                    objectPosition: 'center',
                                }}
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Separator + View All */}
            <motion.div
                className="SponsorsRedesign__footer"
                variants={mv.fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="SponsorsRedesign__separator" />
                <Link href="/sponsors" className="SponsorsRedesign__view-all">
                    View All
                </Link>
            </motion.div>
        </div>
    );
}
