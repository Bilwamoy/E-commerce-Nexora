'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import '@/styles/login-signup.css';

const LoginSignup = () => {
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const router = useRouter();
    const { data: session, status } = useSession();

    // Handle session changes
    useEffect(() => {
        if (session?.user) {
            const userSession = { user: session.user };
            localStorage.setItem('userSession', JSON.stringify(userSession));
            window.dispatchEvent(new CustomEvent('sessionChange', { detail: userSession }));
            
            // Send welcome email
            sendWelcomeEmail(session.user);
            
            // Redirect admin to admin dashboard
            if (session.user.email === 'admin@nexora.com') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        }
    }, [session, router]);

    const sendWelcomeEmail = async (user: any) => {
        try {
            await fetch('/api/auth/welcome-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user }),
            });
        } catch (error) {
            console.error('Failed to send welcome email:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignUpClick = () => {
        setIsSignUpActive(true);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    };

    const handleSignInClick = () => {
        setIsSignUpActive(false);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            alert('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                alert('Invalid email or password');
            } else {
                // Get user data from the session
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email, password: formData.password }),
                });
                
                if (response.ok) {
                    const data = await response.json();
                    const userSession = { user: data.user };
                    localStorage.setItem('userSession', JSON.stringify(userSession));
                    window.dispatchEvent(new CustomEvent('sessionChange', { detail: userSession }));
                    
                    // Send welcome email
                    await sendWelcomeEmail(data.user);
                    
                    // Redirect admin to admin dashboard
                    if (data.user.email === 'admin@nexora.com') {
                        router.push('/admin');
                    } else {
                        router.push('/');
                    }
                }
            }
        } catch (error) {
            alert('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (formData.password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert('Account created! Please check your email for verification.');
                setIsSignUpActive(false);
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
            } else {
                alert(data.message || 'Signup failed');
            }
        } catch (error) {
            alert('Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn('google', { 
                callbackUrl: '/',
                redirect: true
            });
        } catch (error) {
            alert('Google sign-in failed');
            setIsLoading(false);
        }
    };

    return (
        <div className="login-signup-body">
            {/* Animated 3D Cube */}
            <div className="cube-wrapper">
                <div className="cube">
                    <div className="face front"></div>
                    <div className="face back"></div>
                    <div className="face right"></div>
                    <div className="face left"></div>
                    <div className="face top"></div>
                    <div className="face bottom"></div>
                </div>
            </div>

            <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
                {/* Sign Up Form */}
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSignUp}>
                        <h1>Create Account</h1>
                        <div className="input-group">
                            <input 
                                type="text" 
                                name="name"
                                placeholder="Full Name" 
                                value={formData.name}
                                onChange={handleInputChange}
                                required 
                            />
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="input-group">
                            <input 
                                type="email" 
                                name="email"
                                placeholder="Email" 
                                value={formData.email}
                                onChange={handleInputChange}
                                required 
                            />
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div className="input-group">
                            <input 
                                type="password" 
                                name="password"
                                placeholder="Password" 
                                value={formData.password}
                                onChange={handleInputChange}
                                required 
                            />
                            <i className="fas fa-lock"></i>
                        </div>
                        <div className="input-group">
                            <input 
                                type="password" 
                                name="confirmPassword"
                                placeholder="Confirm Password" 
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required 
                            />
                            <i className="fas fa-lock"></i>
                        </div>
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                        
                        {/* Google Sign Up Button */}
                        <div className="divider">
                            <span>or</span>
                        </div>
                        <button 
                            type="button" 
                            className="google-btn"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                        >
                            <svg className="google-icon" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Sign up with Google
                        </button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div className="form-container sign-in-container">
                    <form onSubmit={handleSignIn}>
                        <h1>Sign In</h1>
                        <div className="input-group">
                            <input 
                                type="email" 
                                name="email"
                                placeholder="Email" 
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div className="input-group">
                            <input 
                                type="password" 
                                name="password"
                                placeholder="Password" 
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <i className="fas fa-lock"></i>
                        </div>
                        <a href="#">Forgot your password?</a>
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                        
                        {/* Google Sign In Button */}
                        <div className="divider">
                            <span>or</span>
                        </div>
                        <button 
                            type="button" 
                            className="google-btn"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                        >
                            <svg className="google-icon" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Sign in with Google
                        </button>
                    </form>
                </div>

                {/* Overlay Panels */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" onClick={handleSignInClick}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start your journey with us</p>
                            <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup; 