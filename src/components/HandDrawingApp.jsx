import React, { useState } from 'react';

const FullscreenHandDrawingApp = () => {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [isTracking, setIsTracking] = useState(false);
  const [predictionHistory, setShowPredictionHistory] = useState(false);
  
  const colors = [
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#000000', // Black
    '#FFFFFF', // White
  ];

  const startTracking = () => {
    setIsTracking(true);
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  const clearDrawing = () => {
    // Logic to clear drawing would go here
  };

  const sendDrawing = () => {
    // Logic to send drawing would go here
  };

  const togglePredictionHistory = () => {
    setShowPredictionHistory(!predictionHistory);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-900 text-white overflow-hidden">
      {/* Header */}
      <header className="bg-gray-800 py-2 px-4 flex justify-between items-center shadow-lg">
        <h1 className="text-xl font-bold">Hand Drawing App</h1>
        <div className="flex items-center space-x-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
            Settings
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Drawing Area */}
        <div className="w-3/4 flex flex-col">
          {/* Drawing Canvas */}
          <div className="flex-1 bg-gray-100 relative border-r border-gray-700">
            {/* Canvas would go here */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              {/* Floating Color Selector */}
              <div className="bg-gray-800 p-2 rounded-full shadow-lg flex space-x-1">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded-full ${color === '#FFFFFF' ? 'border border-gray-500' : ''} ${selectedColor === color ? 'ring-2 ring-white' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Control Buttons */}
          <div className="bg-gray-800 p-3 flex justify-between items-center">
            <div className="flex space-x-2">
              <button 
                className={`px-4 py-2 rounded font-medium text-white flex items-center ${isTracking ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                onClick={startTracking}
                disabled={isTracking}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Start Tracking
              </button>
              <button 
                className={`px-4 py-2 rounded font-medium text-white flex items-center ${!isTracking ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                onClick={stopTracking}
                disabled={!isTracking}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                </svg>
                Stop Tracking
              </button>
            </div>
            <div className="flex space-x-2">
              <button 
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded font-medium text-white flex items-center"
                onClick={clearDrawing}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Clear
              </button>
              <button 
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium text-white flex items-center"
                onClick={sendDrawing}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Info Panel */}
        <div className="w-1/4 bg-gray-800 flex flex-col">
          {/* Predictions Section */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Predictions</h2>
              <div className="flex space-x-2">
                <button 
                  className="px-2 py-1 bg-gray-700 rounded text-xs hover:bg-gray-600 transition-colors"
                  onClick={clearDrawing}
                >
                  Clear
                </button>
                <button 
                  className={`px-2 py-1 ${predictionHistory ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} rounded text-xs flex items-center transition-colors`}
                  onClick={togglePredictionHistory}
                >
                  History
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="bg-gray-900 rounded p-3 h-48 flex items-center justify-center text-gray-400 italic text-sm overflow-y-auto">
              Predictions will appear here...
            </div>
          </div>

          {/* Instructions */}
          <div className="flex-1 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-3">Instructions</h2>
            <div className="bg-gray-700 rounded-lg p-3">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <div className="bg-yellow-500 rounded-full p-1 mr-2 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Raise all fingers to stop drawing
                </li>
                <li className="flex items-start">
                  <div className="bg-yellow-500 rounded-full p-1 mr-2 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Lower any finger to start drawing with your index finger
                </li>
                <li className="flex items-start">
                  <div className="bg-yellow-500 rounded-full p-1 mr-2 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  The index finger tip will turn blue when in drawing mode
                </li>
                <li className="flex items-start">
                  <div className="bg-yellow-500 rounded-full p-1 mr-2 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Only one hand can draw at a time (shown in brighter colors)
                </li>
                <li className="flex items-start">
                  <div className="bg-yellow-500 rounded-full p-1 mr-2 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Click on a color to change the drawing color
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 py-1 px-4 border-t border-gray-700 flex justify-between text-sm text-gray-400">
        <div>Status: {isTracking ? 'Tracking Active' : 'Ready'}</div>
        <div>Selected Color: <span className="inline-block w-3 h-3 rounded-full ml-1" style={{ backgroundColor: selectedColor }}></span></div>
      </div>
    </div>
  );
};

export default FullscreenHandDrawingApp;