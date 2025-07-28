"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, ExternalLink, Heart, MessageCircle, Share2, 
  Repeat, Bookmark, Send, Image, Video, Smile, MapPin,
  Calendar, Users, TrendingUp, Award, Globe, Zap, Target,
  CheckCircle, Star, Eye, Download, Facebook, Instagram,
  Twitter, Youtube, Linkedin, Phone, Mail, Clock
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const twitterPosts = [
  {
    id: 1,
    content: "🎉 2 MILLION customers! Thank you for trusting Nexora with your shopping needs. We're just getting started! #Nexora #Milestone #ThankYou",
    author: "Nexora",
    authorHandle: "@nexora_official",
    authorAvatar: "/hero.jpg",
    timestamp: "2h",
    likes: 1247,
    retweets: 89,
    replies: 156,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false,
    type: "tweet"
  },
  {
    id: 2,
    content: "📱 New app alert! Download the Nexora mobile app for exclusive deals and seamless shopping. Link in bio! #NexoraApp #MobileFirst #Shopping",
    author: "Nexora",
    authorHandle: "@nexora_official",
    authorAvatar: "/hero.jpg",
    timestamp: "1d",
    likes: 892,
    retweets: 67,
    replies: 123,
    isLiked: true,
    isRetweeted: false,
    isBookmarked: false,
    type: "tweet"
  },
  {
    id: 3,
    content: "⚡ FLASH SALE: Up to 70% off on electronics! Limited time only. Don't miss out! #FlashSale #Electronics #Deals #ShopNow",
    author: "Nexora",
    authorHandle: "@nexora_official",
    authorAvatar: "/hero.jpg",
    timestamp: "3d",
    likes: 2156,
    retweets: 234,
    replies: 567,
    isLiked: false,
    isRetweeted: true,
    isBookmarked: true,
    type: "tweet"
  },
  {
    id: 4,
    content: "🤖 Our AI recommendation engine is getting smarter! It learns from your preferences to suggest products you'll actually love. Try it out! #AI #Recommendations #SmartShopping",
    author: "Nexora",
    authorHandle: "@nexora_official",
    authorAvatar: "/hero.jpg",
    timestamp: "1w",
    likes: 567,
    retweets: 45,
    replies: 78,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false,
    type: "tweet"
  },
  {
    id: 5,
    content: "💡 Pro tip: Use our price comparison feature to save big on your purchases. One customer saved ₹15,000 on a laptop! #MoneySaving #SmartShopping #Tips",
    author: "Nexora",
    authorHandle: "@nexora_official",
    authorAvatar: "/hero.jpg",
    timestamp: "2w",
    likes: 1234,
    retweets: 156,
    replies: 234,
    isLiked: true,
    isRetweeted: false,
    isBookmarked: false,
    type: "tweet"
  }
];

const twitterStats = {
  followers: "856K",
  following: "245",
  tweets: "12.4K",
  engagement: "6.2%"
};

export default function TwitterPage() {
  const router = useRouter();
  const [posts, setPosts] = useState(twitterPosts);
  const [newTweet, setNewTweet] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 280;

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

  const handleRetweet = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isRetweeted: !post.isRetweeted,
          retweets: post.isRetweeted ? post.retweets - 1 : post.retweets + 1
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
        title: "Nexora Tweet",
        text: post.content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${post.content}\n\nCheck out Nexora on Twitter: ${window.location.href}`);
      toast.success('Tweet link copied to clipboard!');
    }
  };

  const handleSubmitTweet = () => {
    if (!newTweet.trim()) {
      toast.error('Please write something to tweet!');
      return;
    }

    if (newTweet.length > maxChars) {
      toast.error(`Tweet is too long! Maximum ${maxChars} characters allowed.`);
      return;
    }

    const newTweetObj = {
      id: posts.length + 1,
      content: newTweet,
      author: "You",
      authorHandle: "@your_handle",
      authorAvatar: "/hero.jpg",
      timestamp: "now",
      likes: 0,
      retweets: 0,
      replies: 0,
      isLiked: false,
      isRetweeted: false,
      isBookmarked: false,
      type: "tweet"
    };

    setPosts([newTweetObj, ...posts]);
    setNewTweet("");
    setSelectedImage(null);
    setCharCount(0);
    toast.success('Tweet posted successfully!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleTweetChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewTweet(value);
    setCharCount(value.length);
  };

  return (
    <div className="min-h-screen bg-gray-100">
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
              <div className="p-2 bg-blue-400 rounded-lg">
                <Twitter className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Nexora on Twitter</h1>
                <p className="text-gray-600 text-sm">Follow us for updates and deals</p>
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
              <div className="text-2xl font-bold text-blue-400">{twitterStats.followers}</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{twitterStats.following}</div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{twitterStats.tweets}</div>
              <div className="text-sm text-gray-600">Tweets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{twitterStats.engagement}</div>
              <div className="text-sm text-gray-600">Engagement</div>
            </div>
          </div>
        </div>

        {/* Create Tweet */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-start gap-4">
            <img
              src="/hero.jpg"
              alt="Your Avatar"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={newTweet}
                onChange={handleTweetChange}
                placeholder="What's happening?"
                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
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
                  <label className="flex items-center gap-2 text-blue-400 hover:text-blue-500 cursor-pointer">
                    <Image className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <button className="flex items-center gap-2 text-blue-400 hover:text-blue-500">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="flex items-center gap-2 text-blue-400 hover:text-blue-500">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`text-sm ${charCount > maxChars ? 'text-red-500' : 'text-gray-500'}`}>
                    {charCount}/{maxChars}
                  </div>
                  <button
                    onClick={handleSubmitTweet}
                    disabled={!newTweet.trim() || newTweet.length > maxChars}
                    className="px-6 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tweets Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border p-4">
              {/* Tweet Header */}
              <div className="flex items-start gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900">{post.author}</span>
                    <span className="text-gray-500">{post.authorHandle}</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-500">{post.timestamp}</span>
                  </div>
                  
                  {/* Tweet Content */}
                  <p className="text-gray-900 mb-4 text-lg leading-relaxed">{post.content}</p>
                  
                  {/* Tweet Actions */}
                  <div className="flex items-center justify-between max-w-md">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{post.replies}</span>
                    </button>
                    <button
                      onClick={() => handleRetweet(post.id)}
                      className={`flex items-center gap-2 transition-colors ${
                        post.isRetweeted 
                          ? 'text-green-500' 
                          : 'text-gray-500 hover:text-green-500'
                      }`}
                    >
                      <Repeat className="w-5 h-5" />
                      <span className="text-sm">{post.retweets}</span>
                    </button>
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 transition-colors ${
                        post.isLiked 
                          ? 'text-red-500' 
                          : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button
                      onClick={() => handleShare(post)}
                      className="flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleBookmark(post.id)}
                      className={`flex items-center gap-2 transition-colors ${
                        post.isBookmarked 
                          ? 'text-blue-500' 
                          : 'text-gray-500 hover:text-blue-500'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl p-6 mt-8 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Follow Us on Twitter</h3>
          <p className="text-blue-100 mb-4">
            Get real-time updates on deals, product launches, and exclusive offers!
          </p>
          <button
            onClick={() => window.open('https://twitter.com/nexora_official', '_blank')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-400 rounded-full hover:bg-gray-50 transition-colors"
          >
            <Twitter className="w-5 h-5" />
            Follow @nexora_official
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 