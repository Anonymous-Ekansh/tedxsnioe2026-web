import '../../styles/routes/google_pay.scss';
import useTicket from '../../hooks/useTicket'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { payment } from '../../operations/payment.fetch';
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
            console.log('Starting screenshot upload for payment:', paymentId);
            console.log('File details:', { name: file.name, size: file.size, type: file.type });

            const fileName = `${paymentId}_${Date.now()}.${file.name.split('.').pop()}`;
            console.log('Generated filename:', fileName);

            // Upload the file
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('payment-screenshots')
                .upload(fileName, file);

            if (uploadError) {
                console.error('Storage upload error:', uploadError);
                throw uploadError;
            }

            console.log('Upload successful:', uploadData);

            // Get public URL - make sure to await this
            const { data: urlData } = await supabase.storage
                .from('payment-screenshots')
                .getPublicUrl(fileName);

            console.log('Generated public URL:', urlData.publicUrl);
            return urlData.publicUrl;
        } catch (error) {
            console.error('Error uploading screenshot:', error);
            alert('Failed to upload screenshot: ' + error.message);
            throw error;
        }
    };
    const handleClick = async () => {
        if (tid === '' && !screenshot) {
            alert('Please enter a Transaction ID/UTR or upload a payment screenshot');
            return;
        }

        if (!paymentData) {
            alert('Payment data not found. Please go back to registration.');
            return;
        }

        setLoading(true);
        try {
            console.log('Starting payment submission process...');
            console.log('Payment data:', paymentData);
            console.log('Transaction ID/UTR:', tid);
            console.log('Screenshot file:', screenshot);

            // First, insert the payment record
            const { data: paymentRecord, error: paymentError } = await supabase
                .from('payments')
                .insert({
                    // New flexible structure
                    participants: paymentData.participants,
                    number_of_people: paymentData.number_of_people,
                    is_snu_student: paymentData.is_snu_student,
                    total_amount: paymentData.total_amount,
                    transaction_id: tid.trim() ? tid.trim() : null,
                    payment_method: 'upi',
                    status: 'pending',

                    // Legacy fields for backward compatibility
                    name_one: paymentData.participants[0]?.name || '',
                    email_one: paymentData.participants[0]?.email || '',
                    phone_one: paymentData.participants[0]?.phone || '',
                    name_two: paymentData.participants[1]?.name || null,
                    email_two: paymentData.participants[1]?.email || null,
                    phone_two: paymentData.participants[1]?.phone || null
                })
                .select()
                .single();

            if (paymentError) {
                console.error('Payment insertion error:', paymentError);
                if (paymentError.code === '23505') { // Unique constraint violation
                    throw new Error('This Transaction ID/UTR has already been used. Please check your Transaction ID/UTR.');
                }
                throw paymentError;
            }

            if (screenshot) {
                const screenshotUrl = await uploadScreenshot(screenshot, paymentRecord.id);
                console.log('SCREENSHOT URL , URL:', screenshotUrl);
                // Upload screenshot after payment record is created
                const { data: updateData, error: updateError } = await supabase
                .from('payments')
                .update({ 
                    transaction_screenshot_url: screenshotUrl  // Match the exact column name
                })
                .eq('id', paymentRecord.id)
                .select();

                if (updateError) {
                    console.error('Failed to update screenshot URL:', updateError);
                    throw updateError;
                } else {
                    console.log('Screenshot URL updated successfully:', updateData);
                }
            }

            // Redirect to success page with payment details
            const queryParams = new URLSearchParams({
                receiptNumber: `TXR${paymentRecord.id.slice(-8)}`,
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
                    <p style={{ fontSize: "1rem", marginTop: "0", marginBottom: ".5rem" }} className='GooglePay__qr--text'>Mithreyi SR</p>
                    <Image className='GooglePay__qr--image' src='/Images/Assets/google_pay.png' alt='Google Pay QR' width={600} height={400} quality={95} />
                    <div className='GooglePay__qr--TID'>
                        <input
                            onChange={(e) => setTid(e.target.value)}
                            type='text'
                            placeholder='Transaction ID/UTR Number'
                        />
                    </div>
                    <div className='GooglePay__qr--or'>
                        <span>— OR —</span>
                    </div>
                    <div className='GooglePay__qr--screenshot'>
                        <label htmlFor="screenshot" style={{
                            display: 'block',
                            marginTop: '1rem',
                            marginBottom: '0.5rem',
                            fontSize: '0.9rem',
                            color: '#333'
                        }}>
                            Upload Payment Screenshot
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
                    <div className="GooglePay__brand">
                        <Image
                            className="GooglePay__brand--logo"
                            src="/Images/Assets/mosaic-logo.svg"
                            alt="Mosaic Logo"
                            width={100}
                            height={100}
                            priority
                        />
                        <h2 className="GooglePay__brand--title">SECURE YOUR SPOT</h2>
                        <p className="GooglePay__brand--subtitle">Be part of the ideas that shape the future.</p>
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