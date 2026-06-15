import { useState } from 'react';
import LoginForm from './components/LoginForm';
import ChuckNorris from './components/ChuckNorris';
import './App.css';

export default function App() {
  const [token, setToken] = useState('');

  const logout = async () => {
    await fetch("http://localhost:3333/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setToken("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* Header (global actions) */}
        {token && (
          <div className="flex justify-between items-center px-5 py-3 border-b bg-gray-50">
            <span className="text-sm font-semibold text-gray-600">
              Chuck Norris App
            </span>

            <button
              onClick={logout}
              className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6">
          {!token ? (
            <>
              <h1 className="text-2xl font-bold text-center mb-6">
                Login
              </h1>
              <LoginForm setToken={setToken} />
            </>
          ) : (
            <ChuckNorris token={token} setToken={setToken} />
          )}
        </div>

      </div>
    </div>
  );
}
