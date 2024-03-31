// AppDrawer.js
import React, { useState, useEffect } from 'react';
import './AppDrawer.css'; 
import appData from '../Assets/apps.json'

function AppDrawer({ openWindow }) {
const [apps, setApps] = useState([]);
  useEffect(() => {
    setApps(appData); // Set the app data from the imported JSON file
  }, []);
  
  return (
    <div className="app-drawer-container">
      <h2>Apps</h2>
      <div className="app-grid">
        {apps.map((app, index) => (
          <div key={index} className="app-item">
            <a onClick={() => openWindow(app.title, app.url, app.img)}>
              <img className='app-icons' src={app.img} alt={app.title} />
              <span>{app.title}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppDrawer;
