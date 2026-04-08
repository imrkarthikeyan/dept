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
    const [registerAs, setRegisterAs] = useState('student');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const normalizedEmail = email.trim().toLowerCase();
    const emailDomain = normalizedEmail.includes('@') ? normalizedEmail.split('@').pop() : '';
    const isCollegeEmail = emailDomain === 'ksrct.net' || emailDomain.endsWith('.ksrct.net');

    // async function handleSendOtp() {
    //     if (!normalizedEmail) {
    //         setError('Enter your email first to get OTP.');
    //         return;
    //     }

    //     setOtpLoading(true);
    //     setError('');
    //     setMessage('');

    //     try {
    //         const response = await apiRequest('/api/auth/register/request-otp', {
    //             method: 'POST',
    //             body: { email: normalizedEmail },
    //         });

    //         setOtpSentTo(normalizedEmail);
    //         setMessage(response?.message || 'OTP sent to your email.');
    //     } catch (err) {
    //         setError(err.message || 'Failed to send OTP.');
    //     } finally {
    //         setOtpLoading(false);
    //     }
    // }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        if (!isCollegeEmail) {
            setLoading(false);
            setError('Use your college email ID ending with @ksrct.net to sign up.');
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
                    otp: '',
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
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input"
                    required
                />
                <p className="auth-note">Use your college email ID (example: 2303737720521033@ksrct.net).</p>
                {/* <button
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
                /> */}
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
