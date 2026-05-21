'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FaLock, FaUser } from 'react-icons/fa';

export default function AdminLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Demo credentials (in production, this would be a real authentication)
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      // Store token in localStorage (in production, use httpOnly cookies)
      localStorage.setItem('adminToken', 'demo-token');
      router.push('/secret-admin-panel-2025/dashboard');
    } else {
      setError('Invalid username or password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/30 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Admin Panel</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your credentials to access the dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                  placeholder="Enter username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-500 rounded-lg text-red-700 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials Note */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300 font-semibold mb-1">
              Demo Credentials:
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Username: <span className="font-mono">admin</span>
              <br />
              Password: <span className="font-mono">admin123</span>
            </p>
          </div>
        </div>

        {/* Back to Site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-primary hover:text-primary-dark transition-colors duration-300 font-semibold"
          >
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
