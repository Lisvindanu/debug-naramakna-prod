import React, { useState } from 'react';

interface RegisterForm {
  user_login: string;
  user_email: string;
  user_pass: string;
  display_name: string;
  role_request: 'user' | 'writer';
}

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    user_login: '',
    user_email: '',
    user_pass: '',
    display_name: '',
    role_request: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (data.success) {
        if (data.data.requires_approval) {
          setSuccess('Writer account created! Awaiting admin approval.');
        } else {
          setSuccess('Account created successfully! You can now login.');
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1>Register</h1>
      
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
          <label>Username:</label>
          <input
            type="text"
            name="user_login"
            value={form.user_login}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="user_email"
            value={form.user_email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Display Name:</label>
          <input
            type="text"
            name="display_name"
            value={form.display_name}
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
            minLength={6}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Role Request:</label>
          <select
            name="role_request"
            value={form.role_request}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="user">User (Can comment)</option>
            <option value="writer">Writer (Can create content - needs approval)</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <a href="/login">Already have an account? Login here</a>
      </div>
    </div>
  );
};

export default RegisterPage;