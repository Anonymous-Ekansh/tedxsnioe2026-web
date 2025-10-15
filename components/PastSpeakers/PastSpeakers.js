import './PastSpeakers.scss';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Speakers from '../Speakers/Speakers';

export default function PastSpeakers() {
    // Current speakers data
    const currentSpeakers = [
        {
            name: 'Prayag Shukla',
            profession: 'Poet, Author, Art Curator, truly a luminary of the Indian traditional soul, works spanning decades. He reveals poetry in the subtleties of everyday life and to appreciate it in a way that matters, and strengthens the enduring power of language and media in the world around us.',
            image: '/Images/CurrentSpeakers/prayag.png',
        },
        {
            name: 'Anirban Bhattacharya',
            profession: 'Creator of a show running on every TV since 2012, Savdhaan India. True Crime aficionado and author of books that range from serial killers to the Indian Money Heist. Through his creative mind, he creates and shows you a world through his words alone instantly.',
            image: '/Images/CurrentSpeakers/anirban.png',
        },
        {
            name: 'Dr. Saumitra Rawat',
            profession: "Dr. Saumitra Rawat is the Chairman and Head of Surgical Gastroenterology, GI and HPB Oncology Surgery & Liver Transplant at Sir Ganga Ram Hospital, New Delhi. A Padma Shri awardee and global pioneer in laparoscopic and robotic surgery, he has trained and mentored surgeons worldwide through the Royal College of Surgeons of England.",
            image: '/Images/CurrentSpeakers/saumitra.png',
        },
        {
            name: 'Chef Vanika Choudhary',
            profession: "Chef Vanika Choudhary has been at the forefront of the farm-to-table movement in India since she founded Sequel in 2016, and Noon in 2022. A successful entrepreneur in the culinary field, her culinary philosophy of celebrating diverse indigenous cultures and their thoughtfully-sourced produce is what sets her apart.",
            image: '/Images/CurrentSpeakers/vanika.jpg',
        },
    ];

    const [isSmall, setIsSmall] = useState(false);
    const [isMedium, setIsMedium] = useState(false);
    const [activeCardId, setActiveCardId] = useState(null);
    
    // Function to handle touch interactions on cards
    const handleCardClick = (id) => {
        if (activeCardId === id) {
            // If clicking on already active card, deactivate it
            setActiveCardId(null);
        } else {
            // Set this card as active
            setActiveCardId(id);
        }
    };
    
    useEffect(() => {
        if (window.innerWidth <= 768) {
            setIsSmall(true);
            setIsMedium(false);
        } else if (window.innerWidth > 768 && window.innerWidth <= 1200) {
            setIsSmall(false);
            setIsMedium(true);
        } else {
            setIsSmall(false);
            setIsMedium(false);
        }
        
        // Reset active card when clicking outside
        const handleClickOutside = (e) => {
            if (!e.target.closest('.OurSpeakers__content--card')) {
                setActiveCardId(null);
            }
        };
        
        document.addEventListener('click', handleClickOutside);
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className='PastSpeakers'>
                <div className='PastSpeakers__heading'>OUR SPEAKERS</div>
                <div className='PastSpeakers__cards'>
                    <div className="OurSpeakers__content">
                        {currentSpeakers.map((speaker, idx) => (
                            <div 
                                className={`OurSpeakers__content--card ${activeCardId === speaker.name ? 'active' : ''}`}
                                key={speaker.name}
                                tabIndex={0}
                                role="button"
                                aria-label={`${speaker.name}, ${speaker.profession}`}
                                onClick={() => handleCardClick(speaker.name)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleCardClick(speaker.name);
                                    }
                                }}
                            >
                                <div className="OurSpeakers__content--card__image-container">
                                    <div className="OurSpeakers__content--card__overlay"></div>
                                    <Image 
                                        className="OurSpeakers__content--card__image" 
                                        src={speaker.image} 
                                        alt={`${speaker.name} - ${speaker.profession}`} 
                                        width={300} 
                                        height={300} 
                                        quality={95} 
                                        priority={idx === 0} 
                                    />
                                    <div className="OurSpeakers__content--card__hover-details">
                                        <p className="OurSpeakers__content--card__hover-details--profession">{speaker.profession}</p>
                                    </div>
                                </div>
                                <div className="OurSpeakers__content--card__name-container">
                                    <p className="OurSpeakers__content--card__name">{speaker.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='PastSpeakers'>
                <div className='PastSpeakers__heading'>..stay tuned</div>
                {/* Keep your custom hover cards or other sections here as needed */}
            </div>
        </>
    );
}
