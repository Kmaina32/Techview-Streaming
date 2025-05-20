import React, { useState, useContext, useRef, useEffect } from 'react';
import axios from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [tags, setTags] = useState('');
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const audioInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleDrop = (e, setFile) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!title || !description || (!audioFile && !videoFile)) {
      setError('Please provide title, description, and at least one media file.');
      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (audioFile) formData.append('audio_file', audioFile);
    if (videoFile) formData.append('video_file', videoFile);
    if (thumbnail) formData.append('thumbnail', thumbnail);
    if (tags) formData.append('tags', tags);

    setUploading(true);
    setUploadProgress(0);
    try {
      await axios.post('/podcasts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      navigate('/');
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Upload Podcast</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded"
          rows={4}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        <label
          className="block border border-dashed border-gray-400 p-4 rounded cursor-pointer text-center"
          onDrop={(e) => handleDrop(e, setAudioFile)}
          onDragOver={handleDragOver}
          htmlFor="audioFileInput"
        >
          {audioFile ? (
            <p>Audio File: {audioFile.name}</p>
          ) : (
            <p>Drag and drop audio file here, or click to select</p>
          )}
          <input
            id="audioFileInput"
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files[0])}
            className="hidden"
            ref={audioInputRef}
          />
        </label>
        <label
          className="block border border-dashed border-gray-400 p-4 rounded cursor-pointer text-center"
          onDrop={(e) => handleDrop(e, setVideoFile)}
          onDragOver={handleDragOver}
          htmlFor="videoFileInput"
        >
          {videoFile ? (
            <p>Video File: {videoFile.name}</p>
          ) : (
            <p>Drag and drop video file here, or click to select</p>
          )}
          <input
            id="videoFileInput"
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="hidden"
            ref={videoInputRef}
          />
        </label>
        <label
          className="block border border-dashed border-gray-400 p-4 rounded cursor-pointer text-center"
          onDrop={(e) => handleDrop(e, setThumbnail)}
          onDragOver={handleDragOver}
          htmlFor="thumbnailInput"
        >
          {thumbnail ? (
            <p>Thumbnail Image: {thumbnail.name}</p>
          ) : (
            <p>Drag and drop thumbnail image here, or click to select</p>
          )}
          <input
            id="thumbnailInput"
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="hidden"
            ref={thumbnailInputRef}
          />
        </label>
        {uploading && (
          <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
            <div
              className="bg-blue-600 h-4"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default Upload;
