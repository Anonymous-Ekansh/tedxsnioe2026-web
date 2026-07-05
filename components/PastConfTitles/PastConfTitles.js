import './PastConfTitles.scss'
import useConf from '../../hooks/useConf';
import React, { useRef, useEffect, useState, useCallback } from 'react';

const conferences = [
    { id: 'conf0', year: '2025', title: 'Simplexity', themeColor: '#e62b1e' },
    { id: 'conf1', year: '2024', title: 'Through The Looking Glass', themeColor: '#72d3f7' },
    { id: 'conf2', year: '2023', title: 'Kaleidoscope', themeColor: '#9c51b6' },
    { id: 'conf3', year: '2022', title: 'Misfits', themeColor: '#f39c12' },
    { id: 'conf4', year: '2021', title: 'Rewire', themeColor: '#2ecc71' },
    { id: 'conf5', year: '2019', title: 'Blindspots', themeColor: '#34495e' },
    { id: 'conf6', year: '2018', title: 'Out of the Blue', themeColor: '#3498db' },
    { id: 'conf7', year: '2017', title: 'Ignite', themeColor: '#e74c3c' },
    { id: 'conf8', year: '2016', title: 'conference', themeColor: '#95a5a6' },
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
                    const tileColor = conf.themeColor || '#e62b1e';
                    const isActive = conference === conf.id;
                    const textStyle = { color: '#ffffff' };
                    const titleTextStyle = { color: 'rgba(255, 255, 255, 0.85)' };

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
                                <p className='PastConfTitlesContainer__card--year' style={textStyle}>{conf.year}</p>
                                <p className='PastConfTitlesContainer__card--title' style={titleTextStyle}>{conf.title}</p>
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
