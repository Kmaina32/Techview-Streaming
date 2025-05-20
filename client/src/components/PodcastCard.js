import React from 'react';
import { Link } from 'react-router-dom';

const PodcastCard = ({ podcast }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 rounded-lg shadow-lg p-4 flex flex-col transition-transform transform hover:scale-105">
      {podcast.thumbnail && (
        <img
          src={podcast.thumbnail}
          alt={podcast.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      <h2 className="text-lg font-serif font-semibold mb-2 truncate text-white">{podcast.title}</h2>
      <p className="text-gray-300 flex-grow truncate">{podcast.description}</p>
      <Link
        to={`/podcasts/${podcast.id}`}
        className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-300"
      >
        View Details
      </Link>
    </div>
  );
};

export default PodcastCard;
