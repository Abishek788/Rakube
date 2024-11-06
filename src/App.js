import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import Navbar from './Navbar';
import './App.css'; // Import the new CSS file
import VideoDetail from './VideoDetail';
import Admin from './Admin';


const App = () => {
  return (
    <div className="app-container">
      <Navbar /> {/* Navbar Component */}
      
      <Routes>
        <Route path='/' element={<Home />} /> {/* Home Route */}
        <Route path='/Admin' element={<Admin/>} /> {/* Home Route */}
        <Route path="/video/:videoId" element={<VideoDetail />} />

      </Routes>
    </div>
  );
};

export default App;


