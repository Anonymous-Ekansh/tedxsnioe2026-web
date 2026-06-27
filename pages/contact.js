import '../styles/routes/contact.scss'
import { motion } from 'framer-motion';
import { useMotionVariants } from '../components/shared/motionVariants';

function Contact() {
    const mv = useMotionVariants();

    return (
        <div className="ContactUsSection mosaic-bg-texture">
            {/* Ambient Background Glows */}
            <div className="ContactUsSection__glow-orb ContactUsSection__glow-orb--1" />
            <div className="ContactUsSection__glow-orb ContactUsSection__glow-orb--2" />
            <div className="ContactUsSection__glow-orb ContactUsSection__glow-orb--3" />

            <motion.div
                className="ContactUsSection__container"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.12 } },
                }}
            >
                <motion.p className='ContactUsSection__container--eyebrow' variants={mv.fadeUp}>
                    GET IN TOUCH
                </motion.p>
                <motion.p className='ContactUsSection__container--heading' variants={mv.fadeUp}>
                    Contact Us
                </motion.p>
                <motion.div
                    className='ContactUsSection__container--details'
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } },
                    }}
                >
                    <motion.div className='ContactUsSection__container--details__card' variants={mv.fadeUp}>
                        <p className='ContactUsSection__container--details__card--name'>Rhea Vohra</p>
                        <p className='ContactUsSection__container--details__card--designation'>Lead Organizer</p>
                        <p className='ContactUsSection__container--details__card--phone'>+91-9810790034</p>
                    </motion.div>
                    <motion.div className='ContactUsSection__container--details__card' variants={mv.fadeUp}>
                        <p className='ContactUsSection__container--details__card--name'>Srinithya Pasupuleti</p>
                        <p className='ContactUsSection__container--details__card--designation'>Co-Lead Organizer</p>
                        <p className='ContactUsSection__container--details__card--phone'>+91-8328251153</p>
                    </motion.div>
                    <motion.div className='ContactUsSection__container--details__card' variants={mv.fadeUp}>
                        <p className='ContactUsSection__container--details__card--name'>Sanyukta Agarwal</p>
                        <p className='ContactUsSection__container--details__card--designation'>Curator & License</p>
                        <p className='ContactUsSection__container--details__card--phone'>+91-6396944195</p>
                    </motion.div>
                    <motion.div className='ContactUsSection__container--details__card' variants={mv.fadeUp}>
                        <p className='ContactUsSection__container--details__card--name'>Shreyaa Venkataraman</p>
                        <p className='ContactUsSection__container--details__card--designation'>Managing Director</p>
                        <p className='ContactUsSection__container--details__card--phone'>+91-9791185259</p>
                    </motion.div>
                    <motion.div className='ContactUsSection__container--details__card' variants={mv.fadeUp}>
                        <p className='ContactUsSection__container--details__card--name'>Urshita Rathi</p>
                        <p className='ContactUsSection__container--details__card--designation'>Finance Head</p>
                        <p className='ContactUsSection__container--details__card--phone'>+91-9636896601</p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Contact;
