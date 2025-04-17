import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HandDrawingApp from './components/HandDrawingApp';
import AirWritingConversation from './components/AirWritingConversation ';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HandDrawingApp />} />
        <Route path="/data-collection" element={<HandDrawingApp />} />
        <Route path="/conversation" element={<AirWritingConversation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;