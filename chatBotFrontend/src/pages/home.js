import React, { useState, useEffect } from 'react';
import './home.css';
import SideBar from '../Components/sideBar.js';
import SearchBar from '../Components/searchBar.js';

export default function ChatHome() {
  const [message, setMessage] = useState('');
  const [posts, setPosts]     = useState([]);
 
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(API_URL + '/api/posts')
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => {
        console.log('Fetched posts:', data);
        setPosts(data);
      })
      .catch(err => console.error('Error fetching posts:', err));
  }, [API_URL]);

  const handleSend = async () => {
    console.log('Sending message:', message);

    try {
        const res = await fetch(API_URL + '/api/chat/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: message }),
      });
      if (!res.ok) throw new Error(res.statusText);
      const { url } = await res.json();
      console.log('Story URL:', url);
      window.open(url, '_self')
    } catch (err) {
      console.error('API error', err);
    }
  setMessage('');
  };


  const handleUpload = (e) => {
  const file = e.target.files[0];
  console.log('Uploaded:', file);
  };

  return (
    <div className="app-container">
      <SideBar />
      <div className="main-content">
        <h1 className="title">
          Welcome to <span className="highlight">LegalEase</span>
        </h1>
        <h2 className="subtitle">Your AI Legal Assistant</h2>
        <SearchBar />
      </div>
    </div>
  );
};
