"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Beaker, Lightbulb, Rocket, Code, TestTube, Microscope,
  ArrowLeft, ExternalLink, Play, Pause, Settings, Users,
  TrendingUp, Award, Globe, Zap, Target, CheckCircle,
  Calendar, Clock, Star, Eye, Heart, Share2, Download, X
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const labProjects = [
  {
    id: 1,
    name: "AI-Powered Visual Search",
    description: "Search products using images instead of text. Simply upload a photo and find similar items instantly.",
    category: "AI/ML",
    status: "Beta Testing",
    progress: 85,
    participants: 1250,
    launchDate: "2024-03-15",
    features: ["Image Recognition", "Similarity Matching", "Real-time Results"],
    image: "/hero.jpg",
    featured: true
  },
  {
    id: 2,
    name: "Voice Shopping Assistant",
    description: "Shop hands-free with our advanced voice recognition technology. Just speak to search and order products.",
    category: "Voice Tech",
    status: "Early Access",
    progress: 65,
    participants: 890,
    launchDate: "2024-04-20",
    features: ["Voice Recognition", "Natural Language Processing", "Multi-language Support"],
    image: "/smartphones.jpg",
    featured: false
  },
  {
    id: 3,
    name: "AR Product Visualization",
    description: "See how products look in your space before buying with augmented reality technology.",
    category: "AR/VR",
    status: "Development",
    progress: 45,
    participants: 567,
    launchDate: "2024-06-10",
    features: ["3D Modeling", "Room Mapping", "Real-time Rendering"],
    image: "/laptops.jpg",
    featured: true
  },
  {
    id: 4,
    name: "Smart Price Predictor",
    description: "Predict product price changes and get notified when prices are likely to drop.",
    category: "Analytics",
    status: "Research",
    progress: 30,
    participants: 234,
    launchDate: "2024-07-25",
    features: ["Price Analysis", "Trend Prediction", "Smart Alerts"],
    image: "/gaming.jpg",
    featured: false
  },
  {
    id: 5,
    name: "Social Shopping Network",
    description: "Connect with friends, share wishlists, and get recommendations based on your social circle.",
    category: "Social",
    status: "Concept",
    progress: 15,
    participants: 123,
    launchDate: "2024-09-15",
    features: ["Social Integration", "Wishlist Sharing", "Group Buying"],
    image: "/fashion.jpg",
    featured: false
  },
  {
    id: 6,
    name: "Blockchain Loyalty Program",
    description: "Decentralized loyalty points system with transparent rewards and instant redemption.",
    category: "Blockchain",
    status: "Prototype",
    progress: 55,
    participants: 456,
    launchDate: "2024-05-30",
    features: ["Smart Contracts", "Token Rewards", "Instant Redemption"],
    image: "/electronics.jpg",
    featured: false
  }
];

const categories = ["All", "AI/ML", "Voice Tech", "AR/VR", "Analytics", "Social", "Blockchain"];

export default function NexoraLabsPage() {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("progress");

  const filteredProjects = labProjects
    .filter(project => {
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "progress":
          return b.progress - a.progress;
        case "participants":
          return b.participants - a.participants;
        case "launchDate":
          return new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleJoinProject = (project: any) => {
    toast.success(`You've joined ${project.name}! We'll notify you about updates.`);
  };

  const handleShareProject = (project: any) => {
    if (navigator.share) {
      navigator.share({
        title: project.name,
        text: project.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${project.name}\n\n${project.description}\n\nCheck it out at: ${window.location.href}`);
      toast.success('Project link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
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
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <Beaker className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Nexora Labs</h1>
                <p className="text-gray-600 mt-1">Innovation hub for experimental features and cutting-edge technology</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 mb-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Where Innovation Meets Shopping</h2>
              <p className="text-purple-100 text-lg mb-6">
                Nexora Labs is our experimental playground where we test cutting-edge technologies 
                to revolutionize your shopping experience. Join our beta programs and be among the 
                first to try tomorrow's features today.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>3,520+ Beta Testers</span>
                </div>
                                 <div className="flex items-center gap-2">
                   <Beaker className="w-5 h-5" />
                   <span>6 Active Projects</span>
                 </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>12 Features Launched</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                  <Rocket className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-yellow-900" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search lab projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="progress">Sort by Progress</option>
              <option value="participants">Sort by Participants</option>
              <option value="launchDate">Sort by Launch Date</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {project.image && (
                <div className="h-48 bg-gray-200 rounded-t-xl overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.status === "Beta Testing" ? "bg-green-100 text-green-800" :
                      project.status === "Early Access" ? "bg-blue-100 text-blue-800" :
                      project.status === "Development" ? "bg-yellow-100 text-yellow-800" :
                      project.status === "Research" ? "bg-purple-100 text-purple-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="p-6">
                {/* Category */}
                <div className="mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {project.participants.toLocaleString()} participants
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(project.launchDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJoinProject(project);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                  >
                    <Play className="w-4 h-4" />
                    Join Beta
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShareProject(project);
                    }}
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

                 {/* No Results */}
         {filteredProjects.length === 0 && (
           <div className="text-center py-12">
             <Beaker className="w-16 h-16 text-gray-300 mx-auto mb-4" />
             <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
             <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
           </div>
         )}
      </div>

      {/* Modal for Detailed View */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status and Category */}
              <div className="flex items-center gap-4 mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  selectedProject.status === "Beta Testing" ? "bg-green-100 text-green-800" :
                  selectedProject.status === "Early Access" ? "bg-blue-100 text-blue-800" :
                  selectedProject.status === "Development" ? "bg-yellow-100 text-yellow-800" :
                  selectedProject.status === "Research" ? "bg-purple-100 text-purple-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {selectedProject.status}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {selectedProject.category}
                </span>
                {selectedProject.featured && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    <Star className="w-4 h-4 mr-1" />
                    Featured
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6 text-lg">
                {selectedProject.description}
              </p>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Development Progress</span>
                  <span>{selectedProject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${selectedProject.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedProject.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Participants</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {selectedProject.participants.toLocaleString()}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Launch Date</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {new Date(selectedProject.launchDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Target className="w-4 h-4" />
                    <span className="text-sm">Progress</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {selectedProject.progress}%
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={() => handleJoinProject(selectedProject)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                >
                  <Play className="w-4 h-4" />
                  Join Beta Program
                </button>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleShareProject(selectedProject)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 