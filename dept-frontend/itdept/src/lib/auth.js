const AUTH_STORAGE_KEY = 'itblog_auth';

export function saveAuthSession(session) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function getAuthSession() {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        return null;
    }
}

export function clearAuthSession() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function roleToLoginPath(role) {
    if (role === 'STUDENT') {
        return '/student/blogspot';
    }

    if (role === 'STAFF' || role === 'ADMIN') {
        return '/faculty/dashboard';
    }

    return '/portal';
}

export function normalizeRoleForRegistration(role) {
    if (role === 'faculty') {
        return 'STAFF';
    }
    return 'STUDENT';
}
