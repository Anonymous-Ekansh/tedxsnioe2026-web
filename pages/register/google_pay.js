import '../../styles/routes/google_pay.scss';
import useTicket from '../../hooks/useTicket'
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import BlurredSpinner from '../../components/BlurredSpinner/BlurredSpinner';
import { supabase } from '../../lib/supabase';
import Image from 'next/image';

export default function GooglePay() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [paymentData, setPaymentData] = useState(null);
    const [tid, setTid] = useState('');
    const [screenshot, setScreenshot] = useState(null);
    const { noOfPeople, setNoOfPeople, ticketPrice, setTicketPrice, snu, setSnu, nameOne, nameTwo, emailOne, emailTwo, phoneOne, phoneTwo, modeOfPayment } = useTicket();

    useEffect(() => {
        // Get payment data from localStorage
        const storedData = localStorage.getItem('paymentData');
        if (storedData) {
            const data = JSON.parse(storedData);
            setPaymentData(data);
        } else {
            // Redirect back if no payment data
            router.push('/register');
        }
    }, [router]);

    const calculatePrice = () => {
        if (paymentData) {
            return paymentData.total_amount.toString();
        }
        // Fallback to old logic
        if (snu) {
            return noOfPeople ? '699' : '1299';
        } else {
            return noOfPeople ? '699' : '1299';
        }
    };

    const handleScreenshotChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('File size should be less than 5MB');
                return;
            }
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                return;
            }
            setScreenshot(file);
        }
    };

    const uploadScreenshot = async (file, paymentId) => {
        try {

            const fileName = `${paymentId}_${Date.now()}.${file.name.split('.').pop()}`;

            // Upload the file
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('payment-screenshots')
                .upload(fileName, file);

            if (uploadError) {
                console.error('Storage upload error:', uploadError);
                throw uploadError;
            }



            // Get public URL - make sure to await this
            const { data: urlData } = await supabase.storage
                .from('payment-screenshots')
                .getPublicUrl(fileName);

            return urlData.publicUrl;
        } catch (error) {
            console.error('Error uploading screenshot:', error);
            alert('Failed to upload screenshot: ' + error.message);
            throw error;
        }
    };
    const handleClick = async () => {
        if (tid.trim() === '') {
            alert('Please enter a Transaction ID/UTR');
            return;
        }

        if (!paymentData) {
            alert('Payment data not found. Please go back to registration.');
            return;
        }

        setLoading(true);
        try {

            // Generate ID client-side
            const paymentId = crypto.randomUUID();
            
            let screenshotUrl = null;
            if (screenshot) {
                // Upload screenshot BEFORE inserting payment record
                screenshotUrl = await uploadScreenshot(screenshot, paymentId);
            }

            // Insert the payment record with all fields in one go
            const { error: paymentError } = await supabase
                .from('payments')
                .insert({
                    id: paymentId,
                    // New flexible structure
                    participants: paymentData.participants,
                    number_of_people: paymentData.number_of_people,
                    is_snu_student: paymentData.is_snu_student,
                    total_amount: paymentData.total_amount,
                    price_per_person: paymentData.price_per_person || null,
                    offer_type: paymentData.offer_type || null,
                    transaction_id: tid.trim() ? tid.trim() : null,
                    payment_method: 'upi',
                    status: 'pending',
                    transaction_screenshot_url: screenshotUrl, // Inserted directly, no UPDATE needed!

                    // Legacy fields for backward compatibility
                    name_one: paymentData.participants[0]?.name || '',
                    email_one: paymentData.participants[0]?.email || '',
                    phone_one: paymentData.participants[0]?.phone || '',
                    name_two: paymentData.participants[1]?.name || null,
                    email_two: paymentData.participants[1]?.email || null,
                    phone_two: paymentData.participants[1]?.phone || null
                });

            if (paymentError) {
                console.error('Payment insertion error:', paymentError);
                if (paymentError.code === '23505') { // Unique constraint violation
                    throw new Error('This Transaction ID/UTR has already been used. Please check your Transaction ID/UTR.');
                }
                throw paymentError;
            }

            // Redirect to success page with payment details
            const queryParams = new URLSearchParams({
                receiptNumber: `TXR${paymentId.slice(-8)}`,
                transactionId: tid.trim() || 'Uploaded Screenshot',
                amount: paymentData.total_amount,
                participants: paymentData.participants.length
            });

            // localStorage.removeItem('paymentData');  

            await router.push({
                pathname: '/register/success',
                query: queryParams.toString()
            });

        } catch (error) {
            console.error('Error submitting payment:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {loading ? <BlurredSpinner /> : <></>}
            <div className='GooglePay'>
                <div className='GooglePay__qr'>
                    <p className='GooglePay__qr--text'>Scan the QR to Pay</p>
                    <p style={{ fontSize: "1rem", marginTop: "0", marginBottom: ".5rem" }} className='GooglePay__qr--text'>Urshita Rathi</p>
                    <Image className='GooglePay__qr--image' src='/Images/Assets/urshita_qr.jpeg' alt='Google Pay QR' width={600} height={400} quality={95} />
                    <div className='GooglePay__qr--TID'>
                        <label htmlFor="tid" style={{
                            display: 'block',
                            marginTop: '1rem',
                            marginBottom: '0.5rem',
                            fontSize: '0.9rem',
                            color: '#333',
                            fontWeight: 'bold'
                        }}>
                            Transaction ID/UTR Number <span style={{color: '#e53e3e'}}>(Mandatory)</span>
                        </label>
                        <input
                            id="tid"
                            onChange={(e) => setTid(e.target.value)}
                            type='text'
                            placeholder='Transaction ID/UTR Number'
                        />
                    </div>
                    <div className='GooglePay__qr--screenshot'>
                        <label htmlFor="screenshot" style={{
                            display: 'block',
                            marginTop: '1rem',
                            marginBottom: '0.5rem',
                            fontSize: '0.9rem',
                            color: '#333'
                        }}>
                            Upload Payment Screenshot (Optional)
                        </label>
                        <input
                            type="file"
                            id="screenshot"
                            accept="image/*"
                            onChange={handleScreenshotChange}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                marginBottom: '0.5rem'
                            }}
                        />
                        <small style={{ fontSize: '0.8rem', color: '#666' }}>
                            Upload screenshot of payment confirmation (Max 5MB)
                        </small>
                    </div>
                    <p onClick={() => handleClick()} className='GooglePay__qr--bottom'>Proceed</p>
                </div>
                <div className='GooglePay__details'>
                    <div className="PaymentGuides">
                        <h3>How to find your UTR/Transaction Number?</h3>
                        <div className="PaymentGuides__buttons">
                            <Link href="/register/guide/gpay" target="_blank" rel="noopener noreferrer">Google Pay Guide</Link>
                            <Link href="/register/guide/phonepe" target="_blank" rel="noopener noreferrer">PhonePe Guide</Link>
                            <Link href="/register/guide/paytm" target="_blank" rel="noopener noreferrer">Paytm Guide</Link>
                        </div>
                    </div>
                    <div className='GooglePay__details--priceDetails'>
                        <p>Price Details</p>
                        <div className='GooglePay__details--priceDetails__snu'>
                            <p>Type Of Person</p>
                            <p>{paymentData ? (paymentData.is_snu_student ? 'SNU' : 'NON-SNU') : (snu ? 'SNU' : 'NON-SNU')}</p>
                        </div>
                        <div className='GooglePay__details--priceDetails__people'>
                            <p>No. Of People</p>
                            <p>{paymentData ? paymentData.number_of_people : (noOfPeople ? '1' : '2')}</p>
                        </div>
                        <div className='GooglePay__details--priceDetails__ticket'>
                            <p>Ticket Price (per person)</p>
                            <p>{paymentData ?
                                (paymentData.total_amount / paymentData.number_of_people).toString() :
                                (snu ?
                                    (noOfPeople ? '699' : '649.5') : // 1099/2 for 2 tickets
                                    (noOfPeople ? '699' : '649.5')   // 1199/2 for 2 tickets
                                )
                            }</p>
                        </div>
                        <hr />
                        <div className='GooglePay__details--priceDetails__total'>
                            <p>Total Amount</p>
                            <p>₹{calculatePrice()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}