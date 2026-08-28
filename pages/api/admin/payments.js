import { supabaseAdmin } from '../../../lib/supabase';
import { authenticateAdmin } from '../../../lib/adminAuth';

export default async function handler(req, res) {
  // Authenticate admin on every request
  const adminEmail = authenticateAdmin(req, res);
  if (!adminEmail) return; // 401 already sent

  if (!supabaseAdmin) {
    return res.status(500).json({ error: 'Admin client not configured - missing SUPABASE_SERVICE_ROLE_KEY' });
  }

  if (req.method === 'GET') {
    return getPayments(req, res);
  } else if (req.method === 'PUT') {
    return updatePaymentStatus(req, res, adminEmail);
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Get all payments (admin only)
async function getPayments(req, res) {
  try {
    const { filter } = req.query;

    let query = supabaseAdmin
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter && filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching payments:', error);
      return res.status(500).json({ error: 'Failed to fetch payments' });
    }

    res.status(200).json({ payments: data || [] });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Update payment status (admin only)
async function updatePaymentStatus(req, res, adminEmail) {
  try {
    const { paymentId, status, reviewNotes } = req.body;

    if (!paymentId || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!['approved', 'declined', 'pending'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const { data, error } = await supabaseAdmin
      .from('payments')
      .update({
        status: status,
        reviewed_by: adminEmail,
        reviewed_at: new Date().toISOString(),
        review_notes: reviewNotes || null
      })
      .eq('id', paymentId)
      .select()
      .single();

    if (error) {
      console.error('Error updating payment:', error);
      return res.status(500).json({ error: 'Failed to update payment status' });
    }

    res.status(200).json({ 
      message: `Payment ${status} successfully`,
      payment: data 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}