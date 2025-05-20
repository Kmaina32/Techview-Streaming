import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/api';
import { AuthContext } from '../context/AuthContext';

const PodcastDetail = () => {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);
  const [podcast, setPodcast] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState(null);

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

    const fetchComments = async () => {
      try {
        const response = await axios.get('/comments/' + id);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchPodcast();
    fetchComments();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    setCommentLoading(true);
    setCommentError(null);
    try {
      const response = await axios.post(
        '/comments/' + id,
        { content: commentContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([response.data, ...comments]);
      setCommentContent('');
    } catch (error) {
      setCommentError('Failed to add comment.');
      console.error('Add comment error:', error);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    try {
      await axios.delete('/comments/' + commentId, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(comments.filter(c => c.id !== commentId));
    } catch (error) {
      console.error('Delete comment error:', error);
      alert('Failed to delete comment.');
    }
  };

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

      {/* Comments Section */}
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>
        {user ? (
          <form onSubmit={handleAddComment} className="mb-4">
            <textarea
              className="w-full p-2 border rounded resize-none"
              rows="3"
              placeholder="Add a comment..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              disabled={commentLoading}
            />
            {commentError && <p className="text-red-600">{commentError}</p>}
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={commentLoading}
            >
              {commentLoading ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        ) : (
          <p className="italic text-gray-700">Please log in to add comments.</p>
        )}

        {comments.length === 0 ? (
          <p className="italic text-gray-700">No comments yet.</p>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className="mb-3 border-b pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold">{comment.user.username}</span>{' '}
                    <span className="text-gray-600 text-sm">
                      {new Date(comment.created_at).toLocaleString()}
                    </span>
                  </div>
                  {user && user.id === comment.user.id && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="mt-1">{comment.content}</p>
              </li>
            ))}
          </ul>
        )}
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
