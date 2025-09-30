import "../../styles/routes/register.scss";
import useTicket from "../../hooks/useTicket";
import React from "react";
import { useRouter } from "next/router";
import Image from 'next/image';

export default function Register() {
  const router = useRouter();
  const {
    noOfPeople,
    setNoOfPeople,
    ticketPrice,
    setTicketPrice,
    snu,
    setSnu,
    setNameOne,
    setNameTwo,
    setEmailOne,
    setEmailTwo,
    setPhoneOne,
    setPhoneTwo,
  } = useTicket();
  const handleClick = (isSnu) => {
    if (isSnu == "snu") {
      setSnu(true);
    } else {
      setSnu(false);
    }
  };
  const [name1, setName1] = React.useState("");
  const [name2, setName2] = React.useState("");
  const [email1, setEmail1] = React.useState("");
  const [email2, setEmail2] = React.useState("");
  const [phone1, setPhone1] = React.useState("");
  const [phone2, setPhone2] = React.useState("");

  // Calculate participants based on current form state
  const participants = React.useMemo(() => {
    const participantList = [];
    if (name1 && email1 && phone1) {
      participantList.push({ name: name1, email: email1, phone: phone1 });
    }
    if (!noOfPeople && name2 && email2 && phone2) {
      participantList.push({ name: name2, email: email2, phone: phone2 });
    }
    return participantList;
  }, [name1, email1, phone1, name2, email2, phone2, noOfPeople]);

  const calculatePrice = (numberOfPeople = participants.length, isSnuStudent = snu) => {
    // Pricing structure based on your requirements
    // const pricingRules = [
    //   { min: 1, max: 2, snu: 375, nonSnu: 650 },
    //   { min: 3, max: 4, snu: 350, nonSnu: 600 },
    //   { min: 5, max: 20, snu: 325, nonSnu: 550 }
    // ];

    // // Find the appropriate pricing rule
    // const rule = pricingRules.find(rule => 
    //   numberOfPeople >= rule.min && numberOfPeople <= rule.max
    // );

    // if (!rule) {
    //   // Default to the last rule for large groups
    //   const defaultRule = pricingRules[pricingRules.length - 1];
    //   return (isSnuStudent ? defaultRule.snu : defaultRule.nonSnu) * numberOfPeople;
    // }

    // const pricePerPerson = isSnuStudent ? rule.snu : rule.nonSnu;
    // return pricePerPerson * numberOfPeople;

    if (isSnuStudent) {
      return numberOfPeople === 1 ? 599 : 1099;
    } else {
      return numberOfPeople === 1 ? 649 : 1199;
    }

  };
  // Simplified nested if statements into else if clauses for better readability
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[\w-\.]+@snu\.edu\.in$/;
    const emailRegex2 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^(?:\d{10}|\+\d{1,3}\s?\d{10})$/;

    // Validate required fields
    if (noOfPeople) {
      if (name1 === '' || email1 === '' || phone1 === '') {
        alert('Please fill all the fields');
        return;
      }
    } else if (name1 === '' || email1 === '' || phone1 === '' || name2 === '' || email2 === '' || phone2 === '') {
      alert('Please fill all the fields');
      return;
    }

    if (snu) {
      if (noOfPeople) {
        if (emailRegex.test(email1) && phoneRegex.test(phone1)) {
          const participants = [{ name: name1, email: email1, phone: phone1 }];
          const paymentData = {
            participants,
            number_of_people: participants.length,
            is_snu_student: true,
            total_amount: calculatePrice(participants.length, true)
          };
          localStorage.setItem("paymentData", JSON.stringify(paymentData));
          router.push("/register/google_pay");
        } else {
          alert("Please enter a valid SNU email ID and phone number");
          return;
        }
      } else if (
        emailRegex.test(email1) &&
        emailRegex.test(email2) &&
        phoneRegex.test(phone1) &&
        phoneRegex.test(phone2)
      ) {
        const participants = [
          { name: name1, email: email1, phone: phone1 },
          { name: name2, email: email2, phone: phone2 }
        ];
        const paymentData = {
          participants,
          number_of_people: 2,
          is_snu_student: true,
          total_amount: calculatePrice(2, true),
          price_per_person: calculatePrice(2, true) / 2,
          offer_type: 'regular'
        };
        localStorage.setItem("paymentData", JSON.stringify(paymentData));
        router.push("/register/google_pay");
      } else {
        alert("Please enter valid SNU email IDs and phone numbers");
        return;
      }
    } else if (noOfPeople) {
      if (emailRegex2.test(email1) && phoneRegex.test(phone1)) {
        const participants = [{ name: name1, email: email1, phone: phone1 }];
        const paymentData = {
          participants,
          number_of_people: participants.length,
          is_snu_student: false,
          total_amount: calculatePrice(participants.length, false)
        };
        localStorage.setItem("paymentData", JSON.stringify(paymentData));
        router.push("/register/google_pay");
      } else {
        alert("Please enter a valid email ID and phone number");
        return;
      }
    } else if (emailRegex2.test(email1) && emailRegex2.test(email2) && phoneRegex.test(phone1) && phoneRegex.test(phone2)) {
      const participants = [
        { name: name1, email: email1, phone: phone1 },
        { name: name2, email: email2, phone: phone2 }
      ];
      const paymentData = {
        participants,
        number_of_people: participants.length,
        is_snu_student: false,
        total_amount: calculatePrice(participants.length, false)
      };
      localStorage.setItem("paymentData", JSON.stringify(paymentData));
      router.push("/register/google_pay");
    } else {
      alert("Please enter valid email IDs and phone numbers");
      return;
    }
  };
  return (
    <>
      <div className="RegisterSection">
        <div className="RegisterSection__details">
          <div className="RegisterSection__details--snu">
            <p>Enter Details</p>
            <div className="RegisterSection__details--snu__options">
              <p
                className={
                  snu
                    ? "RegisterSection__details--snu__options--red"
                    : "RegisterSection__details--snu__options--white"
                }
                onClick={() => handleClick("snu")}
              >
                SNU Student
              </p>
              <p
                className={
                  snu
                    ? "RegisterSection__details--snu__options--white"
                    : "RegisterSection__details--snu__options--red"
                }
                onClick={() => handleClick("nosnu")}
              >
                Non - SNU Student / Faculty
              </p>
            </div>
          </div>
          <div className="RegisterSection__details--people">
            <p>No. Of People</p>
            <div className="RegisterSection__details--people__options">
              <p
                className={
                  noOfPeople
                    ? "RegisterSection__details--snu__options--red"
                    : "RegisterSection__details--snu__options--white"
                }
                onClick={() => setNoOfPeople(true)}
              >
                1
              </p>
              <p
                className={
                  noOfPeople
                    ? "RegisterSection__details--snu__options--white"
                    : "RegisterSection__details--snu__options--red"
                }
                onClick={() => setNoOfPeople(false)}
              >
                2
              </p>
            </div>
          </div>
          {noOfPeople ? (
            <div className="RegisterSection__details--value">
              <p>Details Student 1</p>
              <div className="RegisterSection__details--value__name">
                <p>Full Name</p>
                <input
                  onChange={(e) => setName1(e.target.value)}
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="RegisterSection__details--value__email">
                <p>Email</p>
                <input
                  onChange={(e) => setEmail1(e.target.value)}
                  type="email"
                  placeholder="Email Id"
                  required
                />
                {snu ? (
                  <p className="RegisterSection__details--value__email--warn">
                    Please enter only snu email id
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="RegisterSection__details--value__phone">
                <p>Mobile Number</p>
                <input
                  onChange={(e) => setPhone1(e.target.value)}
                  type="text"
                  placeholder="Mobile Number"
                  required
                />
              </div>
            </div>
          ) : (
            <div className="RegisterSection__details--value">
              <p>Details Student 1</p>
              <div className="RegisterSection__details--value__name">
                <p>Full Name</p>
                <input
                  onChange={(e) => setName1(e.target.value)}
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="RegisterSection__details--value__email">
                <p>Email</p>
                <input
                  onChange={(e) => setEmail1(e.target.value)}
                  type="email"
                  placeholder="Email Id"
                  required
                />
                {snu ? (
                  <p className="RegisterSection__details--value__email--warn">
                    Please enter only snu email id
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="RegisterSection__details--value__phone">
                <p>Mobile Number</p>
                <input
                  onChange={(e) => setPhone1(e.target.value)}
                  type="text"
                  placeholder="Mobile Number"
                  required
                />
              </div>
              <p>Details Student 2</p>
              <div className="RegisterSection__details--value__name">
                <p>Full Name</p>
                <input
                  onChange={(e) => setName2(e.target.value)}
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="RegisterSection__details--value__email">
                <p>Email</p>
                <input
                  onChange={(e) => setEmail2(e.target.value)}
                  type="email"
                  placeholder="Email Id"
                  required
                />
                {snu ? (
                  <p className="RegisterSection__details--value__email--warn">
                    Please enter only snu email id
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="RegisterSection__details--value__phone">
                <p>Mobile Number</p>
                <input
                  onChange={(e) => setPhone2(e.target.value)}
                  type="text"
                  placeholder="Mobile Number"
                  required
                />
              </div>
            </div>
          )}
          <div
            onClick={(e) => handleSubmit(e)}
            style={{ color: "black" }}
            className="RegisterSection__details--submit"
          >
            Submit
          </div>
        </div>
        <div className="RegisterSection__amount">
          <Image
            className="RegisterSection__amount--image"
            src="/Images/Assets/payment.png"
            alt="Payment Details"
            width={600}
            height={400}
          />
          <div className="RegisterSection__amount--priceDetails">
            <p>Price Details</p>
            <div className="RegisterSection__amount--priceDetails__snu">
              <p>Type Of Person</p>
              <p>{snu ? "SNU" : "NON-SNU"}</p>
            </div>
            <div className="RegisterSection__amount--priceDetails__people">
              <p>No. Of People</p>
              <p>{participants.length || (noOfPeople ? 1 : 2)}</p>
            </div>
            <div className="RegisterSection__amount--priceDetails__ticket">
              <p>Ticket Price (per person)</p>
              <p>₹{snu ?
                (noOfPeople ? '599' : '549.50') :
                (noOfPeople ? '649' : '599.50')
              }</p>
            </div>
            <hr />
            <div className="RegisterSection__amount--priceDetails__total">
              <p>Total Amount</p>
              <p>₹{snu ?
                (noOfPeople ? '599' : '1099') :
                (noOfPeople ? '649' : '1199')
              }</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
