import React, { useEffect, useRef } from 'react';
import './PastSpeakers.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function PastSpeakers() {
    const gridRef = useRef(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.15,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target); // Animate once, then unobserve
                }
            });
        }, observerOptions);

        const cards = gridRef.current?.querySelectorAll('.Speakers__card');
        if (cards) {
            cards.forEach((card) => observer.observe(card));
        }

        return () => {
            if (cards) {
                cards.forEach((card) => observer.unobserve(card));
            }
        };
    }, []);

    const currentSpeakers = [
        {
            name: 'Maniesh Paul',
            role: 'Actor & Television Presenter',
            image: '/Images/maniesh.jpeg',
        },
        {
            name: 'Kapil Dev',
            role: 'Former Indian Cricketer',
            image: '/Images/2018_speakers/kapildev.jpg',
        },
        {
            name: 'Nandita Das',
            role: 'Actor & Filmmaker',
            image: '/Images/2018_speakers/nandita.jpg',
        },
        {
            name: 'Roshni Nadar',
            role: 'Chairperson of HCL Technologies',
            image: '/Images/2018_speakers/roshni.jpg',
        },
        {
            name: 'Ankur Warikoo',
            role: 'Entrepreneur & Author',
            image: '/Images/2018_speakers/ankur.jpg',
        },
        {
            name: 'Tanu Jain',
            role: 'Educator & Former IAS Officer',
            image: '/Images/2024_speakers/Tanu Jain.png',
        }
    ];

    return (
        <div className="Speakers" style={{ position: 'relative', zIndex: 2 }}>
            {/* Section heading */}
            <div className="Speakers__header">
                <h2 className="Speakers__title">VOICES</h2>
                <p className="Speakers__subline">that shaped the stage</p>
            </div>

            {/* Speaker cards 2x3 grid */}
            <div className="Speakers__grid" ref={gridRef}>
                {currentSpeakers.map((speaker, idx) => (
                    <Link
                        href="/pastConferences"
                        className="Speakers__card"
                        key={speaker.name}
                        style={{ '--delay': `${idx * 80}ms` }}
                        aria-label={`Learn more about speaker ${speaker.name}, ${speaker.role}`}
                    >
                        <div className="Speakers__card-image">
                            <Image
                                src={speaker.image}
                                alt={`${speaker.name} - ${speaker.role}`}
                                fill
                                sizes="(max-width: 500px) 100vw, (max-width: 915px) 50vw, 33vw"
                                loading="lazy"
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center top',
                                }}
                            />
                        </div>
                        <div className="Speakers__card-info">
                            <p className="Speakers__card-name">{speaker.name}</p>
                            <p className="Speakers__card-role">{speaker.role}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Know more link */}
            <div className="Speakers__link-wrap">
                <Link href="/pastConferences" className="Speakers__link">
                    Know more <span className="Speakers__link-arrow">&rarr;</span>
                </Link>
            </div>
        </div>
    );
}
