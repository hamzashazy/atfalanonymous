import React, { useState, useEffect } from 'react';

const Superpanel = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    category: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    show: false,
    type: '',
    message: ''
  });
  const [currentQuote, setCurrentQuote] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [messageCount, setMessageCount] = useState(0);
  const [colorTheme, setColorTheme] = useState('blue');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState(false);
  const [particlesVisible, setParticlesVisible] = useState(false);

  const quotes = [
    { text: "Your voice matters. Every suggestion shapes a better tomorrow for our children.", author: "Anonymous" },
    { text: "In the spirit of growth, we speak. In the spirit of unity, we listen.", author: "Tarbiyah Wisdom" },
    { text: "Small changes create ripples that transform entire communities.", author: "Educational Leader" },
    { text: "Behind every improvement is someone brave enough to speak up.", author: "Change Maker" },
    { text: "Together, we build bridges of understanding and excellence.", author: "Community Voice" },
    { text: "Every feedback is a gift that helps us grow stronger together.", author: "Team Leader" },
    { text: "Your anonymous voice creates visible change.", author: "Development Officer" }
  ];

  const categories = [
    { id: 'curriculum', label: 'Curriculum & Teaching', icon: '📚', color: 'purple', description: 'Educational content & methods' },
    { id: 'resources', label: 'Resources & Materials', icon: '🎨', color: 'green', description: 'Tools & learning materials' },
    { id: 'training', label: 'Training & Development', icon: '🎯', color: 'orange', description: 'Staff growth & skills' },
    { id: 'welfare', label: 'Student Welfare', icon: '💝', color: 'pink', description: 'Child wellbeing & safety' },
    { id: 'admin', label: 'Administration', icon: '📋', color: 'blue', description: 'Operational matters' },
    { id: 'other', label: 'Other Suggestions', icon: '💡', color: 'yellow', description: 'General improvements' }
  ];

  const themes = {
    blue: 'from-blue-500 via-cyan-400 to-teal-400',
    purple: 'from-purple-500 via-pink-400 to-rose-400',
    green: 'from-green-500 via-emerald-400 to-teal-400',
    orange: 'from-orange-500 via-amber-400 to-yellow-400',
    rainbow: 'from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400'
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const count = Math.floor(Math.random() * 500) + 1500;
    setMessageCount(count);
    
    // Increment counter animation
    const timer = setInterval(() => {
      setMessageCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (value.length > 0 && !isTyping) {
      setIsTyping(true);
      setParticlesVisible(true);
      setTimeout(() => setParticlesVisible(false), 2000);
    } else if (value.length === 0) {
      setIsTyping(false);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      category: categoryId
    }));
    // Trigger a small celebration animation
    setParticlesVisible(true);
    setTimeout(() => setParticlesVisible(false), 1000);
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.message.trim() || !formData.category) {
      setSubmitStatus({
        show: true,
        type: 'error',
        message: '⚠️ Please complete all fields and select a category to share your voice'
      });
      setTimeout(() => setSubmitStatus({ show: false, type: '', message: '' }), 4000);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/message/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus({
          show: true,
          type: 'success',
          message: '🎉 Success! Your voice has been heard and will make a difference!'
        });
        setFormData({ title: '', message: '', category: '' });
        setMessageCount(prev => prev + 1);
        setParticlesVisible(true);
        setTimeout(() => setParticlesVisible(false), 3000);
      } else {
        throw new Error('Failed to submit message');
      }
    } catch (error) {
      setSubmitStatus({
        show: true,
        type: 'error',
        message: '❌ Connection issue. Please try again in a moment.'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus({ show: false, type: '', message: '' }), 6000);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themes[colorTheme]} relative overflow-hidden`}>
      {/* Interactive Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x * 0.05}px`,
            top: `${mousePosition.y * 0.05}px`,
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Celebration particles */}
        {particlesVisible && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-7xl">
          {/* Enhanced Header */}
          <div className="text-center mb-10 bg-white/95 backdrop-blur-lg rounded-3xl p-8 lg:p-12 shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
            <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 animate-gradient">
              Atfal Voice Portal
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 font-medium">
              Your Safe Space for Anonymous Feedback & Suggestions
            </p>

            {/* Animated Quote Display */}
            <div className="min-h-[100px] flex items-center justify-center mb-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6">
              <div className="text-center">
                <p className="text-xl lg:text-2xl text-gray-700 italic font-light transition-all duration-1000 ease-in-out">
                  "{quotes[currentQuote].text}"
                </p>
                <p className="text-lg text-gray-500 mt-3 font-medium">— {quotes[currentQuote].author}</p>
              </div>
            </div>

            {/* Live Statistics */}
            <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-full text-lg lg:text-xl font-bold shadow-lg transform hover:scale-110 transition-transform">
                <span className="animate-pulse">🔥</span> {messageCount.toLocaleString()} voices shared
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-lg lg:text-xl font-bold shadow-lg transform hover:scale-110 transition-transform">
                <span>🌍</span> 50+ Locations Active
              </div>
            </div>
          </div>

          {/* Main Form Container */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 lg:p-12">
            {/* Category Selection Grid */}
            <div className="mb-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 text-center">
                What would you like to discuss?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    onMouseEnter={() => setHoveredCategory(cat.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className={`relative p-6 lg:p-8 rounded-2xl border-3 transition-all duration-300 transform group ${
                      formData.category === cat.id
                        ? `border-${cat.color}-500 bg-gradient-to-br from-${cat.color}-50 to-${cat.color}-100 scale-105 shadow-2xl`
                        : 'border-gray-200 hover:border-gray-400 hover:scale-105 hover:shadow-xl bg-white'
                    }`}
                  >
                    <div className="text-4xl lg:text-5xl mb-3 transform group-hover:scale-125 transition-transform">
                      {cat.icon}
                    </div>
                    <div className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                      {cat.label}
                    </div>
                    <div className="text-sm lg:text-base text-gray-600">
                      {cat.description}
                    </div>
                    {formData.category === cat.id && (
                      <div className="absolute top-2 right-2">
                        <span className="text-2xl animate-bounce">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {/* Title Input */}
              <div className="group">
                <label htmlFor="title" className="block text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                  Give your message a title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="E.g., Suggestion for better learning materials..."
                  className="w-full px-6 py-4 lg:px-8 lg:py-5 text-lg lg:text-xl border-3 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 group-hover:shadow-lg"
                  maxLength="100"
                />
                <p className="text-sm lg:text-base text-gray-500 mt-2 text-right">
                  {formData.title.length}/100 characters
                </p>
              </div>

              {/* Message Textarea */}
              <div className="group">
                <label htmlFor="message" className="block text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                  Share your thoughts in detail
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us what's on your mind. Your feedback helps us improve our programs for all Atfal members across the country..."
                  rows="8"
                  className="w-full px-6 py-4 lg:px-8 lg:py-5 text-lg lg:text-xl border-3 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 resize-none group-hover:shadow-lg"
                  maxLength="2000"
                />
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-3">
                    {isTyping && (
                      <span className="text-green-500 text-lg animate-pulse flex items-center gap-2">
                        <span>✍️</span> Writing...
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm lg:text-base text-gray-500">
                      {formData.message.length}/2000
                    </p>
                    <div className="flex gap-2">
                      {Object.keys(themes).map((theme) => (
                        <button
                          key={theme}
                          type="button"
                          onClick={() => setColorTheme(theme)}
                          className={`w-8 h-8 rounded-full bg-gradient-to-r ${themes[theme]} transform hover:scale-125 transition-all ${
                            colorTheme === theme ? 'ring-4 ring-offset-2 ring-gray-400 scale-125' : ''
                          }`}
                          title={`Switch to ${theme} theme`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-6 lg:py-8 px-8 rounded-2xl text-xl lg:text-2xl font-bold text-white transition-all duration-300 transform ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 hover:scale-[1.02] hover:shadow-2xl active:scale-95 animate-gradient'
                } shadow-xl`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-8 w-8 mr-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending Your Anonymous Message...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <span>🚀</span>
                    Send Message Anonymously
                    <span>🔒</span>
                  </span>
                )}
              </button>
            </div>

            {/* Status Message */}
            {submitStatus.show && (
              <div className={`mt-8 p-6 rounded-2xl animate-slide-up ${
                submitStatus.type === 'success' 
                  ? 'bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-3 border-green-400' 
                  : 'bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 border-3 border-red-400'
              }`}>
                <p className={`text-xl lg:text-2xl font-bold text-center ${
                  submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {submitStatus.message}
                </p>
              </div>
            )}
          </div>

          {/* Enhanced Footer */}
          <div className="mt-10 bg-white/90 backdrop-blur-lg rounded-3xl p-8 lg:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="transform hover:scale-110 transition-transform">
                <span className="text-5xl lg:text-6xl block mb-3">🔒</span>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">100% Anonymous</h3>
                <p className="text-base lg:text-lg text-gray-600">Your identity is completely protected</p>
              </div>
              <div className="transform hover:scale-110 transition-transform">
                <span className="text-5xl lg:text-6xl block mb-3">🌍</span>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">Nationwide Impact</h3>
                <p className="text-base lg:text-lg text-gray-600">Your feedback reaches all branches</p>
              </div>
              <div className="transform hover:scale-110 transition-transform">
                <span className="text-5xl lg:text-6xl block mb-3">💪</span>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">Make a Difference</h3>
                <p className="text-base lg:text-lg text-gray-600">Every voice shapes our future</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-100px) scale(0.5);
            opacity: 0.5;
          }
        }
        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default Superpanel;