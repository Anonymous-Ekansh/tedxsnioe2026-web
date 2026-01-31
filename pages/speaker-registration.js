import Head from 'next/head';
import React from 'react';
import '../styles/routes/SpeakerRegistration.scss';

export default function SpeakerRegistration() {
    return (
        <div className="SpeakerRegistration">
            <Head>
                <title>Speaker Registration | Qissa | TEDxShivNadarUniversity</title>
                <meta name="description" content="Register as a speaker for Qissa at TEDxShivNadarUniversity" />
            </Head>

            {/* Hero Section */}
            <div className="SpeakerRegistration__Hero">
                <div className="SpeakerRegistration__Hero--decoration SpeakerRegistration__Hero--decoration-1"></div>
                <div className="SpeakerRegistration__Hero--decoration SpeakerRegistration__Hero--decoration-2"></div>
                <div className="SpeakerRegistration__Hero--binding"></div>
                
                <div className="SpeakerRegistration__Hero--ornament SpeakerRegistration__Hero--ornament-1">❦</div>
                <div className="SpeakerRegistration__Hero--ornament SpeakerRegistration__Hero--ornament-2">❦</div>
                <div className="SpeakerRegistration__Hero--ornament SpeakerRegistration__Hero--ornament-3">❦</div>
                <div className="SpeakerRegistration__Hero--ornament SpeakerRegistration__Hero--ornament-4">❦</div>
                
                <h1 className="SpeakerRegistration__Hero--title">Share Your Story</h1>
                <p className="SpeakerRegistration__Hero--subtitle">
                    Step into the role of a "human book" and apply to be a speaker at Qissa.
                </p>
                
                <div className="SpeakerRegistration__Hero--scroll">↓</div>
            </div>

            {/* Form Section */}
            <div className="SpeakerRegistration__Content">
                <div className="SpeakerRegistration__FormContainer">
                    <div className="SpeakerRegistration__FormHeader">
                        <h2>Apply to be a Speaker</h2>
                        <p>Fill out the form below to submit your speaker application for Qissa.</p>
                    </div>
                    
                    <div className="SpeakerRegistration__FormWrapper">
                        <iframe
                            src="https://docs.google.com/forms/d/e/1FAIpQLSeRBCg11P7Hzgz6ZN9PojzR-hz0X4HialA8qMS9gBIiyneEiQ/viewform?embedded=true"
                            width="100%"
                            height="2507"
                            frameBorder="0"
                            marginHeight="0"
                            marginWidth="0"
                            className="SpeakerRegistration__Form"
                        >
                            Loading…
                        </iframe>
                    </div>
                </div>

                <div className="SpeakerRegistration__Info">
                    {/* <h3>Tips for Your Application</h3> */}
                    <ul>
                        <li><strong>Be Authentic:</strong> Share your genuine experiences and emotions</li>
                        {/* <li><strong>Be Specific:</strong> Use vivid details and personal anecdotes</li> */}
                        <li><strong>Be Clear:</strong> Explain what your story means to you and why it matters</li>
                        {/* <li><strong>Be Respectful:</strong> Consider your audience and any sensitive topics</li> */}
                        {/* <li><strong>Be Concise:</strong> Your story should fit within the 10-15 minute timeframe</li> */}
                    </ul>
                </div>
            </div>
        </div>
    );
}
