import React from 'react';
import { Link } from 'react-router-dom';

const PodcastCard = ({ podcast }) => {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      {podcast.thumbnail && (
        <img
          src={podcast.thumbnail}
          alt={podcast.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      <h2 className="text-lg font-semibold mb-2">{podcast.title}</h2>
      <p className="text-gray-700 flex-grow">{podcast.description}</p>
      <Link
        to={`/podcasts/${podcast.id}`}
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
};

export default PodcastCard;
