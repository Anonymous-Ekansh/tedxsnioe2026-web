import React, { useRef, useEffect, useState, useCallback } from 'react';
import './PastConfSlider.scss';
import Image from 'next/image';

const IMAGES = [
    { url: "/Images/pastconf/2019_ted.jpg", year: "2019" },
    { url: "/Images/pastconf/2020_ted.jpg", year: "2020" },
    { url: "/Images/pastconf/2021_ted.jpg", year: "2021" },
    { url: "/Images/pastconf/2022_ted.jpg", year: "2022" },
    { url: "/Images/pastconf/2018_ted.jpg", year: "2018" },
];

export default function PastConfSlider() {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const scrollPosRef = useRef(0);
    const activeIdxRef = useRef(IMAGES.length); // Start at index 5 (first element of second set)
    const animationRef = useRef(null);

    // Quadruple the list of images to ensure a seamless infinite scroll loop
    const items = [...IMAGES, ...IMAGES, ...IMAGES, ...IMAGES];

    const updateScaling = useCallback(() => {
        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track) return;

        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        // Effect boundary: width of half the container
        const maxDistance = containerRect.width / 2; 

        const children = track.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const childRect = child.getBoundingClientRect();
            const childCenter = childRect.left + childRect.width / 2;
            const distance = Math.abs(containerCenter - childCenter);

            // 1 at center, 0 at the edges of the container
            const normalizedDistance = Math.min(distance / maxDistance, 1);
            const ease = (1 + Math.cos(normalizedDistance * Math.PI)) / 2; // Cosine easing

            // Card size: Center is scaled up to 1.32x, flanking slides shrink to 0.78x
            const scale = 0.78 + ease * 0.54; 
            const zIndex = Math.round(ease * 20);
            
            // Gold border styling: highlights center item with solid border and glow
            const borderOpacity = 0.15 + ease * 0.85;
            const borderWidth = 2 + ease * 3; // Thicker border at the center
            const shadowGlow = ease * 0.35;

            // Direct DOM style manipulation for smooth rendering transitions
            const imgWrapper = child.querySelector('.PastConfSliderContainer__image-wrapper');
            if (imgWrapper) {
                imgWrapper.style.transform = `scale(${scale})`;
                imgWrapper.style.zIndex = zIndex;
                imgWrapper.style.borderWidth = `${borderWidth}px`;
                imgWrapper.style.borderColor = `rgba(246, 213, 111, ${borderOpacity})`;
                imgWrapper.style.boxShadow = `0 16px 48px rgba(0, 0, 0, 0.5), 0 0 30px rgba(246, 213, 111, ${shadowGlow})`;
            }
        }
    }, []);

    const animate = useCallback(() => {
        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track) {
            animationRef.current = requestAnimationFrame(animate);
            return;
        }

        const slide = track.children[0];
        const slideWidth = slide ? slide.getBoundingClientRect().width : 0;
        const containerWidth = container.getBoundingClientRect().width;

        if (slideWidth && containerWidth) {
            const targetScrollLeft = (activeIdxRef.current * slideWidth) + (slideWidth / 2) - (containerWidth / 2);
            
            // Smoothly slide to the target center position using Eased Lerp
            const diff = targetScrollLeft - scrollPosRef.current;
            
            if (Math.abs(diff) > 0.5) {
                scrollPosRef.current += diff * 0.085; // Easing factor
                container.scrollLeft = scrollPosRef.current;
            } else {
                scrollPosRef.current = targetScrollLeft;
                container.scrollLeft = scrollPosRef.current;
                
                // Infinite loop reset logic:
                // If we've completed the transition to slide index >= 10, snap back seamlessly to index 5
                if (activeIdxRef.current >= IMAGES.length * 2) {
                    activeIdxRef.current -= IMAGES.length;
                    const newTarget = (activeIdxRef.current * slideWidth) + (slideWidth / 2) - (containerWidth / 2);
                    scrollPosRef.current = newTarget;
                    container.scrollLeft = newTarget;
                }
            }
        }

        // Always update scaling based on position
        updateScaling();

        animationRef.current = requestAnimationFrame(animate);
    }, [updateScaling]);

    useEffect(() => {
        // Position initial scroll at the center (index 5)
        const initScroll = () => {
            const container = containerRef.current;
            const track = trackRef.current;
            if (container && track) {
                const slide = track.children[0];
                const slideWidth = slide ? slide.getBoundingClientRect().width : 0;
                const containerWidth = container.getBoundingClientRect().width;
                if (slideWidth && containerWidth) {
                    const startScroll = (activeIdxRef.current * slideWidth) + (slideWidth / 2) - (containerWidth / 2);
                    scrollPosRef.current = startScroll;
                    container.scrollLeft = startScroll;
                    updateScaling();
                }
            }
        };

        // Delay slightly to ensure browser has completed layout and rendered elements
        setTimeout(initScroll, 100);

        animationRef.current = requestAnimationFrame(animate);
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [animate, updateScaling]);

    // Timer interval to change index every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused) {
                activeIdxRef.current += 1;
            }
        }, 3000); // 3-second delay on each slide

        return () => clearInterval(interval);
    }, [isPaused]);

    // Handle manual scroll sync if the user manually drags the carousel
    const handleScroll = () => {
        if (containerRef.current) {
            scrollPosRef.current = containerRef.current.scrollLeft;
            updateScaling();
        }
    };

    return (
        <div
            className="PastConfSliderContainer"
            ref={containerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
                if (containerRef.current) {
                    scrollPosRef.current = containerRef.current.scrollLeft;
                }
                setIsPaused(false);
            }}
            onScroll={handleScroll}
        >
            <div className="PastConfSliderContainer__track" ref={trackRef}>
                {items.map((item, index) => (
                    <div key={index} className="PastConfSliderContainer__slide">
                        <div className="PastConfSliderContainer__image-wrapper">
                            <Image
                                src={item.url}
                                alt={`Conference ${item.year}`}
                                fill
                                sizes="(max-width: 768px) 21vw, 17vw"
                                priority={index % IMAGES.length === 0}
                                className="PastConfSliderContainer__img"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}