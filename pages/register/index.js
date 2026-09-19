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
      <div className="RegisterSection">
        <div className="RegisterSection__details">
          <div className="RegisterSection__details--snu">
            <p>Enter Details</p>
            <div className="RegisterSection__details--snu__options" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <p
                className={personType === 'snu' ? "RegisterSection__details--snu__options--red" : "RegisterSection__details--snu__options--white"}
                onClick={() => setPersonType('snu')}
                style={{ flex: 1, minWidth: '120px' }}
              >
                SNU Students/Faculty
              </p>
            </div>
          </div>
          
          <div className="RegisterSection__details--people" style={{ marginTop: '1.5rem' }}>
            <p>Select Ticket Bundle</p>
            <div className="RegisterSection__details--people__options" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <p
                className={bundleSize === 1 ? "RegisterSection__details--snu__options--red" : "RegisterSection__details--snu__options--white"}
                onClick={() => handleBundleChange(1)}
              >
                1 Person
              </p>
              {!isFlashSale && (
                <>
                  <p
                    className={bundleSize === 2 ? "RegisterSection__details--snu__options--red" : "RegisterSection__details--snu__options--white"}
                    onClick={() => handleBundleChange(2)}
                  >
                    2 People
                  </p>
                  <p
                    className={bundleSize === 3 ? "RegisterSection__details--snu__options--red" : "RegisterSection__details--snu__options--white"}
                    onClick={() => handleBundleChange(3)}
                  >
                    3 People
                  </p>
                </>
              )}
              {isFlashSale && (
                <div style={{
                  flex: '1 1 100%',
                  boxSizing: 'border-box',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginTop: '12px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ 
                      fontFamily: 'var(--font-display)',
                      background: 'linear-gradient(135deg, white 30%, var(--pink) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontWeight: '900', 
                      fontSize: '1.4rem', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.02em',
                      textShadow: '0 0 20px rgba(230, 90, 154, 0.2)'
                    }}>
                      FLASH SALE ACTIVE!!!
                    </span>
                    <span style={{ color: 'var(--muted)', fontSize: '0.85rem', fontFamily: 'var(--font-body)' }}>
                      Combo bundles are temporarily locked.
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-body)' }}>
                      Ends In
                    </span>
                    <span style={{ 
                      color: 'white', 
                      fontFamily: 'monospace', 
                      fontWeight: 'bold', 
                      fontSize: '1.4rem', 
                      letterSpacing: '2px',
                      textShadow: '0 0 10px rgba(255,255,255,0.3)'
                    }}>
                      {timeLeft}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="RegisterSection__details--value">
            {participants.map((p, index) => (
              <div key={index} style={{ marginBottom: '2.5rem' }}>
                <p style={{ 
                  fontFamily: 'var(--font-display)',
                  fontWeight: '900', 
                  fontSize: '1.35rem', 
                  color: 'var(--yellow)',
                  borderBottom: '1px solid var(--yellow)', 
                  paddingBottom: '0.5rem', 
                  marginBottom: '1.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.01em'
                }}>
                  DETAILS OF PARTICIPANT {index + 1}
                </p>
                <div className="RegisterSection__details--value__name">
                  <p>Full Name</p>
                  <input
                    value={p.name}
                    onChange={(e) => updateParticipant(index, 'name', e.target.value)}
                    type="text"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="RegisterSection__details--value__email">
                  <p>Email</p>
                  <input
                    value={p.email}
                    onChange={(e) => updateParticipant(index, 'email', e.target.value)}
                    type="email"
                    placeholder="Email Id"
                    required
                  />
                  {personType === 'snu' && (
                    <p className="RegisterSection__details--value__email--warn" style={{ fontSize: '0.8rem', marginTop: '0.2rem', color: '#ff4d4f' }}>
                      Please enter only snu email id
                    </p>
                  )}
                </div>
                <div className="RegisterSection__details--value__phone">
                  <p>Mobile Number</p>
                  <input
                    value={p.phone}
                    onChange={(e) => updateParticipant(index, 'phone', e.target.value)}
                    type="text"
                    placeholder="Mobile Number"
                    required
                  />
                </div>
              </div>
            ))}

            {/* Global Referral for the entire bundle */}
            <div className="RegisterSection__details--value__referredBy" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
              <p>Referred By (Optional)</p>
              <input
                value={referredBy}
                onChange={(e) => setReferredBy(e.target.value)}
                type="text"
                placeholder="Referral Name"
              />
            </div>

            {personType === 'tedx_family' && (
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', background: 'rgba(255, 255, 255, 0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <p style={{ 
                  fontFamily: 'var(--font-display)',
                  fontWeight: '900', 
                  fontSize: '1.2rem', 
                  color: 'var(--yellow)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
                  paddingBottom: '0.5rem', 
                  marginBottom: '1.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.01em'
                }}>
                  TEDx Member Details
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="RegisterSection__details--value__name">
                    <p>Relation with TEDx Member</p>
                    <input
                      value={tedxFamilyDetails.relation}
                      onChange={(e) => setTedxFamilyDetails({...tedxFamilyDetails, relation: e.target.value})}
                      type="text"
                      placeholder="e.g. Parent, Sibling"
                      required
                    />
                  </div>
                  <div className="RegisterSection__details--value__name">
                    <p>Member Name</p>
                    <input
                      value={tedxFamilyDetails.memberName}
                      onChange={(e) => setTedxFamilyDetails({...tedxFamilyDetails, memberName: e.target.value})}
                      type="text"
                      placeholder="TEDx Member's Full Name"
                      required
                    />
                  </div>
                  <div className="RegisterSection__details--value__name">
                    <p>Which team they are in</p>
                    <input
                      value={tedxFamilyDetails.memberTeam}
                      onChange={(e) => setTedxFamilyDetails({...tedxFamilyDetails, memberTeam: e.target.value})}
                      type="text"
                      placeholder="e.g. Curation, Production, etc."
                      required
                    />
                  </div>
                  <div className="RegisterSection__details--value__name">
                    <p>Member's SNU Email ID</p>
                    <input
                      value={tedxFamilyDetails.memberSnuEmail}
                      onChange={(e) => setTedxFamilyDetails({...tedxFamilyDetails, memberSnuEmail: e.target.value})}
                      type="email"
                      placeholder="example@snu.edu.in"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            onClick={handleSubmit}
            style={{ color: "black", cursor: "pointer", textAlign: "center", marginTop: "1rem" }}
            className="RegisterSection__details--submit"
          >
            Submit
          </div>
        </div>

        <div className="RegisterSection__amount">
          <div className="RegisterSection__brand">
            <Image
              className="RegisterSection__brand--logo"
              src="/Images/Assets/mosaic-logo.svg"
              alt="Mosaic Logo"
              width={100}
              height={100}
              priority
            />
            <h2 className="RegisterSection__brand--title">SECURE YOUR SPOT</h2>
            <p className="RegisterSection__brand--subtitle">Be part of the ideas that shape the future.</p>
          </div>
          <div className="RegisterSection__amount--priceDetails">
            <p>Price Details</p>
            <div className="RegisterSection__amount--priceDetails__snu">
              <p>Type Of Person</p>
              <p>{personType === 'snu' ? "SNU Students/Faculty" : (personType === 'tedx_family' ? "TEDx Family" : "NON-SNU")}</p>
            </div>
            <div className="RegisterSection__amount--priceDetails__people">
              <p>No. Of People</p>
              <p>{bundleSize}</p>
            </div>
            <div className="RegisterSection__amount--priceDetails__ticket">
              <p>Ticket Price (per person)</p>
              <p>₹{Math.round(calculatePrice(bundleSize) / bundleSize)}</p>
            </div>
            <hr />
            <div className="RegisterSection__amount--priceDetails__total">
              <p>Total Amount</p>
              <p>₹{calculatePrice(bundleSize)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
