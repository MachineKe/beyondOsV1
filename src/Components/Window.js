import React from 'react';

function Window({ id, title, content, url, posX, posY, width, height, isMinimized, isMaximized, onClose, onMinimize, onMaximize, onDragStart, onResizeStart }) {
  return (
    <div className={`Window ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''}`} style={{ left: posX, top: posY, width: width, height: height }} onMouseDown={(e) => onDragStart(e, id)}>
      <div className="WindowTitleBar">
        <span>{title}</span>
        <div>
          <button onClick={onMinimize}>-</button>
          <button onClick={onMaximize}>[ ]</button>
          <button onClick={onClose}>X</button>
        </div>
      </div>
      {!isMinimized && (
        <div className="WindowContent">
          {content ? content : <iframe src={url} title={title} style={{ width: '100%', height: '100%', border: 'none' }} />}
        </div>
      )}
      {/* Resize Handles */}
      <div className="ResizeHandle TopLeft" onMouseDown={(e) => onResizeStart(e, id, 'topLeft')}></div>
      <div className="ResizeHandle TopRight" onMouseDown={(e) => onResizeStart(e, id, 'topRight')}></div>
      <div className="ResizeHandle BottomLeft" onMouseDown={(e) => onResizeStart(e, id, 'bottomLeft')}></div>
      <div className="ResizeHandle BottomRight" onMouseDown={(e) => onResizeStart(e, id, 'bottomRight')}></div>
    </div>
  );
}

export default Window;
