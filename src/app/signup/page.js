"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    program: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setError('');
    setSuccess('');
    
    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long!');
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          program: formData.program
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Account created successfully! Your Student ID is: ${data.studentId}`);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-red-900">Student Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold" htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-900" 
              required 
              placeholder="Enter your full name"
            />
          </div>
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
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold" htmlFor="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-900" 
              required 
              placeholder="03xx-xxxxxxx"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold" htmlFor="program">Interested Program</label>
            <select 
              id="program"
              name="program"
              value={formData.program}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-900" 
              required
            >
              <option value="">Select a program</option>
              <option value="pre-medical">Pre-Medical</option>
              <option value="pre-engineering">Pre-Engineering</option>
              <option value="computer-science">Computer Science</option>
              <option value="commerce">Commerce</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-900" 
              required 
              placeholder="Enter password (min 6 characters)"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-sm font-semibold" htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-900" 
              required 
              placeholder="Confirm your password"
            />
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-red-900 text-white py-2 rounded font-semibold hover:bg-red-800 transition disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account? <Link href="/login" className="text-red-900 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;