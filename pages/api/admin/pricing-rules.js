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
    return getPricingRules(req, res);
  } else if (req.method === 'POST') {
    return createPricingRule(req, res, adminEmail);
  } else if (req.method === 'PUT') {
    return updatePricingRule(req, res);
  } else if (req.method === 'DELETE') {
    return deletePricingRule(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Get all pricing rules
async function getPricingRules(req, res) {
  try {
    const { active_only } = req.query;

    let query = supabaseAdmin
      .from('pricing_rules')
      .select('*')
      .order('created_at', { ascending: false });

    if (active_only === 'true') {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching pricing rules:', error);
      return res.status(500).json({ error: 'Failed to fetch pricing rules' });
    }

    res.status(200).json({ pricing_rules: data || [] });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Create new pricing rule
async function createPricingRule(req, res, adminEmail) {
  try {
    const {
      rule_name,
      description,
      min_people,
      max_people,
      is_snu_student,
      price_per_person,
      total_price,
      valid_from,
      valid_until
    } = req.body;

    if (!rule_name || !price_per_person) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['rule_name', 'price_per_person']
      });
    }

    const { data, error } = await supabaseAdmin
      .from('pricing_rules')
      .insert({
        rule_name,
        description,
        min_people: min_people || 1,
        max_people: max_people || 10,
        is_snu_student,
        price_per_person,
        total_price,
        valid_from: valid_from || new Date().toISOString(),
        valid_until,
        created_by: adminEmail
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating pricing rule:', error);
      return res.status(500).json({ error: 'Failed to create pricing rule' });
    }

    res.status(201).json({ 
      message: 'Pricing rule created successfully',
      pricing_rule: data 
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Update pricing rule
async function updatePricingRule(req, res) {
  try {
    const { ruleId, updates } = req.body;

    if (!ruleId || !updates) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabaseAdmin
      .from('pricing_rules')
      .update(updates)
      .eq('id', ruleId)
      .select()
      .single();

    if (error) {
      console.error('Error updating pricing rule:', error);
      return res.status(500).json({ error: 'Failed to update pricing rule' });
    }

    res.status(200).json({ 
      message: 'Pricing rule updated successfully',
      pricing_rule: data 
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Delete pricing rule
async function deletePricingRule(req, res) {
  try {
    const { ruleId } = req.body;

    if (!ruleId) {
      return res.status(400).json({ error: 'Missing rule ID' });
    }

    const { error } = await supabaseAdmin
      .from('pricing_rules')
      .delete()
      .eq('id', ruleId);

    if (error) {
      console.error('Error deleting pricing rule:', error);
      return res.status(500).json({ error: 'Failed to delete pricing rule' });
    }

    res.status(200).json({ 
      message: 'Pricing rule deleted successfully'
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}