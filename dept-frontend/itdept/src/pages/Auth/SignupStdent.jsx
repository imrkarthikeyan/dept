import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../lib/api';
import { normalizeRoleForRegistration } from '../../lib/auth';
import './AuthPages.css';

export default function SignupStdent() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [registerAs, setRegisterAs] = useState('student');
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpSentTo, setOtpSentTo] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const normalizedEmail = email.trim().toLowerCase();
    const isOtpVerifiedTarget = otpSentTo && otpSentTo === normalizedEmail;

    async function handleSendOtp() {
        if (!normalizedEmail) {
            setError('Enter your email first to get OTP.');
            return;
        }

        setOtpLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await apiRequest('/api/auth/register/request-otp', {
                method: 'POST',
                body: { email: normalizedEmail },
            });

            setOtpSentTo(normalizedEmail);
            setMessage(response?.message || 'OTP sent to your email.');
        } catch (err) {
            setError(err.message || 'Failed to send OTP.');
        } finally {
            setOtpLoading(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        if (!isOtpVerifiedTarget) {
            setLoading(false);
            setError('Please request OTP for this email before creating account.');
            return;
        }

        try {
            await apiRequest('/api/auth/register', {
                method: 'POST',
                body: {
                    name: name.trim(),
                    email: normalizedEmail,
                    password,
                    role: normalizeRoleForRegistration(registerAs),
                    otp: otp.trim(),
                },
            });

            setMessage('Registration successful. Please log in.');
            setTimeout(() => {
                navigate(registerAs === 'faculty' ? '/login/faculty' : '/login/student');
            }, 700);
        } catch (err) {
            setError(err.message || 'Signup failed.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="auth-shell">
            <form onSubmit={handleSubmit} className="auth-card auth-form auth-fade-up">
                <p className="auth-kicker">Registration</p>
                <h2>Create Account</h2>
                <p>Register as student or faculty to use the blog platform.</p>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="auth-input"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        const nextEmail = e.target.value;
                        setEmail(nextEmail);
                        const nextNormalized = nextEmail.trim().toLowerCase();
                        if (otpSentTo && otpSentTo !== nextNormalized) {
                            setOtp('');
                        }
                    }}
                    className="auth-input"
                    required
                />
                <button
                    type="button"
                    className="auth-primary-btn"
                    onClick={handleSendOtp}
                    disabled={otpLoading || !normalizedEmail}
                >
                    {otpLoading ? 'Sending OTP...' : (isOtpVerifiedTarget ? 'Resend OTP' : 'Send OTP')}
                </button>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="auth-input"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                    required
                />
                <select
                    value={registerAs}
                    onChange={(e) => setRegisterAs(e.target.value)}
                    className="auth-input"
                >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                </select>

                {error ? <p className="auth-error">{error}</p> : null}
                {message ? <p className="auth-success">{message}</p> : null}

                <button type="submit" className="auth-primary-btn" disabled={loading}>
                    {loading ? 'Creating account...' : 'Create Account'}
                </button>

                <button type="button" className="inline-link" onClick={() => navigate('/portal')}>
                    Back to portal
                </button>
            </form>
        </section>
    );
}
