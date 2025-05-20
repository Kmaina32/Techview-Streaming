import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/api';
import PodcastCard from '../components/PodcastCard';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/users/profile');
        setPodcasts(response.data.podcasts || []);
        setProfile(response.data.user || null);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [user, navigate]);

  const handleDelete = async (podcastId) => {
    if (!window.confirm('Are you sure you want to delete this podcast?')) return;
    try {
      await axios.delete(`/podcasts/${podcastId}`);
      setPodcasts(podcasts.filter(p => p.id !== podcastId));
    } catch (error) {
      alert('Failed to delete podcast.');
    }
  };

  if (loading) {
    return <div className="p-4">Loading your profile...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {profile && (
        <div className="mb-6 flex items-center gap-4">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.username}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-600">
              {profile.username.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold">{profile.username}</h1>
            {profile.bio && <p className="text-gray-700">{profile.bio}</p>}
            <div className="mt-2 flex gap-4">
              {profile.social_links?.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {link.platform}
                </a>
              ))}
            </div>
            <div className="mt-2 text-gray-600">
              <span className="mr-4">Followers: {profile.followers_count || 0}</span>
              <span className="mr-4">Following: {profile.following_count || 0}</span>
              <span>Total Plays: {profile.total_plays || 0}</span>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Your Podcasts</h2>
      {podcasts.length === 0 ? (
        <p>You have not uploaded any podcasts yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="relative group">
              <PodcastCard podcast={podcast} />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button
                  onClick={() => navigate(`/upload?edit=${podcast.id}`)}
                  className="bg-yellow-400 text-black px-2 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(podcast.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
