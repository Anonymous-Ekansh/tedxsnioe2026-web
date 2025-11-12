export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, password } = req.body || {};

    // These env vars are now safely checked on the server
    const ADMIN_EMAIL = process.env.ADMIN_MAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASS;

    if (!email || !password) {
        return res.status(400).json({ error: 'Missing credentials' });
    }

    // Check credentials on the server
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return res.status(200).json({
            success: true,
            email: email
        });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
}