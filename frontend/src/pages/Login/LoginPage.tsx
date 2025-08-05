import React, { useState } from 'react';

interface LoginForm {
  identifier: string;
  user_pass: string;
  remember_me: boolean;
}

const LoginPage: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({
    identifier: '',
    user_pass: '',
    remember_me: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Login successful!');
        localStorage.setItem('user', JSON.stringify(data.data.user));
        localStorage.setItem('token', data.data.token);
        
        // Redirect based on role
        const role = data.data.user.user_role;
        if (role === 'superadmin' || role === 'admin') {
          window.location.href = '/admin/dashboard';
        } else if (role === 'writer') {
          window.location.href = '/writer/dashboard';
        } else {
          window.location.href = '/user/dashboard';
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1>Login</h1>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '10px', padding: '10px', border: '1px solid red' }}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={{ color: 'green', marginBottom: '10px', padding: '10px', border: '1px solid green' }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Username or Email:</label>
          <input
            type="text"
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="user_pass"
            value={form.user_pass}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            <input
              type="checkbox"
              name="remember_me"
              checked={form.remember_me}
              onChange={handleChange}
            />
            Remember me
          </label>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <a href="/register">Don't have an account? Register here</a>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f5f5f5' }}>
        <h3>Test Accounts:</h3>
        <p><strong>Superadmin:</strong> superadmin / password123</p>
        <p><strong>Admin:</strong> admin1 / password123</p>
        <p><strong>Writer:</strong> testwriter / password123</p>
      </div>
    </div>
  );
};

export default LoginPage;