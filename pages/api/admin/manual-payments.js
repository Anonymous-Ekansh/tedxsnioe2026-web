import { supabaseAdmin } from '../../../lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return createManualPayment(req, res);
  } else if (req.method === 'PUT') {
    return updatePayment(req, res);
  } else if (req.method === 'DELETE') {
    return deletePayment(req, res);
  } else {
    res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Create manual payment entry
async function createManualPayment(req, res) {
  try {
    const {
      participants, // Array of {name, email, phone}
      number_of_people,
      is_snu_student,
      total_amount,
      payment_method,
      transaction_id,
      status,
      review_notes,
      added_by
    } = req.body;

    // Validate required fields
    if (!participants || !number_of_people || !total_amount || !payment_method || !added_by) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['participants', 'number_of_people', 'total_amount', 'payment_method', 'added_by']
      });
    }

    // Validate participants array
    if (!Array.isArray(participants) || participants.length !== number_of_people) {
      return res.status(400).json({ 
        error: 'Participants array must match number_of_people'
      });
    }

    // For cash payments, transaction_id is optional
    if (payment_method === 'upi' && !transaction_id) {
      return res.status(400).json({ 
        error: 'Transaction ID is required for UPI payments'
      });
    }

    try {
      const { data, error } = await supabaseAdmin
        .from('payments')
        .insert({
          // New flexible structure
          participants,
          number_of_people,
          is_snu_student,
          total_amount,
          payment_method,
          transaction_id: transaction_id || null,
          status: status || 'pending', // Manual entries are usually pending
          reviewed_by: added_by,
          reviewed_at: new Date().toISOString(),
          review_notes: review_notes || 'Manually added entry',
          manually_added: true,
          added_by,
          
          // Legacy fields for backward compatibility
          name_one: participants[0]?.name || '',
          email_one: participants[0]?.email || '',
          phone_one: participants[0]?.phone || '',
          name_two: participants[1]?.name || null,
          email_two: participants[1]?.email || null,
          phone_two: participants[1]?.phone || null
        })
        .select();

      if (error) {
        console.error('Error creating manual payment:', error);
        return res.status(400).json({ error: error.message });
      }

      res.status(201).json({ 
        message: 'Manual payment entry created successfully', 
        data: data[0] 
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      res.status(500).json({ error: 'Failed to create payment entry' });
    }
  } catch (error) {
    console.error('Error in createManualPayment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Update payment entry
async function updatePayment(req, res) {
  try {
    const { paymentId, updateData } = req.body;

    if (!paymentId || !updateData) {
      return res.status(400).json({ error: 'Payment ID and update data are required' });
    }

    const { data, error } = await supabaseAdmin
      .from('payments')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', paymentId)
      .select();

    if (error) {
      console.error('Error updating payment:', error);
      return res.status(400).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.status(200).json({ 
      message: 'Payment updated successfully', 
      data: data[0] 
    });
  } catch (error) {
    console.error('Error in updatePayment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Delete payment entry
async function deletePayment(req, res) {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ error: 'Payment ID is required' });
    }

    const { data, error } = await supabaseAdmin
      .from('payments')
      .delete()
      .eq('id', paymentId)
      .select();

    if (error) {
      console.error('Error deleting payment:', error);
      return res.status(400).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.status(200).json({ 
      message: 'Payment deleted successfully', 
      data: data[0] 
    });
  } catch (error) {
    console.error('Error in deletePayment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}