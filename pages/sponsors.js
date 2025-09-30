import '../styles/routes/sponsors.scss'
import { motion } from 'framer-motion';

export default function Sponsors() {
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
        { url: "/Images/Sponsors/s11.png" },
        { url: "/Images/Sponsors/s12.png" },
        { url: "/Images/Sponsors/s13.png" },
        { url: "/Images/Sponsors/s14.png" },
        { url: "/Images/Sponsors/s15.png" },
        { url: "/Images/Sponsors/s16.png" },
        { url: "/Images/Sponsors/s17.png" },
        { url: "/Images/Sponsors/s19.png" },
        { url: "/Images/Sponsors/s20.png" },
        { url: "/Images/Sponsors/s21.png" },
        { url: "/Images/Sponsors/s22.png" },
        { url: "/Images/Sponsors/s23.png" },
        { url: "/Images/Sponsors/s24.png" },
        { url: "/Images/Sponsors/s25.png" },
        { url: "/Images/Sponsors/s26.png" },
        { url: "/Images/Sponsors/s27.png" },
        { url: "/Images/Sponsors/s28.png" },
        { url: "/Images/Sponsors/s29.png" },
        { url: "/Images/Sponsors/s30.png" },
        { url: "/Images/Sponsors/s31.png" },
        { url: "/Images/Sponsors/s32.png" },
        { url: "/Images/Sponsors/s33.png" },
        { url: "/Images/Sponsors/s34.png" },
        { url: "/Images/Sponsors/s35.png" },
        { url: "/Images/Sponsors/s36.png" },
        { url: "/Images/Sponsors/s37.png" },
        { url: "/Images/Sponsors/s38.png" },
        { url: "/Images/Sponsors/s39.png" },
        { url: "/Images/Sponsors/s40.png" },
        { url: "/Images/Sponsors/s41.png" },
        { url: "/Images/Sponsors/s42.png" },
        { url: "/Images/Sponsors/s43.png" },
        { url: "/Images/Sponsors/s44.png" },
        { url: "/Images/Sponsors/s45.png" },
        { url: "/Images/Sponsors/s46.png" },
        { url: "/Images/Sponsors/s47.png" },
        { url: "/Images/Sponsors/s48.png" },
        { url: "/Images/Sponsors/s49.png" },
        { url: "/Images/Sponsors/s50.png" },
        { url: "/Images/Sponsors/s51.png" },
        { url: "/Images/Sponsors/s52.png" },
        { url: "/Images/Sponsors/s53.png" },
        { url: "/Images/Sponsors/s54.png" },
        { url: "/Images/Sponsors/s55.png" },
        { url: "/Images/Sponsors/s56.png" },
        { url: "/Images/Sponsors/s57.png" },
        { url: "/Imajllges/Sponsors/s58.png" },
        { url: "/Images/Sponsors/s59.png" },
        { url: "/Images/Sponsors/s60.png" },
        { url: "/Images/Sponsors/s62.png" },
        { url: "/Images/Sponsors/s63.png" }
    ]
    return (

        <div className="AllSponsors">
            <p className='AllSponsors__heading'>PAST SPONSORS</p>
            <div className='AllSponsors__cards'>
                {pastSponsors.map((item, index) => {
                    return (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: .7 }}
                            key={index}
                        >
                            <div style={{ backgroundColor: "white" }} className='AllSponsors__cards--image'>
                                <Image src={item.url} layout="responsive" width={500} height={300} />
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}