import Head from 'next/head';
import React from 'react';
import '../styles/routes/Qissa.scss';

export default function Qissa() {
    const speakers = [
        { id: 1, name: "Speaker Name 1", subtitle: "Hero's Journey", story: "A story about overcoming adversity and finding strength in unexpected places." },
        { id: 2, name: "Speaker Name 2", subtitle: "Mountain Mystique", story: "Journeying through the mountains to discover the silence within." },
        { id: 3, name: "Speaker Name 3", subtitle: "Coffee Culture", story: "The art of coffee making and how it connects cultures." },
        { id: 4, name: "Speaker Name 4", subtitle: "Sustainability", story: "Innovating for a sustainable future through small daily actions." },
        { id: 5, name: "Speaker Name 5", subtitle: "Tradition & Tech", story: "Bridging the gap between traditional wisdom and modern technology." },
        { id: 6, name: "Speaker Name 6", subtitle: "Urban Chronicles", story: "Finding humor in the mundane chaos of city life." },
        { id: 7, name: "Speaker Name 7", subtitle: "Dance & Balance", story: "The rhythm of dance and what it teaches us about balance." },
        { id: 8, name: "Speaker Name 8", subtitle: "Oral Histories", story: "Voices from the past: Preserving oral histories for the future." },
    ];

    return (
        <div className="QissaPage">
            <Head>
                <title>Qissa | TEDxShivNadarUniversity</title>
                <meta name="description" content="Qissa - Step into the role of a 'human book' and share your stories." />
            </Head>

            <div className="QissaPage__Hero">
                <div className="QissaPage__Hero--decoration QissaPage__Hero--decoration-1"></div>
                <div className="QissaPage__Hero--decoration QissaPage__Hero--decoration-2"></div>
                <div className="QissaPage__Hero--binding"></div>
                
                <div className="QissaPage__Hero--ornament QissaPage__Hero--ornament-1">❦</div>
                <div className="QissaPage__Hero--ornament QissaPage__Hero--ornament-2">❦</div>
                <div className="QissaPage__Hero--ornament QissaPage__Hero--ornament-3">❦</div>
                <div className="QissaPage__Hero--ornament QissaPage__Hero--ornament-4">❦</div>
                
                <h1 className="QissaPage__Hero--title">Qissa</h1>
                <p className="QissaPage__Hero--subtitle">
                    Each of our lives are made up of numerous unique stories.
                    This is your chance to step into the role of a 'human book' and share your stories.
                </p>
                
                <div className="QissaPage__Hero--scroll">↓</div>
            </div>

            <div className="QissaPage__Content">
                <div className="QissaPage__Content--intro">
                    <p>
                        “Qissa” is based on the belief that each of our lives are made up of numerous unique stories
                        and each story has the potential to inspire and connect with other personalities in countless ways.
                        Hosted only for the people of Shiv Nadar University, selected speakers get to share their
                        personal stories and one-of-a-kind journeys, with an attentive group of listeners.
                    </p>
                    <p>
                        From tales of success, struggle, mental health and trauma to narratives of self-discovery,
                        adventure and culture, every story has a place at “Qissa”.
                    </p>
                </div>

                <div className="QissaPage__Speakers">
                    {speakers.map((speaker) => (
                        <div key={speaker.id} className="QissaPage__Speakers--card">
                            <div className="QissaPage__Speakers--card-image">
                                {/* Placeholder for speaker image */}
                                <img
                                    src={`https://api.dicebear.com/7.x/micah/svg?seed=${speaker.name}`}
                                    alt={speaker.name}
                                />
                            </div>
                            <div className="QissaPage__Speakers--card-content">
                                <h3 className="QissaPage__Speakers--card-name">{speaker.name}</h3>
                                <p className="QissaPage__Speakers--card-subtitle">{speaker.subtitle}</p>
                                <p className="QissaPage__Speakers--card-story">"{speaker.story}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
