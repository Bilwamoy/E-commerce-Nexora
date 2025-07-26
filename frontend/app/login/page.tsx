"use client";
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import '../../styles/login-signup.css';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useLanguage } from "@/components/LanguageContext";

const LoginSignup = () => {
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const [email, setEmail] = useState("");
    const [forgotSent, setForgotSent] = useState(false);
    const [resetCode, setResetCode] = useState("");
    const [resetPassword, setResetPassword] = useState("");
    const [resetMessage, setResetMessage] = useState("");
    const [resetError, setResetError] = useState("");
    const [signupName, setSignupName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const router = useRouter();

    const { data: session, status } = useSession();
    const { t } = useLanguage();

    const handleSignUpClick = () => {
        setIsSignUpActive(true);
    };

    const handleSignInClick = () => {
        setIsSignUpActive(false);
    };

    const handleForgot = async (e: React.FormEvent) => {
        e.preventDefault();
        setResetMessage("");
        setResetError("");
        setForgotSent(false);
        const res = await fetch("/api/auth/forgot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (!data.success) setResetError(data.message || "Failed to send reset email");
        else {
            setForgotSent(true);
            setResetMessage("Password reset code sent. Please check your inbox.");
        }
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setResetMessage("");
        setResetError("");
        const res = await fetch("/api/auth/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, code: resetCode, password: resetPassword }),
        });
        const data = await res.json();
        if (!data.success) setResetError(data.message || "Failed to reset password");
        else {
            setResetMessage("Password reset successful! You can now sign in.");
            setShowForgot(false);
            setForgotSent(false);
            setResetCode("");
            setResetPassword("");
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        toast.dismiss();
        if (!loginEmail || !loginPassword) {
            toast.error(t('allFieldsRequired'));
            return;
        }
        const signInRes = await signIn("credentials", {
            email: loginEmail,
            password: loginPassword,
            redirect: false,
        });
        if (signInRes && !signInRes.error) {
            toast.success("You have successfully logged in!");
            setLoginEmail("");
            setLoginPassword("");
            
            // Check if user is admin and redirect accordingly
            if (loginEmail === 'admin@nexora.com') {
                router.push("/admin");
            } else {
                router.push("/");
            }
        } else {
            toast.error("Invalid email or password.");
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        toast.dismiss();
        if (!signupName || !signupEmail || !signupPassword) {
            toast.error(t('allFieldsRequired'));
            return;
        }
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: signupName, email: signupEmail, password: signupPassword }),
        });
        const data = await res.json();
        if (!data.success) {
            toast.error(data.message || "Signup failed");
            return;
        }
        // Automatically log the user in
        const signInRes = await signIn("credentials", {
            email: signupEmail,
            password: signupPassword,
            redirect: false,
        });
        if (signInRes && !signInRes.error) {
            toast.success("You have successfully signed up and are now logged in!");
            setSignupName("");
            setSignupEmail("");
            setSignupPassword("");
            setLoginEmail("");
            setLoginPassword("");
            
            // Check if user is admin and redirect accordingly
            if (signupEmail === 'admin@nexora.com') {
                router.push("/admin");
            } else {
                router.push("/");
            }
        } else {
            toast.error("Signup succeeded but login failed. Please try logging in.");
        }
    };

    if (status === 'loading') {
        return <div className="login-signup-body flex items-center justify-center min-h-screen"><span>Loading...</span></div>;
    }
    if (session && session.user) {
        // Optionally redirect to home, or just vanish the form
        return null;
    }

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
                    <form onSubmit={handleSignup}>
                        <h1>{t('createAccount')}</h1>
                        <div className="input-group">
                            <input type="text" placeholder={t('fullNamePlaceholder')} required value={signupName} onChange={e => setSignupName(e.target.value)} />
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="input-group">
                            <input type="email" placeholder={t('emailPlaceholder')} required value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div className="input-group">
                            <input type="password" placeholder={t('passwordPlaceholder')} required value={signupPassword} onChange={e => setSignupPassword(e.target.value)} />
                            <i className="fas fa-lock"></i>
                        </div>
                        <button type="submit">{t('signUp')}</button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div className="form-container sign-in-container">
                    <form onSubmit={handleLogin}>
                        <h1>{t('signIn')}</h1>
                        <div className="input-group">
                            <input type="email" placeholder={t('emailPlaceholder')} required value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div className="input-group">
                            <input type="password" placeholder={t('passwordPlaceholder')} required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                            <i className="fas fa-lock"></i>
                        </div>
                        <a href="#" onClick={e => { e.preventDefault(); setShowForgot(true); }}>{t('forgotPassword')}</a>
                        <button type="submit">{t('signIn')}</button>
                        <button type="button" style={{marginTop: 10, background: '#fff', color: '#333', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8}} onClick={() => signIn('google', { callbackUrl: '/' })}>
                          <span style={{display: 'flex', alignItems: 'center'}}>
                            <svg width="20" height="20" viewBox="0 0 48 48" style={{marginRight: 8}}><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C35.64 2.09 30.13 0 24 0 14.82 0 6.73 5.8 2.69 14.09l7.98 6.19C12.13 13.09 17.56 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.43-4.74H24v9.01h12.44c-.54 2.9-2.18 5.36-4.64 7.01l7.19 5.6C43.98 37.09 46.1 31.36 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.28c-1.09-3.25-1.09-6.77 0-10.02l-7.98-6.19C.64 16.36 0 20.09 0 24c0 3.91.64 7.64 2.69 11.09l7.98-6.19z"/><path fill="#EA4335" d="M24 48c6.13 0 11.64-2.09 15.85-5.7l-7.19-5.6c-2.01 1.35-4.58 2.15-8.66 2.15-6.44 0-11.87-3.59-14.33-8.79l-7.98 6.19C6.73 42.2 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
                            {t('signInWithGoogle')}
                          </span>
                        </button>
                    </form>
                    {showForgot && (
                        <div style={{marginTop: 20}}>
                            {!forgotSent ? (
                                <form onSubmit={handleForgot}>
                                    <h2>{t('forgotPassword')}</h2>
                                    {resetError && <div style={{ color: '#ff4d4f', marginBottom: 10 }}>{resetError}</div>}
                                    {resetMessage && <div style={{ color: '#00f7a5', marginBottom: 10 }}>{resetMessage}</div>}
                                    <div className="input-group">
                                        <input type="email" placeholder={t('enterEmailPlaceholder')} required value={email} onChange={e => setEmail(e.target.value)} />
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <button type="submit">{t('sendResetEmail')}</button>
                                    <button type="button" className="ghost" onClick={() => setShowForgot(false)}>{t('backToSignIn')}</button>
                                </form>
                            ) : (
                                <form onSubmit={handleReset}>
                                    <h2>{t('resetPassword')}</h2>
                                    {resetError && <div style={{ color: '#ff4d4f', marginBottom: 10 }}>{resetError}</div>}
                                    {resetMessage && <div style={{ color: '#00f7a5', marginBottom: 10 }}>{resetMessage}</div>}
                                    <div className="input-group">
                                        <input type="text" placeholder={t('resetCodePlaceholder')} required value={resetCode} onChange={e => setResetCode(e.target.value)} />
                                        <i className="fas fa-key"></i>
                                    </div>
                                    <div className="input-group">
                                        <input type="password" placeholder={t('newPasswordPlaceholder')} required value={resetPassword} onChange={e => setResetPassword(e.target.value)} />
                                        <i className="fas fa-lock"></i>
                                    </div>
                                    <button type="submit">{t('resetPassword')}</button>
                                    <button type="button" className="ghost" onClick={() => { setShowForgot(false); setForgotSent(false); setResetCode(""); setResetPassword(""); }}>{t('backToSignIn')}</button>
                                </form>
                            )}
                        </div>
                    )}
                </div>

                {/* Overlay Panels */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>{t('welcomeBack')}</h1>
                            <p>{t('keepConnected')}</p>
                            <button className="ghost" onClick={handleSignInClick}>{t('signIn')}</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>{t('helloFriend')}</h1>
                            <p>{t('startJourney')}</p>
                            <button className="ghost" onClick={handleSignUpClick}>{t('signUp')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup; 