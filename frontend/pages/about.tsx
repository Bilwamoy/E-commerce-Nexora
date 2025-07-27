import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import ChatWidget from '../components/ChatWidget'
import Footer from '../components/Footer'

const About: NextPage = () => {
  const stats = [
    { label: 'Happy Customers', value: '50K+' },
    { label: 'Products Sold', value: '1M+' },
    { label: 'Cities Served', value: '500+' },
    { label: 'Years Experience', value: '5+' }
  ]

  const values = [
    {
      icon: (
        <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Quality Assurance',
      description: 'Every product undergoes rigorous quality checks to ensure you receive only the best.'
    },
    {
      icon: (
        <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Fast Delivery',
      description: 'Same-day delivery in major cities and express shipping across India.'
    },
    {
      icon: (
        <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
        </svg>
      ),
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help you with any queries or issues.'
    },
    {
      icon: (
        <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: 'Best Prices',
      description: 'Competitive pricing with regular discounts and exclusive deals for our customers.'
    }
  ]

  const team = [
    {
      name: 'Rahul Sharma',
      role: 'Founder & CEO',
      image: '/family.jpg',
      bio: 'Former tech executive with 15+ years of experience in e-commerce and retail.'
    },
    {
      name: 'Priya Patel',
      role: 'Head of Operations',
      image: '/fashion.jpg',
      bio: 'Supply chain expert with a passion for delivering exceptional customer experiences.'
    },
    {
      name: 'Amit Kumar',
      role: 'CTO',
      image: '/laptops.jpg',
      bio: 'Technology leader focused on building scalable and innovative e-commerce solutions.'
    },
    {
      name: 'Neha Singh',
      role: 'Head of Marketing',
      image: '/beauty.jpeg',
      bio: 'Digital marketing specialist with expertise in brand building and customer acquisition.'
    }
  ]

  return (
    <>
      <Head>
        <title>About Us - Nexora</title>
        <meta name="description" content="Learn about Nexora's mission to provide premium electronics and lifestyle products with exceptional customer service and competitive prices." />
      </Head>

      {/* Header */}
      <header className="bg-amazon-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="size-8 bg-purple-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold">NEXORA</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-sm hover:text-gray-300 transition">
                Back to Home
              </Link>
              <Link href="/shop" className="text-sm hover:text-gray-300 transition">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-6">About Nexora</h1>
              <p className="text-xl max-w-3xl mx-auto">
                We're on a mission to make premium electronics and lifestyle products accessible to everyone across India, 
                with exceptional service and unbeatable prices.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2019, Nexora started as a small electronics store in Mumbai with a simple vision: 
                  to provide customers with the latest technology at fair prices, backed by exceptional service.
                </p>
                <p className="text-gray-600 mb-4">
                  What began as a local shop has grown into one of India's fastest-growing e-commerce platforms, 
                  serving customers across 500+ cities. Our commitment to quality, customer satisfaction, and 
                  innovation has remained unchanged.
                </p>
                <p className="text-gray-600">
                  Today, we're proud to offer a curated selection of premium electronics, gaming accessories, 
                  fashion items, and lifestyle products, all while maintaining the personal touch that made us 
                  successful from day one.
                </p>
              </div>
              <div className="relative">
                <Image 
                  src="/hero.jpg" 
                  alt="Nexora Store" 
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-blue-600/20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h3>
                <p className="text-gray-600">
                  To democratize access to premium technology and lifestyle products by providing 
                  exceptional value, quality, and service to every customer across India.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-purple-600">Our Vision</h3>
                <p className="text-gray-600">
                  To become India's most trusted and customer-centric e-commerce platform, 
                  known for quality, innovation, and exceptional shopping experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These core values guide everything we do and help us deliver exceptional experiences to our customers.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our leadership team brings together decades of experience in e-commerce, technology, 
                and customer service to drive Nexora's success.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    width={300}
                    height={192}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover our curated collection of premium electronics and lifestyle products 
              with exceptional service and competitive prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/shop" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
              >
                Start Shopping
              </Link>
              <Link 
                href="/" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition inline-block"
              >
                Back to Home
              </Link>
            </div>
                     </div>
         </section>
       </div>
       
       {/* Footer */}
       <Footer />
       
       {/* Chat Widget */}
       <ChatWidget />
     </>
   )
 }

export default About 