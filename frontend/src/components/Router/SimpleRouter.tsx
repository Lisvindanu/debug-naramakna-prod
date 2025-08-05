import React from 'react';
import LoginPage from '../../pages/Login/LoginPage';
import RegisterPage from '../../pages/Register/RegisterPage';
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
    case '/admin/dashboard':
      return <AdminDashboard />;
    case '/writer/dashboard':
      return <WriterDashboard />;
    case '/user/dashboard':
      return <UserDashboard />;
    case '/':
    default:
      // Check if user is logged in and redirect accordingly
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        const role = userData.user_role;
        
        if (role === 'superadmin' || role === 'admin') {
          window.location.href = '/admin/dashboard';
        } else if (role === 'writer') {
          window.location.href = '/writer/dashboard';
        } else {
          window.location.href = '/user/dashboard';
        }
        return <div>Redirecting...</div>;
      } else {
        window.location.href = '/login';
        return <div>Redirecting to login...</div>;
      }
  }
};

export default SimpleRouter;