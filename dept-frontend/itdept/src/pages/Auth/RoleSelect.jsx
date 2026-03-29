import { useNavigate } from 'react-router-dom';
import './AuthPages.css';

export default function RoleSelect() {
    const navigate = useNavigate();

    return (
        <section className="auth-shell">
            <div className="auth-grid auth-fade-up">
                <article className="auth-card auth-option-card">
                    <p className="auth-kicker">Student</p>
                    <h1>Student Login</h1>
                    <p>Write daily blogs, track posting streak, and engage with peers.</p>
                    <button type="button" className="auth-primary-btn" onClick={() => navigate('/login/student')}>
                        Continue as Student
                    </button>
                </article>

                <article className="auth-card auth-option-card">
                    <p className="auth-kicker">Faculty</p>
                    <h1>Faculty Login</h1>
                    <p>Review all student blogs, approve quality posts, and moderate content.</p>
                    <button type="button" className="auth-primary-btn" onClick={() => navigate('/login/faculty')}>
                        Continue as Faculty
                    </button>
                </article>
            </div>
            <p className="auth-footer-note">
                New user? <button type="button" className="inline-link" onClick={() => navigate('/signup/student')}>Create account</button>
            </p>
        </section>
    );
}