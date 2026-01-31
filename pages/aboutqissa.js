import Head from 'next/head';
import React from 'react';
import '../styles/routes/Qissa.scss';
import Link from 'next/link';

export default function AboutQissa() {
    const steps = [
        {
            number: '01',
            title: 'Share Your Story',
            description: 'Tell us your unique journey, experiences, challenges, and triumphs. Whether it\'s about personal growth, overcoming adversity, or discovering your passion, we want to hear it.',
            icon: '📖'
        },
        {
            number: '02',
            title: 'Be Selected',
            description: 'Our selection committee reviews submissions and selects speakers whose stories resonate with our values and will inspire our audience.',
            icon: '✨'
        },
        {
            number: '03',
            title: 'Prepare & Practice',
            description: 'Work with our team to refine your story. We provide guidance on storytelling techniques and help you prepare for the big day.',
            icon: '🎯'
        },
        {
            number: '04',
            title: 'Share at Qissa',
            description: 'Stand on stage as a "human book" and share your story with an attentive, engaged audience of fellow Shiv Nadar University community members.',
            icon: '🎭'
        }
    ];

    const themes = [
        'Success & Achievement',
        'Personal Struggles',
        'Mental Health & Wellness',
        'Self-Discovery',
        'Adventure & Travel',
        'Cultural Heritage',
        'Social Impact',
        'Creativity & Arts',
        'Resilience & Comeback',
        'Innovation & Change'
    ];

    return (
        <div className="QissaPage">
            <Head>
                <title>About Qissa | TEDxShivNadarUniversity</title>
                <meta name="description" content="Learn about Qissa and become a speaker at TEDxShivNadarUniversity" />
            </Head>

            {/* Hero Section */}
            <div className="QissaPage__Hero">
                <div className="QissaPage__Hero--decoration QissaPage__Hero--decoration-1"></div>
                <div className="QissaPage__Hero--decoration QissaPage__Hero--decoration-2"></div>
                <div className="QissaPage__Hero--binding"></div>
                
                <div className="QissaPage__Hero--ornament QissaPage__Hero--ornament-1">❦</div>
                <div className="QissaPage__Hero--ornament QissaPage__Hero--ornament-2">❦</div>
                <div className="QissaPage__Hero--ornament QissaPage__Hero--ornament-3">❦</div>
                <div className="QissaPage__Hero--ornament QissaPage__Hero--ornament-4">❦</div>
                
                <div className="QissaPage__Hero--content">
                    <h1 className="QissaPage__Hero--title">About Qissa</h1>
                    <p className="QissaPage__Hero--subtitle">
                        Stories have a way of making us <br /> feel less alone.
                        <br />
                        Because sometimes, hearing someone else's story helps us understand our own.
                    </p>
                </div>
                
                
                <div className="QissaPage__Hero--scroll">↓</div>
            </div>

            {/* Content Section */}
            <div className="QissaPage__Content">
                {/* What is Qissa */}
                <section className="AboutQissa__Section">
                    <h2 className="AboutQissa__Section--title">What is Qissa?</h2>
                    <p className="AboutQissa__Section--text">
                        "Qissa" is an Urdu word meaning "story" or "tale." At TEDxShivNadarUniversity, Qissa is a platform where individuals step into the role of a "human book" and share their personal narratives with an engaged, attentive audience.
                    </p>
                    <p className="AboutQissa__Section--text">
                        Unlike traditional presentations, Qissa is about intimate storytelling—sharing experiences that have shaped who you are, lessons learned through struggle or success, and insights that could inspire others in our community.
                    </p>
                </section>

                {/* Why Your Story Matters */}
                <section className="AboutQissa__Section AboutQissa__Section--highlighted">
                    <h2 className="AboutQissa__Section--title">Why Your Story Matters</h2>
                    <div className="AboutQissa__Cards">
                        <div className="AboutQissa__Card">
                            {/* <div className="AboutQissa__Card--icon">🤝</div> */}
                            <h3>Connection</h3>
                            <p>Your story creates meaningful connections with others who have similar experiences or challenges.</p>
                        </div>
                        <div className="AboutQissa__Card">
                            {/* <div className="AboutQissa__Card--icon">💡</div> */}
                            <h3>Inspiration</h3>
                            <p>Real stories inspire. Your journey might be the catalyst someone needs for their own transformation.</p>
                        </div>
                        <div className="AboutQissa__Card">
                            {/* <div className="AboutQissa__Card--icon">🌟</div> */}
                            <h3>Impact</h3>
                            <p>When you share authentically, you create ripples of change in your community and beyond.</p>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                {/* <section className="AboutQissa__Section">
                    <h2 className="AboutQissa__Section--title">How It Works</h2>
                    <div className="AboutQissa__Steps">
                        {steps.map((step, index) => (
                            <div key={index} className="AboutQissa__Step">
                                <div className="AboutQissa__Step--number">{step.number}</div>
                                <div className="AboutQissa__Step--icon">{step.icon}</div>
                                <h3 className="AboutQissa__Step--title">{step.title}</h3>
                                <p className="AboutQissa__Step--description">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </section> */}

                {/* Story Themes */}
                {/* <section className="AboutQissa__Section">
                    <h2 className="AboutQissa__Section--title">Story Themes We're Looking For</h2>
                    <p className="AboutQissa__Section--text">
                        Every story has a place at Qissa. Some themes we particularly welcome include:
                    </p>
                    <div className="AboutQissa__Themes">
                        {themes.map((theme, index) => (
                            <div key={index} className="AboutQissa__Theme">{theme}</div>
                        ))}
                    </div>
                </section> */}

                {/* Eligibility */}
                {/* <section className="AboutQissa__Section">
                    <h2 className="AboutQissa__Section--title">Eligibility</h2>
                    <ul className="AboutQissa__List">
                        <li>Must be a student or faculty member of Shiv Nadar University</li>
                        <li>Your story should be authentic and personal</li>
                        <li>Story duration: 10-15 minutes</li>
                        <li>Willingness to share vulnerable and meaningful experiences</li>
                        <li>Commitment to attend rehearsals and the event</li>
                    </ul>
                </section> */}

                {/* CTA Section or sm*/}
                <section className="AboutQissa__CTA">
                    <h2>Ready to Share Your Story?</h2>
                    <p>Join us and become a "human book" at TEDxShivNadarUniversity's Qissa event.</p>
                    <Link href="/speaker-registration" className="AboutQissa__CTA--button">
                        Apply as Speaker
                    </Link>
                </section>
            </div>
        </div>
    );
}
