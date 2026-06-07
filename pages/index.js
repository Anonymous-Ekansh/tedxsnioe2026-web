import AboutUs from "../components/AboutUs/AboutUs";
import LandingSection from "../components/LandingSection/LandingSection";
import PastSpeakers from "../components/PastSpeakers/PastSpeakers";
import Sponsors from "../components/Sponsors/Sponsors";

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
                id="sponsors"
                className="SponsorsSection">
                <Sponsors />
            </section>
        </>
    )
}

export default Home;
