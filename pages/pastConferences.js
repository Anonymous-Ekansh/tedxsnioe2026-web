import ConfDetails from '../components/ConferenceDetails/ConferenceDetails';
import PastConfSlider from '../components/PastConfSlider/PastConfSlider';
import PastConfTitles from '../components/PastConfTitles/PastConfTitles';
import '../styles/routes/pastConferences.scss'
import { motion } from 'framer-motion';
import { useMotionVariants } from '../components/shared/motionVariants';

function PastConferences() {
    const mv = useMotionVariants();

    return (
        <>
            <div className='PastConferencesSection mosaic-bg-texture'>
                <div className='PastConferencesSection__container'>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.15 } },
                        }}
                        style={{ textAlign: 'center' }}
                    >
                        <motion.p className='PastConferencesSection__container--eyebrow' variants={mv.fadeUp}>
                            OUR JOURNEY
                        </motion.p>
                        <motion.p className='PastConferencesSection__container--heading' variants={mv.fadeUp}>
                            PAST CONFERENCES
                        </motion.p>
                    </motion.div>
                    <div className='PastConferencesSection__container--slider'>
                        <PastConfSlider />
                    </div>
                    <div className='PastConferencesSection__container--titles'>
                        <PastConfTitles />
                    </div>
                    <ConfDetails />
                </div>
            </div>
        </>
    )
}

export default PastConferences;