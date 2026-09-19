import "../../styles/routes/register.scss";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';

export default function Register() {
  const router = useRouter();
  
  // State for bundle selection (1, 3, 5)
  const [bundleSize, setBundleSize] = useState(1);
  const [personType, setPersonType] = useState('snu'); // 'snu', 'non_snu', 'tedx_family'
  const [referredBy, setReferredBy] = useState('');
  const [isFlashSale, setIsFlashSale] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [tedxFamilyDetails, setTedxFamilyDetails] = useState({
    relation: '',
    memberName: '',
    memberTeam: '',
    memberSnuEmail: ''
  });

  useEffect(() => {
    // Flash Sale set for Sept 15, 1 PM to 3 PM
    const flashStart = new Date('2026-09-15T13:00:00+05:30');
    const flashEnd = new Date('2026-09-15T15:00:00+05:30');

    const checkFlashSale = () => {
      const now = new Date();
      
      if (now >= flashStart && now <= flashEnd) {
        setIsFlashSale(true);
        setBundleSize(prev => {
          if (prev !== 1) {
            setParticipants(p => p.slice(0, 1));
            return 1;
          }
          return prev;
        });
        
        // Calculate time left
        const diff = flashEnd - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff / 1000 / 60) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        const formatZero = (num) => (num < 10 ? `0${num}` : num);
        
        setTimeLeft(`${formatZero(hours)}:${formatZero(mins)}:${formatZero(secs)}`);
      } else {
        setIsFlashSale(false);
      }
    };
    
    checkFlashSale();
    const interval = setInterval(checkFlashSale, 1000); // Check every second for the timer
    return () => clearInterval(interval);
  }, []);
  
  // State for participants
  const [participants, setParticipants] = useState([
    { name: '', email: '', phone: '' }
  ]);

  // Update array length when bundle changes
  const handleBundleChange = (size) => {
    setBundleSize(size);
    setParticipants(prev => {
      const newParticipants = [...prev];
      if (size > prev.length) {
        // Add empty slots
        for (let i = prev.length; i < size; i++) {
          newParticipants.push({ name: '', email: '', phone: '' });
        }
      } else if (size < prev.length) {
        // Remove excess slots
        newParticipants.length = size;
      }
      return newParticipants;
    });
  };

  const updateParticipant = (index, field, value) => {
    setParticipants(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const calculatePrice = (size) => {
    if (personType === 'tedx_family') return 369 * size;
    if (isFlashSale) return 299 * size; // Flash sale price
    if (size === 1) return 499;
    if (size === 2) return 899;
    if (size === 3) return 1299;
    return 499;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const snuEmailRegex = /^[\w-\.]+@snu\.edu\.in$/;
    const generalEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^(?:\d{10}|\+\d{1,3}\s?\d{10})$/;

    // Validate all required fields
    for (let i = 0; i < bundleSize; i++) {
      const p = participants[i];
      if (!p.name || !p.email || !p.phone) {
        alert(`Please fill all fields for Student ${i + 1}`);
        return;
      }
      
      const emailRegex = personType === 'snu' ? snuEmailRegex : generalEmailRegex;
      if (!emailRegex.test(p.email)) {
        alert(`Please enter a valid ${personType === 'snu' ? 'SNU ' : ''}email ID for Student ${i + 1}`);
        return;
      }
      if (!phoneRegex.test(p.phone)) {
        alert(`Please enter a valid phone number for Student ${i + 1}`);
        return;
      }
    }

    if (personType === 'tedx_family') {
      const { relation, memberName, memberTeam, memberSnuEmail } = tedxFamilyDetails;
      if (!relation || !memberName || !memberTeam || !memberSnuEmail) {
        alert("Please fill all TEDx Member details.");
        return;
      }
      if (!snuEmailRegex.test(memberSnuEmail)) {
        alert("Please enter a valid SNU email ID for the TEDx member.");
        return;
      }
    }

    const totalAmount = calculatePrice(bundleSize);
    
    // Attach the single bundle-level referral code to the primary participant's JSON object
    const finalParticipants = participants.slice(0, bundleSize);
    if (referredBy.trim() !== '') {
      finalParticipants[0] = { ...finalParticipants[0], referredBy: referredBy.trim() };
    }

    const paymentData = {
      participants: finalParticipants,
      number_of_people: bundleSize,
      is_snu_student: personType === 'snu',
      person_type: personType,
      total_amount: totalAmount,
      price_per_person: totalAmount / bundleSize,
      offer_type: isFlashSale ? 'flash_sale' : 'regular',
      tedx_family_details: personType === 'tedx_family' ? tedxFamilyDetails : null
    };
    
    localStorage.setItem("paymentData", JSON.stringify(paymentData));
    router.push("/register/google_pay");
  };

  return (
    <>
      <div className="RegisterSection" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '2rem' }}>
        <Image
          className="RegisterSection__brand--logo"
          src="/Images/Assets/mosaic-logo.svg"
          alt="Mosaic Logo"
          width={150}
          height={150}
          priority
          style={{ marginBottom: '2rem' }}
        />
        <h2 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          fontWeight: '900', 
          color: 'var(--ink)', 
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          margin: '0 0 1rem 0'
        }}>
          Registrations Closed
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.2rem',
          color: 'var(--lavender)',
          maxWidth: '600px',
          lineHeight: '1.6'
        }}>
          Thank you for the overwhelming response! All tickets for TEDxShiv Nadar University are currently sold out. We can't wait to see you at the event.
        </p>
      </div>
    </>
  );
}
