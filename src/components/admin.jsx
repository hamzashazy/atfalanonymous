import React, { useState, useEffect } from 'react';
import {
  Search,
  RefreshCw,
  Grid,
  List,
  MessageSquare,
  Hash,
  AlertCircle,
  Inbox,
} from 'lucide-react';

const AdminViewMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('cards');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found. Please log in again.');
        setLoading(false);
        return;
      }

      const response = await fetch(
        'https://atfalanonymous-backend.vercel.app/api/message/',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Unable to load messages. Please try again later.');
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMessages = [...filteredMessages].sort((a, b) => {
    if (sortOrder === 'newest') {
      return (b.id || 0) - (a.id || 0);
    }
    return (a.id || 0) - (b.id || 0);
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchMessages();
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-pulse"></div>
            <div className="w-20 h-20 border-4 border-transparent border-t-purple-600 rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-lg font-semibold text-gray-700 mt-4 animate-pulse">
            Loading messages...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-gradient-to-r from-purple-500 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Atfal Educational Institute
                </h1>
                <p className="text-base text-gray-600 font-medium mt-1">
                  Admin Message Center 📚
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-bold px-5 py-2 rounded-full shadow-lg animate-bounce">
                {messages.length} Messages
              </div>
              <div className="text-2xl animate-pulse">✨</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-purple-100">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md relative group">
              <input
                type="text"
                placeholder="🔍 Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-lg font-medium border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all duration-300 bg-gradient-to-r from-purple-50 to-pink-50"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-purple-500 group-focus-within:animate-pulse" />
            </div>

            {/* Sort */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-5 py-3 text-lg font-medium border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 outline-none bg-gradient-to-r from-purple-50 to-pink-50 cursor-pointer hover:shadow-lg transition-all"
            >
              <option value="newest">⬆️ Newest First</option>
              <option value="oldest">⬇️ Oldest First</option>
            </select>

            {/* View Mode */}
            <div className="flex bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-1.5 shadow-inner">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  viewMode === 'cards'
                    ? 'bg-white text-purple-600 shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <Grid className="w-4 h-4" /> Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  viewMode === 'table'
                    ? 'bg-white text-purple-600 shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <List className="w-4 h-4" /> Table
              </button>
            </div>

            {/* Refresh */}
            <button
              onClick={handleRefresh}
              className="px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <RefreshCw
                className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`}
              />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Messages Display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {error ? (
          <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 shadow-lg flex items-center">
            <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
            <p className="text-red-800 font-semibold text-lg">{error}</p>
          </div>
        ) : sortedMessages.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center border-2 border-purple-100">
            <Inbox className="h-20 w-20 text-purple-300 mx-auto mb-4" />
            <p className="text-gray-600 text-xl font-bold">No messages found</p>
            <p className="text-gray-400 text-lg mt-2">
              {searchTerm
                ? 'Try adjusting your search terms 🔍'
                : 'Messages will appear here when submitted ✨'}
            </p>
          </div>
        ) : viewMode === 'cards' ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedMessages.map((msg, index) => (
              <div
                key={msg.id || index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-purple-100 hover:border-purple-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                    {msg.title || 'Untitled'}
                  </h3>
                  <span className="text-sm font-bold text-purple-500 ml-2 flex-shrink-0 bg-purple-50 px-2 py-1 rounded-lg">
                    #{msg.id || index + 1}
                  </span>
                </div>
                <p className="text-gray-600 text-base leading-relaxed font-medium">
                  {msg.message || 'No message content'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-purple-100">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-purple-500 to-pink-500">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                      Message
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-100">
                  {sortedMessages.map((msg, index) => (
                    <tr
                      key={msg.id || index}
                      className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-lg">
                          #{msg.id || index + 1}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-base font-semibold text-gray-900 max-w-xs truncate">
                          {msg.title || 'Untitled'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-md font-medium">
                          {msg.message || 'No message content'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminViewMessages;
