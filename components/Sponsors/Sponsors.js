import Link from 'next/link';
import './Sponsors.scss'
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Sponsors() {
    const ourSponsors = [
        { url: "/Images/Assets/dummy.png" },
        { url: "/Images/Assets/dummy.png" },
        { url: "/Images/Assets/dummy.png" },
        { url: "/Images/Assets/dummy.png" },
        { url: "/Images/Assets/dummy.png" },
        { url: "/Images/Assets/dummy.png" },
        { url: "/Images/Assets/dummy.png" },
    ];
    const pastSponsors = [
        { url: "/Images/Sponsors/s1.png" },
        { url: "/Images/Sponsors/s2.png" },
        { url: "/Images/Sponsors/s3.png" },
        { url: "/Images/Sponsors/s4.png" },
        { url: "/Images/Sponsors/s5.png" },
        { url: "/Images/Sponsors/s6.png" },
        { url: "/Images/Sponsors/s7.png" },
        { url: "/Images/Sponsors/s8.png" },
        { url: "/Images/Sponsors/s9.png" },
        { url: "/Images/Sponsors/s10.png" },
    ]
    return (
        <div className='Sponsors'>
            {/* <div className='Sponsors__our'>
                <p className='Sponsors__our--heading'>OUR SPONSORS</p>
                <div className='Sponsors__our--cards'>
                    {ourSponsors.map((item, index) => {
                        return (
                            <div className='Sponsors__our--cards__image' key={index}>
                                <img src={item.url} />
                            </div>
                        )
                    })}
                </div>
            </div> */}
            <div className='Sponsors__past'>
                <p className='Sponsors__past--heading'>PAST SPONSORS</p>
                <div className='Sponsors__past--cards'>
                    {pastSponsors.map((item, index) => {
                        return (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: .7 }}
                                key={index}
                            >
                                <div className='Sponsors__past--cards__image'>
                                    <Image
                                        src={item.url}
                                        alt={`Sponsor ${index + 1}`}
                                        fill
                                        quality={95}
                                        priority={index < 6}
                                        style={{
                                            objectFit: 'contain',
                                            objectPosition: 'center',
                                            padding: '0.5rem'
                                        }}
                                    />
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
                <div className='Sponsors__past--button'>
                    <Link href='/sponsors'><p className='Sponsors__past--button__content'>View All</p></Link>
                </div>
            </div>
        </div>
    )
}