import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthSession } from '../../lib/auth';
import './BlogspotLoginPortal.css';

function BlogspotLoginPortal() {
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTarget = new URLSearchParams(location.search).get('redirect');
    const redirectQuery = redirectTarget ? `?redirect=${encodeURIComponent(redirectTarget)}` : '';

    const handleStudentContinue = () => {
        const session = getAuthSession();

        if (session?.token && session?.role === 'STUDENT') {
            if (redirectTarget && redirectTarget.startsWith('/student/blogspot')) {
                navigate(redirectTarget);
                return;
            }

            navigate('/student/blogspot');
            return;
        }

        navigate(`/login/student${redirectQuery}`);
    };

    const handleFacultyContinue = () => {
        const session = getAuthSession();

        if (session?.token && (session?.role === 'STAFF' || session?.role === 'ADMIN')) {
            if (redirectTarget && redirectTarget.startsWith('/faculty/dashboard')) {
                navigate(redirectTarget);
                return;
            }

            navigate('/faculty/dashboard');
            return;
        }

        navigate(`/login/faculty${redirectQuery}`);
    };

    return (
        <section className="blogspot-portal-shell">
            <div className="rounded-3xl bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-10 text-white shadow-xl sm:px-10">
                <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Blogspot</p>
                <h1 className="mt-3 text-center text-3xl font-black sm:text-5xl">Login Portal</h1>
                <p className="mt-4 text-center text-sm leading-7 text-slate-100 sm:text-base">
                    Sign in to write student blogs, review posts, and follow your department community updates.
                </p>
            </div>

            <div className="blogspot-portal-grid">
                <article className="blogspot-portal-card">
                    <p className="portal-card-label">Student Access</p>
                    <h2>Continue as Student</h2>
                    <p>Create and manage your blog posts from a student dashboard.</p>
                    <button type="button" className="portal-primary-btn" onClick={handleStudentContinue}>
                        Student Login
                    </button>
                </article>

                <article className="blogspot-portal-card">
                    <p className="portal-card-label">Faculty Access</p>
                    <h2>Continue as Faculty</h2>
                    <p>Review student posts and moderate content through faculty tools.</p>
                    <button type="button" className="portal-primary-btn" onClick={handleFacultyContinue}>
                        Faculty Login
                    </button>
                </article>
            </div>

            <div className="blogspot-portal-actions">
                <button type="button" className="portal-outline-btn" onClick={() => navigate('/signup/student')}>
                    New Student? Create Account
                </button>
            </div>
        </section>
    );
}

export default BlogspotLoginPortal;
