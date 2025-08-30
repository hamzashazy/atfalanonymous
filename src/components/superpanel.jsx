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

  const quotes = [
    { text: "Your voice matters. Every suggestion shapes a better tomorrow for our children.", author: "Anonymous" },
    { text: "In the spirit of growth, we speak. In the spirit of unity, we listen.", author: "Tarbiyah Wisdom" },
    { text: "Small changes create ripples that transform entire communities.", author: "Educational Leader" },
    { text: "Behind every improvement is someone brave enough to speak up.", author: "Change Maker" },
    { text: "Together, we build bridges of understanding and excellence.", author: "Community Voice" }
  ];

  const categories = [
    { id: 'curriculum', label: 'Curriculum & Teaching', icon: '📚', color: 'purple' },
    { id: 'resources', label: 'Resources & Materials', icon: '🎨', color: 'green' },
    { id: 'training', label: 'Training & Development', icon: '🎯', color: 'orange' },
    { id: 'welfare', label: 'Student Welfare', icon: '💝', color: 'pink' },
    { id: 'admin', label: 'Administration', icon: '📋', color: 'blue' },
    { id: 'other', label: 'Other Suggestions', icon: '💡', color: 'yellow' }
  ];

  const themes = {
    blue: 'from-blue-400 to-cyan-400',
    purple: 'from-purple-400 to-pink-400',
    green: 'from-green-400 to-teal-400',
    orange: 'from-orange-400 to-red-400'
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const count = Math.floor(Math.random() * 100) + 150;
    setMessageCount(count);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategorySelect = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      category: categoryId
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.message.trim() || !formData.category) {
      setSubmitStatus({
        show: true,
        type: 'error',
        message: 'Please fill in all fields and select a category'
      });
      setTimeout(() => setSubmitStatus({ show: false, type: '', message: '' }), 3000);
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
          message: '✨ Your voice has been heard! Thank you for making a difference.'
        });
        setFormData({ title: '', message: '', category: '' });
        setMessageCount(prev => prev + 1);
      } else {
        throw new Error('Failed to submit message');
      }
    } catch (error) {
      setSubmitStatus({
        show: true,
        type: 'error',
        message: 'Failed to submit message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus({ show: false, type: '', message: '' }), 5000);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themes[colorTheme]} relative overflow-hidden`}>
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 sm:w-72 h-40 sm:h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-60 sm:w-96 h-60 sm:h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Atfal Voice Portal
            </h1>

            {/* Quote */}
            <div className="min-h-[80px] flex items-center justify-center mb-4">
              <div className="text-center px-2 sm:px-4">
                <p className="text-gray-700 italic text-base sm:text-lg transition-all duration-500">
                  "{quotes[currentQuote].text}"
                </p>
                <p className="text-gray-500 text-xs sm:text-sm mt-2">- {quotes[currentQuote].author}</p>
              </div>
            </div>

            {/* Counter */}
            <div className="flex justify-center items-center gap-2 text-xs sm:text-sm">
              <span className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full">
                {messageCount} voices shared nationwide
              </span>
            </div>
          </div>

          {/* Main Form */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8">
            {/* Categories */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Topic Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    onMouseEnter={() => setHoveredCategory(cat.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 transform ${
                      formData.category === cat.id
                        ? `border-${cat.color}-500 bg-${cat.color}-50 scale-105 shadow-lg`
                        : 'border-gray-200 hover:border-gray-300 hover:scale-102'
                    } ${hoveredCategory === cat.id ? 'animate-pulse' : ''}`}
                  >
                    <div className="text-xl sm:text-2xl mb-1">{cat.icon}</div>
                    <div className="text-xs sm:text-sm font-medium text-gray-700">{cat.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Title Your Thought
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="A brief title for your message..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400"
                  maxLength="100"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Share Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your suggestions, feedback, or ideas..."
                  rows="5"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 resize-none"
                  maxLength="1000"
                />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-3">
                  <p className="text-xs text-gray-500">
                    {formData.message.length}/1000 characters
                  </p>
                  <div className="flex gap-2">
                    {['blue', 'purple', 'green', 'orange'].map((theme) => (
                      <button
                        key={theme}
                        type="button"
                        onClick={() => setColorTheme(theme)}
                        className={`w-5 h-5 rounded-full bg-gradient-to-r ${themes[theme]} ${
                          colorTheme === theme ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                        }`}
                        title={`Switch to ${theme} theme`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 hover:shadow-xl active:scale-95'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending Your Voice...
                  </span>
                ) : (
                  <span className="flex items-center justify-center text-sm sm:text-base">
                    Send Message Anonymously
                    <svg className="w-4 sm:w-5 h-4 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </span>
                )}
              </button>
            </div>

            {/* Status */}
            {submitStatus.show && (
              <div className={`mt-6 p-4 rounded-xl animate-bounce-in ${
                submitStatus.type === 'success' 
                  ? 'bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-300' 
                  : 'bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300'
              }`}>
                <div className="flex items-center">
                  {submitStatus.type === 'success' ? (
                    <span className="text-2xl sm:text-3xl mr-3">🎉</span>
                  ) : (
                    <span className="text-2xl sm:text-3xl mr-3">⚠️</span>
                  )}
                  <p className={`text-xs sm:text-sm font-medium ${
                    submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {submitStatus.message}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 text-center bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-2xl">🔒</span>
                <span className="text-gray-600">100% Anonymous</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-2xl">🌍</span>
                <span className="text-gray-600">Nationwide Impact</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-2xl">💪</span>
                <span className="text-gray-600">Your Voice Matters</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          50% {
            transform: scale(1.05) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default Superpanel;
