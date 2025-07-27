import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import ChatWidget from '../components/ChatWidget'
import Footer from '../components/Footer'

const Careers: NextPage = () => {
  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote / Bangalore',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'We are looking for a talented Frontend Developer to join our team and help build amazing user experiences.'
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '4-6 years',
      description: 'Lead product strategy and development for our e-commerce platform.'
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote / Delhi',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Create beautiful and intuitive user interfaces for our products.'
    },
    {
      id: 4,
      title: 'Data Scientist',
      department: 'Analytics',
      location: 'Bangalore',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Build machine learning models to improve our platform and user experience.'
    }
  ]

  const benefits = [
    {
      icon: '🏠',
      title: 'Remote Work',
      description: 'Work from anywhere in India'
    },
    {
      icon: '💰',
      title: 'Competitive Salary',
      description: 'Best-in-class compensation'
    },
    {
      icon: '🏥',
      title: 'Health Insurance',
      description: 'Comprehensive health coverage'
    },
    {
      icon: '📚',
      title: 'Learning Budget',
      description: 'Annual budget for courses and conferences'
    },
    {
      icon: '🎉',
      title: 'Team Events',
      description: 'Regular team building activities'
    },
    {
      icon: '📈',
      title: 'Growth Opportunities',
      description: 'Clear career progression paths'
    }
  ]

  return (
    <>
      <Head>
        <title>Careers - Nexora</title>
        <meta name="description" content="Join the Nexora team and help us build the future of e-commerce. Explore current job openings and career opportunities." />
      </Head>

      {/* Header */}
      <header className="bg-amazon-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold">NEXORA</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-sm hover:text-gray-300 transition">
                Home
              </Link>
              <Link href="/shop" className="text-sm hover:text-gray-300 transition">
                Shop
              </Link>
              <Link href="/about" className="text-sm hover:text-gray-300 transition">
                About
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Join Our Team
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Help us build the future of e-commerce and create amazing experiences for millions of customers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#openings" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              View Openings
            </a>
            <Link href="/about" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Work at Nexora?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Current Openings</h2>
          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {job.department}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {job.type}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                        </svg>
                        {job.experience}
                      </span>
                    </div>
                    <p className="text-gray-600">{job.description}</p>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See the Right Role?</h2>
          <p className="text-xl mb-8 text-gray-300">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Send Resume
          </button>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </>
  )
}

export default Careers 