import React from 'react';
import Link from 'next/link';

export default function CareersPage() {
  const jobOpenings = [
    {
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'We are looking for a skilled Frontend Developer to join our team and help build amazing user experiences.'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Bangalore',
      type: 'Full-time',
      description: 'Join our product team to help shape the future of e-commerce and create innovative solutions.'
    },
    {
      title: 'Customer Support Specialist',
      department: 'Support',
      location: 'Mumbai',
      type: 'Full-time',
      description: 'Help us provide exceptional customer service and support to our growing customer base.'
    },
    {
      title: 'Data Analyst',
      department: 'Analytics',
      location: 'Delhi',
      type: 'Full-time',
      description: 'Analyze data to help us make better business decisions and improve customer experience.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Join Our Team</h1>
          
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Work at Nexora?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🚀 Growth Opportunities</h3>
                <p className="text-gray-600 text-sm">Fast-paced environment with endless learning opportunities</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">💼 Competitive Benefits</h3>
                <p className="text-gray-600 text-sm">Health insurance, flexible hours, and great perks</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🌍 Remote Work</h3>
                <p className="text-gray-600 text-sm">Work from anywhere with our flexible remote policy</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🎯 Impact</h3>
                <p className="text-gray-600 text-sm">Make a real difference in millions of people's lives</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Open Positions</h2>
            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {job.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span>{job.department}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <button className="bg-amazon-blue hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              Don't see a position that fits? We're always looking for talented individuals to join our team. 
              Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">📧 Email</h3>
                <p className="text-gray-600">careers@nexora.com</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">📱 Phone</h3>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-amazon-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 