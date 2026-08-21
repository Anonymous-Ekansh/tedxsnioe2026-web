import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PaymentSuccess({initialData}) {
    const router = useRouter();
    const [paymentInfo, setPaymentInfo] = useState(null);

    useEffect(() => {
        console.log('Router query:', router.query);
        console.log('Initial data:', initialData);

        if (!router.isReady) return; // Wait for router to be ready

        // Get payment info from URL query parameters
        const { receiptNumber, transactionId, amount, participants } = router.query;
        console.log('Query parameters:', router.query); // Debug log
        
        if (receiptNumber && transactionId && amount) {
            setPaymentInfo({
                receiptNumber,
                transactionId,
                amount,
                participantCount: participants || '1'
            });

            localStorage.removeItem('paymentData'); // Clear localStorage on successful load
            
        } else if (router.isReady) {
            // If no payment info, redirect to register page
            const timer = setTimeout(() => {
            router.replace('/register');
        }, 3000);
        
        return () => clearTimeout(timer);
        }
    }, [router.isReady, router.query]);

    if (!paymentInfo) {
        return (
            <div className="ps">
                <div className="ps__card">
                    <div className="ps__icon ps__icon--loading">...</div>
                    <h2 className="ps__title">Loading payment details...</h2>
                    <p className="ps__text">If you&apos;re seeing this page without making a payment, you&apos;ll be redirected shortly.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="ps">
            <div className="ps__card">
                <div className="ps__icon">✓</div>
                
                <h1 className="ps__title">Payment Submitted Successfully!</h1>
                
                <div className="ps__info">
                    <h3 className="ps__section-title">Payment Details</h3>
                    
                    <div className="ps__row">
                        <span className="ps__label">Receipt Number</span>
                        <span className="ps__value">{paymentInfo.receiptNumber}</span>
                    </div>
                    
                    <div className="ps__row">
                        <span className="ps__label">Transaction ID</span>
                        <span className="ps__value">{paymentInfo.transactionId}</span>
                    </div>
                    
                    <div className="ps__row">
                        <span className="ps__label">Amount Paid</span>
                        <span className="ps__value">₹{paymentInfo.amount}</span>
                    </div>
                    
                    <div className="ps__row ps__row--last">
                        <span className="ps__label">Participants</span>
                        <span className="ps__value">{paymentInfo.participantCount} {paymentInfo.participantCount === '1' ? 'person' : 'people'}</span>
                    </div>
                </div>

                <div className="ps__screenshot-note">
                    <span className="ps__screenshot-icon">!</span>
                    <p>Please take a screenshot of this page for your records before leaving.</p>
                </div>

                <div className="ps__status">
                    <h3 className="ps__section-title">What&apos;s Next?</h3>
                    <div className="ps__status-card">
                        <div className="ps__status-icon">●</div>
                        <div>
                            <h4 className="ps__status-title">Pending Admin Review</h4>
                            <p className="ps__status-text">
                                Your payment is being reviewed by our admin team. 
                                You will receive an email confirmation once approved.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="ps__actions">
                    <Link href="/" className="ps__btn ps__btn--primary">
                        Return to Home
                    </Link>
                    <Link href="/register" className="ps__btn ps__btn--secondary">
                        Register Another
                    </Link>
                </div>

                <div className="ps__note">
                    <p>
                        <strong>Important:</strong> Please save your receipt number for future reference. 
                        If you have any questions, contact us with your receipt number.
                    </p>
                </div>
            </div>

            <style jsx>{`
                .ps {
                    min-height: 100vh;
                    background: linear-gradient(180deg, #491733 0%, #1b2432 60%, #0d0d0d 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 20px;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                }

                .ps__card {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(169, 172, 214, 0.15);
                    border-radius: 20px;
                    padding: 48px 40px;
                    max-width: 560px;
                    width: 100%;
                    text-align: center;
                }

                .ps__icon {
                    width: 72px;
                    height: 72px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #97d5cf, #e65a9a);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 24px;
                    font-size: 32px;
                    color: #fff;
                    font-weight: 700;
                }

                .ps__icon--loading {
                    background: rgba(169, 172, 214, 0.2);
                    font-size: 36px;
                }

                .ps__title {
                    color: #fff;
                    font-size: 26px;
                    font-weight: 700;
                    margin: 0 0 32px;
                    line-height: 1.2;
                    letter-spacing: -0.01em;
                }

                .ps__text {
                    color: rgba(244, 201, 218, 0.7);
                    font-size: 15px;
                    line-height: 1.5;
                }

                .ps__info {
                    background: rgba(255, 255, 255, 0.06);
                    border: 1px solid rgba(169, 172, 214, 0.1);
                    border-radius: 14px;
                    padding: 24px;
                    margin-bottom: 24px;
                    text-align: left;
                }

                .ps__section-title {
                    color: #a9acd6;
                    font-size: 12px;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    margin: 0 0 16px;
                    text-align: center;
                }

                .ps__row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 14px 0;
                    border-bottom: 1px solid rgba(169, 172, 214, 0.1);
                }

                .ps__row--last {
                    border-bottom: none;
                }

                .ps__label {
                    color: rgba(244, 201, 218, 0.6);
                    font-size: 14px;
                    font-weight: 400;
                }

                .ps__value {
                    color: #fff;
                    font-size: 14px;
                    font-weight: 600;
                    letter-spacing: 0.02em;
                }

                .ps__screenshot-note {
                    background: linear-gradient(135deg, rgba(230, 90, 154, 0.15), rgba(151, 213, 207, 0.15));
                    border: 1px solid rgba(230, 90, 154, 0.25);
                    border-radius: 12px;
                    padding: 16px 20px;
                    margin-bottom: 24px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    text-align: left;
                }

                .ps__screenshot-icon {
                    font-size: 24px;
                    flex-shrink: 0;
                }

                .ps__screenshot-note p {
                    color: #f4c9da;
                    font-size: 14px;
                    font-weight: 500;
                    margin: 0;
                    line-height: 1.4;
                }

                .ps__status {
                    margin-bottom: 28px;
                }

                .ps__status-card {
                    background: rgba(246, 213, 111, 0.08);
                    border: 1px solid rgba(246, 213, 111, 0.2);
                    border-radius: 12px;
                    padding: 16px;
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    text-align: left;
                }

                .ps__status-icon {
                    font-size: 22px;
                    flex-shrink: 0;
                }

                .ps__status-title {
                    color: #f6d56f;
                    font-size: 15px;
                    font-weight: 600;
                    margin: 0 0 6px;
                }

                .ps__status-text {
                    color: rgba(246, 213, 111, 0.75);
                    font-size: 13px;
                    margin: 0;
                    line-height: 1.5;
                }

                .ps__actions {
                    display: flex;
                    gap: 14px;
                    justify-content: center;
                    margin-bottom: 24px;
                    flex-wrap: wrap;
                }

                .ps__btn {
                    padding: 12px 28px;
                    border-radius: 28px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    display: inline-block;
                    letter-spacing: 0.02em;
                }

                .ps__btn--primary {
                    background: linear-gradient(135deg, #e65a9a, #a9acd6);
                    color: #fff;
                }

                .ps__btn--primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(230, 90, 154, 0.3);
                }

                .ps__btn--secondary {
                    background: transparent;
                    color: #a9acd6;
                    border: 1px solid rgba(169, 172, 214, 0.3);
                }

                .ps__btn--secondary:hover {
                    background: rgba(169, 172, 214, 0.1);
                    color: #fff;
                    transform: translateY(-2px);
                }

                .ps__note {
                    background: rgba(169, 172, 214, 0.08);
                    border: 1px solid rgba(169, 172, 214, 0.12);
                    border-radius: 10px;
                    padding: 14px 18px;
                }

                .ps__note p {
                    color: rgba(169, 172, 214, 0.8);
                    font-size: 13px;
                    margin: 0;
                    line-height: 1.5;
                }

                .ps__note strong {
                    color: #a9acd6;
                }

                @media (max-width: 600px) {
                    .ps {
                        padding: 20px 16px;
                    }

                    .ps__card {
                        padding: 32px 24px;
                    }

                    .ps__title {
                        font-size: 22px;
                    }

                    .ps__actions {
                        flex-direction: column;
                    }

                    .ps__btn {
                        width: 100%;
                        text-align: center;
                    }
                }
            `}</style>
        </div>
    );
}


export async function getServerSideProps(context) {
    const { query } = context;
    
    // Redirect if no query parameters
    if (!query.receiptNumber || !query.transactionId || !query.amount) {
        return {
            redirect: {
                destination: '/register',
                permanent: false,
            },
        };
    }

    return {
        props: { query }
    };
}