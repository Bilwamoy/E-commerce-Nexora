'use client';

import React, { useState, useEffect } from 'react';

export default function DebugPage() {
  const [envStatus, setEnvStatus] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkEnvVars = async () => {
      try {
        // Check which environment variables are available
        const status = {
          nextauth: {
            secret: !!process.env.NEXTAUTH_SECRET,
            url: !!process.env.NEXTAUTH_URL,
          },
          google: {
            id: !!process.env.GOOGLE_ID,
            secret: !!process.env.GOOGLE_SECRET,
          },
          mongodb: {
            uri: !!process.env.MONGODB_URI,
          },
          razorpay: {
            keyId: !!process.env.RAZORPAY_KEY_ID,
            keySecret: !!process.env.RAZORPAY_KEY_SECRET,
            publicKeyId: !!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          },
          gemini: {
            apiKey: !!process.env.NEXT_PUBLIC_GEMINI_API_KEY,
          },
          brevo: {
            apiKey: !!process.env.BREVO_API_KEY,
            adminEmail: !!process.env.BREVO_ADMIN_EMAIL,
          },
        };

        setEnvStatus(status);
      } catch (error) {
        console.error('Error checking environment variables:', error);
      } finally {
        setLoading(false);
      }
    };

    checkEnvVars();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading environment check...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Environment Variables Debug</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NextAuth */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">NextAuth Configuration</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>NEXTAUTH_SECRET:</span>
                <span className={envStatus.nextauth?.secret ? 'text-green-600' : 'text-red-600'}>
                  {envStatus.nextauth?.secret ? '✅ Set' : '❌ Missing'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>NEXTAUTH_URL:</span>
                <span className={envStatus.nextauth?.url ? 'text-green-600' : 'text-red-600'}>
                  {envStatus.nextauth?.url ? '✅ Set' : '❌ Missing'}
                </span>
              </div>
            </div>
          </div>

          {/* Google OAuth */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-600">Google OAuth</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>GOOGLE_ID:</span>
                <span className={envStatus.google?.id ? 'text-green-600' : 'text-red-600'}>
                  {envStatus.google?.id ? '✅ Set' : '❌ Missing'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>GOOGLE_SECRET:</span>
                <span className={envStatus.google?.secret ? 'text-green-600' : 'text-red-600'}>
                  {envStatus.google?.secret ? '✅ Set' : '❌ Missing'}
                </span>
              </div>
            </div>
          </div>

          {/* MongoDB */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-purple-600">MongoDB</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>MONGODB_URI:</span>
                <span className={envStatus.mongodb?.uri ? 'text-green-600' : 'text-red-600'}>
                  {envStatus.mongodb?.uri ? '✅ Set' : '❌ Missing'}
                </span>
              </div>
            </div>
          </div>

          {/* Razorpay */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-orange-600">Razorpay</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>RAZORPAY_KEY_ID:</span>
                <span className={envStatus.razorpay?.keyId ? 'text-green-600' : 'text-red-600'}>
                  {envStatus.razorpay?.keyId ? '✅ Set' : '❌ Missing'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>RAZORPAY_KEY_SECRET:</span>
                <span className={envStatus.razorpay?.keySecret ? 'text-green-600' : 'text-red-600'}>
                  {envStatus.razorpay?.keySecret ? '✅ Set' : '❌ Missing'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>NEXT_PUBLIC_RAZORPAY_KEY_ID:</span>
                <span className={envStatus.razorpay?.publicKeyId ? 'text-green-600' : 'text-red-600'}>
                  {envStatus.razorpay?.publicKeyId ? '✅ Set' : '❌ Missing'}
                </span>
              </div>
            </div>
          </div>

          {/* Gemini AI */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">Gemini AI</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>NEXT_PUBLIC_GEMINI_API_KEY:</span>
                <span className={envStatus.gemini?.apiKey ? 'text-green-600' : 'text-red-600'}>
                  {envStatus.gemini?.apiKey ? '✅ Set' : '❌ Missing'}
                </span>
              </div>
            </div>
          </div>

          {/* Brevo */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-teal-600">Brevo (Email)</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>BREVO_API_KEY:</span>
                <span className={envStatus.brevo?.apiKey ? 'text-green-600' : 'text-red-600'}>
                  {envStatus.brevo?.apiKey ? '✅ Set' : '❌ Missing'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>BREVO_ADMIN_EMAIL:</span>
                <span className={envStatus.brevo?.adminEmail ? 'text-green-600' : 'text-red-600'}>
                  {envStatus.brevo?.adminEmail ? '✅ Set' : '❌ Missing'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4">Troubleshooting Tips</h3>
          <ul className="space-y-2 text-yellow-700">
            <li>• Make sure your `.env.local` file is in the frontend directory</li>
            <li>• Restart your development server after adding environment variables</li>
            <li>• Check the ENV_SETUP.md file for detailed setup instructions</li>
            <li>• For Razorpay issues, ensure both server-side and client-side keys are set</li>
            <li>• Admin login requires the email to be set to `admin@nexora.com`</li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <a 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
} 