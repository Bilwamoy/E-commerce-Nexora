"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, ExternalLink, Heart, MessageCircle, Share2, 
  Bookmark, Send, Image, Video, Smile, MapPin,
  Calendar, Users, TrendingUp, Award, Globe, Zap, Target,
  CheckCircle, Star, Eye, Download, Facebook, Instagram,
  Twitter, Youtube, Linkedin, Phone, Mail, Clock, MoreHorizontal
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const instagramPosts = [
  {
    id: 1,
    content: "🎉 2 MILLION customers milestone! Thank you for your trust and support. We're committed to bringing you the best shopping experience. #Nexora #Milestone #HappyCustomers #Shopping #Ecommerce",
    author: "nexora_official",
    authorAvatar: "/hero.jpg",
    timestamp: "2 hours ago",
    likes: 1247,
    comments: 89,
    image: "/hero.jpg",
    isLiked: false,
    isSaved: false,
    type: "post"
  },
  {
    id: 2,
    content: "📱 New app alert! Download the Nexora mobile app for exclusive deals and seamless shopping. Link in bio! #NexoraApp #MobileFirst #Shopping #AppLaunch #Deals",
    author: "nexora_official",
    authorAvatar: "/hero.jpg",
    timestamp: "1 day ago",
    likes: 892,
    comments: 67,
    image: "/smartphones.jpg",
    isLiked: true,
    isSaved: false,
    type: "post"
  },
  {
    id: 3,
    content: "⚡ FLASH SALE: Up to 70% off on electronics! Limited time only. Don't miss out! #FlashSale #Electronics #Deals #ShopNow #LimitedTime #ElectronicsDeals",
    author: "nexora_official",
    authorAvatar: "/hero.jpg",
    timestamp: "3 days ago",
    likes: 2156,
    comments: 234,
    image: "/laptops.jpg",
    isLiked: false,
    isSaved: true,
    type: "post"
  },
  {
    id: 4,
    content: "🤖 Our AI recommendation engine is getting smarter! It learns from your preferences to suggest products you'll actually love. Try it out! #AI #Recommendations #SmartShopping #Technology #Innovation",
    author: "nexora_official",
    authorAvatar: "/hero.jpg",
    timestamp: "1 week ago",
    likes: 567,
    comments: 45,
    image: "/gaming.jpg",
    isLiked: false,
    isSaved: false,
    type: "post"
  },
  {
    id: 5,
    content: "💡 Pro tip: Use our price comparison feature to save big on your purchases. One customer saved ₹15,000 on a laptop! #MoneySaving #SmartShopping #Tips #Savings #PriceComparison",
    author: "nexora_official",
    authorAvatar: "/hero.jpg",
    timestamp: "2 weeks ago",
    likes: 1234,
    comments: 156,
    image: "/fashion.jpg",
    isLiked: true,
    isSaved: false,
    type: "post"
  }
];

const instagramStories = [
  { id: 1, image: "/hero.jpg", title: "Milestone" },
  { id: 2, image: "/smartphones.jpg", title: "New App" },
  { id: 3, image: "/laptops.jpg", title: "Flash Sale" },
  { id: 4, image: "/gaming.jpg", title: "AI Tech" },
  { id: 5, image: "/fashion.jpg", title: "Tips" }
];

const instagramStats = {
  followers: "2.1M",
  following: "1,245",
  posts: "8,567",
  engagement: "5.8%"
};

