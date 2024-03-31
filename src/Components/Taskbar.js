// Taskbar.js

import React from 'react';
import './Taskbar.css'; // Import Taskbar CSS file

function Taskbar({ windows, onMinimize,toggleDrawer }) {
  return (
    <div className="Taskbar">
      <a onClick={toggleDrawer}><img className=".app-icons" src="https://res.cloudinary.com/dmpposta9/image/upload/v1711882373/beyond/beyondOs/hzuyx19anyscjybtagim.png"
        style={{ marginBottom: 15 + 'px' }}
        alt="Apps"></img></a>
      {windows.map(window => (
        <button
          className='app-icons'
          key={window.id} onClick={() => onMinimize(window.id)}>
        <img className='app-icons' src={window.img} alt="" /> 
        </button>
      ))}
    </div>
  );
}

export default Taskbar;
