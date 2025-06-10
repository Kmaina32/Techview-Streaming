// src/pages/Playlist.jsx
import React from 'react';
import './Playlist.css';

const playlists = [
  {
    id: 1,
    name: 'Morning Motivation',
    creator: 'Techview Music',
    tracks: 12,
    cover: '/assets/playlist1.jpg',
  },
  {
    id: 2,
    name: 'Afro Fusion Vibes',
    creator: 'DJ Max',
    tracks: 20,
    cover: '/assets/playlist2.jpg',
  },
  {
    id: 3,
    name: 'Deep Focus',
    creator: 'Focus Team',
    tracks: 15,
    cover: '/assets/playlist3.jpg',
  },
];

export default function Playlist() {
  const handlePlay = (playlistName) => {
    alert(`Now playing: ${playlistName}`);
  };

  return (
    <div className="playlist-page">
      <h2 className="playlist-title">Playlists</h2>
      <div className="playlist-grid">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist-card">
            <div className="playlist-image-container">
              <img
                src={playlist.cover}
                alt={playlist.name}
                className="playlist-image"
              />
              <button
                className="play-button"
                onClick={() => handlePlay(playlist.name)}
              >
                ▶
              </button>
            </div>
            <div className="playlist-details">
              <h3>{playlist.name}</h3>
              <p>By {playlist.creator}</p>
              <span>{playlist.tracks} tracks</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
