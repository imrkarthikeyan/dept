import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../lib/api';
import { clearAuthSession, saveAuthSession } from '../../lib/auth';
import './AuthPages.css';

export default function LoginStudent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        clearAuthSession();

        try {
            const data = await apiRequest('/api/auth/login', {
                method: 'POST',
                body: { email: email.trim(), password },
            });

            if (data?.role !== 'STUDENT') {
                clearAuthSession();
                setError('This login page is for students only.');
                return;
            }

            saveAuthSession({
                token: data.token,
                role: data.role,
                email: data.email || email.trim(),
                name: data.name || '',
            });

            navigate('/student/blogspot');
        } catch (err) {
            clearAuthSession();
            setError(err.message || 'Login failed.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="auth-shell">
            <form onSubmit={handleLogin} className="auth-card auth-form auth-fade-up">
                <p className="auth-kicker">Student</p>
                <h2>Login to BlogSpot</h2>
                <p>Access your dashboard, post blogs, and maintain your streak.</p>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="auth-input"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="auth-input"
                    required
                />
                {error ? <p className="auth-error">{error}</p> : null}
                <button type="submit" className="auth-primary-btn" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login as Student'}
                </button>
                <button type="button" className="inline-link" onClick={() => navigate('/login/faculty')}>
                    Switch to Faculty Login
                </button>
            </form>
        </section>
    );
}