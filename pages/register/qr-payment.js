import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import "../../styles/routes/qr-payment.scss";
import Image from 'next/image';

export default function QRPayment() {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [transactionId, setTransactionId] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    // Get payment data from localStorage
    const storedData = localStorage.getItem('paymentData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setPaymentData(data);
      fetchQRCode(data.total_amount, data.is_snu_student);
    } else {
      // Redirect back if no payment data
      router.push('/register');
    }
  }, [router]);

  const fetchQRCode = async (amount, isSnu) => {
    try {
      // Determine QR code ID based on amount and student status
      const qrId = isSnu ? 'snu_750' : 'regular_1300';
      
      const { data, error } = await supabase
        .from('payment_qr_codes')
        .select('*')
        .eq('id', qrId)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error fetching QR code:', error);
        return;
      }

      setQrCode(data);
    } catch (error) {
      console.error('Error:', error);
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
      
      const { data, error } = await supabase.storage
        .from('payment-screenshots')
        .upload(fileName, file);

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('payment-screenshots')
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading screenshot:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!transactionId.trim()) {
      alert('Please enter the transaction ID');
      return;
    }
    
    if (!screenshot) {
      alert('Please upload the payment screenshot');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // First, insert the payment record
      const { data: paymentRecord, error: paymentError } = await supabase
        .from('payments')
        .insert({
          name_one: paymentData.name_one,
          name_two: paymentData.name_two || null,
          email_one: paymentData.email_one,
          email_two: paymentData.email_two || null,
          phone_one: paymentData.phone_one,
          phone_two: paymentData.phone_two || null,
          number_of_people: paymentData.number_of_people,
          is_snu_student: paymentData.is_snu_student,
          total_amount: paymentData.total_amount,
          transaction_id: transactionId.trim(),
          qr_code_id: qrCode?.id,
          status: 'pending'
        })
        .select()
        .single();

      if (paymentError) {
        if (paymentError.code === '23505') { // Unique constraint violation
          throw new Error('This transaction ID has already been used. Please check your transaction ID.');
        }
        throw paymentError;
      }

      // Upload screenshot
      const screenshotUrl = await uploadScreenshot(screenshot, paymentRecord.id);

      // Update payment record with screenshot URL
      const { error: updateError } = await supabase
        .from('payments')
        .update({ transaction_screenshot_url: screenshotUrl })
        .eq('id', paymentRecord.id);

      if (updateError) {
        throw updateError;
      }

      setSubmitMessage('Payment submitted successfully! You will receive a confirmation email once approved.');
      
      // Clear localStorage
      localStorage.removeItem('paymentData');
      
      // Redirect to confirmation page after 3 seconds
      setTimeout(() => {
        router.push('/register/confirm');
      }, 3000);

    } catch (error) {
      console.error('Error submitting payment:', error);
      setSubmitMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!paymentData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="qr-payment">
      <div className="qr-payment__container">
        <div className="qr-payment__header">
          <h1>Complete Your Payment</h1>
          <p>Scan the QR code below and upload your payment proof</p>
        </div>

        <div className="qr-payment__content">
          <div className="qr-payment__details">
            <h2>Payment Details</h2>
            <div className="payment-info">
              <div className="info-row">
                <span>Name(s):</span>
                <span>
                  {paymentData.name_one}
                  {paymentData.name_two && `, ${paymentData.name_two}`}
                </span>
              </div>
              <div className="info-row">
                <span>Number of People:</span>
                <span>{paymentData.number_of_people}</span>
              </div>
              <div className="info-row">
                <span>Student Type:</span>
                <span>{paymentData.is_snu_student ? 'SNU Student' : 'Non-SNU'}</span>
              </div>
              <div className="info-row total">
                <span>Total Amount:</span>
                <span>₹{paymentData.total_amount}</span>
              </div>
            </div>
          </div>

          <div className="qr-payment__qr">
            <h2>Scan to Pay</h2>
            {qrCode ? (
              <div className="qr-container">
                <Image 
                  src={qrCode.qr_code_url} 
                  alt="Payment QR Code" 
                  className="qr-image"
                />
                <p>Scan with any UPI app</p>
              </div>
            ) : (
              <div className="qr-loading">Loading QR Code...</div>
            )}
          </div>

          <div className="qr-payment__form">
            <h2>Upload Payment Proof</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="transactionId">Transaction ID *</label>
                <input
                  type="text"
                  id="transactionId"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter your transaction ID"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="screenshot">Payment Screenshot *</label>
                <input
                  type="file"
                  id="screenshot"
                  accept="image/*"
                  onChange={handleScreenshotChange}
                  required
                />
                <small>Upload a screenshot of your payment confirmation (Max 5MB)</small>
              </div>

              {submitMessage && (
                <div className={`message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
                  {submitMessage}
                </div>
              )}

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Payment Proof'}
              </button>
            </form>
          </div>
        </div>

        <div className="qr-payment__instructions">
          <h3>Instructions:</h3>
          <ol>
            <li>Scan the QR code with any UPI app (PhonePe, Google Pay, Paytm, etc.)</li>
            <li>Pay the exact amount shown above</li>
            <li>Take a screenshot of the payment confirmation</li>
            <li>Enter your transaction ID and upload the screenshot</li>
            <li>Wait for admin approval (you&apos;ll receive an email confirmation)</li>
          </ol>
        </div>
      </div>
    </div>
  );
}