import { Link, Navigate } from 'react-router-dom';
import { getAuthSession, roleToLoginPath } from '../lib/auth';

export default function BlogHome() {
    const session = getAuthSession();

    if (session?.token && session?.role) {
        return <Navigate to={roleToLoginPath(session.role)} replace />;
    }

    return (
        <main className="page-shell">
            <section className="hero-wrap">
                <p className="hero-pill">Department of Information Technology</p>
                <h1 className="hero-title">Campus BlogSpot</h1>
                <p className="hero-copy">
                    Students publish daily ideas, projects, and learning notes. Faculty members moderate and support a healthy blogging community.
                </p>
                <div className="hero-actions">
                    <Link to="/portal" className="btn btn-primary">Open Portal</Link>
                    <Link to="/signup/student" className="btn btn-secondary">Register</Link>
                </div>
            </section>
        </main>
    );
}
