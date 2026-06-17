import Link from 'next/link';
import './Footer.scss';
import { usePathname } from "next/navigation";
import { motion } from 'framer-motion';
import { useMotionVariants } from '../shared/motionVariants';
import ButterflyLogo from '../shared/ButterflyLogo';

export default function Footer() {
  const pathName = usePathname();
  const mv = useMotionVariants();

  const scrollTo = async (id) => {
    if (pathName !== '/') {
      await router.push('/');
      const element = document.getElementById(id);
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    } else {
      const element = document.getElementById(id);
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <motion.footer
      className="FooterNew"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {/* Top hairline */}
      <div className="FooterNew__hairline" />

      {/* Three-column layout */}
      <div className="FooterNew__columns">
        {/* Left column: Brand + social */}
        <motion.div className="FooterNew__col FooterNew__col--left" variants={mv.fadeIn}>
          <div className="FooterNew__brand">
            <span className="FooterNew__brand-tedx">TEDx</span>
            <span className="FooterNew__brand-name">ShivNadarUniversity</span>
          </div>

          <div className="FooterNew__social">
            <a
              href="https://www.linkedin.com/company/tedx-snioe/"
              target="_blank"
              rel="noopener noreferrer"
              className="FooterNew__social-link"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/tedxshivnadaruniversity/"
              target="_blank"
              rel="noopener noreferrer"
              className="FooterNew__social-link"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Center column: Butterfly + nav */}
        <motion.div
          className="FooterNew__col FooterNew__col--center"
          variants={mv.shouldAnimate ? {
            hidden: { opacity: 0, scale: 0.95 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 1, ease: 'easeOut' },
            },
          } : { hidden: { opacity: 1 }, visible: { opacity: 1 } }}
        >
          <ButterflyLogo size={80} interactive={true} />
          <nav className="FooterNew__nav">
            <Link href="/" className="FooterNew__nav-link">Home</Link>
            <span className="FooterNew__nav-link" onClick={() => scrollTo("about")}>About Us</span>
            <Link href="/pastConferences" className="FooterNew__nav-link">Past Conferences</Link>
            <span className="FooterNew__nav-link" onClick={() => scrollTo("sponsors")}>Sponsors</span>
          </nav>
        </motion.div>

        {/* Right column: Event context */}
        <motion.div className="FooterNew__col FooterNew__col--right" variants={mv.fadeIn}>
          <span className="FooterNew__event-label">
            TED<span style={{ textTransform: 'none' }}>x</span> CONFERENCE 2026
          </span>
          <p className="FooterNew__event-tagline">
            One day. Many perspectives.<br />Countless connections.
          </p>
        </motion.div>
      </div>

      {/* Bottom hairline + copyright */}
      <div className="FooterNew__hairline" />
      <div className="FooterNew__copyright">
        <p>&copy; 2026 TEDxShivNadarUniversity. This is an independently organized TED event.</p>
      </div>
    </motion.footer>
  );
}
