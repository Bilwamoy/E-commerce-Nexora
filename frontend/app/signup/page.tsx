'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Account created successfully! Please check your email for verification.');
        router.push('/login');
      } else {
        toast.error(data.message || 'Signup failed!');
      }
    } catch (error) {
      toast.error('An error occurred during signup!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    
    // Simulate Google signup
    setTimeout(() => {
      const userSession = {
        user: {
          name: 'Google User',
          email: 'googleuser@gmail.com',
          image: 'https://via.placeholder.com/150'
        }
      };
      localStorage.setItem('userSession', JSON.stringify(userSession));
      
      toast.success('Google signup successful!');
      setIsLoading(false);
      
      router.push('/');
    }, 1500);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            
            {/* Left Side - Sign Up Form */}
            <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-12 flex flex-col justify-center relative overflow-hidden">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 blur-3xl"></div>
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-500/20 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <h1 className="text-5xl font-bold text-white text-center mb-12 drop-shadow-lg">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
                    signUp
                  </span>
                </h1>
                
                <form onSubmit={handleSignup} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="namePlaceholder"
                      className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="emailPlaceholder"
                      className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="passwordPlaceholder"
                      className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="confirmPasswordPlaceholder"
                      className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating account...
                      </div>
                    ) : (
                      'SIGNUP'
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleGoogleSignup}
                    disabled={isLoading}
                    className="w-full bg-white text-gray-900 font-bold py-4 px-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    SIGNUPWITHGOOGLE
                  </button>
                </form>
              </div>
            </div>
            
            {/* Right Side - Welcome */}
            <div className="bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-3xl"></div>
              <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  welcomeBack
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  join.Community
                </p>
                <button
                  onClick={() => router.push('/login')}
                  className="bg-transparent border-2 border-white text-cyan-300 font-bold py-4 px-12 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm"
                >
                  SIGNIN
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      <Footer />
      <ChatWidget />
    </>
  );
} 