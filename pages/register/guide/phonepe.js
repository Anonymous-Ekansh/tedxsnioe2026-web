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
                        <h3>Step 1: Open PhonePe</h3>
                        <p>Open the PhonePe app on your device.</p>
                    </div>
                    <div className="GuidePage__step">
                        <h3>Step 2: Go to History</h3>
                        <p>Tap on the <strong>"History"</strong> icon located at the bottom right corner of the screen.</p>
                        <div className="GuidePage__image-placeholder">
                            [Insert Screenshot of History Tab Here]
                        </div>
                    </div>
                    <div className="GuidePage__step">
                        <h3>Step 3: Select the Payment</h3>
                        <p>Find and tap on the recent payment made to TEDxShivNadarUniversity.</p>
                        <div className="GuidePage__image-placeholder">
                            [Insert Screenshot of Specific Transaction Here]
                        </div>
                    </div>
                    <div className="GuidePage__step">
                        <h3>Step 4: Locate the UTR Number</h3>
                        <p>In the "Transfer Details" section, you will see a 12-digit number labeled <strong>"UTR"</strong>. This is your UTR number.</p>
                        <div className="GuidePage__image-placeholder">
                            [Insert Screenshot showing UTR Number Here]
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
