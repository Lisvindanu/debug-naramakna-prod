import React from 'react';
import { Home } from '../pages/Home/Home';
import LoginPage from '../../pages/Login/LoginPage';
import RegisterPage from '../../pages/Register/RegisterPage';
import ForgotPasswordPage from '../../pages/ForgotPassword/ForgotPasswordPage';
import AdminDashboard from '../../pages/Admin/AdminDashboard';
import WriterDashboard from '../../pages/Writer/WriterDashboard';
import UserDashboard from '../../pages/User/UserDashboard';

const SimpleRouter: React.FC = () => {
  const path = window.location.pathname;

  // Simple route matching
  switch (path) {
    case '/login':
      return <LoginPage />;
    case '/register':
      return <RegisterPage />;
    case '/forgot-password':
      return <ForgotPasswordPage />;
    case '/admin/dashboard':
      return <AdminDashboard />;
    case '/writer/dashboard':
      return <WriterDashboard />;
    case '/user/dashboard':
      return <UserDashboard />;
    case '/':
    default:
      // For now, just render Home component without authentication check
      return <Home />;
  }
};

export default SimpleRouter;