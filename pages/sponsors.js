import '../styles/routes/sponsors.scss'
import { motion } from 'framer-motion';
import { useMotionVariants } from '../components/shared/motionVariants';
import Image from 'next/image';

export default function Sponsors() {
    const mv = useMotionVariants();

    const pastSponsors = [
        { url: "/Images/Sponsors/s1.png" },
        { url: "/Images/Sponsors/s2.png" },
        { url: "/Images/Sponsors/s3.png" },
        { url: "/Images/Sponsors/s4.png" },
        { url: "/Images/Sponsors/s5.png" },
        { url: "/Images/Sponsors/s6.png" },
        { url: "/Images/Sponsors/s7.png" },
        { url: "/Images/Sponsors/s8.png" },
        { url: "/Images/Sponsors/s9.png" },
        { url: "/Images/Sponsors/s10.png" },
        { url: "/Images/Sponsors/s11.png" },
        { url: "/Images/Sponsors/s12.png" },
        { url: "/Images/Sponsors/s13.png" },
        { url: "/Images/Sponsors/s14.png" },
        { url: "/Images/Sponsors/s15.png" },
        { url: "/Images/Sponsors/s16.png" },
        { url: "/Images/Sponsors/s17.png" },
        { url: "/Images/Sponsors/s19.png" },
        { url: "/Images/Sponsors/s20.png" },
        { url: "/Images/Sponsors/s21.png" },
        { url: "/Images/Sponsors/s22.png" },
        { url: "/Images/Sponsors/s23.png" },
        { url: "/Images/Sponsors/s24.png" },
        { url: "/Images/Sponsors/s25.png" },
        { url: "/Images/Sponsors/s26.png" },
        { url: "/Images/Sponsors/s27.png" },
        { url: "/Images/Sponsors/s28.png" },
        { url: "/Images/Sponsors/s29.png" },
        { url: "/Images/Sponsors/s30.png" },
        { url: "/Images/Sponsors/s31.png" },
        { url: "/Images/Sponsors/s32.png" },
        { url: "/Images/Sponsors/s33.png" },
        { url: "/Images/Sponsors/s34.png" },
        { url: "/Images/Sponsors/s35.png" },
        { url: "/Images/Sponsors/s36.png" },
        { url: "/Images/Sponsors/s37.png" },
        { url: "/Images/Sponsors/s38.png" },
        { url: "/Images/Sponsors/s39.png" },
        { url: "/Images/Sponsors/s40.png" },
        { url: "/Images/Sponsors/s41.png" },
        { url: "/Images/Sponsors/s42.png" },
        { url: "/Images/Sponsors/s43.png" },
        { url: "/Images/Sponsors/s44.png" },
        { url: "/Images/Sponsors/s45.png" },
        { url: "/Images/Sponsors/s46.png" },
        { url: "/Images/Sponsors/s47.png" },
        { url: "/Images/Sponsors/s48.png" },
        { url: "/Images/Sponsors/s49.png" },
        { url: "/Images/Sponsors/s50.png" },
        { url: "/Images/Sponsors/s51.png" },
        { url: "/Images/Sponsors/s52.png" },
        { url: "/Images/Sponsors/s53.png" },
        { url: "/Images/Sponsors/s54.png" },
        { url: "/Images/Sponsors/s55.png" },
        { url: "/Images/Sponsors/s56.png" },
        { url: "/Images/Sponsors/s57.png" },
        { url: "/Images/Sponsors/s58.png" },
        { url: "/Images/Sponsors/s59.png" },
        { url: "/Images/Sponsors/s60.png" },
        { url: "/Images/Sponsors/s61.png" },
        { url: "/Images/Sponsors/s62.png" },
        { url: "/Images/Sponsors/s63.png" }
    ]
    return (

        <div className="AllSponsors">
            {/* Header */}
            <motion.div
                className="AllSponsors__header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.15 } },
                }}
            >
                <motion.p className='AllSponsors__eyebrow' variants={mv.fadeUp}>
                    BUILT WITH
                </motion.p>
                <motion.p className='AllSponsors__heading' variants={mv.fadeUp}>
                    PAST SPONSORS
                </motion.p>
            </motion.div>

            {/* Logo field — staggered flex, monochrome with hover color */}
            <motion.div
                className='AllSponsors__cards'
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.05 } },
                }}
            >
                {pastSponsors.map((item, index) => {
                    return (
                        <motion.div
                            className={`AllSponsors__cards--item ${index % 2 !== 0 ? 'AllSponsors__cards--item-offset' : ''}`}
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
                            <div className='AllSponsors__cards--image'>
                                <Image 
                                    src={item.url} 
                                    alt={`Sponsor ${index + 1}`}
                                    fill
                                    quality={95}
                                    priority={index < 6}
                                    style={{
                                        objectFit: 'contain',
                                        objectPosition: 'center',
                                        padding: '0.5rem'
                                    }}
                                />
                            </div>
                        </motion.div>
                    )
                })}
            </motion.div>
        </div>
    )
}