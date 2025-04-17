import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

const AirWritingConversation = () => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [status, setStatus] = useState('Ready');
  const [currentLetter, setCurrentLetter] = useState('');
  const [currentWord, setCurrentWord] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [recognitionMode, setRecognitionMode] = useState('letter'); // 'letter' or 'word'
  
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Initialize canvas when component mounts
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.fillStyle = 'black';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  // Function to simulate letter recognition (in a real app, would use ML)
  const recognizeLetter = () => {
    // Simulating detection - in reality this would use a trained model
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    
    setCurrentLetter(randomLetter);
    setStatus(`Recognized: ${randomLetter}`);
    
    // Add to current word
    setCurrentWord(prev => [...prev, randomLetter]);
  };

  // Function to complete a word and add it to conversation
  const completeWord = () => {
    if (currentWord.length === 0) return;
    
    const word = currentWord.join('');
    setConversation(prev => [...prev, word]);
    setCurrentWord([]);
    setStatus(`Added word: ${word}`);
  };

  // Function to restart the current word
  const restartWord = () => {
    setCurrentWord([]);
    setStatus('Restarted current word');
  };

  // Function to clear the entire conversation
  const clearConversation = () => {
    setConversation([]);
    setStatus('Conversation cleared');
  };

  // Toggle camera on/off
  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    setStatus(isCameraOn ? 'Camera turned off' : 'Camera turned on');
  };

  // Clear the canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-auto">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 shadow-md sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
              <path d="M9 9l1 6l2 -4l2 4l1 -6" />
            </svg>
            <h1 className="text-xl font-semibold">Air Writing Conversation</h1>
          </div>
          <div className="flex space-x-2">
            <select 
              className="bg-indigo-700 text-white rounded px-2 py-1 text-sm"
              value={recognitionMode}
              onChange={(e) => setRecognitionMode(e.target.value)}
            >
              <option value="letter">Letter Mode</option>
              <option value="word">Word Mode</option>
            </select>
            <button
              onClick={() => window.location.href = '/data-collection'}
              className="bg-indigo-700 text-white rounded px-3 py-1 text-sm hover:bg-indigo-800"
            >
              Data Collection
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 p-4 gap-4 flex-col md:flex-row">
        {/* Camera and Recognition Section */}
        <div className="flex flex-col w-full md:w-1/2 gap-4">
          {/* Camera Feed */}
          <div className="bg-white rounded-lg shadow-md flex-1 flex flex-col">
            <div className="border-b border-gray-200 px-4 py-2 font-medium bg-gray-50 rounded-t-lg flex justify-between items-center">
              <span>Camera Feed</span>
              <button 
                onClick={toggleCamera}
                className={`px-3 py-1 rounded text-xs font-medium ${isCameraOn ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
              >
                {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
              </button>
            </div>
            <div className="flex-1 bg-black p-4 relative min-h-[300px]">
              {isCameraOn ? (
                <Webcam 
                  ref={webcamRef}
                  audio={false}
                  className="w-full h-full object-cover"
                  mirrored={true}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                      <line x1="2" y1="2" x2="22" y2="22" />
                    </svg>
                    <p>Camera is turned off</p>
                  </div>
                </div>
              )}
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-green-500 w-64 h-64 ${!isCameraOn && 'opacity-30'}`}></div>
            </div>
          </div>
          
          {/* Recognition Preview */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="border-b border-gray-200 pb-2 mb-4 flex justify-between items-center">
              <h2 className="font-medium text-gray-700">Recognition Preview</h2>
              {currentLetter && (
                <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  Last Detected: {currentLetter}
                </span>
              )}
            </div>
            
            <div className="flex flex-col space-y-4">
              {/* Recognized letter display */}
              <div className="flex items-center justify-center h-24 bg-gray-100 rounded-lg">
                <div className="text-7xl font-bold text-gray-700">
                  {currentLetter || '?'}
                </div>
              </div>
              
              {/* Current word being formed */}
              <div className="border-t pt-4">
                <h3 className="text-sm text-gray-600 mb-2">Current Word:</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 p-2 bg-indigo-50 rounded min-h-[40px] text-xl flex items-center">
                    {currentWord.length > 0 ? currentWord.join('') : <span className="text-gray-400 text-sm">No letters yet</span>}
                  </div>
                  <button 
                    onClick={restartWord}
                    className="p-2 bg-gray-200 hover:bg-gray-300 rounded"
                    title="Restart word"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 2v6h6"></path>
                      <path d="M3 8c3.333 3.333 5 5 10 5s8.333-3.333 10-5"></path>
                      <path d="M21 22v-6h-6"></path>
                      <path d="M21 16c-3.333-3.333-5-5-10-5s-8.333 3.333-10 5"></path>
                    </svg>
                  </button>
                  <button 
                    onClick={completeWord}
                    className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                    title="Complete word"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 10 4 15 9 20"></polyline>
                      <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="border-b border-gray-200 pb-2 mb-4">
              <h2 className="font-medium text-gray-700">Recognition Controls</h2>
            </div>
            
            {/* Buttons for demo functionality */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={recognizeLetter}
                className="px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                Detect Letter
              </button>
              <button 
                onClick={completeWord}
                className="px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <polyline points="9 10 4 15 9 20"></polyline>
                  <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                </svg>
                Complete Word
              </button>
            </div>
          </div>
        </div>
        
        {/* Conversation Section */}
        <div className="flex flex-col w-full md:w-1/2 gap-4">
          {/* Conversation Display */}
          <div className="bg-white rounded-lg shadow-md flex-1 flex flex-col">
            <div className="border-b border-gray-200 px-4 py-2 font-medium bg-gray-50 rounded-t-lg flex justify-between items-center">
              <span>Conversation</span>
              <button 
                onClick={clearConversation}
                className="px-3 py-1 rounded text-xs font-medium bg-red-500 text-white hover:bg-red-600"
              >
                Clear All
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto min-h-[400px]">
              {conversation.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {conversation.map((word, idx) => (
                    <div key={idx} className="bg-indigo-100 px-3 py-2 rounded-lg text-indigo-800 text-lg">
                      {word}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <p>Your conversation will appear here</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Detected Gestures */}
          <div className="bg-white rounded-lg shadow-md flex-1 flex flex-col min-h-[200px]">
            <div className="border-b border-gray-200 px-4 py-2 font-medium bg-gray-50 rounded-t-lg flex justify-between items-center">
              <span>Gesture Preview</span>
              <button
                onClick={clearCanvas}
                className="px-3 py-1 rounded text-xs font-medium bg-gray-200 hover:bg-gray-300"
              >
                Clear
              </button>
            </div>
            <div className="flex-1 bg-black m-4">
              <canvas
                ref={canvasRef}
                width={300}
                height={200}
                className="w-full h-full"
              />
            </div>
          </div>
          
          {/* Help & Instructions */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="border-b border-gray-200 pb-2 mb-4">
              <h2 className="font-medium text-gray-700">How to Use</h2>
            </div>
            <ol className="list-decimal pl-5 text-gray-600 space-y-2">
              <li>Point your index finger to trace letters in the air</li>
              <li>Each completed gesture will be recognized as a letter</li>
              <li>Letters automatically combine into the current word</li>
              <li>Use "Complete Word" gesture or button to finish a word</li>
              <li>Completed words appear in the conversation area</li>
            </ol>
          </div>
          
          {/* Status Bar */}
          <div className="bg-gray-200 rounded-lg p-3 text-sm text-gray-600 flex items-center">
            <div className="flex-1">{status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirWritingConversation;