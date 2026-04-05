import './App.css';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LoginStudent from './pages/Auth/LoginStudent';
import LoginFaculty from './pages/Auth/LoginFaculty';
import SignupStdent from './pages/Auth/SignupStdent';
import AuthLayout from './pages/Auth/AuthLayout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import OurTutors from './pages/OurTutors';
import About from './pages/About';
import Infrastructure from './pages/Infrastructure';
import Achievements from './pages/Achievements';
import Contact from './pages/Contact';
import WhyIT from './pages/WhyIT';
import ApplyAdmission from './pages/ApplyAdmission';
import DepartmentAtGlance from './pages/DepartmentAtGlance';
import WhatOurAlumniesSays from './pages/WhatOurAlumniesSays';
import StudentBlogspot from './pages/StudentBlogspot';
import FacultyDashboard from './pages/FacultyDashboard';
import BlogspotLoginPortal from './pages/blogspot/BlogspotLoginPortal';
import { getAuthSession } from './lib/auth';

function ProtectedRoute({ allowedRoles, children }) {
  const location = useLocation();
  const session = getAuthSession();
  const redirect = encodeURIComponent(`${location.pathname}${location.search}`);

  if (!session?.token || !session?.role) {
    return <Navigate to={`/portal?redirect=${redirect}`} replace />;
  }

  if (!allowedRoles.includes(session.role)) {
    return <Navigate to={`/portal?redirect=${redirect}`} replace />;
  }

  return children;
}

function HomePage() {
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.state?.activePage || 'home');

  useEffect(() => {
    if (location.state?.activePage) {
      setActivePage(location.state.activePage);
    }
  }, [location.state]);

  return (
    <>
      <Navbar activePage={activePage} onPageChange={setActivePage} />
      {activePage === 'home' ? (
        <>
          <Dashboard />
          <WhyIT />
          <ApplyAdmission />
          <DepartmentAtGlance />
          <WhatOurAlumniesSays />
        </>
      ) : activePage === 'infrastructure' ? (
        <Infrastructure />
      ) : activePage === 'achievements' ? (
        <Achievements />
      ) : activePage === 'about' ? (
        <About />
      ) : activePage === 'contact' ? (
        <Contact />
      ) : (
        <OurTutors />
      )}
      <Footer />
    </>
  );
}

function StudentBlogspotPage() {
  return (
    <>
      <Navbar activePage="blogspot" />
      <div className="blogspot-page-wrap">
        <StudentBlogspot />
      </div>
      <Footer />
    </>
  );
}

function FacultyBlogspotPage() {
  return (
    <>
      <Navbar activePage="blogspot" />
      <div className="blogspot-page-wrap">
        <FacultyDashboard />
      </div>
      <Footer />
    </>
  );
}

function BlogspotLoginPortalPage() {
  return (
    <>
      <Navbar activePage="blogspot" />
      <div className="blogspot-page-wrap blogspot-portal-wrap">
        <BlogspotLoginPortal />
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/portal" element={<BlogspotLoginPortalPage />} />
      <Route path="/blogspot/portal" element={<BlogspotLoginPortalPage />} />
      <Route path="/login/student" element={<AuthLayout><LoginStudent /></AuthLayout>} />
      <Route path="/login/faculty" element={<AuthLayout><LoginFaculty /></AuthLayout>} />
      <Route path="/signup/student" element={<AuthLayout><SignupStdent /></AuthLayout>} />
      <Route
        path="/student/blogspot"
        element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentBlogspotPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/faculty/dashboard"
        element={
          <ProtectedRoute allowedRoles={['STAFF', 'ADMIN']}>
            <FacultyBlogspotPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
