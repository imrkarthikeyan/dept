import { getAuthSession } from './auth';

const DEFAULT_LOCAL_API = 'http://localhost:8080';
const DEFAULT_REMOTE_API = 'https://dept-jwt6.onrender.com';

const isLocalHost =
    typeof window !== 'undefined'
    && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (isLocalHost ? DEFAULT_LOCAL_API : DEFAULT_REMOTE_API);

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
        const error = new Error(`Cannot reach backend API at ${API_BASE_URL}.`);
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
            const error = new Error(`Backend gateway error. Ensure ${API_BASE_URL} is reachable.`);
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
