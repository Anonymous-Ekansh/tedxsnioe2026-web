import { generateAdminToken } from '../../../lib/adminAuth';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, password } = req.body || {};

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
        console.error('Admin credentials not configured in environment variables');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    if (!email || !password) {
        return res.status(400).json({ error: 'Missing credentials' });
    }

    // Check credentials on the server
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = generateAdminToken(email);
        return res.status(200).json({
            success: true,
            email: email,
            token: token
        });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
}