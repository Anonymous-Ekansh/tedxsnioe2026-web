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
        // Uncomment and add more speakers as needed
        // {
        //     name: 'Rishabh Jain',
        //     profession: "India's most famous personal finance advisor with over 4 million YouTube subscribers. Having been an IIT-B alum and founding 2 successful startups, meet the phenomenal Rishabh Jain, the labour law advisor.",
        //     image: '/Images/CurrentSpeakers/rishab.png',
        // },
    ];

    const [isSmall, setIsSmall] = useState(false);
    const [isMedium, setIsMedium] = useState(false);
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
    }, []);

    return (
        <>
            <div className='PastSpeakers'>
                <div className='PastSpeakers__heading'>OUR SPEAKERS</div>
                <div className='PastSpeakers__cards'>
                    {currentSpeakers.map((speaker, idx) => (
                        <div className="container" key={speaker.name}>
                            
                            <div className="Speakers__content">
                                <div>
                                    <div className="content-overlay"></div>
                                    <Image 
                                        className="Speakers__content--card__image" 
                                        src={speaker.image} 
                                        alt={`${speaker.name} - ${speaker.profession}`} 
                                        width={300} 
                                        height={300} 
                                        quality={95} 
                                        priority={idx === 0} 
                                    />
                                    <div className="Speakers__content--card__details">
                                        <p className="Speakers__content--card__details__name">{speaker.name}</p>
                                        {/* <p className="content-text">{speaker.profession}</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='PastSpeakers'>
                <div className='PastSpeakers__heading'>..stay tuned</div>
                {/* Keep your custom hover cards or other sections here as needed */}
            </div>
        </>
    );
}
