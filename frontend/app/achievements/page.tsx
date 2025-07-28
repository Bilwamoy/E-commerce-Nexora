"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Award, Trophy, Star, Users, Package, Clock, TrendingUp, 
  Shield, Truck, Zap, Target, CheckCircle, Calendar, 
  MapPin, ArrowLeft, ExternalLink, Medal, Crown, 
  TrendingDown, BarChart3, Globe, Heart, X
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Achievement {
  id: string;
  title: string;
  description: string;
  year: number;
  category: 'award' | 'milestone' | 'recognition' | 'growth';
  icon: any;
  stats?: {
    value: string;
    label: string;
  };
  details?: string[];
  image?: string;
  color: string;
  bgColor: string;
}

interface Milestone {
  id: string;
  year: number;
  title: string;
  description: string;
  achievement: string;
  icon: any;
}

export default function AchievementsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Best E-commerce Platform 2024',
      description: 'Recognized as the leading e-commerce platform for customer satisfaction and innovation',
      year: 2024,
      category: 'award',
      icon: Trophy,
      stats: { value: '1st', label: 'Place' },
      details: [
        'Highest customer satisfaction score (4.9/5)',
        'Most innovative features implemented',
        'Best mobile shopping experience',
        'Excellence in customer service'
      ],
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: '2',
      title: '2 Million Happy Customers',
      description: 'Reached the milestone of serving 2 million satisfied customers nationwide',
      year: 2024,
      category: 'milestone',
      icon: Users,
      stats: { value: '2M+', label: 'Customers' },
      details: [
        '98% customer satisfaction rate',
        'Average 4.8-star rating across all platforms',
        '95% customer retention rate',
        'Over 500,000 positive reviews'
      ],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: '3',
      title: '10,000+ Products Available',
      description: 'Expanded our product catalog to offer over 10,000 premium products',
      year: 2024,
      category: 'growth',
      icon: Package,
      stats: { value: '10K+', label: 'Products' },
      details: [
        'Products across 50+ categories',
        'Partnerships with 500+ brands',
        'Exclusive product launches',
        'Quality assurance on all items'
      ],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: '4',
      title: '24/7 Customer Support Excellence',
      description: 'Achieved industry-leading customer support with round-the-clock availability',
      year: 2024,
      category: 'recognition',
      icon: Clock,
      stats: { value: '24/7', label: 'Support' },
      details: [
        'Average response time: 2 minutes',
        '99.9% uptime for support systems',
        'Multi-language support available',
        'AI-powered chatbot assistance'
      ],
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: '5',
      title: '100% Customer Satisfaction Rate',
      description: 'Maintained perfect customer satisfaction score for three consecutive years',
      year: 2024,
      category: 'award',
      icon: Star,
      stats: { value: '100%', label: 'Satisfaction' },
      details: [
        'Zero unresolved complaints',
        'Proactive customer outreach',
        'Personalized shopping experience',
        'Loyalty program benefits'
      ],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: '6',
      title: 'Fastest Growing Tech Retailer',
      description: 'Recognized as the fastest growing technology retailer in the region',
      year: 2024,
      category: 'recognition',
      icon: TrendingUp,
      stats: { value: '300%', label: 'Growth' },
      details: [
        'Year-over-year revenue growth',
        'Expansion to 25+ cities',
        'Market leadership position',
        'Innovation in retail technology'
      ],
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: '7',
      title: 'Secure Shopping Certification',
      description: 'Achieved highest level of security certification for online transactions',
      year: 2024,
      category: 'award',
      icon: Shield,
      stats: { value: 'SSL+', label: 'Security' },
      details: [
        '256-bit SSL encryption',
        'PCI DSS compliance',
        'Fraud protection systems',
        'Secure payment gateways'
      ],
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: '8',
      title: 'Same Day Delivery Network',
      description: 'Established comprehensive same-day delivery network across major cities',
      year: 2024,
      category: 'milestone',
      icon: Truck,
      stats: { value: 'Same Day', label: 'Delivery' },
      details: [
        'Coverage in 15 major cities',
        'Average delivery time: 4 hours',
        'Real-time tracking system',
        'Professional delivery partners'
      ],
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    }
  ];

  const milestones: Milestone[] = [
    {
      id: '1',
      year: 2020,
      title: 'Company Founded',
      description: 'Started with a vision to revolutionize online shopping',
      achievement: 'Launched with 100 products',
      icon: Target
    },
    {
      id: '2',
      year: 2021,
      title: 'First 100K Customers',
      description: 'Reached our first major customer milestone',
      achievement: '100,000 happy customers',
      icon: Users
    },
    {
      id: '3',
      year: 2022,
      title: 'Mobile App Launch',
      description: 'Launched our award-winning mobile application',
      achievement: '1M+ app downloads',
      icon: Zap
    },
    {
      id: '4',
      year: 2023,
      title: 'Market Expansion',
      description: 'Expanded to 15 new cities across the country',
      achievement: '25 cities covered',
      icon: MapPin
    },
    {
      id: '5',
      year: 2024,
      title: 'Industry Recognition',
      description: 'Received multiple industry awards and recognition',
      achievement: '5 major awards',
      icon: Award
    }
  ];

  const categories = [
    { id: 'all', label: 'All Achievements', icon: Award },
    { id: 'award', label: 'Awards', icon: Trophy },
    { id: 'milestone', label: 'Milestones', icon: Target },
    { id: 'recognition', label: 'Recognition', icon: Star },
    { id: 'growth', label: 'Growth', icon: TrendingUp }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
  };

  const closeModal = () => {
    setSelectedAchievement(null);
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
              <Award className="size-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Our Achievements</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Celebrating Our
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the milestones, awards, and recognition that define our journey of excellence in serving millions of customers
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredAchievements.map((achievement) => {
            const IconComponent = achievement.icon;
            return (
              <div
                key={achievement.id}
                onClick={() => handleAchievementClick(achievement)}
                className={`${achievement.bgColor} rounded-2xl p-6 border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${achievement.bgColor} border border-gray-200`}>
                    <IconComponent className={`w-6 h-6 ${achievement.color}`} />
                  </div>
                  {achievement.stats && (
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${achievement.color}`}>
                        {achievement.stats.value}
                      </div>
                      <div className="text-sm text-gray-600">
                        {achievement.stats.label}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">{achievement.year}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {achievement.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-blue-600 text-sm font-medium group-hover:gap-3 transition-all">
                    <span>View Details</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600">Key milestones that shaped our success story</p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => {
                const IconComponent = milestone.icon;
                return (
                  <div key={milestone.id} className="relative flex items-start gap-6">
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl font-bold text-blue-600">{milestone.year}</span>
                        <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full border">
                          {milestone.achievement}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">2M+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">10K+</div>
            <div className="text-gray-600">Products Available</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">24/7</div>
            <div className="text-gray-600">Customer Support</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">100%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${selectedAchievement.bgColor} border border-gray-200`}>
                    <selectedAchievement.icon className={`w-6 h-6 ${selectedAchievement.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">{selectedAchievement.year}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {selectedAchievement.category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedAchievement.title}</h2>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {selectedAchievement.description}
              </p>
              
              {selectedAchievement.stats && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${selectedAchievement.color} mb-2`}>
                      {selectedAchievement.stats.value}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {selectedAchievement.stats.label}
                    </div>
                  </div>
                </div>
              )}
              
              {selectedAchievement.details && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Key Highlights:</h3>
                  <ul className="space-y-2">
                    {selectedAchievement.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 