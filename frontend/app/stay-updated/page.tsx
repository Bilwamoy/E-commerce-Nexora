"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Mail, Bell, Zap, ArrowRight, CheckCircle, Star, 
  Smartphone, Globe, MessageCircle, Share2, Download,
  ArrowLeft, ExternalLink, Instagram, Twitter, Facebook,
  Youtube, Linkedin, Phone, MapPin, Clock, Users,
  TrendingUp, Award, Shield, Truck, Gift, Tag
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface SocialChannel {
  id: string;
  name: string;
  icon: any;
  url: string;
  followers: string;
  description: string;
  color: string;
  bgColor: string;
}

interface UpdateChannel {
  id: string;
  title: string;
  description: string;
  icon: any;
  features: string[];
  color: string;
  bgColor: string;
}

export default function StayUpdatedPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<string>('newsletter');

  const socialChannels: SocialChannel[] = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/nexora',
      followers: '150K+',
      description: 'Follow us for daily product updates, behind-the-scenes content, and exclusive offers',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/nexora',
      followers: '200K+',
      description: 'Get real-time updates on new products, tech news, and customer support',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/nexora',
      followers: '500K+',
      description: 'Join our community for discussions, reviews, and exclusive Facebook-only deals',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/nexora',
      followers: '100K+',
      description: 'Watch product reviews, unboxing videos, and tech tutorials',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/company/nexora',
      followers: '50K+',
      description: 'Stay updated with company news, career opportunities, and industry insights',
      color: 'text-blue-800',
      bgColor: 'bg-blue-50'
    }
  ];

  const updateChannels: UpdateChannel[] = [
    {
      id: 'newsletter',
      title: 'Email Newsletter',
      description: 'Get weekly updates on new products, exclusive deals, and tech insights delivered to your inbox',
      icon: Mail,
      features: [
        'Weekly product updates and launches',
        'Exclusive subscriber-only discounts',
        'Early access to sales and promotions',
        'Tech trends and industry insights',
        'Personalized product recommendations'
      ],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'mobile-app',
      title: 'Mobile App',
      description: 'Download our mobile app for instant notifications, exclusive app-only deals, and seamless shopping',
      icon: Smartphone,
      features: [
        'Push notifications for new products',
        'App-exclusive flash sales',
        'Barcode scanner for price comparison',
        'Wishlist and price drop alerts',
        'Quick reorder and tracking features'
      ],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'social-media',
      title: 'Social Media',
      description: 'Follow us on social media platforms for real-time updates, community engagement, and exclusive content',
      icon: Share2,
      features: [
        'Real-time product announcements',
        'Live streaming product launches',
        'Community polls and feedback',
        'Behind-the-scenes content',
        'Social media exclusive giveaways'
      ],
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'customer-support',
      title: 'Customer Support',
      description: 'Stay connected through our 24/7 customer support channels for immediate assistance',
      icon: MessageCircle,
      features: [
        '24/7 live chat support',
        'WhatsApp business integration',
        'Phone support with callback option',
        'Email support with 2-hour response',
        'Social media customer service'
      ],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
        toast.success('Successfully subscribed to newsletter!');
        
        // Reset the success message after 5 seconds
        setTimeout(() => {
          setIsSubscribed(false);
        }, 5000);
      } else {
        const error = await response.json();
        toast.error('Failed to subscribe: ' + (error.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadApp = (platform: 'ios' | 'android') => {
    toast.success(`Redirecting to ${platform === 'ios' ? 'App Store' : 'Google Play Store'}...`);
    // In a real app, this would redirect to actual app store links
    setTimeout(() => {
      window.open(`https://${platform === 'ios' ? 'apps.apple.com' : 'play.google.com'}/store/apps/details?id=com.nexora.app`, '_blank');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 mb-6">
              <Bell className="size-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Stay Connected</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Stay Updated with
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Nexora
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Never miss out on the latest products, exclusive deals, and exciting updates. Choose your preferred way to stay connected with us.
            </p>
          </div>
        </div>

        {/* Update Channels */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Choose Your Update Channels</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {updateChannels.map((channel) => {
              const IconComponent = channel.icon;
              return (
                <div
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={`${channel.bgColor} rounded-2xl p-6 border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer ${
                    selectedChannel === channel.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${channel.bgColor} border border-gray-200`}>
                      <IconComponent className={`w-6 h-6 ${channel.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{channel.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{channel.description}</p>
                      
                      <ul className="space-y-2">
                        {channel.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Newsletter Section */}
        {selectedChannel === 'newsletter' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200 mb-6">
                <Mail className="size-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-700">Email Newsletter</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Join 50,000+ Tech Enthusiasts</h3>
              <p className="text-gray-600 mb-8">
                Get the latest tech news, exclusive deals, and insider insights delivered to your inbox every week.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative max-w-md mx-auto">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mx-auto"
                >
                  {isLoading ? (
                    <>
                      <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe Now
                      <ArrowRight className="size-5" />
                    </>
                  )}
                </button>
              </form>

              {isSubscribed && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="size-5 text-green-600" />
                    <span className="text-green-800 font-medium">
                      Successfully subscribed! Check your email for confirmation.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile App Section */}
        {selectedChannel === 'mobile-app' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full border border-purple-200 mb-6">
                    <Smartphone className="size-4 text-purple-500" />
                    <span className="text-sm font-medium text-purple-700">Mobile App</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Download Our Mobile App</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Get instant notifications, exclusive app-only deals, and seamless shopping experience on the go.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Push notifications for new products</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">App-exclusive flash sales</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Barcode scanner for price comparison</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Wishlist and price drop alerts</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => handleDownloadApp('ios')}
                      className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      <span>App Store</span>
                    </button>
                    <button
                      onClick={() => handleDownloadApp('android')}
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      <span>Google Play</span>
                    </button>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-64 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mx-auto flex items-center justify-center shadow-2xl">
                    <Smartphone className="w-32 h-32 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Social Media Section */}
        {selectedChannel === 'social-media' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200 mb-6">
                <Share2 className="size-4 text-green-500" />
                <span className="text-sm font-medium text-green-700">Social Media</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Follow Us on Social Media</h3>
              <p className="text-gray-600">
                Stay connected with us across all social media platforms for real-time updates and exclusive content.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {socialChannels.map((channel) => {
                const IconComponent = channel.icon;
                return (
                  <div
                    key={channel.id}
                    onClick={() => window.open(channel.url, '_blank')}
                    className={`${channel.bgColor} rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl ${channel.bgColor} border border-gray-200`}>
                        <IconComponent className={`w-6 h-6 ${channel.color}`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{channel.name}</h4>
                        <p className="text-sm text-gray-600">{channel.followers} followers</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {channel.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-blue-600 text-sm font-medium group-hover:gap-3 transition-all">
                      <span>Follow Now</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Customer Support Section */}
        {selectedChannel === 'customer-support' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-200 mb-6">
                  <MessageCircle className="size-4 text-orange-500" />
                  <span className="text-sm font-medium text-orange-700">Customer Support</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">24/7 Customer Support</h3>
                <p className="text-gray-600">
                  Stay connected through our multiple support channels for immediate assistance whenever you need us.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Live Chat</h4>
                      <p className="text-sm text-gray-600">24/7 Available</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Get instant help from our support team through live chat.
                  </p>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                    Start Chat →
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Phone Support</h4>
                      <p className="text-sm text-gray-600">24/7 Available</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Call us anytime for immediate assistance.
                  </p>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                    Call Now →
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Email Support</h4>
                      <p className="text-sm text-gray-600">2-hour response</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Send us an email for detailed assistance.
                  </p>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                    Send Email →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h3>
            <p className="text-gray-600">
              Have questions? We're here to help you stay connected and informed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Call Us</h4>
              <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
              <p className="text-gray-500 text-xs">24/7 Support</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Email Us</h4>
              <p className="text-gray-600 text-sm">support@nexora.com</p>
              <p className="text-gray-500 text-xs">2-hour response</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Visit Us</h4>
              <p className="text-gray-600 text-sm">123 Tech Street</p>
              <p className="text-gray-500 text-xs">San Francisco, CA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 