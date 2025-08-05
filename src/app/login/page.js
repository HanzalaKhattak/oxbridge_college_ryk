"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, any email/password combination will work
      if (formData.email && formData.password) {
        alert('Login successful! Redirecting to dashboard...');
        router.push('/dashboard');
      } else {
        alert('Please fill in all fields');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-red-900">Student Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-900" 
              required 
              placeholder="student@oxbridge.edu.pk"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-sm font-semibold" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-900" 
              required 
              placeholder="Enter your password"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-red-900 text-white py-2 rounded font-semibold hover:bg-red-800 transition disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don't have an account? <Link href="/signup" className="text-red-900 font-semibold hover:underline">Sign up</Link>
        </p>
        <div className="mt-6 p-3 bg-orange-50 rounded text-sm">
          <p className="font-semibold text-orange-800">Demo Login:</p>
          <p className="text-orange-700">Use any email and password to login</p>
        </div>
      </div>
    </div>
  );
};

export default Login;