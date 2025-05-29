import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login }        = useAuth();
  const [form, setForm]  = useState({ email: '', password: '' });
  const [error, setError]= useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(form.email, form.password);
      // login() will store token, fetch profile, and navigate for you
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <label>
        Email
        <input
          type="email"
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={form.password}
          onChange={e => setForm({...form, password: e.target.value})}
          required
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in…' : 'Login'}
      </button>
    </form>
  );
}
