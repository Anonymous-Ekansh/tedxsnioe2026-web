import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useMotionVariants } from "../components/shared/motionVariants";
import "../styles/routes/team.scss";

const CORE_TEAM = [
  { name: "Rhea", role: "Lead Organizer", image: "/Images/team/Rhea Vohra photo.jpg" },
  { name: "Srinithya", role: "Treasurer & Co-Lead Organizer", image: "/Images/team/Srinithya Pasupuleti.jpg" },
  { name: "Sanyukta", role: "Curator and Licensee", image: "/Images/team/Sanyukta .jpg", pos: "center" },
  { name: "Viraaj", role: "ASec-2 & Curator & Co-licensee", image: "/Images/team/Viraaj(core).jpg", zoom: 1.35, pos: "center" },
  { name: "Shreyaa", role: "Secretary & Managing Director", image: "/Images/team/PR Lead_ Shreyaa Venkataraman.jpg", pos: "center" },
  { name: "Saad", role: "Executive Director", image: "/Images/team/Saad.png" },
  { name: "Urshita", role: "ASec-I & Head of Finance", image: "/Images/team/Urshita.jpg" },
  { name: "Perinbapriyan", role: "Creative Director", image: "/Images/team/Peri.jpg", pos: "center" },
  { name: "Enya", role: "Communications Director", image: "/Images/team/Enya Dhingra PR.jpg", pos: "center" },
  { name: "Nithin", role: "Head of Production", image: "/Images/team/Nithin .jpg" },
  { name: "Vyusti", role: "Fresher Coordinator", image: "/Images/team/vyusti.jpeg" },
  { name: "Mithreyi", role: "Advisor", image: "/Images/team/mithreyi cd.jpg" },
];

const DEPARTMENTS = [
  {
    title: "Content & Curation",
    members: [
      { name: "Vyusti Mishra", image: "/Images/team/vyusti.jpeg", phone: "+91 98101 75756" },
      { name: "Ashini Saxena", image: "/Images/team/Ashini.jpg", phone: "+91 89231 29931" },
    ],
  },
  {
    title: "Marketing",
    members: [
      { name: "Swara Munde", image: "/Images/team/Swara.png", phone: "+91 88820 51532" },
      { name: "Vriti Mehta", image: "/Images/team/Vriti.jpg", pos: "center", phone: "+91 86708 48333" },
    ],
  },
  {
    title: "Event Management",
    members: [
      { name: "Saina Malik", image: "/Images/team/Saina.jpg", phone: "+91 79822 64494" },
      { name: "Arunoday Bajpai", image: "/Images/team/Arunoday .png", phone: "+91 89608 60850" },
    ],
  },
  {
    title: "Decor & PFA",
    members: [
      { name: "Vidushi Pareek", image: "/Images/team/vidushi.jpg", pos: "center", phone: "+91 96962 42334" },
      { name: "Yashwanth Konijeti", image: "/Images/team/Yashwanth Konijeti final.jpg", phone: "+91 93462 43234" },
    ],
  },
  {
    title: "Public Relations",
    members: [
      { name: "Diya Singh", image: "/Images/team/diya .jpg", pos: "center", phone: "+91 93542 47960" },
    ],
  },
  {
    title: "Videography",
    members: [
      { name: "Vedaant Walia", image: "/Images/team/Vedaant.jpg", phone: "+91 98106 25375" },
      { name: "Tanisha Chhabra", image: "/Images/team/Tanisha.png", pos: "center", phone: "+91 63966 33954" },
    ],
  },
  {
    title: "Design",
    members: [
      { name: "Shubhi Kashyap", image: "/Images/team/Shubhi.jpg", phone: "+91 80764 39463" },
      { name: "Tarun S", image: "/Images/team/Tarun.jpg", phone: "+91 73977 60906" },
    ],
  },
  {
    title: "Sponsorship",
    members: [
      { name: "Khushi Sarraf", image: "/Images/team/khushi.jpg", phone: "+91 74900 30910" },
      { name: "Divpreet Kaur", image: "/Images/team/Divpreet Kaur .jpg", pos: "center", phone: "+91 93042 93058" },
    ],
  },
  {
    title: "Web Development",
    members: [
      { name: "Priyansh Khandeliya", image: "/Images/team/Priyansh khandeliya.jpg", phone: "+91 99287 99766" },
      { name: "Ekansh Jain", image: "/Images/team/Ekansh.jpg", phone: "+91 70044 26881" },
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
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
        >
          {CORE_TEAM.map((member, idx) => (
            <motion.div
              className="TeamSection__card"
              key={idx}
              variants={mv.shouldAnimate ? mv.fadeUp : {
                hidden: { opacity: 1 },
                visible: { opacity: 1 },
              }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
            >
              <div className="TeamSection__card-photo">
                <div style={{ position: 'relative', width: '100%', height: '100%', transform: member.zoom ? `scale(${member.zoom})` : 'none', transformOrigin: member.pos || 'center' }}>
                  <Image src={member.image} alt={member.name} fill sizes="(max-width: 768px) 50vw, 20vw" priority style={{ objectPosition: member.pos || 'top center', objectFit: 'cover' }} />
                </div>
              </div>
              <p className="TeamSection__card-name">{member.name}</p>
              <p className="TeamSection__card-role">{member.role}</p>
              {member.phone && <p className="TeamSection__card-phone">{member.phone}</p>}
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
          SUBCORE TEAMS
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
                              hidden: { opacity: 0, y: 15 },
                              visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.4, ease: 'easeOut' },
                              },
                            }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                          >
                            <div className="TeamSection__card-photo">
                              <div style={{ position: 'relative', width: '100%', height: '100%', transform: m.zoom ? `scale(${m.zoom})` : 'none', transformOrigin: m.pos || 'center' }}>
                                <Image src={m.image} alt={m.name} fill sizes="(max-width: 768px) 40vw, 15vw" loading="lazy" style={{ objectPosition: m.pos || 'top center', objectFit: 'cover' }} />
                              </div>
                            </div>
                            <p className="TeamSection__card-name">{m.name}</p>
                            {m.phone && <p className="TeamSection__card-phone">{m.phone}</p>}
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
