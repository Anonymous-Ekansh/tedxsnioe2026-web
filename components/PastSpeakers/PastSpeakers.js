import './PastSpeakers.scss';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMotionVariants } from '../shared/motionVariants';

export default function PastSpeakers() {
    const mv = useMotionVariants();

    // Current speakers data (preserved)
    const currentSpeakers = [
        {
            name: 'Maniesh Paul',
            image: '/Images/maniesh.jpeg',
        },
        {
            name: 'Kapil Dev',
            image: '/Images/2018_speakers/kapildev.jpg',
        },
        {
            name: 'Nandita Das',
            image: '/Images/2018_speakers/nandita.jpg',
        },
        {
            name: 'Roshni Nadar',
            image: '/Images/2018_speakers/roshni.jpg',
        },
        {
            name: 'Ankur Warikoo',
            image: '/Images/2018_speakers/ankur.jpg',
        },
        {
            name: 'Tanu Jain',
            image: '/Images/2024_speakers/Tanu Jain.png',
        }
    ];

    return (
        <div className="Speakers" style={{ position: 'relative', zIndex: 2 }}>
            {/* Section heading */}
            <motion.div
                className="Speakers__header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.15 } },
                }}
            >
                <motion.h2
                    className="Speakers__title"
                    variants={mv.shouldAnimate ? {
                        hidden: { opacity: 0, scale: 0.97, y: 20 },
                        visible: {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            transition: { duration: 0.85, ease: 'easeOut' },
                        },
                    } : { hidden: { opacity: 1 }, visible: { opacity: 1 } }}
                >
                    VOICES
                </motion.h2>
                <motion.p
                    className="Speakers__subline"
                    variants={mv.fadeUp}
                >
                    that shaped the stage
                </motion.p>
            </motion.div>

            {/* Speaker cards grid */}
            <motion.div
                className="Speakers__grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.15 } },
                }}
            >
                {currentSpeakers.map((speaker, idx) => (
                    <motion.div
                        className="Speakers__card"
                        key={speaker.name}
                        variants={mv.shouldAnimate ? {
                            hidden: { opacity: 0, y: 50 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.85, ease: 'easeOut' },
                            },
                        } : { hidden: { opacity: 1 }, visible: { opacity: 1 } }}
                    >
                        <div className="Speakers__card-image">
                            <Image
                                src={speaker.image}
                                alt={speaker.name}
                                fill
                                quality={95}
                                priority={idx < 3}
                                sizes="(max-width: 780px) 100vw, 33vw"
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center top',
                                }}
                            />
                            {/* Mosaic polygon overlay */}
                            <div className="Speakers__card-mosaic" aria-hidden="true">
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <polygon
                                        points="0,0 200,0 200,120 140,200 0,160"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="Speakers__card-info">
                            <p className="Speakers__card-name">{speaker.name}</p>
                        </div>
                        {/* Hover name overlay — appears over mosaic polygon */}
                        <div className="Speakers__card-name-hover">
                            <p>{speaker.name}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Know more link */}
            <motion.div
                className="Speakers__link-wrap"
                variants={mv.fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <Link href="/pastConferences" className="Speakers__link">
                    Know more <span className="Speakers__link-arrow">&rarr;</span>
                </Link>
            </motion.div>
        </div>
    );
}
