import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../lib/api';
import { saveAuthSession } from '../../lib/auth';
import './AuthPages.css';

export default function LoginFaculty() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await apiRequest('/api/auth/login', {
                method: 'POST',
                body: { email: email.trim(), password },
            });

            if (data?.role !== 'STAFF' && data?.role !== 'ADMIN') {
                setError('This login page is for faculty users only.');
                return;
            }

            saveAuthSession({
                token: data.token,
                role: data.role,
                email: data.email || email.trim(),
                name: data.name || '',
            });

            navigate('/faculty/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="auth-shell">
            <form onSubmit={handleLogin} className="auth-card auth-form auth-fade-up">
                <p className="auth-kicker">Faculty</p>
                <h2>Faculty Portal Login</h2>
                <p>Moderate blogs and manage publication quality.</p>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="auth-input"
                    required
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="auth-input"
                    required
                />
                {error ? <p className="auth-error">{error}</p> : null}
                <button type="submit" className="auth-primary-btn" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login as Faculty'}
                </button>
                <button type="button" className="inline-link" onClick={() => navigate('/login/student')}>
                    Switch to Student Login
                </button>
            </form>
        </section>
    );
}