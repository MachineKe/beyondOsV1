// AppContent.js
import React, { useState, useEffect } from 'react';
import appData from '../Assets/apps.json';
import './Desktop.css';

function AppContent({ openWindow }) {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    setApps(appData)
  }, []);

  return (
    <div className="app-content">
      <h1>BeyondOs</h1>
      <div className='buttons-container'>
        {apps.map((app, index) => (
          <div key={index} className="app-button" onClick={() => openWindow(app.title, app.url, app.img)}>
            <img className='app-icon' src={app.img} alt={app.title} />
            <p className='app-title'>{app.title}</p>
          </div>
        ))}
      </div>
      <p>&copy;2024 BEYOND OS</p>
    </div>
  );
}

export default AppContent;
