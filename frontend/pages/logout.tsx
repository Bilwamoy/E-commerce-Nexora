import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SiteHeader } from '../components/site-header';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';

const LogoutPage: NextPage = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // Check if user is logged in (mock check for now)
    const session = localStorage.getItem('userSession');
    if (session) {
      setIsLoggedIn(true);
    } else {
      // Redirect to home if not logged in
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    
    // Simulate logout process
    setTimeout(() => {
      // Clear session/localStorage
      localStorage.removeItem('userSession');
      sessionStorage.clear();
      
      // Redirect to home page
      router.push('/');
    }, 1500);
  };

  const handleCancel = () => {
    router.push('/');
  };

  if (!isLoggedIn) {
    return null; // Will redirect
  }

  return (
    <>
      <Head>
        <title>Logout - Nexora</title>
        <meta name="description" content="Logout from your Nexora account" />
      </Head>
      
      <SiteHeader />
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              {/* Logout Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Logout
              </h2>
              
              <p className="text-gray-600 mb-8">
                Are you sure you want to logout from your Nexora account?
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoggingOut ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging out...
                    </div>
                  ) : (
                    'Yes, Logout'
                  )}
                </button>
                
                <button
                  onClick={handleCancel}
                  disabled={isLoggingOut}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Cancel
                </button>
              </div>
              
              <div className="mt-6 text-xs text-gray-500">
                <p>You will be redirected to the home page after logout.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      <ChatWidget />
    </>
  );
};

export default LogoutPage; 