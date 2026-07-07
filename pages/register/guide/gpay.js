import '../../../styles/routes/guide.scss';
import Head from 'next/head';

export default function GPayGuide() {
    return (
        <div className="GuidePage">
            <Head>
                <title>How to find UTR in Google Pay</title>
            </Head>
            <div className="GuidePage__container">
                <h1 className="GuidePage__title">How to find UTR in Google Pay (GPay)</h1>
                <div className="GuidePage__steps">
                    <div className="GuidePage__step">
                        <h3>Step 1: Make Payment</h3>
                        <p>Open the Google Pay app on your device and make the payment using the provided QR code.</p>
                    </div>
                    <div className="GuidePage__step">
                        <h3>Step 2: Go to Transaction History</h3>
                        <p>Scroll down to the bottom of the main screen and tap on <strong>"Show transaction history"</strong>.</p>
                        <div className="GuidePage__image-placeholder">
                            <img src="/Images/Guide/googlepay 1.jpeg" alt="Transaction History Button" />
                        </div>
                    </div>
                    <div className="GuidePage__step">
                        <h3>Step 3: Select the Payment</h3>
                        <p>Find and tap on the payment you just made to TEDxShivNadarUniversity.</p>
                        <div className="GuidePage__image-placeholder">
                            <img src="/Images/Guide/googlepay 2.jpeg" alt="Specific Transaction" />
                        </div>
                    </div>
                    <div className="GuidePage__step">
                        <h3>Step 4: Locate the UPI Transaction ID</h3>
                        <p>Under the transaction details, look for the 12-digit number labeled <strong>"UPI transaction ID"</strong>. This is your UTR number.</p>
                        <div className="GuidePage__image-placeholder">
                            <img src="/Images/Guide/googlepay 3.jpeg" alt="UPI Transaction ID" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
