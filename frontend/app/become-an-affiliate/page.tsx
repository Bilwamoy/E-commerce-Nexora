"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, ExternalLink, DollarSign, Users, TrendingUp, Award, 
  Globe, Zap, Target, CheckCircle, Star, Eye, Download, 
  Calculator, BarChart3, Gift, Tag, Shield, Clock, Mail,
  Phone, MapPin, Calendar, User, Building, CreditCard
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const commissionTiers = [
  {
    tier: "Bronze",
    commission: "5%",
    requirements: "0-50 sales/month",
    benefits: ["Basic affiliate dashboard", "Standard commission rates", "Email support"],
    color: "from-amber-500 to-orange-500"
  },
  {
    tier: "Silver",
    commission: "8%",
    requirements: "51-200 sales/month",
    benefits: ["Advanced analytics", "Priority support", "Exclusive promotions", "Monthly bonus"],
    color: "from-gray-400 to-gray-600"
  },
  {
    tier: "Gold",
    commission: "12%",
    requirements: "201-500 sales/month",
    benefits: ["Premium dashboard", "Dedicated account manager", "Higher commission rates", "Quarterly bonuses"],
    color: "from-yellow-400 to-yellow-600"
  },
  {
    tier: "Platinum",
    commission: "15%",
    requirements: "500+ sales/month",
    benefits: ["VIP treatment", "Custom commission rates", "Exclusive events", "Annual bonuses"],
    color: "from-purple-500 to-pink-500"
  }
];

const affiliateFeatures = [
  {
    icon: Calculator,
    title: "Commission Calculator",
    description: "Calculate your potential earnings with our interactive commission calculator"
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track your performance with detailed analytics and insights"
  },
  {
    icon: Gift,
    title: "Exclusive Promotions",
    description: "Access to special deals and promotions for your audience"
  },
  {
    icon: Tag,
    title: "Custom Links",
    description: "Generate unique tracking links for different campaigns"
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Safe and reliable payment processing every month"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock support to help you succeed"
  }
];

export default function BecomeAnAffiliatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: "",
    socialMedia: "",
    audienceSize: "",
    niche: "",
    experience: "",
    motivation: ""
  });
  const [selectedTier, setSelectedTier] = useState("Bronze");
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorData, setCalculatorData] = useState({
    monthlySales: 100,
    averageOrderValue: 2000
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Application submitted successfully! We\'ll contact you within 24 hours.');
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      website: "",
      socialMedia: "",
      audienceSize: "",
      niche: "",
      experience: "",
      motivation: ""
    });
  };

  const calculateCommission = () => {
    const tier = commissionTiers.find(t => t.tier === selectedTier);
    const commissionRate = parseFloat(tier?.commission.replace('%', '') || '5') / 100;
    const monthlyRevenue = calculatorData.monthlySales * calculatorData.averageOrderValue;
    const monthlyCommission = monthlyRevenue * commissionRate;
    const yearlyCommission = monthlyCommission * 12;
    
    return {
      monthlyRevenue,
      monthlyCommission,
      yearlyCommission,
      commissionRate: tier?.commission || '5%'
    };
  };

  const commission = calculateCommission();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Become an Affiliate</h1>
                <p className="text-gray-600 mt-1">Join our affiliate program and earn commissions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 mb-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Earn Up to 15% Commission</h2>
              <p className="text-green-100 text-lg mb-6">
                Join thousands of successful affiliates who earn passive income by promoting 
                Nexora's products. Start earning today with our industry-leading commission rates.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>10,000+ Active Affiliates</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  <span>₹50M+ Paid in Commissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>4-Tier Commission Structure</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-yellow-900" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Commission Tiers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Commission Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commissionTiers.map((tier) => (
              <div
                key={tier.tier}
                className={`bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg transition-shadow cursor-pointer ${
                  selectedTier === tier.tier ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedTier(tier.tier)}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${tier.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.tier}</h3>
                <div className="text-3xl font-bold text-green-600 mb-2">{tier.commission}</div>
                <p className="text-sm text-gray-600 mb-4">{tier.requirements}</p>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Commission Calculator */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Commission Calculator</h2>
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Calculator className="w-4 h-4" />
              {showCalculator ? 'Hide' : 'Show'} Calculator
            </button>
          </div>

          {showCalculator && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Sales
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={calculatorData.monthlySales}
                    onChange={(e) => setCalculatorData(prev => ({
                      ...prev,
                      monthlySales: parseInt(e.target.value)
                    }))}
                    className="w-full"
                  />
                  <div className="text-center text-lg font-semibold text-gray-900">
                    {calculatorData.monthlySales} sales/month
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average Order Value
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="500"
                    value={calculatorData.averageOrderValue}
                    onChange={(e) => setCalculatorData(prev => ({
                      ...prev,
                      averageOrderValue: parseInt(e.target.value)
                    }))}
                    className="w-full"
                  />
                  <div className="text-center text-lg font-semibold text-gray-900">
                    ₹{calculatorData.averageOrderValue.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Earnings</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Commission Rate:</span>
                    <span className="font-semibold">{commission.commissionRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Revenue:</span>
                    <span className="font-semibold">₹{commission.monthlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Commission:</span>
                    <span className="font-semibold text-green-600">₹{commission.monthlyCommission.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Yearly Commission:</span>
                    <span className="font-semibold text-green-600">₹{commission.yearlyCommission.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose Nexora Affiliate Program?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {affiliateFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Apply Now</h2>
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website/Blog URL
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Social Media Handles
                </label>
                <input
                  type="text"
                  name="socialMedia"
                  value={formData.socialMedia}
                  onChange={handleInputChange}
                  placeholder="e.g., @username"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Audience Size
                </label>
                <select
                  name="audienceSize"
                  value={formData.audienceSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select audience size</option>
                  <option value="0-1000">0-1,000 followers</option>
                  <option value="1000-10000">1,000-10,000 followers</option>
                  <option value="10000-50000">10,000-50,000 followers</option>
                  <option value="50000-100000">50,000-100,000 followers</option>
                  <option value="100000+">100,000+ followers</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niche/Category
                </label>
                <select
                  name="niche"
                  value={formData.niche}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your niche</option>
                  <option value="technology">Technology</option>
                  <option value="fashion">Fashion & Lifestyle</option>
                  <option value="beauty">Beauty & Personal Care</option>
                  <option value="home">Home & Garden</option>
                  <option value="fitness">Fitness & Health</option>
                  <option value="gaming">Gaming</option>
                  <option value="education">Education</option>
                  <option value="business">Business & Finance</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Affiliate Experience
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your experience level</option>
                  <option value="beginner">Beginner (0-6 months)</option>
                  <option value="intermediate">Intermediate (6 months - 2 years)</option>
                  <option value="advanced">Advanced (2+ years)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why do you want to join our affiliate program?
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your motivation and how you plan to promote our products..."
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-1"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 mt-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Mail className="w-8 h-8 mx-auto mb-3 text-blue-400" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-gray-300">affiliates@nexora.com</p>
            </div>
            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto mb-3 text-green-400" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-300">+91 1800-123-4567</p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
              <h3 className="font-semibold mb-2">Support Hours</h3>
              <p className="text-gray-300">24/7 Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 