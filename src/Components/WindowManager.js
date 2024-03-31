import React, { useState, useEffect } from 'react';
import Taskbar from './Taskbar'; 
import './WindowManager.css';
import AppContent from './Desktop';
import AppDrawer from './AppDrawer';
function WindowManager() {
  const [windows, setWindows] = useState([]);
  const [nextWindowId, setNextWindowId] = useState(1);
  const [resizing, setResizing] = useState(null);

  useEffect(() => {
    // No automatic window opening on load
  }, []);

  const openWindow = (title, url, img) => {
    setShowDrawer(false);
    const newWindow = {
      id: nextWindowId,
      title: title,
      img: img,
      url: url,
      posX: 0,
      posY: 0,
      width: '100%',
      height: '86vh',
      isMinimized: false,
      isMaximized: true 
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
const [showDrawer, setShowDrawer] = useState(false);
// Function to toggle drawer visibility
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <div className="WindowManager">
      <Taskbar windows={windows} onMinimize={minimizeWindow} toggleDrawer={toggleDrawer}/>
      {showDrawer && <AppDrawer openWindow={openWindow} />}
      <AppContent openWindow={openWindow} />
      {windows.map(window => (
        <div key={window.id} className={`Window ${window.isMaximized ? 'maximized' : ''} ${window.isMinimized ? 'minimized' : ''}`} style={{ left: window.posX, top: window.posY, width: window.width, height: window.height }}>
          <div className="WindowTitleBar" onMouseDown={(e) => handleDragStart(e, window.id)}>
            <span>{window.title}</span>
            <div className="window-actions">
              <button onClick={() => minimizeWindow(window.id)}>−</button>
              <button
                // onClick={() => maximizeWindow(window.id)}
              >□</button>
              <button onClick={() => closeWindow(window.id)}>✕</button>
            </div>
          </div>
          <div className="">
            <iframe className='WindowContent' src={window.url} title={window.title}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default WindowManager;
