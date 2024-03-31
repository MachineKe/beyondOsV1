import React, { useState, useEffect } from 'react';
import appData from '../Assets/apps.json';

function AppContent({ openWindow }) {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    setApps(appData)
  }, []);

  return (
    <div className="buttons-container">
      {apps.map((app, index) => (
        <a key={index} onClick={() => openWindow(app.title, app.url, app.img)}>
          <img className='app-icons' src={app.img} alt={app.title} />
          {app.title}
        </a>
      ))}
    </div>
  );
}

export default AppContent;
