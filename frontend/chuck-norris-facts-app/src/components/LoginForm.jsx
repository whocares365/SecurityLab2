import { useState } from "react";

export default function LoginForm({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) return setError('Username is required');
    if (!password.trim()) return setError('Password is required');

    setError('');

    const response = await fetch('http://localhost:3333/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok && data.uuid) {
      setToken(data.uuid);
    } else {
      setError(data.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {error && (
        <p className="bg-red-100 text-red-600 text-sm p-2 rounded">
          {error}
        </p>
      )}

      <div>
        <label className="text-sm font-medium text-gray-700">Username</label>
        <input
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Password</label>
        <input
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
      >
        Login
      </button>
    </form>
  );
}