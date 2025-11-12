import './PastSpeakers.scss';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Speakers from '../Speakers/Speakers';

export default function PastSpeakers() {
    // Current speakers data
    const currentSpeakers = [
        {
            name: 'Dr. Rupamanjari Ghosh',
            profession: " Extremely decorated professor in the field of quantum mechanics, also former Vice-Chancellor of Shiv Nadar University. She aims to bring the field of quantum sciences to the layman in the audience. How the intricacies of the universe, its motion, its stillness does impact our lives, as humans and our place in the universe.  ",
            image: '/Images/CurrentSpeakers/sumitra.png',
        },
        {
            name: 'Tanmaya jain',
            profession: " Tanmaya Jain, CEO of InFeedo AI and Shiv Nadar University alumnus, is a Forbes Asia 30 Under 30 entrepreneur who raised $16M by age 18 and impacted 2M+ employees globally.Backed by top VCs and Y-Combinator, he exemplifies the innovation nurtured at our own campus.His talk highlights how India’s growing college startup culture shapes the nation’s future mindset and workplace culture. ",
            image: '/Images/CurrentSpeakers/tanmaya_jain.jpeg',
        },
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
       
        {
            name: 'Madhav Raman',
            profession: " Founder of Anagram Architects, he works at the intersection of cultural history, urban economics, and sustainable design. A leading green architect, his work explores transit systems, urban ecologies, and multidisciplinary city projects. His talk will emphasize the need for sustainable, community-centered approaches in architecture and urban development. ",
            image: '/Images/CurrentSpeakers/madhav_raman.png',
        },
        
        {
            name: 'Arshad Ali',
            profession: " A renowned classical vocalist, Arshad Ali is celebrated for his soulful renditions and deep command of Hindustani music. His performances bridge tradition and emotion, drawing listeners into the timeless beauty of raag and rhythm ",
            image: '/Images/CurrentSpeakers/singer1.jpg',
        },
        {
            name: 'Kamal Kalra',
            profession: " A celebrated choreographer and performer, Kamal Kalra is known for blending classical technique with contemporary creativity. His work bridges tradition and innovation, captivating audiences with storytelling through movement and rhythm. ",
            image: '/Images/CurrentSpeakers/singer2.jpg',
        },
        // {
        //     name: 'Bhangra Queens',
        //     profession: "An award-winning all-women bhangra troupe redefining Punjabi folk dance with power and grace. The Bhangra Queens blend tradition and modernity, inspiring audiences through rhythm, energy, and the spirit of sisterhood.",
        //     image: '/Images/CurrentSpeakers/bhangra_queens_tedx.jpeg',
        //     objectPosition: 'bottom',
        // },

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
                                        style={speaker.objectPosition ? { objectPosition: speaker.objectPosition } : {}}
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
                <div className='PastSpeakers__heading'>...stay tuned</div>
                {/* Keep your custom hover cards or other sections here as needed */}
            </div>
        </>
    );
}
