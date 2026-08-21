import '../../../styles/routes/guide.scss';
import Head from 'next/head';

export default function PaytmGuide() {
    return (
        <div className="GuidePage">
            <Head>
                <title>How to find UTR in Paytm</title>
            </Head>
            <div className="GuidePage__container">
                <h1 className="GuidePage__title">How to find UTR in Paytm</h1>
                <div className="GuidePage__steps">
                    <div className="GuidePage__step">
                        <h3>Step 1: Make Payment</h3>
                        <p>Open the Paytm app on your device and make the payment using the provided QR code.</p>
                    </div>
                    <div className="GuidePage__step">
                        <h3>Step 2: Go to Balance & History</h3>
                        <p>On the home screen, tap on <strong>"Balance & History"</strong>.</p>
                        <div className="GuidePage__image-placeholder">
                            <img src="/Images/Guide/paytm 1.jpeg" alt="Balance & History Button" />
                        </div>
                    </div>
                    <div className="GuidePage__step">
                        <h3>Step 3: Select the Payment</h3>
                        <p>Under the "Payment History" section, find and tap on the payment made to TEDxShiv Nadar University.</p>
                        <div className="GuidePage__image-placeholder">
                            <img src="/Images/Guide/paytm 2.jpeg" alt="Specific Transaction" />
                        </div>
                    </div>
                    <div className="GuidePage__step">
                        <h3>Step 4: Locate the UPI Ref No.</h3>
                        <p>Look for the 12-digit number labeled <strong>"UPI Ref No"</strong> under the payment details. This is your UTR number.</p>
                        <div className="GuidePage__image-placeholder">
                            <img src="/Images/Guide/paytm 3.jpeg" alt="UPI Ref No" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
