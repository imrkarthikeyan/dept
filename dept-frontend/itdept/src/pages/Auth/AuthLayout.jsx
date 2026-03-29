import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AuthLayout({ children }) {
    return (
        <div className="auth-layout">
            <Navbar activePage="blogspot" />
            <main className="auth-page-wrap">
                {children}
            </main>
            <Footer />
        </div>
    );
}
