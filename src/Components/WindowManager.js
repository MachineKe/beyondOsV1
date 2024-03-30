import React, { useState, useEffect } from 'react';
import Taskbar from './Taskbar'; 
import './WindowManager.css';

function WindowManager() {
  const [windows, setWindows] = useState([]);
  const [nextWindowId, setNextWindowId] = useState(1);
  const [resizing, setResizing] = useState(null);

  useEffect(() => {
    // No automatic window opening on load
  }, []);

  const openWindow = (title, url) => {
    const newWindow = {
      id: nextWindowId,
      title: title,
      url: url,
      posX: 0,
      posY: 0,
      width: '100%',
      height: '87vh',
      isMinimized: false,
      isMaximized: true // Open the window maximized
    };
    setNextWindowId(nextWindowId + 1);
    setWindows([...windows, newWindow]);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(window => window.id !== id));
  };

  const minimizeWindow = (id) => {
    setWindows(
      windows.map(window =>
        window.id === id ? { ...window, isMinimized: !window.isMinimized } : window
      )
    );
  };

  const maximizeWindow = (id) => {
    setWindows(
      windows.map(window =>
        window.id === id ? { 
          ...window, 
          isMaximized: !window.isMaximized,
          posX: window.isMaximized ? 0 : window.posX,
          posY: window.isMaximized ? 0 : window.posY,
          width: window.isMaximized ? 300 : window.width,
          height: window.isMaximized ? 200 : window.height
        } : window
      )
    );
  };

  const handleDragStart = (e, id) => {
    const index = windows.findIndex(window => window.id === id);
    if (index !== -1) {
      const offsetX = e.clientX - windows[index].posX;
      const offsetY = e.clientY - windows[index].posY;

      const onMouseMove = (e) => {
        setWindows(windows => {
          const updatedWindows = [...windows];
          updatedWindows[index].posX = e.clientX - offsetX;
          updatedWindows[index].posY = e.clientY - offsetY;
          return updatedWindows;
        });
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  const handleResizeStart = (e, id, direction) => {
    setResizing({ id, direction });
    e.stopPropagation();
  };

  const handleResize = (e) => {
    if (resizing) {
      const { id, direction } = resizing;
      const index = windows.findIndex(window => window.id === id);
      if (index !== -1) {
        const updatedWindows = [...windows];
        const window = updatedWindows[index];
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        let newWidth = window.width;
        let newHeight = window.height;
        
        if (direction.includes('right')) {
          newWidth = mouseX - window.posX; // Adjust width based on mouse position
        } else if (direction.includes('left')) {
          newWidth = window.width + (window.posX - mouseX); // Adjust width based on mouse position
          window.posX = mouseX; // Update window position for left resizing
        }

        if (direction.includes('bottom')) {
          newHeight = mouseY - window.posY; // Adjust height based on mouse position
        } else if (direction.includes('top')) {
          newHeight = window.height + (window.posY - mouseY); // Adjust height based on mouse position
          window.posY = mouseY; // Update window position for top resizing
        }

        const minWidth = 100; // Adjust the minimum width as needed
        const minHeight = 100; // Adjust the minimum height as needed
        newWidth = Math.max(newWidth, minWidth);
        newHeight = Math.max(newHeight, minHeight);

        updatedWindows[index] = { ...window, width: newWidth, height: newHeight };
        setWindows(updatedWindows);
      }
    }
  };

  const handleResizeEnd = () => {
    setResizing(null);
    document.removeEventListener('mousemove', handleResize);
  };

  return (
    <div className="WindowManager">
      <Taskbar windows={windows} onMinimize={minimizeWindow} />
      <div className="buttons-container">
        <button onClick={() => openWindow("Krunker", "https://krunker.io")}>Open Krunker</button>
        <button onClick={() => openWindow("BeyondOS", "https://beyondos.vercel.app")}>Open BeyondOS</button>
        {/* Add more buttons for other websites */}
      </div>
      {windows.map(window => (
        <div key={window.id} className={`Window ${window.isMaximized ? 'maximized' : ''} ${window.isMinimized ? 'minimized' : ''}`} style={{ left: window.posX, top: window.posY, width: window.width, height: window.height }}>
          <div className="WindowTitleBar" onMouseDown={(e) => handleDragStart(e, window.id)}>
            <span>{window.title}</span>
            <div className="window-actions">
              <button onClick={() => minimizeWindow(window.id)}>−</button>
              <button onClick={() => maximizeWindow(window.id)}>□</button>
              <button onClick={() => closeWindow(window.id)}>✕</button>
            </div>
          </div>
          <div className="WindowContent">
            {/* Render the content of the window here */}
            <iframe src={window.url} title={window.title}
              style={{ width: '100%', height: '100vh', border: 'none' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default WindowManager;
