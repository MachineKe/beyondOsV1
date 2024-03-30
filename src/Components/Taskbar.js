// Taskbar.js

import React from 'react';
import './Taskbar.css'; // Import Taskbar CSS file

function Taskbar({ windows, onMinimize }) {
  return (
    <div className="Taskbar">
      {windows.map(window => (
        <button key={window.id} onClick={() => onMinimize(window.id)}>
          {window.title}
        </button>
      ))}
    </div>
  );
}

export default Taskbar;
