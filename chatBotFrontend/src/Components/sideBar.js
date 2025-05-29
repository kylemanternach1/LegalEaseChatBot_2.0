import React from 'react';
import './sideBar.css';

export default function SideBar() {
  return (
    <div className="sidebar">
      <button className="logo">📜</button>
      <button className="sidebar-btn">
        <span className="icon">＋</span>
        <span className="label">New</span>
      </button>
      <span className="label">History</span>
    </div>
  );
};