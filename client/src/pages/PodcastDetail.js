import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/api';

const PodcastDetail = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const response = await axios.get('/podcasts/' + id);
        setPodcast(response.data);

        // Fetch related episodes by category or tags
        if (response.data.category) {
          const relatedResponse = await axios.get('/podcasts/', {
            params: { category: response.data.category }
          });
          // Exclude current podcast
          setRelated(relatedResponse.data.filter(p => p.id !== response.data.id).slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching podcast:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPodcast();
  }, [id]);

  if (loading) {
    return <div className="p-4">Loading podcast details...</div>;
  }

  if (!podcast) {
    return <div className="p-4">Podcast not found.</div>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-4">{podcast.title}</h2>
      {podcast.thumbnail && (
        <img
          src={podcast.thumbnail}
          alt={podcast.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <p className="mb-4">{podcast.description}</p>

      {/* Episode Transcript Placeholder */}
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h3 className="text-xl font-semibold mb-2">Episode Transcript</h3>
        <p className="text-gray-700 italic">Transcript will be available soon.</p>
      </div>

      {/* Audio/Video Player */}
      {podcast.audio_url && (
        <audio controls className="w-full mb-4">
          <source src={podcast.audio_url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      {podcast.video_url && (
        <video controls className="w-full mb-4" height="360">
          <source src={podcast.video_url} type="video/mp4" />
          Your browser does not support the video element.
        </video>
      )}

      {/* Host Profile Link */}
      {podcast.user && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Host:</h3>
          <Link to="/profile" className="text-blue-600 hover:underline">
            {podcast.user.username}
          </Link>
        </div>
      )}

      {/* Comments Section Placeholder */}
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h3 className="text-xl font-semibold mb-2">Comments</h3>
        <p className="text-gray-700 italic">Comments feature coming soon.</p>
      </div>

      {/* Related Episodes */}
      {related.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Related Episodes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((p) => (
              <Link
                key={p.id}
                to={'/podcast/' + p.id}
                className="block p-4 border rounded hover:shadow"
              >
                <h4 className="font-semibold">{p.title}</h4>
                <p className="text-sm text-gray-600 truncate">{p.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PodcastDetail;
