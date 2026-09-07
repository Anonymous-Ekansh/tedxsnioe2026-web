import AboutUs from "../components/AboutUs/AboutUs";
import LandingSection from "../components/LandingSection/LandingSection";
import PastSpeakers from "../components/PastSpeakers/PastSpeakers";
import WhatIsTedx from "../components/WhatIsTedx/WhatIsTedx";
import RegistrationCTA from "../components/RegistrationCTA/RegistrationCTA";
import SpeakerReveal from "../components/SpeakerReveal/SpeakerReveal";

import '../styles/routes/home.scss'
export default function Home() {
    return (
        <>
            <section className="LandingPageSection" id="home">
                <LandingSection />
            </section>

            <SpeakerReveal />

            <section id="past-speakers" className="PastSpeakersSection">
                <PastSpeakers />
            </section>
            
            <section id="about" className="AboutSection">
                <AboutUs />
            </section>
            
            <section id="what-is-tedx" className="WhatIsTedxSection">
                <WhatIsTedx />
            </section>

            <section id="register-cta" className="CTASection">
                <RegistrationCTA />
            </section>
        </>
    )
}
