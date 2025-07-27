'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AdminTestPage() {
  // const { data: session, status } = useSession();
  const session = {
    user: {
      name: 'Admin User',
      email: 'admin@nexora.com',
      role: 'admin'
    }
  }; // Mock session for now
  const status = "authenticated"; // Mock status

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Access Test</h1>
        
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Session Status</h2>
          <div className="space-y-2">
            <p><strong>Status:</strong> {status}</p>
            <p><strong>User Email:</strong> {session?.user?.email || 'Not logged in'}</p>
            <p><strong>User Name:</strong> {session?.user?.name || 'Not logged in'}</p>
            <p><strong>Is Admin:</strong> {session?.user?.email === 'admin@nexora.com' ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Admin Access</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 mb-2">To access admin panel:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Make sure you're logged in with email: <code className="bg-gray-100 px-2 py-1 rounded">admin@nexora.com</code></li>
                <li>Click the link below to go to admin dashboard</li>
                <li>If you're not logged in, you'll be redirected to login page</li>
              </ol>
            </div>
            
            <div className="flex gap-4">
              <Link 
                href="/admin"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Admin Dashboard
              </Link>
              <Link 
                href="/login"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Environment Check</h2>
          <div className="space-y-2 text-sm">
            <p><strong>NEXTAUTH_URL:</strong> {process.env.NEXTAUTH_URL || 'Not set'}</p>
            <p><strong>NEXTAUTH_SECRET:</strong> {process.env.NEXTAUTH_SECRET ? 'Set' : 'Not set'}</p>
            <p><strong>GOOGLE_ID:</strong> {process.env.GOOGLE_ID ? 'Set' : 'Not set'}</p>
            <p><strong>GOOGLE_SECRET:</strong> {process.env.GOOGLE_SECRET ? 'Set' : 'Not set'}</p>
            <p><strong>MONGODB_URI:</strong> {process.env.MONGODB_URI ? 'Set' : 'Not set'}</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link 
            href="/"
            className="text-blue-600 hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 