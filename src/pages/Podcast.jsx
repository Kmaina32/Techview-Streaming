// src/pages/Podcast.jsx
import React from 'react';
import './Podcast.css';

const podcastList = [
  {
    id: 1,
    title: 'Tech Trends Today',
    host: 'Jane Doe',
    duration: '45 min',
    description: 'Explore the latest trends in tech and how they shape our lives.',
    image: '/assets/podcast1.jpg',
  },
  {
    id: 2,
    title: 'CyberTalks',
    host: 'Mike Smith',
    duration: '30 min',
    description: 'A podcast on cybersecurity and online safety tips.',
    image: '/assets/podcast2.jpg',
  },
  {
    id: 3,
    title: 'Startup Stories',
    host: 'Alice Brown',
    duration: '60 min',
    description: 'Inspiring stories from African tech entrepreneurs.',
    image: '/assets/podcast3.jpg',
  },
];

export default function Podcast() {
  const handlePlay = (title) => {
    alert(`Now playing: ${title}`);
  };

  return (
    <div className="podcast-page">
      <h2 className="podcast-title">Podcasts</h2>
      <div className="podcast-grid">
        {podcastList.map((podcast) => (
          <div key={podcast.id} className="podcast-card">
            <div className="podcast-image-container">
              <img src={podcast.image} alt={podcast.title} className="podcast-image" />
              <button
                className="podcast-play-button"
                onClick={() => handlePlay(podcast.title)}
              >
                ▶
              </button>
            </div>
            <div className="podcast-details">
              <h3>{podcast.title}</h3>
              <p className="host">Hosted by {podcast.host}</p>
              <p className="description">{podcast.description}</p>
              <span className="duration">{podcast.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
