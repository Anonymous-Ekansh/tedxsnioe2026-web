import crypto from 'crypto';

const ADMIN_TOKEN_SECRET = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fallback-secret-key';

/**
 * Generate a simple admin token after successful login.
 * Uses HMAC-SHA256 with the service role key as the secret.
 */
export function generateAdminToken(email) {
    const payload = `${email}:${Date.now()}`;
    const hmac = crypto.createHmac('sha256', ADMIN_TOKEN_SECRET);
    hmac.update(payload);
    const signature = hmac.digest('hex');
    // Token = base64(payload):signature
    const token = Buffer.from(payload).toString('base64') + '.' + signature;
    return token;
}

/**
 * Verify admin token from request headers.
 * Returns the admin email if valid, null if invalid.
 */
export function verifyAdminToken(token) {
    if (!token) return null;

    try {
        const [payloadB64, signature] = token.split('.');
        if (!payloadB64 || !signature) return null;

        const payload = Buffer.from(payloadB64, 'base64').toString('utf-8');
        const [email, timestamp] = payload.split(':');

        if (!email || !timestamp) return null;

        // Verify the signature
        const hmac = crypto.createHmac('sha256', ADMIN_TOKEN_SECRET);
        hmac.update(payload);
        const expectedSignature = hmac.digest('hex');

        if (signature !== expectedSignature) return null;

        // Check token age (expire after 24 hours)
        const tokenAge = Date.now() - parseInt(timestamp);
        const MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours
        if (tokenAge > MAX_AGE) return null;

        return email;
    } catch {
        return null;
    }
}

/**
 * Middleware helper: Extract and verify admin auth from request.
 * Checks Authorization header for "Bearer <token>".
 * Returns admin email if authenticated, or sends 401 and returns null.
 */
export function authenticateAdmin(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Authentication required' });
        return null;
    }

    const token = authHeader.slice(7); // Remove "Bearer "
    const adminEmail = verifyAdminToken(token);

    if (!adminEmail) {
        res.status(401).json({ error: 'Invalid or expired admin token. Please log in again.' });
        return null;
    }

    return adminEmail;
}
