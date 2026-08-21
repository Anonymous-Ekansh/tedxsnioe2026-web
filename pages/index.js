import AboutUs from "../components/AboutUs/AboutUs";
import LandingSection from "../components/LandingSection/LandingSection";
import PastSpeakers from "../components/PastSpeakers/PastSpeakers";
import WhatIsTedx from "../components/WhatIsTedx/WhatIsTedx";
import RegistrationCTA from "../components/RegistrationCTA/RegistrationCTA";

import '../styles/routes/home.scss'
function Home() {
    return (
        <>
            <section
                className="LandingPageSection"
                id="home">
                <LandingSection />
            </section>

            <section
                id="past-speakers"
                className="PastSpeakersSection">
                <PastSpeakers />
            </section>
            <section
                id="about"
                className="AboutSection">
                <AboutUs />
            </section>
            
            <section
                id="what-is-tedx"
                className="WhatIsTedxSection">
                <WhatIsTedx />
            </section>

            <section
                id="register-cta"
                className="CTASection">
                <RegistrationCTA />
            </section>
        </>
    )
}

export default Home;
