'use client';

import React, { useState } from 'react';
import JoyChatbot from '@/components/JoyChatbot';
import SupportBot from '@/components/SupportBot';

export default function BotTestPage() {
  const [showJoy, setShowJoy] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Bot Testing Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Joy Bot Test */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 text-purple-600">Joy Bot Test</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 mb-2">Environment Variables:</p>
                <div className="text-sm space-y-1">
                  <p><strong>GEMINI_API_KEY:</strong> {process.env.NEXT_PUBLIC_GEMINI_API_KEY ? '✅ Set' : '❌ Missing'}</p>
                </div>
              </div>
              
              <div>
                <p className="text-gray-600 mb-2">Test Joy Bot:</p>
                <button
                  onClick={() => setShowJoy(!showJoy)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {showJoy ? 'Hide Joy Bot' : 'Show Joy Bot'}
                </button>
              </div>

              {showJoy && (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <JoyChatbot embedMode={true} />
                </div>
              )}
            </div>
          </div>

          {/* Support Bot Test */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-600">Support Bot Test</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 mb-2">Environment Variables:</p>
                <div className="text-sm space-y-1">
                  <p><strong>BREVO_API_KEY:</strong> {process.env.BREVO_API_KEY ? '✅ Set' : '❌ Missing'}</p>
                  <p><strong>BREVO_ADMIN_EMAIL:</strong> {process.env.BREVO_ADMIN_EMAIL ? '✅ Set' : '❌ Missing'}</p>
                </div>
              </div>
              
              <div>
                <p className="text-gray-600 mb-2">Test Support Bot:</p>
                <button
                  onClick={() => setShowSupport(!showSupport)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {showSupport ? 'Hide Support Bot' : 'Show Support Bot'}
                </button>
              </div>

              {showSupport && (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <SupportBot embedMode={true} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Setup Instructions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">For Joy Bot (Gemini AI):</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                <li>Go to <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google AI Studio</a></li>
                <li>Create a new API key</li>
                <li>Add to your `.env.local`: <code className="bg-gray-100 px-2 py-1 rounded">NEXT_PUBLIC_GEMINI_API_KEY=your-api-key</code></li>
                <li>Restart your development server</li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">For Support Bot (Email):</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                <li>Go to <a href="https://www.brevo.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Brevo</a></li>
                <li>Sign up and get an API key</li>
                <li>Add to your `.env.local`: 
                  <div className="mt-1">
                    <code className="bg-gray-100 px-2 py-1 rounded block">BREVO_API_KEY=your-brevo-key</code>
                    <code className="bg-gray-100 px-2 py-1 rounded block">BREVO_ADMIN_EMAIL=your-email@example.com</code>
                  </div>
                </li>
                <li>Restart your development server</li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Testing Commands:</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Joy Bot:</strong> Try "show me products", "add [product name] to cart", "what's in my cart?"</p>
                <p><strong>Support Bot:</strong> Try &quot;I can&apos;t find a product&quot; (redirects to Joy) or &quot;I have a complaint&quot; (escalates)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-blue-600 hover:underline">Back to Home</a>
        </div>
      </div>
    </div>
  );
} 