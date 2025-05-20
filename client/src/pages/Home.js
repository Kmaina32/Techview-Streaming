import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import PodcastCard from '../components/PodcastCard';

const Home = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get('/podcasts/');
        setPodcasts(response.data);
        setFilteredPodcasts(response.data);
        const cats = ['All', ...new Set(response.data.map(p => p.category || 'Uncategorized'))];
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPodcasts();
  }, []);

  useEffect(() => {
    let filtered = podcasts;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => (p.category || 'Uncategorized') === selectedCategory);
    }
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredPodcasts(filtered);
  }, [selectedCategory, searchQuery, podcasts]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 1) {
      const suggestions = podcasts
        .filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
        .map(p => p.title);
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSearchSuggestions([]);
  };

  if (loading) {
    return <div className="p-4 text-white">Loading podcasts...</div>;
  }

  return (
    <div className="p-4 text-white">
      {/* Hero Featured Podcast */}
      {podcasts.length > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 rounded shadow-lg">
          <h2 className="text-2xl font-serif font-bold mb-2">Featured Podcast</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            {podcasts[0].thumbnail && (
              <img
                src={podcasts[0].thumbnail}
                alt={podcasts[0].title}
                className="w-full md:w-48 h-48 object-cover rounded"
              />
            )}
            <div>
              <h3 className="text-xl font-serif font-semibold">{podcasts[0].title}</h3>
              <p className="mt-2 text-gray-300">{podcasts[0].description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-4 relative max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search podcasts..."
          className="w-full border border-indigo-700 rounded p-2 bg-indigo-900 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
        />
        {searchSuggestions.length > 0 && (
          <ul className="absolute z-10 bg-indigo-900 border border-indigo-700 w-full mt-1 rounded max-h-40 overflow-auto text-white">
            {searchSuggestions.map((suggestion, idx) => (
              <li
                key={idx}
                className="p-2 hover:bg-orange-500 cursor-pointer transition"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Category Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full border font-semibold ${
              selectedCategory === category
                ? 'bg-indigo-700 text-white border-indigo-700'
                : 'border-indigo-500 text-indigo-300 hover:bg-indigo-600 hover:text-white transition'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Continue Listening and Popular This Week Sections (placeholders) */}
      <div className="mb-6">
        <h2 className="text-xl font-serif font-semibold mb-2">Continue Listening</h2>
        <p className="text-indigo-300">Feature coming soon...</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-serif font-semibold mb-2">Popular This Week</h2>
        <p className="text-indigo-300">Feature coming soon...</p>
      </div>

      {/* Podcast Grid */}
      {filteredPodcasts.length === 0 ? (
        <p>No podcasts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredPodcasts.map(podcast => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
