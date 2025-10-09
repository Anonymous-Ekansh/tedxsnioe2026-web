import React from 'react';
import './LandingSection.scss'
import Image from 'next/image';
export default function LandingSection() {
    const targetDate = new Date('2025-11-16T00:00:00'); // November 16, 2025

    // Calculate the initial time remaining
    const calculateTimeRemaining = () => {
        const now = new Date();
        const timeDifference = targetDate - now;
        return timeDifference > 0 ? timeDifference : 0;
    };

    const [timeRemaining, setTimeRemaining] = React.useState(calculateTimeRemaining());

    // Update the time remaining every second
    React.useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    // Helper function to format time in days, hours, minutes, and seconds
    const formatTime = (milliseconds) => {
        const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
        const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };
    return (
        <div className='LandingPageContainer'>
            <div className='LandingPageContainer__logo'>
                <Image 
                    src="/Images/Assets/image 2.png" 
                    className='LandingPageContainer__logo--image' 
                    width={200}
                    height={100}
                    alt="TEDx Logo"
                    priority
                    quality={95}
                    style={{
                        objectFit: 'contain',
                        objectPosition: 'center'
                    }}
                />
            </div>
        
            <div className='LandingPageContainer__logo__text' style={{ marginTop: '2rem' }}>
                <Image 
                src='/Images/Assets/simplexity.png' 
                className='LandingPageContainer__logo--text--image' 
                width={300}
                height={50}
                alt="Simplexity Logo"
                />
            </div>
            <div className='LandingPageContainer__desc'>
                Rethink the Simple. Rediscover the Complex. {'\n'}Delve into the amalgam of both.
            </div>
            <div className='LandingPageContainer__details'>
                <div className='LandingPageContainer__details--date'>
                    <p className='LandingPageContainer__details--date__text'>16</p>
                    <p className='LandingPageContainer__details--date__month'>November</p>
                    <p className='LandingPageContainer__details--date__year'>2025</p>
                </div>
                <div className='LandingPageContainer__details--venue'>
                    <p className='LandingPageContainer__details--venue__location'>G Block</p>
                    <p className='LandingPageContainer__details--venue__text'>Shiv Nadar Institute of Eminence, Delhi NCR</p>
                </div>
            </div>
            <div className='LandingPageContainer__countdown'>
                Time remaining : {formatTime(timeRemaining)}
            </div>
        </div>
    )
}