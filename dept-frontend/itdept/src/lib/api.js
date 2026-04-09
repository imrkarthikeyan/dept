import { getAuthSession } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dept-jwt6.onrender.com';

export async function apiRequest(path, options = {}) {
    const { token, method = 'GET', body } = options;
    const sessionToken = getAuthSession()?.token;
    const authToken = token || sessionToken;

    const headers = {
        'Content-Type': 'application/json',
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        ...(options.headers || {}),
    };

    let response;
    try {
        response = await fetch(`${API_BASE_URL}${path}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });
    } catch {
        const error = new Error('Cannot reach backend API at https://dept-jwt6.onrender.com.');
        error.status = 502;
        throw error;
    }

    const raw = await response.text();
    let data = null;

    if (raw) {
        try {
            data = JSON.parse(raw);
        } catch {
            data = raw;
        }
    }

    if (!response.ok) {
        if (response.status === 502) {
            const error = new Error('Backend gateway error. Ensure https://dept-jwt6.onrender.com is reachable.');
            error.status = 502;
            throw error;
        }

        const message =
            (data && typeof data === 'object' && (data.message || data.error)) ||
            (typeof data === 'string' ? data : '') ||
            `Request failed with status ${response.status}`;
        const error = new Error(message);
        error.status = response.status;
        throw error;
    }

    return data;
}
