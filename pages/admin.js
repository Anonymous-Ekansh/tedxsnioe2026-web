import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Image from 'next/image';
import "../styles/routes/admin.scss";

export default function AdminDashboard() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, declined
  const [peopleFilter, setPeopleFilter] = useState('all'); // all, 1, 2
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualEntry, setManualEntry] = useState({
    participants: [{ name: '', email: '', phone: '' }],
    number_of_people: 1,
    is_snu_student: false,
    total_amount: '',
    payment_method: 'cash',
    transaction_id: '',
    status: 'approved',
    review_notes: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    declined: 0,
    totalRevenue: 0,
    onePerson: 0,
    twoPerson: 0
  });

  useEffect(() => {
    // Simple authentication check
    const email = localStorage.getItem('adminEmail');
    if (email) {
      setAdminEmail(email);
      setIsAuthenticated(true);
      fetchPayments();
    }
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: adminEmail,
          password: adminPassword
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('adminEmail', adminEmail);
        setIsAuthenticated(true);
        fetchPayments();
      } else {
        alert(data.error || 'Invalid admin credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminEmail');
    setIsAuthenticated(false);
    setAdminEmail('');
    setPayments([]);
  };

  const fetchPayments = async () => {
    try {
      setLoading(true);

      // Use regular supabase client for now to test
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching payments:', error);
        alert('Error loading payments: ' + error.message);
        return;
      }

      setPayments(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (paymentData) => {
    const stats = {
      total: paymentData.length,
      pending: paymentData.filter(p => p.status === 'pending').length,
      approved: paymentData.filter(p => p.status === 'approved').length,
      declined: paymentData.filter(p => p.status === 'declined').length,
      totalRevenue: paymentData
        .filter(p => p.status === 'approved')
        .reduce((sum, p) => sum + parseFloat(p.total_amount), 0),
      audience: paymentData.filter(p => p.number_of_people === 1).length + paymentData.filter(p => p.number_of_people === 2).length * 2,
      onePerson: paymentData.filter(p => p.number_of_people === 1).length,
      twoPerson: paymentData.filter(p => p.number_of_people === 2).length
    };
    setStats(stats);
  };

  const updatePaymentStatus = async (paymentId, status, notes = '', paymentObj = null) => {
    try {
      const response = await fetch('/api/admin/payments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentId,
          status,
          reviewNotes: notes,
          reviewedBy: adminEmail
        }),
      });

      if (response.ok) {
        // If approving, send confirmation email
        if (status === 'approved' && paymentObj) {
          // Collect emails from participants or fallback to name_one/name_two
          let email1 = '';
          let email2 = '';
          if (paymentObj.participants && paymentObj.participants.length > 0) {
            email1 = paymentObj.participants[0]?.email || '';
            email2 = paymentObj.participants[1]?.email || '';
          } else {
            email1 = paymentObj.email_one || '';
            email2 = paymentObj.email_two || '';
          }
          // Call the sendEmail API
          await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email1, email2 }),
          });
        }
        // Refresh payments
        fetchPayments();
        setSelectedPayment(null);
        setReviewNotes('');
        alert(`Payment ${status} successfully!`);
      } else {
        alert('Error updating payment status');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating payment status');
    }
  };

  const addParticipant = () => {
    setManualEntry(prev => ({
      ...prev,
      participants: [...prev.participants, { name: '', email: '', phone: '' }],
      number_of_people: prev.number_of_people + 1
    }));
  };

  const removeParticipant = (index) => {
    if (manualEntry.participants.length > 1) {
      const newParticipants = manualEntry.participants.filter((_, i) => i !== index);
      setManualEntry(prev => ({
        ...prev,
        participants: newParticipants,
        number_of_people: newParticipants.length
      }));
    }
  };

  const updateParticipant = (index, field, value) => {
    const newParticipants = [...manualEntry.participants];
    newParticipants[index][field] = value;
    setManualEntry(prev => ({
      ...prev,
      participants: newParticipants
    }));
  };

  const submitManualEntry = async (e) => {
    e.preventDefault();

    // Validate all participants have required fields
    const isValid = manualEntry.participants.every(p => p.name && p.email && p.phone);
    if (!isValid) {
      alert('Please fill all participant details');
      return;
    }

    try {
      const response = await fetch('/api/admin/manual-payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...manualEntry,
          added_by: adminEmail
        }),
      });

      if (response.ok) {
        alert('Manual entry added successfully');
        setShowManualEntry(false);
        // Reset form
        setManualEntry({
          participants: [{ name: '', email: '', phone: '' }],
          number_of_people: 1,
          is_snu_student: false,
          total_amount: '',
          payment_method: 'cash',
          transaction_id: '',
          status: 'approved',
          review_notes: ''
        });
        fetchPayments();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding manual entry');
    }
  };

  const filteredPayments = payments.filter(payment => {
    // Status filter
    if (filter !== 'all' && payment.status !== filter) return false;

    // People filter
    if (peopleFilter !== 'all' && payment.number_of_people !== parseInt(peopleFilter)) return false;

    return true;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h1>TEDx SNIOE Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Admin Email:</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="Enter admin email"
                required
              />
              <label>Password:</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>TEDx SNIOE Payment Dashboard</h1>
        <div className="admin-info">
          <span>Welcome, {adminEmail}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Payments</h3>
          <div className="stat-number">{stats.total}</div>
        </div>
        <div className="stat-card pending">
          <h3>Pending</h3>
          <div className="stat-number">{stats.pending}</div>
        </div>
        <div className="stat-card approved">
          <h3>Approved</h3>
          <div className="stat-number">{stats.approved}</div>
        </div>
        <div className="stat-card declined">
          <h3>Declined</h3>
          <div className="stat-number">{stats.declined}</div>
        </div>
        <div className="stat-card number">
          <h3>Audience</h3>
          <div className="stat-number">{stats.audience}</div>
        </div>
        <div className="stat-card revenue">
          <h3>Total Revenue</h3>
          <div className="stat-number">₹{stats.totalRevenue.toLocaleString()}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All ({stats.total})
        </button>
        <button
          className={filter === 'pending' ? 'active' : ''}
          onClick={() => setFilter('pending')}
        >
          Pending ({stats.pending})
        </button>
        <button
          className={filter === 'approved' ? 'active' : ''}
          onClick={() => setFilter('approved')}
        >
          Approved ({stats.approved})
        </button>
        <button
          className={filter === 'declined' ? 'active' : ''}
          onClick={() => setFilter('declined')}
        >
          Declined ({stats.declined})
        </button>

        {/* People Filter */}
        <div style={{ display: 'inline-block', marginLeft: '20px', borderLeft: '1px solid #ccc', paddingLeft: '20px' }}>
          <button
            className={peopleFilter === 'all' ? 'active' : ''}
            onClick={() => setPeopleFilter('all')}
          >
            All People
          </button>
          <button
            className={peopleFilter === '1' ? 'active' : ''}
            onClick={() => setPeopleFilter('1')}
          >
            1 Person ({stats.onePerson})
          </button>
          <button
            className={peopleFilter === '2' ? 'active' : ''}
            onClick={() => setPeopleFilter('2')}
          >
            2 People ({stats.twoPerson})
          </button>
        </div>

        <button onClick={fetchPayments} className="refresh-btn">
          Refresh
        </button>
        <button
          className="manual-entry-btn"
          onClick={() => setShowManualEntry(true)}
          style={{ marginLeft: '10px', background: '#28a745', color: 'white' }}
        >
          Add Manual Entry
        </button>
      </div>

      {/* Payments Table */}
      <div className="payments-table">
        {loading ? (
          <div className="loading">Loading payments...</div>
        ) : filteredPayments.length === 0 ? (
          <div className="no-payments">No payments found</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Participants</th>
                <th>Method</th>
                <th>Amount</th>
                <th>People</th>
                <th>Type</th>
                <th>Transaction ID</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className={payment.status}>
                  <td>{formatDate(payment.created_at)}</td>
                  <td>
                    {payment.participants?.map(p => p.name).join(', ') ||
                      `${payment.name_one}${payment.name_two ? `, ${payment.name_two}` : ''}`}
                    <br />
                    <small>
                      {payment.participants?.map(p => p.email).join(', ') ||
                        `${payment.email_one}${payment.email_two ? `, ${payment.email_two}` : ''}`}
                    </small>
                  </td>
                  <td>{payment.payment_method?.toUpperCase() || 'UPI'}</td>
                  <td>₹{payment.total_amount}</td>
                  <td>{payment.number_of_people}</td>
                  <td>{payment.is_snu_student ? 'SNU' : 'Non-SNU'}</td>
                  <td>{payment.transaction_id || 'N/A'}</td>
                  <td>
                    <span className={`status ${payment.status}`}>
                      {payment.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedPayment(payment)}
                      className="view-btn"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Payment Details</h2>
              <button
                onClick={() => setSelectedPayment(null)}
                className="close-btn"
              >
                ×
              </button>
            </div>

            <div className="modal-content">
              <div className="payment-details">
                <div className="detail-row">
                  <strong>Date:</strong> {formatDate(selectedPayment.created_at)}
                </div>
                <div className="detail-row">
                  <strong>Participants:</strong>
                  <div>
                    {selectedPayment.participants?.map((p, i) => (
                      <div key={i} style={{ marginBottom: '5px' }}>
                        <strong>{p.name}</strong> - {p.email} - {p.phone}
                      </div>
                    )) || (
                        <div>
                          <div><strong>{selectedPayment.name_one}</strong> - {selectedPayment.email_one} - {selectedPayment.phone_one}</div>
                          {selectedPayment.name_two && (
                            <div><strong>{selectedPayment.name_two}</strong> - {selectedPayment.email_two} - {selectedPayment.phone_two}</div>
                          )}
                        </div>
                      )}
                  </div>
                </div>
                <div className="detail-row">
                  <strong>Amount:</strong> ₹{selectedPayment.total_amount}
                </div>
                <div className="detail-row">
                  <strong>People:</strong> {selectedPayment.number_of_people}
                </div>
                <div className="detail-row">
                  <strong>Type:</strong> {selectedPayment.is_snu_student ? 'SNU Student' : 'Non-SNU'}
                </div>
                <div className="detail-row">
                  <strong>Payment Method:</strong> {selectedPayment.payment_method?.toUpperCase() || 'UPI'}
                </div>
                <div className="detail-row">
                  <strong>Transaction ID:</strong> {selectedPayment.transaction_id || 'N/A'}
                </div>
                <div className="detail-row">
                  <strong>Current Status:</strong>
                  <span className={`status ${selectedPayment.status}`}>
                    {selectedPayment.status.toUpperCase()}
                  </span>
                </div>

                {/* Debug info to see what screenshot data we have */}
                <div className="detail-row" style={{ fontSize: '0.8rem', color: '#666' }}>
                  <strong>Debug Info:</strong>
                  <div>Screenshot URL: {selectedPayment.transaction_screenshot_url || 'No screenshot URL'}</div>
                  <div>Payment ID: {selectedPayment.id}</div>
                </div>

                {selectedPayment.transaction_screenshot_url ? (
                  <div className="detail-row">
                    <strong>Screenshot:</strong>
                    <div className="screenshot-container">
                      <Image
                        src={selectedPayment.transaction_screenshot_url}
                        alt="Payment Screenshot"
                        className="payment-screenshot"
                        width={600}
                        height={400}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <div style={{ display: 'none', color: '#dc3545', fontSize: '0.9rem' }}>
                        Image failed to load
                      </div>
                      <div className="screenshot-links">
                        <a
                          href={selectedPayment.transaction_screenshot_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="screenshot-link"
                        >
                          🔗 Open Screenshot in New Tab
                        </a>
                        <br />
                        <small style={{ color: '#666', fontSize: '0.8rem' }}>
                          URL: {selectedPayment.transaction_screenshot_url}
                        </small>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="detail-row">
                    <strong>Screenshot:</strong>
                    <div style={{ color: '#999', fontStyle: 'italic' }}>
                      No screenshot available for this payment
                    </div>
                  </div>
                )}

                {selectedPayment.reviewed_by && (
                  <div className="review-info">
                    <div className="detail-row">
                      <strong>Reviewed by:</strong> {selectedPayment.reviewed_by}
                    </div>
                    <div className="detail-row">
                      <strong>Reviewed at:</strong> {formatDate(selectedPayment.reviewed_at)}
                    </div>
                    {selectedPayment.review_notes && (
                      <div className="detail-row">
                        <strong>Review Notes:</strong> {selectedPayment.review_notes}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {selectedPayment.status === 'pending' && (
                <div className="review-section">
                  <h3>Review Payment</h3>
                  <div className="form-group">
                    <label>Review Notes (optional):</label>
                    <textarea
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder="Add any notes about this payment..."
                      rows="3"
                    />
                  </div>

                  <div className="review-actions">
                    <button
                      onClick={() => updatePaymentStatus(selectedPayment.id, 'approved', reviewNotes, selectedPayment)}
                      className="approve-btn"
                    >
                      Approve Payment
                    </button>
                    <button
                      onClick={() => updatePaymentStatus(selectedPayment.id, 'declined', reviewNotes)}
                      className="decline-btn"
                    >
                      Decline Payment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Manual Entry Modal */}
      {showManualEntry && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add Manual Payment Entry</h2>
              <button
                className="close-btn"
                onClick={() => setShowManualEntry(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <form onSubmit={submitManualEntry}>
                <div className="form-group">
                  <label>Payment Method</label>
                  <select
                    value={manualEntry.payment_method}
                    onChange={(e) => setManualEntry(prev => ({
                      ...prev,
                      payment_method: e.target.value
                    }))}
                  >
                    <option value="cash">Cash</option>
                    <option value="upi">UPI</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Student Type</label>
                  <select
                    value={manualEntry.is_snu_student}
                    onChange={(e) => setManualEntry(prev => ({
                      ...prev,
                      is_snu_student: e.target.value === 'true'
                    }))}
                  >
                    <option value={false}>Non-SNU</option>
                    <option value={true}>SNU Student</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Total Amount</label>
                  <input
                    type="number"
                    value={manualEntry.total_amount}
                    onChange={(e) => setManualEntry(prev => ({
                      ...prev,
                      total_amount: e.target.value
                    }))}
                    required
                  />
                </div>

                {(manualEntry.payment_method === 'upi' || manualEntry.payment_method === 'bank_transfer') && (
                  <div className="form-group">
                    <label>Transaction ID</label>
                    <input
                      type="text"
                      value={manualEntry.transaction_id}
                      onChange={(e) => setManualEntry(prev => ({
                        ...prev,
                        transaction_id: e.target.value
                      }))}
                    />
                  </div>
                )}

                <div className="participants-section">
                  <label>Participants</label>
                  {manualEntry.participants.map((participant, index) => (
                    <div key={index} className="participant-row">
                      <input
                        type="text"
                        placeholder="Name"
                        value={participant.name}
                        onChange={(e) => updateParticipant(index, 'name', e.target.value)}
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={participant.email}
                        onChange={(e) => updateParticipant(index, 'email', e.target.value)}
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={participant.phone}
                        onChange={(e) => updateParticipant(index, 'phone', e.target.value)}
                        required
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeParticipant(index)}
                          className="remove-btn"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addParticipant}
                    className="add-participant-btn"
                  >
                    Add Participant
                  </button>
                </div>

                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    value={manualEntry.review_notes}
                    onChange={(e) => setManualEntry(prev => ({
                      ...prev,
                      review_notes: e.target.value
                    }))}
                    placeholder="Any additional notes..."
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    Add Entry
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowManualEntry(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}