import './PastSpeakers.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function PastSpeakers() {
    // Current speakers data
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
        <div className='PastSpeakers'>
            <div className='PastSpeakers__heading'>OUR PAST SPEAKERS</div>
            <div className='PastSpeakers__cards'>
                <div className="OurSpeakers__content">
                    {currentSpeakers.map((speaker, idx) => (
                        <div 
                            className="OurSpeakers__content--card"
                            key={speaker.name}
                        >
                            <div className="OurSpeakers__content--card__image-container">
                                <Image 
                                    className="OurSpeakers__content--card__image" 
                                    src={speaker.image} 
                                    alt={speaker.name} 
                                    width={400} 
                                    height={400} 
                                    quality={95} 
                                    priority={idx === 0}
                                    style={speaker.objectPosition ? { objectPosition: speaker.objectPosition } : {}}
                                />
                            </div>
                            <div className="OurSpeakers__content--card__name-container">
                                <p className="OurSpeakers__content--card__name">{speaker.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='PastSpeakers__button-container'>
                <Link href='/pastConferences' className='PastSpeakers__know-more-btn'>
                    Know more
                </Link>
            </div>
        </div>
    );
}
