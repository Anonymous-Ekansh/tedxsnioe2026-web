import './PastSpeakers.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay, Pagination, Navigation } from "swiper";
import { useState, useEffect } from 'react'
import Image from 'next/image';

export default function PastSpeakers() {
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
    })
    return (
        <>
            <div className='PastSpeakers'>
                <div className='PastSpeakers__heading'>
                    OUR SPEAKERS
                </div>
                <div className='PastSpeakers__cards'>
                    <div className="container">
                        <h3 className="title">Prayag Shukla</h3>
                        <div className="content">
                            <div>
                                <div className="content-overlay"></div>
                                <Image className="content-image" src="/Images/CurrentSpeakers/prayag.png" alt="Prayag Shukla" width={300} height={300} />
                                <div className="content-details fadeIn-bottom">
                                    <h3 className="content-title">Prayag Shukla</h3>
                                    <p className="content-text">Poet, Author, Art Curator, truly a luminary of the Indian traditional soul, works spanning decades. He reveals poetry in the subtleties of everyday life and to appreciate it in a way that matters, and strengthens the enduring power of language and media in the world around us.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <h3 className="title">Anirban Bhattacharya</h3>
                        <div className="content">
                            <div>
                                <div className="content-overlay"></div>
                                <Image className="content-image" src="/Images/CurrentSpeakers/anirban.png" alt="Anirban Bhattacharya" width={300} height={300} />
                                <div className="content-details fadeIn-bottom">
                                    <h3 className="content-title">Anirban Bhattacharya</h3>
                                    <p className="content-text">Creator of a show running on every TV since 2012, Savdhaan India. True Crime aficionado and author of books that range from serial killers to the Indian Money Heist. Through his creative mind, he creates and shows you a world through his words alone instantly. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="container">
                        <h3 className="title">Rishabh Jain</h3>
                           <div className="content">
                              <div>
                                 <div className="content-overlay"></div>
                                <Image className="content-image" src="/Images/CurrentSpeakers/rishab.png" alt="Rishabh Jain" width={300} height={300} />
                                <div className="content-details fadeIn-bottom">
                                    <h3 className="content-title">Rishabh Jain</h3>
                                     <p className="content-text">India&apos;s most famous personal finance advisor with over 4 million YouTube subscribers. Having been an IIT-B alum and founding 2 successful startups, meet the phenomenal Rishabh Jain, the labour law advisor.</p>
                                </div>
                             </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className='PastSpeakers'>
                <div className='PastSpeakers__heading'>
                    ..stay tuned
                </div>
                {/* <div className='PastSpeakers__cards'>
                    <div className="container">
                        <h3 className="title">Anubha Bajaj</h3>
                        <div className="content">
                            <div>
                                <div className="content-overlay"></div>
                                <Image className="content-image" src="/Images/CurrentSpeakers/anubha_bajaj.jpeg" alt="Anubha Bajaj" width={300} height={300} />
                                <div className="content-details fadeIn-bottom">
                                    <h3 className="content-title">Anubha Bajaj</h3>
                                    <p className="content-text">Anubha Bajaj is an Indie artist, and the enchantress behind the captivating &quot;Lamhey&quot;. From composing melodies that transcend time to harmonizing emotions through music, Anubha&apos;s journey is a tapestry of crafted experiences</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <h3 className="title">Aashima Mahajan</h3>
                        <div className="content">
                            <div>
                                <div className="content-overlay"></div>
                                <Image className="content-image" src="/Images/CurrentSpeakers/aashima.jpg" alt="Aashima Mahajan" width={300} height={300} />
                                <div className="content-details fadeIn-bottom">
                                    <h3 className="content-title">Aashima Mahajan</h3>
                                    <p className="content-text">Aashima Mahajan has proven herself in various musical vocal genres, including Opera, folk, Bollywood and contemporary music. She also plays the lead antagonist role as an actor/singer in the one and only Broadway musical pride of India &quot;Mughal E Azam&quot; with over 275 shows worldwide.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}