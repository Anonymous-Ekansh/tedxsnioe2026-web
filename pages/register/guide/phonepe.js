import '../../../styles/routes/guide.scss';
import Head from 'next/head';

export default function PhonePeGuide() {
    return (
        <div className="GuidePage">
            <Head>
                <title>How to find UTR in PhonePe</title>
            </Head>
            <div className="GuidePage__container">
                <h1 className="GuidePage__title">How to find UTR in PhonePe</h1>
                <div className="GuidePage__steps">
                    <div className="GuidePage__step">
                        <h3>Step 1: Make Payment</h3>
                        <p>Open the PhonePe app on your device and make the payment using the provided QR code.</p>
                    </div>
                    <div className="GuidePage__step">
                        <h3>Step 2: Go to History</h3>
                        <p>Tap on the <strong>"History"</strong> icon located at the bottom right corner of the screen.</p>
                        <div className="GuidePage__image-placeholder">
                            <img src="/Images/Guide/phonepe 1.jpeg" alt="History Tab" />
                        </div>
                    </div>
                    <div className="GuidePage__step">
                        <h3>Step 3: Select the Payment</h3>
                        <p>Find and tap on the recent payment made to TEDxShiv Nadar University.</p>
                        <div className="GuidePage__image-placeholder">
                            <img src="/Images/Guide/phonepe 2.jpeg" alt="Specific Transaction" />
                        </div>
                    </div>
                    <div className="GuidePage__step">
                        <h3>Step 4: Locate the UTR Number</h3>
                        <p>In the "Transfer Details" section, you will see a 12-digit number labeled <strong>"UTR"</strong>. This is your UTR number.</p>
                        <div className="GuidePage__image-placeholder">
                            <img src="/Images/Guide/phonepe 3.jpeg" alt="UTR Number" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
