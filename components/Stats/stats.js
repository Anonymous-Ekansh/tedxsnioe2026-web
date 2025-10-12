import './stats.scss'
import { motion } from 'framer-motion';
export default function Stats() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: .7 }}
    >
      <div className='StatsContainer'>
        <div className='StatsContainer__card'>
          <p className='StatsContainer__card--number'>8+</p>
          <p style={{ color: "#ED218E" }} className='StatsContainer__card--text'>Speakers &<br/>Performers</p>
        </div>
        <div className='StatsContainer__card'>
          <p className='StatsContainer__card--number'>15+</p>
          <p style={{ color: "#A11D21" }} className='StatsContainer__card--text'>Goodies</p>
        </div>
        <div className='StatsContainer__card'>
          <p className='StatsContainer__card--number'>100+</p>
          <p style={{ color: "#038181" }} className='StatsContainer__card--text'>Attendees</p>
        </div>
        <div className='StatsContainer__card'>
          <p className='StatsContainer__card--number'>∞</p>
          <p style={{ color: "#F26A50" }} className='StatsContainer__card--text'>Experience</p>
        </div>
      </div>
    </motion.div>
  )
}