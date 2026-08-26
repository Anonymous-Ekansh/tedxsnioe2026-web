import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMotionVariants } from "../components/shared/motionVariants";
import "../styles/routes/team.scss";

const CORE_TEAM = [
  { name: "Dipro Mukherjee", role: "Lead Organiser", image: "/Images/team/Dipro - Lead Organizer.jpg" },
  { name: "Aanya Anand", role: "Co-Lead Organiser", image: "/Images/team/Aanya.jpg" },
  { name: "Anindya Rastogi", role: "Curator & Licensee", image: "/Images/team/anindya.jpeg" },
  { name: "Vedant Dubey", role: "Managing Director", image: "/Images/team/Vedant Dubey.JPG" },
  { name: "Mithreyi SR", role: "Creative Director", image: "/Images/team/mithreyi cd.jpg" },
  { name: "Samiya Singh", role: "Communications Director", image: "/Images/team/Samiya Singh.jpg" },
  { name: "Anshika Gupta", role: "Head of Finance", image: "/Images/team/Anshika.jpg" },
  { name: "Arnav Prabhakar", role: "Head of Production", image: "/Images/team/arnav_prabhakar_tedx.jpeg" },
  { name: "Darpin Mevcha", role: "Treasurer", image: "/Images/team/Darpin 1.jpg" },
  { name: "Sahas Suri", role: "Fresher Coordinator", image: "/Images/team/Freshman Coordinator - Sahas Suri - 1.jpg" },
];

const DEPARTMENTS = [
  {
    title: "Content",
    members: [
      { name: "Viraaj Vashisht", image: "/Images/team/Viraaj Vashisht, content lead.jpg" },
      { name: "Swara Mishra", image: "/Images/team/Content Lead-Swara Mishra.jpg" },
    ],
  },
  {
    title: "Sponsorship",
    members: [
      { name: "Rhea Vohra", image: "/Images/team/Rhea Vohra photo.jpg" },
    ],
  },
  {
    title: "Marketing",
    members: [
      { name: "Aditya Kumar", image: "/Images/team/Aditya Kumar Marketing.jpg" },
      { name: "Swaraj", image: "/Images/team/SwarajMarketingLead.jpg" },
    ],
  },
  {
    title: "Public Relations",
    members: [
      { name: "Shreyaa Venkatraman", image: "/Images/team/PR Lead_ Shreyaa Venkataraman.jpg" },
      { name: "Enya Dhingra", image: "/Images/team/Enya Dhingra PR.jpg" },
    ],
  },
  {
    title: "Web Development",
    members: [
      { name: "Akshat Bansal", image: "/Images/team/Akshat Bansal WebDev.jpg" },
    ],
  },
  {
    title: "Videography",
    members: [
      { name: "Nithin", image: "/Images/team/nitin_tedx.jpeg" },
      { name: "Shubh", image: "/Images/team/Videography Lead - Shubh Choubey - 2.jpg" },
    ],
  },
  {
    title: "Decor",
    members: [
      { name: "Sivanesan Srinivasan", image: "/Images/team/Sivanesan Srinivasan - Decor&PFA.jpg" },
      { name: "Srinithya Pasupuleti", image: "/Images/team/Srinithya Pasupuleti Decor & PFA.jpg" },
      { name: "Urshita Rathi", image: "/Images/team/Urshita_decor & pfa lead.jpg" },
    ],
  },
  {
    title: "Design",
    members: [
      { name: "Shreyaash Thakur", image: "/Images/team/Shreyaash_DesLead.jpg" },
      { name: "Perinbapriyan", image: "/Images/team/Perinbapriyan.jpg" },
    ],
  },
  {
    title: "Event Management",
    members: [
      { name: "Ayushi", image: "/Images/team/Ayushi_Logistics Lead.jpg" },
    ],
  },
  {
    title: "Logistics",
    members: [
      { name: "Aayush", image: "/Images/team/Ayush Logistics Lead.jpg" },
    ],
  },
];

