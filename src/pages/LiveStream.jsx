import React, { useState, useEffect } from 'react';
import './LiveStream.css'; // we'll create this next

export default function LiveStream() {
  const [viewerCount, setViewerCount] = useState(123); // Placeholder for demo
  const [schedule, setSchedule] = useState([
    { time: '10:00 AM', title: 'Morning News' },
    { time: '12:00 PM', title: 'Tech Talk Live' },
    { time: '4:00 PM', title: 'Music Hour' },
    { time: '8:00 PM', title: 'Evening Showdown' },
  ]);

  // Simulate dynamic viewer count update
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 5 - 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-container">
      <h1 className="title">Live TV</h1>
      <p className="subtitle">Watch our live broadcast stream directly from here.</p>

      {/* Live Video */}
      <div className="video-wrapper">
        <video controls autoPlay muted className="live-video">
          <source src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" type="application/x-mpegURL" />
          Your browser does not support live streaming.
        </video>
      </div>

      {/* Viewer Count */}
      <div className="viewer-count">
        🔴 {viewerCount} viewers watching
      </div>

      {/* Schedule */}
      <div className="schedule">
        <h2>Upcoming Shows</h2>
        <ul>
          {schedule.map((show, index) => (
            <li key={index}>
              <strong>{show.time}</strong> – {show.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Box UI */}
      <div className="chat-box">
        <h2>Live Chat</h2>
        <div className="chat-messages">
          <p><strong>User1:</strong> Great stream!</p>
          <p><strong>User2:</strong> Can't wait for the next show.</p>
        </div>
        <input type="text" className="chat-input" placeholder="Type a message..." />
      </div>
    </div>
  );
}
