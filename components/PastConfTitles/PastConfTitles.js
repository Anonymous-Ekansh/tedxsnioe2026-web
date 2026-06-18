import './PastConfTitles.scss'
import useConf from '../../hooks/useConf';
import React, { useRef, useEffect, useState, useCallback } from 'react';

const conferences = [
    { id: 'conf0', year: '2025', title: 'Simplexity' },
    { id: 'conf1', year: '2024', title: 'Through The Looking Glass' },
    { id: 'conf2', year: '2023', title: 'Kaleidoscope' },
    { id: 'conf3', year: '2022', title: 'Misfits' },
    { id: 'conf4', year: '2021', title: 'Rewire' },
    { id: 'conf5', year: '2019', title: 'Blindspots' },
    { id: 'conf6', year: '2018', title: 'Out of the Blue' },
    { id: 'conf7', year: '2017', title: 'Ignite' },
    { id: 'conf8', year: '2016', title: 'conference' },
];

function PastConfTitles() {
    const { conference, setConference } = useConf();
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const animationRef = useRef(null);
    const scrollPosRef = useRef(0);
    const speedRef = useRef(1.7); // pixels per frame

    const handleClick = (value) => {
        setConference(value);
    };

    // Duplicate items for seamless loop: original + clone
    const items = [...conferences, ...conferences];

    const animate = useCallback(() => {
        const container = scrollRef.current;
        if (!container || isPaused) {
            animationRef.current = requestAnimationFrame(animate);
            return;
        }

        scrollPosRef.current += speedRef.current;

        // When we've scrolled past the first set of items, reset to start
        const halfWidth = container.scrollWidth / 2;
        if (scrollPosRef.current >= halfWidth) {
            scrollPosRef.current -= halfWidth;
        }

        container.scrollLeft = scrollPosRef.current;
        animationRef.current = requestAnimationFrame(animate);
    }, [isPaused]);

    useEffect(() => {
        animationRef.current = requestAnimationFrame(animate);
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [animate]);

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => {
        // Sync scrollPosRef with actual scroll position before resuming
        if (scrollRef.current) {
            scrollPosRef.current = scrollRef.current.scrollLeft;
        }
        setIsPaused(false);
    };

    return (
        <div
            className='PastConfTitlesContainer'
            ref={scrollRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className='PastConfTitlesContainer__track'>
                {items.map((conf, index) => {
                    const colorIndex = index % conferences.length;
                    // Deterministically generate pseudo-random pleasing bright pastel colors using golden ratio angles
                    const hue = (colorIndex * 137.5) % 360;
                    const tileColor = `hsl(${hue}, 86%, 74%)`;
                    const isActive = conference === conf.id;

                    return (
                        <React.Fragment key={`${conf.id}-${index}`}>
                            <div
                                onClick={() => handleClick(conf.id)}
                                className={`PastConfTitlesContainer__card ${isActive ? 'PastConfTitlesContainer__card--active' : ''}`}
                                style={{
                                    backgroundColor: tileColor,
                                    opacity: isActive ? 1 : 0.7,
                                }}
                            >
                                <p className='PastConfTitlesContainer__card--year'>{conf.year}</p>
                                <p className='PastConfTitlesContainer__card--title'>{conf.title}</p>
                            </div>
                            {index < items.length - 1 && (
                                <span className='PastConfTitlesContainer__divider'>●</span>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    )
}

export default PastConfTitles;
