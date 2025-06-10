import { useState } from 'react';
import '../styles/Home.css'; // 👈 Import your styles

export default function Home() {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', search);
  };

  return (
    <div className="home-container">
      <h1 className="text-3xl font-bold mb-6">Welcome to Techview TV</h1>

      {/* Search Container */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search shows, music, movies..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>

      {/* Featured Grid */}
      <div className="featured-grid">
        <div className="featured-block">Featured Content Block</div>
        <div className="featured-block">Featured Content Block</div>
        <div className="featured-block">Featured Content Block</div>
      </div>
    </div>
  );
}


