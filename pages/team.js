import React from "react";
import "../styles/routes/team.scss";
import { images } from "../next.config";

const teamData = [
  {
    title: "Core Team",
    members: [
      { name: "Dipro Mukherjee (Lead Organiser)", image: "/Images/team/Dipro - Lead Organizer.jpg", adjust: "up" },
      { name: "Aanya Anand (Co-Lead Organiser)", image: "/Images/team/Aanya.jpg" },
      { name: "Anindya Rastogi (Curator and Licensee)", image: "/Images/team/anindya.jpeg" },
      { name: "Vedant Dubey (Managing Director)", image: "/Images/team/Vedant Dubey.JPG" },
      { name: "Mithreyi SR (Creative Director)", image: "/Images/team/mithreyi cd.jpg" },
      { name: "Samiya Singh (Communications Director)", image: "/Images/team/Samiya Singh.jpg" },
      { name: "Anshika Gupta (Head of Finance)", image: "/Images/team/Anshika.jpg" },
      { name: "Arnav Prabhakar (Head of Production)" , image: "Images/team/arnav_prabhakar_tedx.jpeg"},
      { name: "Darpin Mevcha (Treasurer)", image: "Images/team/Darpin 1.jpg" },
      { name: "Sahas Suri (Fresher Coordinator)", image: "Images/team/Freshman Coordinator - Sahas Suri - 1.jpg", adjust: "up" },
    ],
  },
  {
    title: "Content",
    members: [
      { name: "Viraaj Vashisht", image: "Images/team/Viraaj Vashisht, content lead.jpg" },
      { name: "Swara Mishra", image: "Images/team/Content Lead-Swara Mishra.jpg" },
    ],
  },
  {
    title: "Sponsorship",
    members: [
      { name: "Rhea Vohra", image: "Images/team/Rhea Vohra photo.jpg" },
    ],
  },
  {
    title: "Marketing",
    members: [
      { name: "Aditya Kumar", image: "Images/team/Aditya Kumar Marketing.jpg" },
      { name: "Swaraj", image: "Images/team/SwarajMarketingLead.jpg" },
    ],
  },
  {
    title: "Public Relations",
    members: [
      { name: "Shreyaa Venkatraman", image: "Images/team/PR Lead_ Shreyaa Venkataraman.jpg" },
      { name: "Enya Dhingra", image: "Images/team/Enya Dhingra PR.jpg" },
    ],
  },
  {
    title: "Web Development",
    members: [
      { name: "Akshat Bansal", image: "Images/team/Akshat Bansal WebDev.jpg" },
    ],
  },
  {
    title: "Videography",
    members: [
      { name: "Nithin", image: "/Images/team/nitin_tedx.jpeg"},
      { name: "Shubh", image: "Images/team/Videography Lead - Shubh Choubey - 2.jpg" },
    ],
  },
  {
    title: "Decor",
    members: [
      { name: "Sivanesan Srinivasan", image: "Images/team/Sivanesan Srinivasan - Decor&PFA.jpg" },
      { name: "Srinithya Pasupuleti", image: "Images/team/Srinithya Pasupuleti Decor & PFA.jpg" },
      { name: "Urshita Rathi", image: "Images/team/Urshita_decor & pfa lead.jpg" },
    ],
  },
  {
    title: "Design",
    members: [
      { name: "Shreyaash Thakur", image: "Images/team/Shreyaash_DesLead.jpg" },
      { name: "Perinbapriyan", image: "Images/team/Perinbapriyan.jpg" },
    ],
  },
  {
    title: "Event Management",
    members: [
      { name: "Ayushi", image: "Images/team/Ayushi_Logistics Lead.jpg" },
    ],
  },
  {
    title: "Logistics",
    members: [
      { name: "Aayush", image: "Images/team/Ayush Logistics Lead.jpg" },
    ],
  },
];

const MeetTheTeam = () => {
  const coreTeam = teamData.find((group) => group.title === "Core Team");
  const otherTeams = teamData.filter((group) => group.title !== "Core Team");

  return (
    <div className="team-page">
      <h1 className="team-title">MEET THE TEAM</h1>

      {/* Core Team — full width */}
      <div className="core-team-section">
        <div className="team-card core-team-card">
          <h2 className="team-role">{coreTeam.title}</h2>
          <div className="team-members">
            {coreTeam.members.map((member, idx) => (
              <div className="member" key={idx}>
                <img
                  src={member.image || "/Images/filler.jpg"} // fallback to filler.jpg if image is missing
                  alt={member.name}
                  className="member-photo"
                />
                <p className="member-name">{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Other Teams Grid */}
      <div className="team-grid">
        {otherTeams.map((group, index) => (
          <div className="team-card" key={index}>
            <h2 className="team-role">{group.title}</h2>
            <div className="team-members">
              {group.members.map((member, idx) => (
                <div className="member" key={idx}>
                  <img
                    src={member.image || "/Images/filler.jpg"}  // fallback to filler.jpg if image is missing
                    alt={member.name}
                    className="member-photo"
                  />
                  <p className="member-name">{member.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetTheTeam;