const DEPT_COLORS = [
  '#e65a9a', '#a9acd6', '#97d5cf', '#f4c9da', '#f6d56f',
  '#e65a9a', '#a9acd6', '#97d5cf', '#f4c9da', '#f6d56f',
];

const MeetTheTeam = () => {
  const mv = useMotionVariants();
  const [openDept, setOpenDept] = useState(null);

  const toggleDept = (idx) => {
    setOpenDept(openDept === idx ? null : idx);
  };

  return (
    <div className="TeamSection mosaic-bg-texture">
      {/* Ambient glow orbs */}
      <div className="TeamSection__glow-orb TeamSection__glow-orb--1" />
      <div className="TeamSection__glow-orb TeamSection__glow-orb--2" />
      <div className="TeamSection__glow-orb TeamSection__glow-orb--3" />

      <div className="TeamSection__container">
        {/* ─── Header ──────────────────────────────────────── */}
        <motion.div
          className="TeamSection__header"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p className="TeamSection__eyebrow" variants={mv.fadeUp}>
            THE PEOPLE BEHIND THE CURTAIN
          </motion.p>
          <motion.h1 className="TeamSection__heading" variants={mv.fadeUp}>
            MEET THE TEAM
          </motion.h1>
        </motion.div>

        {/* ─── Core Team Grid ──────────────────────────────── */}
        <motion.p
          className="TeamSection__section-label"
          initial="hidden"
          animate="visible"
          variants={mv.fadeUp}
        >
          CORE TEAM
        </motion.p>

        <motion.div
          className="TeamSection__grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } },
          }}
        >
          {CORE_TEAM.map((member, idx) => (
            <motion.div
              className="TeamSection__card"
              key={idx}
              variants={mv.shouldAnimate ? mv.mosaicAssembleItem(idx) : {
                hidden: { opacity: 1 },
                visible: { opacity: 1 },
              }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
            >
              <div className="TeamSection__card-photo">
                <img src={member.image} alt={member.name} loading="eager" />
              </div>
              <p className="TeamSection__card-name">{member.name}</p>
              <p className="TeamSection__card-role">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Departments Accordion ───────────────────────── */}
        <motion.p
          className="TeamSection__section-label"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={mv.fadeUp}
          style={{ marginTop: '3rem' }}
        >
          DEPARTMENTS
        </motion.p>

        <motion.div
          className="TeamSection__accordion"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {DEPARTMENTS.map((dept, dIdx) => {
            const isOpen = openDept === dIdx;
            const accent = DEPT_COLORS[dIdx % DEPT_COLORS.length];

            return (
              <motion.div
                className={`TeamSection__accordion-item ${isOpen ? 'TeamSection__accordion-item--open' : ''}`}
                key={dIdx}
                variants={mv.shouldAnimate ? {
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                } : { hidden: { opacity: 1 }, visible: { opacity: 1 } }}
              >
                <button
                  className="TeamSection__accordion-trigger"
                  onClick={() => toggleDept(dIdx)}
                  aria-expanded={isOpen}
                >
                  <span className="TeamSection__accordion-accent" style={{ background: accent }} />
                  <span className="TeamSection__accordion-title" style={{ color: isOpen ? accent : '#fff' }}>
                    {dept.title}
                  </span>
                  <span className="TeamSection__accordion-count">{dept.members.length}</span>
                  <motion.span
                    className="TeamSection__accordion-arrow"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▾
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="TeamSection__accordion-panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <motion.div
                        className="TeamSection__accordion-members"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: {},
                          visible: { transition: { staggerChildren: 0.03 } },
                        }}
                      >
                        {dept.members.map((m, mIdx) => (
                          <motion.div
                            className="TeamSection__card"
                            key={mIdx}
                            variants={{
                              hidden: { opacity: 0, scale: 0.5 },
                              visible: {
                                opacity: 1,
                                scale: 1,
                                transition: { type: 'spring', stiffness: 500, damping: 25 },
                              },
                            }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                          >
                            <div className="TeamSection__card-photo">
                              <img src={m.image} alt={m.name} loading="lazy" />
                            </div>
                            <p className="TeamSection__card-name">{m.name}</p>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default MeetTheTeam;
