import React, { useState, useEffect } from 'react';

export default function EmailOtpForm() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('enter-email');
  const [message, setMessage] = useState('');
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const sendOtp = async () => {
    setMessage('');
    const res = await fetch('/api/email-otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.success) {
      setStep('enter-otp');
      setCooldown(30);
      setMessage('OTP sent to your email!');
    } else {
      setMessage(data.error || 'Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    setMessage('');
    const res = await fetch('/api/email-otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage('Email verified!');
      setStep('verified');
    } else {
      setMessage(data.error || 'Failed to verify OTP');
    }
  };

  return (
    <div>
      {step === 'enter-email' && (
        <>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <button onClick={sendOtp} disabled={!email}>Send OTP</button>
        </>
      )}
      {step === 'enter-otp' && (
        <>
          <input
            value={otp}
            onChange={e => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button onClick={verifyOtp} disabled={!otp}>Verify OTP</button>
          <button onClick={sendOtp} disabled={cooldown > 0}>
            Resend OTP {cooldown > 0 && `(${cooldown}s)`}
          </button>
        </>
      )}
      {step === 'verified' && <div>✅ Email verified!</div>}
      {message && <div>{message}</div>}
    </div>
  );
} 