import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, loading } = useAuth();

  // while your AuthProvider is bootstrapping / fetching profile
  if (loading) return <p>Loading…</p>;

  // if there’s no user in context, ask them to log in
  if (!user) return <p>Please login.</p>;

  // otherwise render the dashboard
  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}
