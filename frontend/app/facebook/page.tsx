"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, ExternalLink, Heart, MessageCircle, Share2, 
  ThumbsUp, Bookmark, Send, Image, Video, Smile, MapPin,
  Calendar, Users, TrendingUp, Award, Globe, Zap, Target,
  CheckCircle, Star, Eye, Download, Facebook, Instagram,
  Twitter, Youtube, Linkedin, Phone, Mail, Clock
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const facebookPosts: Array<{
  id: number;
  content: string;
  author: string;
  authorAvatar: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  image: string | null;
  isLiked: boolean;
  isBookmarked: boolean;
  type: string;
}> = [
  {
    id: 1,
    content: "🎉 Exciting news! Nexora has reached 2 million happy customers! Thank you for your trust and support. We're committed to bringing you the best shopping experience. #Nexora #Milestone #HappyCustomers",
    author: "Nexora Official",
    authorAvatar: "/hero.jpg",
    timestamp: "2 hours ago",
    likes: 1247,
    comments: 89,
    shares: 156,
    image: "/hero.jpg",
    isLiked: false,
    isBookmarked: false,
    type: "post"
  },
  {
    id: 2,
    content: "📱 Our new mobile app is now live! Download it for exclusive mobile-only deals and enhanced shopping experience. Link in bio! #NexoraApp #MobileShopping #NewApp",
    author: "Nexora Official",
    authorAvatar: "/hero.jpg",
    timestamp: "1 day ago",
    likes: 892,
    comments: 67,
    shares: 123,
    image: "/smartphones.jpg",
    isLiked: true,
    isBookmarked: false,
    type: "post"
  },
  {
    id: 3,
    content: "🛒 Flash Sale Alert! Up to 70% off on electronics. Limited time offer. Shop now before it's gone! #FlashSale #Electronics #Deals",
    author: "Nexora Official",
    authorAvatar: "/hero.jpg",
    timestamp: "3 days ago",
    likes: 2156,
    comments: 234,
    shares: 567,
    image: "/laptops.jpg",
    isLiked: false,
    isBookmarked: true,
    type: "post"
  },
  {
    id: 4,
    content: "🎯 Did you know? Our AI-powered recommendation system helps you discover products you'll love. Try it out and let us know what you think! #AI #Recommendations #SmartShopping",
    author: "Nexora Official",
    authorAvatar: "/hero.jpg",
    timestamp: "1 week ago",
    likes: 567,
    comments: 45,
    shares: 78,
    image: "/gaming.jpg",
    isLiked: false,
    isBookmarked: false,
    type: "post"
  },
  {
    id: 5,
    content: "🌟 Customer Spotlight: Meet Sarah from Mumbai who saved ₹15,000 on her laptop purchase using our price comparison feature. Share your savings story with us! #CustomerSpotlight #Savings #SuccessStory",
    author: "Nexora Official",
    authorAvatar: "/hero.jpg",
    timestamp: "2 weeks ago",
    likes: 1234,
    comments: 156,
    shares: 234,
    image: "/fashion.jpg",
    isLiked: true,
    isBookmarked: false,
    type: "post"
  }
];

const facebookStats = {
  followers: "1.2M",
  posts: "2,847",
  engagement: "4.8%",
  reach: "5.2M"
};

export default function FacebookPage() {
  const router = useRouter();
  const [posts, setPosts] = useState(facebookPosts);
  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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

  const handleBookmark = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked
        };
      }
      return post;
    }));
  };

  const handleShare = (post: any) => {
    if (navigator.share) {
      navigator.share({
        title: "Nexora Facebook Post",
        text: post.content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${post.content}\n\nCheck out Nexora on Facebook: ${window.location.href}`);
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
      author: "You",
      authorAvatar: "/hero.jpg",
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      image: selectedImage ? URL.createObjectURL(selectedImage) : null,
      isLiked: false,
      isBookmarked: false,
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Facebook className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Nexora on Facebook</h1>
                <p className="text-gray-600 text-sm">Connect with us on social media</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Page Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{facebookStats.followers}</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{facebookStats.posts}</div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{facebookStats.engagement}</div>
              <div className="text-sm text-gray-600">Engagement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{facebookStats.reach}</div>
              <div className="text-sm text-gray-600">Monthly Reach</div>
            </div>
          </div>
        </div>

        {/* Create Post */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-start gap-4">
            <img
              src="/hero.jpg"
              alt="Your Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  <label className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                    <Image className="w-5 h-5" />
                    <span className="text-sm">Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                    <Video className="w-5 h-5" />
                    <span className="text-sm">Video</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                    <Smile className="w-5 h-5" />
                    <span className="text-sm">Feeling</span>
                  </button>
                </div>
                <button
                  onClick={handleSubmitPost}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post
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
                    •••
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <p className="text-gray-900 mb-4">{post.content}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full rounded-lg mb-4"
                  />
                )}
              </div>

              {/* Post Actions */}
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-4">
                    <span>{post.likes.toLocaleString()} likes</span>
                    <span>{post.comments} comments</span>
                    <span>{post.shares} shares</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      post.isLiked 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Like
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    Comment
                  </button>
                  <button
                    onClick={() => handleShare(post)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={() => handleBookmark(post.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      post.isBookmarked 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 mt-8 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Follow Us on Facebook</h3>
          <p className="text-blue-100 mb-4">
            Stay updated with the latest deals, product launches, and exclusive offers!
          </p>
          <button
            onClick={() => window.open('https://facebook.com/nexora', '_blank')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Facebook className="w-5 h-5" />
            Visit Our Facebook Page
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 