export default function InstagramPage() {
  const router = useRouter();
  const [posts, setPosts] = useState(instagramPosts);
  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showStories, setShowStories] = useState(false);
  const [selectedStory, setSelectedStory] = useState<any>(null);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleSave = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isSaved: !post.isSaved
        };
      }
      return post;
    }));
  };

  const handleShare = (post: any) => {
    if (navigator.share) {
      navigator.share({
        title: "Nexora Instagram Post",
        text: post.content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${post.content}\n\nCheck out Nexora on Instagram: ${window.location.href}`);
      toast.success('Post link copied to clipboard!');
    }
  };

  const handleSubmitPost = () => {
    if (!newPost.trim()) {
      toast.error('Please write something to post!');
      return;
    }

    const newPostObj = {
      id: posts.length + 1,
      content: newPost,
      author: "your_username",
      authorAvatar: "/hero.jpg",
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      image: selectedImage ? URL.createObjectURL(selectedImage) : null,
      isLiked: false,
      isSaved: false,
      type: "post"
    };

    setPosts([newPostObj, ...posts]);
    setNewPost("");
    setSelectedImage(null);
    toast.success('Post published successfully!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleStoryClick = (story: any) => {
    setSelectedStory(story);
    setShowStories(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Nexora on Instagram</h1>
                <p className="text-gray-600 text-sm">Visual stories and updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{instagramStats.followers}</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{instagramStats.following}</div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{instagramStats.posts}</div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{instagramStats.engagement}</div>
              <div className="text-sm text-gray-600">Engagement</div>
            </div>
          </div>
        </div>

        {/* Stories */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stories</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {instagramStories.map((story) => (
              <div
                key={story.id}
                onClick={() => handleStoryClick(story)}
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <span className="text-xs text-gray-600">{story.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Create Post */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-start gap-4">
            <img
              src="/hero.jpg"
              alt="Your Avatar"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Write a caption..."
                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={3}
              />
              
              {selectedImage && (
                <div className="mt-3 relative">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="w-full max-h-64 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-purple-600 hover:text-purple-700 cursor-pointer">
                    <Image className="w-5 h-5" />
                    <span className="text-sm">Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700">
                    <Video className="w-5 h-5" />
                    <span className="text-sm">Video</span>
                  </button>
                  <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700">
                    <Smile className="w-5 h-5" />
                    <span className="text-sm">Stickers</span>
                  </button>
                </div>
                <button
                  onClick={handleSubmitPost}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border">
              {/* Post Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{post.author}</div>
                    <div className="text-sm text-gray-500">{post.timestamp}</div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="relative">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`transition-colors ${
                        post.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-6 h-6 ${post.isLiked ? 'fill-current' : ''}`} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 transition-colors">
                      <MessageCircle className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => handleShare(post)}
                      className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <Send className="w-6 h-6" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleSave(post.id)}
                    className={`transition-colors ${
                      post.isSaved ? 'text-black' : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    <Bookmark className={`w-6 h-6 ${post.isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Likes Count */}
                <div className="text-sm font-semibold text-gray-900 mb-2">
                  {post.likes.toLocaleString()} likes
                </div>

                {/* Post Content */}
                <div className="mb-2">
                  <span className="font-semibold text-gray-900 mr-2">{post.author}</span>
                  <span className="text-gray-900">{post.content}</span>
                </div>

                {/* Comments */}
                <div className="text-sm text-gray-500 mb-3">
                  View all {post.comments} comments
                </div>

                {/* Add Comment */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 text-sm border-none outline-none"
                  />
                  <button className="text-blue-500 font-semibold text-sm">Post</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mt-8 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Follow Us on Instagram</h3>
          <p className="text-purple-100 mb-4">
            Get visual updates on products, behind-the-scenes content, and exclusive offers!
          </p>
          <button
            onClick={() => window.open('https://instagram.com/nexora_official', '_blank')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Instagram className="w-5 h-5" />
            Follow @nexora_official
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Story Modal */}
      {showStories && selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative max-w-sm w-full mx-4">
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="relative">
                <img
                  src={selectedStory.image}
                  alt={selectedStory.title}
                  className="w-full h-96 object-cover"
                />
                <button
                  onClick={() => setShowStories(false)}
                  className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
                >
                  ×
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedStory.title}</h3>
                <p className="text-gray-600">Tap to view more stories</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 