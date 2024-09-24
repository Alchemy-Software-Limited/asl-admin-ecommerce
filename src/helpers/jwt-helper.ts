import * as jose from 'jose';

/**
 * Validates a JWT token and returns the payload if valid, otherwise returns null.
 *
 * @param {string} token - The JWT token to validate
 * @returns {{ email: string, id: string, roles: string[], status: string } | null} The decoded JWT payload or null if invalid.
 */
const validateJwt = (token: string): { email: string; id: string; roles: string[]; status: string } | null => {
    const data = jose.decodeJwt(token);

    const isValid = Date.now() < (data.exp as number) * 1000;

    if (!isValid) return null;

    const { email, id, roles, status } = data as { email: string; id: string; roles: string[]; status: string };

    return {
        email,
        id,
        roles,
        status
    };
};

export { validateJwt };
