import './Speakers.scss';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

// Mosaic palette colors — rotated so no two adjacent cards share a color
const MOSAIC_COLORS = [
    '#e65a9a', // pink
    '#a9acd6', // lavender
    '#97d5cf', // mint
    '#f6d56f', // yellow
    '#405f3f', // forest
    '#f4c9da', // blush
];

function Speakers({ speakers }) {
    const [paused, setPaused] = useState(false);

    // Duplicate the array so the marquee loops seamlessly
    const doubled = [...speakers, ...speakers];

    return (
        <div className="SpeakersStrip">
            <h3 className="SpeakersStrip__title">Speakers &amp; Performers</h3>

            {/* Marquee container — hides overflow, holds the sliding track */}
            <div
                className="SpeakersStrip__marquee"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <div
                    className={`SpeakersStrip__track ${paused ? 'SpeakersStrip__track--paused' : ''}`}
                >
                    {doubled.map((speaker, idx) => {
                        const cardColor = MOSAIC_COLORS[idx % MOSAIC_COLORS.length];

                        return (
                            <div className="SpeakersStrip__item" key={idx}>
                                <div
                                    className="SpeakersStrip__card"
                                    style={{ backgroundColor: cardColor }}
                                >
                                    <div className="SpeakersStrip__card-img">
                                        <Image
                                            src={speaker.image}
                                            alt={speaker.name}
                                            fill
                                            quality={85}
                                            sizes="(max-width: 600px) 42vw, 200px"
                                            style={{
                                                objectFit: 'cover',
                                                objectPosition: speaker.objectPosition || 'center 15%',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="SpeakersStrip__info">
                                    <p className="SpeakersStrip__name">{speaker.name}</p>
                                    {speaker.profession && (
                                        <p className="SpeakersStrip__role">{speaker.profession}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Speakers;
