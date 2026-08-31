import "../../styles/routes/register.scss";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';

export default function Register() {
  const router = useRouter();
  
  // State for bundle selection (1, 3, 5)
  const [bundleSize, setBundleSize] = useState(1);
  const [isSnu, setIsSnu] = useState(true);
  
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
    if (size === 1) return 399;
    if (size === 3) return 1099;
    if (size === 5) return 1699;
    return 399;
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
      
      const emailRegex = isSnu ? snuEmailRegex : generalEmailRegex;
      if (!emailRegex.test(p.email)) {
        alert(`Please enter a valid ${isSnu ? 'SNU ' : ''}email ID for Student ${i + 1}`);
        return;
      }
      if (!phoneRegex.test(p.phone)) {
        alert(`Please enter a valid phone number for Student ${i + 1}`);
        return;
      }
    }

    const totalAmount = calculatePrice(bundleSize);
    
    const paymentData = {
      participants: participants.slice(0, bundleSize), // send only valid participants
      number_of_people: bundleSize,
      is_snu_student: isSnu,
      total_amount: totalAmount,
      price_per_person: totalAmount / bundleSize,
      offer_type: 'regular'
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
            <div className="RegisterSection__details--snu__options">
              <p
                className={isSnu ? "RegisterSection__details--snu__options--red" : "RegisterSection__details--snu__options--white"}
                onClick={() => setIsSnu(true)}
              >
                SNU Student
              </p>
              <p
                className={!isSnu ? "RegisterSection__details--snu__options--red" : "RegisterSection__details--snu__options--white"}
                onClick={() => setIsSnu(false)}
              >
                Non - SNU Student / Faculty
              </p>
            </div>
          </div>
          
          <div className="RegisterSection__details--people" style={{ marginTop: '1.5rem' }}>
            <p>Select Ticket Bundle</p>
            <div className="RegisterSection__details--people__options" style={{ display: 'flex', gap: '10px' }}>
              <p
                className={bundleSize === 1 ? "RegisterSection__details--snu__options--red" : "RegisterSection__details--snu__options--white"}
                onClick={() => handleBundleChange(1)}
              >
                1 Person
              </p>
              <p
                className={bundleSize === 3 ? "RegisterSection__details--snu__options--red" : "RegisterSection__details--snu__options--white"}
                onClick={() => handleBundleChange(3)}
              >
                3 People
              </p>
              <p
                className={bundleSize === 5 ? "RegisterSection__details--snu__options--red" : "RegisterSection__details--snu__options--white"}
                onClick={() => handleBundleChange(5)}
              >
                5 People
              </p>
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
                  {isSnu && (
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
              <p>{isSnu ? "SNU" : "NON-SNU"}</p>
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
